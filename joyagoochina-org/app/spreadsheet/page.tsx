import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Spreadsheet 2026: 36 Checked Product Links" },
  description:
    "Browse 36 Joyagoo product finds with checked matching listings, current reference prices, images and direct product links. Updated September 2026.",
  alternates: languageAlternates("/spreadsheet/"),
};

export default function SpreadsheetPage() {
  return <LocalizedPage locale="en" slug="spreadsheet" />;
}
