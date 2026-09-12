import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const dataDir = path.join(process.cwd(), "data");
const visitsFile = path.join(dataDir, "visits.json");

type VisitsData = {
  total: number;
};

async function readVisits(): Promise<VisitsData> {
  try {
    const raw = await readFile(visitsFile, "utf8");
    const parsed = JSON.parse(raw) as VisitsData;
    return { total: Number(parsed.total) || 0 };
  } catch {
    return { total: 0 };
  }
}

async function writeVisits(data: VisitsData) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(visitsFile, JSON.stringify(data, null, 2), "utf8");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shouldCount = searchParams.get("count") === "1";
  const data = await readVisits();

  if (shouldCount) {
    data.total += 1;
    await writeVisits(data);
  }

  return NextResponse.json({
    total: data.total,
    counted: shouldCount,
  });
}
