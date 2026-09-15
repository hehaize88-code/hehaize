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
  metadataBase: new URL("https://lolobuy-sheet.net"),
  title: {
    default: "LoloBuy Spreadsheet 2026: Product Links, Finds & QC",
    template: "%s | LoloBuy Sheet",
  },
  description:
    "Browse current LoloBuy spreadsheet finds with matched product links, then use independent QC, sizing and shipping guides before ordering.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "LoloBuy spreadsheet",
    "LoloBuy sheet",
    "LoloBuy finds",
    "LoloBuy products",
    "LoloBuy QC",
    "LoloBuy shipping",
    "LoloBuy product links",
  ],
  openGraph: {
    title: "LoloBuy Spreadsheet 2026: Product Links, Finds & QC",
    description:
      "Find matched product links and learn what to check for QC, sizing, fees and shipping before ordering with LoloBuy.",
    type: "website",
    url: "/",
    siteName: "LoloBuy Sheet",
    images: [
      {
        url: "/social/spreadsheet-guide.png",
        width: 1200,
        height: 630,
        alt: "LoloBuy Sheet product discovery, checking and parcel-planning flow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LoloBuy Spreadsheet 2026",
    description:
      "Product finds with matched images and destination pages, plus practical QC and shipping context.",
    images: ["/social/spreadsheet-guide.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "codex-preview": "development",
  },
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
