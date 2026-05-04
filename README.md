# songcs-resume

송창석 프론트엔드 개발자 이력서 및 자기소개서 페이지입니다. Vite + React + TypeScript + Tailwind CSS 기반으로 구현했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

## 검증 명령어

```bash
npm run lint
npm run build
```

## 구현 기능

- `/`: 이력서 메인 페이지
- `/cover-letter`: 자기소개서 페이지
- 반응형 레이아웃
- 경력, 프로젝트, 성과, 기술 스택, 학력/자격증 섹션 구성
- 마크다운 원문(`resume.md`, `cover-letter.md`) 기반 콘텐츠 반영

## 폴더 구조

```txt
src/
  components/
    PageShell.tsx
    Section.tsx
    SkillBadge.tsx
    TimelineItem.tsx
  data/
    coverLetter.ts
    resume.ts
  pages/
    CoverLetter/
      index.tsx
    Resume/
      index.tsx
    NotFound.tsx
```

## 주요 구현 의도

- 서버 API나 입력 폼이 없는 정적 콘텐츠 페이지이므로 React Query, Zustand, React Hook Form은 사용하지 않았습니다.
- 긴 이력서 내용을 화면 컴포넌트에 직접 박지 않고 `src/data`로 분리해 문구 수정이 쉽도록 구성했습니다.
- 성과 지표는 상단에서 빠르게 스캔할 수 있도록 별도 영역으로 노출했습니다.
