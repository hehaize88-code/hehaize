import type { Metadata } from "next";
import { GuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "LoloBuy Products and Main-Site Search",
  description:
    "Search the main product catalog with your exact keyword and browse LoloBuy product finds with matched images and item pages.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return <GuidePage kind="products" />;
}
