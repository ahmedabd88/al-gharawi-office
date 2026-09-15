import { NextResponse } from "next/server";
import { appendOfficeRequest } from "@/lib/office-store";
import {
  normalizeIraqiWhatsApp,
  normalizeWhitespace,
  validateFourPartArabicName,
} from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Public write-only endpoint used by the citizen WhatsApp form.
 * Does not expose stored requests to anonymous readers.
 */
export async function POST(request: Request) {
  let body: { fullName?: string; whatsapp?: string; subject?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "طلب غير صالح" }, { status: 400 });
  }

  const fullName = normalizeWhitespace(String(body.fullName ?? ""));
  const whatsappRaw = String(body.whatsapp ?? "");
  const subject = String(body.subject ?? "");

  if (validateFourPartArabicName(fullName)) {
    return NextResponse.json({ ok: false, error: "الاسم الرباعي غير صالح" }, { status: 400 });
  }
  const whatsapp = normalizeIraqiWhatsApp(whatsappRaw);
  if (!whatsapp) {
    return NextResponse.json({ ok: false, error: "رقم الواتساب غير صالح" }, { status: 400 });
  }

  const entry = await appendOfficeRequest({
    fullName,
    whatsapp,
    subject: normalizeWhitespace(subject) || null,
  });

  return NextResponse.json({ ok: true, id: entry.id });
}
