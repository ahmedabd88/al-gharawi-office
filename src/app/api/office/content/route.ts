import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { OFFICE_SESSION_COOKIE, verifyOfficeSessionToken } from "@/lib/office-session";
import { sanitizeEditablePayload } from "@/lib/site-content";
import {
  getSiteContentSnapshot,
  loadEditableSiteContent,
  saveEditableSiteContent,
} from "@/lib/site-content-store";

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
  const { content, updatedAt } = await loadEditableSiteContent();
  const snapshot = await getSiteContentSnapshot();
  return NextResponse.json({ ok: true, content, updatedAt, snapshot });
}

export async function PUT(request: Request) {
  if (!(await requireOfficeSession())) {
    return NextResponse.json({ ok: false, error: "غير مصرّح" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "طلب غير صالح" }, { status: 400 });
  }
  const payload = (body as { content?: unknown })?.content ?? body;
  const content = sanitizeEditablePayload(payload);
  if (!content) {
    return NextResponse.json(
      { ok: false, error: "تحقق من الحقول المطلوبة (النص، الهاتف، العنوان)" },
      { status: 400 }
    );
  }
  const snapshot = await saveEditableSiteContent(content);
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/request");
  revalidatePath("/about");
  revalidatePath("/services");
  return NextResponse.json({
    ok: true,
    content,
    updatedAt: snapshot.updatedAt,
    snapshot,
    message: "تم حفظ التغييرات بنجاح",
  });
}
