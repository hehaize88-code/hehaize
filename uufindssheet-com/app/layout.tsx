import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClickTracker } from "./components/click-tracker";
import { socialImage } from "./seo-image";
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
  metadataBase: new URL("https://uufindssheet.com"),
  title: "UUFinds Spreadsheet 2026: Product Finds & QC Guides",
  description: "Browse an independent UUFinds spreadsheet with shoes, hoodies and product links. Learn to match QC photos, compare listings and check the details before shopping.",
  alternates: {
    canonical: "/",
    languages: { "x-default": "/", en: "/", "en-GB": "/en-gb/", "de-DE": "/de/", "pl-PL": "/pl/", "pt-BR": "/pt-br/" },
  },
  openGraph: {
    title: "UUFinds Spreadsheet 2026: Product Finds & QC Guides",
    description: "Browse an independent UUFinds spreadsheet with shoes, hoodies and product links. Learn to match QC photos, compare listings and check the details before shopping.",
    url: "https://uufindssheet.com/",
    siteName: "UUFinds Sheet",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "UUFinds Spreadsheet 2026: Product Finds & QC Guides",
    description: "Browse an independent UUFinds spreadsheet with shoes, hoodies and product links. Learn to match QC photos, compare listings and check the details before shopping.",
    images: [socialImage.url],
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
  ...(process.env.CF_PAGES_STATIC_EXPORT === "1"
    ? {}
    : { other: { "codex-preview": "development" } }),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ClickTracker />
      </body>
    </html>
  );
}
