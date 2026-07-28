import type { Metadata } from "next";
import { GuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "How the LoloBuy Product-Finding Flow Works",
  description:
    "Follow a product from matched catalog page to listing review, source preservation, warehouse QC and parcel planning.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return <GuidePage kind="how-it-works" />;
}
