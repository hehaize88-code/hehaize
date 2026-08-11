import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languageAlternates } from "../seoAlternates";

const title = "Joyagoo Return Policy: The 5-Day QC Window Explained";
const description =
  "Understand Joyagoo's published five-day return-request window, eligibility limits, packaging conditions and possible return costs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: languageAlternates("/returns/"),
  ...editorialSocialMetadata({
    slug: "returns",
    title,
    description,
    url: "https://joyagoochina.org/returns/",
  }),
};

export default function ReturnsPage() {
  return <LocalizedPage locale="en" slug="returns" />;
}
