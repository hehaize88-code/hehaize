import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Joyagoo China checks published sources, separates facts from advice and corrects time-sensitive information.",
  alternates: languageAlternates("/editorial-policy/"),
};

export default function EditorialPolicyPage() {
  return <LocalizedPage locale="en" slug="editorial-policy" />;
}
