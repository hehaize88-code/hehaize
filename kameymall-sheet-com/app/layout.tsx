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
  title: "KameyMall Sheet & Spreadsheet Finds | Shopping Guide",
  description:
    "Browse KameyMall spreadsheet finds by category, compare product details and approximate USD prices, and open direct product listings.",
  other: {
    "codex-preview": "development",
  },
  openGraph: {
    title: "KameyMall Sheet & Spreadsheet Finds",
    description:
      "A practical KameyMall finds database with direct product listings, categories and shopping guidance.",
    type: "website",
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
