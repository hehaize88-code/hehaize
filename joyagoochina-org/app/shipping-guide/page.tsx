import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languageAlternates } from "../seoAlternates";

const title = "Joyagoo Shipping Guide: Weight, Rehearsal & Storage";
const description =
  "Understand Joyagoo international shipping estimates, rehearsal packing, parcel photos and warehouse storage before submitting a parcel.";

export const metadata: Metadata = {
  title,
  description,
  alternates: languageAlternates("/shipping-guide/"),
  ...editorialSocialMetadata({
    slug: "shipping-guide",
    title,
    description,
    url: "https://joyagoochina.org/shipping-guide/",
  }),
};

export default function ShippingGuidePage() {
  return <LocalizedPage locale="en" slug="shipping-guide" />;
}
