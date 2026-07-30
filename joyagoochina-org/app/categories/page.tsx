import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";

export const metadata: Metadata = {
  title: "Joyagoo Spreadsheet Product Categories",
  description:
    "Browse shoes, clothing, accessories and other product categories through focused catalogue links.",
  alternates: { canonical: "/categories/" },
};

export default function CategoriesPage() {
  return <LocalizedPage locale="en" slug="categories" />;
}
