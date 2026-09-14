import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { priorityArticleLocales } from "../priorityShippingArticles";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-shipping-cost-per-kg-explained";
const entry = getSeoArticleEntry("en", slug)!;

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Shipping Cost per KG: Rate & Weight Guide 2026" },
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`, priorityArticleLocales),
  ...editorialSocialMetadata({ slug, title: entry.article.title, description: entry.article.description, url: `https://joyagoochina.org/${slug}/` }),
};

export default function JoyagooShippingCostPerKgPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
