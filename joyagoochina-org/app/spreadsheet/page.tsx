import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: "Joyagoo Spreadsheet 2026 Product Directory",
  description:
    "Browse curated product finds with direct links to each matching product detail page.",
  alternates: languageAlternates("/spreadsheet/"),
};

export default function SpreadsheetPage() {
  return <LocalizedPage locale="en" slug="spreadsheet" />;
}
