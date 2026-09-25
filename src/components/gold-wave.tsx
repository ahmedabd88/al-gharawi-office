import { cn } from "@/lib/utils";

/** Gold-trimmed white wave separating hero from content (mockup chrome). */
export function GoldWave({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none leading-[0]", className)} aria-hidden>
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-12"
      >
        <path
          d="M0,40 C240,70 480,10 720,34 C960,58 1200,8 1440,36 L1440,64 L0,64 Z"
          fill="#ffffff"
        />
        <path
          d="M0,36 C240,66 480,6 720,30 C960,54 1200,4 1440,32"
          fill="none"
          stroke="#c9a227"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

export function BrandPageFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-[#0a0a0a] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/images/page-hero-inner.png')] bg-cover bg-center opacity-25"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center sm:py-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/current-fist-logo.png"
          alt=""
          width={56}
          height={56}
          className="size-14 rounded-full object-cover"
        />
        <p className="font-heading text-sm font-bold sm:text-base">التيار الوطني الشعبي</p>
        <p className="text-xs text-gold sm:text-sm">خدمة المواطن .. مسؤوليتنا</p>
      </div>
    </footer>
  );
}
