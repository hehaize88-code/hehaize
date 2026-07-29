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
  metadataBase: new URL("https://pikobuy-sheet.net"),
  title: {
    default: "PikoBuy Spreadsheet 2026 | Finds, QC & Shipping Guides",
    template: "%s | PikoBuy Sheet",
  },
  description:
    "Browse organised PikoBuy spreadsheet finds and learn how to review product links, QC photos, sizing and international shipping variables.",
  keywords: [
    "pikobuy spreadsheet",
    "pikobuy finds",
    "pikobuy qc photos",
    "pikobuy shipping cost",
    "how to use pikobuy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "PikoBuy Spreadsheet 2026",
    description:
      "Independent product finds, practical QC checks and evidence-based PikoBuy guides.",
    type: "website",
  },
  other: { "codex-preview": "development" },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
