/**
 * Editable site fields controlled from لوحة التحكم.
 * Defaults mirror src/lib/content.ts; overrides persist encrypted on disk.
 */

import { contact, hero } from "@/lib/content";

export type EditableSiteContent = {
  heroSupport: string;
  heroPrimaryCta: string;
  contactLead: string;
  phoneDisplay: string;
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
  addressLabel: string;
};

export const editableSiteDefaults: EditableSiteContent = {
  heroSupport: hero.support,
  heroPrimaryCta: hero.primaryCta,
  contactLead: contact.lead,
  phoneDisplay: contact.phoneDisplay,
  hours: contact.hours,
  address: contact.address,
  facebookUrl: contact.facebookUrl,
  publishNote: "",
};

export const siteContentFieldLabels: Record<keyof EditableSiteContent, string> = {
  heroSupport: "نص الترحيب تحت اسم المكتب (الرئيسية)",
  heroPrimaryCta: "نص زر تعديل الطلب",
  contactLead: "مقدمة صفحة التواصل",
  phoneDisplay: "رقم الهاتف / واتساب (مثل 07762084894)",
  hours: "أوقات الاستقبال",
  address: "عنوان المكتب",
  facebookUrl: "رابط فيسبوك",
  publishNote: "ملاحظات داخلية (لا تظهر للزوار)",
};

/** Normalize Iraqi display number → tel / E.164 / raw. */
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
  return {
    ...editable,
    ...phones,
    addressLabel: contact.addressLabel,
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
