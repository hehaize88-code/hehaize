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
  title: "KameyMall Spreadsheet 2026 – 30 Verified Finds & QC",
  description:
    "Browse 30 checked KameyMall finds with live product links, dated CNY and USD prices, category filters, QC checks and shipping guides. Updated August 2026.",
  other: {
    "codex-preview": "development",
  },
  openGraph: {
    title: "KameyMall Spreadsheet 2026 – 30 Verified Finds & QC",
    description:
      "Browse 30 checked KameyMall finds with live product links, dated CNY and USD prices, category filters, QC checks and shipping guides. Updated August 2026.",
    type: "website",
    siteName: "KameyMall Sheet",
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
      </body>
    </html>
  );
}
