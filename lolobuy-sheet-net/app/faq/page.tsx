import type { Metadata } from "next";
import { GuidePage } from "../guide-page";
import { faqItems } from "../site-data";

export const metadata: Metadata = {
  title: "LoloBuy FAQ: Spreadsheet, QC, Storage and Shipping",
  description:
    "Fact-checked answers about LoloBuy spreadsheet links, ordering, QC photos, 90-day storage, consolidation and international shipping.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GuidePage kind="faq" />
    </>
  );
}
