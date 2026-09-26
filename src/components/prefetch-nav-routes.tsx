"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { heroNavItems } from "@/components/hero-pill-nav";

/**
 * Warm the App Router cache for public routes — especially `/` —
 * so returning home from inner pages feels instant.
 */
export function PrefetchNavRoutes() {
  const router = useRouter();

  useEffect(() => {
    const warm = () => {
      router.prefetch("/");
      for (const item of heroNavItems) {
        if (item.href !== "/") router.prefetch(item.href);
      }
    };

    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;

    if (typeof ric === "function") {
      const id = ric(warm, { timeout: 1200 });
      return () => {
        (
          window as Window & { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback?.(id);
      };
    }

    const t = globalThis.setTimeout(warm, 150);
    return () => globalThis.clearTimeout(t);
  }, [router]);

  return null;
}
