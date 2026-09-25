import Image from "next/image";
import Link from "next/link";

/**
 * Inner-page hero using the dedicated header artwork (skyline + fist + calligraphy
 * + baked gold/white wave into content). Text overlays on the right; no whole-page PNG.
 */
export function PageHeroBanner({
  title,
  lead,
  crumb,
}: {
  title: string;
  lead: string;
  crumb: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0a0a] text-white">
      <Image
        src="/images/page-hero-inner.png"
        alt=""
        width={1983}
        height={793}
        priority
        unoptimized
        className="h-auto w-full"
        sizes="100vw"
      />

      {/* Soft veil so gold title stays readable over the skyline */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/55 via-black/25 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-0 z-[1] flex items-end">
        <div className="mx-auto w-full max-w-6xl px-4 pb-[12%] pt-20 sm:px-6 sm:pb-[11%] sm:pt-24 lg:pb-[10%]">
          <p className="text-xs text-gold sm:text-sm">
            <Link href="/" className="hover:underline">
              الرئيسية
            </Link>
            <span className="mx-1.5 text-gold/50">/</span>
            {crumb}
          </p>
          <h1 className="font-heading mt-1.5 text-3xl font-bold text-gold drop-shadow sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/95 drop-shadow sm:text-base">
            {lead}
          </p>
        </div>
      </div>
    </section>
  );
}
