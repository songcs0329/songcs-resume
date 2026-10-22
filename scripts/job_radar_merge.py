#!/usr/bin/env python3
"""큐레이션 결과 병합기.

루틴(Claude)이 신규 공고만 `data/curated-new.json`(배열)에 쓰고 이 스크립트를 부른다.
jobs.json 전체를 세션에서 읽고 다시 쓰면 매 실행 수만 토큰이 날아가므로,
기계적인 병합(is_new 리셋·중복제거·meta 갱신)은 여기서 한다.

사용:
    python3 scripts/job_radar_merge.py            # 병합 후 curated-new.json 삭제
    python3 scripts/job_radar_merge.py --selfcheck
"""

import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JOBS_PATH = ROOT / "src/data/jobs.json"
NEW_PATH = ROOT / "data/curated-new.json"


def repost_key(job):
    """재게시·교차게시는 URL만 바뀌므로 회사+직책(공백·괄호·구두점 무시)으로 같은 공고를 판정."""
    norm = lambda s: re.sub(r"[\s()\[\]·\-_/,.]", "", (s or "").lower())
    company, title = norm(job.get("company")), norm(job.get("title"))
    if not company or not title:
        return "id:" + job["id"]  # 회사·직책이 비면 판정 불가 — 자기 자신만
    return company + "|" + title


def merge(data, new_jobs, today):
    for job in data["jobs"]:
        job["is_new"] = False

    seen_ids = {j["id"] for j in data["jobs"]}
    seen_urls = {j["url"] for j in data["jobs"]}
    added = []
    for job in new_jobs:
        if job["id"] in seen_ids or job["url"] in seen_urls:
            continue
        seen_ids.add(job["id"])
        seen_urls.add(job["url"])
        job["is_new"] = True
        added.append(job)

    data["jobs"] = added + data["jobs"]

    # 같은 공고는 first_seen 최신 1건만 남긴다 (최신 URL이 살아있을 확률이 높다)
    newest = {}
    for job in data["jobs"]:
        key = repost_key(job)
        if key not in newest or job.get("first_seen", "") > newest[key].get("first_seen", ""):
            newest[key] = job
    data["jobs"] = [j for j in data["jobs"] if newest[repost_key(j)] is j]

    data["meta"]["last_collected"] = today
    data["meta"]["total"] = len(data["jobs"])
    return added


def selfcheck():
    data = {"meta": {}, "jobs": [{"id": "a", "url": "u1", "is_new": True}]}
    added = merge(
        data,
        [
            {"id": "b", "url": "u2"},
            {"id": "a", "url": "u9"},  # id 중복
            {"id": "c", "url": "u1"},  # url 중복
        ],
        "2026-01-01",
    )
    assert [j["id"] for j in added] == ["b"], added
    assert [j["id"] for j in data["jobs"]] == ["b", "a"]
    assert data["jobs"][1]["is_new"] is False
    assert data["meta"] == {"last_collected": "2026-01-01", "total": 2}

    # 재게시: 새 URL로 같은 회사+직책이 들어오면 옛 항목을 밀어낸다
    data = {
        "meta": {},
        "jobs": [{"id": "old", "url": "u1", "company": "A사", "title": "FE (경력)", "first_seen": "2026-01-01"}],
    }
    added = merge(
        data,
        [{"id": "new", "url": "u2", "company": "A사", "title": "FE(경력)", "first_seen": "2026-02-01"}],
        "2026-02-01",
    )
    assert [j["id"] for j in data["jobs"]] == ["new"], data["jobs"]
    assert data["meta"]["total"] == 1
    print("selfcheck OK")


def main():
    if "--selfcheck" in sys.argv:
        return selfcheck()

    if not NEW_PATH.exists():
        print("curated-new.json 없음 — 병합 생략")
        return

    new_jobs = json.loads(NEW_PATH.read_text(encoding="utf-8"))
    data = json.loads(JOBS_PATH.read_text(encoding="utf-8"))
    added = merge(data, new_jobs, date.today().isoformat())

    JOBS_PATH.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    NEW_PATH.unlink()
    skipped = len(new_jobs) - len(added)
    print(f"병합 완료: 신규 {len(added)}건 (중복 {skipped}건 제외), total {data['meta']['total']}")


if __name__ == "__main__":
    main()
