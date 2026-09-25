import Image from "next/image";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { MobileHomeChrome } from "@/components/mobile-home-chrome";
import { MobileQuickCards } from "@/components/mobile-quick-cards";
import { office } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";

/**
 * Homepage first surface:
 * - Desktop (md+): full-bleed final wide banner + interactive RTL pill nav
 * - Mobile: chrome (seal · home pill · menu) + mobile banner + black brand + 2×2 cards
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

        <Image
          src={office.bannerSrc}
          alt={office.bannerAlt}
          fill
          priority
          className="object-cover object-[center_35%] animate-rise lg:object-center"
          sizes="100vw"
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-black/50 via-black/15 to-transparent"
          aria-hidden
        />

        <div className="absolute inset-x-0 top-0 z-20 pt-4 sm:pt-5">
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

        <div className="relative w-full overflow-hidden">
          <Image
            src={office.mobileBannerSrc}
            alt={office.bannerAlt}
            width={880}
            height={775}
            priority
            className="h-auto w-full object-cover object-top"
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
