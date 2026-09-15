import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { clearOfficeRequests, listOfficeRequests } from "@/lib/office-store";
import { OFFICE_SESSION_COOKIE, verifyOfficeSessionToken } from "@/lib/office-session";

export const runtime = "nodejs";

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

export async function DELETE() {
  if (!(await requireOfficeSession())) {
    return NextResponse.json({ ok: false, error: "غير مصرّح" }, { status: 401 });
  }
  await clearOfficeRequests();
  return NextResponse.json({ ok: true });
}
