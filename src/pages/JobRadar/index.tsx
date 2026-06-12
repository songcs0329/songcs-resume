import { useMemo, useState } from 'react';
import JobCard from './JobCard';
import type { CodingTest, DeadlineBucket, FitTier, Job, JobsData, StrategyTier, Tracking } from '@/data/jobRadar';
import jobsJson from '@/data/jobs.json';
import {
  DEADLINE_BUCKET_ORDER,
  STRATEGY_TIERS,
  TRACKING_STORAGE_KEY,
  daysUntil,
  deadlineBucketOf,
  fitTierOf,
  isCommerceJob,
} from '@/data/jobRadar';

const jobsData = jobsJson as unknown as JobsData;

type DeadlineFilter = 'all' | 'soon' | 'rolling' | 'unknown';
type SortKey = 'fit' | 'deadline' | 'new' | 'company';

const EMPTY_TRACKING: Tracking = { applied: false, applied_at: null, notes: '' };

const FIT_TIER_FILTERS: { value: 'all' | FitTier; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: '최상', label: '최상 85+' },
  { value: '상', label: '상 75–84' },
  { value: '중', label: '중 65–74' },
];

const DEADLINE_FILTERS: { value: DeadlineFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'soon', label: '마감임박' },
  { value: 'rolling', label: '상시·수시' },
  { value: 'unknown', label: '미정' },
];

const CODING_TEST_FILTERS: { value: 'all' | CodingTest; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: '코딩테스트', label: '코딩테스트' },
  { value: '과제', label: '과제' },
  { value: '없음', label: '없음' },
];

