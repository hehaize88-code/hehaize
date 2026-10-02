import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languages } from "../i18n";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-qc-photo-checklist";
const entry = getSeoArticleEntry("en", slug)!;
const title = entry.seoTitle ?? entry.article.title;

export const metadata: Metadata = {
  title: { absolute: title },
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`, languages.filter((language) => getSeoArticleEntry(language.code, slug)).map((language) => language.code)),
  ...editorialSocialMetadata({ slug, title, description: entry.article.description, url: `https://joyagoochina.org/${slug}/` }),
};

export default function ArticlePage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
