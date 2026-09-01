import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languageAlternates } from "../seoAlternates";

const title = "How to Refund on Joyagoo: 5-Day Return Window (2026)";
const description =
  "Learn how to request a Joyagoo refund after QC, the five-day deadline, seller eligibility, packaging rules and possible return shipping costs.";

export const metadata: Metadata = {
  title: { absolute: title },
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
