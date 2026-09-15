import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { OfficeControlPanel } from "@/components/office-control-panel";
import { office } from "@/lib/content";
import { hasOfficeSession } from "@/lib/require-office-session";

export const metadata: Metadata = {
  title: `لوحة التحكم | ${office.brand}`,
  description: "لوحة تحكم خاصة بالمكتب — تتطلب كلمة مرور.",
  robots: { index: false, follow: false },
};

export default async function OfficeDashboardPage() {
  if (!(await hasOfficeSession())) {
    redirect("/office-login?next=/office");
  }

  return (
    <Suspense fallback={<p className="p-8 text-center text-muted-foreground">جاري التحميل…</p>}>
      <OfficeControlPanel />
    </Suspense>
  );
}
