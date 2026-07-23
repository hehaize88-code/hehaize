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
  metadataBase: new URL("https://uufindssheet.com"),
  title: "UUFinds Spreadsheet Guide & QC Finder Routes | UUFinds Sheet",
  description: "An independent guide to researching products with UUFinds QC tools and exploring matching Shoes, Hoodies, T-Shirts and more on CNBuy Sheet.",
  alternates: {
    canonical: "/",
    languages: { "x-default": "/", "en-US": "/", "en-GB": "/en-gb/", de: "/de/", pl: "/pl/", "pt-BR": "/pt-br/" },
  },
  openGraph: {
    title: "UUFinds Sheet — Research First, Browse Smarter",
    description: "Independent UUFinds spreadsheet and QC research guide with direct CNBuy Sheet category routes.",
    url: "https://uufindssheet.com/",
    siteName: "UUFinds Sheet",
    type: "website",
  },
  robots: { index: true, follow: true },
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
      </body>
    </html>
  );
}
