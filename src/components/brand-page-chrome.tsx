import Image from "next/image";
import Link from "next/link";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { office } from "@/lib/content";

/** Shared mockup chrome: fist logo + التيار branding + dark pill nav */
export function BrandPageChrome() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 pt-3 sm:px-5 sm:pt-4">
        <Link href="/" className="hidden items-center gap-2 sm:flex" aria-label={office.currentName}>
          <Image
            src="/images/current-fist-logo.png"
            alt=""
            width={52}
            height={52}
            className="size-11 rounded-full object-cover shadow-[0_0_16px_rgba(201,162,39,0.35)] sm:size-12"
          />
          <span className="font-heading max-w-[4.5rem] text-center text-[11px] font-bold leading-tight text-white sm:text-xs">
            {office.currentName}
          </span>
        </Link>

        <div className="min-w-0 flex-1">
          <HeroPillNav floating />
        </div>

        <Link href="/" className="shrink-0 sm:hidden" aria-label={office.currentName}>
          <Image
            src="/images/current-fist-logo.png"
            alt=""
            width={44}
            height={44}
            className="size-10 rounded-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
