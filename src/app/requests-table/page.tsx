import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { office } from "@/lib/content";
import { hasOfficeSession } from "@/lib/require-office-session";

export const metadata: Metadata = {
  title: `الطلبات | ${office.brand}`,
  description: "أُعيد توجيه جدول الطلبات إلى لوحة التحكم.",
  robots: { index: false, follow: false },
};

/** Legacy path — control lives at /office now. */
export default async function RequestsTableRedirectPage() {
  if (!(await hasOfficeSession())) {
    redirect("/office-login?next=/office?section=requests");
  }
  redirect("/office?section=requests");
}
