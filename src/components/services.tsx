import { FileText, Headphones, Landmark, MessagesSquare } from "lucide-react";
import { services } from "@/lib/content";

const icons = [FileText, Landmark, MessagesSquare, Headphones];

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-t border-border/60 bg-[linear-gradient(180deg,#eef4f0_0%,#f4f7f5_100%)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="section-rule mb-5" aria-hidden />
          <h2 className="font-heading text-3xl font-bold text-brand sm:text-4xl">{services.title}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{services.lead}</p>
        </div>

        <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {services.items.map((item, index) => {
            const Icon = icons[index] ?? FileText;
            return (
              <li key={item.title} className="group relative pe-2">
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-base leading-8 text-muted-foreground">{item.description}</p>
                <span
                  className="mt-4 block h-px w-12 origin-right scale-x-100 bg-gold/70 transition-transform duration-300 group-hover:scale-x-150"
                  aria-hidden
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
