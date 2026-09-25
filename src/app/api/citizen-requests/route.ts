import { NextResponse } from "next/server";
import { findOfficeRequest } from "@/lib/office-store";
import {
  normalizeIraqiWhatsApp,
  normalizeWhitespace,
  validateFourPartArabicName,
} from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Public follow-up lookup only.
 * Does not create requests. Does not list all stored items.
 */
export async function POST(request: Request) {
  let body: { fullName?: string; whatsapp?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "طلب غير صالح" }, { status: 400 });
  }

  const fullName = normalizeWhitespace(String(body.fullName ?? ""));
  const whatsappRaw = String(body.whatsapp ?? "");

  if (validateFourPartArabicName(fullName)) {
    return NextResponse.json({ ok: false, error: "الاسم الرباعي غير صالح" }, { status: 400 });
  }
  const whatsapp = normalizeIraqiWhatsApp(whatsappRaw);
  if (!whatsapp) {
    return NextResponse.json({ ok: false, error: "رقم الواتساب غير صالح" }, { status: 400 });
  }

  const match = await findOfficeRequest({ fullName, whatsapp });
  if (!match) {
    return NextResponse.json({
      ok: true,
      found: false,
      message: "لا يوجد طلب مسجل بهذا الاسم/الرقم",
    });
  }

  return NextResponse.json({
    ok: true,
    found: true,
    request: {
      fullName: match.fullName,
      whatsapp: match.whatsapp,
      subject: match.subject,
      status: match.status,
      ref: match.ref,
      at: match.at,
    },
  });
}
