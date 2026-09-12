import { office, sources } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-brand text-brand-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-heading text-xl font-semibold">{office.brand}</p>
          <p className="mt-2 max-w-md text-sm leading-7 text-brand-foreground/80">
            {office.district} · انتخابات {office.electionYear}
          </p>
        </div>
        <div className="text-xs leading-6 text-brand-foreground/70 md:text-end">
          <p className="mb-1 font-medium text-brand-foreground/90">مصادر عامة مستخدمة في المحتوى</p>
          {sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block underline-offset-4 hover:underline"
            >
              {source.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
