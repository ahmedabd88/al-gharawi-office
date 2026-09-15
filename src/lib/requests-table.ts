/** Official office «جدول طلبات» model + sample rows + localStorage bridge. */

export const REQUESTS_STORAGE_KEY = "citizen-requests";

export type CitizenRequestRecord = {
  fullName: string;
  whatsapp: string;
  subject?: string | null;
  at: string;
};

export type OfficialRequestRow = {
  id: string;
  /** رقم وتاريخ الكتاب */
  letterRef: string;
  /** الموضوع */
  subject: string;
  /** محتوى الموضوع */
  content: string;
  /** الهاتف */
  phone: string;
  /** توجيه سيادتكم — يُترك للمكتب عند الطباعة */
  directive: string;
  source: "sample" | "citizen";
  createdAt: string;
};

export const requestsTableCopy = {
  pageTitle: "جدول الطلبات",
  addressee: "السيد الوكيل الأقدم لوزارة الداخلية",
  documentTitle: "جدول طلبات",
  officeLine: "مكتب النائب سالم سوادي الغراوي",
  dateLabel: "التاريخ",
  columns: [
    { key: "seq", label: "ت", width: "4%" },
    { key: "letterRef", label: "رقم وتاريخ الكتاب", width: "16%" },
    { key: "subject", label: "الموضوع", width: "16%" },
    { key: "content", label: "محتوى الموضوع", width: "28%" },
    { key: "phone", label: "الهاتف", width: "14%" },
    { key: "directive", label: "توجيه سيادتكم", width: "22%" },
  ] as const,
  empty: "لا توجد طلبات محفوظة بعد. يمكنك إظهار صفوف تجريبية للطباعة والتدريب.",
  showSamples: "إظهار صفوف تجريبية",
  hideSamples: "إخفاء الصفوف التجريبية",
  print: "طباعة الجدول",
  refresh: "تحديث من الطلبات المحفوظة",
  clearCitizen: "مسح الطلبات المحفوظة على هذا الجهاز",
  citizenNote:
    "الطلبات الواردة من صفحة «قدّم طلباً» تُحفظ على هذا الجهاز فقط (بدون خادم) وتظهر في الجدول أدناه لطباعتها رسمياً.",
  printHint: "استخدم الطباعة الأفقية (Landscape) للحصول على أفضل مواءمة للأعمدة.",
} as const;

/** Format a Date as D/M/YYYY for Iraqi office docs */
export function formatOfficeDate(date: Date = new Date()): string {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function formatLetterRef(seq: number, date: Date): string {
  return `م.ن/${String(seq).padStart(3, "0")} في ${formatOfficeDate(date)}`;
}

export const sampleOfficialRows: OfficialRequestRow[] = [
  {
    id: "sample-1",
    letterRef: "م.ن/001 في 10/9/2026",
    subject: "متابعة معاملة خدمية",
    content: "طلب المواطن أحمد محمد علي حسن متابعة معاملة خدمات بلدية في المحمودية.",
    phone: "07701234567",
    directive: "",
    source: "sample",
    createdAt: "2026-09-10T10:00:00.000Z",
  },
  {
    id: "sample-2",
    letterRef: "م.ن/002 في 12/9/2026",
    subject: "استفسار إداري",
    content: "طلب المواطن حسين كاظم جاسم عبيد الاستفسار عن مسار معاملة إدارية لدى الوزارة.",
    phone: "07801234567",
    directive: "",
    source: "sample",
    createdAt: "2026-09-12T12:00:00.000Z",
  },
  {
    id: "sample-3",
    letterRef: "م.ن/003 في 14/9/2026",
    subject: "طلب مساعدة",
    content: "طلب المواطنة فاطمة حسن علي كريم المساعدة في متابعة ملف يتعلق بالأحوال المدنية.",
    phone: "07771234567",
    directive: "",
    source: "sample",
    createdAt: "2026-09-14T09:30:00.000Z",
  },
];

export function citizenToOfficialRow(
  record: CitizenRequestRecord,
  index: number
): OfficialRequestRow {
  const created = record.at ? new Date(record.at) : new Date();
  const safeDate = Number.isNaN(created.getTime()) ? new Date() : created;
  const subject = record.subject?.trim() || "طلب مواطن";
  return {
    id: `citizen-${record.at}-${index}`,
    letterRef: formatLetterRef(index + 1, safeDate),
    subject,
    content: `طلب المواطن ${record.fullName}${
      record.subject?.trim() ? ` بخصوص: ${record.subject.trim()}` : ""
    }.`,
    phone: record.whatsapp,
    directive: "",
    source: "citizen",
    createdAt: record.at,
  };
}

export function readCitizenRequests(): CitizenRequestRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(REQUESTS_STORAGE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(raw)) return [];
    return raw.filter((item): item is CitizenRequestRecord => {
      if (!item || typeof item !== "object") return false;
      const row = item as CitizenRequestRecord;
      return typeof row.fullName === "string" && typeof row.whatsapp === "string";
    });
  } catch {
    return [];
  }
}
