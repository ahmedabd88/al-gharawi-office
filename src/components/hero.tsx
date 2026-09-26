import Image from "next/image";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { MobileHomeChrome } from "@/components/mobile-home-chrome";
import { MobileQuickCards } from "@/components/mobile-quick-cards";
import { office } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";

/**
 * Homepage hero at the artwork’s natural aspect (~1588×991).
 * Full width, no forced 100dvh letterboxing — nav overlays the banner.
 */
export function Hero({ site: _site }: { site: SiteContentSnapshot }) {
  return (
    <>
      {/* —— Desktop —— */}
      <section
        id="top"
        className="relative hidden w-full overflow-hidden bg-black md:block"
        aria-labelledby="hero-brand"
      >
        <h1 id="hero-brand" className="sr-only">
          النائب سالم سوادي الغراوي
        </h1>

        <Image
          src={office.bannerSrc}
          alt={office.bannerAlt}
          width={1588}
          height={991}
          priority
          unoptimized
          className="h-auto w-full"
          sizes="100vw"
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-black/40 to-transparent"
          aria-hidden
        />

        <div className="absolute inset-x-0 top-0 z-20 pt-3 sm:pt-4">
          <HeroPillNav floating />
        </div>
      </section>

      {/* —— Mobile —— */}
      <section className="bg-black md:hidden" aria-labelledby="hero-brand-mobile">
        <h1 id="hero-brand-mobile" className="sr-only">
          النائب سالم سوادي الغراوي — {office.slogan}
        </h1>

        <div className="relative w-full overflow-x-hidden">
          <Image
            src={office.mobileBannerSrc}
            alt={office.bannerAlt}
            width={887}
            height={1774}
            priority
            unoptimized
            className="h-auto w-full"
            sizes="100vw"
          />
          <div className="absolute inset-x-0 top-0 z-20 overflow-visible">
            <MobileHomeChrome />
          </div>
        </div>

        <MobileQuickCards />
      </section>
    </>
  );
}
