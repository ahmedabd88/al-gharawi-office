import { HomeSectionPreviews } from "@/components/home-section-previews";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContentSnapshot } from "@/lib/site-content-store";

/** Cache homepage RSC so returning to `/` is soft-nav fast; office panel revalidates on save. */
export const revalidate = 60;

export default async function HomePage() {
  const site = await getSiteContentSnapshot();

  return (
    <>
      {/* Nav lives inside Hero only — no SiteHeader (was duplicating the pill bar). */}
      <main className="flex-1">
        <Hero site={site} />
        {/* Short unified teasers only — full content on /about /services /request /contact */}
        <HomeSectionPreviews />
      </main>
      <SiteFooter site={site} />
    </>
  );
}
