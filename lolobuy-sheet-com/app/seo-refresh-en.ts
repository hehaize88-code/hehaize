import type { Article } from "./site-data";

const checked = "Editorial review: October 17, 2026. The ordering sequence is based on the official LoloBuy homepage's indexed description. Prices, routes, storage terms and delivery estimates must be checked in the current account; no personal shipment is claimed.";
const sources = [
  { label: "LoloBuy official website · lolobuy.com", note: "Indexed homepage description reviewed October 17, 2026: link-based ordering, product payment and domestic freight, warehouse QC photographs, selected-item consolidation, waybill submission and freight payment, packing, weighing, dispatch and tracking. Availability and wording may change." },
  { label: "Editorial planning examples", note: "Comparison templates, decision rules and arithmetic are explanatory examples created for this guide. They are not LoloBuy quotations, measured delivery results or a statement of current customs rules." },
];

export const seoRefreshEn: Record<string, Article> = {
  "lolobuy-shipping-france-guide": {
    slug: "lolobuy-shipping-france-guide",
    searchTitle: "LoloBuy Shipping to France: Costs, Steps & Tracking",
    title: "LoloBuy Shipping to France: Build a Clear Delivery Budget",
    shortTitle: "Shipping to France: costs and steps",
    description: "Plan LoloBuy shipping to France with a destination checklist, a complete cost record, parcel comparisons and a practical tracking workflow.",
    eyebrow: "FRANCE SHIPPING",
    published: "2026-10-17", updated: "2026-10-17", readingTime: "8 min read", factCheckLine: checked,
    visual: {
      eyebrow: "DESTINATION FIRST", title: "One French address, three separate stages",
      caption: "Keep purchase, warehouse decisions and international delivery separate so each payment has a clear purpose.",
      items: [
        { label: "Buy", text: "Save the exact item, option and China delivery cost." },
        { label: "Prepare", text: "Review warehouse evidence and compare eligible parcel choices." },
        { label: "Deliver", text: "Keep the paid parcel record and follow carrier tracking." },
      ],
    },
    sources,
    intro: [
      "Planning LoloBuy shipping to France begins with the delivery address and the complete basket, not a single price per kilogram. A compact pair of shoes, a padded coat and a mixed parcel can produce different measurements and route choices. An estimate made for one destination or packing arrangement is not automatically useful for another. Record what you are sending and where it must go before comparing quotations.",
      "This guide follows the ordering sequence described by LoloBuy's indexed official homepage: buy the selected goods, review warehouse QC, choose items for a parcel, submit the shipping request and pay the relevant freight, then follow dispatch and tracking. It does not promise a particular carrier, delivery time or tax treatment. Its purpose is to help you replace unknown amounts with current evidence before committing to international delivery.",
    ],
    sections: [
      {
        heading: "Write down the actual destination before building the basket",
        paragraphs: [
          "Use the full destination supported by the current form: country or territory, postcode, town, street, building and any required delivery details. Do not assume that every address described casually as France has the same available services. Check the destination choices against the address where the parcel will actually be received. A quotation for a different postcode, territory or address format is not a confirmed quotation for you.",
          "Keep the recipient name and contact information consistent with the delivery record. If you are buying for another person, resolve their address before comparing routes. A delivery deadline also belongs in this record: distinguish a preferred date from an event after which the goods are no longer useful. Estimated transit time is only one part of the journey, and a short estimate does not remove seller or warehouse waiting time.",
        ],
      },
      {
        heading: "Separate the China purchase from the France delivery",
        paragraphs: [
          "The item payment and the later international parcel payment answer different questions. At purchase, check the exact variant, quantity, item amount and domestic delivery to the warehouse. After arrival, the parcel decision depends on the received goods, their packing needs and the routes available for the destination. Paying for the product is not evidence that international delivery has also been paid or arranged.",
          "Make a row for every item rather than keeping only the basket subtotal. Save the source link, selected size and colour, quantity and payment record together. When a product reaches the warehouse, attach its warehouse identifier to the same row. This makes it easier to spot an item that has not arrived or a variant that differs from the original order before it is included in the France parcel.",
        ],
        links: [{ label: "Understand the two payment stages", href: "/articles/lolobuy-payment-guide" }],
      },
      {
        heading: "Use a cost ledger with visible unknowns",
        paragraphs: [
          "A useful France delivery budget includes more than the amount shown next to a shipping service. Preserve the currency and the date for every quoted amount. Mark a field as unknown when it has not been confirmed; do not write zero because the charge has not appeared yet. If a route description says something is included, retain the wording with your comparison and check its conditions.",
          "The table is a planning template, not a claim that every line is charged on every order. Some costs may be included, optional or inapplicable. Your task is to find out which applies to the current order and which party collects it. For destination charges, use current official guidance and the service terms rather than treating a social-media estimate as a rule.",
        ],
        table: { headers: ["Cost field", "Record", "Check before proceeding"], rows: [
          ["Goods and China delivery", "Paid amount and currency", "Correct options and quantities"],
          ["Warehouse services", "Selected service and price", "Needed, optional or already included"],
          ["International freight", "Current parcel quotation", "Destination, dimensions and eligible route"],
          ["Payment or currency costs", "Checkout amount", "Displayed total in the currency you pay"],
          ["Destination charges", "Confirmed inclusion or unresolved amount", "Current service terms and official guidance"],
        ] },
      },
      {
        heading: "Finish the useful QC checks before parcel submission",
        paragraphs: [
          "Warehouse photos can help you verify the received option and visible condition. Start with order identity, quantity, size label and colour before examining smaller details. A tidy photo does not prove fit, material composition or long-term durability. If a measurement is essential to your decision, request the relevant evidence only where the current service offers it, and wait for the answer before authorising shipment.",
          "For shoes, decide whether you need the original box and what protection matters for the item. For a coat, consider bulk as well as scale weight. For fragile accessories, identify vulnerable parts. These are product-specific packing decisions, not reasons to choose the smallest possible parcel at any cost. Keep an unresolved wrong item or damage concern outside the parcel until you understand the available action and its terms.",
        ],
        links: [{ label: "Review warehouse photographs", href: "/articles/how-to-read-qc-photos" }],
      },
      {
        heading: "Compare routes using the same parcel assumptions",
        paragraphs: [
          "Create one dated comparison using the same destination, goods, estimated weight, dimensions and packing request. Compare only services shown as eligible for that parcel. Record the displayed estimate, its stated delivery interval, tracking information and the terms that matter to you. A cheaper result generated for a different parcel is not evidence of a cheaper way to send the original basket.",
          "Keep estimated time separate from a guaranteed commitment. Note where the interval starts if the service explains it, and leave that field unresolved if it does not. Also record any limits on contents or dimensions. Route availability and acceptance can change, so repeat the comparison when the warehouse measurements or selected goods change rather than relying on an earlier screenshot.",
        ],
        table: { headers: ["Comparison field", "Route A", "Route B"], rows: [
          ["Destination and postcode", "Same address", "Same address"],
          ["Goods and packing", "Same selected items", "Same selected items"],
          ["Weight and dimensions", "Current recorded inputs", "Same recorded inputs"],
          ["Quote, currency and date", "Copy current display", "Copy current display"],
          ["Terms and unresolved questions", "Record before payment", "Record before payment"],
        ] },
      },
      {
        heading: "Reduce avoidable cost without guessing the result",
        paragraphs: [
          "If the quotation exceeds your budget, compare concrete alternatives. Remove an unwanted item from the proposed parcel, ask which unnecessary packaging can be removed, or compare a supported packing option. Confirm that adequate protection remains. The relevant question is the revised total for the revised parcel, not whether removing a box usually saves money for somebody else.",
          "Consolidation may change both weight and volume. Splitting a basket may add separate base charges or create different route choices. Neither approach is automatically cheaper. Compare the combined amount of all resulting parcels, including the same selected services, before deciding. Do not add an unnecessary product just to spread shipping across more items: the purchase price still increases your overall spending.",
        ],
        links: [{ label: "Work through the shipping calculator inputs", href: "/articles/lolobuy-shipping-calculator-guide" }],
      },
      {
        heading: "Keep a complete record at submission and payment",
        paragraphs: [
          "Before finalising the parcel, review the selected warehouse items, address, packing request and quoted service together. Save the parcel identifier and the payment confirmation. Record which amount is an estimate and whether the current process explains later measurement or adjustment. If the displayed total differs from your comparison, find the changed input before accepting it.",
          "Store the product orders and parcel record in the same folder but retain their separate identifiers. A product-order number, warehouse item reference, parcel number and carrier tracking number can refer to different stages. This simple separation prevents a common support problem: asking about international tracking using only the seller purchase reference, without the parcel information needed to locate the shipment.",
        ],
      },
      {
        heading: "Follow the journey by stage and act on the last confirmed event",
        paragraphs: [
          "After payment, check the actual parcel status instead of assuming the carrier already has it. Packing, weighing, dispatch and the first carrier scan are distinct events. Save the date and wording of the last confirmed update. When tracking becomes available, compare the parcel reference with the carrier record and follow any delivery instruction through a verified account or carrier channel.",
          "If progress is unclear, send support a concise record containing the parcel identifier, destination, last confirmed event, timestamp and the exact question. Avoid repeated payments or duplicate submissions while you are trying to identify an existing shipment. Once delivered, compare the contents with your saved list and retain evidence of any discrepancy. The resulting record is more useful for your next France budget than an undated claim about a typical delivery time.",
        ],
        links: [
          { label: "Understand parcel submission", href: "/articles/lolobuy-submit-package-guide" },
          { label: "Investigate tracking that has stopped updating", href: "/articles/lolobuy-tracking-not-updating-guide" },
        ],
      },
    ],
  },
  "lolobuy-shipping-calculator-guide": {
    slug: "lolobuy-shipping-calculator-guide",
    searchTitle: "LoloBuy Shipping Calculator: Weight, Volume & Costs",
    title: "LoloBuy Shipping Calculator: Turn an Estimate into a Useful Comparison",
    shortTitle: "Shipping calculator: weight and costs",
    description: "Understand LoloBuy shipping calculator inputs, actual and dimensional weight, illustrative calculations and why a final parcel amount can differ.",
    eyebrow: "SHIPPING CALCULATOR",
    published: "2026-10-17", updated: "2026-10-17", readingTime: "8 min read", factCheckLine: checked,
    visual: {
      eyebrow: "KEEP THE INPUTS", title: "An estimate belongs to one parcel scenario",
      caption: "Change the destination, packing or contents and the old estimate may no longer describe your parcel.",
      items: [
        { label: "Inputs", text: "Destination, selected items, weight and packed dimensions." },
        { label: "Rules", text: "Use the current eligible service's displayed billing conditions." },
        { label: "Comparison", text: "Record the amount, currency, time and unresolved fields." },
      ],
    },
    sources,
    intro: [
      "A LoloBuy shipping calculator is useful when you treat the result as the output of a specific set of inputs. It is much less useful when a number is copied without the destination, weight, dimensions or selected service. Before using an estimate to decide whether a basket is affordable, write down what the estimate includes and which inputs are still guesses.",
      "This guide explains how to prepare a repeatable comparison and read differences between estimated and later parcel charges. It does not reproduce a live LoloBuy calculator or provide a carrier tariff. All numerical examples below are deliberately illustrative. The divisor, rounding, eligible services and fees for a real shipment must come from the current quotation and service conditions, not from the example arithmetic.",
    ],
    sections: [
      {
        heading: "Collect the inputs before looking at the price",
        paragraphs: [
          "Begin with the destination and the exact goods you intend to send. Separate what you know from what you are estimating. A warehouse weight is different evidence from a seller's approximate product weight, and neither necessarily describes the final packed parcel. Record the source of each input so you can replace guesses when measured information becomes available.",
          "Use the units requested by the current form. Check kilograms against grams and centimetres against other length units before entering numbers. A decimal mistake can produce a comparison that looks precise but describes a completely different parcel. Also note the product category or content information requested by the service. Do not choose a different category merely to obtain a cheaper displayed route.",
        ],
        table: { headers: ["Input", "Useful record", "Common uncertainty"], rows: [
          ["Destination", "Actual country or territory and postcode", "An estimate made for a different address"],
          ["Contents", "Exact selected items and quantities", "Goods added after the comparison"],
          ["Scale weight", "Value, unit and source", "Goods only versus packed parcel"],
          ["Dimensions", "Packed length, width and height", "Individual product dimensions"],
          ["Services", "Selected packing and other options", "Items included in the displayed price"],
        ] },
      },
      {
        heading: "Understand actual weight and dimensional weight",
        paragraphs: [
          "Actual weight is the mass measured on a scale. Dimensional weight is a billing measure calculated from package dimensions under a service's rules. A lightweight but bulky parcel can therefore produce a different billing basis from a dense parcel of the same scale weight. Whether a route uses dimensional weight, and precisely how it calculates it, must be checked for that route.",
          "Do not assign a universal divisor to LoloBuy or assume every service chooses weight in the same way. Read the current conditions for the dimensional formula, rounding, minimum charges and limits. If the quotation provides a chargeable weight, preserve that field with the source measurements. Without these details, multiplying a guessed weight by a quoted price per kilogram may not reconstruct the displayed total.",
        ],
      },
      {
        heading: "Work through an explicitly illustrative volume example",
        paragraphs: [
          "Imagine a packed carton measuring 40 × 30 × 20 centimetres with an actual weight of 3 kilograms. Its volume is 24,000 cubic centimetres. For this example only, assume a fictional service divides that volume by 6,000 and charges using the greater of actual and dimensional weight. Dimensional weight would be 4 kilograms, so the example's chargeable weight would be 4 kilograms before any fictional rounding rules.",
          "This is arithmetic for understanding the concept, not LoloBuy's verified formula. If a real service uses another divisor or billing method, the result changes. Replace every assumption with the rule shown for the actual route. The useful lesson is that reducing scale weight alone may not reduce the billing basis when the parcel's volume remains the controlling input.",
        ],
        table: { headers: ["Illustrative input or operation", "Example result"], rows: [
          ["Packed dimensions", "40 × 30 × 20 cm"],
          ["Volume", "24,000 cm³"],
          ["Example divisor only", "6,000 cm³ per kg"],
          ["Illustrative dimensional weight", "24,000 ÷ 6,000 = 4 kg"],
          ["Illustrative actual weight", "3 kg"],
          ["If the fictional rule uses the greater value", "4 kg before any rounding"],
        ] },
      },
      {
        heading: "Test a packing change without pretending it guarantees savings",
        paragraphs: [
          "Continue the same fictional example. Suppose suitable repacking changes the carton to 40 × 30 × 15 centimetres and the packed actual weight remains 3 kilograms. The volume becomes 18,000 cubic centimetres. Dividing by the same example divisor gives 3 kilograms. Under the fictional greater-value rule, the chargeable weight is now 3 kilograms before rounding.",
          "That comparison identifies a potential change in the billing basis; it does not establish a cash saving. A real route may have price bands, a minimum charge, repacking costs or different acceptance conditions. Ask for the revised quotation and protect the goods appropriately. Removing protective material from a fragile item to reach a lower dimensional estimate can create a much more expensive problem than the amount you hoped to save.",
        ],
      },
      {
        heading: "Change one variable at a time when comparing options",
        paragraphs: [
          "Keep a baseline scenario with the original goods, destination, measurements and chosen services. Make a second row for a specific change, such as excluding one bulky item or using a supported packing option. Retain the other assumptions where possible. This lets you see what caused a difference instead of comparing two prices whose inputs are unrelated.",
          "For a split shipment, compare the sum of all parcels with the combined alternative. For example, two separately quoted parcels are a two-part total, not a choice between their individual prices. Include any selected services consistently and preserve the currencies. If the available services differ between scenarios, record that difference as part of the decision rather than presenting the amount alone as an equivalent comparison.",
        ],
        table: { headers: ["Scenario", "Keep in the record", "Decision"], rows: [
          ["Baseline", "Original basket, measurements and current quote", "Does it fit the budget?"],
          ["Repacking option", "Protection change, revised dimensions and fee", "Is the revised total worthwhile?"],
          ["One item removed", "Remaining goods and fresh quote", "Is that item worth its full added cost?"],
          ["Two parcels", "Both complete parcel totals", "Does splitting improve the overall result?"],
        ] },
      },
      {
        heading: "Distinguish freight from the total amount you will spend",
        paragraphs: [
          "The shipping result may be only one part of your purchase budget. Keep the item payment, China delivery, chosen warehouse services, international freight and any other confirmed charges in separate fields. Check what the current quote says is included. A blank field should remain unresolved until you have an answer; treating it as free makes the comparison look cheaper without improving its accuracy.",
          "If a payment is converted into another currency, keep the original quoted amount and the amount shown at checkout. Compare the total you would actually authorise using the same assumptions. Do not infer destination tax treatment from a route nickname or a comment on another shopper's order. Use the current terms and relevant official information for the actual destination when completing that part of the budget.",
        ],
        links: [{ label: "Build a complete cost ledger", href: "/articles/lolobuy-fees-explained" }],
      },
      {
        heading: "Explain a changed amount by checking the changed inputs",
        paragraphs: [
          "When the later parcel amount differs from an earlier estimate, first compare weight, packed dimensions, selected goods and services. Check the destination and the route as well. A seller's item weight, a warehouse item weight and a measured packed-parcel weight can describe different things. The discrepancy becomes easier to investigate when each earlier input has a recorded source.",
          "Next compare the date, currency and any stated billing conditions. Do not assume every difference is either an error or an unavoidable fee. Ask for the specific measurement or line item that explains it. Keep the response with the parcel record, and avoid paying a second time merely because the first confirmation is not immediately visible. The actual account status should guide the next action.",
        ],
      },
      {
        heading: "Save a useful quotation and know when to calculate again",
        paragraphs: [
          "A useful saved quotation contains its date, destination, selected goods, weight source, dimensions, service, amount, currency and relevant terms. Keep the screenshot or written record beside the warehouse item list. This makes a later comparison reproducible and gives support enough information to understand the estimate you are referring to.",
          "Calculate again when the contents, packing, measured weight, dimensions, destination or available service changes. Before parcel submission, confirm that the current amount still fits the budget and that all essential uncertainties are resolved. The calculator's role is to support that decision. A precise-looking figure based on incomplete inputs should remain a planning estimate until the current parcel process confirms the applicable amount.",
        ],
        links: [
          { label: "Plan a parcel for France", href: "/articles/lolobuy-shipping-france-guide" },
          { label: "Prepare the parcel submission", href: "/articles/lolobuy-submit-package-guide" },
        ],
      },
    ],
  },
  "lolobuy-submit-package-guide": {
    slug: "lolobuy-submit-package-guide",
    searchTitle: "LoloBuy Submit Package: Meaning, Steps & Payment",
    title: "LoloBuy Submit Package: From Warehouse Items to a Shipping Request",
    shortTitle: "Submit package: the next decision",
    description: "Understand what submitting a LoloBuy package means, what to check before authorising a parcel and how product payment, freight payment and tracking differ.",
    eyebrow: "PARCEL WORKFLOW",
    published: "2026-10-17", updated: "2026-10-17", readingTime: "8 min read", factCheckLine: checked,
    visual: {
      eyebrow: "CHECK THE STAGE", title: "Bought goods are not yet a dispatched parcel",
      caption: "Identify the last confirmed step before deciding whether to review, pay, wait or ask for help.",
      items: [
        { label: "Warehouse items", text: "Match received goods to the order and resolve important QC questions." },
        { label: "Parcel request", text: "Choose eligible items, destination, packing and the available service." },
        { label: "Dispatch", text: "Confirm the payment status, parcel progress and carrier handover." },
      ],
    },
    sources,
    intro: [
      "In a shopping-agent workflow, submitting a package means moving from individual warehouse items to a request to prepare and send a selected parcel. It is a different decision from buying the products. If you are looking at a submit-package instruction, first identify which goods are available, which questions remain unresolved and which payment stage the account currently shows.",
      "LoloBuy's indexed official homepage describes choosing warehouse goods, combining selected items, submitting a waybill and paying freight, followed by packing, weighing, shipping and tracking. Exact interface labels and available options can change. This guide explains the decisions behind the process rather than claiming that every account displays the same buttons, options or sequence of screens.",
    ],
    sections: [
      {
        heading: "Identify what has actually happened to each item",
        paragraphs: [
          "Open the current order and warehouse records and distinguish an ordered item from a received item. A payment confirmation does not itself prove warehouse arrival. Match the product reference, selected option and quantity, then record the latest confirmed status. If one item is still with the seller or in domestic transit, do not assume it will automatically be included in a parcel being prepared now.",
          "Build a short parcel list using warehouse identifiers where available. Keep products you intend to send separate from those you are still evaluating. This is particularly useful when several orders contain similar shoes, sizes or colours. A clear list turns the parcel selection into a deliberate choice and reduces the chance of shipping the wrong option simply because its thumbnail looks familiar.",
        ],
        table: { headers: ["Record", "What it establishes", "What it does not establish"], rows: [
          ["Product payment", "A payment for the purchase stage", "International dispatch"],
          ["Warehouse item record", "The recorded state of a received item", "That it belongs to a paid parcel"],
          ["Parcel request", "The selected goods and shipping instructions", "Carrier possession"],
          ["Freight payment confirmation", "The recorded parcel payment state", "A completed delivery"],
          ["Carrier tracking event", "A reported event in the shipment journey", "The condition of every item inside"],
        ] },
      },
      {
        heading: "Resolve QC questions that could change the parcel",
        paragraphs: [
          "Review the received quantity, variant labels and visible condition before selecting the goods for shipment. Compare the photos with the exact ordered option, not another colour or seller example. If a meaningful concern would make you return, exchange or exclude the item, resolve it before authorising the parcel. The available action and any time limit must be read from the current order terms.",
          "Ask for evidence that answers a specific decision. A clear size-label photo may settle a variant question; a relevant measurement may help assess fit. Additional images cannot prove everything about material quality or durability. Keep the request focused, and do not treat a pending answer as approval simply because the other items are ready to ship.",
        ],
        links: [
          { label: "Read warehouse QC photographs", href: "/articles/how-to-read-qc-photos" },
          { label: "Organise evidence of an item mismatch", href: "/articles/lolobuy-qc-mismatch-evidence-guide" },
        ],
      },
      {
        heading: "Decide which items belong in the same shipment",
        paragraphs: [
          "Select the goods according to destination, readiness, packing requirements and the eligible services shown. Items bought together do not have to be treated as one indivisible decision. A fragile object, bulky coat and compact garment may create different practical constraints. Check the current service rules for the actual contents rather than assuming that a route accepting one item accepts every item in the basket.",
          "If you consider waiting for another purchase, check the current storage terms and any charges directly in the account. This guide deliberately does not state a fixed free-storage period. Record the relevant date and the rule applying to your items. Waiting can be a sensible choice only when you understand the effect on cost, readiness and the deadline for the intended delivery.",
        ],
        links: [{ label: "Check item and route restrictions", href: "/articles/lolobuy-restricted-items-shipping-routes" }],
      },
      {
        heading: "Choose packing instructions that describe the result you need",
        paragraphs: [
          "Consider protection before reducing volume. State which packaging is unnecessary only when the current service allows that choice and you understand the consequence. A shoe box, protective sleeve or supporting insert can serve a different purpose from outer seller packaging. If an item is fragile or its shape matters, describe that concern rather than issuing a blanket instruction to remove everything.",
          "Record selected packing services and their displayed prices. If a decision requires the warehouse to measure or assess the parcel, keep that uncertainty visible. Do not promise yourself a particular weight reduction before the work is done. A practical instruction is one whose intended result can be checked later against the packed parcel record, without relying on vague words such as safest or cheapest.",
        ],
      },
      {
        heading: "Check the address and the currently eligible service together",
        paragraphs: [
          "Use the actual recipient and destination details when reviewing the available service choices. Confirm the postcode, street, building and any required contact information. Do not select a convenient nearby destination merely to display a price. The quotation should correspond to the address to which you intend to send the selected goods.",
          "Read the service description for the current parcel, including the stated limits, estimate and relevant conditions. Where the process requests content descriptions or values, provide accurate information supported by the purchase record and follow the applicable instructions. Do not copy another shopper's entry without checking that it describes your goods. If an important requirement is unclear, resolve it before the request becomes a paid shipment.",
        ],
      },
      {
        heading: "Review the amount at the correct payment stage",
        paragraphs: [
          "Compare the current parcel amount with your saved shipping estimate. Check whether the displayed amount covers freight alone or includes selected services, and retain the currency. Product payment and parcel payment are separate records even if they appear within the same account. Being charged at the shipping stage is not, by itself, proof that you have been charged twice for the same thing.",
          "At the same time, a confusing status is not a reason to repeat a payment. Verify the existing payment confirmation and parcel record first. If an amount differs, compare the goods, measurements, packing choices and service before asking support about the specific line. Record any explanation of later measurement or adjustment that the current process provides, without assuming that a particular refund or surcharge policy applies to all parcels.",
        ],
        links: [
          { label: "Separate product and parcel payments", href: "/articles/lolobuy-payment-guide" },
          { label: "Interpret an estimated shipping amount", href: "/articles/lolobuy-shipping-calculator-guide" },
        ],
      },
      {
        heading: "Use a short final review before confirming the request",
        paragraphs: [
          "Pause at the final review and compare the current request with your written parcel list. Check that an excluded item has not reappeared and that the intended quantities are correct. Read the address again in its final displayed form. Review the packing instructions and selected service as a complete set, because an earlier edit may have changed the available choices.",
          "Save the resulting parcel identifier, quoted or paid amount, confirmation and time. Keep a copy of the relevant terms if they affect your decision. This does not guarantee the delivery outcome, but it gives you a reliable record of what was requested. It also prevents confusion when the same account contains several product orders and more than one parcel in progress.",
        ],
        bullets: [
          "Exact warehouse items and quantities match the intended parcel.",
          "Material QC questions are resolved or the affected item is excluded.",
          "Recipient, destination and contact details are correct.",
          "Packing choices, current service and displayed amount are understood.",
          "The current payment state has been checked before any further payment.",
        ],
      },
      {
        heading: "After submission, follow the next confirmed event",
        paragraphs: [
          "A submitted request is not the same event as carrier handover. Check the account's actual state as the parcel is prepared, measured, dispatched and assigned tracking information. Do not invent a deadline for these steps from another shopper's experience. Use any current estimate or service commitment shown for your request, and retain the last confirmed event when progress needs investigation.",
          "If you notice an address or contents error after submission, contact support promptly with the parcel identifier and exact correction needed. Do not assume the request can still be edited or cancelled; that depends on its current stage and terms. If a payment appears successful but the parcel state is unclear, provide the confirmation rather than opening a duplicate request. Once carrier tracking exists, keep it linked to the parcel record and investigate gaps using that reference.",
        ],
        links: [
          { label: "Understand the order-status stages", href: "/articles/lolobuy-order-status-guide" },
          { label: "Check a tracking update problem", href: "/articles/lolobuy-tracking-not-updating-guide" },
          { label: "Use the France destination checklist", href: "/articles/lolobuy-shipping-france-guide" },
        ],
      },
    ],
  },
};
