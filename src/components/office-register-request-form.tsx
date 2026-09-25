"use client";

import { FormEvent, useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  onRegistered: () => Promise<void> | void;
  onUnauthorized: () => void;
};

export function OfficeRegisterRequestForm({ onRegistered, onUnauthorized }: Props) {
  const [registerState, setRegisterState] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    setRegisterState("saving");
    setMessage(null);
    try {
      const res = await fetch("/api/office/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(data.get("fullName") ?? ""),
          whatsapp: String(data.get("whatsapp") ?? ""),
          subject: String(data.get("subject") ?? ""),
          status: String(data.get("status") ?? "قيد المتابعة"),
          ref: String(data.get("ref") ?? ""),
        }),
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setRegisterState("error");
        setMessage(json.error || "تعذر تسجيل الطلب");
        return;
      }
      setRegisterState("done");
      setMessage("تم تسجيل الطلب — يمكن للمواطن متابعته من الموقع العام.");
      formEl.reset();
      await onRegistered();
    } catch {
      setRegisterState("error");
      setMessage("تعذر الاتصال بالخادم");
    }
  }

  const messageClass =
    registerState === "error"
      ? "border border-destructive/30 bg-destructive/10 text-destructive"
      : "border border-emerald-200 bg-emerald-50 text-emerald-900";

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="space-y-4 rounded-xl border border-[#222]/10 bg-white p-4 shadow-sm sm:p-5"
    >
      <h3 className="font-heading text-lg font-bold">تسجيل طلب للمواطن</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="office-fullName">الاسم الرباعي</Label>
          <Input id="office-fullName" name="fullName" required className="min-h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="office-whatsapp">رقم الواتساب</Label>
          <Input id="office-whatsapp" name="whatsapp" required dir="ltr" className="min-h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="office-ref">رقم مرجعي (اختياري)</Label>
          <Input id="office-ref" name="ref" dir="ltr" className="min-h-11" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="office-subject">الموضوع (اختياري)</Label>
          <Input id="office-subject" name="subject" className="min-h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="office-status">الحالة</Label>
          <select
            id="office-status"
            name="status"
            defaultValue="قيد المتابعة"
            className="min-h-11 w-full rounded-lg border border-input bg-white px-3 text-sm"
          >
            <option value="جديدة">جديدة</option>
            <option value="قيد المتابعة">قيد المتابعة</option>
            <option value="تم استلام الرد">تم استلام الرد</option>
            <option value="مكتملة">مكتملة</option>
            <option value="ملغاة">ملغاة</option>
          </select>
        </div>
      </div>
      {message ? (
        <p className={cn("rounded-md px-3 py-2 text-sm", messageClass)} role="status">
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={registerState === "saving"}
        className="h-11 rounded-md bg-[#111] text-white hover:bg-black"
      >
        <Save className="size-4" aria-hidden />
        {registerState === "saving" ? "جاري التسجيل…" : "حفظ الطلب"}
      </Button>
    </form>
  );
}
