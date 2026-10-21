# OOPBuy official research — verified 2026-10-21

## Evidence method and reuse

OOPBuy's legacy mobile notice URLs redirect to an application shell, so ordinary HTML extraction can show almost no text. I read the public production JavaScript and discovered its read-only content endpoint: `GET https://webapi.oopbuy.com/content/detail?id={id}` with `lang: en_US`. No account, cookie, token or login was used. All 23 retrieved records returned HTTP 200, `code:200`, and official English content. Raw JSON/text evidence is in `/workspace/scratch/7d3c490448ce/oopbuy-official-evidence/`; these are research intermediates, not product data or website assets.

Current working human-readable route, based on the official frontend: `https://oopbuy.com/notice/details?id={id}`. The same records are indexed under `https://m.oopbuy.com/notice/{id}`. Use concise original paraphrases and source links; do not reproduce complete notices. This is a factual research file, not legal advice or guaranteed future terms.

## Priority facts for the ten articles

### 1. Beginner's Guide — 1739829963819945985
https://oopbuy.com/notice/details?id=1739829963819945985

The guide describes product-link/name search, variant/quantity selection, payment for the product and Chinese domestic shipping, procurement, warehouse inspection/photos, warehouse selection, parcel submission, separate international-shipping payment, dispatch and receipt. It names Taobao/Tmall/1688 in its link instructions. It says photos appear after arrival, and 1688 QC differs. Tracking is under My Waybill → Waybill Details. Final shipping depends on measured package dimensions and weight. Do not reuse its marketing percentages or imply every listing is supported. Do not promise that combining always saves money.

### 2. First-time shopping explanation — 1775413984553926658
https://oopbuy.com/notice/details?id=1775413984553926658

Explicitly distinguishes two payments: item plus domestic freight first, international parcel freight later. Recommends estimating international freight before buying. Notes third-party product, carrier and customs risks. This is the best source for budget/process explanations.

### 3. Inspection Information — 1740664942636404738
https://oopbuy.com/notice/details?id=1740664942636404738

Warehouse staff inspect quantity, colour, size and other specifications; damaged outer packaging can be rejected. Prohibited-item checks precede weighing/storage. Critically, the limitations exclude colour differences, sizing errors and usage effects, and do not constitute professional quality/function/model/accessory testing for electrical/digital goods. Sealed categories may receive exterior-only inspection. Explain the distinction between checking an ordered label/specification and proving real fit, performance or authenticity. Do not call product-listing images warehouse QC evidence.

### 4. Customized logistics services — 2062456211424555010
https://oopbuy.com/notice/details?id=2062456211424555010

The clearest current notice distinguishes 90 free warehouse days from ONE paid extension: 10 CNY, maximum 30 more days, total 120 days. Beyond that, goods may be marked abandoned and disposed of. Standard QC photos are free under inspection guidelines; custom QC can request particular measurements or details (shoe/insole length, garment/pants measurements, logo positioning). No price for custom QC is specified here: do not invent one. Check the account's current storage date/availability before acting.

### 5. Storage — 1740664252140720130
https://oopbuy.com/notice/details?id=1740664252140720130

The older/general storage notice says 90 days from order status “received”; abnormal/unmatched packages have a separate 30-day validity rule. It describes 10 CNY per 30-day extension but does not state a one-extension cap. Do not infer unlimited renewals: the more specific customized-services notice states one extension. Article should tell readers to act before the normal free deadline and check their exact item. Never advertise 120 free days.

### 6. User Registration Agreement — 1772892211576897537
https://oopbuy.com/notice/details?id=1772892211576897537

OOPBuy describes itself as an entrusted purchasing/logistics agent, not the product seller or brand licensor. QC photography is superficial visual inspection, not authentication. 1688 purchases receive limited sampling rather than universal full inspection. Goods stored beyond 120 days without shipment, return or extension arrangements can be treated as overdue. Terms can change. This supports a cautious explanation of service boundaries; avoid claiming the site validates branded authenticity.

### 7. Returns and Refunds — 1740656181012172801
https://oopbuy.com/notice/details?id=1740656181012172801

A conditional five-day/120-hour return-request window after Stocked in is described, with the notice specifying it starts at the next hour after that status changes; it also references seven days after signed receipt. Eligibility requires seller-supported returns and resale condition, and some categories/sealed/custom/used goods are excluded. Seller agreement remains necessary. First return/exchange service fee per calendar month is waived; this is NOT free postage or universal free returns. Additional personal-reason returns/exchanges can incur a 5 RMB service fee and multiple domestic freight charges. Its shipping-cost passages conflict about initial free-shipping reimbursement, so use the actual aftersales quote rather than a universal cost formula. Refund initiation and bank settlement differ; the notice describes an expected 7–15-day card settlement, not a guarantee. International returns can require return freight/taxes at the customer's expense and conditions still apply.

### 8. Parcel Rehearsal — 1958798026895589377
https://oopbuy.com/notice/details?id=1958798026895589377

Warehouse → eligible sub-orders → Rehearsal. The notice lists a 20 CNY service fee. Recipient, packing and shipping route are selected; a route can be omitted if none is available. Rehearsal pricing remains reliable only if route, packing method and details remain unchanged. The notice describes pre-shelf-removal cancellation with refund; after shelf removal it cannot be cancelled, and a later paragraph warns voluntarily cancelled completed rehearsal fees are not refunded. Do not write “all rehearsal cancellations are refundable.” It states 24-hour processing/dispatch with holiday exclusions, but do not present this as guaranteed delivery speed.

