import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for visitors to Joyagoo China.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return <LocalizedPage locale="en" slug="privacy" />;
}
