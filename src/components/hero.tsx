import { getImageProps } from "next/image";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { MobileHomeChrome } from "@/components/mobile-home-chrome";
import { MobileQuickCards } from "@/components/mobile-quick-cards";
import { office } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";

/**
 * Homepage hero — one <picture> so only the matching viewport asset downloads.
 * Returning to `/` must not pull both desktop + mobile banners.
 */
export function Hero({ site: _site }: { site: SiteContentSnapshot }) {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: office.bannerSrc,
    alt: office.bannerAlt,
    width: 1588,
    height: 991,
    sizes: "100vw",
    priority: true,
    quality: 80,
  });

  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    src: office.mobileBannerSrc,
    alt: office.bannerAlt,
    width: 887,
    height: 1774,
    sizes: "100vw",
    priority: true,
    quality: 80,
  });

  return (
    <>
      <section
        id="top"
        className="relative w-full overflow-hidden bg-black"
        aria-labelledby="hero-brand"
      >
        <h1 id="hero-brand" className="sr-only">
          النائب سالم سوادي الغراوي
        </h1>

        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img {...imgProps} srcSet={mobileSrcSet} className="h-auto w-full" />
        </picture>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-black/40 to-transparent"
          aria-hidden
        />

        <div className="absolute inset-x-0 top-0 z-20 hidden pt-3 sm:pt-4 md:block">
          <HeroPillNav floating />
        </div>

        <div className="absolute inset-x-0 top-0 z-20 overflow-visible px-1 pt-2 md:hidden">
          <MobileHomeChrome />
        </div>
      </section>

      <div className="md:hidden">
        <MobileQuickCards />
      </div>
    </>
  );
}
