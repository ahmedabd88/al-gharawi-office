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

      {/* Dark veil + local panel so gold title stays readable over colorful skyline */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/75 via-black/45 to-black/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/70 via-black/35 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-0 z-[1] flex items-end">
        <div className="mx-auto w-full max-w-6xl px-4 pb-[12%] pt-20 sm:px-6 sm:pb-[11%] sm:pt-24 lg:pb-[10%]">
          <div className="max-w-xl rounded-2xl bg-black/55 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-[2px] sm:px-5 sm:py-4">
            <p className="text-xs font-medium text-[#f0d78c] sm:text-sm">
              <Link href="/" className="hover:underline">
                الصفحة الرئيسية
              </Link>
              <span className="mx-1.5 text-[#f0d78c]/50">/</span>
              {crumb}
            </p>
            <h1
              className="font-heading mt-1.5 text-3xl font-bold text-[#e8c547] sm:text-4xl lg:text-[2.75rem]"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.85), 0 0 1px rgba(0,0,0,1)" }}
            >
              {title}
            </h1>
            <p
              className="mt-2 text-sm leading-relaxed text-white sm:text-base"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
            >
              {lead}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
