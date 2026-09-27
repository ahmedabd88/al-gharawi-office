/**
 * Editable site fields controlled from لوحة التحكم.
 * Defaults mirror src/lib/content.ts; overrides persist encrypted on disk.
 */

import { contact, hero } from "@/lib/content";

export type EditableSiteContent = {
  heroSupport: string;
  heroPrimaryCta: string;
  contactLead: string;
  /** رقم مكتب النائب — يظهر دائماً ويُستخدم لواتساب الموقع */
  phoneDisplay: string;
  /** رقم النائب الشخصي — اختياري؛ يظهر للعامة فقط إن وُضع */
  deputyPhoneDisplay: string;
  hours: string;
  address: string;
  facebookUrl: string;
  /** Internal note for Ahmed — not shown on the public site */
  publishNote: string;
};

export type SiteContentSnapshot = EditableSiteContent & {
  updatedAt: string | null;
  phoneTel: string;
  phoneRaw: string;
  whatsappE164: string;
  /** مشتق من deputyPhoneDisplay؛ فارغ إذا لم يُضبط رقم شخصي */
  deputyPhoneTel: string;
  addressLabel: string;
  mapsUrl: string;
  mapsLabel: string;
  mapsHint: string;
  officePhoneLabel: string;
  deputyPhoneLabel: string;
};

export const editableSiteDefaults: EditableSiteContent = {
  heroSupport: hero.support,
  heroPrimaryCta: hero.primaryCta,
  contactLead: contact.lead,
  phoneDisplay: contact.phoneDisplay,
  deputyPhoneDisplay: "",
  hours: contact.hours,
  address: contact.address,
  facebookUrl: contact.facebookUrl,
  publishNote: "",
};

export const siteContentFieldLabels: Record<keyof EditableSiteContent, string> = {
  heroSupport: "نص الترحيب تحت اسم المكتب (الرئيسية)",
  heroPrimaryCta: "نص زر متابعة الطلب",
  contactLead: "مقدمة صفحة التواصل",
  phoneDisplay: "رقم المكتب / واتساب (مثل 07762084894)",
  deputyPhoneDisplay: "رقم النائب الشخصي (اختياري — فارغ الآن)",
  hours: "أوقات الاستقبال",
  address: "عنوان المكتب",
  facebookUrl: "رابط فيسبوك",
  publishNote: "ملاحظات داخلية (لا تظهر للزوار)",
};

/** Normalize Iraqi display number → tel / E.164 / raw. Falls back to office default if empty. */
export function derivePhoneFields(phoneDisplay: string): {
  phoneDisplay: string;
  phoneRaw: string;
  phoneTel: string;
  whatsappE164: string;
} {
  const digits = phoneDisplay.replace(/\D/g, "");
  let local = digits;
  if (digits.startsWith("964") && digits.length >= 12) {
    local = `0${digits.slice(3)}`;
  } else if (digits.startsWith("0") && digits.length >= 10) {
    local = digits;
  } else if (digits.length === 10) {
    local = `0${digits}`;
  }
  const display = local || phoneDisplay.trim() || contact.phoneDisplay;
  const raw = display.replace(/\D/g, "") || contact.phoneRaw;
  const national = raw.startsWith("0") ? raw.slice(1) : raw;
  return {
    phoneDisplay: display,
    phoneRaw: raw.startsWith("0") ? raw : `0${national}`,
    phoneTel: `+964${national}`,
    whatsappE164: `964${national}`,
  };
}

/** Optional personal number — empty string means hidden on the public site. */
export function deriveOptionalPhoneFields(input: string): {
  deputyPhoneDisplay: string;
  deputyPhoneTel: string;
} {
  const digits = input.replace(/\D/g, "");
  if (!digits) {
    return { deputyPhoneDisplay: "", deputyPhoneTel: "" };
  }
  let local = digits;
  if (digits.startsWith("964") && digits.length >= 12) {
    local = `0${digits.slice(3)}`;
  } else if (digits.startsWith("0") && digits.length >= 10) {
    local = digits;
  } else if (digits.length === 10) {
    local = `0${digits}`;
  } else {
    return { deputyPhoneDisplay: "", deputyPhoneTel: "" };
  }
  const national = local.startsWith("0") ? local.slice(1) : local;
  if (national.length < 9) {
    return { deputyPhoneDisplay: "", deputyPhoneTel: "" };
  }
  return {
    deputyPhoneDisplay: local,
    deputyPhoneTel: `+964${national}`,
  };
}

export function mergeEditableContent(
  overrides: Partial<EditableSiteContent> | null | undefined
): EditableSiteContent {
  return {
    ...editableSiteDefaults,
    ...Object.fromEntries(
      Object.entries(overrides ?? {}).filter(([, v]) => typeof v === "string")
    ),
  } as EditableSiteContent;
}

export function toSiteContentSnapshot(
  editable: EditableSiteContent,
  updatedAt: string | null
): SiteContentSnapshot {
  const phones = derivePhoneFields(editable.phoneDisplay);
  const deputy = deriveOptionalPhoneFields(editable.deputyPhoneDisplay);
  return {
    ...editable,
    ...phones,
    deputyPhoneDisplay: deputy.deputyPhoneDisplay,
    deputyPhoneTel: deputy.deputyPhoneTel,
    addressLabel: contact.addressLabel,
    mapsUrl: contact.mapsUrl,
    mapsLabel: contact.mapsLabel,
    mapsHint: contact.mapsHint,
    officePhoneLabel: contact.officePhoneLabel,
    deputyPhoneLabel: contact.deputyPhoneLabel,
    updatedAt,
  };
}

export function sanitizeEditablePayload(input: unknown): EditableSiteContent | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const next: EditableSiteContent = { ...editableSiteDefaults };
  for (const key of Object.keys(editableSiteDefaults) as (keyof EditableSiteContent)[]) {
    if (typeof raw[key] === "string") {
      next[key] = raw[key].trim();
    }
  }
  if (!next.phoneDisplay || !next.address || !next.heroSupport) return null;
  return next;
}
