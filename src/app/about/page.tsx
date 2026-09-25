import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Calendar,
  ChartNoAxesCombined,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { RecreatePageShell } from "@/components/recreate-page-shell";
import { about, office } from "@/lib/content";

export const metadata: Metadata = {
  title: `عن المكتب | ${office.brand}`,
  description: about.lead,
};

const factIcons: Record<(typeof about.facts)[number]["icon"], LucideIcon> = {
  building: Building2,
  map: MapPin,
  users: Users,
  calendar: Calendar,
};

const goalIcons: Record<(typeof about.goals)[number]["icon"], LucideIcon> = {
  shield: ShieldCheck,
  chat: MessageCircle,
  chart: ChartNoAxesCombined,
  community: Users,
};

export default function AboutPage() {
  return (
    <RecreatePageShell title={about.title} lead={about.lead} crumb={about.title}>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
        <article className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:p-6">
          <h2 className="font-heading text-xl font-bold text-brand sm:text-2xl">
            {about.introTitle}
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-7 text-foreground/85 sm:text-[0.95rem] sm:leading-8">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-4 rounded-lg border border-dashed border-gold/40 bg-gold/5 px-3 py-2 text-xs leading-6 text-stone-warm">
            {about.note}
          </p>
        </article>

        <aside className="overflow-hidden rounded-2xl bg-[#111111] text-white shadow-[0_8px_28px_rgba(0,0,0,0.12)]">
          {about.facts.map((fact, i) => {
            const Icon = factIcons[fact.icon];
            return (
              <div
                key={fact.label}
                className={`flex items-start gap-3 px-4 py-3.5 sm:px-5 sm:py-4 ${
                  i > 0 ? "border-t border-white/10" : ""
                }`}
              >
                <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-gold/45 bg-gold/10 text-gold">
                  <Icon className="size-5" strokeWidth={1.85} aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-medium text-gold">{fact.label}</p>
                  <p className="mt-0.5 text-sm font-semibold leading-snug">{fact.value}</p>
                </div>
              </div>
            );
          })}
        </aside>
      </div>

      <section className="mt-9 sm:mt-11">
        <h2 className="font-heading text-center text-xl font-bold text-brand sm:text-2xl">
          {about.goalsTitle}
        </h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-4">
          {about.goals.map((goal) => {
            const Icon = goalIcons[goal.icon];
            return (
              <li
                key={goal.title}
                className="flex flex-col items-center rounded-2xl border border-black/5 bg-white px-3 py-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              >
                <span className="inline-flex size-14 items-center justify-center rounded-full border-2 border-gold text-gold">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </span>
                <p className="font-heading mt-3 text-sm font-bold text-brand sm:text-base">
                  {goal.title}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-7 text-center text-sm">
        <Link href="/contact" className="font-semibold text-gold hover:underline">
          تواصل معنا
        </Link>
        <span className="mx-2 text-muted-foreground">·</span>
        <Link href="/request" className="font-semibold text-gold hover:underline">
          متابعة الطلب
        </Link>
      </p>
    </RecreatePageShell>
  );
}
