# Job Radar 원본 공고 (수집기 → 큐레이터 인계 파일)

`scripts/job_radar_collect.py`가 **URL 200 검증을 통과한** 공고만 여기에 적는다.
Claude 루틴은 이 파일을 읽어 채점·브리프를 붙여 `src/data/jobs.json`으로 옮기고,
처리한 블록은 `data/raw-jobs-archive.md` 끝에 덧붙인다. 여기 없는 공고를 임의로 만들어 넣지 말 것.

처리 대기분만 남기는 파일이다 — 루틴이 매 실행 통째로 읽으므로 작게 유지한다.

## Pending

### 이네이블러 - 풀스택 개발자 채용

- url: https://jumpit.saramin.co.kr/position/54984641
- verified: 2026-09-09 (HTTP 200)
- source: jumpit
- deadline: 2026-10-08

```
점핏 | 풀스택 개발자 채용 회원가입/로그인 개발자 채용 이력서 #꿀 피드 개발자 인터뷰 회원가입/로그인 기업 서비스 풀스택 개발자 채용 이네이블러 💰 취업축하금 50만원 포지션 상세 정보 기술스택 C# Docker Java MariaDB Spring Boot Vue.js WPF Minio 주요업무 이번 채용은 2명을 선발합니다. 각자가 전체 스택을 이해하고 필요에 따라 어느 영역이든 커버할 수 있는 풀스택 마인드를 가진 분을 찾습니다. ① 현장 클라이언트 (C#/WPF) • WPF MVVM 패턴 기반 AI 품질검사 현장 앱 개발 및 유지보수 • OpenCvSharp4를 활용한 실시간 영상처리 및 이미지 분석 • Modbus TCP/IP 프로토콜 기반 PLC 산업통신 구현 • AI 추론 엔진 연동(OCR·CNN·YOLO 등 분류/검출/이상탐지) 구현 • 고객사 현장 설치·디버깅·유지보수 지원 ② 백엔드 API (Java/Spring Boot) • Spring Boot 2.7 기반 REST API 설계 및 개발 • MariaDB 스키마 설계 및 JPA 기반 데이터 처리 • MinIO 연동 검사 이미지 수집·저장·관리 파이프라인 • Spring Security + JWT 기반 인증/인가 시스템 운영 ③ 프론트엔드 대시보드 (Vue 3) • Vue 3 Composition API + Vite 기반 실시간 모니터링 대시보드 • Chart.js 활용 생산 현황·불량률·이상탐지 데이터 시각화 • Tailwind CSS 기반 반응형 UI 구현 ④ 인프라 / AI 도구 활용 • Docker Compose 기반 멀티스테이지 빌드 환경 구성 및 운영 • Claude Code를 활용한 기능 구현·리팩토링·버그 수정·테스트 자동 생성 • AI 기반 PR 리뷰·보안 취약점 탐지·미경험 기술 빠른 학습 및 적용 자격요건 ✔ Claude Code, Cursor 등 AI 코딩 도구 실무 활용 경험 ✔ C# 또는 Java 중 하나 이상 실무 개발 경험 3년 이상 ✔ 풀스택 마인드 — 자기 영역 외에도 필요 시 작업 가능한 유연성 ✔ 자기주도적 문제 정의·해결 능력 (2인 소규모 팀 특성상 필수) ✔ Git 기반 협업 경험 우대사항 ▷ C# (.NET 8 / WPF / MVVM) 실무 경험 ▷ Java Spring Boot · JPA · MariaDB 실무 경험 ▷ Vue 3 (Composition API) 실무 경험 ▷ OpenCV 또는 영상처리 라이브러리 활용 경험 ▷ Docker / Docker Compose 기반 배포 경험 ▷ Modbus TCP/IP 또는 PLC 산업통신 경험 ▷ 제조 현장 시스템 개발·납품 경험 복지 및 혜택 💰 연봉 5,000~8,000만원 협의 · 성과 인센티브 🌱 스톡옵션 부여 검토 (핵심 인재) 🛠 Claude Code · Cursor 라이선스 전액 지원 💻 고사양 맥북 또는 워크스테이션 지급 📚 도서 · 교육 · 컨퍼런스 참가비 전액 지원 🕐 자율 출퇴근 (코어타임 10~16시) · 하이브리드 🔬 특허 공동 발명자 등재 및 보상 🌏 태국 등 해외 프로젝트 참여 기회 채용절차 및 기타 지원 유의사항 이메일 : careers@enabler-ai.com 전화 : 010-2838-8553 제목 형식 : [풀스택개발자] 홍길동 제출 서류 : 이력서 + GitHub/포트폴리오 링크 (필수) 채용 절차 : 서류 전형 → 실무 면접 (AI 도구 시연) → 최종 합격 선발 인원 : 2명 포지션 경력/학력/마감일/근무지역 정보 경력 경력 3~10년 학력 대학교졸업(4년) 이상 마감일 2026-10-08 근무지역 울산 남구 신정로116번길36, 3층 지도보기 · 주소복사 기업/서비스 소개 기업상세 정보로 이동 회사 소개 Enabler Inc.(주식회사 이네이블러)는 제조업을 위한 Physical AI MLOps 플랫폼 기업입니다. AI가 보고(Vision) → 판단하고 → 행동하는(Robot) 세상을 만드는 것이 우리의 목표입니다. 창업 14개월 만에 현대기아차 1차 협력사 5개사 이상에 시스템을 납품하고 5억 원의 매출을 만들었습니다. 인포뱅크 시드 투자를 유치했으며, 태국에 JV를 설립하여 ASEAN 시장 첫 거점을 확보했습니다. 최종 합격하면 취업축하금 50만원 이네이블러 기업정보 보기 지원하기 지원하기 스크랩 공유 면접 예상 질문 을 받아보세요! AI 면접 코치
```

