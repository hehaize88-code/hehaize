import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const entry = getSeoArticleEntry(
  "en",
  "joyagoo-return-window-warehouse-storage",
)!;

export const metadata: Metadata = {
  title: "Joyagoo Returns: 5-Day QC & 90-Day Storage",
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: languageAlternates(
    "/joyagoo-return-window-warehouse-storage/",
  ),
  openGraph: {
    type: "article",
    title: entry.article.title,
    description: entry.article.description,
    url: "https://joyagoochina.org/joyagoo-return-window-warehouse-storage/",
    images: ["https://joyagoochina.org/products/3380.webp"],
  },
  twitter: { card: "summary_large_image", images: ["https://joyagoochina.org/products/3380.webp"] },
};

export default function JoyagooReturnWindowPage() {
  return (
    <LocalizedPage
      locale="en"
      slug="joyagoo-return-window-warehouse-storage"
    />
  );
}
