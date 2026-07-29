import { GuidePage } from "../guide-page";
import { coreMetadata } from "../seo";

export const metadata = coreMetadata("en", "/categories");

export default function CategoriesPage() {
  return <GuidePage kind="categories" />;
}
