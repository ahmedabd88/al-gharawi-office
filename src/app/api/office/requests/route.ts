import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  appendOfficeRequest,
  clearOfficeRequests,
  deleteOfficeRequest,
  listOfficeRequests,
  updateOfficeRequest,
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

function parseStatus(raw: unknown): CitizenRequestStatus {
  return ALLOWED_STATUS.includes(raw as CitizenRequestStatus)
    ? (raw as CitizenRequestStatus)
    : "قيد المتابعة";
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

  const entry = await appendOfficeRequest({
    fullName,
    whatsapp,
    subject: normalizeWhitespace(String(body.subject ?? "")) || null,
    status: parseStatus(body.status),
    ref: normalizeWhitespace(String(body.ref ?? "")) || null,
  });

  return NextResponse.json({ ok: true, item: entry });
}

/** Office-only: edit one stored request by id. */
export async function PATCH(request: Request) {
  if (!(await requireOfficeSession())) {
    return NextResponse.json({ ok: false, error: "غير مصرّح" }, { status: 401 });
  }

  let body: {
    id?: string;
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

  const id = String(body.id ?? "").trim();
  if (!id) {
    return NextResponse.json({ ok: false, error: "معرّف الطلب مطلوب" }, { status: 400 });
  }

  const fullName = normalizeWhitespace(String(body.fullName ?? ""));
  const whatsapp = normalizeIraqiWhatsApp(String(body.whatsapp ?? ""));
  if (validateFourPartArabicName(fullName) || !whatsapp) {
    return NextResponse.json(
      { ok: false, error: "الاسم الرباعي ورقم الواتساب مطلوبان وبصيغة صحيحة" },
      { status: 400 }
    );
  }

  const updated = await updateOfficeRequest(id, {
    fullName,
    whatsapp,
    subject: normalizeWhitespace(String(body.subject ?? "")) || null,
    status: parseStatus(body.status),
    ref: normalizeWhitespace(String(body.ref ?? "")) || null,
  });

  if (!updated) {
    return NextResponse.json({ ok: false, error: "الطلب غير موجود" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item: updated });
}

/**
 * Office-only delete:
 * - body `{ id }` → delete one row
 * - no id → clear all (legacy / requests-table)
 */
export async function DELETE(request: Request) {
  if (!(await requireOfficeSession())) {
    return NextResponse.json({ ok: false, error: "غير مصرّح" }, { status: 401 });
  }

  let id = "";
  try {
    const body = (await request.json()) as { id?: string };
    id = String(body?.id ?? "").trim();
  } catch {
    // empty body = clear all
  }

  if (id) {
    const ok = await deleteOfficeRequest(id);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "الطلب غير موجود" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  }

  await clearOfficeRequests();
  return NextResponse.json({ ok: true });
}
