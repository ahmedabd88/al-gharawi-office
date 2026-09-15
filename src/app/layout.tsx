import { Cairo, El_Messiri } from "next/font/google";
import type { Metadata } from "next";
import { contact, office } from "@/lib/content";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  variable: "--font-el-messiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مكتب النائب سالم سوادي الغراوي",
  description:
    "الموقع الرسمي لمكتب النائب سالم سوادي الغراوي — خدمة أهلنا في العراق الحبيب ومتابعة طلبات المواطنين. عنوان المكتب: بغداد، المحمودية، حي البتول.",
  openGraph: {
    title: "مكتب النائب سالم سوادي الغراوي",
    description:
      "متابعة طلبات المواطنين والتنسيق مع الجهات الرسمية لخدمة أهلنا في العراق الحبيب. عنوان المكتب: بغداد، المحمودية، حي البتول.",
    locale: "ar_IQ",
    type: "website",
  },
};

const officeJsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOffice",
  name: office.brand,
  alternateName: office.mediaOffice,
  description:
    "مكتب نيابي يستقبل طلبات المواطنين ويتابعها مع الجهات الرسمية لخدمة أهلنا في العراق الحبيب.",
  telephone: contact.phoneTel,
  url: "https://al-gharawi-office.vercel.app",
  address: {
    "@type": "PostalAddress",
    streetAddress: "حي البتول",
    addressLocality: "المحمودية",
    addressRegion: "بغداد",
    addressCountry: "IQ",
  },
  areaServed: office.district,
  sameAs: [contact.facebookUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${elMessiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(officeJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
