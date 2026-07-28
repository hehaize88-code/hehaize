import type { Metadata } from "next";
import { GuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "LoloBuy QC Photos and Warehouse Inspection Guide",
  description:
    "Use a fact-checked LoloBuy QC checklist for item identity, variants, measurements, visible condition and the limits of warehouse photos.",
  alternates: { canonical: "/qc-guide" },
};

export default function QcGuidePage() {
  return <GuidePage kind="qc-guide" />;
}
