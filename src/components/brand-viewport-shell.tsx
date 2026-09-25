import type { ReactNode } from "react";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { office } from "@/lib/content";

/**
 * Viewport-fit branded shell for inner pages (about / services).
 * Locks to 100dvh so typical laptop/phone show the page without scrolling.
 */
export function BrandViewportShell({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-[#070707] text-white">
      <header className="shrink-0 border-b border-gold/20 bg-black/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-3 py-2">
          <HeroPillNav />
        </div>
      </header>

      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,39,0.14),_transparent_50%),linear-gradient(180deg,#0e0e0e_0%,#070707_50%,#050505_100%)]"
          aria-hidden
        />
        <div className="relative z-[1] mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden px-3 py-2.5 sm:px-5 sm:py-3 lg:px-6 lg:py-3.5">
          <div className="shrink-0 text-center sm:text-start">
            <p className="text-[10px] tracking-wide text-gold/80 sm:text-[11px]">{office.slogan}</p>
            <h1 className="font-heading mt-0.5 text-xl font-bold text-gold sm:text-2xl lg:text-[1.75rem]">
              {title}
            </h1>
            <p className="mt-0.5 line-clamp-2 max-w-2xl text-xs leading-snug text-white/65 sm:text-sm sm:leading-relaxed">
              {lead}
            </p>
            <div
              className="mx-auto mt-1.5 h-px w-14 bg-gradient-to-l from-transparent via-gold/70 to-transparent sm:mx-0"
              aria-hidden
            />
          </div>

          <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden sm:mt-2.5">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
