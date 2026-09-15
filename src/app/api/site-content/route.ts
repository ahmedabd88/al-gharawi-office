import { NextResponse } from "next/server";
import { getSiteContentSnapshot } from "@/lib/site-content-store";

export const runtime = "nodejs";

/** Public read of resolved site texts (no secrets). */
export async function GET() {
  const snapshot = await getSiteContentSnapshot();
  const { publishNote: _hidden, ...publicFields } = snapshot;
  return NextResponse.json({
    ok: true,
    content: publicFields,
    updatedAt: snapshot.updatedAt,
  });
}
