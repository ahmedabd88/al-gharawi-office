import Image from "next/image";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { MobileHomeChrome } from "@/components/mobile-home-chrome";
import { MobileQuickCards } from "@/components/mobile-quick-cards";
import { office } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";

/**
 * Full-bleed homepage hero — object-cover fills 100dvh with no letterbox bars.
 * object-position keeps portrait, name/slogan, and التيار calligraphy in frame.
 */
export function Hero({ site: _site }: { site: SiteContentSnapshot }) {
  return (
    <>
      {/* —— Desktop —— */}
      <section
        id="top"
        className="relative hidden h-[100dvh] w-full overflow-hidden bg-black md:block"
        aria-labelledby="hero-brand"
      >
        <h1 id="hero-brand" className="sr-only">
          النائب سالم سوادي الغراوي
        </h1>

        {/* Explicit absolute fill — guarantees cover of the viewport */}
        <Image
          src={office.bannerSrc}
          alt={office.bannerAlt}
          fill
          priority
          unoptimized
          className="object-cover"
          style={{ objectFit: "cover", objectPosition: "46% 40%" }}
          sizes="100vw"
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-black/35 to-transparent"
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

        <div className="relative h-[100dvh] w-full overflow-hidden">
          <Image
            src={office.mobileBannerSrc}
            alt={office.bannerAlt}
            fill
            priority
            unoptimized
            className="object-cover"
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
            sizes="100vw"
          />
          <div className="absolute inset-x-0 top-0 z-20">
            <MobileHomeChrome />
          </div>
        </div>

        <MobileQuickCards />
      </section>
    </>
  );
}
