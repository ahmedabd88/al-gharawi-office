import Image from "next/image";
import Link from "next/link";
import { HeroPillNav } from "@/components/hero-pill-nav";
import { office } from "@/lib/content";

/**
 * Shared chrome over inner heroes: centered pill nav.
 * Fist + التيار branding live in the header artwork; mobile keeps a compact logo.
 */
export function BrandPageChrome() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-3 pt-3 sm:px-5 sm:pt-4">
        <Link
          href="/"
          className="absolute start-3 top-3 sm:hidden"
          aria-label={office.currentName}
        >
          <Image
            src={office.fistLogoSrc}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full object-cover shadow-[0_0_12px_rgba(201,162,39,0.4)]"
          />
        </Link>
        <div className="w-full max-w-3xl">
          <HeroPillNav floating />
        </div>
      </div>
    </header>
  );
}
