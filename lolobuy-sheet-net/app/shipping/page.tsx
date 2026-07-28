import type { Metadata } from "next";
import { GuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "LoloBuy Shipping Cost and Parcel Planning Guide",
  description:
    "Understand LoloBuy shipping cost variables, route restrictions, actual and volumetric weight, consolidation and packing choices.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return <GuidePage kind="shipping" />;
}
