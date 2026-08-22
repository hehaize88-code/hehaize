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
  title: "KameyMall Spreadsheet 2026: 30 Product Finds & QC Guide",
  description:
    "Browse 30 curated KameyMall spreadsheet finds across shoes, hoodies, jerseys and accessories. Compare prices, use QC guidance and open exact product pages.",
  other: {
    "codex-preview": "development",
  },
  openGraph: {
    title: "KameyMall Spreadsheet 2026: 30 Product Finds & QC Guide",
    description:
      "Browse 30 curated KameyMall spreadsheet finds across shoes, hoodies, jerseys and accessories. Compare prices, use QC guidance and open exact product pages.",
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
