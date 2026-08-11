import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { seoArticleCopy } from "../seoArticles";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: "Joyagoo Fees: Service, Warehouse & Shipping Costs",
  description: seoArticleCopy.en.article.description,
  keywords: [
    "joyagoo fees",
    "joyagoo service fee",
    "joyagoo shipping cost",
    "how much does joyagoo cost",
    "joyagoo rehearsal packing",
    "joyagoo volumetric weight",
  ],
  alternates: languageAlternates("/joyagoo-fees-explained/"),
  openGraph: {
    type: "article",
    title: seoArticleCopy.en.article.title,
    description: seoArticleCopy.en.article.description,
    url: "https://joyagoochina.org/joyagoo-fees-explained/",
    images: ["https://joyagoochina.org/products/3382.webp"],
  },
  twitter: { card: "summary_large_image", images: ["https://joyagoochina.org/products/3382.webp"] },
};

export default function JoyagooFeesPage() {
  return <LocalizedPage locale="en" slug="joyagoo-fees-explained" />;
}
