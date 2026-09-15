import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { PageShell } from "@/components/page-shell";
import { contact, office } from "@/lib/content";

export const metadata: Metadata = {
  title: `تواصل | ${office.brand}`,
  description: `${contact.lead} عنوان المكتب: ${contact.address}.`,
};

export default function ContactPage() {
  return (
    <PageShell title={contact.title} lead={contact.lead}>
      <div className="-mx-4 -my-12 sm:-mx-6 sm:-my-16">
        <Contact standalone />
      </div>
    </PageShell>
  );
}
