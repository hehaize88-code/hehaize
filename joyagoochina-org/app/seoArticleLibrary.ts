import {
  localizedContent,
} from "./localizedContent";
import type { Locale } from "./i18n";
import {
  seoArticleCopy,
  type SeoArticleCopy,
} from "./seoArticles";
import {
  completeLocalizedSections,
  requireLocalizedField,
} from "./contentParity";
import {
  taobaoArticle,
  taobaoLocalizedMeta,
  taobaoSourceBody,
} from "./taobaoArticle";
import {
  parcelConsolidationArticles,
  parcelConsolidationSourceBodies,
} from "./parcelConsolidationArticle";

export type SeoArticle = SeoArticleCopy["article"];

export const extraSeoArticleSlugs = [
  "joyagoo-parcel-consolidation-packaging-guide",
  "how-to-buy-from-taobao-with-joyagoo",
  "joyagoo-qc-photo-checklist",
  "joyagoo-volumetric-weight-shipping-cost",
  "joyagoo-return-window-warehouse-storage",
] as const;

export const seoArticleSlugs = [
  "joyagoo-fees-explained",
  ...extraSeoArticleSlugs,
] as const;

export type SeoArticleSlug = (typeof seoArticleSlugs)[number];
type ExtraSeoArticleSlug = (typeof extraSeoArticleSlugs)[number];

export type SeoArticleEntry = {
  slug: SeoArticleSlug;
  article: SeoArticle;
  keywords: string[];
  sourceBody: string;
  publishedAt: string;
  modifiedAt: string;
  readTime: string;
  relatedLinks?: string[];
};

