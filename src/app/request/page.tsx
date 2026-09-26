import type { Metadata } from "next";
import { FollowUpRecreate } from "@/components/followup-recreate";
import { RecreatePageShell } from "@/components/recreate-page-shell";
import { office, request } from "@/lib/content";
import { getSiteContentSnapshot } from "@/lib/site-content-store";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `متابعة الطلب | ${office.brand}`,
  description: request.lead,
};

export default async function RequestPage() {
  const site = await getSiteContentSnapshot();

  return (
    <RecreatePageShell
      title={request.title}
      lead="تابع حالة طلبك بسهولة وبشكل مباشر — للطلبات المسجّلة لدى المكتب فقط."
      crumb={request.title}
    >
      <FollowUpRecreate
        phoneDisplay={site.phoneDisplay}
        whatsappE164={site.whatsappE164}
      />
    </RecreatePageShell>
  );
}
