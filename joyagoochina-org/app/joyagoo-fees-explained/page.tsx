import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-fees-explained";
const title = "Joyagoo Fees 2026: Product, Warehouse & Shipping Costs";
const description =
  "See Joyagoo product payments, domestic delivery, QC extras, storage and international shipping costs before you order or submit a parcel.";

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