const englishExtras: Record<ExtraSeoArticleSlug, SeoArticle> = {
  "joyagoo-parcel-consolidation-packaging-guide":
    parcelConsolidationArticles.en,
  "how-to-buy-from-taobao-with-joyagoo": taobaoArticle,
  "joyagoo-qc-photo-checklist": {
    eyebrow: "JOYAGOO QC PHOTO GUIDE",
    title:
      "Joyagoo QC Photos: A Practical Inspection Checklist Before You Accept an Item",
    description:
      "A step-by-step method for comparing warehouse photos with the paid listing, requesting useful measurements, documenting visible defects and acting before the published return window closes.",
    facts: [
      { value: "5 days", label: "Published request window after QC completion" },
      { value: "$0.15", label: "Published price for one extra detailed photo" },
      { value: "QC", label: "Evidence for a decision, not an authentication certificate" },
    ],
    sections: [
      {
        heading: "Treat QC as a decision point, not a gallery",
        paragraphs: [
          "The most common mistake with warehouse photos is to scroll through them quickly, decide that the item looks roughly right and move on. Joyagoo’s published shopping guidance gives QC a much more important role. After an item reaches the warehouse, staff inspect it and upload several photos. The buyer can then compare what arrived with what was ordered before the product is included in an international parcel. Once the item leaves the warehouse, that useful pause in the process is gone.",
          "QC does not turn the warehouse into a brand authenticator, materials laboratory or fitting room. A photograph cannot prove long-term durability, fabric feel, battery health or every hidden construction detail. It can, however, reveal a wrong colour, an incorrect model, missing parts, obvious damage, uneven construction, a suspicious size label or packaging that does not match the paid option. The right question is not “Does this look perfect?” but “Do these images answer the conditions that would make me keep or reject this item?”",
          "Open the exact paid order and the current seller listing before inspecting. Spreadsheet titles and saved screenshots are useful for discovery, but they often shorten variant names or omit packaging choices. Compare the warehouse item with the colour, size, quantity and version that appears in your paid order. That avoids rejecting a product because it differs from a similar listing you never actually selected.",
        ],
        callout: {
          title: "A useful QC mindset",
          text: "Use each photo to answer a specific acceptance question. Do not treat a large number of images as proof that every risk has been checked.",
        },
      },
      {
        heading: "Begin with identity, quantity and the full silhouette",
        paragraphs: [
          "Start broad before zooming into stitching. Confirm that the number of pieces matches the order and that the main shape, colour blocking, model and included components are correct. For a pair of shoes, check that both shoes are present and appear to be the same model and size. For a garment, confirm front, back, colour, print placement and the selected version. For an electronic accessory, look for the ordered model designation and the advertised components that can be verified visually.",
          "Next compare proportions. A front photograph can hide a distorted side profile, an uneven sole or a missing rear detail. Review every available angle and compare left with right where symmetry should exist. Strong colour differences deserve attention, although warehouse lighting and screen processing can shift hue. If colour is critical, ask for a photograph under neutral light rather than trying to settle the question from compressed thumbnails.",
          "Packaging belongs in this first pass when it affects the product’s condition or return eligibility. A crushed outer shipping box is not automatically product damage, but an opened seal, missing retail box or absent accessory can matter. Record what is visible before asking the warehouse to remove packaging. Joyagoo’s return policy says product condition and packaging requirements can affect whether a seller accepts a return.",
        ],
      },
      {
        heading: "Inspect construction in a repeatable order",
        paragraphs: [
          "A repeatable sequence prevents the loudest feature from distracting you from smaller problems. For footwear, work from the toe shape to the side panels, heel, outsole, interior label and accessories. Compare the two shoes for height, panel position, stitching and colour. Look for lifted edges, glue marks, open seams and hardware that sits differently from one side to the other. A single straight-on image is rarely enough to judge the rear or sole edge.",
          "For clothing, inspect the neckline, shoulder seams, print or embroidery position, cuffs, hem, fasteners and visible fabric marks. A fold can imitate a crooked seam, so use another angle before calling it a defect. For bags and accessories, check closures, straps, attachment points, lining openings and the pieces included in the paid variant. Describe visible observations rather than guessing at a cause.",
          "Separate cosmetic preference from objective mismatch. “I do not like how it looks” is difficult for an agent to use with a seller. “The right heel seam is open in photo four,” “the ordered black variant arrived in blue,” or “the listing includes two straps but only one is visible” creates a checkable issue. This language also makes your own decision more consistent when several products arrive on different days.",
        ],
      },
      {
        heading: "Use measurements when fit or compatibility matters",
        paragraphs: [
          "A size tag is not a physical measurement. Two garments carrying the same label can have different chest widths, sleeve lengths or inseams, and a shoe label does not reveal the usable insole length. If fit determines whether you will keep the item, request a ruler photo of the relevant dimension. State exactly what should be measured and how: removable insole from heel to toe, chest laid flat from armpit to armpit, shoulder seam to shoulder seam, or bag opening measured straight across.",
          "Joyagoo’s value-added-services table lists extra detailed photos at $0.15 each, both when requested during the product order and after the item reaches the warehouse. The low unit price does not make vague requests useful. “Take more pictures” may produce another general angle. “Place a ruler along the removable insole from the rear edge to the longest toe point” gives the warehouse a clear task and gives you evidence that can change the decision.",
          "Check existing photos before ordering extras. One measurement image may answer a fit question; two opposing close-ups may settle symmetry. Request the smallest set that resolves the uncertainty, then review it promptly. The public guidance does not state that an extra-photo request pauses the return clock, so it is safer to order necessary evidence early.",
        ],
        callout: {
          title: "Write one instruction per image",
          text: "Name the subject, angle and measurement. Precise instructions are more valuable than several generic close-ups.",
        },
      },
      {
        heading: "Document problems so an agent can act on them",
        paragraphs: [
          "If the photos show a problem, save the relevant image and identify its number or angle. Then compare it with the selected seller variant. A useful note contains four parts: the order reference, the visible issue, the QC image that shows it and the listing detail that establishes the expected condition. Keep the wording factual and short enough that the purchasing agent can relay it without interpretation.",
          "For a wrong size, distinguish between an incorrect label and a fit concern. A seller may have sent the label you selected even if the physical measurement is unsuitable, while an entirely different tag is an objective mismatch. For a missing accessory, name the component and the part of the paid listing that includes it. For damage, state the location and visible extent rather than using a broad phrase such as “bad quality.”",
          "Preserve packaging, tags and accessories while the decision is open. Joyagoo’s return policy lists categories and conditions that may be excluded, including customised goods, certain opened or hygiene-sensitive products, second-hand items and products whose packaging, tags or accessories were removed at the customer’s request. Warehouse evidence can support a request, but it cannot create seller eligibility that never existed.",
        ],
      },
      {
        heading: "Act within the published five-day window",
        paragraphs: [
          "Joyagoo’s published return policy states that eligible requests must be submitted within five days, or 120 hours, after the order status changes to QC Completed. The shopping guidance repeats a five-day period. This clock applies to each order separately. Waiting for every item in a large haul is risky because an early arrival can move through QC while later sellers have not dispatched.",
          "Review photos when the notification appears and record the deadline. If evidence is missing, request it immediately. If you want a return, use the order control before the window closes and keep enough account balance for applicable fees. The policy mentions about $0.75 in return shipping and service fees for the covered process, while seller decisions, product condition and the reason for return still affect responsibility for costs.",
          "Do not confuse this deadline with warehouse storage. Joyagoo publishes 90 days of free storage for an item after it reaches the stored status. Storage lets you wait and consolidate accepted products; it does not keep the seller return open for 90 days. The practical sequence is inspect, decide, then store—not store first and inspect later.",
        ],
      },
      {
        heading: "Keep a small QC record for every item",
        paragraphs: [
          "A simple checklist is enough: ordered variant, arrival date, QC completion time, identity confirmed, quantity confirmed, visible construction checked, measurements confirmed if needed, packaging preserved, decision and return deadline. For a multi-item parcel, this record stops one product’s photos from being confused with another and makes the final parcel selection deliberate.",
          "Keep dated screenshots of the selected listing and the images that affected your decision. Listings can change and thumbnails can disappear. The purpose is not to build a dispute file for every purchase; it is to preserve the comparison you actually used. If the item is accepted, the record explains why. If a return is requested, it gives the agent a clear, timely account.",
          "Good QC is not about searching endlessly for flaws. It is a bounded process that reduces preventable surprises before international shipping. Compare the correct listing, inspect in the same order, request only decisive evidence and act before the clock closes. That is more useful than relying on a spreadsheet title, a single attractive angle or somebody else’s review of a different seller batch.",
        ],
      },
    ],
  },
  "joyagoo-volumetric-weight-shipping-cost": {
    eyebrow: "JOYAGOO SHIPPING COST GUIDE",
    title:
      "Joyagoo Shipping Cost: Actual Weight, Volumetric Weight and Rehearsal Packing Explained",
    description:
      "Why a light parcel can be billed as a heavier one, how the published volumetric formula works, when rehearsal packing helps and why an early shipping estimate is not the final charge.",
    facts: [
      { value: "L×W×H", label: "Parcel dimensions used in volumetric calculations" },
      { value: "÷5000", label: "One published divisor; routes may use 6000, 7000 or 8000" },
      { value: "$3", label: "Price shown on the dedicated rehearsal-packing page" },
    ],
    sections: [
      {
        heading: "Stop treating the warehouse weight as the whole parcel",
        paragraphs: [
          "A product can look light in the warehouse and still create an expensive international parcel. The reason is that carriers move both mass and space. A seven-kilogram box that is compact uses less aircraft or truck capacity than a seven-kilogram box filled with bulky shoes and jackets. Joyagoo’s published shipping explanation therefore distinguishes actual weight from volumetric weight and says some routes charge the greater of the two.",
          "Actual weight includes the product and its packaging materials. Volumetric weight converts the parcel’s dimensions into a billable kilogram figure. Which rule applies depends on the selected route and the logistics provider. That is why a universal “price per kilogram” claim is misleading: the destination, product restrictions, first-weight increments, parcel dimensions and route rules can all change the result.",
          "Before buying, use estimates to compare scenarios, not to promise a final total. The final parcel does not exist until the warehouse combines the selected items and applies your packaging instructions. A good shipping budget keeps room for packaging weight, a dimensional adjustment and route availability rather than assuming the stored product weight will pass unchanged to the carrier.",
        ],
        callout: {
          title: "The core rule",
          text: "On a route that uses dimensional billing, the chargeable figure may be the greater of actual weight and volumetric weight.",
        },
      },
      {
        heading: "Calculate volumetric weight with the route’s divisor",
        paragraphs: [
          "Joyagoo publishes the formula as package length × width × height in centimetres, divided by 5000. The same help page warns that third-party logistics providers may instead use 6000, 7000 or 8000. The divisor matters: a smaller divisor produces a larger volumetric weight, so always read the selected route rather than applying one formula to every line.",
          "Take a parcel measuring 50 × 40 × 30 centimetres. Its volume is 60,000 cubic centimetres. Dividing by 5000 gives 12 kilograms; dividing by 6000 gives 10 kilograms; dividing by 8000 gives 7.5 kilograms. If the physical scale shows 7 kilograms and the route uses the 5000 rule, the dimensional figure is much higher. If a different line charges actual weight or uses a larger divisor, the same box may produce a different bill.",
          "This example also shows why small dimension reductions can matter. Reducing the box to 45 × 35 × 25 centimetres gives 39,375 cubic centimetres, or 7.875 kilograms with a 5000 divisor. That does not guarantee a cheaper shipment—route price brackets and minimum charges still apply—but it explains why removing unnecessary empty space can be more valuable than shaving a few grams from a bulky parcel.",
        ],
      },
      {
        heading: "Understand estimated and actual billing weight",
        paragraphs: [
          "When goods enter storage, the recorded weight may include the product’s original packaging. Joyagoo’s billing-weight page says the system estimates additional packing weight when you first submit a parcel. If you ask the warehouse to remove boxes or change packaging, the packed result will naturally differ from that estimate. The amount shown before packing is therefore a deposit or planning charge, not a measurement of a finished parcel.",
          "After the warehouse packs the order, it weighs and measures the parcel. If the logistics provider accepts those figures, they become the actual billing basis. If the carrier remeasures and adjusts them, Joyagoo says the logistics provider’s measurement controls. The published guidance says the actual billing weight can be viewed in parcel details about three days after dispatch.",
          "This sequence explains both additional-payment and refund situations. The shopping guidance says that under a normal parcel submission you first pay an estimated shipping fee. If the actual charge exceeds it, a difference may be due. If the deposit is higher, the stated process returns the difference to the Joyagoo balance after the final amount is known. Keep the parcel detail screen and date when reconciling the result.",
        ],
      },
      {
        heading: "Use rehearsal packing when dimensions could change the choice",
        paragraphs: [
          "Rehearsal packing is a paid step that packs selected items before the final shipping payment, giving you a measured weight and an updated fee for the chosen line. Joyagoo’s dedicated rehearsal page lists a fee of $3 per parcel and says the user is notified within 24 hours after the service is completed. The value-added-services table also lists $3 per parcel.",
          "Another official page—the general shopping guidance—describes rehearsal as a 20 CNY service. Those two published figures are close but not identical. They may reflect currency display or pages updated at different times, but a factual guide cannot assume the reason. Treat the price shown in the live account as the current one before ordering the service.",
          "Rehearsal is most useful when packaging decisions can materially alter route eligibility or dimensional weight: several shoe boxes, puffy outerwear, mixed fragile goods or a parcel close to a route limit. It reduces uncertainty; it does not freeze customs charges, carrier corrections or every later logistics condition. Use it when the information can change the parcel plan, not as an automatic fee on every order.",
        ],
        callout: {
          title: "Published price discrepancy",
          text: "The dedicated page and service table show $3 per parcel; the general shopping guide shows 20 CNY. Verify the live account price.",
        },
      },
      {
        heading: "Remove packaging selectively, not automatically",
        paragraphs: [
          "Removing a retail box can reduce volume, but it can also remove structure, presentation or protection. A shoe box is a classic dimensional target, yet shipping footwear without it may increase crushing risk. Fragile accessories may need more reinforcement, not less. Decide item by item which packaging is dead space and which packaging performs a real protective function.",
          "Consolidation can reduce duplicated outer packaging and repeated first-weight charges, but a very large combined parcel may move into volumetric billing or lose access to a preferred route. Compare one large parcel with two sensible smaller parcels when the items have different restrictions or protection needs. The cheapest-looking single estimate is not always the lowest-risk shipment.",
          "Optional services should solve named problems. Joyagoo’s published material mentions packaging removal, reinforcement, insurance and parcel photos. The value-added table lists parcel photography at $0.75 per parcel, with one image before sealing and another after sealing. A photo records external condition; it is not a substitute for insurance or suitable protective packing.",
        ],
      },
      {
        heading: "Read route eligibility before comparing prices",
        paragraphs: [
          "Joyagoo’s shopping guidance says the system screens available lines according to the products in the parcel. Batteries, liquids, magnets, branded goods, size limits and destination rules can remove options. A route shown for an ordinary clothing estimate may not appear when the actual parcel contains restricted products. Build the comparison from the real warehouse selection whenever possible.",
          "Published delivery times are broad references from warehouse departure: air freight is described as usually 10–20 days, ocean freight 45–85 days and rail freight 40–60 days. These are not guaranteed arrival dates. Weekends, public holidays, customs, hand-offs and the logistics provider’s collection schedule can add time. Price, speed and risk have to be assessed together.",
          "Coupons are another narrow part of the calculation. The shopping guide says a coupon applies only to the international shipping fee and cannot be stacked. Do not subtract a coupon from product cost or assume several offers can be combined. Verify eligibility at parcel payment because the route and account rules shown there are what matter.",
        ],
      },
      {
        heading: "Build a shipping comparison that survives final packing",
        paragraphs: [
          "For every scenario, record destination, selected items, actual stored weight, estimated dimensions, route divisor or billing rule, packaging decision, optional services and the quoted date. Calculate volumetric weight for bulky scenarios and mark the greater figure. Then add a buffer rather than spending the entire budget on the product stage.",
          "After packing, replace estimates with measured figures. Check whether the selected route remained available, whether the package crossed a price bracket and whether the carrier later adjusted the billing weight. This is more useful than remembering only the first calculator result. It also gives you a clean explanation for any balance refund or extra payment.",
          "The practical lesson is simple: reduce empty space without sacrificing protection, compare routes using the correct billable weight and pay for rehearsal when measured dimensions can change the decision. Joyagoo’s published formulas make the mechanics understandable, but the live parcel page and carrier measurement remain the final references.",
        ],
      },
    ],
  },
  "joyagoo-return-window-warehouse-storage": {
    eyebrow: "JOYAGOO RETURNS & STORAGE",
    title:
      "Joyagoo Return Policy: The 5-Day QC Window and 90-Day Warehouse Storage Are Not the Same",
    description:
      "A practical timeline for reviewing QC photos, preserving return eligibility, understanding seller conditions and using warehouse storage without missing the shorter deadline.",
    facts: [
      { value: "120 hours", label: "Published return-request window after QC completion" },
      { value: "90 days", label: "Published free storage after an item becomes Stored" },
      { value: "30 days", label: "Published free parcel-storage period before shipping payment" },
    ],
    sections: [
      {
        heading: "Put the two clocks on different lines",
        paragraphs: [
          "Joyagoo publishes two time periods that solve different problems. The return policy says an eligible request must be submitted within five days, or 120 hours, after an order changes to QC Completed. The storage guidance says an item receives 90 days of free warehouse storage starting when the status becomes Stored. Seeing the larger number can create a dangerous assumption that the return decision can wait. It cannot.",
          "The five-day clock protects a short decision stage between warehouse inspection and acceptance. The 90-day clock lets accepted items wait while other purchases arrive and a parcel is planned. Storage is logistics capacity, not an extension of the seller’s after-sales policy. Every item in a haul can have a different QC deadline and a different last free-storage date.",
          "Use a simple timeline for each order: seller dispatch, stock arrival, QC completed, return deadline, stored date and free-storage end. Review the QC images as soon as they appear. Only after deciding to keep the item should you rely on the longer storage window for consolidation.",
        ],
        callout: {
          title: "The rule to remember",
          text: "Five days is for the return request; 90 days is for holding an accepted item. One clock does not pause the other.",
        },
      },
      {
        heading: "Check eligibility before assuming a return is guaranteed",
        paragraphs: [
          "Joyagoo calls the service a five-day return guarantee, but the same policy explains that eligibility still depends on the third-party seller, product type and condition. The order slot indicates whether the return control is available. If the button has disappeared, the published explanation says the returnable period may have passed.",
          "The policy lists categories and situations that may be unavailable or subject to seller discretion, including customised items, second-hand products, certain hygiene-sensitive goods, food, some opened sealed products and goods whose packaging, tags or accessories were removed at the buyer’s request. Products bought from outside mainland China and other seller-defined exclusions can also require negotiation rather than the standard procedure.",
          "This is why the live listing matters before payment. Read the seller’s return conditions and avoid treating a spreadsheet label as a promise. If eligibility is essential, save the listing and selected variant. The warehouse agent can communicate with the seller, but the published policy says the return can proceed only when the seller agrees under the applicable conditions.",
        ],
      },
      {
        heading: "Preserve resalable condition while you inspect",
        paragraphs: [
          "A returnable product generally needs to remain new and resalable. Keep tags, retail packaging, accessories and seals intact until you have reviewed the warehouse photos and made the acceptance decision. Do not request packaging removal simply to reduce future shipping volume while a return is still under consideration.",
          "If the standard photos do not show the decisive detail, request targeted evidence early. Joyagoo’s service table lists extra detailed photos at $0.15 each. A ruler image, close-up of a damaged seam or photograph of a model number can turn uncertainty into an observable issue. The public policy does not say that ordering another photo pauses the 120-hour window.",
          "Document the issue with the exact QC image and the relevant part of the paid listing. Wrong variant, missing component, damaged surface and incorrect label are clearer than “not good.” If the concern is fit rather than a wrong size, use a physical measurement where possible because the seller may have supplied the selected label correctly.",
        ],
      },
      {
        heading: "Understand fees and responsibility for shipping",
        paragraphs: [
          "The return page says a request under the published process requires a small shipping and service fee of about $0.75 and asks the buyer to keep sufficient account balance. It also distinguishes returns without a quality issue from cases involving an accepted quality problem. When there is no product defect, the buyer generally carries the shipping cost; when a quality issue is confirmed, the seller may be responsible.",
          "The refund is based on the product price actually paid. That does not automatically mean every domestic delivery fee, optional photo charge or other service is refunded. Joyagoo’s general fee explanation says return shipping and handling can be deducted from the product refund, with the remaining amount returned to the account balance. Communicate the exact cost through the agent for the specific order.",
          "If the seller has not shipped yet, the FAQ on the return page says there is no charge under the described conditions. Once the item is stocked and a no-defect return is requested, costs can apply. Status therefore changes both timing and potential expense; record it when submitting the request.",
        ],
        callout: {
          title: "Do not promise yourself a free return",
          text: "The published window, seller approval, product condition and reason for return all matter. Check the live order and current fee.",
        },
      },
      {
        heading: "Use the 90-day item-storage window deliberately",
        paragraphs: [
          "Joyagoo’s dedicated storage page says the 90-day free item period begins when the order status changes to Stored. It is designed to let buyers wait for other purchases and consolidate parcels. Count from each product’s own status change rather than from the first or last order in the haul.",
          "The same page currently states that extending item storage costs 10 CNY for 30 days. A separate value-added-services table lists an extension at $1.50 per product ID per month for items stored from 60 to 90 days, with a maximum storage time of six months. These official descriptions are broadly similar but use different currency wording and eligibility detail. Check the live Extend Storage screen before relying on either amount.",
          "Consolidation should not become endless waiting. Group items with compatible restrictions and protection needs, estimate parcel volume and submit while every selected item remains inside its storage period. A later purchase does not reset an older product’s clock.",
        ],
      },
      {
        heading: "Remember that a submitted parcel has another deadline",
        paragraphs: [
          "The dedicated storage guidance also distinguishes item storage from parcel storage. After a parcel is submitted but before its shipping fee is paid, the parcel receives a published 30-day free storage period. Buyers are asked to complete shipping payment within that period. This is a third operational clock, separate from both the QC return deadline and item storage.",
          "Joyagoo’s order-status guide adds shorter payment prompts at particular stages. It describes a Calculating Shipping Fee status and says payment should be made within 72 hours after receiving the calculation, followed by an Unpaid Shipping Fee status when the weight has been calculated. Treat the live parcel notification as the immediate instruction even though the general parcel-storage page describes a wider 30-day limit.",
          "If the relevant item or parcel period expires without submission, payment or communication, the storage policy says the goods may be considered abandoned and destroyed under disposal procedures. Do not rely on an old screenshot or memory when a deadline is close; check the current status and contact support through the account if the instructions conflict.",
        ],
      },
      {
        heading: "Run a timeline check before every parcel submission",
        paragraphs: [
          "Maintain one row per item with paid variant, QC completion, return deadline, keep-or-return decision, stored date and storage end. Add parcel submission, calculated-fee notice and payment date when consolidation begins. This takes less time than reconstructing several clocks after a button disappears.",
          "Inspect each arrival independently, preserve evidence and packaging until acceptance, then use storage only for products you intend to ship. If a return is needed, submit it before the five-day window and keep balance available for applicable charges. If an item is kept, plan consolidation before the oldest storage deadline rather than the newest.",
          "The useful distinction is not complicated, but it has real consequences: returns are about timely evidence and seller eligibility; storage is about warehouse planning. Treating them as separate workflows makes a multi-item order easier to manage and reduces the chance that a 90-day number hides a five-day decision.",
          "Before submitting a combined parcel, compare the oldest stored item with every newer arrival and check whether an unresolved QC concern is still inside the shorter return period. Confirm that the selected products can travel on the same available line, decide which retail packaging must remain, and record the packed-cost notice when it appears. This final review connects the separate clocks without confusing them: the return decision protects a time-sensitive claim, while storage and parcel payment determine whether accepted goods move onward before their warehouse deadlines.",
        ],
      },
    ],
  },
};

