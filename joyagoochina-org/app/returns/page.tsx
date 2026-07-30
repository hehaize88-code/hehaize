import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";

export const metadata: Metadata = {
  title: "Joyagoo Return Policy: The 5-Day QC Window Explained",
  description:
    "Understand Joyagoo's published five-day return-request window, eligibility limits, packaging conditions and possible return costs.",
  alternates: { canonical: "/returns/" },
};

export default function ReturnsPage() {
  return <LocalizedPage locale="en" slug="returns" />;
}
