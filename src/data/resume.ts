export interface Project {
  title: string;
  points: string[];
  result?: string;
}

export interface Experience {
  company: string;
  period: string;
  position: string;
  type?: string;
  projects: Project[];
}

export interface Skill {
  label: string;
  color: string;
  icon?: string;
}

export interface Contact {
  label: string;
  value: string;
  href: string;
  color: string;
}

export const profile = {
  name: '송창석',
  role: 'Frontend Developer',
  headline: '사용자 흐름 분석과 데이터 기반 개선을 통해 성과를 만들어온 프론트엔드 개발자',
  contact: [
    { label: 'Phone', value: '010-2925-1719', href: 'tel:01029251719', color: '#0F766E' },
    { label: 'Email', value: 'songcs0329@gmail.com', href: 'mailto:songcs0329@gmail.com', color: '#2563EB' },
    { label: 'GitHub', value: 'github.com/songcs0329', href: 'https://github.com/songcs0329', color: '#181717' },
  ] satisfies Contact[],
};

export const summary = [
  '이커머스 결제·할인 로직부터 지도 기반 서비스까지 복잡한 도메인의 상태 관리 구조 설계',
  '결제·할인 로직 안정화 및 PG 연동으로 CVR 14.27% 향상',
  'SEO 최적화와 사용자 행동 분석으로 CTR 11.3%, 활성 사용자 +61% 달성',
  '웹/웹뷰 분기 인증 플로우 설계 및 앱-웹 간 상태 동기화 구현',
];

export const skills = [
  {
    category: 'Frontend',
    items: [
      { label: 'HTML5', color: '#E34F26', icon: 'html5' },
      { label: 'CSS(Sass)', color: '#CC6699', icon: 'sass' },
      { label: 'Tailwind CSS', color: '#06B6D4', icon: 'tailwindcss' },
      { label: 'Styled-components', color: '#DB7093', icon: 'styledcomponents' },
      { label: 'shadcn/ui', color: '#111827', icon: 'shadcnui' },
      { label: 'JavaScript(ES6)', color: '#F7DF1E', icon: 'javascript' },
      { label: 'TypeScript', color: '#3178C6', icon: 'typescript' },
    ],
  },
  {
    category: 'Framework / Library',
    items: [
      { label: 'React', color: '#61DAFB', icon: 'react' },
      { label: 'Next.js', color: '#111827', icon: 'nextdotjs' },
      { label: 'Vue.js', color: '#4FC08D', icon: 'vuedotjs' },
      { label: 'Nuxt.js', color: '#00DC82', icon: 'nuxt' },
      { label: 'Redux', color: '#764ABC', icon: 'redux' },
      { label: 'Zustand', color: '#7C5C4A' },
      { label: 'React Query', color: '#FF4154', icon: 'reactquery' },
      { label: 'SWR', color: '#111827', icon: 'swr' },
      { label: 'React Hook Form', color: '#EC5990', icon: 'reacthookform' },
      { label: 'Zod', color: '#3E67B1', icon: 'zod' },
    ],
  },
  {
    category: 'ETC',
    items: [
      { label: 'Storybook', color: '#FF4785', icon: 'storybook' },
      { label: 'GitHub', color: '#181717', icon: 'github' },
      { label: 'REST API(Axios)', color: '#5A29E4', icon: 'axios' },
      { label: 'GraphQL(Apollo Client)', color: '#311C87', icon: 'apollographql' },
      { label: 'SEO', color: '#0F766E' },
    ],
  },
];

