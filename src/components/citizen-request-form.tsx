"use client";

import { FormEvent, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WhatsAppOpenLink } from "@/components/whatsapp-open-link";
import { contact, request } from "@/lib/content";
import {
  normalizeIraqiWhatsApp,
  normalizeWhitespace,
  validateFourPartArabicName,
} from "@/lib/validation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type FieldErrors = {
  fullName?: string;
  whatsapp?: string;
};

type FollowUpResult = {
  fullName: string;
  whatsapp: string;
  subject?: string | null;
  status: string;
  ref?: string | null;
  at: string;
};

const errorMap = request.errors;

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  } catch {
    return iso;
  }
}

function buildInquiryMessage(fullName: string, whatsapp: string): string {
  return [
    "السلام عليكم،",
    "أود الاستفسار عن طلبي — بحثت في متابعة الموقع ولم يظهر طلب مسجّل.",
    `الاسم الرباعي: ${fullName}`,
    `رقم الواتساب: ${whatsapp}`,
    "أرجو المراجعة أو تسجيل الطلب إن لزم. شكراً لكم.",
  ].join("\n");
}

export function CitizenRequestForm({
  compact = false,
  phoneDisplay = contact.phoneDisplay,
  whatsappE164 = contact.whatsappE164,
}: {
  compact?: boolean;
  phoneDisplay?: string;
  whatsappE164?: string;
}) {
  const [status, setStatus] = useState<"idle" | "error" | "found" | "empty">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [result, setResult] = useState<FollowUpResult | null>(null);
  const [lastQuery, setLastQuery] = useState<{ fullName: string; whatsapp: string } | null>(
    null
  );

  const inquiryWhatsAppUrl = useMemo(() => {
    if (!lastQuery) return null;
    return buildWhatsAppUrl(
      whatsappE164,
      buildInquiryMessage(lastQuery.fullName, lastQuery.whatsapp)
    );
  }, [lastQuery, whatsappE164]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = normalizeWhitespace(String(data.get("fullName") ?? ""));
    const whatsappRaw = String(data.get("whatsapp") ?? "");

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
      setResult(null);
      setLookupError(null);
      setLastQuery(null);
      return;
    }

    if (!normalizedWhatsapp) return;

    setErrors({});
    setLookupError(null);
    setLoading(true);
    setResult(null);
    setLastQuery({ fullName, whatsapp: normalizedWhatsapp });

    try {
      const res = await fetch("/api/citizen-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          whatsapp: normalizedWhatsapp,
        }),
      });
      const dataJson = (await res.json()) as {
        ok?: boolean;
        found?: boolean;
        message?: string;
        error?: string;
        request?: FollowUpResult;
      };
      if (!res.ok || !dataJson.ok) {
        setLookupError(dataJson.error || errorMap.lookup);
        setStatus("error");
        return;
      }
      if (!dataJson.found || !dataJson.request) {
        setStatus("empty");
        setResult(null);
        return;
      }
      setResult(dataJson.request);
      setStatus("found");
    } catch {
      setLookupError(errorMap.lookup);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
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

      {lookupError ? (
        <p
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {lookupError}
        </p>
      ) : null}

      {status === "empty" ? (
        <div
          className="space-y-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-3 text-amber-950"
          role="status"
        >
          <p className="text-sm font-semibold leading-7">{request.empty}</p>
          <p className="text-sm leading-7 text-amber-900/80">{request.emptyHint}</p>
          {inquiryWhatsAppUrl ? (
            <WhatsAppOpenLink
              href={inquiryWhatsAppUrl}
              label={request.emptyWhatsAppLabel}
              hint={request.emptyWhatsAppHint}
            />
          ) : null}
        </div>
      ) : null}

      {status === "found" && result ? (
        <div
          className="space-y-3 rounded-md border border-emerald-700/30 bg-emerald-50 px-3 py-3 text-emerald-950"
          role="status"
        >
          <p className="text-sm font-semibold">{request.foundTitle}</p>
          <dl className="space-y-2 text-sm leading-7">
            <div className="flex flex-wrap gap-2">
              <dt className="font-medium">{request.statusLabel}:</dt>
              <dd className="rounded-md bg-white/80 px-2 py-0.5 font-semibold ring-1 ring-emerald-200">
                {result.status}
              </dd>
            </div>
            {result.ref ? (
              <div className="flex flex-wrap gap-2">
                <dt className="font-medium">{request.refLabel}:</dt>
                <dd dir="ltr">{result.ref}</dd>
              </div>
            ) : null}
            {result.subject ? (
              <div className="flex flex-wrap gap-2">
                <dt className="font-medium">{request.subjectResultLabel}:</dt>
                <dd>{result.subject}</dd>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <dt className="font-medium">{request.dateLabel}:</dt>
              <dd dir="ltr">{formatDate(result.at)}</dd>
            </div>
          </dl>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="h-12 w-full rounded-md bg-[#111111] text-base text-white hover:bg-black sm:w-auto sm:px-8"
      >
        <Search className="size-4" aria-hidden />
        {loading ? request.searching : request.submit}
      </Button>

      <p className="text-xs text-muted-foreground">
        للاستفسار عن المكتب:{" "}
        <span dir="ltr" className="unicode-isolate tabular-nums">
          {phoneDisplay}
        </span>
      </p>
    </form>
  );
}
