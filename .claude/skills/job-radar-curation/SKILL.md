---
name: job-radar-curation
description: 월·수·금 오전 — data/raw-jobs.md의 검증된 공고를 채점·큐레이션해 jobs.json 갱신 후 PR 생성
---

## Job Radar 큐레이션

**실행 환경:** 클라우드 세션(claude.ai routine). **외부 웹 접근이 차단되어 있다** — curl·WebFetch 모두 403이 난다.
따라서 이 루틴은 웹을 보지 않는다. 수집·검증은 GitHub Actions(`job-radar-collect.yml`)가 미리 끝내둔다.

**네 역할은 판단이다.** 이미 검증된 공고에 점수·브리프·티어를 붙여 `src/data/jobs.json`으로 옮기는 것.

### ★ 절대 규칙

1. **`data/raw-jobs.md`에 있는 공고만 처리한다.** 거기 없는 공고를 기억이나 추측으로 만들어 넣지 말 것 — URL을 검증할 수단이 이 세션에 없다.
2. **URL을 절대 수정·조합하지 않는다.** raw-jobs.md에 적힌 url을 글자 그대로 복사한다.
3. 공고 블록이 없으면 **아무것도 하지 않고 종료.** 정상 상황이다.
4. **`data/raw-jobs-archive.md`는 절대 읽지 않는다.** 처리 완료분이 쌓여 계속 커지는 파일이라 읽으면 컨텍스트만 태운다. 덧붙이기만 한다.
5. **`src/data/jobs.json`도 절대 읽거나 직접 쓰지 않는다.** 신규 공고만 `data/curated-new.json`에 쓰고 병합 스크립트에 맡긴다 (Phase 2). 10만 자짜리 파일을 읽고 다시 쓰면 매 실행 수만 토큰이 날아간다.

---

### 후보자 프로필 (채점 기준)
이름: 송창석 | 총 경력: 약 7년+ (React·Next.js FE 약 5년)

주축 강점:
1. 이커머스 결제·할인·주문 플로우: PG 연동(토스페이·카카오페이·이니시스·팝빌), CVR +14.27%
2. 지도·웹뷰 하이브리드: 네이버맵 클라이언트 클러스터링, 네이티브 브릿지 상태 동기화
3. SEO·서치콘솔 기반 개선: CTR 11.3%·활성 사용자 +61%

스택: React, TypeScript, Next.js, Vue/Nuxt, Tailwind, Redux/Zustand/React Query

**제외:** exp_min_years >= 8, 주니어 전용, 네이티브 앱 주축, 3D·WebGL·게임
(수집기가 1차로 걸러내지만, 공고 본문을 읽고 해당하면 Pending에 있어도 버린다)

**직책(management) 비중 감점 — 개인 기여자(IC) 우선:**

| 유형 | 예시 표현 | 조정 |
|------|-----------|------|
| 순수 관리 직책 | 팀장, 파트장, 실장, 그룹장, 개발 총괄, Engineering Manager | **-20점**, `fit_tier` 한 단계 하향 |
| 리드 겸 IC | 테크 리드, Tech Lead, 리드 개발자, Lead Frontend Engineer, 챕터 리드 | **-10점** |
| 인원 관리 명시 | "팀원 채용·평가·1on1", "조직 관리", "N명 관리"가 주요 업무에 포함 | 위에 **추가 -5점** |
| 시니어 IC | 시니어/Senior 표기만 있고 조직 관리 없음 | 조정 없음 |

`fit_reasons`에 감점 사유를 명시. 관리 비중이 커도 **제외하지 않고 점수만 낮춘다.**

**풀스택 공고 — FE 비중으로 판정:**

- FE **70% 이상** (BE는 BFF·API 연동·간단한 Node 수준) → 수집, `domains`에 "풀스택" 추가, 감점 없음
- FE **50~70%** → 수집하되 **-10점**, `fit_reasons`에 "BE 비중 있는 풀스택" 명시
- FE **50% 미만** 또는 BE 언어(Java·Kotlin·Go·Python) 실무 경력 요구 → 제외
- 판정 근거를 `brief.verdict`에 한 줄 기록 (예: "FE 8 : BE 2 — BFF 수준의 Node만 요구")

---

### 티어 기준 (투자 단계·금액 기준, 적합도와 무관)
- 문샷: 시리즈B+ AND 누적 100억+ (상장사·대기업·빅테크 자동 문샷)
- 메인: 시리즈A~B AND 누적 10억~100억, 이커머스·버티컬·O2O 위주
- 문열기: 시드·프리A 또는 투자정보 미확인

투자정보를 확인할 수 없으면 **문열기로 보수 배정**하고 `scale`에 "투자정보 미확인" 기록.
(웹 검색이 불가하므로 아는 범위에서만 판단하고, 모르면 미확인으로 둔다 — 추측한 투자금액을 적지 말 것)

---

### Phase 1 — 대기 공고 처리

`data/raw-jobs.md`를 읽는다. 파일이 없거나 `###` 블록이 없으면 종료. 처리 대기분만 들어 있는 파일이라 작다.

각 블록은 이 형태다:
```
### 회사 - 포지션명

- url: https://...
- verified: YYYY-MM-DD (HTTP 200)
- source: 자사홈

```(공고 본문 텍스트)```
```

