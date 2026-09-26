/**
 * Site content for مكتب النائب سالم سوادي الغراوي.
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
  bannerSrc: "/images/hero-final-baghdad.png",
  mobileBannerSrc: "/images/hero-final-mobile.png",
  parliamentSealSrc: "/images/parliament-seal.png",
  bannerAlt: "بانر مكتب النائب سالم سوادي الغراوي — بغداد، العلم، الشعار، والصورة الرسمية، وخط التيار الوطني الشيعي",
  slogan: "خدمة المواطن .. مسؤوليتنا",
  currentName: "التيار الوطني الشعبي",
  fistLogoSrc: "/images/current-fist-logo.png",
  pageHeroSrc: "/images/page-hero-inner.png",
} as const;

/** Mobile homepage quick links (2×2), matching the final mobile reference. */
export const mobileQuickLinks = [
  {
    href: "/request",
    title: "متابعة الطلب",
    subtitle: "مؤشرات الطلبات وخدمات المواطنين",
    icon: "followup" as const,
  },
  {
    href: "/services",
    title: "الخدمات",
    subtitle: "جميع الخدمات المتاحة",
    icon: "services" as const,
  },
  {
    href: "/contact",
    title: "تواصل معنا",
    subtitle: "مباشرة مع مكتب النائب",
    icon: "contact" as const,
  },
  {
    href: "/about",
    title: "عن المكتب",
    subtitle: "نبذة عن المكتب وبرامجه",
    icon: "about" as const,
  },
] as const;

export const hero = {
  support:
    "متابعة طلبات المواطنين والتنسيق مع الجهات الرسمية لخدمة أهلنا في العراق الحبيب.",
  primaryCta: "متابعة الطلب",
  secondaryCta: "اتصل بالمكتب",
} as const;

export const about = {
  title: "عن المكتب",
  lead: "مكتب نيابي يخدم أبناء الوطن ويستقبلهم بوضوح واهتمام.",
  introTitle: "نبذة عن المكتب",
  paragraphs: [
    "يعمل مكتب النائب سالم سوادي الغراوي على خدمة أبناء الوطن واستقبالهم ومتابعة احتياجاتهم ومتطلباتهم لدى الجهات الحكومية المختصة.",
    "نسعى إلى تعزيز التواصل المباشر مع المواطنين، والاستماع إلى آرائهم ومقترحاتهم، والعمل على معالجة احتياجات المجتمع ضمن الأطر القانونية والدستورية.",
    `نولي اهتماماً خاصاً بمتابعة المشاريع الخدمية والتنموية في ${office.district}، والتنسيق مع الوزارات والجهات المعنية لخدمة المواطنين.`,
  ],
  note: "تفاصيل السيرة الشخصية الإضافية (الدراسة والمناصب السابقة) بانتظار تزويد المكتب بها.",
  goalsTitle: "أهداف المكتب",
  goals: [
    { title: "الشفافية والنزاهة", icon: "shield" as const },
    { title: "تعزيز التواصل", icon: "chat" as const },
    { title: "متابعة المشاريع", icon: "chart" as const },
    { title: "الخدمة المجتمعية", icon: "community" as const },
  ],
  facts: [
    { label: "الجهة الرسمية", value: "مكتب النائب سالم سوادي الغراوي", icon: "building" as const },
    { label: "الدائرة الانتخابية", value: office.district, icon: "map" as const },
    { label: "الكتلة", value: office.bloc, icon: "users" as const },
    {
      label: "الدورة النيابية",
      value: `مجلس النواب العراقي ${office.electionYear}`,
      icon: "calendar" as const,
    },
  ],
} as const;

export const services = {
  title: "خدمات المكتب",
  lead: "قنوات واضحة لمساعدة أهلنا في متابعة احتياجاتهم وتقديم الطلبات.",
  items: [
    {
      title: "استقبال الطلبات",
      description:
        "تسجيل طلبات المواطنين ومتابعة مسارها داخل المكتب حتى إحالتها للجهة المختصة.",
      cta: "متابعة الطلب",
      href: "/request",
      accent: true,
      icon: "file" as const,
    },
    {
      title: "المتابعة الخدمية",
      description:
        "التنسيق بشأن المعاملات المتعلقة بالخدمات البلدية والإدارية ضمن صلاحيات المتابعة النيابية.",
      cta: "عرض التفاصيل",
      href: "/contact",
      accent: false,
      icon: "gear" as const,
    },
    {
      title: "التواصل الرسمي",
      description:
        "إيصال ملاحظات المواطنين إلى الجهات الحكومية المعنية ومتابعة الردود.",
      cta: "تواصل معنا",
      href: "/contact",
      accent: false,
      icon: "phone" as const,
    },
    {
      title: "الاستفسارات العامة",
      description:
        "توضيح آليات تقديم الطلبات ومواعيد الاستقبال عبر قنوات المكتب المعتمدة.",
      cta: "طرح استفسار",
      href: "/contact",
      accent: false,
      icon: "chat" as const,
    },
  ],
  areasTitle: "مجالات الخدمة",
  areas: [
    { title: "الخدمات البلدية", icon: "building" as const },
    { title: "الخدمات الصحية", icon: "heart" as const },
    { title: "الخدمات التعليمية", icon: "grad" as const },
    { title: "الشؤون الاجتماعية", icon: "users" as const },
    { title: "البنية التحتية", icon: "road" as const },
    { title: "الرعاية البيئية", icon: "leaf" as const },
    { title: "المياه والكهرباء", icon: "bolt" as const },
  ],
} as const;

