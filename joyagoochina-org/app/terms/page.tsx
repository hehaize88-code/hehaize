import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms for using Joyagoo China's independent product-discovery and educational content.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return <LocalizedPage locale="en" slug="terms" />;
}
