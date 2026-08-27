import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-shoebox-removal-shipping-cost-damage-risk";
const entry = getSeoArticleEntry("en", slug)!;
const description = "Decide whether to remove or keep a Joyagoo shoe box using packed dimensions, protection value, live routes and comparable parcel costs.";

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Shoebox Removal: Cost vs Damage Risk" },
  description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`),
  ...editorialSocialMetadata({
    slug,
    title: entry.article.title,
    description,
    url: `https://joyagoochina.org/${slug}/`,
  }),
};

export default function JoyagooShoeboxDecisionPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
