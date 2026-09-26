import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { RequestPreview } from "@/components/request-preview";
import { Services } from "@/components/services";
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
        <About site={site} />
        <Services />
        <RequestPreview site={site} />
        <Contact site={site} />
      </main>
      <SiteFooter site={site} />
    </>
  );
}
