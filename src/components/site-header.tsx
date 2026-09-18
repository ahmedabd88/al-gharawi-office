"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="/" className="font-heading text-base font-semibold text-white drop-shadow sm:text-lg">
          الرئيسية
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="القائمة الرئيسية">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/90 drop-shadow transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
          <Button
            render={<a href="#contact" />}
            size="lg"
            className="rounded-md bg-gold px-4 text-[#1a1205] hover:bg-gold/90"
          >
            تواصل
          </Button>
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="border-white/40 bg-black/35 text-white hover:bg-white/10 hover:text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "mx-4 overflow-hidden rounded-xl border border-white/15 bg-black/95 shadow-sm backdrop-blur md:hidden",
          open ? "mb-3 max-h-64 opacity-100" : "pointer-events-none max-h-0 border-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="قائمة الجوال">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
