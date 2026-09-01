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
  title: "KameyMall Spreadsheet 2026: 30 Finds, Prices & Direct Links",
  description:
    "Browse 30 curated KameyMall finds with USD prices, product IDs, categories and direct links to the matching live product pages.",
  other: {
    "codex-preview": "development",
  },
  openGraph: {
    title: "KameyMall Spreadsheet 2026: 30 Finds, Prices & Direct Links",
    description:
      "Browse 30 curated KameyMall finds with USD prices, product IDs, categories and direct links to the matching live product pages.",
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
      </body>
    </html>
  );
}
