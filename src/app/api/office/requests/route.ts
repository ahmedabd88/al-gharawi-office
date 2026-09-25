import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  appendOfficeRequest,
  clearOfficeRequests,
  listOfficeRequests,
} from "@/lib/office-store";
import type { CitizenRequestStatus } from "@/lib/requests-table";
import { OFFICE_SESSION_COOKIE, verifyOfficeSessionToken } from "@/lib/office-session";
import {
  normalizeIraqiWhatsApp,
  normalizeWhitespace,
  validateFourPartArabicName,
} from "@/lib/validation";

export const runtime = "nodejs";

const ALLOWED_STATUS: CitizenRequestStatus[] = [
  "جديدة",
  "قيد المتابعة",
  "تم استلام الرد",
  "مكتملة",
  "ملغاة",
];

async function requireOfficeSession() {
  const jar = await cookies();
  const token = jar.get(OFFICE_SESSION_COOKIE)?.value;
  return verifyOfficeSessionToken(token);
}

export async function GET() {
  if (!(await requireOfficeSession())) {
    return NextResponse.json({ ok: false, error: "غير مصرّح" }, { status: 401 });
  }
  const items = await listOfficeRequests();
  return NextResponse.json({ ok: true, items });
}

/** Office-only: register a citizen request for later public follow-up. */
export async function POST(request: Request) {
  if (!(await requireOfficeSession())) {
    return NextResponse.json({ ok: false, error: "غير مصرّح" }, { status: 401 });
  }

  let body: {
    fullName?: string;
    whatsapp?: string;
    subject?: string;
    status?: string;
    ref?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "طلب غير صالح" }, { status: 400 });
  }

  const fullName = normalizeWhitespace(String(body.fullName ?? ""));
  const whatsapp = normalizeIraqiWhatsApp(String(body.whatsapp ?? ""));
  if (validateFourPartArabicName(fullName) || !whatsapp) {
    return NextResponse.json(
      { ok: false, error: "الاسم الرباعي ورقم الواتساب مطلوبان وبصيغة صحيحة" },
      { status: 400 }
    );
  }

  const status = ALLOWED_STATUS.includes(body.status as CitizenRequestStatus)
    ? (body.status as CitizenRequestStatus)
    : "قيد المتابعة";

  const entry = await appendOfficeRequest({
    fullName,
    whatsapp,
    subject: normalizeWhitespace(String(body.subject ?? "")) || null,
    status,
    ref: normalizeWhitespace(String(body.ref ?? "")) || null,
  });

  return NextResponse.json({ ok: true, item: entry });
}

export async function DELETE() {
  if (!(await requireOfficeSession())) {
    return NextResponse.json({ ok: false, error: "غير مصرّح" }, { status: 401 });
  }
  await clearOfficeRequests();
  return NextResponse.json({ ok: true });
}
