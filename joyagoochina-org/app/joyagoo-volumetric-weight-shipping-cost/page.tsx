import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { getSeoArticleEntry } from "../seoArticleLibrary";

const entry = getSeoArticleEntry(
  "en",
  "joyagoo-volumetric-weight-shipping-cost",
)!;

export const metadata: Metadata = {
  title: entry.article.title,
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: { canonical: "/joyagoo-volumetric-weight-shipping-cost/" },
  openGraph: {
    type: "article",
    title: entry.article.title,
    description: entry.article.description,
    url: "https://joyagoochina.org/joyagoo-volumetric-weight-shipping-cost/",
  },
};

export default function JoyagooVolumetricWeightPage() {
  return (
    <LocalizedPage
      locale="en"
      slug="joyagoo-volumetric-weight-shipping-cost"
    />
  );
}
