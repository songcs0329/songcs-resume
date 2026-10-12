---
name: resume-notion-sync
description: 매주 월 오전 — 노션 이력서 2페이지를 읽어 resume.md·src/data/resume.ts를 동기화하고 변경 시 PR 생성
---

## 이력서 노션 동기화

**실행 환경:** 클라우드 세션(claude.ai routine). 외부 웹(curl·WebFetch)은 막혀 있다 — 노션은 **Notion 커넥터(`notion-fetch`)로만** 읽는다.

**노션이 단일 원본이다.** 레포 파일은 노션을 그대로 옮긴 사본일 뿐이다.

| 노션 페이지 | ID | 대상 파일 |
|---|---|---|
| [Frontend Engineer]송창석 (문단형) | `3612f11dae9c805ca95fc3ea32dea247` | `resume.md` |
| [Frontend Developer]송창석 (불릿형) | `3612f11dae9c80aab0f4f10701dbf2ac` | `src/data/resume.ts` → `/` 페이지 |

### ★ 절대 규칙

1. **두 페이지 모두 읽혀야 진행한다.** 하나라도 fetch 실패면 아무 파일도 건드리지 말고 종료.
2. **노션에 없는 내용을 만들지 않는다.** 문구를 다듬거나 요약하지 말고 글자 그대로 옮긴다.
3. **변경이 없으면(`git diff` 비어 있음) 아무것도 하지 않고 종료.** 정상 상황이다.
4. 자동 머지하지 않는다. PR만 만든다 — 사람이 검토 후 머지한다.

---

### Phase 1 — Engineer → `resume.md`

기존 파일 형식을 그대로 유지하고 내용만 노션과 맞춘다.

- 연락처 3줄은 빈 줄로 구분, 이메일·GitHub는 링크 문법 없이 평문
- 섹션 사이 `---`, 섹션 제목 `### 🧩 요약` 등 노션과 동일
- 기술 스택은 마크다운 표(`| **구분** | **기술** |`)
- 회사 헤더: `#### 회사 | **기간 | 직무**` (노션의 굵게 위치 그대로)
- 프로젝트 제목: `**📌 제목**` (노션이 `📌 **제목**`이어도 이 형식으로 통일)
- 노션의 `<br>` → 줄바꿈, `\|` → `|`, `\~` → `~`

### Phase 2 — Developer → `src/data/resume.ts`

**데이터 값만 바꾼다.** 인터페이스·export 이름·파일 구조는 건드리지 않는다.

- `profile.headline` = 요약 첫 문장에서 끝의 "입니다." 를 뺀 것. `profile.contact`는 노션 연락처가 바뀐 경우만 수정
- `summary[]` = 요약 불릿, `**굵게**` 표시 제거
- `skills` = 카테고리·순서를 노션 표와 맞춘다. **이미 있는 label은 `color`·`icon`을 유지.** 새 label만 브랜드 색 + 확실한 simple-icons slug(모르면 `icon` 생략)
- `experiences[]` = 회사 순서대로 `company`·`period`·`position`·`type`(회사명 옆 괄호, 예: 프리랜서)·`projects`
  - 프로젝트 `title` = 📌 뒤 제목
  - `points[]` = 노션 불릿 1개 = 항목 1개, `**굵게**` 제거
- `education`, `certificates` = 학력 및 자격증 섹션

### Phase 3 — 검증 및 PR

```bash
git diff --quiet && exit 0   # 변경 없으면 종료
npm ci && npm run build       # 실패하면 고쳐서 통과시킨다
```

`npm ci`가 네트워크 차단으로 실패하면 빌드는 건너뛰고 PR 본문에 "빌드 미검증"이라고 적는다. 대신 `resume.ts`의 따옴표·쉼표·괄호 짝을 눈으로 한 번 더 확인한다.

```bash
BRANCH="claude/resume-sync-$(TZ=Asia/Seoul date +%F)"
git checkout -b "$BRANCH"
git add resume.md src/data/resume.ts
git commit -m "docs(resume): $(TZ=Asia/Seoul date +%F) 노션 이력서 동기화"
git push -u origin "$BRANCH"
gh pr create --base main --title "docs(resume): $(TZ=Asia/Seoul date +%F) 노션 이력서 동기화" --body "<변경된 섹션 목록>"
```

PR 본문에는 파일별로 바뀐 섹션(예: `resume.ts — 어바웃피싱 2026 / 예약 플랫폼 points 2건 수정`)을 짧게 적는다.

---

### 완료 체크

- 두 페이지 모두 fetch 성공
- 변경 없으면 PR 없이 종료 / 변경 있으면 `npm run build` 통과 + PR 생성
- `resume.ts`의 타입·구조 변경 없음