export const experiences: Experience[] = [
  {
    company: '어바웃피싱',
    period: '2026.02 ~ 현재',
    position: '플랫폼팀 프론트엔드 개발자',
    type: '프리랜서',
    projects: [
      {
        title: '낚시 포인트 맵 서비스 고도화',
        points: [
          '웹/웹뷰 분기 인증 플로우 구축 및 앱-웹 간 상태 동기화 구조 설계',
          '클라이언트/서버 상태를 분리하고 인증/비인증 API 흐름을 명확히 하도록 상태 관리 구조 재설계',
          '북마크 시스템 신규 설계 및 조과 상세 페이지 모듈화',
          '댓글 시스템 캐시 전략 최적화로 작성/수정/삭제 시 실시간 반영 성능 개선',
          '크로스 플랫폼 대응 및 네이티브 브릿지 공통화',
        ],
      },
    ],
  },
  {
    company: '메디쿼터스',
    period: '2025.12 ~ 2026.02',
    position: '일본사업부 플랫폼본부 FE개발팀',
    projects: [
      {
        title: '카테고리 구조 개선 및 API 설계 협업',
        points: [
          '기존 카테고리 조회 구조의 중복 노출 문제를 분석하고 개선 방향 도출',
          '카테고리 API 설계 협업으로 프론트엔드 요구사항을 반영하고 조회/필터링 구조 개선',
          '1depth/2depth 카테고리 구조 및 필터링 로직 설계',
        ],
        result: '카테고리 조회 구조 개선을 통해 중복 노출 문제 해결 및 정확도 향상',
      },
      {
        title: '검색 기능 개선 및 사용자 행동 로깅 설계',
        points: [
          '검색 결과 페이지 UI 개발 및 API 연동',
          '카테고리, 브랜드, 디렉터 등 필터링 기능 구현',
          'Amplitude 기반 사용자 행동 로그 구조 설계 및 클릭 이벤트 수집 체계 구축',
        ],
      },
    ],
  },
  {
    company: '어바웃피싱',
    period: '2025.01 ~ 2025.11',
    position: '플랫폼팀 프론트엔드 개발자',
    projects: [
      {
        title: '낚시 포인트 맵 서비스',
        points: [
          '어종 검색 및 필터 기능 개발',
          '네이버 지도 API + 마커 클러스터링 성능 개선',
          'SEO 최적화 및 동적 라우팅 적용',
          '이벤트 배너 및 예약 마커를 통해 서비스 간 유입 경로 설계',
        ],
        result: '클릭 수 +41.8%, CTR 11.3%, 이벤트 수 +50.8%, 활성 사용자 +61.1%',
      },
      {
        title: '중고장터 플랫폼 (마이페이지 / 백오피스)',
        points: [
          '본인·계좌 인증 시스템 구축 및 이니시스·팝빌 API 연동',
          '키워드 알림, 리뷰, 신고 등 마이페이지 기능 개발',
          '판매글 관리, 유저 신고, 거래 상태 확인 등 운영 시스템 개발',
        ],
      },
      {
        title: '낚시대회 고객사 관리자 시스템 개발',
        points: ['모집, 참여자 관리, 기록 등록, 순위 기능을 포함한 대회 운영 관리자 시스템 개발'],
      },
    ],
  },
  {
    company: '스마일벤처스',
    period: '2022.08 ~ 2024.02',
    position: '서비스 개발팀 프론트엔드 개발자',
    projects: [
      {
        title: '캐치패션 리뉴얼 (E-Commerce 플랫폼)',
        points: [
          'React/Next.js 기반 서비스 재개발 과정에서 장바구니 및 주문 플로우 구현',
          '복잡한 할인/결제 로직 구조화 및 안정성 확보',
          'Storybook을 활용한 디자인 시스템 도입 및 공통 컴포넌트 관리',
        ],
        result: '결제 플로우 개선으로 CVR 14.27% 증가 및 결제 완료 시간 단축',
      },
      {
        title: '글로벌 서비스 SEO 최적화',
        points: ['검색, 상품, 파트너사 페이지 SEO 개선', '카탈로그 매핑, 브랜드 및 파트너사 관리 기능 개발'],
      },
    ],
  },
  {
    company: '데이터유니버스',
    period: '2021.06 ~ 2022.08',
    position: '프론트엔드 개발자',
    projects: [
      {
        title: '스마트피싱보호 서비스 리뉴얼',
        points: ['Vue에서 React로 마이그레이션', '부가서비스 웹뷰 컨텐츠 개편'],
      },
      {
        title: '휴대폰가족보호, 휴대폰분실보호 서비스',
        points: [
          '데스크탑/모바일 적응형 홈페이지 리뉴얼',
          'Vue3 기반 홈페이지 및 웹 가입 페이지 개발',
          '구글 지도에서 네이버 지도 API 전환으로 개발 비용 절감',
        ],
      },
    ],
  },
  {
    company: '헥토이노베이션',
    period: '2019.03 ~ 2021.04',
    position: '웹 퍼블리셔',
    projects: [
      {
        title: '운영 서비스: SKT PASS, 세이프캐시, 내정보지키미, TIOR, PNS',
        points: [
          '앱 내 웹뷰 페이지 개발 및 운영',
          '반응형/적응형 홈페이지 UI 개발',
          '기존 CSS 환경에 Sass 도입으로 코드 재사용성과 유지보수성 향상',
        ],
      },
    ],
  },
];

export const education = {
  school: '인하공업전문대학',
  degree: '정보통신과 전문학사',
  period: '2012.03 ~ 2016.02',
};

export const certificates = ['정보처리산업기사 (2016.05)', '정보처리기능사 (2013.12)'];
