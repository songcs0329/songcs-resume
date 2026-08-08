#!/usr/bin/env python3
"""Job Radar 수집·검증기.

이 스크립트는 **네트워크가 필요한 일만** 한다 — 링크 생존 확인과 공고 발견.
채점·브리프·티어 배정 같은 판단은 Claude 루틴이 data/raw-jobs.md 를 읽어서 처리한다.

역할을 나눈 이유: 클라우드 루틴 세션은 외부 egress가 막혀 있어 URL 검증을 할 수 없고,
검증 없이 공고를 만들면 죽은 링크가 쌓인다. 검증은 판단이 아니라 상태코드 확인이므로
GitHub Actions 러너에서 스크립트로 돌린다.

Phase 0: src/data/jobs.json 의 전 공고 URL 생존 확인 → 죽은 건 제거
Phase 1: 채용 플랫폼(원티드·점핏) 목록 API → 자사 채용페이지 순회 순으로 FE 공고 발견
         → 전 건 개별 URL 200 확인 → raw-jobs.md 에 적재

플랫폼을 먼저 도는 이유: 자사 페이지는 이미 아는 회사만 훑어 새 회사를 못 찾는다.
플랫폼 목록은 시장 전체가 들어오므로 발굴 폭이 넓고, 당근처럼 플랫폼에 안 올리는 곳은
자사 페이지가 보완한다.

의존성 없음 (표준 라이브러리만).
"""

import argparse
import gzip
import html
import json
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import date
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parent.parent
JOBS_PATH = ROOT / "src/data/jobs.json"
SOURCES_PATH = ROOT / "scripts/job_radar_sources.json"
RAW_PATH = ROOT / "data/raw-jobs.md"

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
TIMEOUT = 25
RETRIES = 3

# 공고가 내려갔을 때 200과 함께 뜨는 문구들
CLOSED_MARKERS = [
    "채용이 종료", "채용이 완료", "모집이 종료", "마감되었습니다",
    "지원이 마감", "지원기간이 종료", "종료된 공고",
]

# 제목에 이게 있어야 FE 공고로 본다
FE_KEYWORDS = [
    "프론트엔드", "프론트 엔드", "프론트", "frontend", "front-end", "front end",
    "웹 개발자", "웹개발자", "web engineer", "react", "vue.js", "next.js",
    "풀스택", "fullstack", "full-stack", "full stack",
]

# 제목에 이게 있으면 FE 키워드가 있어도 버린다
TITLE_EXCLUDE = [
    "인턴", "intern", "체험형", "신입 전용",
    "안드로이드", "android", "ios", "flutter", "react native",
    "백엔드", "backend", "server engineer", "데이터 엔지니어",
    "디자이너", "designer", "기획", "pm ", "product manager", "마케", "영업",
    "qa ", "테크니컬 라이터", "게임", "unity", "webgl",
]


def fetch(url, retries=RETRIES, accept="text/html"):
    """(status, body) 반환. 네트워크 실패는 status=0."""
    last = (0, "")
    for attempt in range(retries):
        req = urllib.request.Request(
            url,
            headers={"User-Agent": UA, "Accept-Language": "ko,en;q=0.8", "Accept": accept},
        )
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
                raw = resp.read()
                if resp.headers.get("Content-Encoding") == "gzip":
                    raw = gzip.decompress(raw)
                return resp.status, raw.decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            last = (e.code, "")
            if e.code == 404:  # 404는 재시도해도 404다
                return last
        except Exception:
            last = (0, "")
        if attempt < retries - 1:
            time.sleep(2)
    return last


def strip_tags(body):
    txt = re.sub(r"<script.*?</script>|<style.*?</style>", " ", body, flags=re.S | re.I)
    txt = html.unescape(re.sub(r"<[^>]+>", " ", txt))
    return re.sub(r"\s+", " ", txt).strip()


def page_title(body):
    m = re.search(r"<title[^>]*>(.*?)</title>", body, re.S | re.I)
    if not m:
        return ""
    # "포지션명 | 회사 채용" 처럼 사이트명이 붙는 경우가 흔하다 — 앞부분만 쓴다
    return html.unescape(m.group(1)).split("|")[0].strip()


def is_closed(body):
    text = strip_tags(body)
    return next((m for m in CLOSED_MARKERS if m in text), None)


def check_url(url):
    """('alive'|'dead'|'closed'|'unknown', 상세) 반환."""
    status, body = fetch(url)
    if status == 404:
        return "dead", "404"
    if status != 200:
        return "unknown", str(status)  # 403·429·5xx·네트워크 실패 → 판단 보류
    marker = is_closed(body)
    return ("closed", marker) if marker else ("alive", "200")


