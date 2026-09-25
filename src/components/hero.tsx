import Image from "next/image";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { MobileHomeChrome } from "@/components/mobile-home-chrome";
import { MobileQuickCards } from "@/components/mobile-quick-cards";
import { office } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";

/**
 * Homepage first surface:
 * - Desktop: artwork shrinks inside the viewport (contain + generous inset) so
 *   vertical calligraphy (التيار…), name, seal, and slogan stay fully visible.
 * - Mobile: chrome + contained banner + black brand + 2×2 cards
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

        {/* Extra top inset clears the floating pill nav; side inset keeps calligraphy in frame */}
        <div className="flex min-h-[100dvh] items-center justify-center px-6 pb-8 pt-20 sm:px-10 sm:pb-10 sm:pt-[5.5rem] lg:px-14 lg:pt-24">
          <Image
            src={office.bannerSrc}
            alt={office.bannerAlt}
            width={1821}
            height={864}
            priority
            className="h-auto w-auto max-h-[calc(100dvh-8rem)] max-w-[min(92vw,1480px)] object-contain animate-rise"
            sizes="(max-width: 1280px) 90vw, 1480px"
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
          النائب سالم سوادي الغراوي
        </h1>

        <MobileHomeChrome />

        <div className="relative w-full bg-black px-2.5">
          <Image
            src={office.mobileBannerSrc}
            alt={office.bannerAlt}
            width={880}
            height={800}
            priority
            className="mx-auto h-auto w-full max-w-full object-contain object-center"
            sizes="100vw"
          />
        </div>

        <div className="bg-black px-4 pb-5 pt-4 text-center">
          <p className="text-base font-semibold tracking-wide text-white">النائب</p>
          <p className="font-heading mt-1 text-[1.65rem] font-bold leading-snug text-gold sm:text-3xl">
            سالم سوادي الغراوي
          </p>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-l from-gold/80 to-transparent" aria-hidden />
            <span className="size-1.5 rotate-45 bg-gold" aria-hidden />
            <span className="h-px w-8 bg-gradient-to-r from-gold/80 to-transparent" aria-hidden />
          </div>
          <p className="mt-2.5 text-sm text-white/90">{office.slogan}</p>
        </div>

        <MobileQuickCards />
      </section>
    </>
  );
}
