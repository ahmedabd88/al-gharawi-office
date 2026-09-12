import { Button } from "@/components/ui/button";
import { hero, office } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-atmosphere relative isolate min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-brand"
    >
      <div
        className="orb-pulse pointer-events-none absolute -start-24 top-24 size-72 rounded-full bg-sky/25 blur-3xl"
        aria-hidden
      />
      <div
        className="orb-pulse pointer-events-none absolute -end-16 bottom-28 size-80 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-20 pt-28 sm:px-6">
        <p
          id="hero-brand"
          className="animate-rise font-heading text-4xl font-bold leading-tight text-brand sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {office.brand}
        </p>

        <h1 className="animate-rise-delay-1 mt-6 max-w-2xl font-heading text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
          {hero.headline}
        </h1>

        <p className="animate-rise-delay-2 mt-4 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
          {hero.support}
        </p>

        <div className="animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-3">
          <Button
            render={<a href="#contact" />}
            size="lg"
            className="h-11 rounded-md px-6 text-base"
          >
            {hero.primaryCta}
          </Button>
          <Button
            render={<a href="#services" />}
            variant="outline"
            size="lg"
            className="h-11 rounded-md border-brand/30 bg-background/50 px-6 text-base backdrop-blur hover:bg-background/80"
          >
            {hero.secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
