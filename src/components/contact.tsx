"use client";

import { FormEvent, useState } from "react";
import { MessageCircle, Phone, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppOpenLink } from "@/components/whatsapp-open-link";
import { contact } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";
import { buildContactWhatsAppMessage, normalizeWhitespace } from "@/lib/validation";
import { buildWhatsAppUrl, openWhatsAppUrl, type WhatsAppOpenResult } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Contact({
  standalone = false,
  site,
}: {
  standalone?: boolean;
  site: SiteContentSnapshot;
}) {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [openResult, setOpenResult] = useState<WhatsAppOpenResult | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = normalizeWhitespace(String(data.get("name") ?? ""));
    const phone = String(data.get("phone") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = normalizeWhitespace(String(data.get("message") ?? ""));

    if (!name || !message) {
      setStatus("error");
      setWhatsappUrl(null);
      setOpenResult(null);
      return;
    }

    const text = buildContactWhatsAppMessage({ name, phone, subject, message });
    const url = buildWhatsAppUrl(site.whatsappE164, text);
    setWhatsappUrl(url);
    setStatus("success");
    const result = openWhatsAppUrl(url);
    setOpenResult(result);
  }

  return (
    <section
      id="contact"
      className={cn(
        "scroll-mt-24",
        standalone ? "bg-background py-12 sm:py-16" : "border-t border-border/60 bg-background py-16 sm:py-20"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {!standalone ? (
          <div className="max-w-3xl">
            <div className="section-rule mb-5" aria-hidden />
            <h2 className="font-heading text-3xl font-bold text-brand sm:text-4xl">{contact.title}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{site.contactLead}</p>
          </div>
        ) : null}

        <div className={cn("grid gap-10 lg:grid-cols-[0.85fr_1.15fr]", !standalone && "mt-10")}>
          <div className="space-y-5 rounded-2xl bg-[#111111] p-6 text-white sm:p-8">
            <div className="border-b border-white/15 pb-5">
              <p className="text-sm text-gold">الهاتف / واتساب</p>
              <a
                href={`tel:${site.phoneTel}`}
                className="mt-2 inline-flex min-h-11 items-center gap-2 text-2xl font-semibold hover:text-gold"
                dir="ltr"
              >
                <Phone className="size-5" aria-hidden />
                <span className="unicode-isolate tabular-nums tracking-wide">{site.phoneDisplay}</span>
              </a>
            </div>
            <div className="border-b border-white/15 pb-5">
              <p className="text-sm text-gold">أوقات الاستقبال</p>
              <p className="mt-2 text-lg">{site.hours}</p>
            </div>
            <div className="border-b border-white/15 pb-5">
              <p className="text-sm text-gold">فيسبوك</p>
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 text-lg font-medium hover:text-gold"
              >
                <Share2 className="size-5" aria-hidden />
                {contact.facebookLabel}
              </a>
            </div>
            <div className="border-b border-white/15 pb-5">
              <p className="text-sm text-gold">متابعة الطلب</p>
              <Button
                render={<Link href="/request" />}
                nativeButton={false}
                size="lg"
                className="mt-3 h-11 rounded-md bg-gold px-5 text-[#1a1205] hover:bg-gold/90"
              >
                <MessageCircle className="size-4" aria-hidden />
                الاستعلام عن حالة الطلب
              </Button>
            </div>
            <div className="border-b border-white/15 pb-5">
              <p className="text-sm text-gold">البريد</p>
              <p className="mt-2 text-white/70">{contact.placeholders.email}</p>
            </div>
            <div>
              <p className="text-sm text-gold">{site.addressLabel}</p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-lg text-white/90 hover:text-gold hover:underline"
              >
                {site.address}
              </a>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-3 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-[#1a1205]"
              >
                {site.mapsLabel}
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-6"
            noValidate
          >
            <p className="rounded-md border border-gold/30 bg-gold/10 px-3 py-2 text-sm leading-7 text-[#1a1205]">
              {contact.form.hint}
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{contact.form.name}</Label>
                <Input id="name" name="name" required autoComplete="name" className="min-h-11 text-base md:text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{contact.form.phone}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  dir="ltr"
                  className="min-h-11 text-right text-base md:text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">{contact.form.subject}</Label>
              <Input id="subject" name="subject" className="min-h-11 text-base md:text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{contact.form.message}</Label>
              <Textarea id="message" name="message" required rows={5} className="min-h-28 text-base md:text-sm" />
            </div>

            {status === "error" ? (
              <p
                className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                role="alert"
              >
                {contact.form.required}
              </p>
            ) : null}
            {status === "success" && whatsappUrl ? (
              <div
                className="space-y-3 rounded-md border border-emerald-700/30 bg-emerald-50 px-3 py-3 text-emerald-950"
                role="status"
              >
                <p className="text-sm leading-7">
                  {openResult === "blocked" ? contact.form.successBlocked : contact.form.success}
                </p>
                <WhatsAppOpenLink href={whatsappUrl} label={contact.form.openManual} />
              </div>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="h-12 w-full rounded-md bg-[#111111] text-base text-white hover:bg-black sm:w-auto sm:px-8"
            >
              <MessageCircle className="size-4" aria-hidden />
              {contact.form.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
