import type { Metadata } from "next";
import Script from "next/script";
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
    default: "Joyagoo Spreadsheet 2026 | Products, QC & Shipping Guides",
    template: "%s | Joyagoo China",
  },
  description:
    "Explore a Joyagoo spreadsheet with direct product links, researched QC guidance, shipping explanations and return-policy help.",
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
    title: "Joyagoo Spreadsheet 2026",
    description:
      "Curated product discovery with practical Joyagoo QC, shipping and return guidance.",
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
    title: "Joyagoo Spreadsheet 2026",
    description:
      "Curated product discovery with practical Joyagoo QC, shipping and return guidance.",
    images: [
      socialImage(
        undefined,
        "Joyagoo spreadsheet product discovery and buying research",
      ).url,
    ],
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
{children}
        <OutboundTracker />
      </body>
    </html>
  );
}
