import type { Experience } from '@/data/resume';

interface TimelineItemProps {
  experience: Experience;
}

function TimelineItem({ experience }: TimelineItemProps) {
  return (
    <article className="border-b border-zinc-200 py-7 last:border-b-0 first:pt-0">
      <div className="grid gap-2">
        <div>
          <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-bold tracking-normal text-zinc-950">
            <span>{experience.company}</span>
            <span className="rounded border border-teal-200 bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-700">
              {experience.period}
            </span>
          </h3>
          <p className="mt-1 text-sm font-semibold text-zinc-600">
            {experience.position}
            {experience.type ? ` · ${experience.type}` : ''}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5">
        {experience.projects.map((project) => (
          <div key={project.title} className="rounded-lg border border-zinc-200 bg-white p-5">
            <h4 className="text-base font-bold tracking-normal text-zinc-950">{project.title}</h4>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
              {project.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {project.result ? (
              <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm font-semibold leading-6 text-amber-900">
                성과: {project.result}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  );
}

export default TimelineItem;
