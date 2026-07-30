import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { seoArticleCopy } from "../seoArticles";

export const metadata: Metadata = {
  title: seoArticleCopy.en.indexTitle,
  description: seoArticleCopy.en.indexIntro,
  alternates: { canonical: "/articles/" },
};

export default function ArticlesPage() {
  return <LocalizedPage locale="en" slug="articles" />;
}
