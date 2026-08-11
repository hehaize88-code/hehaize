import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { seoArticleCopy } from "../seoArticles";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-fees-explained";
const title = "Joyagoo Fees: Service, Warehouse & Shipping Costs";
const description = seoArticleCopy.en.article.description;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "joyagoo fees",
    "joyagoo service fee",
    "joyagoo shipping cost",
    "how much does joyagoo cost",
    "joyagoo rehearsal packing",
    "joyagoo volumetric weight",
  ],
  alternates: languageAlternates(`/${slug}/`),
  ...editorialSocialMetadata({
    slug,
    title: seoArticleCopy.en.article.title,
    description,
    url: `https://joyagoochina.org/${slug}/`,
  }),
};

export default function JoyagooFeesPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