# ---------------------------------------------------------------- Phase 0

def phase0(jobs, verbose=True):
    """죽은 링크를 걸러낸 (남길 목록, 제거 목록) 반환."""
    keep, removed = [], []
    for job in jobs:
        verdict, detail = check_url(job["url"])
        if verdict in ("dead", "closed"):
            removed.append((job, verdict, detail))
        else:
            keep.append(job)
        if verbose:
            print(f"  [{verdict:7}] {detail:4} {job['company']} — {job['url']}")
    return keep, removed


# ------------------------------------------------------- Phase 1 · 플랫폼

MAX_YEARS = 8   # 이 이상을 하한으로 요구하면 버린다 (총 경력 7년)
JUNIOR_CEILING = 3  # 상한이 이 미만이면 주니어 전용으로 보고 버린다


def out_of_range(low, high):
    """공고의 경력 범위가 대상 밖이면 True."""
    if low is not None and low >= MAX_YEARS:
        return True
    return high is not None and high < JUNIOR_CEILING


def fetch_json(url):
    status, body = fetch(url, retries=2, accept="application/json")
    if status != 200:
        return None
    try:
        return json.loads(body)
    except json.JSONDecodeError:
        return None


def platform_wanted(source):
    """원티드 목록 API. 경력 범위를 API가 주므로 연차 필터를 여기서 건다."""
    out = []
    for offset in range(0, source.get("max_offset", 60) + 1, 20):
        data = fetch_json(f"{source['list_api']}&limit=20&offset={offset}")
        items = (data or {}).get("data") or []
        if not items:
            break
        for it in items:
            if it.get("is_newbie") or out_of_range(it.get("annual_from"), it.get("annual_to")):
                continue
            out.append({
                "company": (it.get("company") or {}).get("name") or "?",
                "title": it.get("position") or "",
                "url": f"https://www.wanted.co.kr/wd/{it['id']}",
            })
        time.sleep(1)  # 공개 문서가 없는 API라 간격을 둔다
    return out


def platform_jumpit(source):
    """점핏 목록 API. closedAt(마감일)·minCareer를 직접 주므로 그대로 활용한다."""
    out = []
    for page in range(1, source.get("max_pages", 4) + 1):
        data = fetch_json(f"{source['list_api']}&page={page}")
        positions = ((data or {}).get("result") or {}).get("positions") or []
        if not positions:
            break
        for p in positions:
            if p.get("newcomer") or out_of_range(p.get("minCareer"), p.get("maxCareer")):
                continue
            # jobCategory는 역할 태그를 콤마로 이어붙인 문자열이다
            if "프론트엔드" not in (p.get("jobCategory") or ""):
                continue
            out.append({
                "company": p.get("companyName") or "?",
                "title": p.get("title") or "",
                "url": f"https://jumpit.saramin.co.kr/position/{p['id']}",
                "deadline": (p.get("closedAt") or "")[:10] or None,
            })
        time.sleep(1)
    return out


PLATFORM_HANDLERS = {"wanted": platform_wanted, "jumpit": platform_jumpit}


# --------------------------------------------------- Phase 1 · 자사 페이지

def extract_links(source, body):
    """채용페이지 루트 HTML에서 개별 공고 URL 목록을 뽑는다."""
    pattern = r"/o/[0-9]+" if source["type"] == "greetinghr" else source["link_pattern"]
    root = source["root"]
    found = []
    for m in re.finditer(pattern, body):
        url = urljoin(root, m.group(0))
        if urlparse(url).netloc == urlparse(root).netloc and url not in found:
            found.append(url)
    return found


def looks_like_fe(title):
    low = title.lower()
    if any(x in low for x in TITLE_EXCLUDE):
        return False
    return any(k in low for k in FE_KEYWORDS)


def verify_and_pack(cand, source_label, known_urls):
    """후보 1건을 실제로 열어보고 통과하면 적재용 dict를 만든다. 실패하면 None."""
    if cand["url"] in known_urls:
        return None
    status, page = fetch(cand["url"], retries=1)
    if status != 200 or is_closed(page):
        return None
    title = cand.get("title") or page_title(page)
    if not looks_like_fe(title):
        return None
    known_urls.add(cand["url"])
    entry = {
        "company": cand["company"],
        "title": title,
        "url": cand["url"],
        "source": source_label,
        "text": strip_tags(page)[:2500],
    }
    if cand.get("deadline"):
        entry["deadline"] = cand["deadline"]
    return entry


