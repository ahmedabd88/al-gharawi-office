import Image from "next/image";
import Link from "next/link";
import { office } from "@/lib/content";

/**
 * Inner-page hero: capped-height artwork so title + content start above the fold
 * on mobile and desktop. Uses cover + object-position (keeps gold/national look).
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
      <div className="relative h-[14dvh] min-h-[5.75rem] max-h-[7.25rem] w-full overflow-hidden sm:h-[18dvh] sm:min-h-[7rem] sm:max-h-[9.5rem] md:h-[20dvh] md:max-h-[11rem] lg:max-h-[12rem]">
        <Image
          src={office.pageHeroSrc}
          alt=""
          fill
          priority
          quality={80}
          className="object-cover object-[72%_28%] sm:object-[70%_28%]"
          sizes="100vw"
        />
        {/* Soft bottom fade into the title band */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0a0a0a] to-transparent sm:h-10"
          aria-hidden
        />
      </div>

      <div className="border-t border-gold/30 bg-[#111111]">
        <div className="mx-auto w-full max-w-6xl px-4 py-2.5 sm:px-6 sm:py-3">
          <p className="text-[11px] font-medium text-[#f0d78c] sm:text-xs">
            <Link href="/" prefetch className="hover:underline">
              الصفحة الرئيسية
            </Link>
            <span className="mx-1.5 text-[#f0d78c]/50">/</span>
            {crumb}
          </p>
          <h1 className="font-heading mt-0.5 text-lg font-bold text-[#e8c547] sm:text-xl lg:text-2xl">
            {title}
          </h1>
          <p className="mt-0.5 max-w-2xl text-[11px] leading-snug text-white/90 sm:text-sm sm:leading-6">
            {lead}
          </p>
        </div>
      </div>
    </section>
  );
}
