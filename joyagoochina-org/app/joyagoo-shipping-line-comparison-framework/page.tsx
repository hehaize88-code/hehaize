import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-shipping-line-comparison-framework";
const entry = getSeoArticleEntry("en", slug)!;

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Shipping Line Comparison: Eligibility & Billing" },
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`),
  ...editorialSocialMetadata({
    slug,
    title: entry.article.title,
    description: entry.article.description,
    url: `https://joyagoochina.org/${slug}/`,
  }),
};

export default function JoyagooShippingLineComparisonPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
