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
              className="group flex flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:p-5"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#e8c547] to-[#c9a227] text-[#1a1205] shadow-sm">
                <Icon className="size-5" strokeWidth={2.25} aria-hidden />
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
                    ? "bg-gradient-to-l from-[#c9a227] to-[#e8c547] text-[#1a1205] shadow-sm hover:brightness-105"
                    : "bg-[#f3ead2] text-[#1a1205] hover:bg-gold/35"
                )}
              >
                {item.cta}
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="mt-9 sm:mt-11">
        <h2 className="font-heading text-center text-xl font-bold text-brand sm:text-2xl">
          {services.areasTitle}
        </h2>
        <ul className="mt-6 flex flex-wrap items-start justify-center gap-x-5 gap-y-6 sm:gap-x-7">
          {services.areas.map((area) => {
            const Icon = areaIcons[area.icon];
            return (
              <li
                key={area.title}
                className="flex w-[5rem] flex-col items-center text-center sm:w-24"
              >
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/30 bg-white text-gold shadow-[0_6px_18px_rgba(0,0,0,0.08)] sm:size-16">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </span>
                <p className="mt-2.5 text-[11px] font-semibold leading-snug text-brand sm:text-xs">
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
