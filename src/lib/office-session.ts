import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const OFFICE_SESSION_COOKIE = "office_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

const DEV_SECRET = "dev-office-session-secret-change-me";

export function getSessionSecret(): string {
  return process.env.OFFICE_SESSION_SECRET?.trim() || DEV_SECRET;
}

function sign(payloadB64: string): string {
  return createHmac("sha256", getSessionSecret()).update(payloadB64).digest("base64url");
}

export function createOfficeSessionToken(now = Date.now()): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: now + SESSION_TTL_MS, v: 1, nonce: randomBytes(8).toString("hex") }),
    "utf8"
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyOfficeSessionToken(token: string | undefined | null): boolean {
  if (!token || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
