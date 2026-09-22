import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CitizenRequestForm } from "@/components/citizen-request-form";
import { request } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";

export function RequestPreview({ site }: { site: SiteContentSnapshot }) {
  return (
    <section
      id="request"
      className="scroll-mt-24 border-t border-border/60 bg-[linear-gradient(180deg,#111111_0%,#1a1a1a_100%)] py-16 text-white sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="animate-rise">
          <div className="section-rule mb-5 !bg-gradient-to-l from-gold to-transparent" aria-hidden />
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">{request.title}</h2>
          <p className="mt-3 max-w-xl text-lg leading-8 text-white/75">{request.lead}</p>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            {request.howItWorks.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ul>
          <Button
            render={<Link href="/request" />}
            nativeButton={false}
            size="lg"
            className="mt-8 h-11 rounded-md bg-gold px-6 text-[#1a1205] hover:bg-gold/90"
          >
            <MessageCircle className="size-4" aria-hidden />
            صفحة تعديل الطلب
          </Button>
        </div>

        <div className="animate-rise-delay-1 rounded-2xl bg-white p-5 text-foreground shadow-lg sm:p-7">
          <CitizenRequestForm
            compact
            phoneDisplay={site.phoneDisplay}
            whatsappE164={site.whatsappE164}
          />
        </div>
      </div>
    </section>
  );
}
