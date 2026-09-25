import type { Metadata } from "next";
import {
  FileText,
  Headphones,
  Landmark,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { BrandViewportShell } from "@/components/brand-viewport-shell";
import { office, services } from "@/lib/content";

export const metadata: Metadata = {
  title: `الخدمات | ${office.brand}`,
  description: services.lead,
};

const icons: LucideIcon[] = [FileText, Landmark, MessagesSquare, Headphones];

export default function ServicesPage() {
  return (
    <BrandViewportShell title={services.title} lead={services.lead}>
      <ul className="grid h-full min-h-0 grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3">
        {services.items.map((item, index) => {
          const Icon = icons[index] ?? FileText;
          return (
            <li
              key={item.title}
              className="group flex min-h-0 flex-col justify-between overflow-hidden rounded-xl border border-gold/35 bg-gradient-to-br from-[#16120a] via-[#0c0c0c] to-black p-2.5 transition-colors hover:border-gold/70 sm:rounded-2xl sm:p-3.5 lg:p-4"
            >
              <div className="inline-flex size-8 items-center justify-center rounded-md border border-gold/40 bg-gold/10 text-gold sm:size-9 lg:size-10">
                <Icon className="size-3.5 sm:size-4" aria-hidden />
              </div>
              <div className="mt-1.5 min-h-0 sm:mt-2">
                <h2 className="font-heading text-xs font-bold text-white sm:text-sm lg:text-base">
                  {item.title}
                </h2>
                <p className="mt-0.5 line-clamp-4 text-[10px] leading-snug text-white/65 sm:line-clamp-5 sm:text-[11px] sm:leading-relaxed lg:text-xs lg:leading-5">
                  {item.description}
                </p>
              </div>
              <span
                className="mt-1.5 block h-px w-7 origin-right bg-gold/55 transition-transform duration-300 group-hover:scale-x-150 sm:mt-2 sm:w-9"
                aria-hidden
              />
            </li>
          );
        })}
      </ul>
    </BrandViewportShell>
  );
}
