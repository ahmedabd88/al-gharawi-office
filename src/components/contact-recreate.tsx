"use client";

import { FormEvent, useState, type ReactNode } from "react";
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppOpenLink } from "@/components/whatsapp-open-link";
import { contact } from "@/lib/content";
import type { SiteContentSnapshot } from "@/lib/site-content";
import { buildContactWhatsAppMessage, normalizeWhitespace } from "@/lib/validation";
import { buildWhatsAppUrl, openWhatsAppUrl, type WhatsAppOpenResult } from "@/lib/whatsapp";

export function ContactRecreate({ site }: { site: SiteContentSnapshot }) {
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
    setOpenResult(openWhatsAppUrl(url));
  }

  return (
    <div className="grid gap-4 overflow-hidden rounded-2xl bg-white shadow-sm lg:grid-cols-[1.15fr_0.85fr]">
      <form onSubmit={onSubmit} className="space-y-3 p-4 sm:space-y-4 sm:p-6">
        <h2 className="font-heading text-lg font-bold text-brand sm:text-xl">أرسل لنا رسالة</h2>

        <div>
          <Label htmlFor="contact-name">{contact.form.name}</Label>
          <Input id="contact-name" name="name" className="mt-1.5" required />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="contact-subject">نوع الرسالة</Label>
            <select
              id="contact-subject"
              name="subject"
              className="border-input bg-background mt-1.5 flex h-10 w-full rounded-md border px-3 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                اختر الموضوع
              </option>
              <option value="استفسار">استفسار</option>
              <option value="متابعة معاملة">متابعة معاملة</option>
              <option value="مقترح">مقترح</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>
          <div>
            <Label htmlFor="contact-phone">{contact.form.phone}</Label>
            <Input id="contact-phone" name="phone" className="mt-1.5" dir="ltr" />
          </div>
        </div>

        <div>
          <Label htmlFor="contact-message">{contact.form.message}</Label>
          <Textarea id="contact-message" name="message" rows={5} className="mt-1.5" required />
        </div>

        {status === "error" ? (
          <p className="text-sm text-red-600">{contact.form.required}</p>
        ) : null}

        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-bold text-white hover:bg-[#1ebe57]"
        >
          <MessageCircle className="size-4" aria-hidden />
          إرسال عبر واتساب
        </button>

        {status === "success" && whatsappUrl ? (
          <div className="space-y-2 text-sm">
            <p className="text-emerald-700">
              {openResult === "blocked" ? contact.form.successBlocked : contact.form.success}
            </p>
            {openResult === "blocked" ? (
              <WhatsAppOpenLink href={whatsappUrl} label={contact.form.openManual} />
            ) : null}
          </div>
        ) : null}
      </form>

      <aside className="flex flex-col gap-0 bg-[#111111] text-white">
        <div className="space-y-4 p-4 sm:p-5">
          <InfoRow
            icon={<Phone className="size-4 text-[#25D366]" />}
            label={`${site.officePhoneLabel} / واتساب`}
            value={
              <a href={`tel:${site.phoneTel}`} className="unicode-isolate hover:text-gold" dir="ltr">
                {site.phoneDisplay}
              </a>
            }
          />
          {site.deputyPhoneDisplay && site.deputyPhoneTel ? (
            <InfoRow
              icon={<Phone className="size-4 text-gold" />}
              label={site.deputyPhoneLabel}
              value={
                <a
                  href={`tel:${site.deputyPhoneTel}`}
                  className="unicode-isolate hover:text-gold"
                  dir="ltr"
                >
                  {site.deputyPhoneDisplay}
                </a>
              }
            />
          ) : null}
          <InfoRow icon={<Clock3 className="size-4 text-gold" />} label="أوقات الاستقبال" value={site.hours} />
          <InfoRow
            icon={<Share2 className="size-4 text-[#1877F2]" />}
            label="فيسبوك"
            value={
              <a href={site.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
                صفحة المكتب الرسمية
              </a>
            }
          />
          <InfoRow
            icon={<Mail className="size-4 text-red-400" />}
            label="البريد الإلكتروني"
            value={<span className="text-white/70">{contact.placeholders.email}</span>}
          />
          <InfoRow
            icon={<MapPin className="size-4 text-gold" />}
            label={site.addressLabel}
            value={
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold hover:underline"
              >
                {site.address}
              </a>
            }
          />
        </div>

        <div className="mt-auto border-t border-white/10 p-4 sm:p-5">
          <p className="mb-2 text-xs text-gold">{site.mapsHint}</p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-gold/40 bg-white/95 px-4 py-5 text-center transition-colors hover:border-gold hover:bg-gold/10"
          >
            <MapPin className="size-7 text-gold" aria-hidden />
            <span className="text-sm font-bold text-brand">{site.mapsLabel}</span>
            <span className="text-xs leading-6 text-brand/70">{site.address}</span>
          </a>
        </div>
      </aside>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/5">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] text-gold">{label}</p>
        <div className="mt-0.5 text-sm font-semibold leading-snug">{value}</div>
      </div>
    </div>
  );
}
