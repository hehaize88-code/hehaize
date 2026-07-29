import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-shell";

export type EditorialPageKind =
  | "about"
  | "editorial-policy"
  | "research-method"
  | "contact"
  | "privacy-policy"
  | "terms"
  | "independent-disclosure";

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
    reviewed: "29 July 2026",
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
          "LoloBuy Sheet is not an official LoloBuy website. Educational navigation stays on this publication. Product cards, category actions and catalog search lead only to the associated main catalog at cnbuycha.com; the operator may benefit commercially from visits or purchases there. That relationship is disclosed rather than presented as a neutral third-party recommendation.",
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
    reviewed: "29 July 2026",
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
    reviewed: "29 July 2026",
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
  "privacy-policy": {
    eyebrow: "Privacy policy",
    title: "Privacy policy for this independent LoloBuy Sheet publication",
    description:
      "Learn what LoloBuy Sheet does and does not collect, how hosting requests and outbound catalog links work, and how to protect private order information.",
    summary:
      "LoloBuy Sheet is a public, static editorial website. It does not provide user accounts, a checkout, an order-support form or an advertising-profile system. This policy explains the limited data boundary of the publication and the separate privacy context that begins when a visitor follows an external catalog link.",
    reviewed: "29 July 2026",
    pageType: "WebPage",
    sections: [
      {
        heading: "Information this publication asks you to provide",
        paragraphs: [
          "The website does not ask visitors to create an account, enter payment information, upload identity documents or submit an order number. There is currently no editorial contact form or verified public mailbox. As a result, the publication does not intentionally collect personal data through a form on these pages.",
          "Do not send passwords, payment-card details, passport images, full delivery addresses or private warehouse records to an address or social account merely because it uses the LoloBuy Sheet name. The Contact page will identify a correction channel only after ownership and delivery have been verified.",
        ],
      },
      {
        heading: "Technical request data and hosting",
        paragraphs: [
          "Like most public websites, the hosting and security infrastructure may process ordinary request information needed to deliver and protect a page. This can include an IP address, browser or device information, requested URL, request time and security signals. That processing is performed at the infrastructure level and may be retained under the provider's own operational and security practices.",
          "The publication does not currently embed a marketing-pixel dashboard, behavioral advertising profile or third-party comment widget in its page code. If that changes materially, this policy should be updated before the new collection is treated as active.",
        ],
      },
      {
        heading: "External catalog links create a separate visit",
        paragraphs: [
          "Product, category and search actions open the associated catalog at cnbuycha.com in a separate tab. That destination is a different website with its own hosting, account, transaction and privacy practices. LoloBuy Sheet does not control the information a visitor chooses to provide after leaving this 