import type { Metadata } from "next";
import Link from "next/link";
import { Table2 } from "lucide-react";
import { CitizenRequestForm } from "@/components/citizen-request-form";
import { PageShell } from "@/components/page-shell";
import { contact, office, request } from "@/lib/content";

export const metadata: Metadata = {
  title: `قدّم طلباً | ${office.brand}`,
  description: request.lead,
};

export default function RequestPage() {
  return (
    <PageShell title={request.title} lead={request.lead}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5 rounded-2xl bg-[#111111] p-6 text-white sm:p-8">
          <h2 className="font-heading text-xl font-semibold">كيف يعمل النموذج؟</h2>
          <ol className="space-y-4 text-sm leading-7 text-white/75">
            {request.howItWorks.map((step, index) => (
              <li key={step}>
                {index + 1}. {step}
              </li>
            ))}
          </ol>
          <div className="border-t border-white/15 pt-5 text-sm">
            <p className="text-gold">رقم المكتب على واتساب</p>
            <p className="mt-2 text-lg font-semibold" dir="ltr">
              {contact.phoneDisplay}
            </p>
            <p className="mt-4 text-white/70">أوقات الاستقبال: {contact.hours}</p>
            <p className="mt-4 text-white/90">
              <span className="text-gold">{contact.addressLabel}: </span>
              {contact.address}
            </p>
          </div>
          <div className="border-t border-white/15 pt-5">
            <p className="text-sm text-gold">للمكتب — جدول رسمي</p>
            <Link
              href="/requests-table"
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-gold/50 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-[#1a1205]"
            >
              <Table2 className="size-4" aria-hidden />
              فتح جدول الطلبات للطباعة
            </Link>
          </div>
        </div>
        <CitizenRequestForm />
      </div>
    </PageShell>
  );
}
