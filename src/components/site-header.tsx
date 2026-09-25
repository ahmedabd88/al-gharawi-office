"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroPillNav, heroNavItems } from "@/components/hero-pill-nav";
import { cn } from "@/lib/utils";

/**
 * Inner pages: sticky bar. Homepage uses HeroPillNav inside the hero instead.
 */
export function SiteHeader({ variant = "overlay" }: { variant?: "overlay" | "solid" | "hidden" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (variant === "hidden" || pathname === "/") {
    return null;
  }

  const solid = variant === "solid" || pathname !== "/";

  return (
    <header
      className={cn(
        "z-40 w-full transition-colors",
        solid
          ? "sticky top-0 border-b border-border/70 bg-[#0a0a0a]/95 text-white backdrop-blur"
          : "absolute inset-x-0 top-0"
      )}
    >
      <div className="mx-auto hidden max-w-6xl items-center justify-center px-4 py-3 md:flex sm:px-6">
        <HeroPillNav />
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:hidden">
        <p className="font-heading text-sm font-semibold text-gold">مكتب النائب</p>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="border-white/40 bg-black/35 text-white hover:bg-white/10 hover:text-white"
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
          "mx-4 overflow-hidden rounded-xl border border-white/15 bg-black/95 shadow-sm backdrop-blur transition-all duration-300 md:hidden",
          open ? "mb-3 max-h-96 opacity-100" : "pointer-events-none max-h-0 border-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="قائمة الجوال">
          {heroNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
