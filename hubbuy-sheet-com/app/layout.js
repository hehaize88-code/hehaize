import Script from "next/script";
import "./globals.css";
import "../public/mobile-inner.css";
import "../public/assets/commerce-home.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageRuntime from "@/components/LanguageRuntime";
import { SITE_URL } from "@/data/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hubbuy Spreadsheet 2026 | Finds, Product Photos & Search",
    template: "%s | Hubbuy Sheet",
  },
  description: "Explore the Hubbuy spreadsheet: search shoes and clothing by name, product ID or image, compare product photos, and open the exact item on Hubbuy.",
  keywords: ["Hubbuy spreadsheet", "Hubbuy finds", "Hubbuy shoes spreadsheet", "Hubbuy clothing spreadsheet", "Hubbuy QC photos", "how to buy on Hubbuy"],
  icons: { icon: [{ url: "/brand/hubbuy-favicon.ico", sizes: "64x64", type: "image/x-icon" }], shortcut: "/brand/hubbuy-favicon.ico" },
  applicationName: "Hubbuy Sheet",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Hubbuy Sheet",
    title: "Hubbuy Spreadsheet 2026 | Finds, Product Photos & Search",
    description: "A searchable, independent Hubbuy spreadsheet guide with organized finds, QC checks and practical buying steps.",
    images: [{ url: "/brand/og-card.png", width: 1200, height: 630, alt: "Hubbuy Sheet 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubbuy Spreadsheet 2026",
    description: "Curated finds, live search, QC checks and practical buying guides.",
    images: ["/brand/og-card.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function RootLayout({ children }) {
 return (
  <html lang="en">
<body>

<Script src="/mobile-reading.js?v=20261016-compact-v2" strategy="afterInteractive" />

<LanguageRuntime>
  <a className="skip-link" href="#main-content">
    Skip to content
  </a>

  <Header />

  <main id="main-content">
    {children}
  </main>

  <Footer />
</LanguageRuntime>

    </body>
  </html>
  );
}
