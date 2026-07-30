import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms for using Joyagoo China's independent product-discovery and educational content.",
  alternates: languageAlternates("/terms/"),
};

export default function TermsPage() {
  return <LocalizedPage locale="en" slug="terms" />;
}
