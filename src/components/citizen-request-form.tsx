"use client";

import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WhatsAppOpenLink } from "@/components/whatsapp-open-link";
import { contact, request } from "@/lib/content";
import {
  buildCitizenWhatsAppMessage,
  normalizeIraqiWhatsApp,
  normalizeWhitespace,
  validateFourPartArabicName,
} from "@/lib/validation";
import { buildWhatsAppUrl, openWhatsAppUrl, type WhatsAppOpenResult } from "@/lib/whatsapp";

type FieldErrors = {
  fullName?: string;
  whatsapp?: string;
};

const errorMap = request.errors;

export function CitizenRequestForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [openResult, setOpenResult] = useState<WhatsAppOpenResult | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = normalizeWhitespace(String(data.get("fullName") ?? ""));
    const whatsappRaw = String(data.get("whatsapp") ?? "");
    const subject = String(data.get("subject") ?? "");

    const nextErrors: FieldErrors = {};
    const nameError = validateFourPartArabicName(fullName);
    if (nameError === "required" || nameError === "nameParts" || nameError === "nameArabic") {
      nextErrors.fullName = errorMap[nameError === "required" ? "nameParts" : nameError];
    }

    const normalizedWhatsapp = normalizeIraqiWhatsApp(whatsappRaw);
    if (!normalizedWhatsapp) {
      nextErrors.whatsapp = errorMap.whatsapp;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setWhatsappUrl(null);
      setOpenResult(null);
      return;
    }

    setErrors({});

    const message = buildCitizenWhatsAppMessage({
      fullName,
      whatsapp: normalizedWhatsapp!,
      subject,
    });
    const url = buildWhatsAppUrl(contact.whatsappE164, message);

    // Server-side store (write-only for citizens) — office reads via private login.
    try {
      await fetch("/api/citizen-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          whatsapp: normalizedWhatsapp,
          subject: normalizeWhitespace(subject) || null,
        }),
      });
    } catch {
      // WhatsApp open should still proceed even if store write fails.
    }

    setWhatsappUrl(url);
    setStatus("success");
    const result = openWhatsAppUrl(url);
    setOpenResult(result);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={
        compact
          ? "space-y-4"
          : "space-y-5 rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-7"
      }
      noValidate
    >
      <p className="rounded-md border border-gold/30 bg-gold/10 px-3 py-2 text-sm leading-7 text-[#1a1205]">
        {request.popupHint}
      </p>
      <ul className="space-y-1 text-xs leading-6 text-muted-foreground">
        <li>• {request.deviceTips.mobile}</li>
        <li>• {request.deviceTips.desktop}</li>
      </ul>

      <div className="space-y-2">
        <Label htmlFor="fullName">{request.fullNameLabel}</Label>
        <Input
          id="fullName"
          name="fullName"
          required
          autoComplete="name"
          placeholder={request.fullNamePlaceholder}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby="fullName-hint"
          className="min-h-11 text-base md:text-sm"
        />
        <p id="fullName-hint" className="text-xs text-muted-foreground">
          {request.fullNameHint}
        </p>
        {errors.fullName ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.fullName}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">{request.whatsappLabel}</Label>
        <Input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="numeric"
          required
          autoComplete="tel"
          dir="ltr"
          className="min-h-11 text-right text-base tabular-nums md:text-sm"
          placeholder={request.whatsappPlaceholder}
          aria-invalid={Boolean(errors.whatsapp)}
          aria-describedby="whatsapp-hint"
        />
        <p id="whatsapp-hint" className="text-xs text-muted-foreground">
          {request.whatsappHint}
        </p>
        {errors.whatsapp ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.whatsapp}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{request.subjectLabel}</Label>
        <Input
          id="subject"
          name="subject"
          placeholder={request.subjectPlaceholder}
          className="min-h-11 text-base md:text-sm"
        />
      </div>

      {status === "success" && whatsappUrl ? (
        <div
          className="space-y-3 rounded-md border border-emerald-700/30 bg-emerald-50 px-3 py-3 text-emerald-950"
          role="status"
        >
          <p className="text-sm leading-7">
            {openResult === "blocked" ? request.successBlocked : request.success}
          </p>
          <WhatsAppOpenLink href={whatsappUrl} label={request.openManual} />
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-md bg-[#111111] text-base text-white hover:bg-black sm:w-auto sm:px-8"
      >
        <MessageCircle className="size-4" aria-hidden />
        {request.submit}
      </Button>

      <p className="text-xs text-muted-foreground">
        رقم واتساب المكتب:{" "}
        <span dir="ltr" className="unicode-isolate tabular-nums">
          {contact.phoneDisplay}
        </span>
      </p>
    </form>
  );
}
