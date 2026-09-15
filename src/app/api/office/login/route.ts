import { NextResponse } from "next/server";
import { isUsingDevAuthFallback, verifyOfficePassword } from "@/lib/office-auth";
import {
  createOfficeSessionToken,
  OFFICE_SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/office-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "طلب غير صالح" }, { status: 400 });
  }

  if (!verifyOfficePassword(password)) {
    return NextResponse.json({ ok: false, error: "كلمة المرور غير صحيحة" }, { status: 401 });
  }

  const token = createOfficeSessionToken();
  const response = NextResponse.json({
    ok: true,
    usingDevFallback: isUsingDevAuthFallback(),
  });
  response.cookies.set(OFFICE_SESSION_COOKIE, token, sessionCookieOptions());
  return response;
}
