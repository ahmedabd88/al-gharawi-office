"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  ClipboardList,
  Home,
  Info,
  Menu,
  MessageCircle,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const heroNavItems: {
  href: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { href: "/", label: "الصفحة الرئيسية", icon: Home },
  { href: "/about", label: "عن المكتب", icon: Info },
  { href: "/services", label: "الخدمات", icon: Briefcase },
  { href: "/request", label: "متابعة الطلب", icon: ClipboardList },
  { href: "/contact", label: "تواصل معنا", icon: MessageCircle },
];

export function HeroPillNav({ floating = false }: { floating?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("w-full", floating && "pointer-events-none")}>
      <div
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-center px-3 sm:px-4",
          floating && "pointer-events-auto"
        )}
      >
        <nav
          className="hidden items-center gap-1 rounded-full border border-gold/35 bg-black/55 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md md:flex"
          aria-label="القائمة الرئيسية"
        >
          {heroNavItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors lg:px-4",
                  active
                    ? "bg-gold text-[#1a1205] shadow-sm"
                    : "text-white/90 hover:bg-white/10 hover:text-gold"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-3.5 shrink-0 opacity-90" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile: menu only — no brand text (artwork already carries branding) */}
        <div className="flex w-full items-center justify-start md:hidden" dir="ltr">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-12 shrink-0 rounded-xl border-2 border-gold bg-black/80 text-gold shadow-[0_0_16px_rgba(201,162,39,0.45)] hover:bg-gold hover:text-[#1a1205]"
            aria-expanded={open}
            aria-controls="hero-mobile-nav"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-7" strokeWidth={2.5} aria-hidden />
            ) : (
              <Menu className="size-7" strokeWidth={2.5} aria-hidden />
            )}
          </Button>
        </div>
      </div>

      <div
        id="hero-mobile-nav"
        className={cn(
          "mx-3 mt-2 overflow-hidden rounded-2xl border border-gold/30 bg-black/90 shadow-lg backdrop-blur transition-all duration-300 md:hidden",
          floating && "pointer-events-auto",
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 border-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-2" aria-label="قائمة الجوال">
          {heroNavItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium",
                  active ? "bg-gold text-[#1a1205]" : "text-white hover:bg-white/10"
                )}
              >
                <Icon className="size-4" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