type LocalizedArticleMeta = {
  eyebrow: string;
  title: string;
  description: string;
};

type LegacyExtraSeoArticleSlug = Exclude<
  ExtraSeoArticleSlug,
  | "how-to-buy-from-taobao-with-joyagoo"
  | "joyagoo-parcel-consolidation-packaging-guide"
>;

const localizedMeta: Record<
  Exclude<Locale, "en">,
  Record<LegacyExtraSeoArticleSlug, LocalizedArticleMeta>
> = {
  zh: {
    "joyagoo-qc-photo-checklist": {
      eyebrow: "JOYAGOO 质检照片指南",
      title: "Joyagoo QC照片检查清单：接受商品前应该看什么",
      description: "对照已付款商品、检查尺寸与可见问题、申请有效补拍，并在公开退货时限结束前作出决定。",
    },
    "joyagoo-volumetric-weight-shipping-cost": {
      eyebrow: "JOYAGOO 国际运费指南",
      title: "Joyagoo运费详解：实际重量、体积重与预打包",
      description: "解释轻包裹为什么也可能按更高重量计费、体积重公式如何使用，以及什么时候预打包值得做。",
    },
    "joyagoo-return-window-warehouse-storage": {
      eyebrow: "JOYAGOO 退货与仓储",
      title: "Joyagoo退货政策：5天QC窗口与90天仓储不是一回事",
      description: "用清晰时间线说明QC、卖家条件、可售状态、退货费用和免费仓储，避免错过更短的期限。",
    },
  },
  de: {
    "joyagoo-qc-photo-checklist": { eyebrow: "JOYAGOO QC-FOTOGUIDE", title: "Joyagoo QC-Fotos: praktische Prüfliste vor der Annahme", description: "Bestellung, Maße, sichtbare Mängel und Zusatzfotos prüfen, bevor das veröffentlichte Rückgabefenster endet." },
    "joyagoo-volumetric-weight-shipping-cost": { eyebrow: "JOYAGOO VERSANDKOSTEN", title: "Joyagoo Versandkosten: tatsächliches Gewicht, Volumengewicht und Probepacken", description: "So funktionieren Maßgewicht, Divisor, vorläufige Abrechnung und Probepacken bei internationalen Paketen." },
    "joyagoo-return-window-warehouse-storage": { eyebrow: "JOYAGOO RETOUREN & LAGER", title: "Joyagoo Rückgabe: 5-Tage-QC-Fenster und 90-Tage-Lagerung sind verschieden", description: "Eine klare Zeitleiste für QC, Verkäuferbedingungen, Rückgabekosten und Lagerfristen." },
  },
  pl: {
    "joyagoo-qc-photo-checklist": { eyebrow: "ZDJĘCIA QC JOYAGOO", title: "Zdjęcia QC Joyagoo: praktyczna lista kontroli przed akceptacją", description: "Porównaj zamówienie, wymiary i widoczne wady oraz działaj przed końcem opublikowanego terminu." },
    "joyagoo-volumetric-weight-shipping-cost": { eyebrow: "KOSZT WYSYŁKI JOYAGOO", title: "Koszt wysyłki Joyagoo: waga rzeczywista, objętościowa i pakowanie próbne", description: "Jak działa waga wymiarowa, dzielnik, wycena wstępna i pakowanie próbne." },
    "joyagoo-return-window-warehouse-storage": { eyebrow: "ZWROTY I MAGAZYN JOYAGOO", title: "Zwroty Joyagoo: 5 dni po QC to nie 90 dni magazynu", description: "Praktyczna oś czasu dla QC, warunków sprzedawcy, opłat i przechowywania." },
  },
  es: {
    "joyagoo-qc-photo-checklist": { eyebrow: "FOTOS QC DE JOYAGOO", title: "Fotos QC de Joyagoo: lista práctica antes de aceptar", description: "Compara pedido, medidas y defectos visibles y actúa antes de que cierre el plazo publicado." },
    "joyagoo-volumetric-weight-shipping-cost": { eyebrow: "COSTE DE ENVÍO JOYAGOO", title: "Envío Joyagoo: peso real, peso volumétrico y embalaje de ensayo", description: "Cómo funcionan el peso dimensional, el divisor, la estimación y el embalaje previo." },
    "joyagoo-return-window-warehouse-storage": { eyebrow: "DEVOLUCIONES Y ALMACÉN", title: "Devolución Joyagoo: 5 días tras QC no son 90 días de almacén", description: "Cronología práctica de QC, condiciones del vendedor, costes y almacenamiento." },
  },
  it: {
    "joyagoo-qc-photo-checklist": { eyebrow: "FOTO QC JOYAGOO", title: "Foto QC Joyagoo: lista pratica prima di accettare", description: "Confronta ordine, misure e difetti visibili e agisci entro la finestra pubblicata." },
    "joyagoo-volumetric-weight-shipping-cost": { eyebrow: "COSTI SPEDIZIONE JOYAGOO", title: "Spedizione Joyagoo: peso reale, volumetrico e pre-imballaggio", description: "Come funzionano peso dimensionale, divisore, stima e imballaggio di prova." },
    "joyagoo-return-window-warehouse-storage": { eyebrow: "RESI E DEPOSITO JOYAGOO", title: "Resi Joyagoo: 5 giorni dopo QC non sono 90 giorni di deposito", description: "Una cronologia pratica per QC, condizioni del venditore, costi e magazzino." },
  },
  fr: {
    "joyagoo-qc-photo-checklist": { eyebrow: "PHOTOS QC JOYAGOO", title: "Photos QC Joyagoo : la liste de contrôle avant d’accepter", description: "Comparez commande, mesures et défauts visibles avant la fin du délai publié." },
    "joyagoo-volumetric-weight-shipping-cost": { eyebrow: "FRAIS D’ENVOI JOYAGOO", title: "Expédition Joyagoo : poids réel, volumétrique et pré-emballage", description: "Comprendre le poids dimensionnel, le diviseur, l’estimation et l’emballage d’essai." },
    "joyagoo-return-window-warehouse-storage": { eyebrow: "RETOURS ET STOCKAGE", title: "Retour Joyagoo : 5 jours après QC ne valent pas 90 jours de stockage", description: "Une chronologie pratique du QC, des conditions vendeur, des frais et du stockage." },
  },
  pt: {
    "joyagoo-qc-photo-checklist": { eyebrow: "FOTOS QC JOYAGOO", title: "Fotos QC Joyagoo: lista prática antes de aceitar", description: "Compare pedido, medidas e defeitos visíveis e aja antes do prazo publicado." },
    "joyagoo-volumetric-weight-shipping-cost": { eyebrow: "CUSTO DE ENVIO JOYAGOO", title: "Envio Joyagoo: peso real, volumétrico e pré-embalagem", description: "Como funcionam peso dimensional, divisor, estimativa e embalagem de ensaio." },
    "joyagoo-return-window-warehouse-storage": { eyebrow: "DEVOLUÇÕES E ARMAZÉM", title: "Devolução Joyagoo: 5 dias após QC não são 90 dias de armazenamento", description: "Cronologia prática de QC, condições do vendedor, custos e armazenagem." },
  },
  ro: {
    "joyagoo-qc-photo-checklist": { eyebrow: "FOTOGRAFII QC JOYAGOO", title: "Fotografii QC Joyagoo: lista practică înainte de acceptare", description: "Compară comanda, măsurile și defectele vizibile înainte de închiderea termenului publicat." },
    "joyagoo-volumetric-weight-shipping-cost": { eyebrow: "COST TRANSPORT JOYAGOO", title: "Transport Joyagoo: greutate reală, volumetrică și preambalare", description: "Cum funcționează greutatea dimensională, divizorul, estimarea și ambalarea de probă." },
    "joyagoo-return-window-warehouse-storage": { eyebrow: "RETURURI ȘI DEPOZITARE", title: "Retur Joyagoo: 5 zile după QC nu înseamnă 90 de zile de depozitare", description: "Cronologie practică pentru QC, condițiile vânzătorului, costuri și depozitare." },
  },
  sv: {
    "joyagoo-qc-photo-checklist": { eyebrow: "JOYAGOO QC-BILDER", title: "Joyagoo QC-bilder: praktisk kontrollista före godkännande", description: "Jämför order, mått och synliga fel innan det publicerade tidsfönstret stänger." },
    "joyagoo-volumetric-weight-shipping-cost": { eyebrow: "JOYAGOO FRAKTKOSTNAD", title: "Joyagoo frakt: faktisk vikt, volymvikt och provpackning", description: "Så fungerar dimensionell vikt, divisor, uppskattning och provpackning." },
    "joyagoo-return-window-warehouse-storage": { eyebrow: "RETURER OCH LAGRING", title: "Joyagoo-retur: 5 dagar efter QC är inte 90 dagars lagring", description: "En praktisk tidslinje för QC, säljarvillkor, kostnader och lager." },
  },
};