def phase1_platforms(platforms, known_urls, verbose=True):
    """채용 플랫폼 목록 API → 개별 공고 검증. 새 회사 발굴은 여기서 일어난다."""
    found = []
    for source in platforms:
        handler = PLATFORM_HANDLERS.get(source["type"])
        if handler is None:
            continue
        try:
            candidates = handler(source)
        except Exception as exc:  # API 형태가 바뀌어도 자사 페이지 수집은 계속돼야 한다
            if verbose:
                print(f"  [스킵] {source['name']} — 목록 조회 실패: {exc}")
            continue
        if not candidates:
            if verbose:
                print(f"  [스킵 0건] {source['name']} — 목록 비어 있음")
            continue

        hits = 0
        for cand in candidates:
            entry = verify_and_pack(cand, source["type"], known_urls)
            if entry:
                found.append(entry)
                hits += 1
        if verbose:
            print(f"  [{source['name']}] 후보 {len(candidates)}건 중 FE 신규 {hits}건")
    return found


def phase1_company_pages(sources, known_urls, verbose=True):
    """자사 채용페이지 순회. 플랫폼에 공고를 안 올리는 회사를 보완한다."""
    found = []
    for source in sources:
        status, body = fetch(source["root"])
        if status != 200:
            if verbose:
                print(f"  [스킵 {status}] {source['company']} — 루트 접근 실패")
            continue
        links = extract_links(source, body)
        if not links:
            if verbose:
                print(f"  [스킵 0건] {source['company']} — 공고 링크 추출 실패(SPA 가능성)")
            continue

        hits = 0
        for url in links:
            entry = verify_and_pack(
                {"company": source["company"], "title": "", "url": url},
                "자사홈",
                known_urls,
            )
            if entry:
                found.append(entry)
                hits += 1
        if verbose:
            print(f"  [{source['company']}] 링크 {len(links)}건 중 FE 신규 {hits}건")
    return found


# ---------------------------------------------------------------- raw-jobs.md

PENDING_HEADER = "## Pending"
ARCHIVED_HEADER = "## Archived"
# 줄머리의 헤더만 잡는다. 안내문 안에 섹션 이름을 언급하면 그걸 헤더로 오인해
# 엉뚱한 위치에 공고가 끼어든다.
ARCHIVED_RE = re.compile(r"^## Archived", re.M)
RAW_INTRO = (
    "# Job Radar 원본 공고 (수집기 → 큐레이터 인계 파일)\n\n"
    "`scripts/job_radar_collect.py`가 **URL 200 검증을 통과한** 공고만 여기에 적는다.\n"
    "Claude 루틴은 이 파일의 Pending 섹션만 읽어 채점·브리프를 붙여 `src/data/jobs.json`으로 옮기고,\n"
    "처리한 블록은 Archived 섹션으로 내린다. Pending에 없는 공고를 임의로 만들어 넣지 말 것.\n\n"
)


def read_raw():
    if not RAW_PATH.exists():
        return RAW_INTRO + PENDING_HEADER + "\n\n" + ARCHIVED_HEADER + "\n"
    return RAW_PATH.read_text(encoding="utf-8")


def append_pending(raw, entries, today):
    blocks = []
    for e in entries:
        deadline = f"- deadline: {e['deadline']}\n" if e.get("deadline") else ""
        blocks.append(
            f"### {e['company']} - {e['title']}\n\n"
            f"- url: {e['url']}\n"
            f"- verified: {today} (HTTP 200)\n"
            f"- source: {e.get('source', '자사홈')}\n"
            f"{deadline}\n"
            f"```\n{e['text']}\n```\n"
        )
    addition = "\n".join(blocks)
    m = ARCHIVED_RE.search(raw)
    if m:
        return f"{raw[:m.start()].rstrip()}\n\n{addition}\n{raw[m.start():]}"
    return f"{raw.rstrip()}\n\n{addition}"


def pending_urls(raw):
    return set(re.findall(r"^- url: (\S+)", raw, re.M))


# ---------------------------------------------------------------- main

