import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { PageShell } from "@/components/page-shell";
import { contact, office } from "@/lib/content";
import { getSiteContentSnapshot } from "@/lib/site-content-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `تواصل | ${office.brand}`,
  description: `${contact.lead} عنوان المكتب: ${contact.address}.`,
};

export default async function ContactPage() {
  const site = await getSiteContentSnapshot();

  return (
    <PageShell title={contact.title} lead={site.contactLead} site={site}>
      <div className="-mx-4 -my-12 sm:-mx-6 sm:-my-16">
        <Contact standalone site={site} />
      </div>
    </PageShell>
  );
}