const articleGuideMap: Record<ExtraSeoArticleSlug, string> = {
  "joyagoo-parcel-consolidation-packaging-guide": "shipping-guide",
  "how-to-buy-from-taobao-with-joyagoo": "how-to-buy",
  "joyagoo-qc-photo-checklist": "qc-guide",
  "joyagoo-volumetric-weight-shipping-cost": "shipping-guide",
  "joyagoo-return-window-warehouse-storage": "returns",
};

const companionSections: Record<
  ExtraSeoArticleSlug,
  Array<{ guide: string; section: number }>
> = {
  "joyagoo-parcel-consolidation-packaging-guide": [],
  "how-to-buy-from-taobao-with-joyagoo": [],
  "joyagoo-qc-photo-checklist": [
    { guide: "returns", section: 0 },
    { guide: "returns", section: 4 },
  ],
  "joyagoo-volumetric-weight-shipping-cost": [
    { guide: "how-to-buy", section: 3 },
    { guide: "how-to-buy", section: 4 },
  ],
  "joyagoo-return-window-warehouse-storage": [
    { guide: "qc-guide", section: 4 },
    { guide: "shipping-guide", section: 4 },
  ],
};

const keywords: Record<SeoArticleSlug, string[]> = {
  "joyagoo-parcel-consolidation-packaging-guide": [
    "joyagoo parcel consolidation",
    "combine Joyagoo warehouse items",
    "Joyagoo packaging options",
    "Joyagoo consolidate parcels",
    "Joyagoo separate packaging restrictions",
  ],
  "how-to-buy-from-taobao-with-joyagoo": [
    "how to buy from Taobao with Joyagoo",
    "Joyagoo Taobao agent",
    "buy from Taobao with Joyagoo",
    "Joyagoo Taobao guide",
  ],
  "joyagoo-fees-explained": [
    "joyagoo fees",
    "joyagoo service fee",
    "joyagoo shipping cost",
    "how much does joyagoo cost",
  ],
  "joyagoo-qc-photo-checklist": [
    "joyagoo qc",
    "joyagoo qc photos",
    "joyagoo extra photo",
    "joyagoo quality check",
  ],
  "joyagoo-volumetric-weight-shipping-cost": [
    "joyagoo shipping cost",
    "joyagoo volumetric weight",
    "joyagoo rehearsal packing",
    "joyagoo actual weight",
  ],
  "joyagoo-return-window-warehouse-storage": [
    "joyagoo return policy",
    "joyagoo refund",
    "joyagoo warehouse",
    "joyagoo storage time",
  ],
};

