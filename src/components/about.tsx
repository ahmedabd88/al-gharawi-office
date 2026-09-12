import { about, office } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border/60 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="section-rule mb-5" aria-hidden />
          <h2 className="font-heading text-3xl font-bold text-brand sm:text-4xl">{about.title}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{about.lead}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-5 text-base leading-8 text-foreground/90 sm:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="rounded-md border border-dashed border-gold/50 bg-gold/5 px-4 py-3 text-sm leading-7 text-stone-warm">
              {about.note}
            </p>
          </div>

          <aside className="border-s-4 border-primary/70 bg-secondary/60 px-5 py-6 sm:px-6">
            <p className="font-heading text-xl font-semibold text-brand">{office.representative}</p>
            <p className="mt-2 text-sm text-muted-foreground">{office.role}</p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-foreground">الدائرة</dt>
                <dd className="mt-1 text-muted-foreground">{office.district}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">الانتخابات</dt>
                <dd className="mt-1 text-muted-foreground">مجلس النواب {office.electionYear}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">الاسم الكامل</dt>
                <dd className="mt-1 text-muted-foreground">{office.fullName}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
