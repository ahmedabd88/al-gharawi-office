import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { getEncryptionKey } from "@/lib/office-auth";
import type { CitizenRequestRecord } from "@/lib/requests-table";

export type StoredCitizenRequest = CitizenRequestRecord & {
  id: string;
};

type StoreFile = {
  version: 1;
  updatedAt: string;
  items: StoredCitizenRequest[];
};

const MEMORY_KEY = "__al_gharawi_office_requests__";

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
      const payload = await readFile(file, "utf8");
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
      await writeFile(file, payload, "utf8");
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
    memoryStore().items = fromDisk.items;
    memoryStore().updatedAt = fromDisk.updatedAt;
    return [...fromDisk.items];
  }
  return [...memoryStore().items];
}

export async function appendOfficeRequest(
  input: Omit<CitizenRequestRecord, "at"> & { at?: string }
): Promise<StoredCitizenRequest> {
  const current = (await readFromDisk()) ?? memoryStore();
  const entry: StoredCitizenRequest = {
    id: randomBytes(8).toString("hex"),
    fullName: input.fullName,
    whatsapp: input.whatsapp,
    subject: input.subject ?? null,
    at: input.at ?? new Date().toISOString(),
  };
  const next: StoreFile = {
    version: 1,
    updatedAt: new Date().toISOString(),
    items: [entry, ...current.items].slice(0, 500),
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
