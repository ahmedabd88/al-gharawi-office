/** Official office «جدول طلبات» model + sample rows. */

export const REQUESTS_STORAGE_KEY = "citizen-requests";

export type CitizenRequestRecord = {
  fullName: string;
  whatsapp: string;
  subject?: string | null;
  at: string;
};

export type OfficialRequestRow = {
  id: string;
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
    { key: "seq", label: "ت", width: "5%" },
    { key: "subject", label: "الموضوع", width: "18%" },
    { key: "content", label: "محتوى الموضوع", width: "35%" },
    { key: "phone", label: "الهاتف", width: "16%" },
    { key: "directive", label: "توجيه سيادتكم", width: "26%" },
  ] as const,
  empty: "لا توجد طلبات محفوظة بعد. يمكنك إظهار صفوف تجريبية للطباعة والتدريب.",
  showSamples: "إظهار صفوف تجريبية",
  hideSamples: "إخفاء الصفوف التجريبية",
  print: "طباعة الجدول",
  refresh: "تحديث من الطلبات المحفوظة",
  clearCitizen: "مسح الطلبات المحفوظة على هذا الجهاز",
  citizenNote:
    "الطلبات الواردة من صفحة «تعديل الطلب» تُحفظ على الخادم وتظهر هنا بعد دخول المكتب لطباعتها رسمياً.",
  printHint: "استخدم الطباعة الأفقية (Landscape) للحصول على أفضل مواءمة للأعمدة.",
  docsPanelTitle: "قائمة الوثائق",
  hideDocsPanel: "إخفاء القائمة",
  showDocsPanel: "إظهار القائمة",
  docsColumns: {
    status: "الحالة",
    type: "النوع",
    title: "العنوان",
  },
} as const;

export type OfficeDocListItem = {
  id: string;
  status: "مسودة" | "صادر";
  type: string;
  title: string;
};

export const defaultOfficeDocs: OfficeDocListItem[] = [
  {
    id: "doc-requests-table",
    status: "مسودة",
    type: "جدول",
    title: "جدول طلبات",
  },
  {
    id: "doc-requests-issued",
    status: "صادر",
    type: "جدول",
    title: "جدول طلبات — نسخة سابقة",
  },
];

/** Format a Date as D/M/YYYY for Iraqi office docs */
export function formatOfficeDate(date: Date = new Date()): string {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export const sampleOfficialRows: OfficialRequestRow[] = [
  {
    id: "sample-1",
    subject: "متابعة معاملة خدمية",
    content: "طلب المواطن أحمد محمد علي حسن متابعة معاملة خدمات بلدية في المحمودية.",
    phone: "07701234567",
    directive: "",
    source: "sample",
    createdAt: "2026-09-10T10:00:00.000Z",
  },
  {
    id: "sample-2",
    subject: "استفسار إداري",
    content: "طلب المواطن حسين كاظم جاسم عبيد الاستفسار عن مسار معاملة إدارية لدى الوزارة.",
    phone: "07801234567",
    directive: "",
    source: "sample",
    createdAt: "2026-09-12T12:00:00.000Z",
  },
  {
    id: "sample-3",
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
  const subject = record.subject?.trim() || "طلب مواطن";
  return {
    id: `citizen-${record.at}-${index}`,
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
