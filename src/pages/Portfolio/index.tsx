import Section from '@/components/Section';
import SkillBadge from '@/components/SkillBadge';
import { portfolioProjects } from '@/data/portfolio';

function Portfolio() {
  return (
    <div className="min-h-screen bg-[#f6f3ee] text-zinc-900">
      <main className="mx-auto w-full max-w-6xl px-5 pt-10 pb-28 sm:px-8 sm:pt-14 sm:pb-32">
        <section className="pb-10">
          <p className="text-sm font-bold text-teal-700">Portfolio</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-normal text-zinc-950 sm:text-5xl">
            프론트엔드 중심으로 풀어낸 프로젝트
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-zinc-700">
            지도 기반 데이터 시각화와 실시간 멀티플레이어 게임처럼 상태 흐름이 복잡한 도메인을 프론트엔드 관점에서
            정리했습니다. 서버 구현은 AI 도구를 활용했고 화면과 연동 흐름을 중심으로 기여 범위를 명확히 적었습니다.
          </p>
        </section>

        <Section title="프로젝트" eyebrow="Projects">
          <div className="grid gap-6">
            {portfolioProjects.map((project, index) => (
              <article key={project.title} className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto]">
                  <div>
                    <p className="text-xs font-bold uppercase text-teal-700">
                      Project {String(index + 1).padStart(2, '0')} · {project.period}
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-normal text-zinc-950">{project.title}</h2>
                    <p className="mt-1 text-base font-bold text-zinc-700">{project.subtitle}</p>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-700">{project.description}</p>
                    <p className="mt-3 max-w-3xl rounded-md bg-teal-50 px-3 py-2 text-sm font-semibold leading-6 text-teal-900">
                      {project.contribution}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-start gap-2 lg:justify-end">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-teal-700 bg-teal-700 px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-teal-800"
                    >
                      Demo
                    </a>
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-bold text-zinc-900 transition hover:-translate-y-0.5 hover:border-zinc-500"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)]">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-950">핵심 구현</h3>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-950">구조</h3>
                      <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
                        {project.architecture.map((item) => (
                          <li key={item.label} className="flex gap-2">
                            <span className="shrink-0 font-bold text-teal-700">{item.label}</span>
                            <span>{item.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-950">기술 스택</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((skill) => (
                          <SkillBadge key={skill.label} skill={skill} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}

export default Portfolio;
