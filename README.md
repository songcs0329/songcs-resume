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

## GitHub Pages 배포

이 프로젝트는 `main` 브랜치에 push하면 GitHub Actions로 빌드 후 GitHub Pages에 배포됩니다.

1. GitHub 저장소의 `Settings > Pages`로 이동합니다.
2. `Build and deployment`의 `Source`를 `GitHub Actions`로 설정합니다.
3. 로컬 변경사항을 `main` 브랜치에 push합니다.
4. Actions 완료 후 `https://<github-username>.github.io/songcs-resume/`에서 확인합니다.

프로젝트 페이지 배포를 위해 production 빌드에서는 Vite `base`가 `/songcs-resume/`로 설정됩니다. 저장소 이름을 바꾸면 `vite.config.ts`와 `public/404.html`의 `/songcs-resume/` 값도 함께 변경해야 합니다.

## 주요 라이브러리

- [Vite](https://ko.vite.dev/guide/)
- [React](https://ko.react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 구현 기능

- `/`: 이력서 메인 페이지
- `/cover-letter`: 자기소개서 페이지
- `/portfolio`: 포트폴리오 페이지
- 반응형 레이아웃
- 우하단 플로팅 내비게이션 기반 페이지 전환
- 프로필 이미지와 연락처 배지 구성
- 기술 스택별 컬러/아이콘 배지 구성
- 경력, 프로젝트, 성과, 기술 스택, 학력/자격증 섹션 구성
- GitHub 레포지토리 기반 포트폴리오 프로젝트 구성
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
    portfolio.ts
    resume.ts
  pages/
    CoverLetter/
      index.tsx
    Portfolio/
      index.tsx
    Resume/
      index.tsx
    NotFound.tsx
```
