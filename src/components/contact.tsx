"use client";

import { FormEvent, useState } from "react";
import { Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/lib/content";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !message) {
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/60 bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="section-rule mb-5" aria-hidden />
          <h2 className="font-heading text-3xl font-bold text-brand sm:text-4xl">{contact.title}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{contact.lead}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5 rounded-xl bg-[#111111] p-6 text-white sm:p-8">
            <div className="border-b border-white/15 pb-5">
              <p className="text-sm text-gold">الهاتف</p>
              <a
                href={`tel:${contact.phoneTel}`}
                className="mt-2 inline-flex items-center gap-2 text-2xl font-semibold hover:text-gold"
                dir="ltr"
              >
                <Phone className="size-5" aria-hidden />
                <span className="unicode-isolate tabular-nums tracking-wide">{contact.phoneDisplay}</span>
              </a>
            </div>
            <div className="border-b border-white/15 pb-5">
              <p className="text-sm text-gold">أوقات الاستقبال</p>
              <p className="mt-2 text-lg">{contact.hours}</p>
            </div>
            <div className="border-b border-white/15 pb-5">
              <p className="text-sm text-gold">فيسبوك</p>
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-lg font-medium hover:text-gold"
              >
                <Share2 className="size-5" aria-hidden />
                {contact.facebookLabel}
              </a>
            </div>
            <div className="border-b border-white/15 pb-5">
              <p className="text-sm text-gold">البريد</p>
              <p className="mt-2 text-white/70">{contact.placeholders.email}</p>
            </div>
            <div>
              <p className="text-sm text-gold">العنوان</p>
              <p className="mt-2 text-white/70">{contact.placeholders.address}</p>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-6"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{contact.form.name}</Label>
                <Input id="name" name="name" required autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{contact.form.phone}</Label>
                <Input id="phone" name="phone" type="tel" autoComplete="tel" dir="ltr" className="text-start" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">{contact.form.subject}</Label>
              <Input id="subject" name="subject" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{contact.form.message}</Label>
              <Textarea id="message" name="message" required rows={5} />
            </div>

            {status === "error" ? (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                {contact.form.required}
              </p>
            ) : null}
            {status === "success" ? (
              <p className="rounded-md border border-emerald-700/30 bg-emerald-50 px-3 py-2 text-sm text-emerald-800" role="status">
                {contact.form.success}
              </p>
            ) : null}

            <Button type="submit" size="lg" className="h-11 w-full rounded-md bg-[#111111] text-white hover:bg-black sm:w-auto sm:px-8">
              {contact.form.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
