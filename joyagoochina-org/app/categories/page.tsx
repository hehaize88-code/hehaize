import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { languageAlternates } from "../seoAlternates";

export const metadata: Metadata = {
  title: "Joyagoo Spreadsheet Product Categories",
  description:
    "Browse shoes, clothing, accessories and other product categories through focused catalogue links.",
  alternates: languageAlternates("/categories/"),
};

export default function CategoriesPage() {
  return <LocalizedPage locale="en" slug="categories" />;
}
