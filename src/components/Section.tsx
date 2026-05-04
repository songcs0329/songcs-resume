interface SectionProps {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}

function Section({ title, eyebrow, children }: SectionProps) {
  return (
    <section className="border-t border-zinc-300 py-8 sm:py-10">
      <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
        <div>
          {eyebrow ? <p className="text-xs font-bold uppercase text-teal-700">{eyebrow}</p> : null}
          <h2 className="mt-1 text-xl font-bold tracking-normal text-zinc-950">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default Section;
