import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-qc-photo-checklist";
const entry = getSeoArticleEntry("en", slug)!;
const title = "Joyagoo QC Photos: 7 Checks Before Accepting an Item";
const description =
  "Use this Joyagoo QC photo checklist to verify variants, measurements, defects and packaging before the five-day return window closes.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`),
  ...editorialSocialMetadata({
    slug,
    title,
    description,
    url: `https://joyagoochina.org/${slug}/`,
  }),
};

export default function JoyagooQcPhotoChecklistPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
