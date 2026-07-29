import { GuidePage } from "../guide-page";
import { coreMetadata } from "../seo";

export const metadata = coreMetadata("en", "/qc-guide");

export default function QcGuidePage() {
  return <GuidePage kind="qc-guide" />;
}
