import type { Metadata } from "next";
import { GuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "LoloBuy Product Categories",
  description:
    "Browse shoes, hoodies, jackets and accessories through focused main-catalog category links.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return <GuidePage kind="categories" />;
}
