export type LongformSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideContent = {
  title: string;
  deck: string;
  fact: string;
  sections: LongformSection[];
};

export type ArticleContent = {
  title: string;
  deck: string;
  date: string;
  fact: string;
  sections: LongformSection[];
};

export const guideContent: Record<string, GuideContent> = {
  "how-to-use-pikobuy": {
    title: "How to Use PikoBuy: The Six-Step Order Process",
    deck:
      "PikoBuy’s published beginner guide divides an order into six stages. This independent walkthrough explains what happens at each stage, what evidence to save and which decisions still belong to the shopper.",
    fact:
      "Fact check: PikoBuy’s official Beginner’s Guide lists six stages—select, search, submit and pay, warehouse inspection, pay shipping and wait for the parcel. Reviewed July 29, 2026.",
    sections: [
      {
        title: "1. Select a product and record the exact option",
        paragraphs: [
          "PikoBuy’s first published step is to select a product from Taobao, Tmall, 1688, Weidian or Yupoo and confirm the style, colour and size. That sounds simple, but most avoidable order problems begin here. A product page may combine several colours, batches or sizes under one URL. Save the seller name, the exact option wording, the current price, domestic shipping and the size chart before moving on.",
          "A screenshot is useful when a listing is likely to change, but it should support—not replace—the live page. Write one short note describing the item you expect to receive. “Black, size L, white chest embroidery” is something a warehouse photo can later confirm. “The best version” is not. Clear, observable instructions reduce the chance that a buyer and a purchasing agent interpret the same listing differently.",
        ],
        bullets: [
          "Keep the original marketplace link and seller name together.",
          "Save the selected colour, size, quantity and any option code.",
          "Translate the size chart and compare measurements, not only size letters.",
          "Treat price and stock as live information that can change.",
        ],
      },
      {
        title: "2. Search by keyword or paste the source link",
        paragraphs: [
          "The second official step says that a shopper can search by keyword or paste a product link into PikoBuy. Keyword search is useful for discovery; a source link is usually better when you already chose a specific seller or batch. After the item imports, compare the PikoBuy display with the original page. Check that the title, selected options, price and domestic delivery information still refer to the same product.",
          "If the listing cannot be imported cleanly, do not guess. PikoBuy’s guide tells users to contact customer service when they cannot find the item. A manual order note should identify the product and option precisely. It should not ask staff to make subjective decisions about quality, fit or authenticity on the shopper’s behalf.",
        ],
      },
      {
        title: "3. Submit the order and understand the first payment",
        paragraphs: [
          "PikoBuy describes the third step as choosing the product options, submitting the order and completing the first payment. This payment covers the product-side order; it is not the complete delivered cost. International parcel shipping is selected and paid later, after the item reaches the warehouse.",
          "That two-stage structure matters when you compare finds. A low item price may sit beside domestic seller-to-warehouse shipping, optional warehouse services, return costs and an international parcel charge. Keep these lines separate in your budget. If an item is out of stock, PikoBuy’s beginner guide says the order will be refunded, but the live order status remains the place to verify what happened.",
        ],
      },
      {
        title: "4. Review the warehouse evidence promptly",
        paragraphs: [
          "The fourth official step is warehouse inspection. PikoBuy says the warehouse checks the item in, takes photos and looks for defects. Start with identity: product, colour, size, quantity and included parts. Then move to category-specific details such as garment measurements, print alignment, shoe labels, pair symmetry, bag hardware or visible damage.",
          "PikoBuy’s shipping policy says additional detailed photos can be purchased when needed, but the public policy does not state a fixed number of standard photos or a permanent extra-photo price. Ask for a precise view only when it answers a decision. A ruler beside the chest width is useful; “take more photos” is not.",
        ],
      },
      {
        title: "5. Build the parcel and compare live routes",
        paragraphs: [
          "The fifth step is to choose a logistics route, submit the parcel and pay international shipping. PikoBuy’s public estimator asks for destination country or region, product type, weight, length, width and height. Those fields explain why another shopper’s price-per-kilogram screenshot is not a reliable quote for your parcel.",
          "Use the warehouse measurements and the route rules shown at submission. Check whether one product limits the available routes, whether packaging changes the measured size and whether the route handles the item type. The lowest displayed figure is not automatically the best route if its restrictions, billing method or protection do not match the parcel.",
        ],
      },
      {
        title: "6. Track the parcel and keep a clean record",
        paragraphs: [
          "PikoBuy’s final step is to wait for the parcel. Its beginner guide says logistics information should be available within three days after shipment. Cross-border tracking can move through warehouse dispatch, carrier acceptance, export handling, destination customs and local delivery, with quiet periods between scans.",
          "Keep the parcel number, route name, approved warehouse photos and final declared contents together. PikoBuy’s shipping policy says third-party logistics risks and uncontrollable events such as customs action, damage, loss and peak-season delay cannot be eliminated. A clear record makes it easier to ask a focused question if tracking stalls or the delivered condition differs from the warehouse evidence.",
        ],
      },
      {
        title: "A practical pre-parcel checkpoint",
        paragraphs: [
          "Before paying international shipping, pause once. Confirm that every item in the parcel is the item you approved, that any return question has been resolved and that the product categories fit the chosen route. Check the final address and contact information carefully; PikoBuy’s terms place responsibility on the user to provide accurate registration and shipping details.",
          "The purpose of a spreadsheet or finds directory is to shorten discovery. It cannot replace this checkpoint. The live order, warehouse record and parcel quote should control the final decision because they contain the current information for your specific purchase.",
        ],
        bullets: [
          "Options match the submitted order.",
          "Warehouse photos answer the important visible questions.",
          "Return eligibility and deadlines have been checked where relevant.",
          "Parcel weight, dimensions, product type and destination are current.",
          "The selected route is permitted for every item in the parcel.",
        ],
      },
    ],
  },
  "pikobuy-qc-checklist": {
    title: "PikoBuy QC Photos: What to Check Before Shipping",
    deck:
      "Warehouse photos are useful only when the review has a purpose. This checklist separates visible evidence from assumptions and turns each photo request into a decision you can act on.",
    fact:
      "Fact check: PikoBuy says items are inspected and photographed at its warehouse. Its Shipping Policy says additional detailed photos may be purchased, but it does not publish a fixed photo count or price on that page.",
    sections: [
      {
        title: "Start with identity, not minor finish details",
        paragraphs: [
          "Open the submitted order beside the warehouse photos. Confirm the product type, colour, size label, quantity and selected variant before studying stitching or surface finish. A wrong option is more important than a small loose thread. Compare the overall shape and panel layout with the source listing, while allowing for lighting and camera angle.",
          "If the item includes removable parts—laces, straps, dust bags, chargers or other accessories—check whether the order or listing actually promised them, then look for visible confirmation. Do not turn an ambiguous listing image into a guarantee that the seller included every prop used in the photograph.",
        ],
        bullets: [
          "Correct item, option, colour, size and quantity",
          "No obvious damage from domestic transport",
          "Required parts and accessories are visible",
          "Source listing and warehouse item have the same basic construction",
        ],
      },
      {
        title: "Shoes: compare the pair, labels and structure",
        paragraphs: [
          "Look at both shoes together. Compare toe shape, heel height, outsole alignment, panel spacing and major stitching paths. Then check the size labels on the pair. When fit is critical, a ruler photo of an insole or outsole is more useful than a generic “true to size” claim.",
          "Photographs can reveal obvious separation, deep scratches, strong asymmetry or conflicting labels. They cannot prove comfort, material composition, waterproofing or long-term durability. Keep the conclusion narrow: “both size labels show EU 43” is evidence; “these will fit perfectly” is not.",
        ],
      },
      {
        title: "Clothing: measurements first, then visible finish",
        paragraphs: [
          "A size letter is not a measurement standard. Compare chest width, garment length, shoulders, waist or sleeve length with an item you already own. If the listing chart and warehouse measurement use different methods, note where the ruler starts and ends before deciding there is a mismatch.",
          "After measurements, review print or embroidery placement, pocket alignment, zipper path, stains, cuts and obvious seam problems. Wrinkles from folding are not the same as damage. Focus on issues that will remain when the item is unpacked and worn.",
        ],
      },
      {
        title: "Bags, hats and accessories: shape and hardware",
        paragraphs: [
          "For bags, check front and back shape, handle alignment, strap attachments, closures, edge finish and visible hardware. Ask for the interior to be opened only if the lining, pockets or included strap matters to your decision. For hats, compare crown shape, brim symmetry, embroidery and the inside size or care label.",
          "Warehouse lighting can create strong reflections on metal and coated surfaces. Use more than one angle before calling a highlight a scratch. For small accessories, a ruler photo can settle scale questions that styled listing images cannot.",
        ],
      },
      {
        title: "Request one answer, not “more photos”",
        paragraphs: [
          "PikoBuy’s Shipping Policy confirms that a user may purchase additional detailed photos. It does not publicly specify a permanent price or number on that policy page, so check the live service screen. Make each request observable: “photograph both heels level from the rear” or “place a ruler across the chest from armpit to armpit.”",
          "Avoid asking warehouse staff for subjective verdicts such as whether an item feels premium or is authentic. PikoBuy’s policy also says specialised products cannot receive professional inspection. An extra image can provide evidence; it cannot turn a visual warehouse check into a laboratory test, brand authentication or performance trial.",
        ],
      },
      {
        title: "Review before the return window closes",
        paragraphs: [
          "PikoBuy’s Returns & Exchanges page says an eligible return request should be made within five days after the order becomes “Warehoused,” defined there as 120 hours beginning from the next hour after that status change. Eligibility also depends on the seller, product condition and category. Custom-made goods, underwear, food, opened sealed goods and several other categories can be ineligible.",
          "If the product is wrong, damaged or materially different from the submitted option, record the issue in neutral language and use the live return controls immediately. The warehouse date does not make every item returnable, and a return still depends on seller agreement under the published policy.",
        ],
      },
      {
        title: "Approve only what the evidence supports",
        paragraphs: [
          "A clean photo set supports a decision to ship when the visible item meets the standards you defined before purchase. It does not promise fit, authenticity, odour, internal electronics, fibre content or future wear. Save the reviewed images with the order and parcel reference.",
          "This approach is deliberately less dramatic than social-media QC. It catches wrong options first, uses close-ups to answer specific questions and leaves uncertain qualities labelled as uncertain. That is more useful than a red-light or green-light verdict that hides the limits of the available evidence.",
        ],
      },
    ],
  },
  "pikobuy-shipping-cost": {
    title: "PikoBuy Shipping Cost: Weight, Size and Route Variables",
    deck:
      "International shipping is calculated for a parcel, not a product card. Use the official estimator fields to build a range, then replace assumptions with warehouse data before choosing a route.",
    fact:
      "Fact check: PikoBuy’s Shipping Cost Estimation page asks for destination, product type, weight, length, width and height. Public route prices can change and should be checked at parcel submission.",
    sections: [
      {
        title: "Collect the six official estimator inputs",
        paragraphs: [
          "Start with destination country or region, product type, weight, length, width and height. These are the fields on PikoBuy’s public estimator. If one is missing, label the result as an early estimate rather than a quote. Product-page dimensions and seller weights may describe the item before warehouse packaging, so keep their source visible.",
          "Once the item reaches the warehouse, replace seller estimates with the recorded figures. After consolidation or packaging changes, check again. The most useful estimate is not the earliest number; it is the number whose assumptions match the parcel you are about to submit.",
        ],
      },
      {
        title: "Separate item weight from packed parcel size",
        paragraphs: [
          "A shoe, coat or bag has its own weight. The parcel also contains boxes, wrapping, reinforcement and empty space. Some routes may compare actual and volumetric measures according to their live billing rules, which is why PikoBuy’s estimator asks for three dimensions as well as kilograms.",
          "Do not compare your unpacked product weight with another shopper’s final parcel. Record whether each figure is seller-provided, warehouse-recorded or final packed data. A range is more honest than a precise number built from mixed measurements.",
        ],
      },
      {
        title: "Product type can control the route list",
        paragraphs: [
          "Batteries, liquids, cosmetics, food and other sensitive or restricted goods can affect route availability. PikoBuy’s Shipping Policy also warns that customs rules and uncontrollable logistics events create risks. A quote for ordinary clothing should not be copied onto a parcel with electronics or liquids.",
          "When one item restricts the whole parcel, compare a split shipment with a consolidated shipment. Count the additional parcel and packaging cost rather than assuming that two shipments are cheaper. The live route screen is the decision point because it reflects the current destination, contents and carrier rules.",
        ],
      },
      {
        title: "Treat packaging as a trade-off",
        paragraphs: [
          "Removing a nonessential retail box can reduce volume. Reinforcement can improve protection but may increase weight and dimensions. The right choice depends on the item: a soft garment and a fragile structured bag do not face the same risk.",
          "Model two scenarios when the difference matters—protective packaging retained and unnecessary bulk removed. Recalculate with new measurements. The objective is not the smallest possible parcel; it is a parcel that balances billed size, item protection and route eligibility.",
        ],
      },
      {
        title: "Keep every cost layer visible",
        paragraphs: [
          "Separate product price, Chinese domestic shipping, optional warehouse services, return cost and international shipping. PikoBuy’s User Agreement currently states that the platform service fee for package forwarding is calculated at 8% of freight, while noting that settlement can vary slightly with exchange rates. Verify the live checkout before paying because published terms can change.",
          "This layered view prevents a cheap product from looking cheap after every other cost is hidden. It also shows where a decision changed the total: the seller, the item category, a packaging request, a return or the chosen international route.",
        ],
        bullets: [
          "Product and domestic seller-to-warehouse delivery",
          "Optional warehouse photos or packaging services",
          "Return shipping and any applicable service charge",
          "International route charge and published forwarding service fee",
          "Destination taxes, duties or brokerage where applicable",
        ],
      },
      {
        title: "Compare route fit, not only the first price",
        paragraphs: [
          "Routes can differ in restrictions, billing method, tracking and protection. PikoBuy’s terms say cross-border transactions may also create duties, taxes, brokerage fees or other costs for the user. These destination-side charges are not reliably predicted by a product spreadsheet.",
          "Read the route details at submission and keep a screenshot of the selected service. A guide can explain how to compare live choices, but it should not publish a permanent “cheapest line” or promise a delivery time that depends on a third-party carrier and customs.",
        ],
      },
      {
        title: "Use a three-stage estimate",
        paragraphs: [
          "Before purchase, use seller weight and packaging clues to reject obviously unsuitable combinations. At warehouse arrival, replace guesses with recorded product data and decide whether consolidation or packaging changes make sense. At parcel submission, use the final packed measurements and current route list.",
          "Each stage has a different job. The early estimate protects the budget, the warehouse estimate tests the plan and the live quote authorises the spend. Keeping those stages separate is the simplest way to avoid presenting a planning number as a guaranteed charge.",
        ],
        bullets: [
          "Early plan: estimated item weight, size and product type",
          "Warehouse plan: recorded data plus packaging decision",
          "Final decision: live route, current restrictions and final parcel charge",
        ],
      },
    ],
  },
};

