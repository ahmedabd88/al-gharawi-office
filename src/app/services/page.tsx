import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  FileText,
  GraduationCap,
  HeartPulse,
  Leaf,
  MessageCircle,
  Phone,
  Route,
  Settings2,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { RecreatePageShell } from "@/components/recreate-page-shell";
import { office, services } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `الخدمات | ${office.brand}`,
  description: services.lead,
};

const itemIcons: Record<(typeof services.items)[number]["icon"], LucideIcon> = {
  file: FileText,
  gear: Settings2,
  phone: Phone,
  chat: MessageCircle,
};

const areaIcons: Record<(typeof services.areas)[number]["icon"], LucideIcon> = {
  building: Building2,
  heart: HeartPulse,
  grad: GraduationCap,
  users: Users,
  road: Route,
  leaf: Leaf,
  bolt: Zap,
};

export default function ServicesPage() {
  return (
    <RecreatePageShell title={services.title} lead={services.lead} crumb={services.title}>
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {services.items.map((item) => {
          const Icon = itemIcons[item.icon];
          return (
            <li
              key={item.title}
              className="flex flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-5"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-md bg-gold text-[#1a1205]">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 className="font-heading mt-3 text-lg font-bold text-brand">{item.title}</h2>
              <p className="mt-1.5 flex-1 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
              <Link
                href={item.href}
                className={cn(
                  "mt-4 inline-flex min-h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors",
                  item.accent
                    ? "bg-gold text-[#1a1205] hover:bg-[#d4af37]"
                    : "bg-[#f3ead2] text-[#1a1205] hover:bg-gold/40"
                )}
              >
                {item.cta}
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="mt-8 sm:mt-10">
        <h2 className="font-heading text-center text-xl font-bold text-brand sm:text-2xl">
          {services.areasTitle}
        </h2>
        <ul className="mt-5 flex flex-wrap items-start justify-center gap-x-4 gap-y-5 sm:gap-x-6">
          {services.areas.map((area) => {
            const Icon = areaIcons[area.icon];
            return (
              <li key={area.title} className="flex w-[4.75rem] flex-col items-center text-center sm:w-24">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-white text-brand shadow-md sm:size-16">
                  <Icon className="size-6" aria-hidden />
                </span>
                <p className="mt-2 text-[11px] font-medium leading-snug text-brand sm:text-xs">
                  {area.title}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </RecreatePageShell>
  );
}
