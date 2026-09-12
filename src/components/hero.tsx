import Image from "next/image";
import { Button } from "@/components/ui/button";
import { hero, office } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#0a0a0a]"
      aria-labelledby="hero-brand"
    >
      <Image
        src={office.bannerSrc}
        alt={office.bannerAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_20%] sm:object-center"
      />

      <div
        className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/72 to-black/45"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35"
        aria-hidden
      />
      <div className="hero-gold-sheen pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:justify-center sm:px-6 sm:pb-20">
        <p className="animate-rise text-sm font-medium tracking-wide text-gold/90 sm:text-base">
          {office.mediaOffice}
        </p>

        <p
          id="hero-brand"
          className="animate-rise-delay-1 mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {office.brand}
        </p>

        <h1 className="animate-rise-delay-2 mt-5 max-w-2xl font-heading text-2xl font-semibold text-gold sm:text-3xl md:text-4xl">
          {hero.headline}
        </h1>

        <p className="animate-rise-delay-3 mt-4 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
          {hero.support}
        </p>

        <div className="animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-3">
          <Button
            render={<a href="#contact" />}
            size="lg"
            className="h-11 rounded-md bg-gold px-6 text-base text-[#1a1205] hover:bg-gold/90"
          >
            {hero.primaryCta}
          </Button>
          <Button
            render={<a href="#services" />}
            variant="outline"
            size="lg"
            className="h-11 rounded-md border-white/35 bg-white/5 px-6 text-base text-white backdrop-blur hover:bg-white/15 hover:text-white"
          >
            {hero.secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
