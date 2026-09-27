import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  ClipboardList,
  Info,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { about, contact, request, services } from "@/lib/content";
import { cn } from "@/lib/utils";

type Preview = {
  id: string;
  href: string;
  title: string;
  lead: string;
  cta: string;
  icon: LucideIcon;
  tone: "light" | "soft" | "dark";
};

const previews: Preview[] = [
  {
    id: "about",
    href: "/about",
    title: about.title,
    lead: about.lead,
    cta: "اقرأ المزيد عن المكتب",
    icon: Info,
    tone: "light",
  },
  {
    id: "services",
    href: "/services",
    title: services.title,
    lead: services.lead,
    cta: "عرض الخدمات",
    icon: Briefcase,
    tone: "soft",
  },
  {
    id: "request",
    href: "/request",
    title: request.title,
    lead: "تابع حالة طلبك المسجّل لدى المكتب بالاسم الرباعي ورقم الواتساب — دون إنشاء طلب جديد من الموقع.",
    cta: "متابعة الطلب",
    icon: ClipboardList,
    tone: "dark",
  },
  {
    id: "contact",
    href: "/contact",
    title: contact.title,
    lead: contact.lead,
    cta: "تواصل معنا",
    icon: MessageCircle,
    tone: "light",
  },
];

/**
 * Homepage mid-page blocks: short unified teaser → dedicated page.
 * Full copy lives only on /about, /services, /request, /contact.
 */
export function HomeSectionPreviews() {
  return (
    <div className="border-t border-border/60">
      {previews.map((item) => {
        const Icon = item.icon;
        const dark = item.tone === "dark";
        return (
          <section
            key={item.id}
            id={item.id}
            className={cn(
              "scroll-mt-24 border-b border-border/50 py-12 sm:py-14",
              item.tone === "light" && "bg-background",
              item.tone === "soft" &&
                "bg-[linear-gradient(180deg,#f7f3ea_0%,#f4f7f5_55%,#eef2ef_100%)]",
              dark && "border-white/10 bg-[linear-gradient(180deg,#111111_0%,#1a1a1a_100%)] text-white"
            )}
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:px-6">
              <div className="max-w-2xl">
                <div
                  className={cn(
                    "section-rule mb-4",
                    dark && "!bg-gradient-to-l from-gold to-transparent"
                  )}
                  aria-hidden
                />
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-lg",
                      dark ? "bg-gold text-[#1a1205]" : "bg-gold/15 text-gold"
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h2
                      className={cn(
                        "font-heading text-2xl font-bold sm:text-3xl",
                        dark ? "text-white" : "text-brand"
                      )}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={cn(
                        "mt-2 text-base leading-7 sm:text-lg sm:leading-8",
                        dark ? "text-white/75" : "text-muted-foreground"
                      )}
                    >
                      {item.lead}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={item.href}
                prefetch
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition-colors",
                  dark
                    ? "bg-gold text-[#1a1205] hover:brightness-105"
                    : "bg-[#111111] text-white hover:bg-black"
                )}
              >
                {item.cta}
                <ArrowLeft className="size-4" aria-hidden />
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
