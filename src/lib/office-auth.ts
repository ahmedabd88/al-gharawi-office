import { scryptSync, timingSafeEqual } from "node:crypto";
import { getSessionSecret } from "@/lib/office-session";

/** Dev-only fallback — override via OFFICE_ADMIN_PASSWORD on Vercel. */
const DEV_PASSWORD = "ahmed-office-2026";

export function getOfficePassword(): string {
  return process.env.OFFICE_ADMIN_PASSWORD?.trim() || DEV_PASSWORD;
}

export function isUsingDevAuthFallback(): boolean {
  return !process.env.OFFICE_ADMIN_PASSWORD?.trim() || !process.env.OFFICE_SESSION_SECRET?.trim();
}

export function verifyOfficePassword(input: string): boolean {
  const expected = getOfficePassword();
  const a = Buffer.from(input.normalize("NFKC"));
  const b = Buffer.from(expected.normalize("NFKC"));
  if (a.length !== b.length) {
    timingSafeEqual(Buffer.alloc(32), Buffer.alloc(32));
    return false;
  }
  return timingSafeEqual(a, b);
}

/** Derive a 32-byte AES key from the session secret (for at-rest encryption). */
export function getEncryptionKey(): Buffer {
  return scryptSync(getSessionSecret(), "al-gharawi-office-requests-v1", 32);
}