export const request = {
  title: "متابعة الطلب",
  lead: "أدخل اسمك الرباعي ورقم واتسابك المسجّلين لدى المكتب للاطلاع على حالة طلبك. لا يُنشأ طلب جديد من الموقع.",
  howItWorks: [
    "اكتب اسمك الرباعي بالعربية كما سُجّل لدى المكتب (أربعة أسماء).",
    "أدخل رقم واتسابك العراقي المسجّل (مثل 07701234567).",
    "اضغط «متابعة الطلب» لعرض حالة المعاملة إن وُجدت.",
    "إن لم يظهر طلب، راجع المكتب — الموقع لا يسجّل طلبات جديدة للعموم.",
  ],
  fullNameLabel: "الاسم الرباعي",
  fullNameHint: "أدخل أربعة أسماء بالعربية (مثال: أحمد محمد علي حسن)",
  fullNamePlaceholder: "الاسم الأول الثاني الثالث الرابع",
  whatsappLabel: "رقم الواتساب",
  whatsappHint: "رقم عراقي يبدأ بـ 07 ويتكون من 11 رقماً (يُقبل أيضاً الأرقام العربية ٠١٢٣…)",
  whatsappPlaceholder: "07XXXXXXXXX",
  subjectLabel: "موضوع الطلب (اختياري)",
  subjectPlaceholder: "مثال: متابعة معاملة خدمية",
  submit: "متابعة الطلب",
  searching: "جاري البحث…",
  foundTitle: "حالة طلبك",
  empty: "لا يوجد طلب مسجل بهذا الاسم/الرقم",
  emptyHint:
    "تأكد من الاسم ورقم الواتساب كما سُجّلا لدى المكتب. أو أرسل استفساراً عبر واتساب ليراجعه المكتب ويسجّل الطلب إن لزم.",
  emptyWhatsAppLabel: "إرسال استفسار عبر واتساب",
  emptyWhatsAppHint:
    "يفتح واتساب برسالة جاهزة فيها اسمك ورقمك — أكمل الإرسال من التطبيق ليظهر للمكتب.",
  statusLabel: "الحالة",
  refLabel: "الرقم المرجعي",
  subjectResultLabel: "الموضوع",
  dateLabel: "تاريخ التسجيل",
  popupHint:
    "هذه الصفحة لمتابعة طلب مسجّل مسبقاً لدى المكتب فقط — لا تُنشئ طلباً جديداً ولا تفتح واتساب لتقديم معاملة.",
  deviceTips: {
    mobile: "على الموبايل: أدخل البيانات ثم اضغط متابعة الطلب.",
    desktop: "على الكمبيوتر: أدخل البيانات ثم اضغط متابعة الطلب.",
  },
  success:
    "تم تجهيز الرسالة. أكمل الإرسال من داخل واتساب بعد فتح المحادثة.",
  successBlocked:
    "المتصفح منع فتح نافذة جديدة. اضغط الزر الأخضر أدناه لفتح واتساب (يعمل على الموبايل والكمبيوتر).",
  openManual: "فتح واتساب الآن بالرسالة الجاهزة",
  errors: {
    required: "يرجى تعبئة الاسم الرباعي ورقم الواتساب.",
    nameParts: "يرجى إدخال الاسم الرباعي كاملاً (أربعة أسماء).",
    nameArabic: "الاسم يجب أن يكون بالعربية فقط.",
    whatsapp: "رقم الواتساب غير صحيح. استخدم صيغة عراقية مثل 07701234567.",
    lookup: "تعذر التحقق من الطلب. حاول مرة أخرى.",
  },
} as const;

export const contact = {
  title: "تواصل معنا",
  lead: "تواصل هاتفياً أو عبر واتساب أو فيسبوك، أو زر المكتب في بغداد، المحمودية، حي البتول.",
  phoneDisplay: "07762084894",
  phoneTel: "+9647762084894",
  phoneRaw: "07762084894",
  whatsappE164: "9647762084894",
  hours: "كل يوم جمعة الساعة 8 مساءً",
  facebookUrl: "https://www.facebook.com/profile.php?id=100050600824425",
  facebookLabel: "صفحة فيسبوك",
  /** العنوان الفعلي للمكتب (ليس الدائرة الانتخابية) */
  address: "بغداد، المحمودية، حي البتول",
  addressLabel: "عنوان المكتب",
  mapsUrl: "https://maps.app.goo.gl/3LDaD8PGAYgF8VZj7?g_st=ic",
  mapsLabel: "افتح موقع المكتب على الخريطة",
  mapsHint: "موقع المكتب على الخريطة",
  placeholders: {
    email: "البريد الإلكتروني — يُحدَّث لاحقاً",
  },
  form: {
    name: "الاسم الكامل",
    phone: "رقم الهاتف (اختياري)",
    subject: "موضوع الطلب (اختياري)",
    message: "تفاصيل الرسالة",
    submit: "فتح واتساب لإرسال الرسالة",
    success: "تم تجهيز الرسالة. أكمل الإرسال من داخل واتساب بعد فتح المحادثة.",
    successBlocked:
      "المتصفح منع فتح نافذة جديدة. اضغط الزر الأخضر أدناه لفتح واتساب (موبايل وكمبيوتر).",
    openManual: "فتح واتساب الآن بالرسالة الجاهزة",
    hint: "يعمل من الموبايل والكمبيوتر. بعد الضغط تُفتح واتساب برسالة جاهزة — ثم أكّد الإرسال من التطبيق. إذا لم تُفتح استخدم الزر الأخضر.",
    required: "يرجى تعبئة الاسم وتفاصيل الرسالة.",
  },
} as const;

export const nav = [
  { href: "/", label: "الصفحة الرئيسية" },
  { href: "/about", label: "عن المكتب" },
  { href: "/services", label: "الخدمات" },
  { href: "/request", label: "متابعة الطلب" },
  { href: "/contact", label: "تواصل معنا" },
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
