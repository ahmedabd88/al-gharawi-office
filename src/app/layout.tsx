import { Cairo, El_Messiri } from "next/font/google";
import type { Metadata } from "next";
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
    "الموقع الرسمي لمكتب النائب سالم سوادي الغراوي — خدمة المواطنين ومتابعة الطلبات في بغداد الكرخ.",
  openGraph: {
    title: "مكتب النائب سالم سوادي الغراوي",
    description:
      "صوت دائرتكم في مجلس النواب — متابعة طلبات المواطنين والتنسيق مع الجهات الرسمية.",
    locale: "ar_IQ",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${elMessiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
