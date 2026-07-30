import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";

export const metadata: Metadata = {
  title: "Joyagoo Spreadsheet FAQ",
  description:
    "Answers about Joyagoo spreadsheet product links, warehouse QC, returns and this independent website.",
  alternates: { canonical: "/faq/" },
};

export default function FaqPage() {
  return <LocalizedPage locale="en" slug="faq" />;
}
