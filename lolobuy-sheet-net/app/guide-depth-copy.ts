import type { Locale } from "./translations";

export type CardCopy = {
  title: string;
  body: string;
  bullets?: string[];
};

export type SectionCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cards: CardCopy[];
};

type HowCopy = {
  articleEyebrow: string;
  articleTitle: string;
  articleBody: string;
  articleCta: string;
  factEyebrow: string;
  factTitle: string;
  facts: string[];
  steps: CardCopy[];
  errorEyebrow: string;
  errorTitle: string;
  errorIntro: string;
  errors: CardCopy[];
};

type CategoryCopy = SectionCopy & {
  decisionEyebrow: string;
  decisionTitle: string;
  decisionIntro: string;
  decisions: CardCopy[];
};

type GuideDepthCopy = {
  products: SectionCopy;
  categories: CategoryCopy;
  how: HowCopy;
  qc: SectionCopy;
  shipping: SectionCopy;
  articles: SectionCopy;
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    points: string[];
  };
  articleSummaries: Record<string, string>;
};

export const guideDepthCopy: Record<Locale, GuideDepthCopy> = {
  en: {
    products: {
      eyebrow: "A repeatable product-screening method",
      title: "Filter a result before it becomes an order",
      intro:
        "A useful product page should reduce uncertainty. Work from the exact search term to a short list, then verify the live listing and preserve the option you intend to submit.",
      cards: [
        {
          title: "Start narrow, then broaden once",
          body:
            "Search the stable part of the name first: product type, model or silhouette. Add one useful qualifier such as material, color or version only when the first result set is too broad. Repeatedly changing several words at once makes it difficult to tell whether a better result came from the model name or from an unrelated keyword.",
          bullets: [
            "Try the model or product type first",
            "Add one visual or material qualifier",
            "Use a category only when the exact term is unknown",
          ],
        },
        {
          title: "Compare options, not hero images",
          body:
            "One marketplace page can group different colors, bundles, qualities or accessories under the same cover image. Open the option selector, note which choice changes the price and confirm that the selected row describes the item shown in your saved order note. A low headline price may belong to a deposit or accessory rather than the main product.",
        },
        {
          title: "Treat every catalog check as dated",
          body:
            "The matched image and destination link are reviewed together, but seller stock, variants, price and delivery terms remain live information. Re-open the destination immediately before ordering. If the page now shows a different product, an unavailable option or a changed condition, the current page overrides the older catalog card.",
        },
        {
          title: "Save the decision-changing details",
          body:
            "Keep the source address, seller name when visible, selected size, color, version, quantity, option code and any seller note that affects what will be sent. A dated screenshot helps when a listing changes. This small record gives the warehouse photographs and any later question a concrete reference instead of relying on memory.",
        },
      ],
    },
    categories: {
      eyebrow: "Category-specific checks",
      title: "Use a different filter for each product type",
      intro:
        "A category is a research shortcut, not a quality label. The useful questions change with the product, so the shortlist should be built around fit, visible QC evidence, return limits and shipping risk.",
      cards: [
        {
          title: "Shoes: measurement beats the printed size",
          body:
            "Record the selected size system and compare an insole or outsole measurement only when the measurement method is clear. Review the pair together for model, color, sole shape, visible glue marks and obvious asymmetry. Shoe boxes can add parcel volume, so decide whether the box is important before packing.",
        },
        {
          title: "Hoodies and sweaters: check the actual garment",
          body:
            "Use a garment you own as the reference and measure it flat in the same places shown by the seller. Confirm the selected color, size label, print or embroidery placement, cuffs, hem and visible marks. A size letter alone does not establish fit, and lighting can make dark colors appear different.",
        },
        {
          title: "Jackets: define the version and included parts",
          body:
            "Jacket listings often vary by lining, season, detachable pieces or material. Save the exact option and note whether a hood, belt, liner or accessory should be included. For QC, compare closures, pockets, major panels and the back as well as the front promotional view.",
        },
        {
          title: "Accessories: match the check to the item",
          body:
            "For headwear, start with dimensions and visible shape; for eyewear, check obvious frame condition and included pieces; for watches or electronics, general photographs cannot establish battery health, electrical safety or long-term function. Do not infer authenticity or safety from a spreadsheet label or warehouse image.",
        },
      ],
      decisionEyebrow: "Before leaving the category page",
      decisionTitle: "Make three decisions explicit",
      decisionIntro:
        "A good shortlist explains why an item remains and what evidence is still missing. These checks prevent a broad category browse from turning into an ambiguous order.",
      decisions: [
        {
          title: "Fit evidence",
          body:
            "Identify the measurement, label or product dimension that can actually change your choice, and save the seller's current chart when one is provided.",
        },
        {
          title: "QC evidence",
          body:
            "Write down the visible angle, label, accessory or condition detail that must appear in the warehouse record before you accept the item.",
        },
        {
          title: "Return risk",
          body:
            "Check the live seller and platform terms early. Custom, restricted or time-sensitive items may leave less room to correct a mistaken option.",
        },
      ],
    },
    how: {
      articleEyebrow: "Complete beginner workflow",
      articleTitle: "Follow one order from product link to warehouse decision",
      articleBody:
        "The long-form guide separates the live listing, submitted order, purchasing stage, seller fulfillment and warehouse evidence. Use it when you need the transaction sequence rather than a broad discovery, QC or shipping guide.",
      articleCta: "Read how to buy from LoloBuy",
      factEyebrow: "Official workflow facts · checked 28 July 2026",
      factTitle: "What the public LoloBuy page confirms",
      facts: [
        "LoloBuy says a shopper can paste a product link to place an order and that it assists with purchases from Chinese online and offline channels.",
        "After a merchant sends goods to the warehouse, the public page describes quality inspection, photographs and 90 days of free storage.",
        "The public flow also says stored products can be selected and submitted as one parcel for global shipping. Live account terms still govern each order.",
      ],
      steps: [
        {
          title: "Find the exact source",
          body:
            "Use a specific search or category to reach the closest match. Open the destination page and confirm that its title, image and available options describe the product you intended to find.",
        },
        {
          title: "Read the live listing",
          body:
            "Check seller information, option selectors, current price, domestic delivery and notes about pre-orders, bundles or return limits. The live page—not the spreadsheet thumbnail—is the purchase record.",
        },
        {
          title: "Write a one-line order brief",
          body:
            "Record the source, exact color, size, version, quantity and any instruction that changes what should be purchased. If you cannot describe the selected option unambiguously, pause before payment.",
        },
        {
          title: "Submit the product link",
          body:
            "Paste the original address into the purchasing flow and compare the imported details with your saved brief. Resolve an incorrect price, missing option or unclear seller note before the purchase is placed.",
        },
        {
          title: "Review the warehouse arrival",
          body:
            "When the item reaches the warehouse, compare its identity, selected option, quantity and visible condition with the order record. Ask for focused evidence only when one decision-changing point remains unclear.",
        },
        {
          title: "Choose pass, question or action",
          body:
            "Accept when the visible evidence matches, ask when a specific angle or measurement can resolve uncertainty, and use the current order options promptly when a clear mismatch changes the decision.",
        },
        {
          title: "Build and submit the parcel",
          body:
            "Select accepted warehouse items, then compare eligible routes using the packed weight, dimensions, restrictions and protection choices. Save the final parcel summary and tracking record.",
        },
      ],
      errorEyebrow: "Common failure examples",
      errorTitle: "Where a seemingly simple order goes wrong",
      errorIntro:
        "Most avoidable problems begin before international shipping. These examples show the missing evidence and the safer correction.",
      errors: [
        {
          title: "The cheapest option was not the product",
          body:
            "A listing showed a low starting price, but that row described an accessory or deposit. Correction: open every selector, confirm the price after choosing the exact variant and save that selected row.",
        },
        {
          title: "A size letter replaced measurements",
          body:
            "The order note said only “L,” even though the seller chart used different dimensions. Correction: record the chosen size system and compare a flat garment measured in the same locations.",
        },
        {
          title: "QC was compared with memory",
          body:
            "The warehouse image looked different from a social post, but the original listing and option were no longer available. Correction: save the dated source page and selected option before submitting the link.",
        },
        {
          title: "Shipping was estimated from item weight",
          body:
            "A bulky parcel cost more than an early scale-only guess. Correction: wait for packed dimensions, check the route's billing method and compare consolidation with a sensible split.",
        },
      ],
    },
    qc: {
      eyebrow: "Product-specific QC evidence",
      title: "Change the checklist when the product changes",
      intro:
        "Identity, option and visible condition come first for every order. After that, ask only for evidence that a warehouse photograph or measurement can reasonably provide.",
      cards: [
        {
          title: "Footwear",
          body:
            "Review both shoes together, visible size labels, color, sole shape, obvious marks and major asymmetry. If length matters, request one clearly positioned insole or outsole measurement and compare it with a reference measured the same way.",
        },
        {
          title: "Apparel",
          body:
            "Confirm the selected size and color, then check front, back, print or embroidery placement, closures and visible stains or tears. Flat measurements can help only when the tape placement is visible and consistent.",
        },
        {
          title: "Bags and accessories",
          body:
            "Check the overall model, color, dimensions, included strap or removable pieces, closures and visible hardware condition. General images cannot prove hidden construction, material composition or authenticity.",
        },
        {
          title: "Electronics and safety-sensitive items",
          body:
            "A photograph may confirm model labels, obvious exterior damage and included pieces, but it cannot establish battery health, electrical safety, regulatory compliance or long-term performance. Use appropriate authorized evidence for those decisions.",
        },
      ],
    },
    shipping: {
      eyebrow: "A comparable route record",
      title: "Compare routes with the same parcel inputs",
      intro:
        "A route name or old per-kilogram quote is not enough. Record the current parcel data and compare only options that accept the destination and product mix.",
      cards: [
        {
          title: "Eligibility before headline price",
          body:
            "Confirm destination, accepted product types, actual and dimensional limits, maximum size and any battery, liquid, branded-item or restricted-goods rule shown for the live route. An ineligible cheap line is not a real alternative.",
        },
        {
          title: "Service terms beside the estimate",
          body:
            "Save the stated transit range, tracking coverage, billing method, compensation conditions and the point at which the quote can change. These terms often matter more than a small difference in the first visible price.",
        },
        {
          title: "Final parcel evidence",
          body:
            "Before payment, keep the packed weight, dimensions, selected protection, declared contents, destination address, chosen route and final quote in one record. After dispatch, add the tracking number and carrier events rather than relying on an earlier estimate.",
        },
      ],
    },
    articles: {
      eyebrow: "How to use this article library",
      title: "Choose the guide for the next decision",
      intro:
        "The article index follows the order of a real buying journey. Each guide is long enough to stand alone, but the strongest reading path begins with the product record and ends with packed parcel evidence.",
      cards: [
        {
          title: "Before ordering: preserve product context",
          body:
            "Start with the spreadsheet guide when you are still choosing a source or variant. It explains search terms, W2C links, option selectors, seller evidence and the short order record to save before a listing changes. The output should be one unambiguous product brief, not a folder of unexplained screenshots.",
        },
        {
          title: "At the warehouse: compare evidence",
          body:
            "Move to the QC guide when an arrival must be compared with the order. The sequence begins with identity, option and quantity before visible condition and product-specific details. It also defines what photographs cannot prove, so a decision is not built on authenticity, fit or safety assumptions.",
        },
        {
          title: "Before international payment: build the parcel",
          body:
            "Use the shipping guide only after accepted items and realistic packed data exist. It separates cost stages and shows how dimensions, restrictions, consolidation and protection affect the route comparison. The goal is a saved final parcel record, not a copied rate from someone else's shipment.",
        },
      ],
    },
    faq: {
      eyebrow: "How these answers are maintained",
      title: "Official facts, live variables and judgment calls are separated",
      intro:
        "The FAQ is not a list of fixed promises. Each answer is written according to the kind of evidence available, so a dated public statement is not confused with a current account quote or an individual customer report.",
      points: [
        "Official public workflow statements are dated and paraphrased without turning them into guarantees.",
        "Fees, photo options, routes, stock and seller terms are treated as live variables when no stable public rule is available.",
        "Risk, authenticity, fit and customs questions are answered with limits a