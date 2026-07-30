import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { seoArticleCopy } from "../seoArticles";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: seoArticleCopy.en.indexTitle,
  description: seoArticleCopy.en.indexIntro,
  alternates: languageAlternates("/articles/"),
};

export default function ArticlesPage() {
  return <LocalizedPage locale="en" slug="articles" />;
}
