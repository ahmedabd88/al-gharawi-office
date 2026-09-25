/** Organized office «المعاملات» list model for the private workspace. */

export type TransactionStatus = "جديدة" | "تم استلام الرد" | "مكتملة" | "ملغاة";

export type TransactionTab = "transactions" | "outgoing" | "incoming";

export type OfficeTransaction = {
  id: string;
  number: string;
  title: string;
  authority: string;
  status: TransactionStatus;
  date: string;
  tab: TransactionTab;
};

export const transactionTabs: { id: TransactionTab; label: string }[] = [
  { id: "transactions", label: "المعاملات" },
  { id: "outgoing", label: "الكتب الصادرة" },
  { id: "incoming", label: "الكتب الواردة" },
];

export const transactionColumns = [
  { key: "number", label: "الرقم", width: "10%" },
  { key: "title", label: "عنوان الطلب", width: "34%" },
  { key: "authority", label: "الجهة", width: "20%" },
  { key: "status", label: "الحالة", width: "18%" },
  { key: "date", label: "التاريخ", width: "18%" },
] as const;

export const transactionStatusStyles: Record<TransactionStatus, string> = {
  جديدة: "bg-sky-100 text-sky-900 ring-1 ring-sky-200",
  "تم استلام الرد": "bg-amber-100 text-amber-950 ring-1 ring-amber-200",
  مكتملة: "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200",
  ملغاة: "bg-rose-100 text-rose-900 ring-1 ring-rose-200",
};

export const transactionCopy = {
  workspaceTitle: "إدارة المكتب",
  searchPlaceholder: "بحث بالعنوان أو الجهة أو الرقم…",
  filterAll: "كل الحالات",
  empty: "لا توجد معاملات في هذا القسم حالياً.",
  writingTab: "جدول الكتابة",
} as const;

/** Demo + structured sample rows matching the intended office UI. */
export const sampleTransactions: OfficeTransaction[] = [
  {
    id: "tx-1",
    number: "م-104",
    title: "متابعة معاملة خدمات بلدية — المحمودية",
    authority: "بلدية المحمودية",
    status: "جديدة",
    date: "15/9/2026",
    tab: "transactions",
  },
  {
    id: "tx-2",
    number: "م-103",
    title: "استفسار عن مسار معاملة إدارية",
    authority: "وزارة الداخلية",
    status: "تم استلام الرد",
    date: "14/9/2026",
    tab: "transactions",
  },
  {
    id: "tx-3",
    number: "م-102",
    title: "طلب مساعدة في ملف الأحوال المدنية",
    authority: "دائرة الأحوال المدنية",
    status: "مكتملة",
    date: "12/9/2026",
    tab: "transactions",
  },
  {
    id: "tx-4",
    number: "م-101",
    title: "طلب ملغى بناءً على رغبة المواطن",
    authority: "المكتب الإعلامي",
    status: "ملغاة",
    date: "10/9/2026",
    tab: "transactions",
  },
  {
    id: "out-1",
    number: "ص-221",
    title: "كتاب إحالة جدول طلبات إلى الوكيل الأقدم",
    authority: "وزارة الداخلية",
    status: "مكتملة",
    date: "13/9/2026",
    tab: "outgoing",
  },
  {
    id: "out-2",
    number: "ص-220",
    title: "كتاب متابعة معاملة خدمية",
    authority: "أمانة بغداد",
    status: "تم استلام الرد",
    date: "11/9/2026",
    tab: "outgoing",
  },
  {
    id: "in-1",
    number: "و-088",
    title: "رد بشأن معاملة خدمات بلدية",
    authority: "بلدية المحمودية",
    status: "جديدة",
    date: "15/9/2026",
    tab: "incoming",
  },
  {
    id: "in-2",
    number: "و-087",
    title: "إشعار باستلام كتاب الإحالة",
    authority: "وزارة الداخلية",
    status: "مكتملة",
    date: "14/9/2026",
    tab: "incoming",
  },
];

export function citizenToTransaction(
  record: {
    fullName: string;
    whatsapp: string;
    subject?: string | null;
    status?: string;
    at: string;
    id?: string;
  },
  index: number
): OfficeTransaction {
  const created = record.at ? new Date(record.at) : new Date();
  const safe = Number.isNaN(created.getTime()) ? new Date() : created;
  const date = `${safe.getDate()}/${safe.getMonth() + 1}/${safe.getFullYear()}`;
  const statusMap: Record<string, TransactionStatus> = {
    جديدة: "جديدة",
    "قيد المتابعة": "تم استلام الرد",
    "تم استلام الرد": "تم استلام الرد",
    مكتملة: "مكتملة",
    ملغاة: "ملغاة",
  };
  return {
    id: record.id ?? `citizen-tx-${index}`,
    number: `م-${String(100 + index).padStart(3, "0")}`,
    title: record.subject?.trim() || `طلب مواطن — ${record.fullName}`,
    authority: "مواطن عبر المكتب",
    status: statusMap[record.status ?? ""] ?? "جديدة",
    date,
    tab: "transactions",
  };
}