### 9. Delivery Notice — 1772881180494462977
https://oopbuy.com/notice/details?id=1772881180494462977

Two shipping stages, seller→warehouse and warehouse→destination. Tracking is provided after dispatch. The page gives indicative 1–3 / 5–12-day ranges but explicitly acknowledges uncontrollable delays. Better article copy: show the stages and explain live route estimates, never a universal delivery promise. It directs customers to https://oopbuy.com/estimation . A single universally fastest/cheapest route is not verified.

### 10. Order and parcel status guide — 1775409280679739393
https://oopbuy.com/notice/details?id=1775409280679739393

“Shipped” on a purchasing order can mean seller dispatch to the Chinese warehouse; on a parcel it means carrier collection. Signed-for arrival can precede inspection/storage. Supplementary payment and confirmation requests require action. The guide's English duplicates “Received” for two steps, so do not overpromise exact UI wording. Use the order vs parcel context to explain tracking, and check dates/carrier events.

### 11. Packaging — 1740661986205732866
https://oopbuy.com/notice/details?id=1740661986205732866

Simple packaging is route-dependent; carton, shoe-box removal/folding, vacuum bags, bubble protection and stretch film are described. These are options, not universal recommendations: preserve necessary protection and inspect return eligibility before removing tags/packaging. Battery routes have restrictions. Do not claim vacuum packing always lowers the price, or repeat arbitrary parcel-weight “customs safe” tips.

### 12. Separate shipment rule — 1775425543221084162
https://oopbuy.com/notice/details?id=1775425543221084162

The notice says an item with a side at least 90 cm can be marked for separate packing/shipment. The practical instruction is to follow the warehouse label and route restrictions, not assume every item can be consolidated.

### 13. Top-up and PayPal — 1740660085586235394; 1740660571185975297; 1775419828091813890
https://oopbuy.com/notice/details?id=1740660085586235394
https://oopbuy.com/notice/details?id=1740660571185975297
https://oopbuy.com/notice/details?id=1775419828091813890

Public help lists cards, PayPal/balance and some Wise recharge flows; available choices still depend on checkout. Notices say PayPal recharge is USD-converted and rates are adjusted with reference to Bank of China. They publish 4.5% + USD0.30 top-up fees, but do not put an evergreen universal payment fee in the FAQ; instruct checking the displayed checkout amount. There is no verified universal zero-service-fee promise.

### 14. Problems after delivery — 1772884100300472322
https://oopbuy.com/notice/details?id=1772884100300472322

Preserve the parcel, label, item photos and proof; explain the problem through aftersales. The notice contains two-working-day evidence language and a 72-hour reporting limit for missing/damaged/defective goods. Advise immediate contact, not waiting for a presumed universal deadline. For an apparent weight discrepancy, it asks for evidence before opening. Never promise a successful claim.

### 15. Insurance and Compensation — 1740665065227522050
https://oopbuy.com/notice/details?id=1740665065227522050

Compensation depends on the shipping line, evidence and exclusions. Its notice is dated as an older scheme and contains deadlines/exclusions. Do not advertise blanket full insurance, customs-seizure cover, automatic payment, or a universal claim deadline. Direct the reader to the specific purchased route terms.

### 16. Purchase restrictions — 1772882548114391041; 1772880724846247937
https://oopbuy.com/notice/details?id=1772882548114391041
https://oopbuy.com/notice/details?id=1772880724846247937

Certain goods cannot be purchased/shipped; liquids, powders, medicines and cosmetics can be restricted. Official policy prohibits counterfeit/IP-infringing goods and denies that visual QC is authenticity verification. Consult support before ordering restricted categories. Shipping availability is not proved by a product page appearing in a spreadsheet.

## Unverified / avoid inventing

- No universal country shipping tariff, customs/tax threshold, dimensional divisor (5000/6000), delivery guarantee or cheapest route was established. Shipping articles may explain the generic dimensional-weight concept, but must label any worked calculation as an illustration and say the route's rule controls.
- No fixed custom-QC photo price or guaranteed photo count was verified.
- No CNBuyCha image-search endpoint or QC provenance was established by this official-platform research.
- No worldwide payment-method availability, permanently valid coupon or guaranteed refund/insurance payout.
- Stock, listing accuracy, authenticity and product quality cannot be inferred from a product thumbnail or a spreadsheet recommendation.

## Keyword-to-fact article support

- oopbuy spreadsheet / how to use oopbuy: guide + two-stage payment + service boundaries.
- oopbuy qc photos / qc check: inspection + customized QC + authenticity boundaries.
- oopbuy shipping cost / shipping calculator: official estimator + final measured dimensions/weight + route differences.
- oopbuy size chart / sizing: variant labels vs actual measurements; custom QC availability, no fit guarantee.
- oopbuy weidian links / product links: ensure original seller item and chosen variant match; supported-link verification in the live official page.
- oopbuy fees / price / total cost: two payments, currency conversion, actual checkout and freight.
- oopbuy warehouse / storage: 90 free days, one conditional paid extension, no 120-day free promise.
- oopbuy refund / returns: conditional short request window, seller/resale restrictions, service fee vs postage.
- oopbuy tracking / order status: purchasing order vs international parcel, no invented tracking timeline.
- oopbuy haul / rehearsal / packaging: packing choices, route compatibility, rehearsal conditions, protect the item.
