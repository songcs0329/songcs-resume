import { useState } from 'react';
import type { CodingTest, FitTier, Job, StrategyTier } from '@/data/jobRadar';
import { STRATEGY_WEAPONS, daysUntil, fitTierOf, isCommerceJob } from '@/data/jobRadar';

const STRATEGY_BADGE_CLASS: Record<StrategyTier, string> = {
  문샷: 'bg-rose-100 text-rose-700',
  메인: 'bg-teal-100 text-teal-800',
  문열기: 'bg-amber-100 text-amber-800',
};

const FIT_TIER_CLASS: Record<FitTier, string> = {
  최상: 'bg-rose-100 text-rose-700',
  상: 'bg-teal-100 text-teal-800',
  중: 'bg-amber-100 text-amber-800',
  하: 'bg-zinc-200 text-zinc-600',
};

const CODING_TEST_CLASS: Record<CodingTest, string> = {
  코딩테스트: 'bg-rose-50 text-rose-700',
  과제: 'bg-amber-50 text-amber-700',
  없음: 'bg-teal-50 text-teal-700',
  미확인: 'bg-zinc-100 text-zinc-500',
};

function DdayChip({ job }: { job: Job }) {
  const base = 'rounded-md px-2 py-0.5 text-xs font-semibold';

  if (job.deadline && job.deadline_type === 'date') {
    const dday = daysUntil(job.deadline) ?? 0;
    if (dday < 0) return <span className={`${base} bg-zinc-200 text-zinc-500`}>마감</span>;
    const tone =
      dday <= 7 ? 'bg-rose-100 text-rose-700' : dday <= 14 ? 'bg-amber-100 text-amber-700' : 'bg-teal-50 text-teal-700';
    const [, month, day] = job.deadline.split('-');
    return (
      <span className={`${base} ${tone}`}>
        D-{dday} · {month}/{day} 마감
      </span>
    );
  }
  if (job.deadline_type === 'rolling') {
    return <span className={`${base} bg-teal-50 text-teal-700`}>{job.deadline_label ?? '상시·수시'}</span>;
  }
  return <span className={`${base} bg-zinc-100 text-zinc-500`}>{job.deadline_label ?? '마감일 미정'}</span>;
}

