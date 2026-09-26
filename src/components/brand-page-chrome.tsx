import { HeroPillNav } from "@/components/hero-pill-nav";

/**
 * Shared chrome over inner heroes: mobile menu + desktop pill nav.
 * Branding lives in the header artwork — no duplicate brand text overlay.
 */
export function BrandPageChrome() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="w-full max-w-3xl">
          <HeroPillNav floating />
        </div>
      </div>
    </header>
  );
}