### 하마랩 - Front-End 경력사원 채용

- url: https://jumpit.saramin.co.kr/position/54964030
- verified: 2026-09-09 (HTTP 200)
- source: jumpit
- deadline: 2026-10-07

```
점핏 | Front-End 경력사원 채용 회원가입/로그인 개발자 채용 이력서 #꿀 피드 개발자 인터뷰 회원가입/로그인 기업 서비스 Front-End 경력사원 채용 하마랩 💰 취업축하금 50만원 📈 영업이익 20% 지속성장 👶 육아휴직 📈 급성장중 🏝️ 자유로운 연차 👗 프리한 복장 👍 워라밸 🍭 간식 제공 포지션 상세 정보 기술스택 Dart Firebase Flutter Git iOS JavaScript TypeScript Vue.js vuex REST API 주요업무 • Flutter 기반 Android / iOS 모바일 앱 개발 • Vue.js 기반 웹 서비스, 관리자 페이지, 모바일 웹 개발 • REST API 연동 및 프론트엔드 비즈니스 로직 구현 • 모바일/웹 UI 개발 및 사용자 경험 개선 • Flutter 앱 성능 개선, 렌더링 최적화, 메모리 이슈 대응 • Firebase, FCM, Analytics, Crashlytics, Sentry 등 모바일 운영 기능 연동 • WebView, 동영상 플레이어, 지도/위치, 카메라, QR, 실시간 소켓 등 모바일 특화 기능 개발 • Android / iOS 앱 빌드 환경 이해 및 스토어 심사 이슈 대응 협업 • 인프라팀과 협업하여 웹/앱 배포 과정에서 발생하는 프론트엔드 이슈 대응 • 기존 서비스 유지보수 및 레거시 코드의 점진적 리팩터링 • 신규 프론트엔드 기술 PoC, 도입 검토, 팀 내 공유 • 기획, 디자인, 백엔드, 인프라팀과 협업하여 서비스 품질 개선 [사용기술] Flutter, Dart, Vue.js, JavaScript, TypeScript, Android, iOS, REST API, Git, Firebase, FCM, Vuex, Pinia, Riverpod, Dio, Vite, WebView, Capacitor, Cordova, Sentry, Playwright 자격요건 • 프론트엔드 개발 경력 3년 이상 • 대학교 졸업 4년 이상 • 정규직 전환 의사가 있으신 분 • Flutter 기반 Android / iOS 앱 개발 경험 • Vue.js 기반 웹 프론트엔드 개발 경험 • Dart, JavaScript, TypeScript 개발 경험 • RESTful API 연동 및 비동기 데이터 처리 경험 • 모바일 앱 빌드 환경 및 App Store / Google Play 심사 프로세스에 대한 기본 이해 • Git 기반 협업 경험 및 코드 리뷰 문화에 익숙하신 분 • 상태관리 Provider, Riverpod, Vuex, Pinia 등 사용 경험 • 기존 코드 구조를 이해하고 안정적으로 개선할 수 있는 분 • 문제를 빠르게 파악하고 스스로 해결책을 제안할 수 있는 분 • 사용자 중심 사고를 바탕으로 UI/UX 개선에 관심 있는 분 • 새로운 기술을 검토할 때 생산성, 유지보수성, 운영 리스크를 함께 고려할 수 있는 분 우대사항 • Flutter Riverpod, GoRouter, AutoRoute, Freezed, json_serializable, build_runner 사용경험 • Android Native Java/Kotlin 또는 iOS Native Swift 경험 • Capacitor / Cordova 기반 하이브리드 앱 개발 경험 • Native bridge 또는 커스텀 플러그인 개발 경험 • Firebase Authentication, Analytics, Crashlytics, Messaging 사용 경험 • Sentry 등 모니터링 도구를 활용한 장애 분석 및 품질 개선 경험 • WebView, 동영상 플레이어, 실시간 서비스, 위치 기반 서비스 개발 경험 • 앱 권한, 딥링크, Firebase 설정, 인증서/프로비저닝 등 앱 운영 이슈 대응 경험 • Playwright,Cypress,Jest, Flutter test, integration_test 등 테스트 자동화 경험 • 대규모 서비스 운영 및 장애 대응 경험 • 사내 공통 컴포넌트, 플러그인, 개발 도구, 디자인 시스템 구축 경험 • 애자일 환경에서 빠르게 실험하고 개선해본 경험 [이런 분과 함께하고 싶습니다] • 새로운 기술을 좋아하지만, 무작정 도입하기보다 서비스 안정성과 팀 생산성을 함께 고려하는 분 • PoC를 통해 기술의 장단점을 검증하고 실제 서비스에 맞게 적용할 수 있는 분 • 레거시 코드를 부정적으로만 보지 않고, 현재 구조를 이해한 뒤 점진적으로 개선하는 분 • Flutter, Vue, 하이브리드 앱, 네이티브 연동까지 서비스 전체 흐름을 넓게 보고 문제를 해결하는 분 • 코드 품질, 사용자 경험, 개발 생산성, 운영 안정성을 모두 중요하게 생각하는 분 • 기획, 디자인, 백엔드, 인프라팀과 적극적으로 소통하며 더 나은 방향을 제안할 수 있는 분 복지 및 혜택 [근무조건] • 학사 졸업 신입 기준 계약직 2개월 월급여 267만원~290만원 • 학사 졸업 신입 기준 정규직 전환시 연봉 : 3480만원 ~ 4020만원 • 경력직의 경우 입사 전 협의 [복리후생] • 급여제도 : 퇴직연금, 우수사원포상, 퇴직금, 4대 보험 • 근무 환경 : 회의실, 
```
