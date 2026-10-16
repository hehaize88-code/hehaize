import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsEvents } from "./components/AnalyticsEvents";
import "./globals.css";
import "../public/site-shell.css";
import "../public/mobile-inner.css";

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
    default: "CSSBuy Spreadsheet 2026: Finds, Links & Shipping",
    template: "%s | CSSBuy China",
  },
  description: "Browse CSSBuy finds and product links by category. Compare USD prices, review photos and plan warehouse QC, returns and international shipping.",
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
    title: "CSSBuy Spreadsheet 2026: Finds, Links & Shipping",
    description: "Explore CSSBuy product links, photos and USD prices with practical QC, return and shipping guides.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSSBuy Spreadsheet 2026: Finds, Links & Shipping",
    description: "Explore CSSBuy product links, photos and USD prices with practical QC, return and shipping guides.",
  },
  icons: {
    icon: "https://assets.cssbuy.com/icon/css_192.png",
    shortcut: "https://assets.cssbuy.com/icon/css_192.png",
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
        <AnalyticsEvents />
        {children}
      </body>
    </html>
  );
}
