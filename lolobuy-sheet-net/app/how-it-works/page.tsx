import { GuidePage } from "../guide-page";
import { coreMetadata } from "../seo";

export const metadata = coreMetadata("en", "/how-it-works");

export default function HowItWorksPage() {
  return <GuidePage kind="how-it-works" />;
}
