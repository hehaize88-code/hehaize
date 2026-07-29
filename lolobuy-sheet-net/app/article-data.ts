import contentDates from "./content-dates.json";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
};

export type ArticleRecord = {
  slug: string;
  title: string;
  seoTitle: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  checkedDate: string;
  publishedDate: string;
  modifiedDate: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  standfirst: string;
  takeaways: string[];
  sourceNote: string;
  sections: ArticleSection[];
};

export const articles: ArticleRecord[] = [
  {
    slug: "how-to-use-lolobuy-spreadsheet",
    title:
      "How to Use a LoloBuy Spreadsheet Without Losing the Original Product Context",
    seoTitle: "How to Use a LoloBuy Spreadsheet | 2026 Guide",
    shortTitle: "How to Use a LoloBuy Spreadsheet",
    description:
      "A practical LoloBuy spreadsheet guide covering source links, variants, seller notes, W2C terminology and the checks to make before ordering.",
    eyebrow: "Product discovery guide",
    primaryKeyword: "LoloBuy spreadsheet",
    secondaryKeywords: [
      "LoloBuy sheet",
      "LoloBuy finds",
      "LoloBuy product links",
      "LoloBuy W2C",
    ],
    intent: "Find products and understand what to verify before ordering",
    checkedDate: "28 July 2026",
    publishedDate:
      contentDates.articles["how-to-use-lolobuy-spreadsheet"].published,
    modifiedDate:
      contentDates.articles["how-to-use-lolobuy-spreadsheet"].modified,
    image: "/social/spreadsheet-guide.png",
    imageAlt:
      "Three-stage diagram for finding, checking and planning a product purchase",
    imageCaption:
      "Discovery is only the first stage. Preserve the source, check the selected option and plan the warehouse and parcel decisions separately.",
    standfirst:
      "A spreadsheet is useful because it shortens the search. It becomes risky when the thumbnail replaces the listing in your mind. The reliable way to use one is to preserve the source, define the exact variant and treat every later stage—ordering, warehouse inspection and shipping—as a separate decision.",
    takeaways: [
      "Use the sheet to discover items, not to replace the live listing.",
      "Record the exact color, size, version and seller note before paying.",
      "Recheck the destination page because stock, pricing and options can change.",
      "Judge the warehouse result against the order record, not against memory.",
    ],
    sourceNote:
      "Research basis: LoloBuy’s public homepage states that shoppers can paste a product link to place an order and that the service assists with purchases from Chinese online and offline channels. Exact seller inventory, fees and product options remain live variables and are not treated as fixed facts here.",
    sections: [
      {
        heading: "What a LoloBuy spreadsheet actually solves",
        paragraphs: [
          "Most people do not begin with a perfectly documented marketplace URL. They begin with a picture, a product type, a short name or a recommendation from someone else. A LoloBuy spreadsheet turns that vague starting point into a browsable catalog. Categories help when the search is broad; a keyword search helps when the user already knows the item type; matched cards make it possible to open a specific destination instead of hunting through screenshots.",
          "That is the real value: discovery and organization. A sheet can save time, surface products outside your usual search vocabulary and keep different categories in one place. It can also provide context such as a readable title and a clearly assigned image. None of those benefits prove that the seller still has the item, that a particular option will fit, or that the received product will match every promotional photograph.",
          "Use the directory as the first layer of research. The live destination page is the second layer. The order record and warehouse photographs are later layers. Keeping those layers separate prevents a common mistake: treating an attractive catalog card as if it were a final quality verdict.",
        ],
      },
      {
        heading: "Start with the closest possible search term",
        paragraphs: [
          "Broad terms such as “shoes” or “hoodie” are useful for browsing, but they create a large review job. A more specific phrase—product type plus model, material, color or silhouette—usually produces a cleaner shortlist. If you know only part of the name, begin with the stable part rather than adding guessed words. Incorrect model names can hide the right result just as easily as a vague query can flood the page.",
          "Try one controlled change at a time. Search the model first, then the category plus model, then a visual feature. This makes it easier to understand why the result set changed. When a category page is used, open several candidates in separate tabs and compare their option tables, seller notes and imagery. Do not decide from the first thumbnail that resembles the reference picture.",
          "Community shorthand such as “W2C” usually means “where to cop”—in practical terms, the request is for a source or product link. A useful W2C answer therefore needs more than an image. It should lead to a page where the user can identify the seller, available options and current terms.",
        ],
      },
      {
        heading: "Preserve the source before the listing changes",
        paragraphs: [
          "LoloBuy’s public description says users can paste a product link to complete an order. That workflow makes the source address important. Save it before starting the order, together with a screenshot or short note showing the selected option. Marketplace pages can be edited, products can be removed and sellers can reuse a page for a different item. A saved link without a date or variant note may not be enough to reconstruct what you expected.",
          "A simple order note should include the product-page address, seller name if visible, selected color, size, version or batch, quantity and any instruction that changes what should be purchased. If the listing uses coded option names, copy the code exactly instead of translating it from memory. If a seller photograph contains a measurement table, save that version of the table because it may later be replaced.",
          "This record is not bureaucracy. It gives you a reference when reviewing the purchase status, communicating about an unclear option or comparing warehouse images. The few minutes spent documenting the listing usually save far more time than trying to explain an expectation after the source page has changed.",
        ],
      },
      {
        heading: "Read the option selector as carefully as the title",
        paragraphs: [
          "A single Chinese marketplace page may contain several colors, qualities, bundles or completely different products. The page title and first photograph often describe the family of options rather than the exact option that will be added to the order. Price ranges can also be driven by low-cost accessories or deposits listed beside the main item.",
          "Open every selector and identify what changes. Check whether size and color are separate fields, whether the price updates with the option, and whether a bundle includes the pieces shown in the hero image. Look for seller notes about pre-orders, delayed dispatch, non-returnable items, missing packaging or version differences. Automated translation helps with orientation, but ambiguous conditions deserve a manual check before payment.",
          "The safest test is to describe the selected option in one plain sentence: “one black jacket, size L, option code 03, with the detachable liner.” If the listing does not let you form an unambiguous sentence, the order is not ready.",
        ],
      },
      {
        heading: "Separate seller risk from shopping-agent service",
        paragraphs: [
          "There are two different decisions in a proxy-purchase order. One is whether the purchasing and warehouse service can process the order. The other is whether the marketplace seller will send the expected product. A smooth platform interface does not turn an unclear seller listing into a reliable one, and a well-reviewed seller does not guarantee that every option on the page is equally good.",
          "Review the seller information available on the source marketplace: transaction history where visible, recent feedback, buyer photographs, repeat complaints and the age or consistency of the listing. Give more weight to evidence tied to the same product and option. Generic praise, copied promotional images and comments without order detail are weaker signals.",
          "When evidence is thin, reduce the test size. A first order should be small enough that you can inspect the workflow without committing an entire haul to one unknown seller. That approach is slower than chasing the lowest displayed price, but it produces information you can actually use.",
        ],
      },
      {
        heading: "Treat prices as time-stamped, not permanent",
        paragraphs: [
          "A spreadsheet may show a reference price, but the live amount can move because the seller changes the listing, an option carries a different price, domestic delivery is added or a temporary promotion ends. Currency conversion and payment costs can also make the amount paid differ from a quick exchange-rate calculation.",
          "Check the price at three moments: when shortlisting the product, when the exact option is selected and immediately before payment. Distinguish the item price from domestic Chinese delivery and from later international shipping. Combining those separate stages into one guessed total is a reliable way to underestimate the order.",
          "Avoid claims that an item is the “cheapest batch” or “best value” unless the comparison names the same version, date and included pieces. A lower number may describe a deposit, a replacement part or a stripped-down option rather than the product shown in the main image.",
        ],
      },
      {
        heading: "Use images to identify, not to authenticate",
        paragraphs: [
          "The product cards on this site are paired with their destination item pages so that the visible image does not silently open an unrelated listing. That is an important quality-control step for a directory, but it is still only a link match. Seller images can be edited, heavily lit or reused across listings. They cannot prove what will arrive at a warehouse.",
          "Look for consistency across the title, option selector, detail photographs and buyer images. If one section shows different hardware, proportions or packaging, record the discrepancy and ask which version the chosen option represents. For garments, compare the measurement chart rather than relying on a familiar size label. For footwear, confirm the tagged size system and whether the listing describes internal length.",
          "Authenticity cannot be established from a spreadsheet thumbnail or a few general warehouse photographs. If authenticity matters, use authorized retail channels and evidence appropriate to that decision. A directory should never turn a visual resemblance into a guarantee.",
        ],
      },
      {
        heading: "Build a handoff note for warehouse QC",
        paragraphs: [
          "Before submitting the order, decide what must be visible when the item reaches the warehouse. The answer should be product-specific. For shoes, that might include the size tag, outsole, both lateral sides and any obvious shape difference. For a jacket, it might include the measurement tape across the chest, zipper, removable parts and the color under neutral light.",
          "Write down the three or four checks that would change your decision. This produces a better review than trying to inspect everything at once. It also helps you notice whether the standard images are sufficient. LoloBuy’s public page states that warehouse arrivals are quality-inspected and photographed, but it does not publicly establish every photo angle or a universal number of free images. Check the current order interface before assuming a particular photo allowance.",
          "When the photographs arrive, compare them with your saved listing and option note. Do not compare them only with an inspiration image from social media, which may represent a different seller or version.",
        ],
      },
      {
        heading: "A repeatable workflow from find to decision",
        paragraphs: [
          "Begin in the spreadsheet with a specific search or a category. Open the matched destination page and confirm that the image, title and item belong together. Save the source listing, record the exact variant and read seller conditions. Estimate the complete purchase stage, including domestic delivery, without pretending that international freight is already known.",
          "Submit only an unambiguous order. When the item reaches the warehouse, review identity first, then option, size information, visible condition and the few product-specific details that matter most. If something is unclear, act within the current order and seller time limits rather than waiting until parcel submission.",
          "Plan the parcel only after warehouse measurements and available routes are visible. Recheck the live terms for services, fees and restrictions because they can change. This sequence may feel more deliberate than clicking through from a thumbnail, but it is exactly what turns a spreadsheet from a gallery into a useful buying tool.",
        ],
        bullets: [
          "Find: use a precise term or a relevant category.",
          "Verify: open the live item and check every selected option.",
          "Record: save the source, date, seller and variant details.",
          "Inspect: compare warehouse evidence with the order record.",
          "Ship: use current packed data and available routes.",
        ],
      },
    ],
  },
  {
    slug: "lolobuy-qc-photos-guide",
    title: "LoloBuy QC Photos: A Warehouse Inspection Guide That Avoids Guesswork",
    seoTitle: "LoloBuy QC Photos Guide: What to Check",
    shortTitle: "LoloBuy QC Photos Guide",
    description:
      "Learn how to review LoloBuy QC photos for identity, variants, measurements and visible condition, plus what warehouse pictures cannot prove.",
    eyebrow: "Warehouse inspection guide",
    primaryKeyword: "LoloBuy QC",
    secondaryKeywords: [
      "LoloBuy QC photos",
      "LoloBuy warehouse inspection",
      "how to read QC photos",
      "LoloBuy product check",
    ],
    intent: "Review a warehouse arrival before parcel submission",
    checkedDate: "28 July 2026",
    publishedDate: contentDates.articles["lolobuy-qc-photos-guide"].published,
    modifiedDate: contentDates.articles["lolobuy-qc-photos-guide"].modified,
    image: "/social/qc-guide.png",
    imageAlt:
      "Warehouse photo checklist covering item identity, variant, condition and measurements",
    imageCaption:
      "Review QC in a fixed order: confirm identity and variant, inspect visible condition, then request only the measurements that affect the decision.",
    standfirst:
      "Good QC is not a hunt for microscopic flaws. It is a structured comparison between what was ordered and what arrived. Start with identity and variant, move to visible measurements and condition, then decide whether the photographs answer the few questions that could change your decision.",
    takeaways: [
      "LoloBuy publicly states that warehouse arrivals are inspected and photographed.",
      "Review the ordered identity and variant before cosmetic details.",
      "Ask measurement questions with a specific tape position and purpose.",
      "Photos cannot prove hidden construction, long-term durability or authenticity.",
    ],
    sourceNote:
      "Research basis: LoloBuy’s public homepage states that after a merchant sends goods to the warehouse, the service conducts a quality inspection, takes photos and provides 90 days of free storage. The public page does not establish a universal photo count or extra-photo fee, so this guide does not invent one.",
    sections: [
      {
        heading: "What LoloBuy publicly says about warehouse inspection",
        paragraphs: [
          "LoloBuy’s public homepage describes a clear warehouse stage: after the merchant sends the goods to the warehouse, the service conducts quality inspection and takes photographs. The same public description states that items receive 90 days of free storage. Those are useful facts because they confirm that buyers have an inspection window between domestic delivery and international parcel submission.",
          "The public page does not, however, state a universal number of free photographs, a fixed price for extra images or a guaranteed set of angles for every product. Interfaces and service policies can change. Check the current order page for the actual photo set, available requests, fees and deadlines rather than copying a number from an older guide.",
          "The goal of this page is therefore not to promise a package of services. It is to show how to use whatever clear warehouse evidence is available. A disciplined review can catch wrong items, wrong variants and visible damage without pretending that photographs answer questions they cannot answer.",
        ],
      },
      {
        heading: "Prepare the QC checklist before the item arrives",
        paragraphs: [
          "The best time to decide what matters is before the warehouse photos appear. Save the source listing, selected option, size, color, quantity and any seller note that changes the order. If you wait until the photographs arrive, memory tends to replace the actual listing and small option differences are easy to miss.",
          "Choose three to five decision-changing checks. A shoe buyer may care about tagged size, outsole, both sides and a measurement. A coat buyer may care about color, chest width, zipper and detachable parts. An electronics accessory buyer may need the exact connector, model marking and included pieces. The checklist should reflect the product, not a generic social-media QC template.",
        ],
      },
      {
        heading: "First pass: confirm identity and quantity",
        paragraphs: [
          "Begin with the largest possible error. Confirm that the received object is the product type and model you ordered. Compare recognizable design details, the option name and any visible code. If the order contains two units, verify that two units appear in the record or photographs. A detailed cosmetic review is wasted effort if the warehouse received the wrong item.",
          "Do not rely on packaging alone. Boxes and bags can be reused, damaged or associated with a different option. Use the item itself and the order data together. If only one side of a pair is visible, make a note; two visually similar shoes can still carry different size tags, as one recent community reviewer reported in an individual LoloBuy order.",
          "That report is useful as an example of what identity checking can catch, but it is not proof of a universal outcome. Treat each warehouse arrival as its own record.",
        ],
      },
      {
        heading: "Second pass: verify color, size and selected variant",
        paragraphs: [
          "Marketplace listings frequently group many options under one page. Compare the warehouse result with the exact selector value saved at ordering time, not with the page’s first image. A color can also shift under different lighting, so look for consistency across several photographs and use visible labels or option codes where possible.",
          "Size tags are an identity check, not a fit guarantee. Different manufacturers use different grading, and the same printed size can correspond to different measurements. If fit matters, compare a physical measurement with a garment you already own. State exactly where the tape should begin and end; an undefined “length” can be measured in several ways.",
          "For bundles, list every expected piece. Promotional photographs often show styling props or optional accessories that are not included. The option text and seller notes should determine the expected contents.",
        ],
      },
      {
        heading: "Third pass: review visible condition",
        paragraphs: [
          "Now inspect the front, back, sides and areas that may have been compressed in domestic transit. Look for obvious marks, tears, dents, detached hardware, missing pieces, large asymmetry and severe deformation. Zoom in, but do not mistake image compression, reflections or folds in protective film for confirmed damage.",
          "Compare repeated features. On a pair of shoes, look at both toe shapes, heel height and panel alignment. On a bag, compare handle attachment, closure position and visible hardware. On clothing, examine seams that are clearly shown, printed placement and whether the garment appears to be the ordered cut. The aim is to identify meaningful visible differences, not to score every stitch from a distant photograph.",
          "When something looks uncertain, describe the location and the evidence needed: “Please photograph the mark on the left sleeve under direct light” is more useful than “take better pictures.”",
        ],
      },
      {
        heading: "Measurements that actually answer a fit question",
        paragraphs: [
          "A measurement request is valuable only when it is reproducible. For tops, specify flat chest width, shoulder width, back length or sleeve length and define the endpoints. For trousers, waist width laid flat, rise, inseam and hem opening may matter. For shoes, an insole measurement can be more informative than an external sole measurement, provided the insole can be measured clearly.",
          "Compare like with like. A curved tape, a stretched waistband or a garment measured over thick folds can produce misleading numbers. Use the seller’s chart as a reference, then compare the warehouse measurement with a well-fitting item measured in the same way. Allow for the ordinary small variation inherent in manufacturing and manual tape placement.",
          "Do not ask for every dimension by default. Prioritize the one or two measurements most likely to make the item unusable. Focused requests are easier to interpret and reduce the temptation to overreact to a measurement that was never relevant to fit.",
        ],
      },
      {
        heading: "Product-specific checks",
        paragraphs: [
          "Footwear usually benefits from both side profiles, the toe shape, heel, outsole, size label and any included accessories. Clothing benefits from overall front and back views, the selected size tag, important graphics or embroidery, closures and a targeted measurement. Bags and accessories need the chosen color, dimensions where relevant, closure, straps, detachable pieces and obvious hardware damage.",
          "Electronics and powered items require extra caution. A photograph can confirm model markings, ports and included parts, but it cannot prove battery health, internal components, long-term reliability or compliance with destination-country rules. Do not describe a visual inspection as a functional test unless a specific documented test was actually performed.",
          "Fragile items should be checked for visible chips, cracks or deformation before packaging. Later protection choices can reduce shipping risk, but they cannot repair damage that already exists at warehouse arrival.",
        ],
      },
      {
        heading: "What QC photos cannot prove",
        paragraphs: [
          "Warehouse images are evidence of visible condition at a particular moment. They do not guarantee comfort, fit on your body, hidden stitching, internal materials, odor, battery capacity, waterproofing, durability or performance after repeated use. Color can vary with lighting and screen calibration. A clean image also does not establish authenticity.",
          "If authenticity is a requirement, use authorized retail sources and appropriate documentation. Community “looks good” comments, image-comparison apps and spreadsheet labels are not substitutes for provenance. The same caution applies to safety-critical products: do not rely on general photographs to assess protective equipment, electrical safety or regulated goods.",
        ],
      },
      {
        heading: "Pass, ask or request action",
        paragraphs: [
          "After review, place the order into one of three states. Pass means the visible evidence matches the saved order closely enough for your decision. Ask means one important point is unclear and a specific answer or image could resolve it. Request action means there is a documented mismatch or visible problem that changes your willingness to keep the item.",
          "Return and exchange possibilities depend on the seller’s policy, the item, the order stage and the platform terms shown at that time. Some listings may restrict returns or treat special orders differently. Do not assume that a warehouse photograph creates an unlimited return right. Review the current options and act promptly while the order is still within the applicable window.",
          "Keep communication factual: identify the selected option, point to the relevant photograph and describe the mismatch. A short evidence-based message is more likely to be understood than a long emotional description.",
        ],
      },
      {
        heading: "Use the 90-day storage period as planning space, not a target",
        paragraphs: [
          "LoloBuy’s public page states that the service provides free storage for 90 days. That window can help when products from different sellers arrive at different times, but it should not be interpreted as a reason to delay every decision until the end. A seller’s return or exchange window may be much shorter than warehouse storage.",
          "Review each item soon after its photographs are available. Resolve mismatches first, then wait for other planned products only when the timing makes sense. Keep a simple list of arrival dates, QC status and intended parcel group. This avoids discovering an unresolved issue when the parcel is already being assembled.",
          "Policies can change, so verify the current storage counter and any consequences shown in the account. A dated official statement is useful research, but the live order interface should govern an active order.",
        ],
      },
      {
        heading: "How to use community reviews responsibly",
        paragraphs: [
          "A recent community reviewer described LoloBuy’s interface as intuitive, the QC images as solid and support as responsive during purchases involving footwear and handbags. The same reviewer reported that a mismatched pair of shoe sizes was caught and handled. This is a detailed individual experience, not an independently audited service score.",
          "Give more weight to reviews that include a clear timeline, product type, order status, photographs and the outcome of a specific problem. Treat referral links, coupon claims and broad praise as context rather than proof. A reviewer can accurately describe their own order without establishing what every future buyer will receive.",
        ],
      },
      {
        heading: "Final QC checklist",
        paragraphs: [
          "A good review ends with a short record. Confirm the product identity, selected option, quantity, visible size information, included pieces and obvious condition. Note any measurement used, including where the tape was placed. Save the photographs and the decision while the order is active.",
          "If the evidence answers the important questions, stop searching for impossible certainty. If one decision-changing point remains unclear, ask for that point specifically. If the item visibly differs from the order, use the current platform process promptly. This approach makes QC consistent across products without pretending that a photograph can guarantee everything about the item.",
        ],
        bullets: [
          "Identity: correct product, model and quantity.",
          "Variant: correct color, size, version and bundle.",
          "Condition: no decision-changing visible damage or missing pieces.",
          "Measurement: clear endpoints and like-for-like comparison.",
          "Decision: pass, ask one focused question, or request action promptly.",
        ],
      },
    ],
  },
  {
    slug: "lolobuy-shipping-cost-guide",
    title:
      "LoloBuy Shipping Cost Guide: Weight, Parcel Size, Routes and Consolidation",
    seoTitle: "LoloBuy Shipping Cost Guide: Weight & Parcel Size",
    shortTitle: "LoloBuy Shipping Cost Guide",
    description:
      "Understand LoloBuy shipping cost variables, actual versus volumetric weight, consolidation, packaging, route restrictions and realistic parcel estimates.",
    eyebrow: "International parcel guide",
    primaryKeyword: "LoloBuy shipping",
    secondaryKeywords: [
      "LoloBuy shipping cost",
      "LoloBuy volumetric weight",
      "LoloBuy parcel consolidation",
      "LoloBuy international shipping",
    ],
    intent: "Estimate and plan an international parcel after warehouse arrival",
    checkedDate: "28 July 2026",
    publishedDate:
      contentDates.articles["lolobuy-shipping-cost-guide"].published,
    modifiedDate:
      contentDates.articles["lolobuy-shipping-cost-guide"].modified,
    image: "/social/shipping-guide.png",
    imageAlt:
      "Parcel diagram comparing actual scale weight with volumetric weight",
    imageCaption:
      "A route may compare scale weight with dimensional weight. Packed size, route rules and protection can matter as much as the item weight.",
    standfirst:
      "There is no honest single answer to “How much is LoloBuy shipping?” without a destination, packed weight, dimensions, product type and currently available route. The useful question is how to build an estimate, identify the variables that can move it and compare the final options after warehouse data exists.",
    takeaways: [
      "LoloBuy publicly describes global shipping and combining warehouse items into one parcel.",
      "Chargeable weight may be actual weight or a dimensional calculation, depending on the route.",
      "Consolidation can reduce repeated base costs but can also create a larger, restricted parcel.",
      "Use live packed data and route availability; do not copy an old per-kilogram quote.",
    ],
    sourceNote:
      "Research basis: LoloBuy’s public homepage states that users can select products stored in the warehouse and submit them as one parcel, and describes a global shipping service. It does not publish one fixed worldwide rate. Route names, restrictions, divisors, surcharges and delivery estimates must be checked in the live account.",
    sections: [
      {
        heading: "Why a fixed LoloBuy shipping price would be misleading",
        paragraphs: [
          "International freight is not calculated from the product price. A parcel is priced using a combination of destination, route, product type, packed weight, dimensions and current carrier rules. Fuel or remote-area surcharges, optional packaging and service fees can also matter. A quote copied from another buyer may describe a different country, month, line and parcel shape.",
          "LoloBuy’s public homepage describes global shipping and says warehouse products can be selected and submitted as a single parcel. It does not provide one public worldwide rate that can responsibly be applied to every order. That means a useful guide should explain the calculation process rather than advertise a number that will be wrong for many readers.",
          "The first estimate is a budget range. The decision-quality estimate comes later, after the goods have arrived, the parcel has a realistic packing plan and the account shows routes currently available for that destination and item mix.",
        ],
      },
      {
        heading: "Separate the three cost stages",
        paragraphs: [
          "The product price is the first stage. Domestic delivery from the seller to the Chinese warehouse is the second. International shipping from the warehouse to the destination is the third. Payment processing, currency conversion, optional photographs, packaging or other services may appear around those stages depending on the current platform terms.",
          "Keeping the stages separate makes comparisons more honest. A low marketplace price can be offset by expensive domestic delivery or a bulky package. A higher-priced seller may include domestic shipping or use compact packaging. International freight should not be estimated as a percentage of the item price because two equally priced products can differ dramatically in weight and volume.",
          "Create a simple ledger for each item: purchase amount, domestic delivery, warehouse weight if known and a note about likely packed volume. Add international freight only at parcel level so it is not accidentally counted once per item.",
        ],
      },
      {
        heading: "Actual weight versus volumetric weight",
        paragraphs: [
          "Actual weight is what the packed parcel weighs on a scale. Volumetric or dimensional weight converts the parcel’s external dimensions into a billing weight. Routes that use dimensional billing typically compare the two values and charge on the greater one, although the exact rule and divisor depend on the carrier or line.",
          "A common illustration is length × width × height in centimetres divided by a route-specific divisor. If a packed box measures 50 × 40 × 30 cm, the volume is 60,000 cubic centimetres. With an illustrative divisor of 6,000, dimensional weight would be 10 kg. If the scale weight were 6.2 kg and that route billed the greater value, the chargeable weight would be 10 kg.",
          "That divisor is an example, not a LoloBuy promise. Check the rule displayed for the actual route. The practical lesson is stable: a light but bulky box can cost more than a compact heavier parcel, so packaging dimensions deserve the same attention as the scale reading.",
        ],
        note:
          "Illustrative calculation only: 50 cm × 40 cm × 30 cm ÷ 6,000 = 10 kg dimensional weight. Always use the divisor and billing rule shown for the live route.",
      },
      {
        heading: "What consolidation can and cannot save",
        paragraphs: [
          "LoloBuy publicly states that users can select products stored in the warehouse and submit them as one parcel. Consolidation can reduce repeated packaging and minimum or first-weight charges that might apply to several small parcels. It also lets the buyer make one coordinated packaging decision after all planned items arrive.",
          "Bigger is not automatically cheaper. Combining rigid shoe boxes, a fragile accessory and an item with route restrictions may produce a large parcel with fewer eligible lines. Dimensional weight can increase if empty space is not controlled. A very high-value or difficult-to-replace haul also concentrates risk into one shipment.",
          "Compare at least two scenarios when the account supports the needed estimate: one combined parcel and a logical split by size, fragility or restriction. The best grouping is the one with a sensible total cost, suitable routes and manageable risk—not necessarily the parcel with the most items.",
        ],
      },
      {
        heading: "Packaging is a cost-and-risk decision",
        paragraphs: [
          "Removing unnecessary retail packaging can reduce dimensions, especially for shoes and presentation boxes. Vacuum packing may reduce soft-goods volume where appropriate. On the other hand, corner protection, cushioning, moisture barriers and stronger cartons add material, weight or size. The cheapest packing method is not automatically the lowest expected cost if it exposes a fragile item to damage.",
          "Match protection to the product. Soft clothing usually has different needs from structured hats, glass, electronics or boxes a collector intends to keep. Do not remove packaging that provides essential shape or protection merely to chase a lower dimensional figure.",
          "Record the packaging requests before parcel submission and check how they might affect the estimate. If a route price is close to a weight or size threshold, a small change in carton dimensions may move the parcel into another billing bracket.",
        ],
      },
      {
        heading: "Route availability comes before route comparison",
        paragraphs: [
          "A route must accept the destination, packed weight, dimensions and product type before its headline price or speed matters. Batteries, liquids, magnets, food, cosmetics and other sensitive goods may face restrictions. Carrier rules and destination regulations can change, and a line available to one buyer may not appear for another parcel.",
          "Compare only the options displayed for the actual parcel. Read the weight and size limits, restricted-item notes, tracking level, compensation terms, declared-value rules and delivery-time wording. “Estimated” transit time is not a guaranteed arrival date, especially around customs inspections, holidays, weather events or network congestion.",
          "Avoid selecting a route solely because a community post called it “tax free” or “best.” Understand what the line description means in the current account and what obligations still apply in the destination country.",
        ],
      },
      {
        heading: "Customs, declarations and destination rules",
        paragraphs: [
          "The recipient remains responsible for complying with destination-country law. Customs authorities may assess duties or taxes, request information, inspect a parcel, delay it or refuse goods that do not meet local rules. No directory or shopping agent can guarantee that every parcel will pass without charges or inspection.",
          "Use accurate information and follow the declaration options and limits applicable to the route and destination. Do not copy a declaration value from an unrelated haul. Product categories, value thresholds and enforcement can change, so current official customs guidance is more reliable than an old forum comment.",
          "Items involving intellectual-property concerns, safety regulations or import controls carry additional risk. A shipping estimate does not represent legal clearance, and route availability should not be interpreted as a legal opinion.",
        ],
      },
      {
        heading: "Use warehouse data to improve the estimate",
        paragraphs: [
          "Before arrival, use seller weights and dimensions only as rough planning inputs because they may omit retail packaging or use inaccurate values. After arrival, check the item’s warehouse record. Before final payment, use the packed parcel data or the best available packing estimate shown in the account.",
          "Build a comparison table with route name, chargeable weight, price, stated transit range, tracking, restrictions and compensation terms. Add notes about packaging and whether the quote uses actual or volumetric weight. Comparing rows with the same parcel data is far more informative than comparing isolated per-kilogram figures.",
        ],
      },
      {
        heading: "Plan around the 90-day storage statement",
        paragraphs: [
          "LoloBuy’s public homepage states that goods receive 90 days of free warehouse storage. That can support consolidation when sellers dispatch at different speeds, but it is not a reason to wait indefinitely. Product return windows, route changes and storage policies are separate clocks.",
          "Track each item’s arrival date and QC status. Resolve wrong items or visible problems soon after arrival, then group accepted items by parcel plan. Leave time for a packing adjustment or split if the first estimate produces poor route choices. Do not let the storage deadline become the day you begin shipping research.",
          "Verify the live storage counter and current terms inside the account. Public statements can be updated, and an active order should always follow the conditions actually shown for that item.",
        ],
      },
      {
        heading: "Tracking, transit estimates and delays",
        paragraphs: [
          "A tracking number can be created before the parcel receives its first carrier scan. Early inactivity does not automatically mean the parcel is lost, but a long gap should be evaluated against the route’s stated handling process and support guidance. Save the parcel record, payment, declared contents and tracking number.",
          "Transit ranges are planning information, not promises. Origin handling, export processing, flights, customs, handoff to a local carrier and last-mile delivery all add variability. Public holidays and sales peaks can affect several stages at once.",
          "When asking for help, provide the parcel number, route, dispatch date, last scan and destination. That gives support a concrete timeline. Avoid posting personal addresses or full tracking records publicly.",
        ],
      },
      {
        heading: "A practical pre-payment shipping checklist",
        paragraphs: [
          "Confirm that every item in the parcel has passed your warehouse review. Check the packed weight and dimensions, identify whether the route charges dimensional weight and verify that the product mix is allowed. Compare the complete price and terms of the eligible routes rather than a promotional headline.",
          "Review packaging requests, declared contents, destination address and contact details. Understand the stated delivery range, tracking coverage and compensation conditions. Save the final parcel summary before payment so later questions can be tied to the version you accepted.",
          "This method cannot eliminate international-shipping uncertainty. It can eliminate avoidable uncertainty created by missing inputs, copied quotes and assumptions about how a route bills the parcel.",
        ],
        bullets: [
          "Accepted items only: QC issues resolved before packing.",
          "Packed data: weight, dimensions and chargeable-weight method checked.",
          "Eligible route: destination, product type and parcel limits accepted.",
          "Complete price: current services and packaging included.",
          "Records saved: parcel summary, payment and tracking details.",
        ],
      },
      {
        heading: "The useful answer to “How much will shipping cost?”",
        paragraphs: [
          "The honest answer is a process: define the destination and item mix, estimate weight and volume, wait for reliable warehouse data, choose a packing scenario and compare the live eligible routes. Any figure provided before those inputs exist should be labeled as a budget range.",
          "LoloBuy’s consolidation and global-shipping descriptions establish the broad workflow, but they do not support a universal price claim. A good buyer treats shipping as its own decision after product purchase and QC. That produces a more accurate budget, a better parcel grouping and fewer surprises than borrowing someone else’s rate.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function articleWordCount(article: ArticleRecord) {
  const text = [
    article.title,
    article.standfirst,
    ...article.takeaways,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      section.note ?? "",
    ]),
  ].join(" ");

  return text.trim().split(/\s+/).filter(Boolean).length;
}
