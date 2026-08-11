import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-qc-photo-checklist";
const entry = getSeoArticleEntry("en", slug)!;

export const metadata: Metadata = {
  title: "Joyagoo QC Photos: Practical Inspection Checklist",
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

export default function JoyagooQcPhotoChecklistPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
