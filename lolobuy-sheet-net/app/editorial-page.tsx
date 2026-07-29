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
          "Product, category and search actions open the associated catalog at cnbuycha.com in a separate tab. That destination is a different website with its own hosting, account, transaction and privacy practices. LoloBuy Sheet does not control the information a visitor chooses to provide after leaving this publication.",
          "Before entering personal or payment information on any destination, review the current domain, connection security and applicable privacy terms. An external link from this publication is a navigation aid and commercial disclosure; it is not a promise that another site's privacy practices will remain unchanged.",
        ],
      },
      {
        heading: "Policy changes and privacy questions",
        paragraphs: [
          "This page is reviewed when collection methods, hosted features, contact channels or outbound destinations materially change. A sitemap date changes only for a real policy update, not for a routine rebuild.",
          "Privacy questions about an order, payment, warehouse record or parcel belong with the service that holds that record. Questions about this publication's wording or a suspected on-site collection method belong in the editorial correction process described on the Contact page.",
        ],
      },
    ],
  },
  terms: {
    eyebrow: "Terms of use",
    title: "Terms of use for LoloBuy Sheet",
    description:
      "Read the scope, limitations, external-link terms, intellectual-property boundaries and acceptable-use rules for the independent LoloBuy Sheet publication.",
    summary:
      "These terms apply to use of the editorial pages and product-discovery directory at lolobuy-sheet.net. They do not replace the terms of a seller, shopping service, warehouse, payment provider, carrier, customs authority or the associated external catalog.",
    reviewed: "29 July 2026",
    pageType: "WebPage",
    sections: [
      {
        heading: "Informational scope",
        paragraphs: [
          "LoloBuy Sheet provides product-discovery links and educational material about listing review, warehouse photographs and parcel planning. It does not accept orders, take payment, purchase goods, inspect warehouse arrivals, select shipping routes or provide account support.",
          "Information is prepared carefully but can become outdated as sellers change listings, inventory, options and prices, or as routes and platform terms change. Use the live destination page and the applicable account terms for an active transaction.",
        ],
      },
      {
        heading: "No guarantee of product or transaction outcomes",
        paragraphs: [
          "A catalog match is not a guarantee of stock, quality, fit, authenticity, safety, legality, delivery time, customs treatment or support outcome. Warehouse photographs can document visible condition but cannot establish hidden construction, provenance, long-term performance or regulatory compliance.",
          "If authenticity, product safety or brand authorization is a requirement, use authorized channels and appropriate documentation. Do not rely on a generic directory title, thumbnail, community comment or visual comparison as proof.",
        ],
      },
      {
        heading: "External links and commercial context",
        paragraphs: [
          "Product, category and search links lead to the associated catalog at cnbuycha.com. The operator may benefit commercially from visits or purchases made after a visitor follows those links. The external catalog controls its own listings, accounts, transaction terms and privacy practices.",
          "Opening a destination does not create an endorsement by LoloBuy or by a manufacturer. Visitors should confirm the destination domain, current listing and legal eligibility before taking action.",
        ],
      },
      {
        heading: "Names, images and intellectual-property boundaries",
        paragraphs: [
          "Third-party names and visual references may appear only to identify a research subject, a platform discussed in editorial coverage or the destination item being reviewed. All third-party trademarks and copyrights remain the property of their respective owners. Their appearance does not imply sponsorship, authorization or affiliation.",
          "Catalog titles use neutral descriptive wording when a brand attribution has not been independently verified. A card may be corrected or removed when its destination changes, a rights concern is identified or the description can no longer be supported.",
        ],
      },
      {
        heading: "Acceptable use and updates",
        paragraphs: [
          "Do not use the publication to impersonate its editors, solicit private order information, misrepresent an affiliation, automate abusive requests or interfere with site availability. Lawful quoting and linking should preserve the page's independent context rather than present its guidance as an official service statement.",
          "These terms may be revised when the site's features, commercial relationships or legal boundaries materially change. Continued use after an update means the current version governs use of the publication from that point forward.",
        ],
      },
    ],
  },
  "independent-disclosure": {
    eyebrow: "Independent-site and commercial disclosure",
    title: "Independent-site, affiliation and catalog-link disclosure",
    description:
      "Understand LoloBuy Sheet's independence from LoloBuy and product brands, its relationship with cnbuycha.com, and how editorial and catalog decisions are separated.",
    summary:
      "LoloBuy Sheet is not LoloBuy, is not an official LoloBuy service and is not endorsed by the product brands that may appear on destination pages. The publication is independent editorially, while its product, category and search actions promote an associated external catalog. That commercial context is disclosed here so readers can weigh the guidance appropriately.",
    reviewed: "29 July 2026",
    pageType: "WebPage",
    sections: [
      {
        heading: "No official LoloBuy affiliation",
        paragraphs: [
          "The site name describes the subject of the guides and directory. It does not mean that LoloBuy operates, approves, sponsors or supplies this publication. LoloBuy Sheet cannot access LoloBuy accounts, order records, warehouse photographs, storage counters, returns, parcels or support conversations.",
          "Statements about LoloBuy's public workflow are attributed to public information and checked on the date shown. They are not rewritten as a guarantee for every account, seller, route or destination.",
        ],
      },
      {
        heading: "Associated catalog and potential commercial benefit",
        paragraphs: [
          "Product cards, category buttons and catalog search open cnbuycha.com, the associated main catalog. The operator may benefit commercially when visitors use that catalog or make purchases there. Readers should therefore treat those outbound actions as promotional as well as functional.",
          "The presence, order or design of a product card is not an independent laboratory rating. The publication does not create a star score, fabricate a customer quotation or describe a placement as 'best' merely because it can generate a commercial visit.",
        ],
      },
      {
        heading: "No product-brand endorsement or authenticity claim",
        paragraphs: [
          "Product cards use neutral descriptive titles when brand authorization or provenance has not been verified. A neutral title does not certify that the destination item is genuine, authorized, safe or lawful in a particular country.",
          "Third-party trademarks remain the property of their owners. Their appearance in a source image or on a destination page does not mean the owner sponsors LoloBuy Sheet, LoloBuy or cnbuycha.com. If verified authenticity is required, use authorized retail channels and documentation designed for that purpose.",
        ],
      },
      {
        heading: "How catalog cards are reviewed",
        paragraphs: [
          "A card is reviewed as an image, neutral description and destination pair. It should be removed or corrected when the target becomes unavailable, changes to another product, no longer supports the description or raises a substantiated rights or safety concern.",
          "Availability and seller content can change after review. Visitors must re-open the live listing before ordering. The visible catalog-review date records the latest editorial pass; it is not a promise that every seller page will remain unchanged until the next visit.",
        ],
      },
      {
        heading: "Editorial independence and corrections",
        paragraphs: [
          "Guides separate official public statements, live seller variables, worked examples and individual customer reports. Fees, photo allowances, shipping rates, ratings and customer stories are not invented to make a commercial action more persuasive.",
          "A substantiated correction should identify the exact page or item, the disputed wording, the strongest current source and the observation date. The Contact page explains the site's current correction boundary and why no unverified email address is published.",
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
    reviewed: "29 July 2026",
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
  "privacy-policy": "/privacy-policy",
  terms: "/terms",
  "independent-disclosure": "/independent-disclosure",
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
          url: "/social/editorial-standards.png",
          width: 1200,
          height: 630,
          alt: "Independent editorial standards for LoloBuy Sheet",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: record.title,
      description: record.description,
      images: ["/social/editorial-standards.png"],
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
    dateModified: "2026-07-29",
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
              <Link href="/privacy-policy">Privacy policy</Link>
              <Link href="/terms">Terms of use</Link>
              <Link href="/independent-disclosure">
                Independence & commercial disclosure
              </Link>
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
