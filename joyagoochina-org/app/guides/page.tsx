import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: "Joyagoo Guides: Buying, QC, Shipping & Returns",
  description:
    "Browse independent Joyagoo guides covering the buying workflow, QC photos, international shipping, storage and returns.",
  alternates: languageAlternates("/guides/"),
};

export default function GuidesPage() {
  return <LocalizedPage locale="en" slug="guides" />;
}
