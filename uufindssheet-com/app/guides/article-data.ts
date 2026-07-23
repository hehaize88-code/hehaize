export type Guide = {
  slug: string;
  label: string;
  title: string;
  description: string;
  updated: string;
  readTime: string;
  sourceNote?: string;
  modifiedISO?: string;
  intro: string[];
  sections: { heading: string; paragraphs: string[]; points?: string[] }[];
};

export const guides: Guide[] = [
  {
    slug: "uufinds-spreadsheet-shopping-guide-2026",
    label: "SEO BUYING GUIDE",
    title: "UUFinds Spreadsheet Guide 2026: from QC research to better product finds",
    description: "A practical, evidence-led route from UUFinds QC research to category browsing and exact product pages on CNBuy Sheet.",
    updated: "July 23, 2026",
    readTime: "12 min read",
    modifiedISO: "2026-07-23",
    sourceNote: "Function claims were reviewed on July 23, 2026 against UUFinds’ public QC finder and QC browsing copy, product-detail disclaimer, account pages, personalized display description and public app information. Those sources support QC-photo and QC-video discovery, image recognition, link handling and shareable item pages. They do not support a guarantee of product quality, current stock, shipping cost or identical future batches.",
    intro: [
      "Searching for a “UUFinds spreadsheet” usually means one of two things. Some visitors want a fast catalog of products; others already have a Taobao, Weidian, 1688 or agent link and want to see real quality-control material before saving it. Those are different jobs. A useful workflow keeps product discovery, QC research and the final listing check separate instead of treating one large page of links as proof that an item is right.",
      "This independent guide shows how to use that workflow with CNBuy Sheet as the shopping destination. It does not claim that every product has QC media, that an older warehouse photo represents the item available today, or that a spreadsheet can guarantee quality. The goal is simpler and more useful: build a shortlist, check the evidence that exists, then open the exact current product page and verify the facts that can change.",
    ],
    sections: [
      {
        heading: "1. Start by identifying your real search intent",
        paragraphs: [
          "Before opening dozens of tabs, decide what you actually have. If you only know that you want a pair of shoes, a hoodie or a bag, begin with a category. A category page lets you compare silhouettes, prices and product types without pretending that every result is the same listing. If you already have a specific source URL or product identifier, begin with that link instead. A precise input makes it easier to match any available QC album to the correct seller and item.",
          "Broad searches are useful for inspiration but weak for verification. A phrase such as “black hoodie” may return many visually similar pieces from different sellers. Add the model, material, distinctive graphic or item ID when you can. The more specific the query, the easier it becomes to tell whether a photo set belongs to your listing rather than a look-alike. Keep the original URL until your final check; shortened captions and screenshots can lose the seller and variant information you need later.",
        ],
      },
      {
        heading: "2. Treat a spreadsheet as a discovery tool, not a quality certificate",
        paragraphs: [
          "A web spreadsheet is most helpful when it turns a long collection of links into clear categories and individual detail pages. On CNBuy Sheet, visitors can start with shoes, hoodies and sweaters, T-shirts, jackets, pants and shorts, headwear, accessories, jerseys or electronics. That structure reduces the friction of finding relevant listings, especially when you do not yet have a seller link in mind.",
          "The limitation is equally important. A title, price and thumbnail describe a listing at a point in time; they do not prove the construction, sizing, condition or availability of the item that might be ordered later. Sellers can change variants, replace images or update prices. Use spreadsheet entries to create a shortlist, then open each promising product detail and compare its live information. Removing obviously mismatched listings early is more valuable than collecting a huge folder of links you never verify.",
        ],
        points: [
          "Use categories to narrow the field before comparing details",
          "Open an individual product page instead of relying on a thumbnail",
          "Keep two or three realistic alternatives when evidence is incomplete",
          "Re-check the live listing before making any purchase decision",
        ],
      },
      {
        heading: "3. Match QC material to the exact product link",
        paragraphs: [
          "UUFinds describes its service as a QC finder for product photos and videos and its public app information mentions link handling for marketplaces and shopping agents. That makes the service useful as a research layer. When an album appears, compare the source URL, item identifier, seller, selected color and visible variant information. A matching thumbnail alone is not enough because sellers often reuse factory or catalog images.",
          "Dates and sample size matter. Several recent examples tied to the same listing can show whether shape and details remain reasonably consistent. One old set may still help you understand the product, but it should carry less weight. When a match is uncertain, label the images as general reference rather than evidence for your exact item. That distinction protects you from a common mistake: judging one batch while planning to open a different listing.",
        ],
      },
      {
        heading: "4. Read QC photos from the outside in",
        paragraphs: [
          "Begin with the overall silhouette and proportion. For footwear, compare toe shape, heel height, panel spacing and the join between upper and sole. For clothing, look at body width, shoulder line, sleeve length and how the fabric hangs. For bags, hats and accessories, compare the outline, handle or strap placement and the position of obvious hardware. If the basic shape is wrong, a neat label or clean close-up should not distract from it.",
          "Then move to construction details: seam paths, stitch consistency, print placement, embroidery edges, zippers, buttons, eyelets and glued areas. Compare multiple angles because warehouse lighting can shift color and a wide lens can distort proportion. Measurement photos deserve special attention. Compare the ruler with the seller’s size chart and with a similar item you already own; letter sizes such as M or L are not universal. If an important angle or measurement is missing, record that as missing evidence instead of guessing.",
        ],
        points: [
          "Check front, back and side views for consistent shape",
          "Compare major details before small labels or packaging",
          "Use measurements rather than assuming a familiar size letter",
          "Separate camera or lighting uncertainty from visible defects",
        ],
      },
      {
        heading: "5. Use video for movement and texture, when it exists",
        paragraphs: [
          "Video can answer questions that a still image cannot. It may show how fabric folds, how a zipper runs, how a sole flexes or how reflective and textured materials react as the item moves. It can also expose angles hidden in a carefully framed photo. Watch slowly and compare the same features you used in the photo checklist rather than treating motion itself as proof of quality.",
          "Video still has limits. Compression can hide fine detail, lighting can alter color and a short clip cannot establish long-term durability. For electronics, an exterior video does not verify internal specifications, battery health or electrical safety. Use video as another piece of evidence, then return to the product description and current destination page for claims that visual media cannot confirm.",
        ],
      },
      {
        heading: "6. Open the exact CNBuy Sheet product page",
        paragraphs: [
          "After research, move from the guide or category into a specific product detail. UUFinds Sheet now provides individual pages that show the listing images, category, displayed price and main-site identifier before sending you to the matching CNBuy Sheet URL. This extra step makes the destination visible and gives you one last opportunity to confirm that the item is the one you intended to open.",
          "On the live page, verify the identifier, title, seller or source link, current price, available color and size options, and any description or service information. Prices and stock can change, so the live destination should override an older guide or screenshot. If the product is gone or the details no longer match, return to the category rather than forcing a conclusion from stale information. A working alternative with clearer evidence is usually the better shortlist choice.",
        ],
      },
      {
        heading: "7. Compare total decision quality, not only the lowest price",
        paragraphs: [
          "A low displayed product price is only one part of the decision. Packaging, international transport, service terms and the item’s size or weight may affect the final amount shown by the platform used to place the order. This guide does not publish a universal shipping quote because routes, destinations, parcel measurements and provider terms can vary. Use the current platform calculator or checkout information when those figures matter.",
          "The same principle applies to quality. A slightly cheaper listing with uncertain sizing and one mismatched photo may be a weaker choice than an alternative with clear measurements, several recent examples and an exact product-page match. Good research does not guarantee a perfect item, but it helps you see which assumptions remain. Write down those assumptions before continuing; if the list is long, keep comparing.",
        ],
      },
      {
        heading: "8. A repeatable final checklist",
        paragraphs: [
          "A dependable routine should be short enough to repeat. First, save the exact source or product link. Second, decide whether you are browsing broadly or verifying a particular listing. Third, inspect any matched QC media from overall shape to fine construction and measurements. Fourth, open the CNBuy Sheet detail page and confirm the current facts. Finally, record anything the images did not establish, including sizing uncertainty, missing angles, material claims or changing availability.",
          "The purpose of a UUFinds spreadsheet search is not to find the page with the largest number of links. It is to reach a product you can identify, compare and verify without losing track of where the information came from. Category browsing expands your options; QC research reduces uncertainty; the live product page confirms what is available now. Keeping those roles separate produces a clearer and more useful shopping route.",
        ],
        points: [
          "Exact link saved and matched",
          "QC date, angles and measurements reviewed",
          "Live product ID, price and variants confirmed",
          "Unanswered questions written down before continuing",
        ],
      },
    ],
  },
  {
    slug: "uufinds-qc-checklist",
    label: "QC METHOD",
    title: "A practical UUFinds QC checklist before you save a product link",
    description: "A fact-checked field guide to matching UUFinds QC photos and videos to the exact listing, reading the evidence and recording what still needs verification.",
    updated: "July 23, 2026",
    readTime: "11 min read",
    modifiedISO: "2026-07-23",
    sourceNote: "For this QC guide, function claims were checked on July 23, 2026 against UUFinds’ public QC finder, QC browsing page, product-detail pages and the current App Store listing from Uufinds Limited. Those sources support QC-photo and QC-video discovery, Chinese marketplace and agent-link handling, and image-search claims. They do not support a promise that every listing has recent QC media or that one photographed item will be identical to a later item.",
    intro: [
      "UUFinds’ public QC finder says it helps users find QC photos and QC videos and supports image recognition. Its QC browsing page describes access to QC photos for products from Chinese marketplaces such as Taobao and 1688, while public product-detail pages display item information alongside QC material. The public app listing from Uufinds Limited also mentions conversion of 1688, Taobao, Weidian and shopping-agent links, plus image-search features. These are useful research functions, but none of them turns a photo album into a guarantee.",
      "A QC finder is most useful when it slows you down for the right reasons. It can show warehouse photos or video connected to a product link, but it cannot make the decision for you. The useful question is not simply “does this look good?” It is “does the available evidence match the exact listing, variant and details I am considering?”",
      "This independent guide does not send shoppers to UUFinds. It uses the verified public information above to explain the method, then keeps every shopping, product and category route pointed at CNBuy Sheet.",
    ],
    sections: [
      {
        heading: "What UUFinds publicly confirms",
        paragraphs: [
          "The official website consistently frames UUFinds as a discovery and information layer rather than a seller. The QC finder promotes photos, videos and image recognition; the separate QC browsing copy names Chinese marketplaces; and product-detail pages present QC material with product information. That supports a practical use case: locate visual evidence connected to a product, then inspect it before opening a shopping destination.",
          "The important limit is just as factual. UUFinds’ public product pages state that the platform does not sell products directly or indirectly. A QC album can therefore help with comparison, but purchasing terms, current variants, seller information, stock and the final product decision still belong to the live destination and the service used to place an order.",
        ],
        points: [
          "Core output: available QC photos and QC videos",
          "Search input: marketplace, product or shopping-agent links, plus image search",
          "Research scope: product discovery and visual comparison",
          "Not established: a guarantee of quality, stock, sizing or batch consistency",
        ],
      },
      {
        heading: "Confirm that you are looking at the same listing",
        paragraphs: [
          "Start with the source link. A similar title or thumbnail is not enough. Compare the seller, item identifier, selected color and size where those details are visible. Sellers may reuse images across listings, and visually similar products can come from different batches. If you cannot establish a reasonable match, treat the QC album as reference material—not proof for your exact item.",
          "Also check the date and the number of available examples. A larger set of recent images can reveal whether details stay consistent from item to item. One old photo may still be helpful, but it carries less weight than several clearly matched examples.",
        ],
        points: [
          "Exact match: the source link or item ID, seller and visible variant agree",
          "Probable match: the item agrees but one important field is missing",
          "Reference only: the thumbnail looks similar but the seller or item ID cannot be confirmed",
        ],
      },
      {
        heading: "Read the overall shape before zooming into details",
        paragraphs: [
          "Look at proportion, silhouette and symmetry first. For footwear, compare the toe shape, heel height, panel spacing and the way the sole meets the upper. For clothing, check the body width, sleeve length, shoulder shape and how the fabric hangs. For bags or accessories, compare the outline, handle placement and hardware position.",
          "This wide view matters because a sharply printed label cannot rescue an incorrect shape. If the overall structure looks wrong, note that before spending time on tiny details.",
        ],
        points: [
          "Front, back and side views agree with each other",
          "Left and right sides look reasonably symmetrical",
          "The proportions match the product description and size",
          "Nothing appears crushed, twisted or hidden by the camera angle",
        ],
      },
      {
        heading: "Inspect construction and finish",
        paragraphs: [
          "Move from large features to smaller ones: seam paths, stitch density, print alignment, embroidery edges, zippers, buttons, eyelets and attached hardware. You are looking for visible inconsistencies, not trying to prove perfection from a warehouse camera. Uneven lighting can change color; perspective can make measurements look distorted. Compare multiple angles before calling something a defect.",
          "For printed or patterned pieces, check whether major elements are centered and whether repeated motifs line up at obvious seams. For footwear, inspect glue marks, panel edges and sole alignment. For electronics, visual QC alone is limited; appearance does not establish battery condition, internal specifications or electrical safety.",
        ],
      },
      {
        heading: "Use measurements as evidence, not decoration",
        paragraphs: [
          "When a ruler or measurement photo is available, compare it with the seller’s size chart and with an item you already own. Garment labels are not a universal sizing system. Chest width, length, shoulder width, sleeve length and waist measurements are more useful than a letter such as M or L.",
          "Allow for the way the item is placed. A garment that is folded, stretched or photographed at an angle may produce a misleading number. If an important measurement is missing, that is a reason to seek clarification rather than guess.",
        ],
        points: [
          "Compare centimetres, not only the S/M/L label",
          "Check where the ruler begins and whether the fabric is flat",
          "Use a similar item you own as the control measurement",
          "Treat missing measurements as missing evidence",
        ],
      },
      {
        heading: "Use video for movement and texture, when it exists",
        paragraphs: [
          "Video can answer questions that a still image cannot. It may show how fabric folds, how a zipper runs, how a sole flexes or how reflective and textured materials react as the item moves. It can also expose angles hidden in a carefully framed photo. Watch slowly and compare the same features you used in the photo checklist rather than treating motion itself as proof of quality.",
          "Video still has limits. Compression can hide fine detail, lighting can alter color and a short clip cannot establish long-term durability. For electronics, an exterior video does not verify internal specifications, battery health or electrical safety. Use video as another piece of evidence, then return to the product description and current destination page for claims that visual media cannot confirm.",
        ],
      },
      {
        heading: "Adjust the checklist to the product type",
        paragraphs: [
          "Begin with the overall silhouette and proportion. For footwear, compare toe shape, heel height, panel spacing and the join between upper and sole. For clothing, look at body width, shoulder line, sleeve length and how the fabric hangs. For bags, hats and accessories, compare the outline, handle or strap placement and the position of obvious hardware. If the basic shape is wrong, a neat label or clean close-up should not distract from it.",
          "For printed or patterned pieces, check whether major elements are centered and whether repeated motifs line up at obvious seams. For footwear, inspect glue marks, panel edges and sole alignment. For electronics, visual QC alone is limited; appearance does not establish battery condition, internal specifications or electrical safety.",
        ],
        points: [
          "Shoes: toe shape, left-right symmetry, panel edges, sole alignment and glue marks",
          "Clothing: measured width and length, seam paths, print placement, cuffs and fabric surface",
          "Bags and accessories: outline, hardware position, zipper tracks, strap stitching and interior views",
          "Electronics: exterior condition and included accessories only; internal condition remains unverified",
        ],
      },
      {
        heading: "Finish on the live CNBuy Sheet product page",
        paragraphs: [
          "After QC research, open the matching category or product destination and confirm the current state of the listing. Price, availability, color options, size choices and seller information can change. The direct CNBuy Sheet routes on this site are designed to take you to a relevant category, but they do not replace the final listing check.",
          "Save the link only after you can explain what the photos showed, what they did not show and which details still need confirmation. That short summary is more useful than a vague green-light or red-light label.",
        ],
        points: [
          "Confirm the current product ID and seller or source link",
          "Confirm the displayed price, available variants and size information",
          "Check whether the live images still describe the item you researched",
          "Use the live page—not an older QC album—for facts that can change",
        ],
      },
      {
        heading: "Write a traceable verdict instead of saying “looks good”",
        paragraphs: [
          "A dependable routine should be short enough to repeat. First, save the exact source or product link. Second, decide whether you are browsing broadly or verifying a particular listing. Third, inspect any matched QC media from overall shape to fine construction and measurements. Fourth, open the CNBuy Sheet detail page and confirm the current facts. Finally, record anything the images did not establish, including sizing uncertainty, missing angles, material claims or changing availability.",
          "The purpose of a UUFinds spreadsheet search is not to find the page with the largest number of links. It is to reach a product you can identify, compare and verify without losing track of where the information came from. Category browsing expands your options; QC research reduces uncertainty; the live product page confirms what is available now. Keeping those roles separate produces a clearer and more useful shopping route.",
        ],
        points: [
          "MATCH — exact, probable or reference only",
          "VISIBLE EVIDENCE — shape, construction, finish and measurements checked",
          "UNKNOWN — missing angles, material claims, internal condition or sizing uncertainty",
          "LIVE CHECK — current product ID, price and variants confirmed on CNBuy Sheet",
          "DECISION — keep, compare with an alternative or pause for more evidence",
        ],
      },
    ],
  },
  {
    slug: "how-to-use-uufinds",
    label: "BEGINNER GUIDE",
    title: "How to use UUFinds and continue browsing on CNBuy Sheet",
    description: "A research-to-browse workflow for QC material, shopping links and CNBuy Sheet category pages.",
    updated: "July 23, 2026",
    readTime: "9 min read",
    modifiedISO: "2026-07-23",
    sourceNote: "The UUFinds functions in this beginner guide were checked on July 23, 2026 against the official public QC finder, QC browsing copy, account pages and public app information. Marketplace and agent-link handling, QC media and image-search features are documented; availability of matched media for any particular listing is not guaranteed.",
    intro: [
      "UUFinds and CNBuy Sheet solve different parts of the product-search process. UUFinds focuses on QC discovery and link handling; CNBuy Sheet presents browsable categories and product-detail routes. Using them in sequence is more reliable than treating either one as a complete answer.",
      "The official UUFinds App Store listing says the service can convert links from 1688, Taobao, Weidian and shopping agents, and can surface real quality pictures. CNBuy Sheet, meanwhile, publishes category pages for shoes, hoodies, T-shirts, jackets, pants, headwear, accessories, jerseys and electronics. Here is a clean way to move between the two.",
    ],
    sections: [
      {
        heading: "Step 1: Begin with a specific product or source link",
        paragraphs: [
          "A precise input produces a more useful search. If you already have a Taobao, Weidian, 1688 or agent link, keep the full URL. If you only have a product name, add a distinctive model, material or category term rather than searching a broad word such as “shoes.” The goal is to reduce the number of visually similar but unrelated results.",
          "Open the official UUFinds QC finder and paste the link or run the most specific search available. Check that any returned album or product information appears connected to the same item. Do not assume that every result sharing a thumbnail represents the same seller or batch.",
        ],
      },
      {
        heading: "Step 2: Compare the QC material methodically",
        paragraphs: [
          "Use the photos to answer a short set of questions. Is the silhouette correct? Do the materials and finish look consistent across angles? Are important details visible? Do measurements line up with the size chart? Is the album recent enough to be relevant? If video is available, use it to examine movement, texture and angles that still images may hide.",
          "Record uncertainty. A missing view is not automatically a defect, but it is still missing evidence. A bright warehouse light may shift color. A wide-angle camera may distort proportion. The strongest conclusion is often conditional: the shape looks consistent, while color and sizing still need confirmation.",
        ],
      },
      {
        heading: "A worked example: researching a hoodie from a screenshot",
        paragraphs: [
          "Suppose you have a screenshot of a charcoal hoodie but no reliable product name. UUFinds publicly describes image recognition alongside its QC finder, so an image-led search is a reasonable discovery step. Treat the results as candidates, not matches. Open the most plausible result and recover the underlying marketplace or shopping-agent link. Then compare the graphic position, pocket shape, hood construction, cuff width and visible color options with the screenshot. A shared photo can lead you to the right product family without proving that the seller, variant or batch is identical.",
          "Next, look for QC material tied to that source. The most useful set would show the complete front and back, the hood and neckline, seams around the pocket, cuffs, the fabric surface and a ruler across the key dimensions. If the only available images show a folded garment or a close-up of a label, the evidence is too narrow to answer fit and proportion questions. Write that down. “No full-length view” is a better note than “probably oversized.”",
          "Finally, open Hoodies and Sweaters on CNBuy Sheet and compare a small number of live listings. Do not select the first similar thumbnail. Check the current title, product identifier, displayed price, sizes, colors and destination link. If the live listing no longer resembles the QC set, the match has broken and the older evidence should not be carried over. This example is ordinary on purpose: good research is mostly careful matching, not a clever shortcut.",
        ],
      },
      {
        heading: "Step 3: Move to the correct CNBuy Sheet category",
        paragraphs: [
          "Once you know what you are looking for, use a category route instead of returning to a generic homepage. On UUFinds Sheet, a shoe search opens the Shoes section; hoodie and sweater terms open Hoodies/Sweaters; caps and hats open Headwear. The same logic applies to T-shirts, jackets, pants and shorts, accessories, jerseys and electronics.",
          "A category page is a discovery surface, not a guarantee that every product is equivalent to the one you researched. Compare titles, images, item identifiers and destination links before treating a result as a match.",
        ],
        points: [
          "Shoes → cnbuycha.com/shoes/",
          "Hoodies and sweaters → cnbuycha.com/hoodies-sweaters/",
          "T-shirts → cnbuycha.com/t-shirts/",
          "Jackets → cnbuycha.com/jackets/",
          "Pants and shorts → cnbuycha.com/pants-shorts/",
          "Headwear, accessories, jerseys and electronics → their matching category routes",
        ],
      },
      {
        heading: "Step 4: Re-check the live listing",
        paragraphs: [
          "Product pages are changeable. Before making any purchase decision, confirm the current price, seller, available sizes or variants, item description and any service or shipping terms shown by the platform you will actually use. Information on a guide, spreadsheet or older QC album may not reflect the listing today.",
          "If a detail is important but not visible, pause. Look for another matched QC example, request clarification through the relevant service, or choose a listing with better evidence. The purpose of the workflow is not to add more clicks; it is to keep discovery and verification from being confused.",
        ],
      },
      {
        heading: "What to do when UUFinds returns no usable QC match",
        paragraphs: [
          "An empty result is information, too. It may mean that no QC set is available for the exact link, that the link format is not being matched, or that the item is too new or obscure. It does not prove the product is poor, and it does not justify borrowing photos from a visually similar listing. First, try the original marketplace URL instead of a shortened or redirected agent link. If you began with an image, search again with the item name or identifier you recovered from a candidate page.",
          "If the result is still empty, change the decision rather than the evidence. Keep the listing as an unverified candidate, compare it with alternatives that have traceable material, or wait for more information. For a low-cost accessory, you may accept more uncertainty than you would for shoes with sensitive sizing or an electronic item whose important specifications cannot be seen. The risk threshold belongs to the shopper; the honest label on the research note should remain “no matched QC found.”",
        ],
      },
      {
        heading: "Keep a short research note before leaving the page",
        paragraphs: [
          "A useful note can fit on six lines: original source link, seller or item ID, intended color and size, QC date, important observations, and unresolved questions. Add the exact CNBuy Sheet page you opened at the end. This small habit prevents a common mix-up when several tabs show the same catalog photo. It also makes comparison fair: one candidate may be cheaper, while another has current measurements and several recent angles.",
          "Avoid verdicts such as “1:1,” “perfect” or “safe to buy.” The public UUFinds information supports discovery of QC photos and videos, link handling and image-based search; it does not support those guarantees. A better conclusion sounds like a person who actually reviewed the material: “probable link match; shape and print placement look consistent in two recent sets; sleeve measurement and true color remain unconfirmed.” That sentence is less exciting than a score, but far more useful.",
        ],
      },
      {
        heading: "What this workflow does not do",
        paragraphs: [
          "UUFinds Sheet is independent from UUFinds and does not sell products, accept payments or process orders. It connects educational content with clearly labeled external tools and category pages. External platforms remain responsible for their own listings, terms and services.",
          "No QC workflow eliminates risk. Photos may be incomplete, items may vary and listings may change. What the process can do is make your decision traceable: you know which link you checked, which evidence you saw and which facts you confirmed on the live page.",
        ],
      },
    ],
  },
  {
    slug: "spreadsheet-vs-qc-finder",
    label: "COMPARISON",
    title: "Spreadsheet vs QC finder: two tools, two different jobs",
    description: "A straightforward comparison of product discovery pages and QC research tools—and why the difference matters.",
    updated: "July 23, 2026",
    readTime: "9 min read",
    modifiedISO: "2026-07-23",
    sourceNote: "This comparison was reviewed on July 23, 2026 against UUFinds’ public description of QC-photo and QC-video discovery, image recognition and link handling, together with CNBuy Sheet’s live category and product-page structure. The comparison distinguishes documented platform functions from independent inspection advice.",
    intro: [
      "A spreadsheet answers “what can I browse?” A QC finder answers “what visual evidence can I inspect for this link?” The two tools often appear in the same search journey, which is why they are easy to confuse. Their data, strengths and limits are different.",
      "CNBuy Sheet turns product links into browsable web categories. UUFinds describes itself as a QC finder for photos and videos and also supports link conversion. Used together, one helps create a shortlist and the other helps examine it.",
    ],
    sections: [
      {
        heading: "What a web spreadsheet is good at",
        paragraphs: [
          "A web-based spreadsheet organizes many product links into a visual catalog. Instead of scanning rows and columns, a visitor can browse categories, open product details and compare several listings. This is useful early in the journey when you know the category you want but not the exact item or seller.",
          "Its main strength is coverage. Its main weakness is that coverage can become shallow. A title and thumbnail may help you discover a product, but they do not establish the construction, sizing or condition of an item you might receive. Spreadsheet data can also become stale when sellers change listings or options.",
        ],
      },
      {
        heading: "What a QC finder is good at",
        paragraphs: [
          "A QC finder is narrower. It connects a product or agent link with available quality-control images or video. That can reveal real-world shape, materials, finish and measurements that polished seller photos do not show. It is most valuable after you have identified a specific listing or a small shortlist.",
          "Its limit is equally important: QC photos document an item or batch at a moment in time. They are not a promise that another item will be identical. Visual evidence also cannot verify every claim, especially internal electronics, long-term durability or shipping performance.",
        ],
      },
      {
        heading: "What UUFinds publicly adds to the research step",
        paragraphs: [
          "UUFinds’ public QC finder describes access to QC photos and QC videos and says it supports image recognition. Its public app information also names link conversion for 1688, Taobao, Weidian and shopping-agent URLs, while its personalized display page describes combining items, purchasing agents and social content in one shareable page. Those functions make it easier to move from a screenshot, marketplace link or shared collection toward a traceable product candidate.",
          "They do not collapse discovery and verification into one job. A shareable page can preserve a collection; a converted link can make a destination easier to open; an image result can surface something visually similar. None of those signals alone establishes that the seller, variant and batch match the QC material on screen. The exact source still has to survive the whole path from the first find to the current destination page.",
        ],
      },
      {
        heading: "Four searches that look similar but need different starting points",
        paragraphs: [
          "“I want a black hoodie” is a discovery request. Start with a spreadsheet category because breadth is useful: compare shapes, graphics, materials, prices and available sizes. Only after two or three candidates look realistic should you spend time searching for matched QC. Running a very broad phrase through a QC finder first can produce many unrelated items and make a similar image feel more convincing than it is.",
          "“I have this Weidian link” is a verification request. Start with the QC finder and preserve the full URL or item identifier. If images appear, compare the seller, product details, color and date before judging the garment itself. After that, browse the equivalent CNBuy Sheet category to see whether another current listing has clearer measurements or more recent evidence.",
          "“Can I find the item in this screenshot?” is an identification request. UUFinds’ image-recognition claim makes image search a sensible first move, but the result should be treated as a lead. Recover a real listing, compare distinctive features and then look for QC attached to that listing. A screenshot cropped from social media may hide the exact color, seller and even whether the item shown was the one delivered.",
          "“Is this electronic item reliable?” is partly outside visual QC. A spreadsheet can identify choices and QC photos can document exterior condition, included accessories and visible labels. They cannot establish battery health, electrical safety, internal components or long-term performance. Finish with the live specifications and terms, and do not turn a clean exterior into a technical claim that the images cannot support.",
        ],
      },
      {
        heading: "The best order depends on what you already have",
        paragraphs: [
          "If you already have a product link, begin with the QC finder. Confirm the match, examine the available evidence and then use a spreadsheet category to compare alternatives. If you only know the type of product you want, begin with a category page, create a shortlist and run the most promising links through the QC finder.",
          "In both cases, finish on the current product page. That is where you confirm availability, variants, price and any platform-specific terms. The discovery page and QC album inform the decision; neither should replace the final check.",
        ],
        points: [
          "Have a link? QC first, category comparison second.",
          "Have only an idea? Category browse first, QC second.",
          "Ready to decide? Live listing check last.",
        ],
      },
      {
        heading: "Why a single giant link page is not enough",
        paragraphs: [
          "A page can contain thousands of links and still provide little help if the entries are duplicated, unlabeled or disconnected from current evidence. Useful organization requires accurate categories, working destinations, clear updates and enough context for a visitor to understand what will happen after a click.",
          "That is why UUFinds Sheet separates category routes from editorial guidance. The homepage helps you choose a destination. The guides explain how to assess what you find. Clear independent-site language also matters: this website is not the official UUFinds service, and external links are labeled as external.",
        ],
      },
      {
        heading: "Build one evidence table instead of collecting endless tabs",
        paragraphs: [
          "For each candidate, record five fields: exact source or item ID, current destination page, latest matched QC date, visible strengths, and unknowns. That is enough to expose the difference between coverage and confidence. A spreadsheet entry with a clean thumbnail but no traceable QC may still be worth watching. A second listing with two recent albums and measured dimensions may deserve the stronger place on the shortlist even if its displayed price is slightly higher.",
          "Keep observations literal. “Three photos show straight front stitching” is evidence; “the construction will last” is a prediction. “Ruler appears to show 56 cm across the chest” is evidence; “fits like a European medium” requires a comparison with a size chart or garment you know. This language is not only more accurate—it makes the note useful when you return a week later and the listing has changed.",
        ],
        points: [
          "Discovery field: category, model and current listing URL",
          "Match field: source link, seller or item identifier and variant",
          "Evidence field: dates, angles, video and measurements available",
          "Unknown field: missing views, unverified claims and changeable live facts",
        ],
      },
      {
        heading: "Red flags in either tool",
        paragraphs: [
          "On a spreadsheet, watch for duplicate cards that lead to the same generic destination, broken detail pages, prices with no date context and category labels that do not match the product. These problems do not automatically make every link unusable, but they remove the traceability that gives a product directory value. Open the individual page and make sure its identifier and destination are visible before saving it.",
          "In a QC finder, the red flags are different: a thumbnail match with no confirming source, one old image standing in for a current listing, missing full-product views, measurement photos with an unclear starting point, or a video that never shows the detail being discussed. The correct response is not always rejection. Sometimes it is simply a lower-confidence label and a search for a better-documented alternative.",
        ],
      },
      {
        heading: "A simple rule to remember",
        paragraphs: [
          "Use a spreadsheet to expand or organize your options. Use a QC finder to reduce uncertainty around a specific option. Use the live destination page to confirm the facts that can change. When each tool keeps its proper job, the entire search process becomes easier to audit and less dependent on assumptions.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