const sourceBodies: Record<SeoArticleSlug, string> = {
  "joyagoo-parcel-consolidation-packaging-guide":
    parcelConsolidationSourceBodies.en,
  "how-to-buy-from-taobao-with-joyagoo": taobaoSourceBody,
  "joyagoo-fees-explained": seoArticleCopy.en.sourceBody,
  "joyagoo-qc-photo-checklist":
    "Reviewed on 30 July 2026 against Joyagoo Shopping Guidance, the Return Policy, Value Added Services and published order-status descriptions. Photos can support a decision but do not guarantee authenticity, fit or seller approval.",
  "joyagoo-volumetric-weight-shipping-cost":
    "Reviewed on 30 July 2026 against Joyagoo pages for actual and volumetric weight, estimated and actual billing weight, rehearsal packing, shopping guidance, value-added services and published delivery ranges. Live route rules and final carrier measurements remain decisive.",
  "joyagoo-return-window-warehouse-storage":
    "Reviewed on 30 July 2026 against Joyagoo Return Policy, Warehouse Storage Period, Value Added Services, Shopping Guidance and order-status descriptions. Seller eligibility, current account controls and live deadlines remain decisive.",
};

export const seoArticleDates: Record<
  SeoArticleSlug,
  { publishedAt: string; modifiedAt: string }
