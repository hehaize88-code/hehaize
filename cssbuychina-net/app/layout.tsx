import type { Metadata } from "next";
import "./globals.css";

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
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "pt-BR": "/pt-br/",
      "de-DE": "/de/",
      es: "/es/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
