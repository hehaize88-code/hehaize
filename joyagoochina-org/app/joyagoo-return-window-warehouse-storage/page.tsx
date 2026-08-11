import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-return-window-warehouse-storage";
const entry = getSeoArticleEntry("en", slug)!;

export const metadata: Metadata = {
  title: "Joyagoo Returns: 5-Day QC & 90-Day Storage",
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

export default function JoyagooReturnWindowPage() {
  return (
    <LocalizedPage
      locale="en"
      slug={slug}
    />
  );
}
