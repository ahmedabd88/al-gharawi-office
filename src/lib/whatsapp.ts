/** Open a WhatsApp chat URL reliably across desktop/mobile browsers. */

export type WhatsAppOpenResult = "opened" | "navigated" | "blocked";

/**
 * Mobile: same-tab navigation (most reliable for wa.me / WhatsApp app).
 * Desktop: try a new tab; if blocked, caller should show the manual link.
 */
export function openWhatsAppUrl(url: string): WhatsAppOpenResult {
  if (typeof window === "undefined") return "navigated";

  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (mobile) {
    window.location.assign(url);
    return "navigated";
  }

  try {
    // Do not pass "noopener" in windowFeatures — that forces a null return and
    // prevents detecting a blocked popup. Clear opener after open instead.
    const popup = window.open(url, "_blank");
    if (popup) {
      try {
        popup.opener = null;
      } catch {
        // ignore cross-origin opener assignment failures
      }
      return "opened";
    }
  } catch {
    // fall through
  }

  // Popup blocked: leave page in place so the manual <a> fallback is usable.
  return "blocked";
}

export function buildWhatsAppUrl(e164WithoutPlus: string, message: string): string {
  return `https://wa.me/${e164WithoutPlus}?text=${encodeURIComponent(message)}`;
}
