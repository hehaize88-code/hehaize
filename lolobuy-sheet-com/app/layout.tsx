import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lolobuy-sheet.com"),
  title: "Lolobuy Spreadsheet 2026 | Curated Finds & QC Guide",
  description:
    "Browse a curated Lolobuy spreadsheet, explore product categories, learn how to review QC photos, and open current product listings.",
  keywords: [
    "lolobuy spreadsheet",
    "lolobuy sheet",
    "lolobuy finds",
    "lolobuy QC",
    "lolobuy W2C",
  ],
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
    images: [
      {
        url: "/social/lolobuy-sheet-share.webp",
        width: 1200,
        height: 630,
        alt: "Lolobuy Sheet — independent product research and QC guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lolobuy Spreadsheet 2026",
    description:
      "Curated product finds, category shortcuts, and practical QC guidance.",
    images: ["/social/lolobuy-sheet-share.webp"],
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
    <html lang="en" suppressHydrationWarning>
      <body>
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
{children}</body>
    </html>
  );
}
