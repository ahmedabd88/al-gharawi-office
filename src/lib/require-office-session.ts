import { cookies } from "next/headers";
import { OFFICE_SESSION_COOKIE, verifyOfficeSessionToken } from "@/lib/office-session";

export async function hasOfficeSession(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(OFFICE_SESSION_COOKIE)?.value;
  return verifyOfficeSessionToken(token);
}
