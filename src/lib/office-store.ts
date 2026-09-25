import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { getEncryptionKey } from "@/lib/office-auth";
import type { CitizenRequestRecord, CitizenRequestStatus } from "@/lib/requests-table";
import { normalizeIraqiWhatsApp, normalizeWhitespace } from "@/lib/validation";

export type StoredCitizenRequest = CitizenRequestRecord & {
  id: string;
  status: CitizenRequestStatus;
};

type StoreFile = {
  version: 1;
  updatedAt: string;
  items: StoredCitizenRequest[];
};

const MEMORY_KEY = "__al_gharawi_office_requests__";
const DEFAULT_STATUS: CitizenRequestStatus = "قيد المتابعة";

type GlobalStore = typeof globalThis & {
  [MEMORY_KEY]?: StoreFile;
};

function memoryStore(): StoreFile {
  const g = globalThis as GlobalStore;
  if (!g[MEMORY_KEY]) {
    g[MEMORY_KEY] = { version: 1, updatedAt: new Date().toISOString(), items: [] };
  }
  return g[MEMORY_KEY]!;
}

function normalizeNameKey(value: string): string {
  return normalizeWhitespace(value).replace(/\s+/g, " ");
}

function normalizeStoredItem(item: StoredCitizenRequest): StoredCitizenRequest {
  return {
    ...item,
    status: item.status ?? DEFAULT_STATUS,
    ref: item.ref ?? null,
    subject: item.subject ?? null,
  };
}

function candidatePaths(): string[] {
  return [
    path.join(process.cwd(), "data", "office-requests.enc"),
    path.join(os.tmpdir(), "al-gharawi-office-requests.enc"),
  ];
}

function encryptJson(data: StoreFile): string {
  const key = getEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(data), "utf8");
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

function decryptJson(payload: string): StoreFile | null {
  try {
    const raw = Buffer.from(payload, "base64url");
    const iv = raw.subarray(0, 12);
    const tag = raw.subarray(12, 28);
    const encrypted = raw.subarray(28);
    const key = getEncryptionKey();
    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const parsed = JSON.parse(plaintext.toString("utf8")) as StoreFile;
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function readFromDisk(): Promise<StoreFile | null> {
  for (const file of candidatePaths()) {
    try {
      const payload = await readFile(/*turbopackIgnore: true*/ file, "utf8");
      const data = decryptJson(payload.trim());
      if (data) return data;
    } catch {
      // try next path
    }
  }
  return null;
}

async function writeToDisk(data: StoreFile): Promise<boolean> {
  const payload = encryptJson(data);
  for (const file of candidatePaths()) {
    try {
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(/*turbopackIgnore: true*/ file, payload, "utf8");
      return true;
    } catch {
      // try next
    }
  }
  return false;
}

export async function listOfficeRequests(): Promise<StoredCitizenRequest[]> {
  const fromDisk = await readFromDisk();
  if (fromDisk) {
    const items = fromDisk.items.map(normalizeStoredItem);
    memoryStore().items = items;
    memoryStore().updatedAt = fromDisk.updatedAt;
    return [...items];
  }
  return memoryStore().items.map(normalizeStoredItem);
}

/** Public follow-up lookup — returns one match or null; never creates. */
export async function findOfficeRequest(input: {
  fullName: string;
  whatsapp: string;
}): Promise<StoredCitizenRequest | null> {
  const nameKey = normalizeNameKey(input.fullName);
  const phone = normalizeIraqiWhatsApp(input.whatsapp) ?? input.whatsapp;
  const items = await listOfficeRequests();
  return (
    items.find(
      (row) =>
        normalizeNameKey(row.fullName) === nameKey &&
        (normalizeIraqiWhatsApp(row.whatsapp) ?? row.whatsapp) === phone
    ) ?? null
  );
}

export async function appendOfficeRequest(
  input: Omit<CitizenRequestRecord, "at"> & {
    at?: string;
    status?: CitizenRequestStatus;
    ref?: string | null;
  }
): Promise<StoredCitizenRequest> {
  const current = (await readFromDisk()) ?? memoryStore();
  const entry: StoredCitizenRequest = {
    id: randomBytes(8).toString("hex"),
    fullName: normalizeWhitespace(input.fullName),
    whatsapp: normalizeIraqiWhatsApp(input.whatsapp) ?? input.whatsapp,
    subject: input.subject ?? null,
    status: input.status ?? DEFAULT_STATUS,
    ref: input.ref?.trim() || null,
    at: input.at ?? new Date().toISOString(),
  };
  const next: StoreFile = {
    version: 1,
    updatedAt: new Date().toISOString(),
    items: [entry, ...current.items.map(normalizeStoredItem)].slice(0, 500),
  };
  memoryStore().items = next.items;
  memoryStore().updatedAt = next.updatedAt;
  await writeToDisk(next);
  return entry;
}

export async function clearOfficeRequests(): Promise<void> {
  const next: StoreFile = { version: 1, updatedAt: new Date().toISOString(), items: [] };
  memoryStore().items = [];
  memoryStore().updatedAt = next.updatedAt;
  await writeToDisk(next);
}
