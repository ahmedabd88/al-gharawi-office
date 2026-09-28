"use client";

import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ExternalLink,
  FileText,
  LogOut,
  MessageSquareText,
  RefreshCw,
  Save,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  OfficeCitizenRequestsTable,
  type OfficeCitizenRequestRow,
} from "@/components/office-citizen-requests-table";
import { OfficeTransactionsPanel } from "@/components/office-transactions-panel";
import { OfficeRegisterRequestForm } from "@/components/office-register-request-form";
import {
  editableSiteDefaults,
  siteContentFieldLabels,
  type EditableSiteContent,
} from "@/lib/site-content";
import {
  citizenToTransaction,
  type OfficeTransaction,
  type TransactionTab,
} from "@/lib/office-transactions";
import { office } from "@/lib/content";
import { cn } from "@/lib/utils";

type Section = "content" | "requests" | "notes";

const sections: { id: Section; label: string; icon: typeof FileText }[] = [
  { id: "content", label: "المحتوى", icon: FileText },
  { id: "requests", label: "الطلبات", icon: MessageSquareText },
  { id: "notes", label: "ملاحظات النشر", icon: ShieldCheck },
];

function parseSection(raw: string | null): Section {
  if (raw === "requests" || raw === "notes" || raw === "content") return raw;
  return "content";
}

