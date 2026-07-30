import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";

export const metadata: Metadata = {
  title: "About Joyagoo China",
  description:
    "Learn how Joyagoo China researches platform policies and connects readers to matching product listings.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return <LocalizedPage locale="en" slug="about" />;
}
