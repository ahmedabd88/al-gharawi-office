import type { Metadata } from "next";
import { OfficeLoginClient } from "@/components/office-login-client";
import { office } from "@/lib/content";

export const metadata: Metadata = {
  title: `دخول المكتب | ${office.brand}`,
  description: "دخول خاص بجدول الطلبات — ليس للزوار.",
  robots: { index: false, follow: false },
};

export default function OfficeLoginPage() {
  return (
    <main className="flex min-h-[100dvh] flex-1 flex-col bg-[linear-gradient(180deg,#0a0a0a_0%,#1a1205_45%,#f7f4ee_45%)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-sm text-gold">{office.brand}</p>
        <p className="mt-2 text-white/70">بوابة خاصة بجدول الطلبات</p>
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-start justify-center px-4 pb-16 sm:px-6">
        <OfficeLoginClient />
      </div>
    </main>
  );
}
