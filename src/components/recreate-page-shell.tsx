import type { ReactNode } from "react";
import { BrandPageChrome } from "@/components/brand-page-chrome";
import { BrandPageFooter } from "@/components/gold-wave";
import { PageHeroBanner } from "@/components/page-hero-banner";

/** Full inner-page shell matching mockup chrome (not a pasted mockup image). */
export function RecreatePageShell({
  title,
  lead,
  crumb,
  children,
}: {
  title: string;
  lead: string;
  crumb: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#f4f4f4] text-foreground">
      <div className="relative">
        <BrandPageChrome />
        <PageHeroBanner title={title} lead={lead} crumb={crumb} />
      </div>
      <main className="relative z-[1] mx-auto w-full max-w-6xl flex-1 px-3 py-5 sm:px-5 sm:py-7 lg:px-6">
        {children}
      </main>
      <BrandPageFooter />
    </div>
  );
}
