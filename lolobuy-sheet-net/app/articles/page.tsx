import type { Metadata } from "next";
import { GuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "LoloBuy Buying Guides: Spreadsheet, QC and Shipping",
  description:
    "Read fact-checked 1,200–1,800 word LoloBuy spreadsheet, QC and shipping guides written around real buying decisions.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return <GuidePage kind="articles" />;
}
