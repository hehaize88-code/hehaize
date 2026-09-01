import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Guides 2026: Fees, QC, Shipping & Returns" },
  description:
    "Practical Joyagoo guides covering service fees, exchange rates, QC photos, parcel shipping, storage and returns. Checked against current sources.",
  alternates: languageAlternates("/articles/"),
};

export default function ArticlesPage() {
  return <LocalizedPage locale="en" slug="articles" />;
}
