import { skills, type Skill } from '@/data/resume';

export interface CompanyCase {
  company: string;
  period: string;
  title: string;
  summary: string;
  metric?: { value: string; label: string };
  problem: string[];
  did: string[];
  result: string[];
  stack: Skill[];
}

// ponytail: 이력서 스킬 배지를 label로 재사용 — 노션 동기화로 label이 바뀌면 해당 배지만 조용히 빠짐
const stackOf = (...labels: string[]) =>
  skills.flatMap((group) => group.items).filter((skill) => labels.includes(skill.label));

export const companyCases: CompanyCase[] = [
  {
    company: '어바웃피싱',
    period: '2025.01 ~ 2025.10',
    title: '낚시 포인트맵 SEO·행동 데이터 계측',
    summary: '지도 기반 조과 공유 서비스에서 검색 유입을 만들고, 그 유입을 커머스·예약으로 연결했습니다.',
    metric: { value: '+41.8%', label: '검색 클릭 · 구글 서치콘솔 최근 30일' },
    problem: [
      '서버 기반 마커 클러스터링이라 개별 조과 데이터를 쓸 수 없어 SEO용 상세 페이지를 만들 수 없었습니다.',
      '포인트맵 주요 기능의 사용자 행동이 계측되지 않았습니다.',
      '검색으로 들어온 사용자가 상품·예약으로 이어지는 경로가 없었습니다.',
    ],
    did: [
      '서버 클러스터링을 클라이언트 기반 네이버 맵 클러스터링으로 전환해 개별 조과 데이터를 직접 쓸 수 있게 했습니다.',
      '조과 상세 동적 라우트, robots.txt, sitemap, 메타 태그를 적용했습니다.',
      'GTM·GA4로 조과 마커·예약 마커 등 주요 행동 이벤트를 설계·계측하고 기능 이용 흐름을 분석했습니다.',
      '검색 유입과 사용자 행동을 바탕으로 어바웃피싱 샵 상품을 노출·연계했습니다.',
      '이벤트 배너와 예약 마커를 만들어 예약 상품 페이지로 바로 들어가는 경로를 구성했습니다.',
    ],
    result: [
      '최근 30일 클릭 1.7천 회(+41.8%), 노출 1.5만 회, 평균 CTR 11.3%',
      '조과 마커 클릭 42만+건, 예약 마커 클릭 9천+건 계측',
      '검색 유입에서 커머스·예약으로 이어지는 전환 접점 확대',
    ],
    stack: stackOf(
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'TanStack Query',
      'GraphQL(Apollo Client)',
      'SEO',
    ),
  },
  {
    company: '어바웃피싱',
    period: '2025.01 ~ 2025.10',
    title: '포인트맵 웹·웹뷰 구조 개선',
    summary: '기능이 늘며 복잡해진 인증·상태 관리 구조를 웹과 웹뷰를 함께 지원하는 구조로 개편했습니다.',
    problem: [
      '기능 확장 과정에서 상태 관리와 인증 구조가 복잡해졌습니다.',
      '웹과 웹뷰 환경 사이에서 인증과 상태가 동기화되지 않았습니다.',
      '기능이 늘면서 코드베이스 유지보수 비용이 커졌습니다.',
    ],
    did: [
      '웹(카카오·휴대폰)/웹뷰 분기 로그인·회원가입 플로우를 만들고 미들웨어 라우트 가드와 웹뷰 브릿지 통신으로 앱-웹 인증 상태를 동기화했습니다.',
      '상태 관리 라이브러리를 마이그레이션해 클라이언트·서버 상태를 분리하고 API 공개/인증 쿼리 분기 구조를 설계했습니다.',
      '타입 체계 재편, 모달 Portal 전환, Sheet 공통 컴포넌트 설계로 코드베이스 구조를 정리했습니다.',
      '지도 롱프레스·조과 상세 기반 북마크 저장 플로우와 댓글 시스템(작성·수정·삭제·답글·무한스크롤)을 개발했습니다.',
      'safe-area 대응, 플랫폼별 이벤트 분기, 네이티브 브릿지 메시지 공통화로 하나의 코드베이스에서 웹·웹뷰를 지원했습니다.',
    ],
    result: [
      '웹/웹뷰 인증과 상태 관리를 분리해 이후 기능을 두 플랫폼에 동시 지원',
      '클라이언트·서버 상태를 분리해 API 공개/인증 쿼리 구조 확립',
    ],
    stack: stackOf('Next.js', 'React', 'TypeScript', 'Zustand', 'TanStack Query', 'GraphQL(Apollo Client)'),
  },
  {
    company: '스마일벤처스',
    period: '2022.08 ~ 2024.01',
    title: 'Catchfashion 결제 경험 개선',
    summary: 'MAU 30만 럭셔리 이커머스 리뉴얼에서 장바구니·주문 플로우의 프론트엔드를 맡았습니다.',
    metric: { value: '+14.27%', label: '결제 전환율(CVR)' },
    problem: [
      '복잡한 결제·주문 과정 때문에 전환율이 낮았습니다.',
      '상품별 관부가세, 프로모션, 포인트 등 할인 정책과 세금 계산이 얽혀 로직이 복잡했습니다.',
    ],
    did: [
      '관부가세·프로모션·포인트를 포함한 할인 정책 계산 로직을 구현하고 안정화했습니다.',
      '카드번호를 직접 입력하던 결제를 토스페이·카카오페이 PG 연동으로 전환했습니다.',
      '주문/배송 조회, 취소/반품 처리 등 주문 관리 기능을 개발했습니다.',
      '비회원 주문·결제 플로우를 만들고 결제 수단별 처리 로직을 결제 전용 훅으로 분리해 회원·비회원 주문이 같은 결제 로직을 쓰도록 했습니다.',
      '사이버소스 해외카드 결제·카드사 프로모션을 적용하고 브랜드페이·사이버소스 포인트 할인가 계산 로직을 수정했습니다.',
    ],
    result: ['결제 전환율(CVR) 14.27% 증가', '결제 완료 시간 단축', '회원·비회원 주문의 결제 로직 일원화'],
    stack: stackOf('React', 'Next.js', 'Redux', 'SWR'),
  },
  {
    company: '어바웃피싱',
    period: '2026.02 ~ 현재',
    title: '낚시 예약·결제·취소 흐름 개선',
    summary: '선박·낚시터 예약 서비스에서 결제 직전의 고민과 결제·취소 이후의 막힘을 줄였습니다.',
    problem: [
      '결제 후 뒤로가기를 하면 화면 오류가 나고 결제 승인이 다시 실행될 위험이 있었습니다.',
      '결제 페이지에서 사용자가 쿠폰을 직접 비교·선택해야 했습니다.',
      '예약을 취소한 사용자가 다시 예약할 경로가 없었습니다.',
      '홈 구성이나 배너를 바꿀 때마다 배포가 필요했습니다.',
    ],
    did: [
      '화면 이동과 브라우저 히스토리를 개선해 결제 후 뒤로가기 오류와 결제 승인 재실행을 막았습니다.',
      '결제 페이지 첫 진입 시 할인액이 가장 큰 쿠폰을 자동 적용하고 쿠폰 목록을 할인액 순으로 정렬했습니다.',
      '운영 시간대별 즉시 취소·취소 요청 정책과 부분 취소 흐름을 적용하고, 쿠폰 할인 차감을 반영한 예정 환불금액을 표시했습니다.',
      '예약 취소 완료 화면에 재예약 달력과 위치 기반 근처 선박 목록을 추가했습니다.',
      '새소식 홈을 모듈 API 기반으로 전환해 서버가 내려주는 섹션 순서·제목·배너대로 화면을 구성했습니다.',
      '일일 쿠폰 복권 이벤트를 개발하고 비동기 발급·참여 상태에 따라 화면을 분기했습니다.',
    ],
    result: [
      '결제 승인 중복 실행을 막아 결제 흐름 안정성 확보',
      '쿠폰 선택, 취소 후 재예약 등 사용자의 의사결정 단계 축소',
      '운영자가 배포 없이 홈 구성과 배너 노출을 관리',
    ],
    stack: stackOf('React', 'TypeScript', 'TanStack Query'),
  },
  {
    company: '어바웃피싱',
    period: '2026.02 ~ 현재',
    title: '예약 운영 백오피스 구조 개선',
    summary: '선박·낚시터 예약 운영 백오피스의 UI와 폼, 서버 상태 관리 구조를 단계적으로 개선했습니다.',
    problem: [
      '기존 CSS와 화면별 개별 구현 때문에 UI·폼 코드가 중복됐습니다.',
      '폼 검증·오류 표시와 API 캐시 갱신 정책이 화면마다 달랐습니다.',
    ],
    did: [
      '기존 CSS와의 충돌을 고려해 Tailwind CSS·shadcn/ui를 도입하고 입력·선택·날짜·팝업 컴포넌트와 목록 화면 구조를 공통화했습니다.',
      '업무 폼을 React Hook Form·Zod 기반으로 전환하고 조건부·배열 검증과 오류 표시 정책을 통일했습니다.',
      'TanStack Query 기반 도메인별 조회·변경 훅으로 재구성하고 목록·상세 캐시 갱신과 오류 처리 정책을 정리했습니다.',
      '앱회원 조회·수정, 회원 제재, 탈퇴 사유 관리, 새소식 홈 모듈 등록·수정·삭제·순서 변경 기능을 구현했습니다.',
    ],
    result: [
      '폼 4종의 반복 영역을 공통화해 중복 구현 감소',
      '폼 검증·캐시 갱신·오류 처리 정책 일원화',
      '운영자가 회원 관리와 홈 구성을 백오피스에서 직접 처리',
    ],
    stack: stackOf(
      'React',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'TanStack Query',
      'React Hook Form',
      'Zod',
      'REST API(Axios)',
      'GraphQL(Apollo Client)',
    ),
  },
];

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
    title: '장소 메모판',
    subtitle: '분위기로 찾고, 장소마다 실시간 현장 소식을 나누는 모바일 웹',
    period: '2026.11',
    description:
      'Claude가 네이버 블로그 후기에서 가게를 뽑고 네이버 지역 검색으로 실제 장소인지 확인한 뒤, 장소마다 붙은 게시판에서 자리·주차·웨이팅 같은 현장 메모와 채팅을 실시간으로 나누는 프로젝트입니다.',
    contribution:
      '설계 문서 작성과 검색 결과·장소 게시판·실시간 게시판 탭, 사진 업로드 등 프론트엔드 구현에 초점을 두었고 NestJS 검색 파이프라인과 요약 API는 AI 도구의 도움을 받아 설계 문서의 API 계약에 맞춰 구현했습니다.',
    repositoryUrl: 'https://github.com/songcs0329/place-board',
    demoUrl: 'https://place-board-theta.vercel.app/',
    stack: [
      { label: 'React 19', color: '#61DAFB', icon: 'react' },
      { label: 'Vite', color: '#646CFF', icon: 'vite' },
      { label: 'TypeScript', color: '#3178C6', icon: 'typescript' },
      { label: 'Tailwind CSS v4', color: '#06B6D4', icon: 'tailwindcss' },
      { label: 'TanStack Query', color: '#FF4154', icon: 'reactquery' },
      { label: 'React Router 7', color: '#CA4245', icon: 'reactrouter' },
      { label: 'NestJS', color: '#E0234E', icon: 'nestjs' },
      { label: 'Supabase', color: '#3FCF8E', icon: 'supabase' },
      { label: 'Claude API', color: '#D97757', icon: 'anthropic' },
    ],
    highlights: [
      'Claude가 네이버 블로그 후기에서 가게를 추출하고 네이버 지역 검색으로 실제 장소인지 확인',
      '메모판과 채팅을 하나의 글 흐름으로 두고 태그·사진이 붙으면 자동으로 현장 메모로 분류',
      'Supabase Realtime으로 새 글을 바로 반영하고 지금 보고 있는 사람 수 표시',
      '메모 24시간·채팅 6시간 뒤 자동으로 사라지는 게시판, 방마다 다른 랜덤 닉네임과 신고·차단',
      '최근 글을 한 줄로 요약하는 AI 현장 요약',
    ],
    architecture: [
      { label: '프론트엔드', description: 'Vite + React SPA (Vercel, /api rewrite로 같은 출처 호출)' },
      {
        label: '백엔드',
        description: 'AI 도구를 활용해 구현한 NestJS API — 검색·글쓰기·요약·신고·매시간 정리 (Railway)',
      },
      { label: '데이터·실시간', description: 'Supabase Postgres · Auth(카카오) · Realtime · Storage' },
      { label: '외부 API', description: 'Claude API, 네이버 블로그·지역 검색 API' },
    ],
    detailSections: [
      {
        title: '프로젝트 의도',
        paragraphs: [
          '지도 앱 검색은 상호·업종 기준이라 "우드톤 대형 카페"처럼 분위기로 찾기 어렵고, 지금 자리가 있는지 같은 현장 정보는 공개 API로 얻을 수 없었습니다.',
          '분위기 정보는 블로그 후기에서, 실제 장소 확인은 지역 검색에서 가져와 LLM으로 잇고, 현장 정보는 위치 공유 대신 사용자가 남기는 짧은 메모로 채우는 구조를 실험했습니다.',
        ],
      },
      {
        title: '기여 범위',
        paragraphs: [
          '화면 구성과 기능 범위를 설계 문서로 먼저 정리하고, 이를 기준으로 검색 결과·장소 게시판·실시간 게시판 화면을 구현했습니다.',
          'NestJS 검색 파이프라인과 요약 API는 AI 도구의 도움을 받아 구현했고, 설계 문서의 API 계약에 맞춰 연동했습니다.',
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
];