블록마다:
1. 본문을 읽고 제외 기준에 걸리면 버림 (버린 이유를 PR 본문에 기록)
2. 아니면 아래 스키마로 큐레이션. `first_seen`은 오늘, `url`·`source`는 블록 값 그대로 복사

(url 중복은 수집기가 이미 걸러서 raw-jobs.md에 넣지 않는다. 병합 스크립트가 한 번 더 거른다 — 여기서 확인하려고 jobs.json을 읽지 말 것.)

---

### Job JSON 스키마

```
id: "영문슬러그-YYYY-MM"
company: string
title: string
level?: "시니어"|"미들"|"주니어"|null
scale?: string  — 투자단계·금액 또는 "투자정보 미확인"
source?: "wanted"|"rallit"|"jumpit"|"자사홈"|"jobplanet"|"linkedin"
url: string  — raw-jobs.md 값 그대로
location?: string
exp?: string
exp_min_years?: number|null
posted_date?: "YYYY-MM-DD"|null
first_seen: "YYYY-MM-DD"  — 오늘 날짜
domains?: string[]  — 한글 도메인 (커머스·결제·지도·웹뷰·핀테크·SEO·풀스택 등)
deadline?: "YYYY-MM-DD"|null
deadline_type: "date"|"rolling"|"unknown"
deadline_label?: string
process?: string[]  — 공고 본문에 전형 절차가 있으면 기록
process_confirmed: boolean
has_codingtest: "코딩테스트"|"과제"|"없음"|"미확인"
fit_score: number  — 0-100 (직책·풀스택 감점 반영 후 최종값)
fit_tier: "최상"(85+)|"상"(75-84)|"중"(65-74)|"하"(<65)
fit_reasons: string[]  — 2-3개 (감점 시 사유 포함 필수)
tier: "문샷"|"메인"|"문열기"
is_new: true
brief: {
  company_status?: string
  verdict?: string  — 풀스택이면 FE:BE 비중 판정 근거 포함
  strengths?: string[]
  gaps?: string[]
  pass_odds?: "높음"|"중간"|"낮음"
  strategy?: string
  sources?: string[]
}
```

`process`·`has_codingtest`는 **공고 본문에 있을 때만** 채운다. 없으면 "미확인".

---

### Phase 2 — 병합 및 저장

1. 신규 공고만 담은 **JSON 배열**을 `data/curated-new.json`에 쓴다 (`[{…}, {…}]`). 제외 건은 넣지 않는다.
2. `python3 scripts/job_radar_merge.py` 실행 — is_new 리셋·중복제거·meta 갱신·jobs.json 저장·임시파일 삭제까지 스크립트가 한다.
   출력에 `병합 완료: 신규 N건`이 찍히는지만 확인한다. **jobs.json을 열어 검증하지 말 것.**
   스크립트가 실패하면(python3 없음 등) 그때만 jobs.json을 직접 읽어 병합하고, PR 본문에 실패 사실을 적는다.
3. 처리한 블록(큐레이션·제외 모두)을 `data/raw-jobs-archive.md` **끝에 덧붙이고** `data/raw-jobs.md`에서 지운다.
   파일을 읽지 말고 append로 붙일 것 — `cat >> data/raw-jobs-archive.md <<'EOF' … EOF`.
   제외 건도 반드시 넣는다. 빠지면 수집기가 매일 다시 주워온다.

**만료 처리는 하지 않는다.** 링크 생존 확인은 수집 워크플로 담당이다.

---

### Phase 3 — commit · branch push · PR

변경이 없으면 이하 전체 생략.

```bash
git pull --rebase origin main
BRANCH="claude/job-radar-$(date '+%Y%m%d-%H%M%S')"
git checkout -b "$BRANCH"
git add src/data/jobs.json data/raw-jobs.md data/raw-jobs-archive.md
git diff --staged --quiet || git commit -m "chore(job-radar): $(date '+%Y-%m-%d') 공고 큐레이션 — 신규 N건"
git push -u origin "$BRANCH"

gh pr create --base main --head "$BRANCH" \
  --title "chore(job-radar): $(date '+%Y-%m-%d') FE 채용공고 큐레이션 — 신규 N건" \
  --body "## 변경 내용
### 처리한 공고 N건
| 티어 | 회사 | 포지션 | fit_score | 감점 사유 |
|------|------|--------|-----------|-----------|
| ... | ... | ... | ... | ... |
### 제외 M건
- 회사 — 포지션 (사유)
### meta
- total: 이전 → 현재
- last_collected: YYYY-MM-DD"
```

브랜치명이 `claude/`로 시작하고 `src/data/jobs.json`을 건드리면 `auto-merge-jobradar.yml`이 squash merge 처리.

---

### 완료 기준
- 블록을 전부 처리(큐레이션 또는 제외)하고 `raw-jobs-archive.md`로 옮겼음 — `raw-jobs.md`에 `###` 블록이 남지 않았음
- 추가한 공고의 url이 raw-jobs.md 값과 **글자 단위로 동일**함
- 직책·풀스택 감점 규칙이 적용되었음
- PR 생성 성공 (또는 대기 0건이라 생략)

**대기 0건이면 아무것도 하지 않는 게 정답이다.**
