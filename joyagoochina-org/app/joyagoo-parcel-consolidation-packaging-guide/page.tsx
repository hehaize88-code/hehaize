import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-parcel-consolidation-packaging-guide";
const entry = getSeoArticleEntry("en", slug)!;

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Parcel Consolidation & Packaging Guide" },
  description:
    "Learn how to combine Joyagoo warehouse items, compare split parcels, handle route restrictions, write packaging instructions and check the packed result.",
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`),
  openGraph: {
    type: "article",
    title: entry.article.title,
    description: entry.article.description,
    url: `https://joyagoochina.org/${slug}/`,
  },
};

export default function JoyagooParcelConsolidationPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
