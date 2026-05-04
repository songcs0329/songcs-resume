import { coverLetter } from '@/data/coverLetter';

function CoverLetter() {
  return (
    <div className="min-h-screen bg-[#f6f3ee] text-zinc-900">
      <main className="mx-auto w-full max-w-5xl px-5 pt-10 pb-28 sm:px-8 sm:pt-14 sm:pb-32">
        <section className="pb-10">
          <h1 className="mt-3 max-w-4xl whitespace-pre-line text-3xl font-black tracking-normal text-zinc-950 sm:text-5xl">
            {coverLetter.title}
          </h1>
          <p className="mt-5 max-w-3xl whitespace-pre-line text-lg font-medium leading-8 text-zinc-700">
            {coverLetter.intro}
          </p>
        </section>

        <section className="py-8 sm:py-10">
          <div className="grid gap-8">
            {coverLetter.sections.map((section, index) => (
              <article key={section.title} className="grid gap-3 border-b border-zinc-300 pb-8 last:border-b-0">
                <div>
                  <p className="text-xs font-bold uppercase text-teal-700">
                    Letter {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-normal text-zinc-950">{section.title}</h2>
                </div>
                <div className="grid gap-3 text-base leading-8 text-zinc-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CoverLetter;
