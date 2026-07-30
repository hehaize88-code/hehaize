import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for visitors to Joyagoo China.",
  alternates: languageAlternates("/privacy/"),
};

export default function PrivacyPage() {
  return <LocalizedPage locale="en" slug="privacy" />;
}
