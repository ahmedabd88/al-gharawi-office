"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Circle, Search } from "lucide-react";
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
import { cn } from "@/lib/utils";

type FieldErrors = { fullName?: string; whatsapp?: string };

type FollowUpResult = {
  fullName: string;
  whatsapp: string;
  subject?: string | null;
  status: string;
  ref?: string | null;
  at: string;
};

const STAGES = [
  "تم استلام الطلب",
  "قيد المعالجة",
  "مخاطبة الجهة المختصة",
  "بانتظار الرد",
  "تم إنجاز الطلب",
] as const;

function statusToStep(status: string): number {
  const s = status.trim();
  if (s.includes("إنجاز") || s.includes("مكتمل") || s.includes("منجز")) return 4;
  if (s.includes("انتظار") || s.includes("رد")) return 3;
  if (s.includes("مخاطب") || s.includes("إحالة") || s.includes("جهة")) return 2;
  if (s.includes("معالج") || s.includes("متابعة")) return 1;
  if (s.includes("استلام") || s.includes("جديد") || s.includes("تسجيل")) return 0;
  return 1;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
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

export function FollowUpRecreate({
  phoneDisplay,
  whatsappE164 = contact.whatsappE164,
}: {
  phoneDisplay: string;
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

  const activeStep = useMemo(
    () => (result ? statusToStep(result.status) : 1),
    [result]
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
      nextErrors.fullName = request.errors[nameError === "required" ? "nameParts" : nameError];
    }
    const normalizedWhatsapp = normalizeIraqiWhatsApp(whatsappRaw);
    if (!normalizedWhatsapp) nextErrors.whatsapp = request.errors.whatsapp;

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
    setLoading(true);
    setLookupError(null);
    setLastQuery({ fullName, whatsapp: normalizedWhatsapp });
    try {
      const res = await fetch("/api/citizen-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, whatsapp: normalizedWhatsapp }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        found?: boolean;
        request?: FollowUpResult;
        message?: string;
      };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setLookupError(json.message ?? request.errors.lookup);
        setResult(null);
        return;
      }
      if (!json.found || !json.request) {
        setStatus("empty");
        setResult(null);
        return;
      }
      setResult(json.request);
      setStatus("found");
    } catch {
      setStatus("error");
      setLookupError(request.errors.lookup);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-3 lg:grid-cols-2 lg:gap-5">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl bg-white p-3.5 shadow-sm sm:p-6"
      >
        <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-gold text-[#1a1205] sm:mb-3 sm:size-12">
          <Search className="size-4 sm:size-5" aria-hidden />
        </div>
        <h2 className="font-heading text-center text-base font-bold text-brand sm:text-xl">
          ابحث عن طلبك
        </h2>
        <p className="mt-1 text-center text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
          أدخل الاسم الرباعي ورقم الواتساب المسجّلين لدى المكتب لمتابعة الحالة. لا يُنشأ طلب جديد من الموقع.
        </p>

        <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
          <div>
            <Label htmlFor="fu-name">{request.fullNameLabel}</Label>
            <Input
              id="fu-name"
              name="fullName"
              placeholder={request.fullNamePlaceholder}
              className="mt-1.5"
              required
            />
            {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName}</p> : null}
          </div>
          <div>
            <Label htmlFor="fu-wa">{request.whatsappLabel}</Label>
            <Input
              id="fu-wa"
              name="whatsapp"
              placeholder={request.whatsappPlaceholder}
              className="mt-1.5"
              dir="ltr"
              required
            />
            {errors.whatsapp ? <p className="mt-1 text-xs text-red-600">{errors.whatsapp}</p> : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gold text-sm font-bold text-[#1a1205] hover:bg-[#d4af37] disabled:opacity-60"
        >
          {loading ? request.searching : "بحث عن الطلب"}
        </button>

        {lookupError ? <p className="mt-3 text-sm text-red-600">{lookupError}</p> : null}
        {status === "empty" ? (
          <div className="mt-3 space-y-3 rounded-lg border border-dashed border-gold/40 bg-gold/5 p-3 text-sm">
            <p className="font-medium text-brand">{request.empty}</p>
            <p className="text-muted-foreground">{request.emptyHint}</p>
            {inquiryWhatsAppUrl ? (
              <WhatsAppOpenLink
                href={inquiryWhatsAppUrl}
                label={request.emptyWhatsAppLabel}
                hint={request.emptyWhatsAppHint}
              />
            ) : null}
            <p className="text-xs text-muted-foreground" dir="ltr">
              هاتف المكتب: {phoneDisplay}
            </p>
          </div>
        ) : null}
        {status === "found" && result ? (
          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm">
            <p className="font-semibold text-emerald-900">{request.foundTitle}</p>
            <p className="mt-1 text-emerald-800">
              {request.statusLabel}: <strong>{result.status}</strong>
            </p>
            {result.ref ? (
              <p className="mt-1 text-emerald-800">
                {request.refLabel}: <span dir="ltr">{result.ref}</span>
              </p>
            ) : null}
            <p className="mt-1 text-emerald-800">
              {request.dateLabel}: {formatDate(result.at)}
            </p>
          </div>
        ) : null}
      </form>

      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-heading text-lg font-bold text-brand sm:text-xl">
          مراحل معالجة الطلب
        </h2>
        <ol className="relative mt-5 space-y-0 pe-1">
          {STAGES.map((label, index) => {
            const done = index < activeStep;
            const current = index === activeStep;
            const pending = index > activeStep;
            return (
              <li key={label} className="relative flex gap-3 pb-5 last:pb-0">
                {index < STAGES.length - 1 ? (
                  <span
                    className={cn(
                      "absolute start-[0.85rem] top-7 bottom-0 w-0.5",
                      done || current ? "bg-sky-500" : "bg-neutral-200"
                    )}
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-[1] mt-0.5 shrink-0">
                  {done || current ? (
                    <CheckCircle2
                      className={cn("size-7", done ? "text-emerald-500" : "text-sky-500")}
                      aria-hidden
                    />
                  ) : (
                    <Circle className="size-7 text-neutral-300" aria-hidden />
                  )}
                </span>
                <div>
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      pending ? "text-muted-foreground" : current ? "text-sky-600" : "text-brand"
                    )}
                  >
                    {label}
                  </p>
                  {result && (done || current) ? (
                    <p className="mt-0.5 text-xs text-muted-foreground">{formatDate(result.at)}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
