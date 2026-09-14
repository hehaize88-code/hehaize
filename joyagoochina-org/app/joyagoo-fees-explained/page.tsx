import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-fees-explained";
const title = "How Much Is Joyagoo Shipping? Cost & Fees in 2026";
const description =
  "See why Joyagoo shipping can be expensive and how product payment, domestic delivery, warehouse choices, billable weight and international freight add up.";

export const metadata: Metadata = {
  title: { absolute: title },
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
    title,
    description,
    url: `https://joyagoochina.org/${slug}/`,
  }),
};

export default function JoyagooFeesPage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
