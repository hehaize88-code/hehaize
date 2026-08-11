import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
    images: [{ url: "/joyagoo-logo.png", width: 1200, height: 630, alt: "Joyagoo China buying research" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/joyagoo-logo.png"],
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
        <script dangerouslySetInnerHTML={{__html: `document.addEventListener('click',function(e){var a=e.target.closest('a[href*="cnbuycha.com"]');if(!a)return;var d={event:'outbound_product_click',source_page:location.pathname,language:a.dataset.outboundLanguage||document.documentElement.lang,product_id:a.dataset.outboundProductId||'',category:a.dataset.outboundCategory||'',destination:a.href};window.dataLayer=window.dataLayer||[];window.dataLayer.push(d);window.dispatchEvent(new CustomEvent('joyagoo:outbound-click',{detail:d}));});`}} />
      </body>
    </html>
  );
}
