/** Validation helpers for citizen requests (Arabic four-part name + Iraqi mobile). */

const ARABIC_NAME_PART =
  /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/u;

export function normalizeWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function validateFourPartArabicName(value: string): string | null {
  const normalized = normalizeWhitespace(value);
  if (!normalized) return "required";

  const parts = normalized.split(" ");
  if (parts.length !== 4) return "nameParts";
  if (!parts.every((part) => ARABIC_NAME_PART.test(part) && part.length >= 2)) {
    return "nameArabic";
  }
  return null;
}

/** Accept 07XXXXXXXXX or +9647XXXXXXXXX / 9647XXXXXXXXX */
export function normalizeIraqiWhatsApp(value: string): string | null {
  const digits = value.replace(/[^\d+]/g, "").replace(/^\+/, "");
  let local = digits;

  if (local.startsWith("964")) {
    local = `0${local.slice(3)}`;
  }

  if (!/^07[3-9]\d{8}$/.test(local)) {
    return null;
  }

  return local;
}

export function toWhatsAppE164(localIraqMobile: string): string {
  return `964${localIraqMobile.slice(1)}`;
}

export function buildCitizenWhatsAppMessage(input: {
  fullName: string;
  whatsapp: string;
  subject?: string;
}): string {
  const lines = [
    "طلب مواطن عبر موقع المكتب",
    `الاسم الرباعي: ${input.fullName}`,
    `رقم الواتساب: ${input.whatsapp}`,
  ];
  if (input.subject?.trim()) {
    lines.push(`موضوع الطلب: ${normalizeWhitespace(input.subject)}`);
  }
  lines.push("أرجو المتابعة مشكورين.");
  return lines.join("\n");
}
