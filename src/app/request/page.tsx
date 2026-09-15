import type { Metadata } from "next";
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
            <li>1. اكتب اسمك الرباعي بالعربية.</li>
            <li>2. أدخل رقم واتسابك العراقي.</li>
            <li>3. اضغط الإرسال لفتح واتساب برسالة جاهزة إلى المكتب.</li>
          </ol>
          <div className="border-t border-white/15 pt-5 text-sm">
            <p className="text-gold">رقم المكتب على واتساب</p>
            <p className="mt-2 text-lg font-semibold" dir="ltr">
              {contact.phoneDisplay}
            </p>
            <p className="mt-4 text-white/70">أوقات الاستقبال: {contact.hours}</p>
          </div>
        </div>
        <CitizenRequestForm />
      </div>
    </PageShell>
  );
}
