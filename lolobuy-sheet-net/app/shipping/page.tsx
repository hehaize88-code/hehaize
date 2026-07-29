import { GuidePage } from "../guide-page";
import { coreMetadata } from "../seo";

export const metadata = coreMetadata("en", "/shipping");

export default function ShippingPage() {
  return <GuidePage kind="shipping" />;
}
