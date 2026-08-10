export type ProductEvidence = {
  sourceTitle: string;
  sourceItemId: string;
  sourceGalleryCount: number;
  lastChecked: string;
  price: {
    sourceCny: string;
    approxUsd: string;
    checkedAt: string;
    fxAsOf: string;
  };
  localViews: 2 | 3;
  optionNote: string;
  measurementNote: string;
  decisionNote: string;
  qcRisks: string[];
  galleryAlts: string[];
  galleryCaptions: string[];
  relatedCategoryPath: string;
  relatedArticlePath: string;
};

export const productEvidence: Record<string, ProductEvidence> = {
  "snow-ski-goggles": {
    sourceTitle: "Louis Vuitton Dior Gucci snow ski goggles",
    sourceItemId: "7813573584",
    sourceGalleryCount: 5,
    lastChecked: "2026-07-28",
    price: {
      sourceCny: "340–679",
      approxUsd: "50–101",
      checkedAt: "2026-08-10",
      fxAsOf: "2026-08-07",
    },
    localViews: 3,
    optionNote:
      "The source page exposed five distinct gallery files when checked, but it did not publish a typed option count. The images are not interchangeable: they show visibly different lens, frame, strap and presentation details. Save the exact option text and its thumbnail before submitting the product link; a broad title containing several labels is not enough to identify the pair you intended.",
    measurementNote:
      "Treat fit as a helmet-and-face compatibility question rather than a clothing size. Look for the frame width, lens height, nose opening, strap adjustment range and the condition of the face foam. The gallery includes ruler-backed evidence, yet the directory page does not turn that image into a written specification. Read the scale carefully and request one focused measurement if a critical dimension remains unclear.",
    decisionNote:
      "The useful decision is whether the received goggle matches the saved frame/lens combination and includes only the pieces promised by that option. A pouch, case, cloth or spare part seen beside another gallery image should not be assumed to be included unless the selected offer says so.",
    qcRisks: [
      "Inspect the lens surface for scratches, coating marks, bubbles or edge damage under more than one angle.",
      "Follow the entire frame edge and face foam for gaps, crushing, loose adhesive or an uneven seal.",
      "Compare both strap anchors and the adjustment hardware; a decorative strap image does not prove secure attachment.",
      "Match lens tint, frame trim and visible markings to the saved option rather than to the first directory photo.",
      "Lay out every included piece in one frame and compare it with the selected listing contents before parcel submission.",
    ],
    galleryAlts: [
      "Front product view of the selected snow ski goggles",
      "Ruler-backed warehouse view of the goggles and included pieces",
      "Additional gallery angle showing the lens and frame presentation",
    ],
    galleryCaptions: [
      "Primary directory view used for discovery.",
      "A locally stored evidence view with ruler references; verify the scale rather than estimating from the frame.",
      "A second source-gallery presentation. Differences between gallery images make exact option capture important.",
    ],
    relatedCategoryPath: "/categories",
    relatedArticlePath: "/articles/how-to-read-qc-photos",
  },
  "gucci-hat": {
    sourceTitle: "GUCCI hat",
    sourceItemId: "7813802324",
    sourceGalleryCount: 5,
    lastChecked: "2026-07-28",
    price: {
      sourceCny: "75–85",
      approxUsd: "11–13",
      checkedAt: "2026-08-10",
      fxAsOf: "2026-08-07",
    },
    localViews: 3,
    optionNote:
      "Five distinct gallery files were present on the checked source page. Across those images, more than one cap treatment is visible, including different colour and surface patterns, while the page does not publish a complete written option count. Record the exact colour/pattern thumbnail and option text; “GUCCI hat” alone cannot distinguish the intended cap.",
    measurementNote:
      "A usable cap check needs circumference or adjustment range, crown depth and brim length. None of those values is written as a size table on the directory page. If fit matters, compare the current seller measurement with a cap that already fits and ask for the closure and inner label to be shown without assuming that every pictured treatment uses the same construction.",
    decisionNote:
      "The gallery mixes product presentation and warehouse-style views. Use it to identify the selected treatment, closure and visible construction—not to authenticate the label. Packaging, tags or accessories are decision evidence only when the chosen option expressly includes them.",
    qcRisks: [
      "Compare the selected pattern and colour across crown, side panels and brim; do not accept a different pictured treatment by title alone.",
      "Check crown symmetry and panel alignment from the front and rear instead of judging only a top-down image.",
      "Inspect embroidery or printed marks for placement, missing sections, loose threads and obvious distortion.",
      "Review the brim edge, top button, ventilation points and closure for visible damage or misalignment.",
      "Confirm the circumference or adjuster position against the saved fit requirement before international shipping.",
    ],
    galleryAlts: [
      "Primary gallery view showing two cap treatments",
      "Front angle of a patterned cap from the source gallery",
      "Back and inner presentation of the patterned cap",
    ],
    galleryCaptions: [
      "The first directory image shows that the broad title can cover visibly different treatments.",
      "A second locally stored gallery angle for pattern, crown and brim review.",
      "Rear and inner evidence helps check closure, label area and overall cap shape.",
    ],
    relatedCategoryPath: "/categories",
    relatedArticlePath: "/articles/how-to-read-qc-photos",
  },
  "off-white-hoodies": {
    sourceTitle: "Off-White Hoodies [39 styles]",
    sourceItemId: "7813733346",
    sourceGalleryCount: 5,
    lastChecked: "2026-07-28",
    price: {
      sourceCny: "299.52–342.72",
      approxUsd: "44–51",
      checkedAt: "2026-08-10",
      fxAsOf: "2026-08-07",
    },
    localViews: 3,
    optionNote:
      "This is the one page in the set that states an option count in its title: 39 styles. The checked page also exposed five distinct gallery files. A style board is useful for discovery but is too compressed to preserve the ordered design. Save the chosen style number or exact option wording together with a clear thumbnail before the link is parsed.",
    measurementNote:
      "Do not reuse one size assumption across 39 styles. Confirm the size system and the garment measurements for the exact selected design: chest width, shoulder, sleeve and body length. The source gallery includes ruler-backed garment views, but the directory page does not publish those values in a readable text table, so the measurement evidence must be checked on the current listing or order.",
    decisionNote:
      "Large back graphics make print identity and placement more important than a generic hoodie label. Compare front and back separately, then decide whether a visible print shift, colour mismatch or wrong style is material before the item leaves the warehouse.",
    qcRisks: [
      "Match the exact one of 39 stated styles using saved option text and a thumbnail, not the product title alone.",
      "Compare chest, shoulder, sleeve and length measurements with the selected size evidence.",
      "Check front and back graphic identity, scale, centring and distance from seams or hood.",
      "Inspect hood shape, drawcord area, kangaroo pocket, cuffs and hem for asymmetry or damage.",
      "Review dark fabric for stains, holes, loose threads and print marks that may disappear in a compressed overview.",
    ],
    galleryAlts: [
      "Style-board image for the 39-style hoodie listing",
      "Ruler-backed front view of one black hoodie style",
      "Ruler-backed back view of another black hoodie style",
    ],
    galleryCaptions: [
      "The source title states 39 styles; preserve the exact selection rather than this overview alone.",
      "A locally stored measurement view for front construction and print placement.",
      "Back artwork and garment proportions need a separate check from the front.",
    ],
    relatedCategoryPath: "/categories/hoodies-sweaters",
    relatedArticlePath: "/articles/how-to-read-qc-photos",
  },
  "numeris-high-top-shoes": {
    sourceTitle: "NUMERIS shoes Rick Owens shoes",
    sourceItemId: "7810791921",
    sourceGalleryCount: 2,
    lastChecked: "2026-07-28",
    price: {
      sourceCny: "455",
      approxUsd: "67",
      checkedAt: "2026-08-10",
      fxAsOf: "2026-08-07",
    },
    localViews: 2,
    optionNote:
      "Only two distinct gallery files were exposed on the checked directory page, fewer than any other find in this set. The title does not state an option count, while the imagery shows multiple visual treatments. That limited evidence makes the live option selector especially important: preserve colour, size-system wording and the exact high-top version before ordering.",
    measurementNote:
      "The directory page does not provide a written size chart. Confirm whether the seller uses EU, CN or another scale, then compare insole or outsole length with a shoe that fits. High-top footwear also needs attention to opening and shaft shape; a matching label size does not prove the same internal fit.",
    decisionNote:
      "Because the directory supplies only two unique gallery assets, warehouse QC should answer the basics clearly: matching pair, selected treatment, labelled size and visible sole/upper construction. If one of those cannot be seen, request the single missing view rather than assuming the collage covers the delivered pair.",
    qcRisks: [
      "Confirm that left and right shoes form one matching pair in colour, height, material panels and labelled size.",
      "Compare insole or outsole length with the saved fit reference and make sure the ruler starts at a true edge.",
      "Review the tall shaft and opening for symmetry, crushing or a material difference between the two shoes.",
      "Inspect toe shape, heel profile, eyelet rows, lacing and panel alignment from paired angles.",
      "Follow the sole edge for uneven attachment, excess adhesive, separation or a visibly twisted base.",
    ],
    galleryAlts: [
      "Primary product view of Numeris high-top shoes",
      "Additional collage showing colour treatments and side views",
    ],
    galleryCaptions: [
      "Primary discovery image retained locally at responsive sizes.",
      "The only additional unique gallery file found on the directory page; verify options on the live listing.",
    ],
    relatedCategoryPath: "/categories/shoes",
    relatedArticlePath: "/articles/how-to-read-qc-photos",
  },
  "hoka-speedgoat-5": {
    sourceTitle: "HOKA One One Speedgoat 5 Trail Running Shoes",
    sourceItemId: "7806024805",
    sourceGalleryCount: 5,
    lastChecked: "2026-07-28",
    price: {
      sourceCny: "218",
      approxUsd: "32",
      checkedAt: "2026-08-10",
      fxAsOf: "2026-08-07",
    },
    localViews: 3,
    optionNote:
      "The checked source page exposed five distinct gallery files. Its main collage visibly presents seven colour treatments, but the page title does not claim that seven is the complete live option count. Use the current selector to confirm colour and size; a colour shown in a discovery collage may be unavailable or named differently when the order is placed.",
    measurementNote:
      "Running-shoe fit should be checked with a consistent length reference, not the model name. Confirm the size system, insole or outsole length and the intended allowance for socks. The gallery includes paired and heel views, yet the directory page does not publish a text size table, so use the actual listing and warehouse evidence for the selected pair.",
    decisionNote:
      "Trail-style soles add a product-specific QC point: the two shoes should have matching outsole pattern, heel height and upper construction. A colour match is not sufficient if one shoe has a visibly different sole, tongue, heel counter or size label.",
    qcRisks: [
      "Match the selected colour treatment against the seven pictured treatments without treating that collage as live stock.",
      "Confirm both size labels and compare insole or outsole length using the same ruler method.",
      "Place the pair together to compare toe shape, upper height, heel counter and tongue alignment.",
      "Inspect the outsole lug pattern, sole edge and bonding line for asymmetry, separation or excess adhesive.",
      "Verify laces, insoles and any box or accessory only when the selected offer includes them.",
    ],
    galleryAlts: [
      "Collage showing seven pictured Speedgoat 5 colour treatments",
      "Ruler-backed overhead view of a black pair and shoe box",
      "Rear view of both shoes for heel and sole comparison",
    ],
    galleryCaptions: [
      "Seven colour treatments are pictured, but the current selector remains the authority for available options.",
      "Paired warehouse-style evidence helps confirm quantity, colour and size presentation.",
      "A rear view reveals heel symmetry and outsole alignment that the collage cannot show.",
    ],
    relatedCategoryPath: "/categories/shoes",
    relatedArticlePath: "/articles/how-to-read-qc-photos",
  },
  "nike-elite-backpack": {
    sourceTitle: "Nike Elite Backpack",
    sourceItemId: "7804348058",
    sourceGalleryCount: 4,
    lastChecked: "2026-07-28",
    price: {
      sourceCny: "89",
      approxUsd: "13",
      checkedAt: "2026-08-10",
      fxAsOf: "2026-08-07",
    },
    localViews: 3,
    optionNote:
      "Four distinct gallery files were exposed on the checked page. The primary collage shows six pictured treatments, including changes in body colour, accent colour and printed panels, but no complete written option count is published. Save the chosen treatment and confirm that the generated order uses the same front-panel design.",
    measurementNote:
      "The directory page contains ruler-backed images but no typed dimension table. Check external height, width and depth, then measure the actual object the bag must carry—such as a laptop or school folder. Strap length, back padding and opening shape can affect use even when the outer height appears sufficient.",
    decisionNote:
      "A backpack is a storage system, not only a front image. The side and back gallery views should be used to confirm compartments, zipper paths, shoulder straps and attachment points. Do not infer an internal sleeve, capacity or included pouch from the name alone.",
    qcRisks: [
      "Match the selected one of six pictured treatments by body, accent and panel design.",
      "Read ruler-backed height and width carefully and request depth if capacity is decision-critical.",
      "Open every visible zipper path and compare the number and position of compartments with the listing.",
      "Inspect both shoulder straps, top handle, adjusters and lower anchor stitching for symmetry and damage.",
      "Review front-panel shape, piping, print or embroidery placement and the condition of high-wear corners.",
    ],
    galleryAlts: [
      "Collage showing six pictured backpack treatments",
      "Ruler-backed front and side view of a black and green backpack",
      "Back-panel and shoulder-strap view of the backpack",
    ],
    galleryCaptions: [
      "Six treatments are pictured; preserve the exact front-panel selection.",
      "A locally stored ruler view supports dimension and zipper-path checks.",
      "The rear angle is needed for straps, padding and attachment points.",
    ],
    relatedCategoryPath: "/categories/bags",
    relatedArticlePath: "/articles/plan-china-shopping-haul",
  },
  "balenciaga-puffer": {
    sourceTitle: "Balenciaga Puffer",
    sourceItemId: "7804322444",
    sourceGalleryCount: 4,
    lastChecked: "2026-07-28",
    price: {
      sourceCny: "595",
      approxUsd: "88",
      checkedAt: "2026-08-10",
      fxAsOf: "2026-08-07",
    },
    localViews: 3,
    optionNote:
      "The checked page exposed four distinct gallery files and did not publish an option count in its title. The main image presents a black stand-collar puffer, while additional views show the garment against rulers. Confirm colour, size and exact construction on the current listing; background props and tags are not part of the product specification.",
    measurementNote:
      "A puffer can fit differently from an uninsulated jacket even at the same labelled size. Compare chest width, shoulder, sleeve and back length with a similar outer layer, allowing for the clothing worn underneath. The ruler images are evidence, but the directory page does not provide a typed chart or explain whether the measurements are flat-garment values.",
    decisionNote:
      "The important visual decision is whether baffles, fill and closures are reasonably consistent across the received garment. Compression during packing can change appearance, so distinguish temporary flattening from empty sections, damaged seams or a visibly mismatched panel.",
    qcRisks: [
      "Compare chest, shoulder, sleeve and body length with the saved outerwear reference.",
      "Follow horizontal baffle lines across the front and back for alignment, skipped stitching or open seams.",
      "Review fill distribution in sleeves, body and collar for large empty or heavily clumped areas.",
      "Test the main zipper path visually for waviness and inspect pockets, cuffs and collar construction.",
      "Check the small chest mark and labels for selected placement only; they do not authenticate the item.",
    ],
    galleryAlts: [
      "Primary front view of a black puffer jacket",
      "Ruler-backed front view showing the jacket laid flat",
      "Ruler-backed back view showing baffles and sleeve shape",
    ],
    galleryCaptions: [
      "Primary product view; background objects are not evidence of included pieces.",
      "Front measurement evidence helps compare chest, sleeve and body length.",
      "Back baffles and fill distribution require a separate angle.",
    ],
    relatedCategoryPath: "/categories",
    relatedArticlePath: "/articles/plan-china-shopping-haul",
  },
  "winter-hooded-jacket": {
    sourceTitle: "Winter hooded down jacket",
    sourceItemId: "7798076213",
    sourceGalleryCount: 4,
    lastChecked: "2026-07-28",
    price: {
      sourceCny: "272",
      approxUsd: "40",
      checkedAt: "2026-08-10",
      fxAsOf: "2026-08-07",
    },
    localViews: 3,
    optionNote:
      "Four distinct gallery files were exposed on the checked page. The primary image visibly shows four colour treatments—blue, pink, white and black—while the directory page does not state that this is the complete option count. Save the exact colour and size; the ruler-backed pink sample should not be assumed to represent every colour or production batch.",
    measurementNote:
      "Use flat-garment chest, shoulder, sleeve and length measurements, then compare hood depth and opening if weather coverage matters. The source gallery provides front and back ruler views but no typed size chart on the directory page. Read the actual scale and confirm whether the selected size uses the same measured sample.",
    decisionNote:
      "Bright colour can make uneven fill, stains and seam alignment easier to see, while black can hide them. Review the selected colour at full resolution, then inspect the hood, zipper, pockets and hem before authorising a bulky international shipment.",
    qcRisks: [
      "Match the selected blue, pink, white or black treatment and confirm the labelled size.",
      "Compare flat chest, shoulder, sleeve and body length with a winter jacket that already fits.",
      "Inspect hood shape, attachment seam, opening and any adjusters from front and rear views.",
      "Follow the zipper, pocket openings, cuffs and hem for broken hardware, twisting or loose seams.",
      "Compare fill across sleeves, front and back and check light colours for marks that a thumbnail can hide.",
    ],
    galleryAlts: [
      "Primary image showing four winter-jacket colours",
      "Ruler-backed front view of a pink hooded jacket",
      "Ruler-backed back view of the pink hooded jacket",
    ],
    galleryCaptions: [
      "Four colours are pictured; the current option selector controls availability.",
      "Front measurement and closure evidence for the photographed sample.",
      "Back construction, hood shape and fill distribution need their own review.",
    ],
    relatedCategoryPath: "/categories",
    relatedArticlePath: "/articles/plan-china-shopping-haul",
  },
};

export function getProductEvidence(slug: string) {
  return productEvidence[slug];
}
