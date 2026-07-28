import { GuidePage } from "../guide-page";
import { coreMetadata } from "../seo";

export const metadata = coreMetadata("en", "/products");

export default function ProductsPage() {
  return <GuidePage kind="products" />;
}
