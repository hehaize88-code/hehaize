import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languages } from "../i18n";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-shipping-calculator-cost-estimate-guide";
const entry = getSeoArticleEntry("en", slug)!;

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Shipping Calculator 2026: Estimate Parcel Cost" },
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`, languages.filter(language => getSeoArticleEntry(language.code, slug)).map(language => language.code)),
  ...editorialSocialMetadata({ slug, title: entry.article.title, description: entry.article.description, url: `https://joyagoochina.org/${slug}/` }),
};

export default function JoyagooShippingCalculatorPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
