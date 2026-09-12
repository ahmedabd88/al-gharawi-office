import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, hero, office } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="bg-[#0a0a0a]" aria-labelledby="hero-brand">
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/70 to-transparent" />
        <Image
          src={office.bannerSrc}
          alt={office.bannerAlt}
          width={1080}
          height={556}
          priority
          className="h-auto w-full object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="border-t-2 border-gold/40 bg-[#111111]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="max-w-2xl">
            <h1 id="hero-brand" className="font-heading text-3xl font-bold text-white sm:text-4xl">
              {office.brand}
            </h1>
            <p className="mt-3 text-base leading-8 text-white/75 sm:text-lg">{hero.support}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              render={<a href="#contact" />}
              size="lg"
              className="h-12 rounded-md bg-gold px-7 text-base text-[#1a1205] hover:bg-gold/90"
            >
              {hero.primaryCta}
            </Button>
            <Button
              render={<a href={`tel:${contact.phoneTel}`} />}
              variant="outline"
              size="lg"
              className="h-12 rounded-md border-white/30 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
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
