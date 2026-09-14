import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { priorityArticleLocales } from "../priorityShippingArticles";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "why-is-joyagoo-shipping-so-expensive";
const entry = getSeoArticleEntry("en", slug)!;

export const metadata: Metadata = {
  title: { absolute: "Why Is Joyagoo Shipping So Expensive? 7 Cost Drivers" },
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`, priorityArticleLocales),
  ...editorialSocialMetadata({ slug, title: entry.article.title, description: entry.article.description, url: `https://joyagoochina.org/${slug}/` }),
};

export default function WhyJoyagooShippingIsExpensivePage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
