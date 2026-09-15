import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { RequestPreview } from "@/components/request-preview";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContentSnapshot } from "@/lib/site-content-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const site = await getSiteContentSnapshot();

  return (
    <>
      <SiteHeader />
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
