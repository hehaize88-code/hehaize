import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";

export const metadata: Metadata = {
  title: "Joyagoo QC Photos: A Practical Inspection Checklist",
  description:
    "Use this Joyagoo QC checklist to inspect colour, size, construction, details and packaging before the return window ends.",
  alternates: { canonical: "/qc-guide/" },
};

export default function QcGuidePage() {
  return <LocalizedPage locale="en" slug="qc-guide" />;
}
