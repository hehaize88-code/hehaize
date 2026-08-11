import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const entry = getSeoArticleEntry(
  "en",
  "joyagoo-volumetric-weight-shipping-cost",
)!;

export const metadata: Metadata = {
  title: "Joyagoo Shipping Cost & Volumetric Weight Guide",
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: languageAlternates(
    "/joyagoo-volumetric-weight-shipping-cost/",
  ),
  openGraph: {
    type: "article",
    title: entry.article.title,
    description: entry.article.description,
    url: "https://joyagoochina.org/joyagoo-volumetric-weight-shipping-cost/",
    images: ["https://joyagoochina.org/products/3377.webp"],
  },
  twitter: { card: "summary_large_image", images: ["https://joyagoochina.org/products/3377.webp"] },
};

export default function JoyagooVolumetricWeightPage() {
  return (
    <LocalizedPage
      locale="en"
      slug="joyagoo-volumetric-weight-shipping-cost"
    />
  );
}
