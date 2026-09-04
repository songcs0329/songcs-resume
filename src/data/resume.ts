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
  'SEO 최적화 및 GA4 행동 데이터 계측으로 CTR 11.3%, 조과 마커 클릭 42만+건 기록',
  '웹/웹뷰 분기 인증 플로우 설계 및 앱-웹 간 상태 동기화 구현',
];

export const skills = [
  {
    category: 'Frontend',
    items: [
      { label: 'HTML5', color: '#E34F26', icon: 'html5' },
      { label: 'CSS(Sass)', color: '#CC6699', icon: 'sass' },
      { label: 'JavaScript(ES6)', color: '#F7DF1E', icon: 'javascript' },
      { label: 'TypeScript', color: '#3178C6', icon: 'typescript' },
      { label: 'jQuery', color: '#0769AD', icon: 'jquery' },
    ],
  },
  {
    category: 'Framework / Library',
    items: [
      { label: 'React', color: '#61DAFB', icon: 'react' },
      { label: 'Next.js', color: '#111827', icon: 'nextdotjs' },
      { label: 'Vue.js', color: '#4FC08D', icon: 'vuedotjs' },
      { label: 'Nuxt.js', color: '#00DC82', icon: 'nuxt' },
      { label: 'Tailwind CSS', color: '#06B6D4', icon: 'tailwindcss' },
      { label: 'Styled-components', color: '#DB7093', icon: 'styledcomponents' },
      { label: 'shadcn/ui', color: '#111827', icon: 'shadcnui' },
      { label: 'Redux', color: '#764ABC', icon: 'redux' },
      { label: 'Zustand', color: '#7C5C4A' },
      { label: 'React Query', color: '#FF4154', icon: 'reactquery' },
      { label: 'SWR', color: '#111827', icon: 'swr' },
      { label: 'React Hook Form', color: '#EC5990', icon: 'reacthookform' },
      { label: 'Zod', color: '#3E67B1', icon: 'zod' },
      { label: 'Storybook', color: '#FF4785', icon: 'storybook' },
    ],
  },
  {
    category: 'ETC',
    items: [
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
        title: '낚시 포인트 맵 (웹뷰 서비스 기능 확장 및 아키텍처 개선)',
        points: [
          '웹(카카오·휴대폰)과 웹뷰 분기 로그인, 회원가입/약관 동의 플로우를 구축하고 미들웨어 기반 라우트 가드와 웹뷰 브릿지 통신을 통해 앱-웹 간 인증 상태를 동기화했습니다.',
          '지도 롱프레스로 현재 위치를 저장하는 일반 북마크와 조과 상세에서 낚시 기록을 저장하는 조과 북마크, 두 가지 북마크 체계를 신규 설계하고 저장·수정·삭제 플로우와 좌표 기반 주소 자동 변환, 이미지 업로드, 폴더 관리를 구현했습니다.',
          '조과 상세 페이지를 각 섹션으로 컴포넌트화하고 위치 기반 주변 선박 예약 섹션을 추가했으며 댓글 시스템(작성·수정·삭제·답글·무한스크롤)을 신규 개발하여 캐시 최적화로 실시간 반영 성능을 확보했습니다. 선박 예약 마커도 API를 교체하고 데이터 조회 구조를 개선했습니다.',
          '상태 관리 라이브러리 마이그레이션을 통해 클라이언트·서버 상태를 분리하고 API 공개/인증 쿼리 분기 구조 설계, 타입 체계 재편, 모달의 Portal 전환, Sheet 공통 컴포넌트 설계 등 코드베이스 전반의 구조를 개선했습니다.',
          'safe-area 대응, 플랫폼별 이벤트 분기, 네이티브 브릿지 메시지 공통화를 적용하여 하나의 코드베이스로 웹·웹뷰 두 플랫폼을 안정적으로 지원하도록 했습니다.',
        ],
      },
      {
        title: '예약 파트너 관리 웹앱 신규 구축',
        points: [
          '낚시 예약 플랫폼의 파트너사가 직접 상품과 예약을 관리하는 운영 웹앱을 신규로 설계하고 구축했습니다.',
          '홈 예약 현황, 예약 캘린더, 상품 관리 화면을 핵심 축으로 선박·낚시터 상품 등록·수정·삭제, 일자별 재고 관리, 직접 예약 생성, 상품 일괄 수정과 인원 조정까지 파트너사의 반복 운영 흐름을 하나의 플로우로 통합했습니다.',
          'React-Query 기반으로 홈·예약·상품 도메인별 API 구조를 정리하고 날짜 처리 로직과 예약 상태 동기화 이슈를 지속적으로 개선해 운영 화면의 안정성을 확보했습니다.',
        ],
      },
    ],
  },
  {
    company: '메디쿼터스',
    period: '2025.12 ~ 2026.02',
    position: '일본사업부 플랫폼본부 FE개발팀 프론트엔드 개발자',
    projects: [
      {
        title: 'NUGU (일본 패션 이커머스 서비스) 운영 이슈 대응',
        points: [
          '검색 결과 페이지의 브랜드·디렉터·앰버서더·기획전 UI를 개발하고 API를 연동했으며 클릭 이벤트 수집 로직을 설계하여 배포 후 데이터 분석이 가능하도록 준비했습니다.',
          '디렉터 큐레이션 페이지 내 카테고리 미노출 이슈를 분석하고 백엔드 팀과 협업하여 새로운 카테고리 API 명세를 설계했습니다. 카테고리 분리 로직 및 전체·성별 기반 필터링을 구현하여 동일 카테고리 중복 노출 문제를 해결했습니다.',
          '고객사 어드민 일본어 번역 누락 개선, 상품 상세 배송 유형별 배송 기간 우선순위 노출 로직 개선, 배송 안내 모달 UI 구현 등 다양한 운영 이슈를 신속하게 대응했습니다.',
        ],
      },
    ],
  },
  {
    company: '어바웃피싱',
    period: '2025.01 ~ 2025.10',
    position: '플랫폼팀 프론트엔드 개발자',
    projects: [
      {
        title: '낚시 포인트 맵 (조과 제공·공유 서비스 개발 및 최적화)',
        points: [
          '서버 기반 마커 클러스터링을 클라이언트 기반 네이버 맵 마커 클러스터링으로 전환하여 개별 조과 데이터를 직접 활용할 수 있는 구조로 개선하고 조과 상세 동적 라우트, robots.txt, 사이트맵, 메타 태그를 적용해 SEO 구조를 구축했으며 어종 검색·필터 기능과 에러 페이지도 함께 추가했습니다.',
          '구글 태그 매니저(GTM)와 GA4를 활용해 조과 마커·예약 마커 등 포인트맵의 주요 사용자 행동 이벤트를 설계하고 계측했습니다. 구축 이후 조과 마커 클릭 42만+건, 예약 마커 클릭 9천+건의 행동 데이터를 수집해 기능 이용 흐름을 분석하고 서비스 개선에 활용했습니다.',
          'SEO 개선 결과 구글 서치콘솔 기준 최근 30일 클릭 수 1.7천 회(+41.8%), 노출 수 1.5만 회, 평균 CTR 11.3%를 기록했으며 네이버 서치어드바이저 기준 활성 사용자 2.4천 명(+61.1%), 이벤트 수 2.9만 건(+50.8%)을 달성했습니다.',
          '검색 유입 기반 사용자 흐름을 분석해 어바웃피싱 샵 상품을 노출·연계하여 매출 증대에 기여하고 포인트맵 내 이벤트 배너·예약 마커로 예약 상품 페이지 연결 경로를 제공해 예약 플랫폼 초기 유입을 확보했습니다.',
        ],
      },
      {
        title: '중고장터',
        points: [
          '키워드 알림, 리뷰 관리, 신고 내역, 인증센터 등 마이페이지 기능 전반을 개발하고 이니시스 인증 API 연동을 통한 본인 확인, 팝빌 API 연동을 통한 계좌 실명 인증 플로우를 구현했습니다.',
          '더치트 사기이력조회 API를 연동하여 거래 상대방의 사기 이력을 사전에 확인할 수 있도록 지원해 중고거래 서비스의 안전성과 신뢰성을 강화했습니다.',
          '중고장터 백오피스에서 판매글 관리, 유저 신고, 거래 상태 확인, 상품 등록 및 검수 등 운영 데이터를 효율적으로 조회·조치할 수 있도록 구현하여 운영 안정성과 업무 효율성을 높였습니다. 홈 모듈 관리 기능을 개발하여 판매글·배너 등 노출 컴포넌트의 등록·기간·노출 여부를 관리자가 직접 제어할 수 있도록 구성했습니다.',
        ],
      },
      {
        title: '백오피스',
        points: [
          '커뮤니티 관리 기능을 고도화하여 신규 모임 생성 및 초대 등 관리 도구를 추가하고 추천 모임 설정 모듈을 도입하여 서비스 내 모임 활성화에 기여했습니다.',
          '회원 탈퇴 사유 및 회원 내역 조회 기능을 추가하고 유저 관심사 기반 맞춤형 홈 모듈 관리 기능을 구현하여 개인화 콘텐츠 제공과 운영 효율성 향상에 기여했습니다.',
        ],
      },
      {
        title: '어바웃피싱 샵',
        points: [
          '장바구니 기능(상품 선택·수량 조절·쿠폰 적용)을 개발하고 주문 불가 상품 처리와 탭별 삭제 등 사용성을 개선했습니다.',
          '결제 금액 계산 오류, 쿠폰 표시 조건, 안내 문구 등 다양한 예외 상황을 반영하고 UI 개선과 동작 안정성 중심의 수정으로 전반적인 서비스 품질을 향상시켰습니다.',
        ],
      },
      {
        title: '낚시대회 고객사 관리자 시스템',
        points: [
          '낚시 대회의 홍보 문의, 모집 대행, 대회 관리(참여자 현황, 기록 현황/등록), 순위 기능을 구현하여 대회 운영 효율성 향상과 플랫폼 서비스 자동화에 기여했습니다.',
        ],
      },
    ],
  },
  {
    company: '스마일벤처스',
    period: '2022.08 ~ 2024.01',
    position: '서비스 개발팀 프론트엔드 개발자',
    projects: [
      {
        title: 'Catchfashion 리뉴얼 (MAU 30만 럭셔리 라이프 E-Commerce 플랫폼)',
        points: [
          '기존 서비스를 React, Redux, Next.js, SWR, Vercel 기반으로 재개발하고 장바구니 및 주문 플로우 페이지의 프론트엔드 개발을 담당했습니다.',
          '상품별 관부가세, 프로모션, 포인트 등 복잡한 할인 정책 계산 로직을 구현하고 기존에 수동으로 입력하던 카드번호 결제 시스템을 외부 PG 연동(토스페이, 카카오페이)으로 전환하여 결제 완료 시간을 단축하고 CVR 14.27% 증가를 달성했습니다.',
          '주문/배송 조회, 취소/반품 처리 등 주문 관리 기능과 주문 플로우 관리, 환불 및 결제수단 관리 어드민 기능을 개발했습니다.',
          'Storybook을 활용하여 주요 공통 컴포넌트를 문서화하고 UI 일관성 유지 및 개발 효율성 향상에 기여했습니다.',
        ],
      },
      {
        title: 'Catchfashion US (글로벌 서비스)',
        points: [
          '검색, 파트너 페이지, 상품 리스트/상세 페이지 전반에 SEO를 적용하여 유입과 구매 전환율 증가에 기여했습니다.',
          '카탈로그 매핑, 브랜드 및 파트너사 관리 어드민 기능을 개발했습니다.',
        ],
      },
    ],
  },
  {
    company: '데이터유니버스',
    period: '2021.06 ~ 2022.08',
    position: '기술개발본부 프론트엔드 개발자',
    projects: [
      {
        title: '스마트피싱보호 서비스 리뉴얼',
        points: [
          '기존 운영 중이던 홈페이지를 리뉴얼하는 동시에 Vue2에서 React로 마이그레이션했으며 부가 서비스의 웹뷰 콘텐츠 페이지를 개편하여 운영했습니다.',
        ],
      },
      {
        title: '휴대폰가족보호',
        points: ['Vue3 기반 홈페이지 및 웹가입 페이지를 개발했습니다.'],
      },
      {
        title: '휴대폰분실보호',
        points: [
          '데스크탑/모바일 적응형 홈페이지를 리뉴얼하고 서비스 페이지에 비가입자 기능을 추가 개발했습니다.',
          '구글 지도에서 네이버 지도 API로 전환하여 개발 비용을 절감했습니다.',
        ],
      },
      {
        title: '웹가입 페이지 개편',
        points: ['웹가입 페이지 UI를 개편하고 관리자 페이지 내 UI 등록 기능을 개발하여 서비스 운영 편의성을 높였습니다.'],
      },
    ],
  },
  {
    company: '헥토이노베이션',
    period: '2019.03 ~ 2021.04',
    position: 'UX 개발팀 웹 퍼블리셔',
    projects: [
      {
        title: 'PASS 앱 / 부가 서비스',
        points: [
          'SKT PASS 앱을 주로 담당하며 세이프캐시, 내정보지키미 등 단독 앱, PASS 앱 내 부가 서비스의 웹뷰 페이지와 이벤트 페이지를 개발 및 운영했습니다.',
          '기존 CSS만 사용하던 업무 환경에 Sass를 도입하여 코드 재사용성과 가독성을 높이고 유지보수 편의성을 개선했습니다.',
        ],
      },
      {
        title: 'TIOR',
        points: ['모바일 웹 페이지를 리뉴얼하고 서비스 및 이벤트 페이지 운영을 담당했습니다.'],
      },
      {
        title: 'PNS(휴대폰번호도용방지서비스)',
        points: ['반응형 홈페이지와 모바일 서비스 페이지를 개발했습니다.'],
      },
    ],
  },
];

export const education = {
  school: '인하공업전문대학',
  degree: '정보통신과 전문학사',
  period: '2012.03 ~ 2016.02',
};

export const certificates = [
  '정보처리산업기사 취득 (2016.05 / 한국산업인력공단)',
  '정보처리기능사 취득 (2013.12 / 한국산업인력공단)',
];
