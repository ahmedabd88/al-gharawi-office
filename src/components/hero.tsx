import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, hero, office } from "@/lib/content";

/**
 * First viewport: full-bleed banner + brand band with CTAs (no scroll required).
 * Image flexes to fill remaining height above the band.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col bg-[#0a0a0a]"
      aria-labelledby="hero-brand"
    >
      <div className="relative min-h-[12rem] flex-1 overflow-hidden sm:min-h-[16rem]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/75 to-transparent" />
        <div className="hero-gold-sheen pointer-events-none absolute inset-0 z-[1]" aria-hidden />
        <Image
          src={office.bannerSrc}
          alt={office.bannerAlt}
          fill
          priority
          className="object-cover object-center animate-rise"
          sizes="100vw"
        />
      </div>

      <div className="relative z-[2] shrink-0 border-t-2 border-gold/40 bg-[#111111]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:gap-6 sm:px-6 sm:py-7 md:flex-row md:items-center md:justify-between md:py-8">
          <div className="max-w-2xl animate-rise-delay-1">
            <p className="text-xs tracking-wide text-gold sm:text-sm">{office.mediaOffice}</p>
            <h1
              id="hero-brand"
              className="mt-1 font-heading text-2xl font-bold leading-snug text-white sm:mt-2 sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {office.brand}
            </h1>
            <p className="mt-2 text-sm leading-7 text-white/75 sm:mt-3 sm:text-base sm:leading-8 md:text-lg">
              {hero.support}
            </p>
          </div>

          <div className="animate-rise-delay-2 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <Button
              render={<Link href="/request" />}
              nativeButton={false}
              size="lg"
              className="h-11 rounded-md bg-gold px-6 text-sm text-[#1a1205] hover:bg-gold/90 sm:h-12 sm:px-7 sm:text-base"
            >
              <MessageCircle className="size-4" aria-hidden />
              {hero.primaryCta}
            </Button>
            <Button
              render={<a href={`tel:${contact.phoneTel}`} />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-11 rounded-md border-white/30 bg-transparent px-6 text-sm text-white hover:bg-white/10 hover:text-white sm:h-12 sm:px-7 sm:text-base"
            >
              <Phone className="size-4" aria-hidden />
              <span dir="ltr" className="unicode-isolate tabular-nums tracking-wide">
                {contact.phoneDisplay}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