> = {
  "joyagoo-parcel-consolidation-packaging-guide": {
    publishedAt: "2026-08-09",
    modifiedAt: "2026-08-09",
  },
  "how-to-buy-from-taobao-with-joyagoo": {
    publishedAt: "2026-08-03",
    modifiedAt: "2026-08-03",
  },
  "joyagoo-fees-explained": {
    publishedAt: "2026-07-30",
    modifiedAt: "2026-07-30",
  },
  "joyagoo-qc-photo-checklist": {
    publishedAt: "2026-07-30",
    modifiedAt: "2026-07-30",
  },
  "joyagoo-volumetric-weight-shipping-cost": {
    publishedAt: "2026-07-30",
    modifiedAt: "2026-07-30",
  },
  "joyagoo-return-window-warehouse-storage": {
    publishedAt: "2026-07-30",
    modifiedAt: "2026-07-30",
  },
};

function completeArticle(
  locale: Locale,
  translated: SeoArticle,
  english: SeoArticle,
): SeoArticle {
  return {
    eyebrow: requireLocalizedField(
      locale,
      translated.eyebrow,
      english.eyebrow,
      "seoArticle.eyebrow",
    ),
    title: requireLocalizedField(
      locale,
      translated.title,
      english.title,
      "seoArticle.title",
    ),
    description: requireLocalizedField(
      locale,
      translated.description,
      english.description,
      "seoArticle.description",
    ),
    facts: english.facts.map((englishFact, index) => ({
      value: requireLocalizedField(
        locale,
        translated.facts[index]?.value,
        englishFact.value,
        `seoArticle.facts[${index}].value`,
      ),
      label: requireLocalizedField(
        locale,
        translated.facts[index]?.label,
        englishFact.label,
        `seoArticle.facts[${index}].label`,
      ),
    })),
    sections: completeLocalizedSections(
      locale,
      translated.sections,
      english.sections,
      "seoArticle",
    ),
  };
}

