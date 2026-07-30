import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(root, "public", "social");

const palette = {
  background: "#08131a",
  panel: "#10222b",
  panelAlt: "#152a34",
  rule: "#314650",
  ivory: "#f3ebdd",
  muted: "#9bb0ba",
  orange: "#ff6b2c",
  mint: "#c9f5da",
  mintInk: "#17352a",
};

function frame(inner) {
  return `
    <rect width="1200" height="630" fill="${palette.background}"/>
    <path d="M0 96H1200M0 192H1200M0 288H1200M0 384H1200M0 480H1200M0 576H1200" stroke="${palette.rule}" stroke-opacity=".33"/>
    <path d="M160 0V630M320 0V630M480 0V630M640 0V630M800 0V630M960 0V630M1120 0V630" stroke="${palette.rule}" stroke-opacity=".28"/>
    <rect x="34" y="32" width="1132" height="566" rx="22" fill="none" stroke="${palette.rule}" stroke-width="2"/>
    ${inner}
  `;
}

function heading(eyebrow, titleLine1, titleLine2, summary) {
  return `
    <text x="82" y="88" fill="${palette.mint}" font-family="DejaVu Sans" font-size="18" font-weight="700" letter-spacing="3">${eyebrow}</text>
    <text x="82" y="166" fill="${palette.ivory}" font-family="DejaVu Sans" font-size="55" font-weight="700">${titleLine1}</text>
    <text x="82" y="228" fill="${palette.ivory}" font-family="DejaVu Sans" font-size="55" font-weight="700">${titleLine2}</text>
    <text x="82" y="278" fill="${palette.muted}" font-family="DejaVu Sans" font-size="20">${summary}</text>
    <text x="82" y="562" fill="${palette.orange}" font-family="DejaVu Sans" font-size="18" font-weight="700">LOLOBUY SHEET</text>
    <text x="1036" y="562" fill="${palette.muted}" font-family="DejaVu Sans" font-size="15" text-anchor="end">INDEPENDENT GUIDE</text>
  `;
}

function flowArt() {
  const labels = ["FIND", "CHECK", "PLAN"];
  return `
    <defs>
      <marker id="arrow" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto">
        <path d="M0 0L10 6L0 12Z" fill="${palette.orange}"/>
      </marker>
    </defs>
    ${labels
      .map(
        (label, index) => `
          <g transform="translate(${84 + index * 310} 350)">
            <rect width="250" height="126" rx="18" fill="${index === 1 ? palette.mint : palette.panel}" stroke="${index === 1 ? palette.mint : palette.rule}" stroke-width="2"/>
            <text x="28" y="44" fill="${index === 1 ? palette.mintInk : palette.muted}" font-family="DejaVu Sans" font-size="15" font-weight="700">0${index + 1}</text>
            <text x="28" y="88" fill="${index === 1 ? palette.mintInk : palette.ivory}" font-family="DejaVu Sans" font-size="28" font-weight="700">${label}</text>
          </g>
        `,
      )
      .join("")}
    <path d="M344 413H382M654 413H692" stroke="${palette.orange}" stroke-width="5" marker-end="url(#arrow)"/>
    <rect x="1020" y="338" width="100" height="152" rx="16" fill="${palette.orange}"/>
    <path d="M1046 383H1094M1046 413H1094M1046 443H1076" stroke="${palette.background}" stroke-width="8" stroke-linecap="round"/>
  `;
}

function catalogArt() {
  return `
    <rect x="82" y="328" width="810" height="66" rx="15" fill="${palette.panel}" stroke="${palette.rule}" stroke-width="2"/>
    <circle cx="122" cy="361" r="13" fill="none" stroke="${palette.mint}" stroke-width="4"/>
    <path d="M132 371L146 385" stroke="${palette.mint}" stroke-width="4" stroke-linecap="round"/>
    <text x="170" y="369" fill="${palette.muted}" font-family="DejaVu Sans" font-size="19">Search the catalog with an exact product term</text>
    ${Array.from({ length: 6 }, (_, index) => {
      const x = 82 + (index % 3) * 260;
      const y = 424 + Math.floor(index / 3) * 62;
      return `<rect x="${x}" y="${y}" width="228" height="42" rx="9" fill="${index === 0 ? palette.mint : palette.panelAlt}" stroke="${palette.rule}"/>
        <rect x="${x + 14}" y="${y + 12}" width="18" height="18" rx="4" fill="${index === 0 ? palette.mintInk : palette.orange}"/>
        <path d="M${x + 46} ${y + 17}H${x + 188}M${x + 46} ${y + 27}H${x + 150}" stroke="${index === 0 ? palette.mintInk : palette.muted}" stroke-width="5" stroke-linecap="round"/>`;
    }).join("")}
    <rect x="942" y="328" width="178" height="158" rx="20" fill="${palette.orange}"/>
    <path d="M986 374H1074M986 407H1074M986 440H1042" stroke="${palette.background}" stroke-width="10" stroke-linecap="round"/>
  `;
}

