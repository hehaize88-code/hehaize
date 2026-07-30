import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { getSeoArticleEntry } from "../seoArticleLibrary";

const entry = getSeoArticleEntry(
  "en",
  "joyagoo-return-window-warehouse-storage",
)!;

export const metadata: Metadata = {
  title: entry.article.title,
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: { canonical: "/joyagoo-return-window-warehouse-storage/" },
  openGraph: {
    type: "article",
    title: entry.article.title,
    description: entry.article.description,
    url: "https://joyagoochina.org/joyagoo-return-window-warehouse-storage/",
  },
};

export default function JoyagooReturnWindowPage() {
  return (
    <LocalizedPage
      locale="en"
      slug="joyagoo-return-window-warehouse-storage"
    />
  );
}
