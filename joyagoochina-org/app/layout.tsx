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
    default: "Joyagoo Shipping Cost Guide 2026: Fees, Weight & Parcels",
    template: "%s | Joyagoo China",
  },
  description:
    "Plan Joyagoo shipping costs with researched guidance on fees, billable weight, parcel packing and country-specific budgets. Updated September 2026.",
  keywords: [
    "Joyagoo shipping cost",
    "Joyagoo shipping calculator",
    "how much is Joyagoo shipping",
    "Joyagoo fees",
    "Joyagoo parcel weight",
  ],
  alternates: languageAlternates("/"),
  openGraph: {
    type: "website",
    title: "Joyagoo Shipping Cost Guide 2026: Fees, Weight & Parcels",
    description:
      "Research Joyagoo shipping fees, billable weight, packing choices and realistic parcel budgets before you submit.",
    url: "https://joyagoochina.org/",
    siteName: "Joyagoo China",
    images: [
      socialImage(
        undefined,
        "Joyagoo shipping cost and parcel planning research",
      ),
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joyagoo Shipping Cost Guide 2026: Fees, Weight & Parcels",
    description:
      "Research Joyagoo shipping fees, billable weight, packing choices and realistic parcel budgets before you submit.",
    images: [
      socialImage(
        undefined,
        "Joyagoo shipping cost and parcel planning research",
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
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-QY8MM7VZV2');",
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <OutboundTracker />
      </body>
    </html>
  );
}