function categoriesArt() {
  const labels = ["SHOES", "LAYERS", "OUTERWEAR", "ACCESSORIES"];
  return labels
    .map((label, index) => {
      const x = 82 + index * 258;
      const accent = index % 2 === 0 ? palette.mint : palette.orange;
      return `<g transform="translate(${x} 344)">
        <rect width="226" height="150" rx="18" fill="${palette.panel}" stroke="${palette.rule}" stroke-width="2"/>
        <circle cx="42" cy="42" r="18" fill="${accent}"/>
        <path d="M32 42H52M42 32V52" stroke="${palette.background}" stroke-width="5" stroke-linecap="round"/>
        <text x="24" y="102" fill="${palette.ivory}" font-family="DejaVu Sans" font-size="20" font-weight="700">${label}</text>
        <path d="M24 124H174" stroke="${palette.muted}" stroke-width="5" stroke-linecap="round"/>
      </g>`;
    })
    .join("");
}

function hoodieSizingArt() {
  return `
    <g transform="translate(92 324)">
      <path d="M118 42L184 10L250 42L320 76L286 146L252 130V202H116V130L82 146L48 76Z"
        fill="${palette.panel}" stroke="${palette.ivory}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M164 18Q184 78 204 18M148 42Q184 78 220 42" fill="none"
        stroke="${palette.mint}" stroke-width="5" stroke-linecap="round"/>
      <path d="M116 116H252" stroke="${palette.orange}" stroke-width="5"/>
      <path d="M116 104V128M252 104V128" stroke="${palette.orange}" stroke-width="5"/>
      <text x="184" y="106" fill="${palette.orange}" font-family="DejaVu Sans" font-size="15"
        font-weight="700" text-anchor="middle">CHEST</text>
      <path d="M270 44V202" stroke="${palette.mint}" stroke-width="5"/>
      <path d="M258 44H282M258 202H282" stroke="${palette.mint}" stroke-width="5"/>
      <text x="294" y="128" fill="${palette.mint}" font-family="DejaVu Sans" font-size="15"
        font-weight="700" transform="rotate(90 294 128)">LENGTH</text>
    </g>
    ${["MEASURE FLAT", "MATCH POINTS", "SAVE THE CHART"]
      .map(
        (label, index) => `<g transform="translate(520 ${342 + index * 64})">
          <rect width="558" height="48" rx="12" fill="${index === 1 ? palette.mint : palette.panel}"
            stroke="${palette.rule}" stroke-width="2"/>
          <circle cx="28" cy="24" r="10" fill="${index === 1 ? palette.mintInk : palette.orange}"/>
          <text x="52" y="31" fill="${index === 1 ? palette.mintInk : palette.ivory}"
            font-family="DejaVu Sans" font-size="17" font-weight="700">${label}</text>
        </g>`,
      )
      .join("")}
  `;
}

function qcArt() {
  return `
    <rect x="82" y="326" width="408" height="188" rx="18" fill="${palette.panel}" stroke="${palette.rule}" stroke-width="2"/>
    <rect x="110" y="354" width="214" height="132" rx="12" fill="${palette.panelAlt}"/>
    <circle cx="218" cy="405" r="42" fill="none" stroke="${palette.mint}" stroke-width="7"/>
    <path d="M190 452L218 425L246 452" fill="none" stroke="${palette.orange}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="324" cy="366" r="12" fill="${palette.orange}"/>
    <path d="M346 367H448" stroke="${palette.orange}" stroke-width="4"/>
    <circle cx="324" cy="476" r="12" fill="${palette.mint}"/>
    <path d="M346 476H448" stroke="${palette.mint}" stroke-width="4"/>
    ${["ITEM", "VARIANT", "CONDITION", "MEASURE"]
      .map(
        (label, index) => `<g transform="translate(${540 + (index % 2) * 286} ${340 + Math.floor(index / 2) * 92})">
          <rect width="250" height="68" rx="14" fill="${index === 0 ? palette.mint : palette.panel}" stroke="${palette.rule}" stroke-width="2"/>
          <circle cx="34" cy="34" r="12" fill="${index === 0 ? palette.mintInk : palette.orange}"/>
          <path d="M28 34L32 38L40 29" fill="none" stroke="${index === 0 ? palette.mint : palette.background}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="58" y="42" fill="${index === 0 ? palette.mintInk : palette.ivory}" font-family="DejaVu Sans" font-size="18" font-weight="700">${label}</text>
        </g>`,
      )
      .join("")}
  `;
}

