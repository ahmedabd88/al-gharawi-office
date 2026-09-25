import type { ReactNode } from "react";
import { BrandPageChrome } from "@/components/brand-page-chrome";
import { BrandPageFooter } from "@/components/gold-wave";
import { PageHeroBanner } from "@/components/page-hero-banner";

/** Inner-page shell: header art (with baked wave) → white content → dark footer. */
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
    <div className="flex min-h-[100dvh] flex-col bg-white text-foreground">
      <div className="relative">
        <BrandPageChrome />
        <PageHeroBanner title={title} lead={lead} crumb={crumb} />
      </div>
      <main className="relative z-[1] mx-auto w-full max-w-6xl flex-1 px-3 pb-8 pt-2 sm:px-5 sm:pb-10 sm:pt-3 lg:px-6">
        {children}
      </main>
      <BrandPageFooter />
    </div>
  );
}
