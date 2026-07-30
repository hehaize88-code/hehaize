import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { getSeoArticleEntry } from "../seoArticleLibrary";

const entry = getSeoArticleEntry("en", "joyagoo-qc-photo-checklist")!;

export const metadata: Metadata = {
  title: entry.article.title,
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: { canonical: "/joyagoo-qc-photo-checklist/" },
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