function shippingArt() {
  return `
    <g transform="translate(82 332)">
      <rect width="430" height="178" rx="18" fill="${palette.panel}" stroke="${palette.rule}" stroke-width="2"/>
      <text x="28" y="40" fill="${palette.muted}" font-family="DejaVu Sans" font-size="15" font-weight="700">ACTUAL WEIGHT</text>
      <path d="M46 128Q215 38 384 128" fill="none" stroke="${palette.mint}" stroke-width="10"/>
      <circle cx="215" cy="107" r="22" fill="${palette.mint}"/>
      <path d="M215 107L304 72" stroke="${palette.mintInk}" stroke-width="7" stroke-linecap="round"/>
    </g>
    <text x="563" y="425" fill="${palette.orange}" font-family="DejaVu Sans" font-size="50" font-weight="700">VS</text>
    <g transform="translate(664 332)">
      <rect width="456" height="178" rx="18" fill="${palette.panel}" stroke="${palette.rule}" stroke-width="2"/>
      <text x="28" y="40" fill="${palette.muted}" font-family="DejaVu Sans" font-size="15" font-weight="700">VOLUMETRIC WEIGHT</text>
      <path d="M94 80L192 52L294 82L198 114Z" fill="${palette.orange}"/>
      <path d="M94 80V134L198 166V114M294 82V135L198 166" fill="none" stroke="${palette.ivory}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M332 62V150M316 78L332 62L348 78M316 134L332 150L348 134" fill="none" stroke="${palette.mint}" stroke-width="4"/>
    </g>
  `;
}

function guidesArt() {
  return ["SPREADSHEET", "QC PHOTOS", "SHIPPING"]
    .map((label, index) => {
      const x = 82 + index * 338;
      return `<g transform="translate(${x} 330)">
        <rect x="16" y="16" width="278" height="174" rx="18" fill="${palette.panelAlt}" opacity=".65"/>
        <rect width="278" height="174" rx="18" fill="${index === 1 ? palette.mint : palette.panel}" stroke="${palette.rule}" stroke-width="2"/>
        <rect x="24" y="24" width="52" height="52" rx="12" fill="${index === 1 ? palette.mintInk : palette.orange}"/>
        <path d="M37 40H63M37 51H63M37 62H56" stroke="${index === 1 ? palette.mint : palette.background}" stroke-width="5" stroke-linecap="round"/>
        <text x="24" y="112" fill="${index === 1 ? palette.mintInk : palette.ivory}" font-family="DejaVu Sans" font-size="20" font-weight="700">${label}</text>
        <path d="M24 137H220M24 153H180" stroke="${index === 1 ? palette.mintInk : palette.muted}" stroke-width="5" stroke-linecap="round"/>
      </g>`;
    })
    .join("");
}

function faqArt() {
  return `
    <g transform="translate(82 332)">
      <rect width="430" height="110" rx="22" fill="${palette.mint}"/>
      <text x="30" y="49" fill="${palette.mintInk}" font-family="DejaVu Sans" font-size="18" font-weight="700">Q</text>
      <path d="M72 40H374M72 66H300" stroke="${palette.mintInk}" stroke-width="8" stroke-linecap="round"/>
      <path d="M70 110L112 110L80 142Z" fill="${palette.mint}"/>
    </g>
    <g transform="translate(608 398)">
      <rect width="512" height="112" rx="22" fill="${palette.panel}" stroke="${palette.rule}" stroke-width="2"/>
      <text x="30" y="50" fill="${palette.orange}" font-family="DejaVu Sans" font-size="18" font-weight="700">A</text>
      <path d="M72 40H450M72 66H388M72 88H310" stroke="${palette.ivory}" stroke-width="7" stroke-linecap="round"/>
      <path d="M430 112L472 112L460 142Z" fill="${palette.panel}"/>
    </g>
  `;
}

function stepsArt() {
  return `
    <path d="M110 432C260 328 385 515 528 404S786 332 930 430S1054 434 1110 376" fill="none" stroke="${palette.rule}" stroke-width="7"/>
    ${Array.from({ length: 7 }, (_, index) => {
      const coordinates = [
        [110, 432],
        [270, 388],
        [430, 454],
        [590, 366],
        [750, 388],
        [910, 422],
        [1074, 392],
      ][index];
      return `<circle cx="${coordinates[0]}" cy="${coordinates[1]}" r="34" fill="${index === 3 ? palette.mint : palette.panel}" stroke="${index === 3 ? palette.mint : palette.orange}" stroke-width="5"/>
        <text x="${coordinates[0]}" y="${coordinates[1] + 9}" text-anchor="middle" fill="${index === 3 ? palette.mintInk : palette.ivory}" font-family="DejaVu Sans" font-size="24" font-weight="700">${index + 1}</text>`;
    }).join("")}
    <text x="110" y="512" fill="${palette.muted}" font-family="DejaVu Sans" font-size="16">SOURCE</text>
    <text x="1074" y="512" text-anchor="end" fill="${palette.muted}" font-family="DejaVu Sans" font-size="16">PARCEL</text>
  `;
}

