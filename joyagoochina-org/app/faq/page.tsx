import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: "Joyagoo Spreadsheet FAQ",
  description:
    "Answers about Joyagoo spreadsheet product links, warehouse QC, returns and this independent website.",
  alternates: languageAlternates("/faq/"),
};

export default function FaqPage() {
  return <LocalizedPage locale="en" slug="faq" />;
}
