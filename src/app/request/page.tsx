import type { Metadata } from "next";
import { CitizenRequestForm } from "@/components/citizen-request-form";
import { PageShell } from "@/components/page-shell";
import { office, request } from "@/lib/content";
import { getSiteContentSnapshot } from "@/lib/site-content-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `قدّم طلباً | ${office.brand}`,
  description: request.lead,
};

export default async function RequestPage() {
  const site = await getSiteContentSnapshot();

  return (
    <PageShell title={request.title} lead={request.lead} site={site}>
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
              {site.phoneDisplay}
            </p>
            <p className="mt-4 text-white/70">أوقات الاستقبال: {site.hours}</p>
            <p className="mt-4 text-white/90">
              <span className="text-gold">{site.addressLabel}: </span>
              {site.address}
            </p>
          </div>
        </div>
        <CitizenRequestForm
          phoneDisplay={site.phoneDisplay}
          whatsappE164={site.whatsappE164}
        />
      </div>
    </PageShell>
  );
}
