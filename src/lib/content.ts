/**
 * Site content for مكتب النائب سالم سوادي الغراوي.
 *
 * Verified public facts are marked clearly. Contact details and personal
 * biography beyond election records are NOT invented — placeholders await
 * office confirmation.
 */

export const office = {
  brand: "مكتب النائب سالم سوادي الغراوي",
  shortBrand: "مكتب النائب",
  representative: "سالم سوادي الغراوي",
  fullName: "سالم سوادي خصاف حسين الغراوي",
  role: "نائب في مجلس النواب العراقي",
  district: "بغداد الكرخ — الدائرة الانتخابية 17",
  electionYear: "2021",
  electionListNote: "ورد اسمه ضمن قائمة الكتلة الصدرية في نتائج انتخابات 2021",
  committeeNote:
    "ورد اسمه ضمن أعضاء اللجنة القانونية النيابية في بيان رسمي بتاريخ 30 آذار 2022",
} as const;

export const hero = {
  headline: "صوت دائرتكم في مجلس النواب",
  support:
    "متابعة طلبات المواطنين والتنسيق مع الجهات الرسمية لخدمة أهل بغداد الكرخ.",
  primaryCta: "تواصل مع المكتب",
  secondaryCta: "خدمات المكتب",
} as const;

export const about = {
  title: "عن المكتب",
  lead: "مكتب نيابي يخدم أبناء الدائرة ويستقبل طلباتهم بوضوح واحترام.",
  paragraphs: [
    `${office.fullName} نائب عراقي عن ${office.district} وفق نتائج انتخابات مجلس النواب لعام ${office.electionYear}.`,
    office.electionListNote + ".",
    office.committeeNote + ".",
  ],
  note: "تفاصيل السيرة الشخصية الإضافية (الدراسة، المناصب السابقة، الصورة الرسمية) بانتظار تزويد المكتب بها.",
} as const;

export const services = {
  title: "خدمات المكتب",
  lead: "قنوات واضحة لمساعدة المواطنين في المتابعة والطلب.",
  items: [
    {
      title: "استقبال الطلبات",
      description:
        "تسجيل طلبات المواطنين ومتابعة مسارها داخل المكتب حتى إحالتها للجهة المختصة.",
    },
    {
      title: "المتابعة الخدمية",
      description:
        "التنسيق بشأن المعاملات المتعلقة بالخدمات البلدية والإدارية ضمن صلاحيات المتابعة النيابية.",
    },
    {
      title: "التواصل الرسمي",
      description:
        "إيصال ملاحظات الدائرة إلى الجهات الحكومية المعنية ومتابعة الردود.",
    },
    {
      title: "الاستفسارات العامة",
      description:
        "توضيح آليات تقديم الطلبات ومواعيد الاستقبال بعد اعتماد بيانات التواصل النهائية.",
    },
  ],
} as const;

export const contact = {
  title: "تواصل معنا",
  lead: "أرسل رسالتك عبر النموذج أدناه. بيانات الهاتف والعنوان بانتظار تأكيد المكتب.",
  placeholders: {
    phone: "رقم الهاتف — يُحدَّث لاحقاً",
    email: "البريد الإلكتروني — يُحدَّث لاحقاً",
    address: "عنوان المكتب — يُحدَّث لاحقاً",
    hours: "أوقات الاستقبال — تُحدَّث لاحقاً",
  },
  form: {
    name: "الاسم الكامل",
    phone: "رقم الهاتف",
    subject: "موضوع الطلب",
    message: "تفاصيل الرسالة",
    submit: "إرسال الرسالة",
    success: "تم استلام رسالتك محلياً. سيتم ربط الإرسال بقنوات المكتب بعد اعتماد بيانات التواصل.",
    required: "يرجى تعبئة الحقول المطلوبة.",
  },
} as const;

export const nav = [
  { href: "#about", label: "عن المكتب" },
  { href: "#services", label: "الخدمات" },
  { href: "#contact", label: "تواصل" },
] as const;

export const sources = [
  {
    label: "وكالة أنباء الإعلام العراقي — أسماء الفائزين بانتخابات 2021",
    href: "https://al-iraqinews.com/archives/215578",
  },
  {
    label: "بيان أعضاء اللجنة القانونية النيابية — آذار 2022",
    href: "https://www.alamssar.com/185562",
  },
] as const;
