import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  ClipboardList,
  MessageCircle,
  Users,
  type LucideIcon,
} from "lucide-react";
import { mobileQuickLinks } from "@/lib/content";

const icons: Record<(typeof mobileQuickLinks)[number]["icon"], LucideIcon> = {
  followup: ClipboardList,
  services: Users,
  contact: MessageCircle,
  about: Building2,
};

/** 2×2 gold-bordered quick links for the mobile homepage. */
export function MobileQuickCards() {
  return (
    <div className="bg-black px-3 pb-6 pt-1" dir="ltr">
      <div className="grid grid-cols-2 gap-2.5">
        {mobileQuickLinks.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className="group relative flex min-h-[7.5rem] flex-col justify-between overflow-hidden rounded-xl border border-gold/55 bg-[#0c0c0c] p-3.5 shadow-[inset_0_0_24px_rgba(201,162,39,0.06)] transition-colors hover:border-gold hover:bg-[#12100a]"
            >
              <div className="flex items-start justify-between gap-2">
                <Icon className="size-7 text-gold" strokeWidth={1.5} aria-hidden />
                <span
                  className="inline-flex size-7 items-center justify-center rounded-full border border-gold/60 text-gold transition-transform group-hover:-translate-x-0.5"
                  aria-hidden
                >
                  <ArrowLeft className="size-3.5" />
                </span>
              </div>
              <div className="mt-3 text-right" dir="rtl">
                <p className="font-heading text-base font-bold text-white">{item.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-white/65">{item.subtitle}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
