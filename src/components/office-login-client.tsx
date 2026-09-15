"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function OfficeLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => {
    const next = searchParams.get("next") || "/requests-table";
    return next.startsWith("/") ? next : "/requests-table";
  }, [searchParams]);

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/office/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "تعذر تسجيل الدخول");
        setLoading(false);
        return;
      }
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("تعذر الاتصال بالخادم");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-[#111] text-gold">
          <LockKeyhole className="size-5" aria-hidden />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold">دخول المكتب</h1>
          <p className="mt-1 text-sm text-muted-foreground">منطقة خاصة — ليست للزوار</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="password">كلمة مرور المكتب</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="min-h-11 text-base md:text-sm"
            dir="ltr"
          />
        </div>

        {error ? (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="h-12 w-full rounded-md bg-[#111] text-white hover:bg-black"
        >
          {loading ? "جاري التحقق..." : "دخول إلى جدول الطلبات"}
        </Button>
      </form>

      <p className="mt-6 text-xs leading-6 text-muted-foreground">
        هذه الصفحة سرية لموظفي المكتب فقط. النموذج العام للمواطنين يبقى على{" "}
        <Link href="/request" className="text-gold underline-offset-4 hover:underline">
          قدّم طلباً
        </Link>
        .
      </p>
    </div>
  );
}

export function OfficeLoginClient() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">جاري التحميل...</p>}>
      <OfficeLoginForm />
    </Suspense>
  );
}
