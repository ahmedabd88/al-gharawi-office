"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nav, office } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <a
          href="#top"
          className="font-heading text-lg font-semibold tracking-tight text-brand sm:text-xl"
        >
          {office.shortBrand}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="القائمة الرئيسية">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-brand"
            >
              {item.label}
            </a>
          ))}
          <Button render={<a href="#contact" />} size="lg" className="rounded-md px-4">
            تواصل
          </Button>
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="md:hidden"
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
          "mx-4 overflow-hidden rounded-xl border border-border/80 bg-background/95 shadow-sm backdrop-blur md:hidden",
          open ? "mb-3 max-h-64 opacity-100" : "pointer-events-none max-h-0 border-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="قائمة الجوال">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
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
