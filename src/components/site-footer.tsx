import Link from "next/link";
import { MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import { VisitCounter } from "@/components/visit-counter";
import { contact, nav, office, sources } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-gold bg-[#0a0a0a] text-[#f7f1e4]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-16">
        <div>
          <p className="text-sm tracking-wide text-gold">{office.mediaOffice}</p>
          <p className="mt-3 font-heading text-3xl font-bold leading-snug sm:text-4xl">
            {office.brand}
          </p>
          <p className="mt-4 max-w-xl text-base leading-8 text-white/75">
            خدمة أهلنا في العراق الحبيب · {office.district} · انتخابات {office.electionYear}
          </p>
          <p className="mt-3 inline-flex max-w-xl items-start gap-2 text-base leading-8 text-white/85">
            <MapPin className="mt-1 size-5 shrink-0 text-gold" aria-hidden />
            <span>
              <span className="text-gold">{contact.addressLabel}: </span>
              {contact.address}
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={`tel:${contact.phoneTel}`}
              className="inline-flex items-center gap-3 rounded-xl border border-white/20 px-5 py-4 text-lg font-semibold transition-colors hover:border-gold hover:text-gold"
              dir="ltr"
            >
              <Phone className="size-5" aria-hidden />
              <span className="unicode-isolate tabular-nums tracking-wide">{contact.phoneDisplay}</span>
            </a>
            <Link
              href="/request"
              className="inline-flex items-center gap-3 rounded-xl border border-gold/50 bg-gold/10 px-5 py-4 text-lg font-semibold text-gold transition-colors hover:bg-gold hover:text-[#1a1205]"
            >
              <MessageCircle className="size-5" aria-hidden />
              قدّم طلباً
            </Link>
            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl border border-white/20 px-5 py-4 text-lg font-semibold transition-colors hover:border-gold hover:text-gold"
            >
              <Share2 className="size-5" aria-hidden />
              {contact.facebookLabel}
            </a>
          </div>

          <nav className="mt-6 flex flex-wrap gap-4 text-sm text-white/70" aria-label="روابط سريعة">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-gold">
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="mt-5 text-base text-white/80">{contact.hours}</p>
        </div>

        <div className="flex flex-col items-start gap-8 md:items-end">
          <VisitCounter />
          <div className="text-sm leading-7 text-white/60 md:text-end">
            <p className="mb-2 text-base font-medium text-white/90">مصادر عامة مستخدمة في المحتوى</p>
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block underline-offset-4 hover:text-gold hover:underline"
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
