"use client";

import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CitizenRequestStatus } from "@/lib/requests-table";
import { cn } from "@/lib/utils";

export type OfficeCitizenRequestRow = {
  id?: string;
  fullName: string;
  whatsapp: string;
  subject?: string | null;
  status?: CitizenRequestStatus | string | null;
  ref?: string | null;
  at: string;
};

const STATUSES: CitizenRequestStatus[] = [
  "جديدة",
  "قيد المتابعة",
  "تم استلام الرد",
  "مكتملة",
  "ملغاة",
];

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
  } catch {
    return iso;
  }
}

const statusClass: Record<string, string> = {
  جديدة: "bg-sky-100 text-sky-900",
  "قيد المتابعة": "bg-amber-100 text-amber-950",
  "تم استلام الرد": "bg-violet-100 text-violet-950",
  مكتملة: "bg-emerald-100 text-emerald-900",
  ملغاة: "bg-rose-100 text-rose-900",
};

type Props = {
  rows: OfficeCitizenRequestRow[];
  loading?: boolean;
  onChanged: () => Promise<void> | void;
  onUnauthorized: () => void;
};

/**
 * Applicants table with inline edit + delete (office panel only).
 */
export function OfficeCitizenRequestsTable({
  rows,
  loading,
  onChanged,
  onUnauthorized,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({
    fullName: "",
    whatsapp: "",
    subject: "",
    status: "قيد المتابعة" as CitizenRequestStatus,
    ref: "",
  });
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function startEdit(row: OfficeCitizenRequestRow) {
    if (!row.id) {
      setError("لا يمكن تعديل هذا الصف — بلا معرّف. احذفه وسجّله من جديد إن لزم.");
      return;
    }
    setError(null);
    setMessage(null);
    setEditingId(row.id);
    setDraft({
      fullName: row.fullName,
      whatsapp: row.whatsapp,
      subject: row.subject?.trim() || "",
      status: (STATUSES.includes(row.status as CitizenRequestStatus)
        ? row.status
        : "قيد المتابعة") as CitizenRequestStatus,
      ref: row.ref?.trim() || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setError(null);
  }

  async function saveEdit() {
    if (!editingId) return;
    setBusyId(editingId);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/office/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...draft }),
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "تعذر حفظ التعديل");
        return;
      }
      setEditingId(null);
      setMessage("تم حفظ التعديل.");
      await onChanged();
    } catch {
      setError("تعذر الاتصال بالخادم");
    } finally {
      setBusyId(null);
    }
  }

  async function removeRow(row: OfficeCitizenRequestRow) {
    if (!row.id) {
      setError("لا يمكن حذف هذا الصف — بلا معرّف.");
      return;
    }
    const ok = window.confirm(
      `حذف طلب «${row.fullName}»؟\nلن يظهر للمواطن في متابعة الطلب بعد الحذف.`
    );
    if (!ok) return;

    setBusyId(row.id);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/office/requests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id }),
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "تعذر حذف الطلب");
        return;
      }
      if (editingId === row.id) setEditingId(null);
      setMessage("تم حذف الطلب.");
      await onChanged();
    } catch {
      setError("تعذر الاتصال بالخادم");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section
      className="overflow-hidden rounded-xl border-2 border-gold/40 bg-white shadow-sm"
      aria-labelledby="citizen-requests-heading"
    >
      <div className="border-b border-gold/30 bg-[#111] px-4 py-3 text-white sm:px-5">
        <h3 id="citizen-requests-heading" className="font-heading text-lg font-bold sm:text-xl">
          جدول مقدّمي الطلبات
        </h3>
        <p className="mt-1 text-sm text-white/70">
          عدّل أو احذف صفاً إذا صار خطأ في البيانات — الحفظ فوري في مخزن المكتب.
        </p>
      </div>

      {error ? (
        <p className="border-b border-destructive/20 bg-destructive/10 px-4 py-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="border-b border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-900" role="status">
          {message}
        </p>
      ) : null}

      {editingId ? (
        <div className="space-y-3 border-b border-[#222]/10 bg-[#faf8f3] px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-brand">تعديل الطلب</p>
            <Button type="button" variant="ghost" size="sm" onClick={cancelEdit} className="h-9">
              <X className="size-4" aria-hidden />
              إلغاء
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="edit-fullName">الاسم الرباعي</Label>
              <Input
                id="edit-fullName"
                value={draft.fullName}
                onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))}
                className="min-h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-whatsapp">واتساب</Label>
              <Input
                id="edit-whatsapp"
                value={draft.whatsapp}
                onChange={(e) => setDraft((d) => ({ ...d, whatsapp: e.target.value }))}
                dir="ltr"
                className="min-h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-ref">مرجع</Label>
              <Input
                id="edit-ref"
                value={draft.ref}
                onChange={(e) => setDraft((d) => ({ ...d, ref: e.target.value }))}
                dir="ltr"
                className="min-h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-subject">الموضوع</Label>
              <Input
                id="edit-subject"
                value={draft.subject}
                onChange={(e) => setDraft((d) => ({ ...d, subject: e.target.value }))}
                className="min-h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-status">الحالة</Label>
              <select
                id="edit-status"
                value={draft.status}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, status: e.target.value as CitizenRequestStatus }))
                }
                className="border-input bg-background flex h-11 w-full rounded-md border px-3 text-sm"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button
            type="button"
            className="h-11 rounded-md bg-[#111] text-white hover:bg-black"
            disabled={busyId === editingId}
            onClick={() => void saveEdit()}
          >
            {busyId === editingId ? "جاري الحفظ…" : "حفظ التعديل"}
          </Button>
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm" dir="rtl">
          <thead>
            <tr className="bg-[#faf8f3] text-right">
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">ت</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">الاسم الرباعي</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">واتساب</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">الموضوع</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">الحالة</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">التاريخ</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">مرجع</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[#666]">
                  جاري تحميل الطلبات…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[#555]">
                  <p className="text-base font-semibold text-brand">لا توجد طلبات بعد</p>
                  <p className="mt-2 text-sm text-[#666]">
                    سجّل طلباً من النموذج أعلاه ليظهر هنا ويمكن للمواطن متابعته من الموقع.
                  </p>
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                const status = row.status?.trim() || "قيد المتابعة";
                const rowBusy = Boolean(row.id && busyId === row.id);
                return (
                  <tr
                    key={row.id ?? `${row.whatsapp}-${row.at}`}
                    className={cn(
                      "border-b border-[#222]/8",
                      editingId && row.id === editingId && "bg-gold/10"
                    )}
                  >
                    <td className="px-3 py-3 text-[#777]" dir="ltr">
                      {index + 1}
                    </td>
                    <td className="px-3 py-3 font-medium">{row.fullName}</td>
                    <td className="px-3 py-3 unicode-isolate tabular-nums" dir="ltr">
                      {row.whatsapp}
                    </td>
                    <td className="px-3 py-3 text-[#444]">{row.subject?.trim() || "—"}</td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                          statusClass[status] ?? "bg-[#eee] text-[#333]"
                        )}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[#555]" dir="ltr">
                      {formatDate(row.at)}
                    </td>
                    <td className="px-3 py-3 text-[#555]">{row.ref?.trim() || "—"}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-9 border-gold/40"
                          disabled={rowBusy || !row.id}
                          onClick={() => startEdit(row)}
                        >
                          <Pencil className="size-3.5" aria-hidden />
                          تعديل
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-9 border-rose-300 text-rose-700 hover:bg-rose-50"
                          disabled={rowBusy || !row.id}
                          onClick={() => void removeRow(row)}
                        >
                          <Trash2 className="size-3.5" aria-hidden />
                          حذف
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
