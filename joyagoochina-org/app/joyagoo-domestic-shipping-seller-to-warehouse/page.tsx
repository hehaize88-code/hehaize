import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-domestic-shipping-seller-to-warehouse";
const entry = getSeoArticleEntry("en", slug)!;
const description =
  "Separate Joyagoo domestic shipping from international freight, compare seller-to-warehouse charges and troubleshoot inbound delivery with a practical worksheet.";

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Domestic Shipping to Warehouse: Cost Guide" },
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

export default function JoyagooDomesticShippingPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
