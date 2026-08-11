import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "how-to-buy-from-taobao-with-joyagoo";
const entry = getSeoArticleEntry("en", slug)!;
const description =
  "Learn how to use a Taobao link with Joyagoo, verify the order, follow seller and warehouse stages, review QC photos and plan international shipping.";

export const metadata: Metadata = {
  title: {
    absolute: "How to Buy from Taobao with Joyagoo: Complete Guide",
  },
  description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`),
  ...editorialSocialMetadata({
    slug,
    title: entry.article.title,
    description,
    url: `https://joyagoochina.org/${slug}/`,
  }),
};

export default function TaobaoWithJoyagooPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
