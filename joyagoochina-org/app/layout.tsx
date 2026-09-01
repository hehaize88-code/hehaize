import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OutboundTracker from "./components/OutboundTracker";
import { socialImage } from "./editorialAssets";
import { languageAlternates } from "./seoAlternates";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joyagoochina.org"),
  title: {
    default: "Joyagoo Spreadsheet 2026: 36 Checked Product Links",
    template: "%s | Joyagoo China",
  },
  description:
    "Browse 36 checked Joyagoo product links with current prices, matching listings, QC tips and shipping guidance. Updated September 2026.",
  keywords: [
    "Joyagoo spreadsheet",
    "Joyagoo spreadsheet 2026",
    "Joyagoo QC",
    "Joyagoo shipping",
    "Joyagoo products",
  ],
  alternates: languageAlternates("/"),
  openGraph: {
    type: "website",
    title: "Joyagoo Spreadsheet 2026: 36 Checked Product Links",
    description:
      "Browse 36 checked Joyagoo product links with current prices, matching listings, QC tips and shipping guidance.",
    url: "https://joyagoochina.org/",
    siteName: "Joyagoo China",
    images: [
      socialImage(
        undefined,
        "Joyagoo spreadsheet product discovery and buying research",
      ),
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joyagoo Spreadsheet 2026: 36 Checked Product Links",
    description:
      "Browse 36 checked Joyagoo product links with current prices, matching listings, QC tips and shipping guidance.",
    images: [
      socialImage(
        undefined,
        "Joyagoo spreadsheet product discovery and buying research",
      ).url,
    ],
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
        <OutboundTracker />
      </body>
    </html>
  );
}
