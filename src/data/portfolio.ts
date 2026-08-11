import type { Skill } from '@/data/resume';

export interface PortfolioProject {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  contribution: string;
  repositoryUrl: string;
  demoUrl: string;
  stack: Skill[];
  highlights: string[];
  architecture: {
    label: string;
    description: string;
  }[];
  detailSections: {
    title: string;
    paragraphs: string[];
  }[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Daily Story Platform',
    subtitle: 'AI가 매일 단편소설을 생성하는 콘텐츠 플랫폼',
    period: '2026.07',
    description:
      'Apps Script 크론이 Gemini로 매일 단편소설과 썸네일을 생성해 Supabase에 적재하고 React 클라이언트가 이를 장르별 테마로 열람·댓글까지 연결하는 pnpm 모노레포 프로젝트입니다.',
    contribution:
      '게시글 목록·상세, 카카오 로그인 상태 관리, 댓글 UI 등 프론트엔드 구현에 초점을 두었고 NestJS API와 Gemini 생성 파이프라인은 AI 도구의 도움을 받아 프론트엔드에 필요한 응답 계약에 맞춰 연동했습니다.',
    repositoryUrl: 'https://github.com/songcs0329/daily-story-platform',
    demoUrl: 'https://daily-story-platform-web-delta.vercel.app',
    stack: [
      { label: 'React 19', color: '#61DAFB', icon: 'react' },
      { label: 'Vite 7', color: '#646CFF', icon: 'vite' },
      { label: 'TypeScript', color: '#3178C6', icon: 'typescript' },
      { label: 'Tailwind CSS v4', color: '#06B6D4', icon: 'tailwindcss' },
      { label: 'shadcn/ui', color: '#111827', icon: 'shadcnui' },
      { label: 'Zustand', color: '#7C5C4A' },
      { label: 'TanStack Query', color: '#FF4154', icon: 'reactquery' },
      { label: 'React Router 7', color: '#CA4245', icon: 'reactrouter' },
      { label: 'NestJS 11', color: '#E0234E', icon: 'nestjs' },
      { label: 'Supabase', color: '#3FCF8E', icon: 'supabase' },
      { label: 'Gemini API', color: '#8E75B2', icon: 'googlegemini' },
    ],
    highlights: [
      '카카오 로그인으로 받은 JWT를 Zustand persist 스토어 한 곳에 두고 axios 인터셉터가 자동으로 주입하도록 인증 흐름을 단일화',
      '비로그인은 목록·상세 열람만, 로그인 시 댓글 작성과 본인 댓글 삭제가 가능하도록 권한에 따라 UI 분기',
      '댓글 뮤테이션 이후 invalidateQueries 재조회로 캐시를 동기화하고 스켈레톤으로 로딩 상태 처리',
      '장르별 테마 매핑으로 목록·상세 카드 스타일을 분기하고 DB에 새 장르가 추가돼도 기본 테마로 폴백되도록 구성',
    ],
    architecture: [
      { label: '프론트엔드', description: 'Vite + React 19 클라이언트 (Vercel)' },
      { label: '백엔드', description: 'AI 도구를 활용해 구현한 NestJS API (Render)' },
      { label: '데이터·생성', description: 'Supabase Postgres/Storage + Apps Script 크론에서 Gemini 호출' },
      { label: '모노레포', description: 'pnpm workspaces, packages/shared 공용 타입' },
    ],
    detailSections: [
      {
        title: '프로젝트 의도',
        paragraphs: [
          '매일 새로운 콘텐츠가 자동으로 쌓이는 서비스를 만들어 사람이 글을 올리지 않아도 목록이 유지되는 구조를 실험했습니다.',
          '생성은 스케줄러에 맡기고 프론트엔드는 이미 쌓인 데이터를 어떻게 보여주고 로그인·댓글 같은 사용자 행동으로 이어갈지에 집중했습니다.',
        ],
      },
      {
        title: '기여 범위',
        paragraphs: [
          '게시글 목록과 상세, 카카오 로그인 상태 관리, 댓글 작성·삭제 UI 등 사용자가 직접 만나는 화면과 상태 흐름을 중심으로 작업했습니다.',
          'NestJS API와 Gemini 기반 생성 스크립트는 AI 도구의 도움을 받아 구현했고 프론트엔드에서 필요한 응답 형태와 권한 규칙에 맞춰 연동했습니다.',
        ],
      },
      {
        title: '배운 점',
        paragraphs: [
          '인증 상태를 스토어 한 곳으로 모으고 요청 헤더 주입을 인터셉터에 맡기니 화면 코드에서 토큰을 다룰 일이 사라진다는 점을 확인했습니다.',
          '또한 외부 생성 API는 실패가 일상이라 폴백과 실패 알림 같은 운영 관점을 처음부터 고려해야 한다는 점을 배웠습니다.',
        ],
      },
    ],
  },
  {
    title: 'Geo-Map',
    subtitle: '행정구역 기반 지도 시각화 서비스',
    period: '2026.02',
    description:
      '카카오맵 위에 시/도, 시군구 단위 GeoJSON 폴리곤을 렌더링하고 장소 검색 결과를 지도 마커로 연결한 지도 프로젝트입니다.',
    contribution:
      '지도 인터랙션, 상태 관리, 검색 결과 UI 등 프론트엔드 경험을 중심으로 구성했고 서버 API 구현은 Claude와 Codex 같은 AI 도구의 도움을 받아 요구사항에 맞게 붙였습니다.',
    repositoryUrl: 'https://github.com/songcs0329/geo-map',
    demoUrl: 'https://geo-map-front.vercel.app/',
    stack: [
      { label: 'Next.js 16', color: '#111827', icon: 'nextdotjs' },
      { label: 'React 19', color: '#61DAFB', icon: 'react' },
      { label: 'TypeScript', color: '#3178C6', icon: 'typescript' },
      { label: 'Tailwind CSS', color: '#06B6D4', icon: 'tailwindcss' },
      { label: 'Zustand', color: '#7C5C4A' },
      { label: 'TanStack Query', color: '#FF4154', icon: 'reactquery' },
      { label: 'NestJS 11', color: '#E0234E', icon: 'nestjs' },
      { label: '카카오맵', color: '#FFCD00', icon: 'kakao' },
      { label: '카카오 장소검색 API', color: '#FFCD00', icon: 'kakao' },
    ],
    highlights: [
      '줌 레벨에 따라 시/도, 시군구 단위 행정구역을 자동 전환하는 지도 UX 구현',
      '현재 뷰포트 기준으로 필요한 폴리곤만 렌더링해 지도 조작 성능 최적화',
      '카카오 장소검색 API 결과를 지도 마커와 결과 목록 UI로 연결',
    ],
    architecture: [
      { label: '프론트엔드', description: 'Next.js 기반 지도 클라이언트' },
      { label: '백엔드', description: 'AI 도구를 활용해 구현한 NestJS GeoJSON 데이터 API' },
      { label: '배포', description: 'Vercel + Railway' },
    ],
    detailSections: [
      {
        title: '프로젝트 의도',
        paragraphs: [
          '지도에서 행정구역을 단계적으로 탐색하고 선택한 지역 주변의 장소 검색 결과를 한 화면에서 확인할 수 있는 경험을 목표로 만들었습니다.',
          '단순히 지도 API를 띄우는 데서 끝내지 않고 줌 레벨과 현재 뷰포트에 따라 어떤 데이터를 보여줄지 조정하는 프론트엔드 흐름에 집중했습니다.',
        ],
      },
      {
        title: '기여 범위',
        paragraphs: [
          '행정구역 선택, 폴리곤 렌더링, 지도 상태 관리, 검색 결과 노출처럼 사용자가 직접 만나는 화면과 인터랙션을 중심으로 구성했습니다.',
          'GeoJSON 데이터를 제공하는 서버는 AI 도구의 도움을 받아 구현했고 프론트엔드에서 필요한 데이터 형태와 호출 흐름에 맞춰 연동했습니다.',
        ],
      },
      {
        title: '배운 점',
        paragraphs: [
          '지도 서비스에서는 데이터 양과 렌더링 타이밍이 곧 사용성으로 이어진다는 점을 체감했습니다.',
          '또한 AI가 만든 서버 코드를 그대로 쓰기보다 프론트엔드 요구사항에 맞는 응답 구조와 예외 흐름을 확인하는 과정이 중요했습니다.',
        ],
      },
    ],
  },
  {
    title: 'App Rummikub',
    subtitle: 'Socket.io 기반 온라인 멀티플레이어 보드게임',
    period: '2026.02',
    description:
      'React 프론트엔드와 NestJS 백엔드가 REST API 없이 Socket.io WebSocket 이벤트로 통신하는 실시간 루미큐브 게임 프로젝트입니다.',
    contribution:
      '게임 화면, 타일 조작, 방/플레이어 상태 표현 등 프론트엔드 구현에 초점을 두었고 WebSocket 서버 구현은 AI 도구의 도움을 받아 이벤트 흐름을 맞춰가며 구성했습니다.',
    repositoryUrl: 'https://github.com/songcs0329/app-rummikub',
    demoUrl: 'https://app-rummikub-front.vercel.app/',
    stack: [
      { label: 'React 19', color: '#61DAFB', icon: 'react' },
      { label: 'Vite 7', color: '#646CFF', icon: 'vite' },
      { label: 'TypeScript', color: '#3178C6', icon: 'typescript' },
      { label: 'Zustand', color: '#7C5C4A' },
      { label: 'shadcn/ui', color: '#111827', icon: 'shadcnui' },
      { label: 'React Hook Form', color: '#EC5990', icon: 'reacthookform' },
      { label: 'Zod', color: '#3E67B1', icon: 'zod' },
      { label: '@dnd-kit', color: '#7C3AED' },
      { label: 'Socket.io', color: '#111827', icon: 'socketdotio' },
      { label: 'NestJS 11', color: '#E0234E', icon: 'nestjs' },
    ],
    highlights: [
      '방 생성, 입장, 준비, 게임 시작, 턴 종료까지 이어지는 실시간 상태 흐름을 UI에 반영',
      '타일 드래그 앤 드롭과 보드 상태 제출을 통해 실시간 보드게임 인터랙션 구현',
      '재접속, 턴 변경, 에러 이벤트 등 서버 이벤트를 프론트엔드 상태와 동기화',
    ],
    architecture: [
      { label: '프론트엔드', description: 'React + Vite 게임 클라이언트' },
      { label: '백엔드', description: 'AI 도구를 활용해 구현한 NestJS Socket.io Gateway' },
      { label: '배포', description: 'Vercel + Railway' },
    ],
    detailSections: [
      {
        title: '프로젝트 의도',
        paragraphs: [
          '루미큐브처럼 보드 상태와 개인 손패가 동시에 움직이는 게임을 웹에서 구현하며 실시간 UI 상태를 다루는 연습을 목표로 했습니다.',
          'REST API 중심의 일반적인 CRUD 화면이 아니라 이벤트를 받고 화면을 갱신하는 구조를 경험하기 위해 Socket.io 기반으로 구성했습니다.',
        ],
      },
      {
        title: '기여 범위',
        paragraphs: [
          '방 입장, 플레이어 준비 상태, 타일 드래그 앤 드롭, 내 손패와 보드 상태 표현 등 게임을 플레이하는 화면 흐름을 중심으로 작업했습니다.',
          '서버의 Socket.io Gateway와 게임 상태 저장 로직은 Claude와 Codex의 도움을 받아 구현했고 프론트엔드에서 필요한 이벤트 계약에 맞춰 연결했습니다.',
        ],
      },
      {
        title: '배운 점',
        paragraphs: [
          '실시간 게임에서는 서버 이벤트 이름, payload 형태, 클라이언트 상태 업데이트 시점이 조금만 어긋나도 사용자가 바로 이상함을 느낀다는 점을 배웠습니다.',
          'AI를 활용해 서버 구현 속도를 높이더라도 이벤트 계약을 이해하고 프론트엔드에서 검증하는 역할은 직접 가져가야 한다는 점을 확인했습니다.',
        ],
      },
    ],
  },
];
