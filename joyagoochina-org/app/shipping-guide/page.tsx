import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languageAlternates } from "../seoAlternates";

const title = "Joyagoo Shipping Guide 2026: Cost, Weight & Delivery Time";
const description =
  "Learn what affects Joyagoo shipping cost, how actual and volumetric weight are billed, typical delivery ranges and when rehearsal packing helps.";

export const metadata: Metadata = {
  title: { absolute: title },
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