export function OfficeControlPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = parseSection(searchParams.get("section"));

  const [form, setForm] = useState<EditableSiteContent>(editableSiteDefaults);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

  const [citizenRows, setCitizenRows] = useState<OfficeCitizenRequestRow[]>([]);
  const [citizenTx, setCitizenTx] = useState<OfficeTransaction[]>([]);
  const [txTab, setTxTab] = useState<TransactionTab>("transactions");
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [requestsError, setRequestsError] = useState<string | null>(null);

  const setSection = useCallback(
    (next: Section) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("section", next);
      router.replace(`/office?${params.toString()}`);
    },
    [router, searchParams]
  );

  const loadContent = useCallback(async () => {
    setContentLoading(true);
    setContentError(null);
    try {
      const res = await fetch("/api/office/content", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/office-login?next=/office");
        return;
      }
      const data = (await res.json()) as {
        ok?: boolean;
        content?: EditableSiteContent;
        updatedAt?: string | null;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.content) {
        setContentError(data.error || "تعذر تحميل المحتوى");
        return;
      }
      setForm(data.content);
      setUpdatedAt(data.updatedAt ?? null);
    } catch {
      setContentError("تعذر الاتصال بالخادم");
    } finally {
      setContentLoading(false);
    }
  }, [router]);

  const loadRequests = useCallback(async () => {
    setRequestsLoading(true);
    setRequestsError(null);
    try {
      const res = await fetch("/api/office/requests", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/office-login?next=/office?section=requests");
        return;
      }
      const data = (await res.json()) as {
        ok?: boolean;
        items?: OfficeCitizenRequestRow[];
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setRequestsError(data.error || "تعذر تحميل الطلبات");
        setCitizenRows([]);
        setCitizenTx([]);
        return;
      }
      const items = data.items ?? [];
      // Newest first for the applicants table
      const newestFirst = [...items].reverse();
      setCitizenRows(newestFirst);
      setCitizenTx(
        items.map((row, index) =>
          citizenToTransaction(
            {
              ...row,
              status: row.status ?? undefined,
            },
            index
          )
        )
      );
    } catch {
      setRequestsError("تعذر الاتصال بالخادم");
    } finally {
      setRequestsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadContent();
    void loadRequests();
  }, [loadContent, loadRequests]);

  useEffect(() => {
    if (section === "requests") void loadRequests();
  }, [section, loadRequests]);

  async function onSave(event?: FormEvent) {
    event?.preventDefault();
    setSaving(true);
    setSaveMessage(null);
    setContentError(null);
    try {
      const res = await fetch("/api/office/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: form }),
      });
      if (res.status === 401) {
        router.replace("/office-login?next=/office");
        return;
      }
      const data = (await res.json()) as {
        ok?: boolean;
        content?: EditableSiteContent;
        updatedAt?: string | null;
        message?: string;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setContentError(data.error || "تعذر الحفظ");
        return;
      }
      if (data.content) setForm(data.content);
      setUpdatedAt(data.updatedAt ?? null);
      setSaveMessage(data.message || "تم حفظ التغييرات");
      router.refresh();
    } catch {
      setContentError("تعذر الاتصال بالخادم");
    } finally {
      setSaving(false);
    }
  }

  async function onLogout() {
    await fetch("/api/office/logout", { method: "POST" });
    router.replace("/office-login");
    router.refresh();
  }

  const updatedLabel = useMemo(() => {
    if (!updatedAt) return "لم يُحفظ بعد — تُعرض القيم الافتراضية";
    try {
      return `آخر حفظ: ${new Date(updatedAt).toLocaleString("ar-IQ")}`;
    } catch {
      return `آخر حفظ: ${updatedAt}`;
    }
  }, [updatedAt]);

  function field(
    key: keyof EditableSiteContent,
    opts?: { multiline?: boolean; dir?: "ltr" | "rtl" }
  ) {
    const common = {
      id: key,
      value: form[key],
      onChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
      className: "min-h-11 text-base md:text-sm",
      dir: opts?.dir,
    };
    return (
      <div className="space-y-2" key={key}>
        <Label htmlFor={key}>{siteContentFieldLabels[key]}</Label>
        {opts?.multiline ? (
          <Textarea {...common} rows={4} className="min-h-24 text-base md:text-sm" />
        ) : (
          <Input {...common} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#f4f1ea] text-[#111]" dir="rtl">
      <header className="border-b border-[#222]/10 bg-[#0a0a0a] text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs tracking-wide text-gold">منطقة خاصة · مشفّرة</p>
            <h1 className="mt-1 font-heading text-2xl font-bold sm:text-3xl">لوحة التحكم</h1>
            <p className="mt-1 text-sm text-white/65">{office.brand}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              render={<Link href="/" target="_blank" />}
              nativeButton={false}
              variant="outline"
              className="h-11 rounded-md border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="size-4" aria-hidden />
              معاينة الموقع
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-md border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={() => void onLogout()}
            >
              <LogOut className="size-4" aria-hidden />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <nav
          className="mb-6 flex flex-wrap gap-1 rounded-xl border border-[#222]/10 bg-white p-1.5 shadow-sm"
          aria-label="أقسام لوحة التحكم"
        >
          {sections.map((item) => {
            const active = section === item.id;
            const Icon = item.icon;
            const count =
              item.id === "requests" && citizenRows.length > 0 ? citizenRows.length : null;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-bold transition-colors sm:flex-none sm:min-w-[8.5rem] sm:px-5",
                  active
                    ? item.id === "requests"
                      ? "bg-gold text-[#1a1205] shadow-sm"
                      : "bg-[#111] text-white"
                    : "text-[#444] hover:bg-[#f0ece3]",
                  item.id === "requests" && !active && "ring-1 ring-gold/35"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-4" aria-hidden />
                {item.label}
                {count !== null ? (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-bold",
                      active ? "bg-[#1a1205]/15" : "bg-gold/20 text-[#1a1205]"
                    )}
                  >
                    {count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {section === "content" ? (
          <section className="rounded-xl border border-[#222]/10 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-heading text-xl font-bold">تعديل محتوى الموقع</h2>
                <p className="mt-1 text-sm text-[#666]">{updatedLabel}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-md"
                onClick={() => void loadContent()}
                disabled={contentLoading}
              >
                <RefreshCw className="size-4" aria-hidden />
                إعادة التحميل
              </Button>
            </div>

            {contentLoading ? <p className="text-sm text-[#555]">جاري التحميل…</p> : null}
            {contentError ? (
              <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                {contentError}
              </p>
            ) : null}
            {saveMessage ? (
              <p className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900" role="status">
                {saveMessage}
              </p>
            ) : null}

            <p className="mb-5 rounded-lg border border-gold/35 bg-gold/10 px-3 py-2.5 text-sm leading-6 text-[#1a1205]">
              لتسجيل طلبات المواطنين ورؤية{" "}
              <button
                type="button"
                className="font-bold text-[#111] underline underline-offset-2"
                onClick={() => setSection("requests")}
              >
                جدول مقدّمي الطلبات
              </button>{" "}
              افتح تبويب <strong>الطلبات</strong> أعلاه (داخل هذه اللوحة فقط — ليس للموقع العام).
            </p>

            <form onSubmit={(e) => void onSave(e)} className="space-y-5">
              {field("heroSupport", { multiline: true })}
              {field("heroPrimaryCta")}
              {field("contactLead", { multiline: true })}
              {field("phoneDisplay", { dir: "ltr" })}
              <div className="space-y-1">
                {field("deputyPhoneDisplay", { dir: "ltr" })}
                <p className="text-xs leading-5 text-[#777]">
                  يظهر للزوار فقط إذا وضعت رقماً. اتركه فارغاً الآن إن لم يكن جاهزاً. واتساب الموقع يبقى على رقم
                  المكتب.
                </p>
              </div>
              {field("hours")}
              {field("address")}
              {field("facebookUrl", { dir: "ltr" })}

              <div className="flex flex-wrap gap-3 border-t border-[#222]/10 pt-5">
                <Button
                  type="submit"
                  size="lg"
                  disabled={saving || contentLoading}
                  className="h-12 rounded-md bg-[#111] px-8 text-white hover:bg-black"
                >
                  <Save className="size-4" aria-hidden />
                  {saving ? "جاري الحفظ…" : "حفظ التغييرات"}
                </Button>
                <Button
                  render={<Link href="/" target="_blank" />}
                  nativeButton={false}
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-md"
                >
                  معاينة بعد الحفظ
                </Button>
              </div>
            </form>
          </section>
        ) : null}

        {section === "requests" ? (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-gold/35 bg-white px-4 py-4 shadow-sm">
              <div>
                <h2 className="font-heading text-xl font-bold sm:text-2xl">الطلبات — مقدّمو الطلبات</h2>
                <p className="mt-1 text-sm leading-6 text-[#555]">
                  هذا الجدول داخل لوحة المكتب فقط. سجّل الطلب أدناه ثم راقب الاسم والواتساب والحالة هنا.
                  المواطن يتابع من صفحة «متابعة الطلب» في الموقع العام.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-md border-gold/40"
                onClick={() => void loadRequests()}
                disabled={requestsLoading}
              >
                <RefreshCw className="size-4" aria-hidden />
                تحديث الجدول
              </Button>
            </div>

            <OfficeRegisterRequestForm
              onRegistered={() => void loadRequests()}
              onUnauthorized={() => router.replace("/office-login?next=/office?section=requests")}
            />

            {requestsError ? (
              <p
                className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                role="alert"
              >
                {requestsError}
              </p>
            ) : null}

            <OfficeCitizenRequestsTable
              rows={citizenRows}
              loading={requestsLoading}
              onChanged={() => void loadRequests()}
              onUnauthorized={() =>
                router.replace("/office-login?next=/office?section=requests")
              }
            />

            <details className="rounded-xl border border-[#222]/10 bg-white open:shadow-sm">
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#444]">
                معاملات المكتب الإضافية (اختياري — كتب صادرة/واردة)
              </summary>
              <div className="border-t border-[#222]/10 p-3 sm:p-4">
                <OfficeTransactionsPanel
                  citizenTx={citizenTx}
                  activeTab={txTab}
                  onTabChange={setTxTab}
                />
              </div>
            </details>
          </section>
        ) : null}

        {section === "notes" ? (
          <section className="rounded-xl border border-[#222]/10 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="font-heading text-xl font-bold">ملاحظات النشر والحالة</h2>
            <p className="mt-2 text-sm leading-7 text-[#555]">
              هذه الملاحظات خاصة بك فقط — لا تظهر في الموقع العام. استخدمها لتذكير نفسك بما نُشر أو ما ينتظر المراجعة.
            </p>
            <form
              onSubmit={(e) => void onSave(e)}
              className="mt-5 space-y-5"
            >
              {field("publishNote", { multiline: true })}
              <Button
                type="submit"
                size="lg"
                disabled={saving}
                className="h-12 rounded-md bg-[#111] px-8 text-white hover:bg-black"
              >
                <Save className="size-4" aria-hidden />
                {saving ? "جاري الحفظ…" : "حفظ الملاحظة"}
              </Button>
              {saveMessage ? (
                <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900" role="status">
                  {saveMessage}
                </p>
              ) : null}
            </form>
          </section>
        ) : null}
      </div>
    </div>
  );
}
