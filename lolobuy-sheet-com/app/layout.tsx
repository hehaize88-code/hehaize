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
  metadataBase: new URL("https://lolobuy-sheet.com"),
  title: {
    default: "Lolobuy Spreadsheet 2026 | Curated Finds & QC Guide",
    template: "%s | Lolobuy Sheet",
  },
  description:
    "Browse a curated Lolobuy spreadsheet, explore product categories, learn how to review QC photos, and open current product listings.",
  keywords: [
    "lolobuy spreadsheet",
    "lolobuy sheet",
    "lolobuy finds",
    "lolobuy QC",
    "lolobuy W2C",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Lolobuy Spreadsheet 2026 | Curated Finds & QC Guide",
    description:
      "A clear, independent product-discovery guide with curated categories and practical QC guidance.",
    url: "/",
    siteName: "Lolobuy Sheet",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lolobuy Spreadsheet 2026",
    description:
      "Curated product finds, category shortcuts, and practical QC guidance.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
