import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-parcel-reinforcement-cost-damage-risk";
const entry = getSeoArticleEntry("en", slug)!;

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Parcel Reinforcement: Cost vs Damage Risk" },
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

export default function JoyagooParcelReinforcementPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
