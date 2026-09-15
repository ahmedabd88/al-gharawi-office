import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RequestsTableView } from "@/components/requests-table-view";
import { SiteHeader } from "@/components/site-header";
import { office } from "@/lib/content";
import { OFFICE_SESSION_COOKIE, verifyOfficeSessionToken } from "@/lib/office-session";
import { requestsTableCopy } from "@/lib/requests-table";

export const metadata: Metadata = {
  title: `${requestsTableCopy.pageTitle} | ${office.brand}`,
  description: "جدول طلبات خاص بالمكتب — يتطلب تسجيل الدخول.",
  robots: { index: false, follow: false },
};

export default async function RequestsTablePage() {
  const jar = await cookies();
  const token = jar.get(OFFICE_SESSION_COOKIE)?.value;
  if (!verifyOfficeSessionToken(token)) {
    redirect("/office-login?next=/requests-table");
  }

  return (
    <>
      <div className="no-print">
        <SiteHeader variant="solid" />
      </div>
      <main className="flex-1">
        <div className="no-print border-b border-border/60 bg-[#111] px-4 py-3 text-sm text-white/80 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
            <Link href="/" className="hover:text-gold">
              الرئيسية
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-gold">{requestsTableCopy.pageTitle} (خاص)</span>
          </div>
        </div>
        <RequestsTableView />
      </main>
    </>
  );
}