function loadTracking(): Record<string, Tracking> {
  try {
    return JSON.parse(localStorage.getItem(TRACKING_STORAGE_KEY) ?? '{}') as Record<string, Tracking>;
  } catch {
    return {};
  }
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? 'border-zinc-900 bg-zinc-900 text-white'
          : 'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-500'
      }`}
    >
      {children}
    </button>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-xs font-bold text-zinc-400">{label}</span>
      {children}
    </div>
  );
}

function JobRadar() {
  const [query, setQuery] = useState('');
  const [fitTierFilter, setFitTierFilter] = useState<'all' | FitTier>('all');
  const [deadlineFilter, setDeadlineFilter] = useState<DeadlineFilter>('all');
  const [codingTestFilter, setCodingTestFilter] = useState<'all' | CodingTest>('all');
  const [strategyFilter, setStrategyFilter] = useState<'all' | StrategyTier>('all');
  const [commerceOnly, setCommerceOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [hideApplied, setHideApplied] = useState(false);
  const [sort, setSort] = useState<SortKey>('fit');
  const [tracking, setTracking] = useState<Record<string, Tracking>>(loadTracking);

  const trackOf = (id: string) => tracking[id] ?? EMPTY_TRACKING;

  const updateTracking = (id: string, patch: Partial<Tracking>) => {
    setTracking((current) => {
      const next = { ...current, [id]: { ...EMPTY_TRACKING, ...current[id], ...patch } };
      try {
        localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage 사용 불가 환경에서는 메모리 상태만 유지
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    let jobs = jobsData.jobs.slice();

    if (fitTierFilter !== 'all')
      jobs = jobs.filter((job) => (job.fit_tier ?? fitTierOf(job.fit_score)) === fitTierFilter);
    if (newOnly) jobs = jobs.filter((job) => job.is_new);
    if (hideApplied) jobs = jobs.filter((job) => !trackOf(job.id).applied);
    if (codingTestFilter !== 'all') jobs = jobs.filter((job) => (job.has_codingtest ?? '미확인') === codingTestFilter);
    if (commerceOnly) jobs = jobs.filter(isCommerceJob);
    if (strategyFilter !== 'all') jobs = jobs.filter((job) => job.tier === strategyFilter);

    if (deadlineFilter !== 'all') {
      jobs = jobs.filter((job) => {
        if (deadlineFilter === 'soon') {
          const dday = daysUntil(job.deadline);
          return job.deadline_type === 'date' && dday !== null && dday >= 0 && dday <= 14;
        }
        if (deadlineFilter === 'rolling') return job.deadline_type === 'rolling';
        return job.deadline_type !== 'date' && job.deadline_type !== 'rolling';
      });
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      jobs = jobs.filter((job) => {
        const haystack = [
          job.company,
          job.title,
          job.level,
          job.scale,
          (job.domains ?? []).join(' '),
          job.location,
          job.source,
          (job.process ?? []).join(' '),
          job.deadline_label,
          job.has_codingtest,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    if (sort === 'deadline') {
      jobs.sort((a, b) => {
        const bucketDiff =
          DEADLINE_BUCKET_ORDER.indexOf(deadlineBucketOf(a)) - DEADLINE_BUCKET_ORDER.indexOf(deadlineBucketOf(b));
        if (bucketDiff !== 0) return bucketDiff;
        const ddayA = daysUntil(a.deadline);
        const ddayB = daysUntil(b.deadline);
        if (
          a.deadline_type === 'date' &&
          b.deadline_type === 'date' &&
          ddayA !== null &&
          ddayB !== null &&
          ddayA !== ddayB
        ) {
          return ddayA - ddayB;
        }
        return b.fit_score - a.fit_score;
      });
    } else {
      jobs.sort((a, b) => {
        if (sort === 'company') return a.company.localeCompare(b.company, 'ko');
        if (sort === 'new') return Number(b.is_new ?? false) - Number(a.is_new ?? false) || b.fit_score - a.fit_score;
        return b.fit_score - a.fit_score;
      });
    }

    return jobs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    query,
    fitTierFilter,
    deadlineFilter,
    codingTestFilter,
    strategyFilter,
    commerceOnly,
    newOnly,
    hideApplied,
    sort,
    tracking,
  ]);

  const stats = useMemo(() => {
    const jobs = jobsData.jobs;
    return [
      { label: '누적 공고', value: jobs.length, tone: 'text-zinc-950' },
      {
        label: '최상 핏',
        value: jobs.filter((job) => (job.fit_tier ?? fitTierOf(job.fit_score)) === '최상').length,
        tone: 'text-rose-600',
      },
      {
        label: '상위 핏',
        value: jobs.filter((job) => (job.fit_tier ?? fitTierOf(job.fit_score)) === '상').length,
        tone: 'text-teal-700',
      },
      { label: '신규', value: jobs.filter((job) => job.is_new).length, tone: 'text-rose-600' },
      { label: '지원 완료', value: jobs.filter((job) => trackOf(job.id).applied).length, tone: 'text-zinc-950' },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracking]);

  const handleToggleApplied = (id: string, applied: boolean) => {
    updateTracking(id, { applied, applied_at: applied ? new Date().toISOString().slice(0, 10) : null });
  };

  const renderGroupedByDeadline = () => {
    const groups = new Map<DeadlineBucket, Job[]>();
    filtered.forEach((job) => {
      const bucket = deadlineBucketOf(job);
      groups.set(bucket, [...(groups.get(bucket) ?? []), job]);
    });

    let rank = 0;
    return DEADLINE_BUCKET_ORDER.filter((bucket) => groups.has(bucket)).map((bucket) => {
      const urgent = bucket === '임박(D-7)' || bucket === '2주 이내';
      return (
        <section key={bucket}>
          <h2
            className={`mt-8 flex items-baseline justify-between border-b-2 pb-2 text-sm font-bold ${
              urgent ? 'border-rose-600 text-rose-600' : 'border-zinc-900 text-zinc-900'
            }`}
          >
            <span>{bucket}</span>
            <span className="text-xs font-semibold text-zinc-400">{groups.get(bucket)!.length}건</span>
          </h2>
          {groups.get(bucket)!.map((job) => {
            rank += 1;
            return (
              <JobCard
                key={job.id}
                job={job}
                rank={rank}
                tracking={trackOf(job.id)}
                onToggleApplied={handleToggleApplied}
                onChangeNotes={(id, notes) => updateTracking(id, { notes })}
              />
            );
          })}
        </section>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-zinc-900">
      <main className="mx-auto w-full max-w-6xl px-5 pt-10 pb-28 sm:px-8 sm:pt-14 sm:pb-32">
        <header className="border-b-2 border-zinc-900 pb-6">
          <p className="text-sm font-bold text-teal-700">Job Radar</p>
          <h1 className="mt-3 text-4xl font-black tracking-normal text-zinc-950 sm:text-5xl">프론트엔드 채용 레이더</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-700">
            프론트엔드 포지션을 매일 수집해 같은 보드에 누적하고, 송창석의 프로필(이커머스 결제·지도·웹뷰 주축)에 맞춰
            적합도·마감일·전형절차를 정리합니다.
          </p>
          <p className="mt-3 text-sm font-semibold text-zinc-500">
            최종 수집 · <b className="text-zinc-900">{jobsData.meta.last_collected}</b>
          </p>
        </header>

        <section className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 sm:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-4 py-4">
              <p className={`text-3xl font-black ${stat.tone}`}>{stat.value}</p>
              <p className="mt-1 text-xs font-semibold text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="회사·직책·도메인·전형 검색…"
              className="min-w-52 flex-1 rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-teal-700"
            />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-600"
            >
              <option value="fit">적합도순</option>
              <option value="deadline">마감임박순(그룹)</option>
              <option value="new">신규순</option>
              <option value="company">회사명순</option>
            </select>
          </div>

          <FilterRow label="적합도">
            {FIT_TIER_FILTERS.map((filter) => (
              <Chip
                key={filter.value}
                active={fitTierFilter === filter.value}
                onClick={() => setFitTierFilter(filter.value)}
              >
                {filter.label}
              </Chip>
            ))}
            <Chip active={newOnly} onClick={() => setNewOnly((value) => !value)}>
              신규만
            </Chip>
            <Chip active={hideApplied} onClick={() => setHideApplied((value) => !value)}>
              지원숨김
            </Chip>
            <Chip active={commerceOnly} onClick={() => setCommerceOnly((value) => !value)}>
              🛒 결제·커머스
            </Chip>
          </FilterRow>

          <FilterRow label="마감">
            {DEADLINE_FILTERS.map((filter) => (
              <Chip
                key={filter.value}
                active={deadlineFilter === filter.value}
                onClick={() => setDeadlineFilter(filter.value)}
              >
                {filter.label}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="코테·과제">
            {CODING_TEST_FILTERS.map((filter) => (
              <Chip
                key={filter.value}
                active={codingTestFilter === filter.value}
                onClick={() => setCodingTestFilter(filter.value)}
              >
                {filter.label}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="전략티어">
            <Chip active={strategyFilter === 'all'} onClick={() => setStrategyFilter('all')}>
              전체
            </Chip>
            {STRATEGY_TIERS.map((tier) => (
              <Chip
                key={tier.value}
                active={strategyFilter === tier.value}
                onClick={() => setStrategyFilter(tier.value)}
              >
                {tier.label}
              </Chip>
            ))}
          </FilterRow>
        </section>

        <section className="mt-4">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-base text-zinc-500 italic">조건에 맞는 공고가 없습니다.</p>
          ) : sort === 'deadline' ? (
            renderGroupedByDeadline()
          ) : (
            filtered.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                rank={index + 1}
                tracking={trackOf(job.id)}
                onToggleApplied={handleToggleApplied}
                onChangeNotes={(id, notes) => updateTracking(id, { notes })}
              />
            ))
          )}
        </section>

        <footer className="mt-10 border-t-2 border-zinc-900 pt-4 text-xs font-semibold text-zinc-500">
          JOB RADAR · 자동수집 → 채점 → jobs.json 누적·중복제거 → git push · 지원 추적은 이 기기(localStorage)에만
          저장됩니다
        </footer>
      </main>
    </div>
  );
}

export default JobRadar;