function buildLocalizedExtra(
  locale: Exclude<Locale, "en">,
  slug: ExtraSeoArticleSlug,
): SeoArticle {
  if (slug === "joyagoo-parcel-consolidation-packaging-guide") {
    return completeArticle(
      locale,
      parcelConsolidationArticles[locale],
      parcelConsolidationArticles.en,
    );
  }
  const guide = localizedContent[locale].guides[articleGuideMap[slug]];
  const extras = companionSections[slug].map(
    ({ guide: guideSlug, section }) =>
      localizedContent[locale].guides[guideSlug].sections[section],
  );
  const meta =
    slug === "how-to-buy-from-taobao-with-joyagoo"
      ? taobaoLocalizedMeta[locale]
      : localizedMeta[locale][slug];
  const translated = {
    ...meta,
    facts: guide.facts,
    sections: [...guide.sections, ...extras],
  };
  return completeArticle(locale, translated, englishExtras[slug]);
}

export function getSeoArticleEntries(locale: Locale): SeoArticleEntry[] {
  const feeEntry: SeoArticleEntry = {
    slug: "joyagoo-fees-explained",
    article:
      locale === "en"
        ? seoArticleCopy.en.article
        : completeArticle(
            locale,
            seoArticleCopy[locale].article,
            seoArticleCopy.en.article,
          ),
    keywords: keywords["joyagoo-fees-explained"],
    sourceBody:
      locale === "en"
        ? sourceBodies["joyagoo-fees-explained"]
        : seoArticleCopy[locale].sourceBody,
    ...seoArticleDates["joyagoo-fees-explained"],
    readTime: "9 minute read",
  };

  const extraEntries: SeoArticleEntry[] = extraSeoArticleSlugs.map((slug) => ({
    slug,
    article:
      locale === "en"
        ? englishExtras[slug]
        : buildLocalizedExtra(locale, slug),
    keywords: keywords[slug],
    sourceBody:
      locale === "en"
        ? sourceBodies[slug]
        : slug === "joyagoo-parcel-consolidation-packaging-guide"
          ? parcelConsolidationSourceBodies[locale]
          : `${localizedContent[locale].article.sourceBody} ${localizedContent[locale].guides[articleGuideMap[slug]].sourceLabel}.`,
    ...seoArticleDates[slug],
    readTime:
      slug === "how-to-buy-from-taobao-with-joyagoo" ||
      slug === "joyagoo-parcel-consolidation-packaging-guide"
        ? "10 minute read"
        : "9 minute read",
    relatedLinks:
      slug === "how-to-buy-from-taobao-with-joyagoo" ||
      slug === "joyagoo-parcel-consolidation-packaging-guide"
        ? ["how-to-buy", "qc-guide", "shipping-guide", "articles"]
        : undefined,
  }));

  return [...extraEntries, feeEntry].sort((left, right) =>
    right.modifiedAt.localeCompare(left.modifiedAt),
  );
}

export function getSeoArticleEntry(
  locale: Locale,
  slug: string,
): SeoArticleEntry | undefined {
  return getSeoArticleEntries(locale).find((entry) => entry.slug === slug);
}
