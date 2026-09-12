"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const SESSION_KEY = "al-gharawi-visit-counted";

export function VisitCounter() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const alreadyCounted = sessionStorage.getItem(SESSION_KEY) === "1";
        const response = await fetch(
          alreadyCounted ? "/api/visits" : "/api/visits?count=1",
          { cache: "no-store" }
        );
        if (!response.ok) return;
        const data = (await response.json()) as { total?: number };
        if (!alreadyCounted) {
          sessionStorage.setItem(SESSION_KEY, "1");
        }
        if (!cancelled) {
          setTotal(typeof data.total === "number" ? data.total : 0);
        }
      } catch {
        if (!cancelled) setTotal(null);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-gold/40 bg-black/40 px-4 py-3">
      <Eye className="size-5 text-gold" aria-hidden />
      <div>
        <p className="text-xs text-white/65">عدد زيارات الصفحة</p>
        <p className="mt-0.5 font-heading text-2xl font-bold tabular-nums text-gold" dir="ltr">
          {total === null ? "—" : total.toLocaleString("ar-IQ")}
        </p>
      </div>
    </div>
  );
}
