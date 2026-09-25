import type { Metadata } from "next";
import { BrandViewportShell } from "@/components/brand-viewport-shell";
import { about, office } from "@/lib/content";
import { getSiteContentSnapshot } from "@/lib/site-content-store";

export const metadata: Metadata = {
  title: `عن المكتب | ${office.brand}`,
  description: about.lead,
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const site = await getSiteContentSnapshot();

  const facts = [
    { label: "الاسم", value: office.fullName },
    { label: "الدائرة", value: office.district },
    { label: "الكتلة", value: office.bloc },
    { label: "الانتخابات", value: `مجلس النواب ${office.electionYear}` },
    { label: "الاستقبال", value: site.hours },
    { label: "الهاتف", value: site.phoneDisplay, href: `tel:${site.phoneTel}` },
  ];

  return (
    <BrandViewportShell title={about.title} lead={about.lead}>
      <div className="grid h-full min-h-0 gap-2.5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-3">
        <div className="flex min-h-0 flex-col justify-start overflow-hidden rounded-xl border border-gold/30 bg-black/45 p-3 sm:rounded-2xl sm:p-4">
          <p className="text-[10px] font-medium tracking-wide text-gold sm:text-[11px]">
            {office.mediaOffice}
          </p>
          <p className="font-heading mt-0.5 text-base font-bold text-white sm:text-lg">
            {office.representative}
          </p>
          <p className="text-[11px] text-white/55 sm:text-xs">{office.role}</p>

          <div className="mt-2 space-y-1.5 overflow-hidden text-[12px] leading-snug text-white/80 sm:mt-2.5 sm:space-y-2 sm:text-[13px] sm:leading-relaxed">
            {about.paragraphs.slice(0, 3).map((paragraph) => (
              <p key={paragraph} className="line-clamp-3 sm:line-clamp-none">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-2 shrink-0 rounded-md border border-dashed border-gold/35 bg-gold/5 px-2.5 py-1.5 text-[10px] leading-4 text-gold/85 sm:mt-2.5 sm:text-[11px] sm:leading-5">
            {about.note}
          </p>
        </div>

        <aside className="grid min-h-0 grid-cols-2 gap-1.5 content-stretch sm:gap-2 lg:grid-cols-2">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex min-h-0 flex-col justify-center rounded-lg border border-gold/25 bg-gradient-to-br from-[#15120a] to-[#0a0a0a] px-2.5 py-2 sm:rounded-xl sm:px-3 sm:py-2.5"
            >
              <p className="text-[9px] font-medium tracking-wide text-gold/90 sm:text-[10px]">
                {fact.label}
              </p>
              {fact.href ? (
                <a
                  href={fact.href}
                  className="unicode-isolate mt-0.5 block text-[11px] font-semibold text-white hover:text-gold sm:text-xs"
                  dir="ltr"
                >
                  {fact.value}
                </a>
              ) : (
                <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold leading-snug text-white sm:text-xs">
                  {fact.value}
                </p>
              )}
            </div>
          ))}
        </aside>
      </div>
    </BrandViewportShell>
  );
}
