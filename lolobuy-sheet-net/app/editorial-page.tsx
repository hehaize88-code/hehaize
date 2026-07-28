import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-shell";

export type EditorialPageKind =
  | "about"
  | "editorial-policy"
  | "research-method"
  | "contact";

type EditorialSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type EditorialPageRecord = {
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  reviewed: string;
  pageType: "AboutPage" | "ContactPage" | "WebPage";
  sections: EditorialSection[];
};

const records: Record<EditorialPageKind, EditorialPageRecord> = {
  about: {
    eyebrow: "About this independent publication",
    title: "Who writes LoloBuy Sheet—and what this site is for",
    description:
      "Meet LoloBuy Sheet Editorial, understand the site's independent scope, and see how product discovery, QC and shipping guidance are maintained.",
    summary:
      "LoloBuy Sheet is an independent product-discovery and educational publication. It organizes matched product links and explains the checks that remain after discovery: reading a live listing, recording the selected option, reviewing warehouse evidence and planning a parcel. It is not LoloBuy, does not represent LoloBuy staff and does not sell, purchase, inspect, store or ship products.",
    reviewed: "28 July 2026",
    pageType: "AboutPage",
    sections: [
      {
        heading: "The author name used on this site",
        paragraphs: [
          "Long-form guides are written under the byline “LoloBuy Sheet Editorial.” That name identifies the editorial function responsible for research, drafting, fact checks, updates and corrections. It is an organizational byline, not a claim that the writer is a LoloBuy employee, a warehouse inspector or an individual customer whose order proves a universal result.",
          "An organizational byline is appropriate here because a guide can be revised across several review cycles. The visible byline, last-reviewed date and publishing links are kept together so readers can see who is responsible for the page and which standard was applied.",
        ],
      },
      {
        heading: "What the publication covers",
        paragraphs: [
          "The product directory helps readers move from a broad product idea to a matched destination page. Editorial guides then address the decisions a thumbnail cannot make: whether the live listing still matches, which variant is selected, what warehouse photographs can reveal, how chargeable weight can differ from scale weight and which details should be saved before payment.",
          "Coverage is intentionally decision-focused. An article should leave the reader with a usable checklist, a clearer distinction between fact and uncertainty, or a record they can preserve for the next stage of an order.",
        ],
        bullets: [
          "Product discovery, search terms and source-link preservation",
          "Variant, sizing and seller-listing checks before ordering",
          "Visible warehouse QC evidence and its limitations",
          "Parcel dimensions, route eligibility, packing and tracking records",
        ],
      },
      {
        heading: "What the publication does not claim",
        paragraphs: [
          "This site does not guarantee stock, price, product quality, authenticity, fit, delivery time, customs treatment or the outcome of a support request. Seller inventory, platform options, routes and laws can change. A dated public statement is reported as a statement; it is not converted into a promise for every account or destination.",
          "The site also avoids publishing an unsupported universal number for fees, free photographs or additional services when the public source does not establish one. Readers are directed to the live order, warehouse or parcel interface for information that depends on the active account.",
        ],
      },
      {
        heading: "Independence and commercial boundaries",
        paragraphs: [
          "LoloBuy Sheet is not an official LoloBuy website. Educational navigation stays on this publication. Product cards and category actions lead only to the associated main catalog pages that were matched during catalog review; the site does not add clickable links to LoloBuy or competing directories.",
          "Editorial conclusions are not based on a manufactured star rating. If customer experiences are discussed in a future article, the evidence must be identifiable as individual experience, dated where possible and separated from official claims and referral-driven promotion.",
        ],
      },
    ],
  },
  "editorial-policy": {
    eyebrow: "Publishing principles",
    title: "Editorial policy: facts, examples and uncertainty stay separate",
    description:
      "Read the LoloBuy Sheet editorial policy for sourcing, factual claims, reviews, corrections, updates and independent product guidance.",
    summary:
      "Every page is written to answer a real research question without inventing precision. The policy below governs official claims, live variables, worked examples, customer reports, affiliate-style language, product safety and corrections.",
    reviewed: "28 July 2026",
    pageType: "WebPage",
    sections: [
      {
        heading: "Source hierarchy",
        paragraphs: [
          "Official public LoloBuy information is the first source for describing the platform's public workflow. The current page is checked and the review date is recorded. A public statement is paraphrased conservatively and attributed as something the service states, rather than presented as an independently verified guarantee.",
          "Live seller and destination pages are the source for a product's current options, stock, price and seller notes. Because these details can change after a catalog review, the directory never treats a cached card as the final purchase record.",
        ],
        bullets: [
          "Official public pages for the service's stated workflow",
          "Current destination pages for product and seller variables",
          "Primary legal or carrier material when a rule is discussed",
          "Detailed customer reports only as labeled individual evidence",
        ],
      },
      {
        heading: "No invented fees, ratings or customer stories",
        paragraphs: [
          "If a stable public source does not establish a fee, exchange-rate markup, photograph allowance, video option, coupon or fixed shipping rate, the article says that the figure must be checked in the live interface. It does not copy an old number from another guide and does not fill the gap with an estimate that looks official.",
          "The same rule applies to social proof. The site does not create quotations, order screenshots, star averages or first-person experiences that did not occur. A review article may synthesize public experiences only when the underlying reports are sufficiently detailed and the limitations are made clear.",
        ],
      },
      {
        heading: "Worked examples are labeled",
        paragraphs: [
          "Calculations are useful for explaining dimensional weight, consolidation or complete cost stages, but an example must not look like a live quote. The inputs, assumptions and result are labeled as illustrative. If a divisor or billing rule varies by route, the article explicitly tells the reader to use the current rule shown for the eligible route.",
          "Examples are chosen to teach a method that remains useful when prices change. They are not predictions about what a specific user will pay.",
        ],
      },
      {
        heading: "Safety, authenticity and legal limits",
        paragraphs: [
          "General photographs cannot establish authenticity, material composition, electrical safety, battery health, regulatory compliance or long-term performance. Articles do not encourage readers to treat a spreadsheet label or community comment as proof for those questions.",
          "Customs, tax and restricted-item information is destination-specific and time-sensitive. Editorial copy explains the planning question and points readers to current applicable rules rather than making a universal clearance promise.",
        ],
      },
      {
        heading: "Corrections and material updates",
        paragraphs: [
          "A correction is warranted when a factual statement is unsupported, a source has materially changed, a link no longer matches its item or wording hides an important limitation. The page's modified date changes only when the page itself receives a meaningful editorial update; the sitemap is not globally refreshed to manufacture recency.",
          "Small typographic fixes do not receive a misleading new review date. Material changes should be reflected in the visible copy, structured data and page-level sitemap record together.",
        ],
      },
    ],
  },
  "research-method": {
    eyebrow: "Sources and research method",
    title: "How a LoloBuy Sheet guide is researched and checked",
    description:
      "See the source hierarchy, claim-checking method, link verification, review handling and update process used by LoloBuy Sheet Editorial.",
    summary:
      "The method is designed around traceability: identify the reader's decision, locate the strongest available source, record the date, separate fixed facts from live variables, write the practical check and test the published page.",
    reviewed: "28 July 2026",
    pageType: "WebPage",
    sections: [
      {
        heading: "1. Define the decision before collecting keywords",
        paragraphs: [
          "Research begins with the problem the reader must solve: locating an exact source, choosing a variant, judging visible warehouse evidence or comparing parcel routes. Keywords are mapped to that decision instead of being repeated as filler. A page should be able to answer its core query even if every promotional phrase is removed.",
          "This is why separate pages exist for products, categories, QC, shipping, FAQs and long-form guides. Each page has a distinct job and links to the next logical stage rather than splitting one shallow answer across several URLs.",
        ],
      },
      {
        heading: "2. Check official public information",
        paragraphs: [
          "For statements about the service workflow, the current public LoloBuy page is reviewed first. The check records what the page actually confirms and what it does not establish. On 28 July 2026, the public flow described product-link ordering, warehouse inspection and photographs, 90 days of free storage, parcel submission and global shipping.",
          "The absence of a public universal number is also a research result. Where the public page does not establish one photo allowance, extra-image price, video price or worldwide shipping rate, the article does not invent one.",
        ],
      },
      {
        heading: "3. Separate stable statements from live variables",
        paragraphs: [
          "Platform workflow statements can remain useful for a period, but seller inventory, variants, price, domestic delivery, return eligibility, route availability and the final parcel quote can change by order. Each claim is classified before writing so a live variable is not presented as a permanent fact.",
          "The copy tells the reader where the current answer exists: the live seller listing for an option, the warehouse order record for available photographs, and the packed parcel interface for eligible routes and chargeable weight.",
        ],
      },
      {
        heading: "4. Verify product-card evidence",
        paragraphs: [
          "A product card is checked as a pair: its locally served image and all visible actions must point to the same destination item. Duplicate or mismatched destinations undermine both usefulness and trust, so image-to-link consistency is treated as a technical and editorial requirement.",
          "Catalog review does not guarantee that the seller will keep the page unchanged. Product cards therefore use cautious language and instruct readers to re-open the destination before ordering.",
        ],
      },
      {
        heading: "5. Handle customer experiences conservatively",
        paragraphs: [
          "Customer reports are not interchangeable with official documentation. When public reviews are researched, stronger evidence includes an identifiable product or parcel, dates, route, photographs, tracking events and a described support outcome. A rating without order detail or a referral-driven caption carries less weight.",
          "A collection of individual reports may reveal recurring questions, but it does not prove that every user will receive the same result. Editorial language preserves that distinction.",
        ],
      },
      {
        heading: "6. Test the published evidence",
        paragraphs: [
          "Before publication, canonical URLs, language alternates, sitemap entries, structured data, internal links and page responses are checked together. The visible author, checked date and editorial links must agree with the Article structured data rather than existing only for search engines.",
          "Content-depth checks count the readable page after navigation and scripts are removed. The goal is not to reach a number by padding; it is to make each standalone URL useful without forcing the reader to reconstruct the answer from the homepage.",
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Contact scope and corrections",
    title: "Know where to take an editorial, product or order question",
    description:
      "Understand the contact scope for LoloBuy Sheet, what belongs in an editorial correction, and where account or order support must be handled.",
    summary:
      "LoloBuy Sheet is an independent static publication and does not operate an order-support desk. This page explains the correct destination for different questions and the evidence needed for a future editorial correction channel.",
    reviewed: "28 July 2026",
    pageType: "ContactPage",
    sections: [
      {
        heading: "Editorial corrections",
        paragraphs: [
          "A useful correction identifies the exact page URL, the sentence or product card in question, why it may be wrong, the strongest available source and the date that source was checked. For a mismatched product card, include the item number and describe whether the image, title or destination is inconsistent.",
          "This static site does not currently publish a verified editorial inbox or collect messages through a form. A mailbox or submission channel will be listed only after its domain routing and ownership are verified. Until then, the site will not invent a contact address that may silently reject mail.",
        ],
        bullets: [
          "Exact page URL and affected sentence or item number",
          "Primary source or current destination page",
          "Date observed and a concise explanation of the conflict",
          "No passwords, payment details, identity documents or private order data",
        ],
      },
      {
        heading: "Order, payment and warehouse support",
        paragraphs: [
          "Questions about payment, purchasing status, returns, warehouse photographs, storage counters, parcel quotes or tracking require access to the actual order record. They must be handled through the support entry inside the service account used for the order.",
          "LoloBuy Sheet cannot view an account, change an order, approve a return, request a photograph, select a route or locate a parcel. Anyone claiming to perform those actions on behalf of this independent site should not receive account credentials or payment.",
        ],
      },
      {
        heading: "Product availability and seller questions",
        paragraphs: [
          "Open the matched destination page again for current stock, variants, seller notes and domestic delivery. A catalog card records a reviewed match, not a permanent seller commitment. If the page has changed products or no longer exposes the selected option, do not rely on the older card.",
          "Keep a dated source record before ordering. That record is the most useful starting point when the purchasing service needs clarification.",
        ],
      },
      {
        heading: "Privacy boundary",
        paragraphs: [
          "This publication does not need passports, payment-card details, account passwords, full delivery addresses or private warehouse records. Do not post those details in a public correction request or send them to an unverified social account.",
          "When a verified editorial channel is added, its purpose will be limited to content corrections and research questions. It will not become an order-support substitute.",
        ],
      },
    ],
  },
};

const paths: Record<EditorialPageKind, string> = {
  about: "/about",
  "editorial-policy": "/editorial-policy",
  "research-method": "/research-method",
  contact: "/contact",
};

export function editorialMetadata(kind: EditorialPageKind): Metadata {
  const record = records[kind];
  const path = paths[kind];

  return {
    title: { absolute: `${record.title} | LoloBuy Sheet` },
    description: record.description,
    alternates: { canonical: path },
    openGraph: {
      title: record.title,
      description: record.description,
      type: "article",
      url: path,
      siteName: "LoloBuy Sheet",
      images: [
        {
          url: "/products/3359.webp",
          width: 900,
          height: 900,
          alt: "LoloBuy Sheet editorial research",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: record.title,
      description: record.description,
      images: ["/products/3359.webp"],
    },
  };
}

export function EditorialPage({ kind }: { kind: EditorialPageKind }) {
  const record = records[kind];
  const canonical = `https://lolobuy-sheet.net${paths[kind]}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": record.pageType,
    name: record.title,
    description: record.description,
    url: canonical,
    inLanguage: "en",
    dateModified: "2026-07-28",
    author: {
      "@type": "Organization",
      name: "LoloBuy Sheet Editorial",
      url: "https://lolobuy-sheet.net/about",
    },
    publisher: {
      "@type": "Organization",
      name: "LoloBuy Sheet",
      url: "https://lolobuy-sheet.net/",
      publishingPrinciples:
        "https://lolobuy-sheet.net/editorial-policy",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="subpage-main editorial-page" data-i18n-ignore>
        <section className="subpage-hero editorial-page-hero">
          <div>
            <p className="subpage-breadcrumb">
              <Link href="/">Home</Link> <span>/</span> {record.eyebrow}
            </p>
            <p className="eyebrow">{record.eyebrow}</p>
            <h1>{record.title}</h1>
            <p>{record.summary}</p>
          </div>
        </section>
        <div className="editorial-page-layout">
          <aside className="editorial-profile" aria-label="Editorial identity">
            <p className="footer-label">RESPONSIBLE EDITOR</p>
            <h2>LoloBuy Sheet Editorial</h2>
            <p>
              Independent product-discovery research, fact checks and practical
              buying guidance.
            </p>
            <dl>
              <div>
                <dt>Last reviewed</dt>
                <dd>{record.reviewed}</dd>
              </div>
              <div>
                <dt>Affiliation</dt>
                <dd>Independent; not LoloBuy</dd>
              </div>
            </dl>
            <nav aria-label="Editorial information">
              <Link href="/about">About</Link>
              <Link href="/editorial-policy">Editorial policy</Link>
              <Link href="/research-method">Sources & research method</Link>
              <Link href="/contact">Contact & corrections</Link>
            </nav>
          </aside>
          <div className="editorial-page-content">
            {record.sections.map((section, index) => (
              <section key={section.heading}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
