import Image from "next/image";
import Link from "next/link";
import { office } from "@/lib/content";

/**
 * Inner-page hero: full-bleed artwork (skyline + fist + calligraphy), then a
 * clean title band below so HTML text never stacks over baked-in banner art.
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
      <div className="relative">
        <Image
          src={office.pageHeroSrc}
          alt=""
          width={1920}
          height={768}
          priority
          quality={80}
          className="h-auto w-full"
          sizes="100vw"
        />
        {/* Soft bottom fade into the title band */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent sm:h-20"
          aria-hidden
        />
      </div>

      <div className="border-t border-gold/30 bg-[#111111]">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
          <p className="text-xs font-medium text-[#f0d78c] sm:text-sm">
            <Link href="/" prefetch className="hover:underline">
              الصفحة الرئيسية
            </Link>
            <span className="mx-1.5 text-[#f0d78c]/50">/</span>
            {crumb}
          </p>
          <h1 className="font-heading mt-1.5 text-2xl font-bold text-[#e8c547] sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            {lead}
          </p>
        </div>
      </div>
    </section>
  );
}
