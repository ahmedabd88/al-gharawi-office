import type { Metadata } from "next";
import { ContactRecreate } from "@/components/contact-recreate";
import { RecreatePageShell } from "@/components/recreate-page-shell";
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
    <RecreatePageShell title={contact.title} lead={site.contactLead} crumb={contact.title}>
      <ContactRecreate site={site} />
    </RecreatePageShell>
  );
}
