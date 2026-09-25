import Image from "next/image";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { MobileHomeChrome } from "@/components/mobile-home-chrome";
import { MobileQuickCards } from "@/components/mobile-quick-cards";
import { office } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";

/**
 * Homepage first surface:
 * - Desktop: wide replace artwork with object-contain insets (التيار… visible)
 * - Mobile: dedicated tall replace artwork with contain; chrome + 2×2 cards
 *   (name/slogan are in the mobile art — no duplicate brand band)
 */
export function Hero({ site: _site }: { site: SiteContentSnapshot }) {
  return (
    <>
      {/* —— Desktop —— */}
      <section
        id="top"
        className="relative hidden min-h-[100dvh] overflow-hidden bg-[#050505] md:block"
        aria-labelledby="hero-brand"
      >
        <h1 id="hero-brand" className="sr-only">
          النائب سالم سوادي الغراوي
        </h1>

        <div className="flex min-h-[100dvh] items-center justify-center px-7 pb-8 pt-20 sm:px-12 sm:pb-10 sm:pt-[5.5rem] lg:px-16 lg:pt-24">
          <Image
            src={office.bannerSrc}
            alt={office.bannerAlt}
            width={1821}
            height={864}
            priority
            className="h-auto w-auto max-h-[calc(100dvh-8rem)] max-w-[min(90vw,1420px)] object-contain animate-rise"
            sizes="(max-width: 1280px) 88vw, 1420px"
          />
        </div>

        <div className="absolute inset-x-0 top-0 z-20 pt-3 sm:pt-4">
          <HeroPillNav floating />
        </div>
      </section>

      {/* —— Mobile —— */}
      <section
        className="bg-black md:hidden"
        aria-labelledby="hero-brand-mobile"
      >
        <h1 id="hero-brand-mobile" className="sr-only">
          النائب سالم سوادي الغراوي — {office.slogan}
        </h1>

        <MobileHomeChrome />

        <div className="relative w-full bg-black px-1.5">
          <Image
            src={office.mobileBannerSrc}
            alt={office.bannerAlt}
            width={887}
            height={1774}
            priority
            className="mx-auto h-auto w-full max-w-full object-contain object-center"
            sizes="100vw"
          />
        </div>

        <MobileQuickCards />
      </section>
    </>
  );
}
