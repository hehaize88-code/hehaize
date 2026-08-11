import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-parcel-consolidation-packaging-guide";
const entry = getSeoArticleEntry("en", slug)!;
const description =
  "Learn how to combine Joyagoo warehouse items, compare split parcels, handle route restrictions, write packaging instructions and check the packed result.";

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Parcel Consolidation & Packaging Guide" },
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

export default function JoyagooParcelConsolidationPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
