import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function PageShell({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-[#111111] text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <p className="text-sm text-gold">
              <Link href="/" className="hover:underline">
                الرئيسية
              </Link>
              <span className="mx-2 text-white/40">/</span>
              {title}
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{lead}</p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
