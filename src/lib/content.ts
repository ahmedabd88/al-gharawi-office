/**
 * Site content for مكتب النائب سالم سوادي الغراوي.
 *
 * Public election/committee facts + office-provided contact/branding.
 * Remaining unknowns stay marked as awaiting confirmation.
 */

export const office = {
  brand: "مكتب النائب سالم سوادي الغراوي",
  shortBrand: "مكتب النائب",
  mediaOffice: "المكتب الإعلامي",
  representative: "سالم سوادي الغراوي",
  fullName: "سالم سوادي خصاف حسين الغراوي",
  role: "نائب في مجلس النواب العراقي",
  bloc: "الكتلة الصدرية",
  district: "بغداد الكرخ — الدائرة الانتخابية 17",
  electionYear: "2021",
  electionListNote: "ورد اسمه ضمن قائمة الكتلة الصدرية في نتائج انتخابات 2021",
  committeeNote:
    "ورد اسمه ضمن أعضاء اللجنة القانونية النيابية في بيان رسمي بتاريخ 30 آذار 2022",
  bannerSrc: "/images/banner-official.jpg",
  bannerAlt: "بانر المكتب الإعلامي للنائب سالم سوادي الغراوي",
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
  note: "تفاصيل السيرة الشخصية الإضافية (الدراسة والمناصب السابقة) بانتظار تزويد المكتب بها.",
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
        "توضيح آليات تقديم الطلبات ومواعيد الاستقبال عبر قنوات المكتب المعتمدة.",
    },
  ],
} as const;

export const contact = {
  title: "تواصل معنا",
  lead: "تواصل هاتفياً أو أرسل رسالتك عبر النموذج. العنوان والبريد بانتظار تأكيد إضافي من المكتب.",
  phoneDisplay: "0776 208 4894",
  phoneTel: "+9647762084894",
  phoneRaw: "07762084894",
  hours: "كل يوم جمعة الساعة 8 مساءً",
  placeholders: {
    email: "البريد الإلكتروني — يُحدَّث لاحقاً",
    address: "عنوان المكتب — يُحدَّث لاحقاً",
  },
  form: {
    name: "الاسم الكامل",
    phone: "رقم الهاتف",
    subject: "موضوع الطلب",
    message: "تفاصيل الرسالة",
    submit: "إرسال الرسالة",
    success: "تم استلام رسالتك محلياً. يمكنك أيضاً الاتصال مباشرة على رقم المكتب.",
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
