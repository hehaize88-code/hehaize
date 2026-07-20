import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageRuntime from "@/components/LanguageRuntime";
import { SITE_URL } from "@/data/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hubbuy Spreadsheet 2026 | Curated Finds & Shopping Guides",
    template: "%s | Hubbuy Sheet",
  },
  description: "Browse an independent Hubbuy spreadsheet with organized China shopping finds, live product search, QC checks and practical shipping guidance for 2026.",
  keywords: ["Hubbuy spreadsheet", "HubbuyCN spreadsheet", "Hubbuy sheet 2026", "Hubbuy finds", "QC photos", "China shopping agent guide"],
  applicationName: "Hubbuy Sheet",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Hubbuy Sheet",
    title: "Hubbuy Spreadsheet 2026 | Curated Finds & Shopping Guides",
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageRuntime>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </LanguageRuntime>
      </body>
    </html>
  );
}
