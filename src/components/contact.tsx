"use client";

import { FormEvent, useState } from "react";
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
    <section id="contact" className="scroll-mt-20 border-t border-border/60 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="section-rule mb-5" aria-hidden />
          <h2 className="font-heading text-3xl font-bold text-brand sm:text-4xl">{contact.title}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{contact.lead}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5 text-sm leading-7">
            <div className="border-b border-border/70 pb-4">
              <p className="font-medium text-foreground">الهاتف</p>
              <p className="mt-1 text-muted-foreground">{contact.placeholders.phone}</p>
            </div>
            <div className="border-b border-border/70 pb-4">
              <p className="font-medium text-foreground">البريد</p>
              <p className="mt-1 text-muted-foreground">{contact.placeholders.email}</p>
            </div>
            <div className="border-b border-border/70 pb-4">
              <p className="font-medium text-foreground">العنوان</p>
              <p className="mt-1 text-muted-foreground">{contact.placeholders.address}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">أوقات الاستقبال</p>
              <p className="mt-1 text-muted-foreground">{contact.placeholders.hours}</p>
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
              <p className="text-sm text-destructive" role="alert">
                {contact.form.required}
              </p>
            ) : null}
            {status === "success" ? (
              <p className="text-sm text-primary" role="status">
                {contact.form.success}
              </p>
            ) : null}

            <Button type="submit" size="lg" className="h-11 w-full rounded-md sm:w-auto sm:px-8">
              {contact.form.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
