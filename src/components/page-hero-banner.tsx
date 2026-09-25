import Image from "next/image";
import Link from "next/link";
import { GoldWave } from "@/components/gold-wave";

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
      <div className="absolute inset-0">
        <Image
          src="/images/page-hero-skyline.png"
          alt=""
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/45 to-black/30"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-[1] mx-auto flex min-h-[11.5rem] max-w-6xl flex-col justify-end px-4 pb-10 pt-20 sm:min-h-[13rem] sm:px-6 sm:pb-12 sm:pt-24">
        <p className="text-xs text-gold sm:text-sm">
          <Link href="/" className="hover:underline">
            الرئيسية
          </Link>
          <span className="mx-1.5 text-gold/50">/</span>
          {crumb}
        </p>
        <h1 className="font-heading mt-1.5 text-3xl font-bold text-gold sm:text-4xl lg:text-[2.6rem]">
          {title}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
          {lead}
        </p>
      </div>

      <GoldWave className="relative z-[2] -mb-px" />
    </section>
  );
}
