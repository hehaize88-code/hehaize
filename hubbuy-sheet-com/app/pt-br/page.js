import HomePage from "../page";
import { localePages } from "@/data/locale-content";

const page = localePages["pt-br"];

export const metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: page.path,
    languages: {
      en: "/",
      "pt-BR": "/pt-br/",
      de: "/de/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: page.path,
    locale: page.ogLocale,
    alternateLocale: ["en_US", "de_DE"],
    title: page.title,
    description: page.description,
    images: [{ url: "/brand/og-card.png", width: 1200, height: 630, alt: page.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
    images: ["/brand/og-card.png"],
  },
};

export default function PortugueseHomePage() {
  return <HomePage locale="pt-br" />;
}
