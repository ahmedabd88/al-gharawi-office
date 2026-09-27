"use client";

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

/**
 * Clear applicants table for لوحة التحكم — name, WhatsApp, status, date, details.
 */
export function OfficeCitizenRequestsTable({
  rows,
  loading,
}: {
  rows: OfficeCitizenRequestRow[];
  loading?: boolean;
}) {
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
          الأسماء وأرقام الواتساب المسجّلة من المكتب — للمتابعة على الموقع العام.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm" dir="rtl">
          <thead>
            <tr className="bg-[#faf8f3] text-right">
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">ت</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">الاسم الرباعي</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">واتساب</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">الموضوع</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">الحالة</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">التاريخ</th>
              <th className="border-b border-[#222]/10 px-3 py-3 font-semibold">مرجع</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[#666]">
                  جاري تحميل الطلبات…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[#555]">
                  <p className="text-base font-semibold text-brand">لا توجد طلبات بعد</p>
                  <p className="mt-2 text-sm text-[#666]">
                    سجّل طلباً من النموذج أعلاه ليظهر هنا ويمكن للمواطن متابعته من الموقع.
                  </p>
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                const status = row.status?.trim() || "قيد المتابعة";
                return (
                  <tr key={row.id ?? `${row.whatsapp}-${row.at}`} className="border-b border-[#222]/8">
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
