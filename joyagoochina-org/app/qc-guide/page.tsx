import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languageAlternates } from "../seoAlternates";

const title = "Joyagoo QC Photos: A Practical Inspection Checklist";
const description =
  "Use this Joyagoo QC checklist to inspect colour, size, construction, details and packaging before the return window ends.";

export const metadata: Metadata = {
  title,
  description,
  alternates: languageAlternates("/qc-guide/"),
  ...editorialSocialMetadata({
    slug: "qc-guide",
    title,
    description,
    url: "https://joyagoochina.org/qc-guide/",
  }),
};

export default function QcGuidePage() {
  return <LocalizedPage locale="en" slug="qc-guide" />;
}
