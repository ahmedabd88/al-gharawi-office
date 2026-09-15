/** Open a WhatsApp chat URL reliably across mobile + desktop browsers. */

export type WhatsAppOpenResult = "opened" | "navigated" | "blocked";

export function isLikelyMobileBrowser(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const touchMac = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua) || touchMac;
}

/**
 * Reliable open strategy:
 * - Mobile (Safari/Chrome): same-tab navigation — popup tabs are unreliable with wa.me.
 * - Desktop: try a new tab inside the user gesture; if blocked, return "blocked"
 *   so the UI can show a large visible fallback link (never fail silently).
 */
export function openWhatsAppUrl(url: string): WhatsAppOpenResult {
  if (typeof window === "undefined") return "navigated";

  if (isLikelyMobileBrowser()) {
    window.location.assign(url);
    return "navigated";
  }

  try {
    // Keep this synchronous inside the submit click/submit handler.
    // Do not use the "noopener" windowFeatures flag — it makes open() return null.
    const popup = window.open(url, "_blank");
    if (popup && !popup.closed) {
      try {
        popup.opener = null;
      } catch {
        // ignore
      }
      // Focus helps some desktop browsers surface the tab
      try {
        popup.focus();
      } catch {
        // ignore
      }
      return "opened";
    }
  } catch {
    // fall through to blocked
  }

  return "blocked";
}

/** Force same-tab open (used by the visible fallback button). */
export function navigateWhatsAppSameTab(url: string): void {
  if (typeof window === "undefined") return;
  window.location.assign(url);
}

export function buildWhatsAppUrl(e164WithoutPlus: string, message: string): string {
  // wa.me is the official short link; works on iOS/Android/desktop WhatsApp Web.
  return `https://wa.me/${e164WithoutPlus}?text=${encodeURIComponent(message)}`;
}
