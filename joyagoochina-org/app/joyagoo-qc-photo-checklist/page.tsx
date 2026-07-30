import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const entry = getSeoArticleEntry("en", "joyagoo-qc-photo-checklist")!;

export const metadata: Metadata = {
  title: "Joyagoo QC Photos: Practical Inspection Checklist",
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: languageAlternates("/joyagoo-qc-photo-checklist/"),
  openGraph: {
    type: "article",
    title: entry.article.title,
    description: entry.article.description,
    url: "https://joyagoochina.org/joyagoo-qc-photo-checklist/",
  },
};

export default function JoyagooQcPhotoChecklistPage() {
  return <LocalizedPage locale="en" slug="joyagoo-qc-photo-checklist" />;
}
