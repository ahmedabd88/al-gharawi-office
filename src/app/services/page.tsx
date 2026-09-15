import type { Metadata } from "next";
import { FileText, Headphones, Landmark, MessagesSquare } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { office, services } from "@/lib/content";

export const metadata: Metadata = {
  title: `الخدمات | ${office.brand}`,
  description: services.lead,
};

const icons = [FileText, Landmark, MessagesSquare, Headphones];

export default function ServicesPage() {
  return (
    <PageShell title={services.title} lead={services.lead}>
      <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {services.items.map((item, index) => {
          const Icon = icons[index] ?? FileText;
          return (
            <li key={item.title} className="group">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon className="size-5" aria-hidden />
              </div>
              <h2 className="font-heading text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-base leading-8 text-muted-foreground">{item.description}</p>
              <span className="mt-4 block h-px w-12 origin-right bg-gold/70 transition-transform duration-300 group-hover:scale-x-150" />
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
