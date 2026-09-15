import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { getEncryptionKey } from "@/lib/office-auth";
import {
  mergeEditableContent,
  toSiteContentSnapshot,
  type EditableSiteContent,
  type SiteContentSnapshot,
} from "@/lib/site-content";

type StoreFile = {
  version: 1;
  updatedAt: string;
  content: EditableSiteContent;
};

const MEMORY_KEY = "__al_gharawi_site_content__";

type GlobalStore = typeof globalThis & {
  [MEMORY_KEY]?: StoreFile;
};

function memoryStore(): StoreFile | null {
  return (globalThis as GlobalStore)[MEMORY_KEY] ?? null;
}

function setMemory(data: StoreFile) {
  (globalThis as GlobalStore)[MEMORY_KEY] = data;
}

function candidatePaths(): string[] {
  return [
    path.join(process.cwd(), "data", "site-content.enc"),
    path.join(os.tmpdir(), "al-gharawi-site-content.enc"),
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
    if (!parsed?.content || typeof parsed.content !== "object") return null;
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
      // try next
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

export async function loadEditableSiteContent(): Promise<{
  content: EditableSiteContent;
  updatedAt: string | null;
}> {
  const fromDisk = await readFromDisk();
  if (fromDisk) {
    setMemory(fromDisk);
    return {
      content: mergeEditableContent(fromDisk.content),
      updatedAt: fromDisk.updatedAt,
    };
  }
  const mem = memoryStore();
  if (mem) {
    return { content: mergeEditableContent(mem.content), updatedAt: mem.updatedAt };
  }
  return { content: mergeEditableContent(null), updatedAt: null };
}

export async function getSiteContentSnapshot(): Promise<SiteContentSnapshot> {
  const { content, updatedAt } = await loadEditableSiteContent();
  return toSiteContentSnapshot(content, updatedAt);
}

export async function saveEditableSiteContent(
  content: EditableSiteContent
): Promise<SiteContentSnapshot> {
  const next: StoreFile = {
    version: 1,
    updatedAt: new Date().toISOString(),
    content: mergeEditableContent(content),
  };
  setMemory(next);
  await writeToDisk(next);
  return toSiteContentSnapshot(next.content, next.updatedAt);
}
