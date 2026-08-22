import type { Metadata } from "next";
import Script from "next/script";
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
  title: "UUFinds Guide 2026: Spreadsheet, QC Photos & Product Search",
  description: "Use UUFinds to search product and agent links, review QC photos, compare spreadsheet finds, and open matching product pages for shoes, hoodies, jerseys and more.",
  alternates: {
    canonical: "/",
    languages: { "x-default": "/", en: "/", "en-GB": "/en-gb/", "de-DE": "/de/", "pl-PL": "/pl/", "pt-BR": "/pt-br/" },
  },
  openGraph: {
    title: "UUFinds Guide 2026: Spreadsheet, QC Photos & Product Search",
    description: "Use UUFinds to search product and agent links, review QC photos, compare spreadsheet finds, and open matching product pages for shoes, hoodies, jerseys and more.",
    url: "https://uufindssheet.com/",
    siteName: "UUFinds Sheet",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "UUFinds Guide 2026: Spreadsheet, QC Photos & Product Search",
    description: "Use UUFinds to search product and agent links, review QC photos, compare spreadsheet finds, and open matching product pages for shoes, hoodies, jerseys and more.",
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
        <ClickTracker />
      </body>
    </html>
  );
}
