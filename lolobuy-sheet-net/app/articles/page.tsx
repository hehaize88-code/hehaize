import { GuidePage } from "../guide-page";
import { coreMetadata } from "../seo";

export const metadata = coreMetadata("en", "/articles");

export default function ArticlesPage() {
  return <GuidePage kind="articles" />;
}
