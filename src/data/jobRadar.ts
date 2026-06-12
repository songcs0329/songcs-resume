export type DeadlineType = 'date' | 'rolling' | 'unknown';
export type StrategyTier = '문샷' | '메인' | '문열기';
export type FitTier = '최상' | '상' | '중' | '하';
export type CodingTest = '코딩테스트' | '과제' | '없음' | '미확인';

export interface BriefSource {
  title: string;
  url: string;
}

export interface JobBrief {
  verdict?: string;
  company_status?: string;
  strengths?: string[];
  gaps?: string[];
  pass_odds?: string;
  strategy?: string;
  sources?: BriefSource[];
}

export interface Job {
  id: string;
  company: string;
  title: string;
  level?: string;
  scale?: string;
  source?: string;
  url: string;
  location?: string;
  exp?: string;
  exp_min_years?: number | null;
  domains?: string[];
  deadline?: string | null;
  deadline_type: DeadlineType;
  deadline_label?: string;
  process?: string[];
  process_confirmed?: boolean;
  process_note?: string;
  has_codingtest?: CodingTest;
  fit_score: number;
  fit_tier?: FitTier;
  fit_reasons?: string[];
  tier: StrategyTier;
  is_new?: boolean;
  brief?: JobBrief;
}

export interface JobsData {
  meta: { last_collected: string };
  jobs: Job[];
}

export interface Tracking {
  applied: boolean;
  applied_at: string | null;
  notes: string;
}

export const TRACKING_STORAGE_KEY = 'jobradar_tracking_v1';

export const STRATEGY_WEAPONS: Record<StrategyTier, string> = {
  문샷: '성과 수치 전면(CVR +14.27% · CTR 11.3% · 활성 사용자 +61%) + 대규모 서비스 경험',
  메인: '이커머스 결제 + 지도·웹뷰 하이브리드 풀스토리(주축 2개 모두)',
  문열기: '0→1 폭넓음 — SEO·어드민·인증·결제·배포까지 혼자서 전 영역',
};

export const STRATEGY_TIERS: { value: StrategyTier; label: string }[] = [
  { value: '문샷', label: '🚀 문샷' },
  { value: '메인', label: '🎯 메인' },
  { value: '문열기', label: '🚪 문열기' },
];

export const DEADLINE_BUCKET_ORDER = [
  '임박(D-7)',
  '2주 이내',
  '이번 달',
  '이후 마감',
  '상시·수시',
  '마감일 미정',
  '마감',
] as const;

export type DeadlineBucket = (typeof DEADLINE_BUCKET_ORDER)[number];

export function fitTierOf(score: number): FitTier {
  if (score >= 85) return '최상';
  if (score >= 75) return '상';
  if (score >= 65) return '중';
  return '하';
}

const COMMERCE_DOMAINS = ['커머스', '이커머스', '결제', '핀테크'];
const COMMERCE_RE = /커머스|결제|페이먼츠|쇼핑|핀테크|commerce|payment|fintech/i;

export function isCommerceJob(job: Job): boolean {
  if ((job.domains ?? []).some((domain) => COMMERCE_DOMAINS.includes(domain))) return true;
  return COMMERCE_RE.test(`${job.company} ${job.title}`);
}

export function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysUntil(deadline?: string | null): number | null {
  if (!deadline) return null;
  return Math.round((new Date(deadline).getTime() - new Date(todayString()).getTime()) / 86_400_000);
}

export function deadlineBucketOf(job: Job): DeadlineBucket {
  if (job.deadline && job.deadline_type === 'date') {
    const dday = daysUntil(job.deadline) ?? 0;
    if (dday < 0) return '마감';
    if (dday <= 7) return '임박(D-7)';
    if (dday <= 14) return '2주 이내';
    const deadline = new Date(job.deadline);
    const today = new Date(todayString());
    if (deadline.getFullYear() === today.getFullYear() && deadline.getMonth() === today.getMonth()) {
      return '이번 달';
    }
    return '이후 마감';
  }
  if (job.deadline_type === 'rolling') return '상시·수시';
  return '마감일 미정';
}
