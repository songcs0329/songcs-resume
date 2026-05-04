import Section from '@/components/Section';
import SkillBadge from '@/components/SkillBadge';
import TimelineItem from '@/components/TimelineItem';
import { certificates, education, experiences, profile, skills, summary } from '@/data/resume';

function Resume() {
  const profileImageSrc = `${import.meta.env.BASE_URL}profile.jpg`;

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-zinc-900">
      <main className="mx-auto w-full max-w-6xl px-5 pt-10 pb-28 sm:px-8 sm:pt-14 sm:pb-32">
        <section className="grid gap-8 pb-10 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="text-sm font-bold text-teal-700">{profile.role}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-normal text-zinc-950 sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-zinc-700">{profile.headline}</p>
          </div>
          <aside className="border-t border-zinc-300 pt-5 lg:border-t-0 lg:border-l lg:pl-6">
            <div className="flex items-start gap-4">
              <img
                src={profileImageSrc}
                alt={`${profile.name} 프로필 사진`}
                className="aspect-square w-24 shrink-0 rounded-full border border-zinc-300 object-cover shadow-sm sm:w-28 lg:w-32"
              />
              <div className="grid min-w-0 flex-1 justify-items-start gap-2">
                {profile.contact.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="inline-flex min-h-10 w-fit max-w-full items-center gap-2 rounded-md border bg-white px-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      borderColor: `${item.color}55`,
                      backgroundColor: `${item.color}10`,
                    }}
                  >
                    <span className="shrink-0 text-xs font-bold" style={{ color: item.color }}>
                      {item.label.toUpperCase()}
                    </span>
                    <span className="min-w-0 truncate">{item.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <Section title="요약" eyebrow="Profile">
          <ul className="grid gap-3">
            {summary.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-7 text-zinc-700">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-teal-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="기술 스택" eyebrow="Skills">
          <div className="grid gap-5">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-bold text-zinc-950">{group.category}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <SkillBadge key={skill.label} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="경력" eyebrow="Experience">
          <div>
            {experiences.map((experience) => (
              <TimelineItem key={`${experience.company}-${experience.period}`} experience={experience} />
            ))}
          </div>
        </Section>

        <Section title="학력 및 자격증" eyebrow="Education">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="text-base font-bold text-zinc-950">{education.school}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{education.degree}</p>
              <p className="text-sm font-semibold text-teal-700">{education.period}</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-950">자격증</h3>
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-zinc-700">
                {certificates.map((certificate) => (
                  <li key={certificate}>{certificate}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default Resume;
