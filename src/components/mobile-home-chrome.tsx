"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Menu, X } from "lucide-react";
import { heroNavItems } from "@/components/hero-pill-nav";
import { office } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Mobile homepage top bar: seal · gold home pill · hamburger (visual LTR). */
export function MobileHomeChrome() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-30 bg-black">
      <div
        className="flex items-center justify-between gap-2 px-3 py-2.5"
        dir="ltr"
      >
        <Image
          src={office.parliamentSealSrc}
          alt="مجلس النواب العراقي"
          width={52}
          height={52}
          className="size-12 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(201,162,39,0.35)]"
          priority
        />

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#e8c547] to-[#c9a227] px-4 py-2 text-sm font-bold text-[#1a1205] shadow-[0_0_16px_rgba(201,162,39,0.45)]"
          aria-current="page"
        >
          <Home className="size-3.5 shrink-0" aria-hidden />
          الصفحة الرئيسية
        </Link>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-gold transition-colors hover:bg-white/10"
          aria-expanded={open}
          aria-controls="mobile-home-menu"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-7" strokeWidth={2.25} /> : <Menu className="size-7" strokeWidth={2.25} />}
        </button>
      </div>

      <div
        id="mobile-home-menu"
        className={cn(
          "mx-3 overflow-hidden rounded-2xl border border-gold/30 bg-black/95 shadow-lg transition-all duration-300",
          open ? "mb-3 max-h-96 opacity-100" : "pointer-events-none max-h-0 border-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-2" aria-label="قائمة الجوال" dir="rtl">
          {heroNavItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/";
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
