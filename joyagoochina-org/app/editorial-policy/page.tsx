import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Joyagoo China checks published sources, separates facts from advice and corrects time-sensitive information.",
  alternates: { canonical: "/editorial-policy/" },
};

export default function EditorialPolicyPage() {
  return <LocalizedPage locale="en" slug="editorial-policy" />;
}
