import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All CSSBuy Spreadsheet Finds 2026",
  description: "Search and filter checked CSSBuy spreadsheet finds by category, recorded CNY value, and product name, with individual research pages and matching product routes.",
  alternates: { canonical: "/products" },
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
