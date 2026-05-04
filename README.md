# songcs-resume

송창석 프론트엔드 개발자 이력서 및 자기소개서 웹 페이지입니다.

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

## 주요 라이브러리

- Vite
- React
- TypeScript
- Tailwind CSS

## 구현 기능

- `/`: 이력서 메인 페이지
- `/cover-letter`: 자기소개서 페이지
- 반응형 레이아웃
- 우하단 플로팅 버튼 기반 페이지 전환
- 프로필 이미지와 연락처 배지 구성
- 기술 스택별 컬러/아이콘 배지 구성
- 경력, 프로젝트, 성과, 기술 스택, 학력/자격증 섹션 구성
- 마크다운 원문(`resume.md`, `cover-letter.md`)을 기반으로 콘텐츠 데이터 분리

## 폴더 구조

```txt
src/
  components/
    FloatingRouteNav.tsx
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
