import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: "Joyagoo Shipping Guide: Weight, Rehearsal & Storage",
  description:
    "Understand Joyagoo international shipping estimates, rehearsal packing, parcel photos and warehouse storage before submitting a parcel.",
  alternates: languageAlternates("/shipping-guide/"),
};

export default function ShippingGuidePage() {
  return <LocalizedPage locale="en" slug="shipping-guide" />;
}
