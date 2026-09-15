"use client";

import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contact, request } from "@/lib/content";
import {
  buildCitizenWhatsAppMessage,
  normalizeIraqiWhatsApp,
  normalizeWhitespace,
  validateFourPartArabicName,
} from "@/lib/validation";

type FieldErrors = {
  fullName?: string;
  whatsapp?: string;
};

const errorMap = request.errors;

export function CitizenRequestForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
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
      return;
    }

    setErrors({});
    setStatus("success");

    const message = buildCitizenWhatsAppMessage({
      fullName,
      whatsapp: normalizedWhatsapp!,
      subject,
    });

    // Keep a local breadcrumb for the citizen (no server/DB).
    try {
      const prev = JSON.parse(localStorage.getItem("citizen-requests") ?? "[]") as unknown[];
      const entry = {
        fullName,
        whatsapp: normalizedWhatsapp,
        subject: normalizeWhitespace(subject) || null,
        at: new Date().toISOString(),
      };
      localStorage.setItem("citizen-requests", JSON.stringify([entry, ...prev].slice(0, 20)));
    } catch {
      // ignore storage failures
    }

    const url = `https://wa.me/${contact.whatsappE164}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    // Also useful if popup blocked: navigate same tab after short delay fallback via link click
    form.reset();
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
          className="text-start tabular-nums"
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
        <Input id="subject" name="subject" placeholder={request.subjectPlaceholder} />
      </div>

      {status === "success" ? (
        <p className="rounded-md border border-emerald-700/30 bg-emerald-50 px-3 py-2 text-sm text-emerald-800" role="status">
          {request.success}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-md bg-[#111111] text-base text-white hover:bg-black sm:w-auto sm:px-8"
      >
        <MessageCircle className="size-4" aria-hidden />
        {request.submit}
      </Button>

      <p className="text-xs text-muted-foreground" dir="ltr">
        WhatsApp: {contact.phoneDisplay}
      </p>
    </form>
  );
}