function BriefPanel({ job }: { job: Job }) {
  const brief = job.brief;
  const hasContent = brief && (brief.verdict || brief.company_status || (brief.strengths?.length ?? 0) > 0);

  if (!hasContent) {
    return (
      <p className="text-sm text-zinc-500 italic">
        📋 상세 분석 준비 중 — Claude에게 "{job.company} 분석해줘"라고 하면 회사 상태·적합성·통과 확률·전략이 채워져요.
      </p>
    );
  }

  const section = (label: string, body: React.ReactNode) => (
    <div>
      <p className="text-xs font-bold tracking-wide text-teal-700">{label}</p>
      <div className="mt-1 text-sm leading-6 text-zinc-700">{body}</div>
    </div>
  );

  return (
    <div className="grid gap-3">
      {brief.verdict && <p className="text-sm leading-6 font-bold text-zinc-900">{brief.verdict}</p>}
      {brief.company_status && section('회사 상태', <p>{brief.company_status}</p>)}
      {(brief.strengths?.length ?? 0) > 0 &&
        section(
          '강점 매칭',
          <ul className="grid gap-1">
            {brief.strengths!.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="font-bold text-teal-700">＋</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>,
        )}
      {(brief.gaps?.length ?? 0) > 0 &&
        section(
          '약점·경쟁',
          <ul className="grid gap-1">
            {brief.gaps!.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="font-bold text-rose-600">－</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>,
        )}
      {brief.pass_odds && section('서류 통과 확률', <p>{brief.pass_odds}</p>)}
      {brief.strategy && section('전략', <p>{brief.strategy}</p>)}
      {(brief.sources?.length ?? 0) > 0 && (
        <p className="text-xs text-zinc-500">
          출처 ·{' '}
          {brief.sources!.map((source, index) => (
            <span key={source.url}>
              {index > 0 && ' · '}
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-teal-700"
              >
                {source.title} ↗
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

interface JobCardProps {
  job: Job;
  rank: number;
}

function JobCard({ job, rank }: JobCardProps) {
  const [briefOpen, setBriefOpen] = useState(false);
  const fitTier = job.fit_tier ?? fitTierOf(job.fit_score);
  const codingTest = job.has_codingtest ?? '미확인';

  return (
    <article className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4 border-b border-zinc-200 py-6 sm:grid-cols-[2.5rem_minmax(0,1fr)_5rem]">
      <p className="pt-1 text-right text-xl font-black text-zinc-300">{rank}</p>

      <div className="min-w-0">
        <h2 className="text-lg leading-snug font-black text-zinc-950 sm:text-xl">
          {job.company} <span className="font-semibold text-zinc-600">· {job.title}</span>
          {job.is_new && (
            <span className="ml-2 inline-block rounded bg-rose-600 px-1.5 py-0.5 align-middle text-[10px] font-bold text-white">
              NEW
            </span>
          )}
          <span
            className={`ml-2 inline-block rounded px-2 py-0.5 align-middle text-[11px] font-bold whitespace-nowrap ${STRATEGY_BADGE_CLASS[job.tier]}`}
          >
            {job.tier}
          </span>
        </h2>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-600">
          <DdayChip job={job} />
          {job.level && <span>{job.level}</span>}
          {job.location && <span>· {job.location}</span>}
          {job.source && <span>· {job.source}</span>}
        </div>

        <p className="mt-2 inline-block rounded-md border border-dashed border-zinc-300 bg-white px-2.5 py-1 text-xs text-zinc-600">
          🎯 <b className="text-zinc-900">{job.tier}</b> 티어 · 무기: {STRATEGY_WEAPONS[job.tier]}
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {isCommerceJob(job) && (
            <span className="rounded-md bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-800">🛒 결제·커머스</span>
          )}
          {(job.domains ?? []).map((domain) => (
            <span key={domain} className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800">
              {domain}
            </span>
          ))}
          {job.scale && (
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">{job.scale}</span>
          )}
          {job.exp && (
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">경력 {job.exp}</span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-zinc-600">
          <span className="font-bold text-zinc-400">전형</span>
          {(job.process?.length ?? 0) > 0 ? (
            <>
              {job.process!.map((step, index) => (
                <span key={`${step}-${index}`} className="flex items-center gap-1.5">
                  {index > 0 && <span className="text-zinc-300">›</span>}
                  <span className="rounded border border-zinc-200 bg-white px-1.5 py-0.5">{step}</span>
                </span>
              ))}
              {!job.process_confirmed && <span className="text-zinc-400 italic">(추정)</span>}
            </>
          ) : (
            <span className="text-zinc-400 italic">전형 정보 미확인 — 공고 확인</span>
          )}
          <span className={`rounded px-1.5 py-0.5 font-semibold ${CODING_TEST_CLASS[codingTest]}`}>
            {codingTest === '없음' ? '코테 없음' : codingTest === '미확인' ? '코테 미확인' : codingTest}
          </span>
          {job.process_note && <span className="text-zinc-400 italic">· {job.process_note}</span>}
        </div>

        {(job.fit_reasons?.length ?? 0) > 0 && (
          <ul className="mt-2 grid gap-1 text-sm leading-6 text-zinc-700">
            {job.fit_reasons!.map((reason) => (
              <li key={reason} className="flex gap-2">
                <span className="text-zinc-300">—</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-zinc-900 underline underline-offset-4 transition hover:text-teal-700"
          >
            공고 보기 ↗
          </a>
          <button
            type="button"
            onClick={() => setBriefOpen((open) => !open)}
            className="rounded-full border border-teal-700 px-3 py-1 text-xs font-semibold text-teal-700 transition hover:bg-teal-50"
          >
            {briefOpen ? '닫기 ▴' : '정보 보기 ▾'}
          </button>
        </div>

        {briefOpen && (
          <div className="mt-3 rounded-lg border border-zinc-200 border-l-4 border-l-teal-700 bg-white p-4">
            <BriefPanel job={job} />
          </div>
        )}
      </div>

      <div className="col-start-2 flex items-center gap-2 sm:col-start-3 sm:block sm:text-center">
        <p className="text-3xl font-black text-zinc-950">{job.fit_score}</p>
        <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold sm:mt-1 ${FIT_TIER_CLASS[fitTier]}`}>
          {fitTier}
        </span>
        <div className="hidden h-1 overflow-hidden rounded bg-zinc-200 sm:mt-2 sm:block">
          <i className="block h-full bg-zinc-900" style={{ width: `${job.fit_score}%` }} />
        </div>
      </div>
    </article>
  );
}

export default JobCard;
