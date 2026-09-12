import { contact, office, sources } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/30 bg-[#0a0a0a] text-[#f7f1e4]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs tracking-wide text-gold">{office.mediaOffice}</p>
          <p className="mt-2 font-heading text-xl font-semibold">{office.brand}</p>
          <p className="mt-2 max-w-md text-sm leading-7 text-white/70">
            {office.district} · {office.bloc} · انتخابات {office.electionYear}
          </p>
          <p className="mt-3 text-sm text-white/80">
            <a href={`tel:${contact.phoneTel}`} className="hover:text-gold" dir="ltr">
              {contact.phoneDisplay}
            </a>
            <span className="mx-2 text-white/40">·</span>
            {contact.hours}
          </p>
        </div>
        <div className="text-xs leading-6 text-white/60 md:text-end">
          <p className="mb-1 font-medium text-white/85">مصادر عامة مستخدمة في المحتوى</p>
          {sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block underline-offset-4 hover:text-gold hover:underline"
            >
              {source.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
