import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { about, office } from "@/lib/content";

export const metadata: Metadata = {
  title: `عن المكتب | ${office.brand}`,
  description: about.lead,
};

export default function AboutPage() {
  return (
    <PageShell title={about.title} lead={about.lead}>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 text-base leading-8 text-foreground/90 sm:text-lg">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="rounded-md border border-dashed border-gold/45 bg-gold/5 px-4 py-3 text-sm leading-7 text-stone-warm">
            {about.note}
          </p>
        </div>
        <aside className="border-s-4 border-gold bg-[#111111] px-5 py-6 text-white sm:px-6">
          <p className="text-xs tracking-wide text-gold">{office.mediaOffice}</p>
          <p className="mt-2 font-heading text-xl font-semibold">{office.representative}</p>
          <p className="mt-1 text-sm text-white/70">{office.role}</p>
          <dl className="mt-6 space-y-4 text-sm">
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
        </aside>
      </div>
    </PageShell>
  );
}
