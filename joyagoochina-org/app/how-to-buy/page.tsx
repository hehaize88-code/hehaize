import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languageAlternates } from "../seoAlternates";

const title = "How to Buy with Joyagoo: Step-by-Step Guide";
const description =
  "Learn the Joyagoo buying flow from product selection and domestic ordering to QC photos, warehouse storage and international parcel submission.";

export const metadata: Metadata = {
  title,
  description,
  alternates: languageAlternates("/how-to-buy/"),
  ...editorialSocialMetadata({
    slug: "how-to-buy",
    title,
    description,
    url: "https://joyagoochina.org/how-to-buy/",
  }),
};

export default function HowToBuyPage() {
  return <LocalizedPage locale="en" slug="how-to-buy" />;
}
