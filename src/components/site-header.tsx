"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nav, office } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Home + page links shown as one RTL command cluster (visual left). */
const commandNav = [{ href: "/", label: office.shortBrand }, ...nav] as const;

export function SiteHeader({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-4 py-4 sm:px-6">
        {/* RTL: justify-end places this command cluster on the visual left */}
        <nav
          className={cn(
            "hidden items-center gap-5 md:flex lg:gap-6",
            solid ? "text-white/90" : "text-white/90 drop-shadow"
          )}
          aria-label="القائمة الرئيسية"
        >
          {commandNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold",
                  item.href === "/" && "font-heading font-semibold",
                  active ? "text-gold" : undefined
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button
            render={<Link href="/request" />}
            nativeButton={false}
            size="lg"
            className="rounded-md bg-gold px-4 text-[#1a1205] hover:bg-gold/90"
          >
            متابعة الطلب
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
          "mx-4 overflow-hidden rounded-xl border border-white/15 bg-black/95 shadow-sm backdrop-blur transition-all duration-300 md:hidden",
          open ? "mb-3 max-h-96 opacity-100" : "pointer-events-none max-h-0 border-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="قائمة الجوال">
          {commandNav.map((item) => (
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