function editorialArt() {
  return ["SOURCES", "DATES", "CORRECTIONS"]
    .map((label, index) => {
      const x = 82 + index * 340;
      return `<g transform="translate(${x} 334)">
        <rect width="286" height="172" rx="18" fill="${palette.panel}" stroke="${palette.rule}" stroke-width="2"/>
        <circle cx="44" cy="44" r="20" fill="${index === 1 ? palette.orange : palette.mint}"/>
        <path d="M34 44L41 51L55 36" fill="none" stroke="${palette.background}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="78" y="52" fill="${palette.ivory}" font-family="DejaVu Sans" font-size="19" font-weight="700">${label}</text>
        <path d="M24 91H246M24 117H224M24 143H186" stroke="${palette.muted}" stroke-width="6" stroke-linecap="round"/>
      </g>`;
    })
    .join("");
}

const cards = [
  {
    file: "spreadsheet-guide.png",
    eyebrow: "PRODUCT DISCOVERY",
    titleLine1: "Find the item.",
    titleLine2: "Keep the context.",
    summary: "A practical spreadsheet workflow from source to parcel.",
    art: flowArt(),
  },
  {
    file: "product-catalog.png",
    eyebrow: "PRODUCT CATALOG",
    titleLine1: "Search. Match.",
    titleLine2: "Verify the listing.",
    summary: "Use the catalog to discover—not to replace—the live item page.",
    art: catalogArt(),
  },
  {
    file: "categories.png",
    eyebrow: "CATEGORY MAP",
    titleLine1: "Browse with a",
    titleLine2: "clear product intent.",
    summary: "Start broad, then narrow the source and selected option.",
    art: categoriesArt(),
  },
  {
    file: "hoodie-sizing-guide.png",
    eyebrow: "HOODIE SIZE GUIDE",
    titleLine1: "Measure the garment.",
    titleLine2: "Then choose the tag.",
    summary: "Compare the same flat points before ordering and warehouse acceptance.",
    art: hoodieSizingArt(),
  },
  {
    file: "qc-guide.png",
    eyebrow: "WAREHOUSE QC",
    titleLine1: "Check what arrived.",
    titleLine2: "Ask one clear question.",
    summary: "Item, variant, visible condition and decision-relevant measurements.",
    art: qcArt(),
  },
  {
    file: "shipping-guide.png",
    eyebrow: "PARCEL PLANNING",
    titleLine1: "Weight is more",
    titleLine2: "than one number.",
    summary: "Compare scale weight, packed dimensions and current route rules.",
    art: shippingArt(),
  },
  {
    file: "buying-guides.png",
    eyebrow: "EDITORIAL LIBRARY",
    titleLine1: "Guides built around",
    titleLine2: "real buying decisions.",
    summary: "Fact-checked spreadsheet, QC and international-shipping research.",
    art: guidesArt(),
  },
  {
    file: "faq.png",
    eyebrow: "EVIDENCE-LED FAQ",
    titleLine1: "Clear answers.",
    titleLine2: "Live variables stay live.",
    summary: "No invented fees, ratings, photo counts or universal promises.",
    art: faqArt(),
  },
  {
    file: "how-it-works.png",
    eyebrow: "SEVEN-STEP FLOW",
    titleLine1: "From source link",
    titleLine2: "to parcel decision.",
    summary: "Preserve the listing, review QC and compare the packed parcel.",
    art: stepsArt(),
  },
  {
    file: "editorial-standards.png",
    eyebrow: "INDEPENDENT PUBLICATION",
    titleLine1: "Sources, dates",
    titleLine2: "and corrections.",
    summary: "Commercial context disclosed. Official affiliation never implied.",
    art: editorialArt(),
  },
];

mkdirSync(outputDirectory, { recursive: true });

for (const card of cards) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    ${frame(`${heading(card.eyebrow, card.titleLine1, card.titleLine2, card.summary)}${card.art}`)}
  </svg>`;
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(outputDirectory, card.file));
}

console.log(`Generated ${cards.length} social images in ${outputDirectory}`);
