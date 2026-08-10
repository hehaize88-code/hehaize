import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cssbuychina.net"),
  title: {
    default: "CSSBuy Spreadsheet 2026 – Checked Product Finds",
    template: "%s | CSSBuy China",
  },
  description: "Browse a fact-checked CSSBuy spreadsheet with category pages, recorded CNY values, product links, two-payment guidance, warehouse QC checks, and parcel-cost articles.",
  applicationName: "CSSBuy China Spreadsheet",
  keywords: ["CSSBuy spreadsheet", "CSSBuy finds", "CSSBuy shoes", "CSSBuy QC", "China shopping spreadsheet"],
  authors: [{ name: "CSSBuy China Editorial" }],
  creator: "CSSBuy China Editorial",
  other: { "codex-preview": "development" },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "pt-BR": "/pt-br",
      "de-DE": "/de",
      es: "/es",
      "x-default": "/",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CSSBuy China",
    title: "CSSBuy Spreadsheet 2026 – Checked Product Finds",
    description: "A category-first CSSBuy spreadsheet index with checked product links and research-led guidance on ordering, warehouse QC, returns, storage, and parcel cost.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSSBuy Spreadsheet 2026 – Checked Product Finds",
    description: "A category-first CSSBuy spreadsheet index with checked product links and fact-based order and parcel guidance.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const language = requestHeaders.get("x-site-language") ?? "en";
  return (
    <html lang={language}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