export const articleContent: Record<string, ArticleContent> = {
  "pikobuy-spreadsheet-product-research": {
    title: "PikoBuy Spreadsheet Research: From a Find to a Better Shortlist",
    deck:
      "A spreadsheet can make discovery faster, but the card is only the beginning. Here is a practical research method for turning product links into a shortlist you can actually defend.",
    date: "July 29, 2026",
    fact:
      "Source basis: PikoBuy’s official About, Beginner’s Guide, Shipping Cost Estimation, Shipping Policy, Returns & Exchanges and Terms pages. Reviewed July 29, 2026.",
    sections: [
      {
        title: "What a useful PikoBuy spreadsheet should do",
        paragraphs: [
          "A good spreadsheet reduces the blank-page problem. Instead of opening a Chinese marketplace with no plan, you begin with categories, product images and direct paths to items that may be relevant. That speed is genuinely useful. It also creates the biggest risk: a polished product card can feel like a recommendation even when it is only an index entry.",
          "The right mental model is simple. A find is a lead, not a verdict. Open the live product detail, confirm that the expected item still appears and check whether the price, options and seller information changed. The product page should control the decision because listings can be edited, removed or repurposed after a directory adds them.",
          "This site deliberately sends each product card to the full catalogue detail rather than hiding the destination behind an unexplained button. That does not certify the item. It gives the shopper a clearer place to continue the research.",
        ],
      },
      {
        title: "Run a two-minute first-pass screen",
        paragraphs: [
          "The first pass is not a deep quality review. It is a quick way to remove links that cannot support a careful order. Confirm that the page opens, the product matches the card, the option names are understandable and the current price is visible. Look for a size chart or dimensions where fit matters. If the listing combines unrelated products under one option menu, slow down.",
          "PikoBuy’s Beginner’s Guide says users can choose products from Taobao, Tmall, 1688, Weidian or Yupoo, then search by keyword or paste a link. Pasting the original source usually preserves more seller and option context. Keyword search is useful for discovery, but visually similar results may come from different sellers or batches.",
          "Reject dead links, ambiguous variants and items whose basic identity cannot be confirmed. A smaller shortlist with clear differences is more useful than a page of near-duplicates.",
        ],
        bullets: [
          "The live page still shows the expected item.",
          "Seller or store information can be recorded.",
          "Colour, size and quantity options are specific.",
          "The current price and domestic delivery are visible.",
          "You know which detail must be checked at the warehouse.",
        ],
      },
      {
        title: "Compare options with evidence, not labels",
        paragraphs: [
          "Size letters are not a universal standard. Translate the chart and compare garment measurements with something you already own. For shoes, note the listed sizing system and decide whether a warehouse ruler photo would settle the question. For bags and accessories, record the dimensions rather than estimating scale from a styled photo.",
          "Do the same with product variations. If a listing offers “black,” “upgraded black” and “black 2,” write down the exact selected label and the visual difference claimed by the seller. A purchasing note should describe what can be observed—colour, size, print or hardware—not ask an agent to choose a subjective “best version.”",
          "PikoBuy’s guide says the final price is based on actual purchasing and that an out-of-stock item will be refunded. That makes the live order status more important than a cached spreadsheet price. The directory price is a research reference, not a permanent offer.",
        ],
      },
      {
        title: "Give every surviving product a reason",
        paragraphs: [
          "A shortlist becomes useful when each item has a reason to stay. One option may have a clearer size chart. Another may show the inside label. A third may use less bulky packaging or come from a listing with simpler variations. Write one sentence beside each candidate. If you cannot explain the difference, you probably have duplicates rather than choices.",
          "Also record a rejection threshold before purchase. For a hoodie, it might be a chest measurement below your minimum. For a shoe, it might be a conflicting size label or visible sole separation. For a bag, it might be missing hardware. This turns the warehouse review into a comparison against a standard instead of a mood.",
          "Avoid claims a listing cannot prove. Product photos cannot establish authenticity, fibre content, durability, waterproofing or long-term comfort. PikoBuy’s Terms prohibit counterfeit and intellectual-property-infringing goods, so legal and brand-authentication questions should never be replaced by a casual visual guess.",
        ],
      },
      {
        title: "Plan the warehouse check before the item arrives",
        paragraphs: [
          "PikoBuy’s fourth published order step is warehouse inspection: the item is checked in, photographed and examined for defects. The useful work begins before that notification. Save the source images and decide which visible features matter. When the warehouse set arrives, start with product identity, colour, size, quantity and included parts.",
          "Then move to category-specific evidence. Compare both shoes together, use measurements for clothing, inspect bag attachments and open an interior only when it affects the decision. PikoBuy’s Shipping Policy says additional detailed photos may be purchased, but it does not publish a permanent photo count or price on that page. Check the live service screen instead of relying on an old forum comment.",
          "A precise request saves time: “photograph the left sleeve print straight on” or “place a ruler across the chest.” “More QC photos” does not identify the missing evidence.",
        ],
      },
      {
        title: "Use return rules while they are still useful",
        paragraphs: [
          "The Returns & Exchanges page describes a five-day warehouse request window for eligible goods. It defines the period as 120 hours beginning from the next hour after an order becomes “Warehoused.” That is a reason to review photos promptly, not a promise that every item can be returned.",
          "Eligibility depends on seller participation, item condition, packaging and category. The policy lists exclusions and special standards, including custom goods, underwear, food and opened sealed products. It also says a return can only proceed when the seller agrees. If the item is wrong or visibly damaged, document the exact issue and use the live order controls immediately.",
          "The same page currently lists unconditional return cost as seller-side shipping, the original seller shipping and a 5 RMB service fee. Check the current order because fees and seller rules can change. Do not publish a blanket “free returns” statement.",
        ],
      },
      {
        title: "Put delivered-cost clues into the shortlist",
        paragraphs: [
          "A product price is not a delivered price. PikoBuy’s official estimator asks for destination, product type, weight, length, width and height. That means bulky packaging, rigid boxes, heavy outerwear and sensitive categories belong in the comparison before purchase.",
          "You do not need a perfect shipping quote at the shortlist stage. Mark obvious differences instead. A soft T-shirt and a boxed shoe should not carry the same shipping assumption. A battery or liquid can change the available route list. If packaging is likely to matter, compare a protected scenario with a lower-volume scenario after the warehouse records useful measurements.",
          "Keep product payment, domestic delivery, optional services, returns and international parcel shipping on separate lines. The live parcel quote remains the decision point because it uses the current contents, destination and routes.",
        ],
      },
      {
        title: "The final shortlist should be easy to audit",
        paragraphs: [
          "Before ordering, a surviving item should have a live source, an exact option, a current price, useful measurements, one or two reasons for selection and a planned warehouse check. It should also carry an uncertainty note where the evidence stops. That is more honest than a green “verified” badge with no supporting record.",
          "After the item arrives, update the note with the warehouse status and the decision: ship, request one specific image, return or remove from the future list. Over time, dead links and changed options should be removed. A directory stays useful by becoming more selective, not merely larger.",
          "This is also the safest content strategy for search users. A page earns trust when it helps a shopper make a decision, states the source of factual claims and refuses to invent permanent fees or quality guarantees. The spreadsheet is the entrance. The research trail is the value.",
        ],
        bullets: [
          "Live listing checked and dated",
          "Exact option and measurements recorded",
          "Warehouse evidence plan written in advance",
          "Shipping variables and return timing acknowledged",
          "Uncertain qualities labelled as uncertain",
        ],
      },
    ],
  },
  "warehouse-photos-before-shipping": {
    title: "PikoBuy QC Photos Before Shipping: A Practical Review Routine",
    deck:
      "Warehouse photos are time-sensitive evidence, not a quality certificate. Review them in a consistent order so wrong options and return deadlines do not disappear behind tiny details.",
    date: "July 27, 2026",
    fact:
      "Source basis: PikoBuy’s official Beginner’s Guide, Shipping Policy and Returns & Exchanges page. The public policy confirms optional detailed photos but does not publish a fixed count or permanent photo price.",
    sections: [
      {
        title: "Why the warehouse review deserves a routine",
        paragraphs: [
          "PikoBuy’s Beginner’s Guide says the warehouse inspects an arriving item, checks it in, takes photos and looks for defects. That stage sits between the seller and international shipping. It is the moment when the product is visible in China and a return may still be possible, so the order of your review matters.",
          "Social posts often begin with tiny stitching differences or brand details. A practical review begins with identity. Is this the product, colour, size and quantity you submitted? Are the required pieces present? A wrong size creates a bigger problem than a loose thread. If the basic identity fails, record it before spending time on cosmetic details.",
          "Keep the original order, listing images and your measurement notes open beside the warehouse set. The comparison should be against what you actually ordered, not a generic checklist copied from another product.",
        ],
      },
      {
        title: "Move from wide views to specific evidence",
        paragraphs: [
          "Use front, back and side views to judge the overall shape, symmetry and obvious damage. Then move closer to size labels, prints, embroidery, hardware, closures and measurements. This order prevents a sharp close-up from distracting you from a structural mismatch.",
          "Warehouse images are affected by lighting, compression and camera angle. One photograph may make a colour look warmer or a heel look uneven. Look for the same signal in more than one view. If the doubt matters to the decision, ask for an angle that resolves it directly.",
          "Write neutral observations. “Dark mark beside the right cuff in photo three” can be checked. “Terrible quality” cannot. Specific notes are more useful if the seller must be contacted and less likely to turn a camera artefact into a claim.",
        ],
      },
      {
        title: "Check by product category",
        paragraphs: [
          "For shoes, compare the pair together. Check toe shape, heel height, outsole alignment, visible separation and both size labels. A ruler beside an insole or outsole can be useful when the listing size chart is unclear. Photos still cannot prove comfort, material composition or fit on your foot.",
          "For clothing, prioritise flat measurements over size letters. Compare chest, length, shoulders, waist or sleeves with a garment that fits. Then inspect print placement, embroidery, pockets, zippers, stains and cuts. Wrinkles from folding are different from permanent damage.",
          "For bags, hats and accessories, review symmetry, attachments, closures, edge finish, hardware and visible labels. Ask for an opened interior or ruler only when scale, lining or included parts affect the decision. Reflective surfaces need more than one angle before a highlight is called a scratch.",
        ],
      },
      {
        title: "Order an extra photo only when it answers a question",
        paragraphs: [
          "PikoBuy’s Shipping Policy says additional detailed photos may be purchased. The same public page does not specify a fixed standard-photo count, a permanent extra-photo price or a video-inspection fee. Those details should be checked in the live account rather than copied from an undated review.",
          "A good request names the location, angle and evidence: “both heels level from the rear,” “inside size label in focus,” “bag opened with the removable strap visible” or “ruler across the chest from armpit to armpit.” This produces a photo you can act on.",
          "Do not ask warehouse staff to decide whether an item is authentic, premium or durable. PikoBuy’s Shipping Policy says special and professional products cannot receive professional inspection services. The photo can show visible condition; it cannot convert a visual check into expert authentication or performance testing.",
        ],
        bullets: [
          "Name one exact part of the product.",
          "Specify the angle or measurement method.",
          "State the comparison the image should resolve.",
          "Avoid subjective requests with no observable answer.",
        ],
      },
      {
        title: "Understand the five-day return clock",
        paragraphs: [
          "PikoBuy’s Returns & Exchanges page describes a five-day return guarantee for eligible products. It says a request should be submitted within five days after the order status becomes “Warehoused,” with five days defined as 120 hours beginning from the next hour after the status change. A request may not be accepted after that period.",
          "The clock does not make every purchase returnable. The seller must offer the return guarantee, the product must remain marketable under the seller’s rules and the warehouse time must remain within the stated window. The policy also says the product can only be returned when the seller agrees.",
          "Review photos as soon as they appear. If the item is wrong, damaged or materially different from the selected option, capture the relevant images and submit the reason through the live order. Do not assume that waiting in the warehouse pauses the deadline.",
        ],
      },
      {
        title: "Know the exclusions and possible costs",
        paragraphs: [
          "The published policy lists categories that may be unavailable for no-reason return, including custom-made products, goods with removed packaging or tags, second-hand items, underwear, adult products, food and other seller-defined exclusions. Sealed personal-care, cosmetic, electronic and hobby products can also have special return standards.",
          "For an unconditional return, the Returns & Exchanges page currently lists shipping cost to the seller, the seller’s original shipping cost and a 5 RMB service fee. It notes that even an item originally sold with free shipping may require repayment of that first dispatch cost. If the seller sent the wrong product or a genuine quality problem is accepted, the customer normally does not pay the return cost, although the seller’s final position still matters.",
          "Policies can change, so treat these figures as a dated reading of the published page and verify the live return screen before authorising a return.",
        ],
      },
      {
        title: "Separate visible condition from qualities photos cannot prove",
        paragraphs: [
          "A warehouse image can show the received colour, option, label, visible construction and condition at that moment. It cannot reliably prove fibre composition, smell, electronics performance, waterproofing, long-term durability or fit on your body. A clean photo set is not a laboratory report.",
          "The same caution applies to authenticity. PikoBuy’s Terms prohibit counterfeit and intellectual-property-infringing goods, but a casual image comparison is not professional authentication. If legality or authenticity cannot be established through proper evidence, do not turn a photo opinion into a claim.",
          "Approve an item because the visible evidence meets the threshold you wrote before purchase. Keep uncertain qualities marked as uncertain. That discipline is more useful than a dramatic red-light or green-light verdict.",
        ],
      },
      {
        title: "Save the decision record",
        paragraphs: [
          "Keep the submitted option, warehouse photos, any extra-photo request and the final ship-or-return decision together. If the delivered item arrives in a different condition, you have a clearer record of what was visible before dispatch. If the product is good, the same notes help improve future listings without promising that every later seller batch will match.",
          "A useful spreadsheet can link to the item and describe what to inspect. It should not label a product “QC passed” unless it can show what was checked, when it was checked and what remains unknown. The goal is not to make every find look safe. It is to help the shopper spot a wrong item early and make a calm, documented decision.",
        ],
        bullets: [
          "Order identity confirmed before detail review",
          "Visible concerns tied to specific photos",
          "Extra images requested only for missing evidence",
          "Return eligibility checked before the deadline",
          "Final approval limited to what the images support",
        ],
      },
    ],
  },
  "estimate-pikobuy-parcel-cost": {
    title: "PikoBuy Shipping Cost: How to Estimate a Parcel Without Guessing",
    deck:
      "A useful shipping estimate shows its assumptions. This guide uses PikoBuy’s published calculator fields and policies to separate an early budget from the live parcel quote.",
    date: "July 25, 2026",
    fact:
      "Source basis: PikoBuy’s official Shipping Cost Estimation, Beginner’s Guide, Shipping Policy, User Agreement and Terms pages. Reviewed July 29, 2026.",
    sections: [
      {
        title: "Start with the fields PikoBuy actually asks for",
        paragraphs: [
          "PikoBuy’s Shipping Cost Estimation page asks for destination country or region, product type, weight in kilograms, length, width and height in centimetres. Those six inputs are a better starting point than somebody else’s parcel screenshot. Change the destination, contents or packed size and the available routes or cost can change.",
          "Before the product reaches the warehouse, some values will be estimates. Seller weights may exclude packaging, and product dimensions may not describe the shipping box. Label each number by source instead of blending them into a falsely precise total.",
          "After warehouse arrival, replace assumptions with the recorded item data. After consolidation or packaging changes, check again. The final parcel quote is the decision point because it uses the current contents and route list.",
        ],
      },
      {
        title: "Do not confuse product weight with parcel billing",
        paragraphs: [
          "A product has a physical weight; a packed parcel also contains cartons, protective material and empty space. A shoebox or rigid case can create a large package around a relatively light item. Some shipping routes may apply dimensional or other billing rules, so read the live route description rather than multiplying every kilogram by a headline rate.",
          "Record at least three stages: the seller estimate, the warehouse item record and the final packed parcel. If a number changes, you can see whether the difference came from the seller, consolidation or packaging. This is far more useful than arguing over a few grams while the package dimensions remain unknown.",
          "When planning several items, create a range. A lower case can assume nonessential packaging is removed; an upper case can retain protective boxes. Do not remove protection from a fragile or structured item merely to make the estimate look smaller.",
        ],
      },
      {
        title: "Product type can change everything",
        paragraphs: [
          "The product-type field exists because all goods do not move through the same routes. Batteries, liquids, cosmetics, food and other sensitive or restricted categories may reduce the available choices or require different handling. PikoBuy’s User Agreement specifically warns that essential oils, care solutions, lubricants, batteries and glue may be removed when necessary for transport.",
          "A mixed parcel can inherit the limitation of its most restrictive item. Compare consolidation with a split shipment, but count the second parcel, packaging and service costs. Two parcels are not automatically cheaper because each has more route choices.",
          "PikoBuy’s Terms also prohibit counterfeit and intellectual-property-infringing goods. Route planning is not a way around prohibited-item or customs rules. If a product cannot be shipped legally, a cheaper estimate does not make it suitable.",
        ],
      },
      {
        title: "Build a delivered-cost worksheet in layers",
        paragraphs: [
          "Keep the product payment separate from Chinese domestic seller-to-warehouse delivery, optional warehouse services, return costs and international parcel shipping. PikoBuy’s six-step guide confirms that product payment occurs before the later parcel-shipping payment. Mixing the two makes a low listing price look like a delivered price.",
          "PikoBuy’s User Agreement currently states that the platform service fee for package forwarding is calculated at 8% of freight and notes that exchange-rate movement or settlement timing may create slight differences. Verify the live checkout because terms can change. The same agreement says users pay the logistics provider’s freight and the platform service fee.",
          "PikoBuy’s Terms say cross-border transactions may also incur duties, taxes, brokerage fees or other costs for which the user is responsible. These destination charges are not reliably solved by a spreadsheet estimate.",
        ],
        bullets: [
          "Product price and Chinese domestic delivery",
          "Optional detailed photos or packaging requests",
          "Return shipping and any applicable service fee",
          "International route charge and current forwarding service fee",
          "Destination duties, taxes or brokerage when applicable",
        ],
      },
      {
        title: "Model packaging decisions instead of guessing",
        paragraphs: [
          "Packaging choices should solve a specific problem. Removing a retail box may reduce volume. Reinforcement may add size and weight but protect an item that bends or crushes easily. A soft garment, a pair of shoes and a structured bag should not receive the same automatic instruction.",
          "Ask what the packaging is doing. If a box adds no useful protection, a lower-volume scenario may make sense. If the item can deform or break, protection belongs in the estimate rather than being treated as a surprise cost. Recalculate after any meaningful change.",
          "PikoBuy’s Beginner’s Guide says users can add requests such as minimal packaging or reinforced packaging during the warehouse stage. It does not publish a universal amount saved or added, because the result depends on the actual parcel.",
        ],
      },
      {
        title: "Compare routes using current details",
        paragraphs: [
          "A route is more than a price. Check the permitted product types, billing method, tracking expectations and available protection shown during submission. PikoBuy’s guide says routes differ in delivery time and billing method. Its Shipping Policy says parcels move through third-party logistics providers and that customs action, damage, loss and peak-season delay are unavoidable risks to evaluate.",
          "The cheapest displayed line may be unsuitable for the parcel contents or may offer a different protection level. The fastest estimate is also not a guarantee. Customs, carrier capacity and uncontrollable events sit outside a fixed content page.",
          "Keep a screenshot of the route selected at payment. If a later question arises, the route name, parcel measurements and published terms are more useful than a general statement that shipping “should be cheap.”",
        ],
      },
      {
        title: "Use a worked framework without inventing a rate",
        paragraphs: [
          "Suppose a shortlist contains two garments and a boxed pair of shoes. Before purchase, record the seller weights and mark the shoebox as a volume variable. At warehouse arrival, replace those numbers with the recorded items and decide whether the box is necessary. Then enter destination, product type, combined weight and final dimensions into the estimator.",
          "Do not insert a made-up rate into the example. Instead, compare the live routes under two honest scenarios: protective packaging retained and nonessential bulk removed. Add the published service fee shown at checkout and keep possible destination charges separate.",
          "This framework works because it exposes the variable that changed. If the price rises, you can see whether the cause is weight, size, product type, packaging, route or fees. A single borrowed quote cannot do that.",
        ],
      },
      {
        title: "Know when the estimate has done its job",
        paragraphs: [
          "An early estimate is a filter. It helps reject a combination that is obviously too bulky, heavy or restricted for the budget. A warehouse estimate is a planning check. The live parcel quote is the authorisation to spend. Do not ask one number to perform all three jobs.",
          "Update the worksheet whenever the parcel changes. If an item is returned, removed, split or repackaged, the previous estimate is no longer the same case. Responsible shipping content explains this process and dates its policy facts; it does not promise a permanent cheapest route.",
          "That is the most useful answer to “How much is PikoBuy shipping?” The exact amount belongs to the live parcel. The research task is to collect the right inputs, reveal the cost layers and avoid being surprised by a variable that was visible from the beginning.",
        ],
        bullets: [
          "Early estimate clearly labelled as a range",
          "Warehouse figures replace seller guesses",
          "Packaging and restricted-item scenarios compared",
          "Published fee and destination costs kept visible",
          "Live route quote controls the final decision",
        ],
      },
    ],
  },
};
