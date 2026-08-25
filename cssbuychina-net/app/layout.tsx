import Script from "next/script";
import type { Metadata } from "next";
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
  description: "Browse checked CSSBuy spreadsheet finds by category, recorded CNY value and product link. Compare sizing, warehouse QC, ordering steps and parcel costs.",
  applicationName: "CSSBuy China Spreadsheet",
  keywords: ["CSSBuy spreadsheet", "CSSBuy finds", "CSSBuy shoes", "CSSBuy QC", "China shopping spreadsheet"],
  authors: [{ name: "CSSBuy China Editorial" }],
  creator: "CSSBuy China Editorial",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QY8MM7VZV2');
          `}
        </Script>
{children}</body>
    </html>
  );
}
