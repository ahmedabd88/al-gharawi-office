"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigateWhatsAppSameTab } from "@/lib/whatsapp";

type Props = {
  href: string;
  label: string;
  hint?: string;
  className?: string;
};

/** Large, touch-friendly WhatsApp fallback — always visible after a successful prepare. */
export function WhatsAppOpenLink({ href, label, hint, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      {hint ? <p className="text-sm leading-7 text-emerald-900">{hint}</p> : null}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#128C7E] px-4 py-3 text-center text-base font-semibold text-white hover:bg-[#0e6e63] sm:w-auto sm:min-w-[16rem]"
        onClick={(event) => {
          // On mobile, force same-tab so Safari/Chrome hand off to the WhatsApp app.
          const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
          if (mobile) {
            event.preventDefault();
            navigateWhatsAppSameTab(href);
          }
        }}
      >
        <MessageCircle className="size-5 shrink-0" aria-hidden />
        {label}
      </a>
    </div>
  );
}
