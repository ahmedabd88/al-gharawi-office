import Image from "next/image";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { office } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";

/**
 * First viewport: official luxury banner (portrait on the visual right,
 * مجلس النواب seal + gold name) with floating RTL pill nav.
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
        className="object-cover object-[72%_center] animate-rise sm:object-[68%_center] md:object-center"
        sizes="100vw"
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-black/75 via-black/35 to-transparent"
        aria-hidden
      />
      <div className="hero-gold-sheen pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      <div className="absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5">
        <HeroPillNav floating />
      </div>

      {/* Mobile-only visual title when crop hides the banner typography */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-4 pb-8 pt-28 md:hidden"
        aria-hidden
      >
        <p className="text-sm tracking-wide text-gold/90">مجلس النواب · المكتب الإعلامي</p>
        <p className="mt-2 font-heading text-3xl font-bold leading-snug text-gold sm:text-4xl">
          <span className="block text-xl font-semibold text-gold/90 sm:text-2xl">النائب</span>
          سالم سوادي الغراوي
        </p>
      </div>
    </section>
  );
}
