import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "how-to-buy-from-taobao-with-joyagoo";
const entry = getSeoArticleEntry("en", slug)!;

export const metadata: Metadata = {
  title: {
    absolute: "How to Buy from Taobao with Joyagoo: Complete Guide",
  },
  description:
    "Learn how to use a Taobao link with Joyagoo, verify the order, follow seller and warehouse stages, review QC photos and plan international shipping.",
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`),
  openGraph: {
    type: "article",
    title: entry.article.title,
    description: entry.article.description,
    url: `https://joyagoochina.org/${slug}/`,
  },
};

export default function TaobaoWithJoyagooPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
