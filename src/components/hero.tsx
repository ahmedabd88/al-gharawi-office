import Image from "next/image";
import { office } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";

/**
 * First viewport: full-bleed official banner only (no brand band under the photo).
 */
export function Hero({ site: _site }: { site: SiteContentSnapshot }) {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a]"
      aria-labelledby="hero-brand"
    >
      <h1 id="hero-brand" className="sr-only">
        {office.brand}
      </h1>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="hero-gold-sheen pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      <Image
        src={office.bannerSrc}
        alt={office.bannerAlt}
        fill
        priority
        className="object-cover object-center animate-rise"
        sizes="100vw"
      />
    </section>
  );
}
