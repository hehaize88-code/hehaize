export type PolicySection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type PolicyPageData = {
  slug: "about" | "contact" | "editorial-policy" | "privacy" | "terms";
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: PolicySection[];
  contactEmail?: string;
};

export const policyPages: Record<PolicyPageData["slug"], PolicyPageData> = {
  about: {
    slug: "about",
    eyebrow: "About / Independent guide",
    title: "Research first. Route clearly.",
    description: "What UUFinds Sheet publishes, why it exists and how it stays independent from the services it discusses.",
    updated: "July 23, 2026",
    sections: [
      {
        heading: "What this site is",
        paragraphs: [
          "UUFinds Sheet is an independent editorial guide for people researching product links, available QC material and the next browsing step on CNBuy Sheet.",
          "The site does not claim to be UUFinds, does not process orders and does not sell the products shown in its category or product pages.",
        ],
      },
      {
        heading: "What readers can expect",
        paragraphs: [
          "Guides separate a product-discovery lead from QC evidence and current destination-page facts. A saved image, an older QC album and a live listing answer different questions and should not be treated as interchangeable.",
        ],
        points: [
          "Clear labels for independent editorial content",
          "Direct, identifiable CNBuy Sheet category and product routes",
          "Dated source checks where features or listing details can change",
          "Corrections when a supported factual error is identified",
        ],
      },
      {
        heading: "Commercial relationship",
        paragraphs: [
          "All outbound shopping, category and product links published on this site lead only to CNBuy Sheet. Editorial pages may discuss publicly described UUFinds functions for research context, but the site is not affiliated with, endorsed by or operated by UUFinds.",
        ],
      },
    ],
  },
  contact: {
    slug: "contact",
    eyebrow: "Contact / Corrections welcome",
    title: "Tell us what needs attention.",
    description: "Contact UUFinds Sheet about factual corrections, broken routes, privacy questions or editorial policy.",
    updated: "July 23, 2026",
    contactEmail: "contact@uufindssheet.com",
    sections: [
      {
        heading: "Editorial and website contact",
        paragraphs: [
          "For a factual correction, broken link, policy question or technical problem, email the address below. Include the page URL and the specific statement or route that needs review.",
        ],
        points: [
          "Factual or source correction",
          "Broken internal, category or product route",
          "Privacy or data-handling question",
          "Copyright or rights-holder enquiry",
        ],
      },
      {
        heading: "What to include",
        paragraphs: [
          "A precise page URL and a short explanation help us verify the issue. When a correction depends on a public source, include the source URL and the date you viewed it. Do not send passwords, order credentials or payment information.",
        ],
      },
      {
        heading: "Product and order support",
        paragraphs: [
          "UUFinds Sheet does not process purchases, shipping, returns or refunds. Questions about a live product, order or service term should be directed to the platform responsible for that transaction.",
        ],
      },
    ],
  },
  "editorial-policy": {
    slug: "editorial-policy",
    eyebrow: "Editorial policy / Source before claim",
    title: "How information earns a place here.",
    description: "The sourcing, review, independence and correction standards used by UUFinds Sheet.",
    updated: "July 23, 2026",
    sections: [
      {
        heading: "Source standard",
        paragraphs: [
          "Feature statements are checked against current public pages from the service being discussed, its official app listing or another directly attributable primary source. A third-party comment can illustrate an experience, but it does not establish a platform-wide fact.",
        ],
      },
      {
        heading: "Evidence boundaries",
        paragraphs: [
          "The articles distinguish what is visible from what is inferred. A listing image is not automatically a warehouse QC photo, one photographed unit does not guarantee a later batch, and an old guide does not override current price, stock, sizing or service terms.",
        ],
        points: [
          "No invented QC-photo counts, fees, shipping prices or exchange-rate markups",
          "No guarantee of quality, authenticity, availability or future batch consistency",
          "Dates attached to facts that can materially change",
          "Exact product or seller matching before QC evidence is treated as relevant",
        ],
      },
      {
        heading: "Independence and corrections",
        paragraphs: [
          "Editorial conclusions are not supplied by UUFinds. Shopping routes are limited to CNBuy Sheet and are kept visibly separate from source notes. Supported correction requests are reviewed against the strongest available source and the affected page is updated when necessary.",
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    eyebrow: "Privacy / Minimal collection",
    title: "Useful measurement without ad tracking.",
    description: "What technical and click information UUFinds Sheet processes, why it is used and what the site does not collect.",
    updated: "July 23, 2026",
    sections: [
      {
        heading: "Technical delivery",
        paragraphs: [
          "The site is delivered through Cloudflare. Like other web infrastructure providers, Cloudflare may process request information needed to serve pages securely, prevent abuse and diagnose failures.",
        ],
      },
      {
        heading: "First-party site measurement",
        paragraphs: [
          "UUFinds Sheet records privacy-limited page-view and click events through a same-origin endpoint. An event can contain the current page path, a short link label and the destination host and path. Search phrases, form field values, passwords and payment information are not included.",
          "This measurement is used to understand which guides, categories and product routes are useful and to find broken navigation. The tracker does not set an advertising cookie and does not create a cross-site advertising profile.",
        ],
      },
      {
        heading: "Contact and external destinations",
        paragraphs: [
          "If you email the site, the information you choose to send is used to review and answer that request. When you follow an external CNBuy Sheet link, the destination site applies its own privacy terms.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    eyebrow: "Terms / Editorial use",
    title: "Use the guide as research, not a guarantee.",
    description: "The terms that apply when using UUFinds Sheet content, product routes and independent research guidance.",
    updated: "July 23, 2026",
    sections: [
      {
        heading: "Informational purpose",
        paragraphs: [
          "Content is provided for general research and educational purposes. UUFinds Sheet does not sell products, act as a purchasing agent, process payment or make a purchasing decision for the reader.",
        ],
      },
      {
        heading: "Changing information",
        paragraphs: [
          "Prices, stock, variants, seller information, links, shipping terms and platform features can change after a page is reviewed. Confirm material commercial information on the live destination page before acting.",
        ],
        points: [
          "A product image is not a guarantee of the delivered item",
          "QC media documents a particular photographed item or batch",
          "No statement on this site guarantees authenticity, legality or fitness for a purpose",
          "Readers are responsible for following laws and platform terms that apply to them",
        ],
      },
      {
        heading: "Names, links and availability",
        paragraphs: [
          "Third-party names and links are used to identify the service or destination being discussed. Their appearance does not imply endorsement or affiliation. The site may correct, replace or remove content and routes when information changes or a rights issue is supported.",
        ],
      },
    ],
  },
};
