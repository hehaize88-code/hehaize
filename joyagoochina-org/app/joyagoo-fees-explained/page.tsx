import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-fees-explained";
const title = "Joyagoo Shipping Cost & Fees 2026: Is It Expensive?";
const description =
  "See what Joyagoo shipping costs include, why parcel prices vary, and how product, warehouse, storage, QC and international fees add up.";

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