def selfcheck():
    """의존성 없이 도는 최소 검사. `--selfcheck` 로 실행."""
    # 안내문이 섹션 이름을 언급해도 공고는 Pending 끝에 붙어야 한다
    raw = read_raw()
    out = append_pending(raw, [{"company": "A", "title": "T", "url": "u", "text": "x"}], "2026-01-01")
    body = out[out.index(PENDING_HEADER):]
    assert body.index("### A - T") < body.index("\n" + ARCHIVED_HEADER), "공고가 Archived 뒤로 밀렸다"
    assert out.count(ARCHIVED_HEADER) == raw.count(ARCHIVED_HEADER), "Archived 헤더가 중복 생성됐다"

    # 제목 필터
    assert looks_like_fe("Software Engineer, Frontend - 커뮤니티")
    assert looks_like_fe("프론트엔드 개발자 (시니어)")
    assert looks_like_fe("풀스택 개발자")
    assert not looks_like_fe("Backend Engineer (Core Ads Platform)")
    assert not looks_like_fe("Android Engineer")
    assert not looks_like_fe("프론트엔드 개발 인턴")
    assert not looks_like_fe("프로덕트 매니저 - 결제 서비스 (시니어)")

    # 사이트명 접미사 제거
    assert page_title("<title>FE 개발자 | 당근 채용</title>") == "FE 개발자"

    # 마감 문구 감지
    assert is_closed("<p>이 공고는 채용이 종료되었습니다</p>")
    assert not is_closed("<p>상시 채용 중입니다</p>")

    # 경력 범위 필터
    assert out_of_range(8, 20), "하한 8년은 제외 대상"
    assert out_of_range(1, 2), "상한 2년은 주니어 전용"
    assert not out_of_range(3, 10)
    assert not out_of_range(6, 8)
    assert not out_of_range(None, None), "정보 없으면 통과시킨다"
    print("selfcheck OK")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="파일을 쓰지 않고 결과만 출력")
    ap.add_argument("--skip-phase0", action="store_true", help="링크 생존 확인 건너뛰기")
    ap.add_argument("--skip-phase1", action="store_true", help="신규 공고 수집 건너뛰기")
    ap.add_argument("--limit-sources", type=int, default=0, help="앞에서 N개 소스만 순회(테스트용)")
    ap.add_argument("--selfcheck", action="store_true", help="네트워크 없이 로직만 검사")
    args = ap.parse_args()

    if args.selfcheck:
        selfcheck()
        return 0

    today = date.today().isoformat()
    data = json.loads(JOBS_PATH.read_text(encoding="utf-8"))
    jobs = data["jobs"]
    removed = []

    if not args.skip_phase0:
        print(f"== Phase 0 — 링크 생존 확인 ({len(jobs)}건) ==")
        jobs, removed = phase0(jobs)
        print(f"-> 제거 {len(removed)}건 / 유지 {len(jobs)}건\n")

    raw = read_raw()
    new_entries = []

    if not args.skip_phase1:
        cfg = json.loads(SOURCES_PATH.read_text(encoding="utf-8"))
        platforms = cfg.get("platforms", [])
        sources = cfg["sources"]
        if args.limit_sources:
            sources = sources[: args.limit_sources]
        known = {j["url"] for j in jobs} | pending_urls(raw)

        print(f"== Phase 1a — 채용 플랫폼 ({len(platforms)}개) ==")
        new_entries = phase1_platforms(platforms, known)
        print(f"-> 플랫폼 신규 {len(new_entries)}건\n")

        print(f"== Phase 1b — 자사 채용페이지 ({len(sources)}개) ==")
        company_entries = phase1_company_pages(sources, known)
        print(f"-> 자사홈 신규 {len(company_entries)}건\n")

        new_entries += company_entries
        print(f"-> 검증 통과 합계 {len(new_entries)}건\n")

    if removed:
        data["jobs"] = jobs
        data["meta"]["total"] = len(jobs)
    if new_entries:
        raw = append_pending(raw, new_entries, today)

    if args.dry_run:
        print("== dry-run: 파일 미변경 ==")
        for job, verdict, detail in removed:
            print(f"  제거 예정 [{verdict} {detail}] {job['company']} — {job['title'][:40]}")
        for e in new_entries:
            print(f"  적재 예정 {e['company']} — {e['title'][:50]}")
        return 0

    if removed:
        JOBS_PATH.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        print(f"jobs.json 갱신: {len(removed)}건 제거")
    if new_entries:
        RAW_PATH.parent.mkdir(parents=True, exist_ok=True)
        RAW_PATH.write_text(raw, encoding="utf-8")
        print(f"raw-jobs.md 갱신: {len(new_entries)}건 적재")
    if not removed and not new_entries:
        print("변경 없음")
    return 0


if __name__ == "__main__":
    sys.exit(main())
