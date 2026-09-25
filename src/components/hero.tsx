import Image from "next/image";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { office } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";

/**
 * First viewport: user reference luxury hero (Baghdad skyline, flag, monument,
 * palms, portrait visual-right, gold seal + name) with interactive RTL pill nav.
 * No black band under the artwork.
 */
export function Hero({ site: _site }: { site: SiteContentSnapshot }) {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden bg-[#050505]"
      aria-labelledby="hero-brand"
    >
      <h1 id="hero-brand" className="sr-only">
        النائب سالم سوادي الغراوي
      </h1>

      <Image
        src={office.bannerSrc}
        alt={office.bannerAlt}
        fill
        priority
        className="object-cover object-[80%_42%] animate-rise sm:object-[75%_38%] md:object-[center_32%] lg:object-center"
        sizes="100vw"
      />

      {/* Mask the mock nav baked into the artwork; keep interactive pills readable */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[4.75rem] bg-gradient-to-b from-black/70 via-black/40 to-transparent sm:h-[5.25rem]"
        aria-hidden
      />

      <div className="absolute inset-x-0 top-0 z-20 pt-3 sm:pt-4">
        <HeroPillNav floating />
      </div>

      {/* Narrow phones: keep name readable if crop favors the portrait */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 via-black/15 to-transparent px-4 pb-7 pt-24 sm:hidden"
        aria-hidden
      >
        <p className="font-heading text-2xl font-bold leading-snug text-gold">
          <span className="block text-base font-semibold text-gold/90">النائب</span>
          سالم سوادي الغراوي
        </p>
      </div>
    </section>
  );
}
