import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSSBuy Links & Spreadsheet 2026: Product Finds by Category",
  description: "Search a CSSBuy spreadsheet by product or category, compare recorded CNY values and use current warehouse QC and parcel checks before ordering.",
  alternates: { canonical: "/products" },
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
