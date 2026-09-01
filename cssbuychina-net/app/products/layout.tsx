import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSSBuy Finds 2026: Shoes, Hoodies, Jerseys & More",
  description: "Search 30 current CSSBuy finds by product or category. Compare USD estimates and open each matching shoes, clothing, jersey or accessory link directly.",
  alternates: { canonical: "/products" },
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
