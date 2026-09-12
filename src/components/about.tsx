import Image from "next/image";
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

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-5 text-base leading-8 text-foreground/90 sm:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="rounded-md border border-dashed border-gold/50 bg-gold/5 px-4 py-3 text-sm leading-7 text-stone-warm">
              {about.note}
            </p>
          </div>

          <aside className="overflow-hidden border border-border/70 bg-[#0f0f0f] text-white shadow-sm">
            <div className="relative aspect-[1080/556] w-full">
              <Image
                src={office.bannerSrc}
                alt={office.bannerAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover object-top"
              />
            </div>
            <div className="border-t border-gold/30 px-5 py-5 sm:px-6">
              <p className="text-xs tracking-wide text-gold">{office.mediaOffice}</p>
              <p className="mt-2 font-heading text-xl font-semibold">{office.representative}</p>
              <p className="mt-1 text-sm text-white/70">{office.role}</p>
              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-gold/90">الدائرة</dt>
                  <dd className="mt-1 text-white/75">{office.district}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gold/90">الكتلة</dt>
                  <dd className="mt-1 text-white/75">{office.bloc}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gold/90">الانتخابات</dt>
                  <dd className="mt-1 text-white/75">مجلس النواب {office.electionYear}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
