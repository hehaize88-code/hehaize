import type { Guide } from "./article-data";
import { novemberEn } from "./november-en";
import { novemberDe } from "./november-de";
import { novemberPl } from "./november-pl";
import { novemberPt } from "./november-pt";
import { novemberPatches } from "./november-patches";

export type ReleaseLocale = "en" | "en-gb" | "de" | "pl" | "pt-br";
const fullCopy = { en: novemberEn, "en-gb": novemberEn, de: novemberDe, pl: novemberPl, "pt-br": novemberPt };
const fullSlugs = {
 image: "uufinds-image-search-not-working",
 qc: "uufinds-no-qc-photos-found",
 extension: "uufinds-chrome-extension-guide",
} as const;
const patchSlugs = {
 spreadsheet: "uufinds-spreadsheet-shopping-guide-2026",
 checklist: "uufinds-qc-checklist",
} as const;
export const releaseSlugs: string[] = [fullSlugs.image, fullSlugs.qc, patchSlugs.spreadsheet, patchSlugs.checklist, fullSlugs.extension];
export const isNovemberGuide = (slug: string) => releaseSlugs.includes(slug);

export const releaseUi = {
 en: { date: "November 7, 2026", read: "min read", next: "Continue with a related guide", sources: "Sources checked", app: "Official UUFinds App Store listing", chrome: "Official UUFinds Chrome Web Store listing", qc: "Official UUFinds QC finder", note: "Sources checked November 7, 2026. The linked official listings support the stated feature descriptions. The troubleshooting sequence and inspection advice are independent editorial methods, not an official repair guarantee. Features and interfaces can change.", archiveTitle: "UUFinds Guides: Spreadsheet, QC Photos and Search Help", archiveDescription: "Practical UUFinds guides for spreadsheets, QC photos, image upload problems and the Chrome extension. Follow product links and distinguish missing photos from failed searches.", count: "guides", update: "Latest additions: November 7, 2026", h1: "UUFinds guides.", accent: "Find products. Resolve search problems.", deck: "Start with a spreadsheet or QC checklist, then use the image-search and extension guides when something does not work." },
 "en-gb": { date: "7 November 2026", read: "min read", next: "Continue with a related guide", sources: "Sources checked", app: "Official UUFinds App Store listing", chrome: "Official UUFinds Chrome Web Store listing", qc: "Official UUFinds QC finder", note: "Sources checked 7 November 2026. The linked official listings support the stated feature descriptions. The troubleshooting sequence and inspection advice are independent editorial methods, not an official repair guarantee. Features and interfaces can change.", archiveTitle: "UUFinds Guides: Spreadsheet, QC Photos and Search Help", archiveDescription: "Practical UUFinds guides for spreadsheets, QC photos, image upload problems and the Chrome extension. Follow product links and distinguish missing photos from failed searches.", count: "guides", update: "Latest additions: 7 November 2026", h1: "UUFinds guides.", accent: "Find products. Resolve search problems.", deck: "Start with a spreadsheet or QC checklist, then use the image-search and extension guides when something does not work." },
 de: { date: "7. November 2026", read: "Min. Lesezeit", next: "Mit einem passenden Ratgeber weiterlesen", sources: "Geprüfte Quellen", app: "Offizieller UUFinds-Eintrag im App Store", chrome: "Offizieller UUFinds-Eintrag im Chrome Web Store", qc: "Offizieller UUFinds QC-Finder", note: "Quellen geprüft am 7. November 2026. Die offiziellen Einträge belegen die genannten Funktionen. Fehlersuche und Prüftipps sind unabhängige redaktionelle Methoden, keine offizielle Reparaturgarantie. Funktionen und Oberflächen können sich ändern.", archiveTitle: "UUFinds-Ratgeber: Spreadsheet, QC-Fotos und Suchhilfe", archiveDescription: "Praktische UUFinds-Ratgeber zu Spreadsheets, QC-Fotos, Bild-Uploads und Chrome-Erweiterung. Prüfe Produktlinks und unterscheide fehlende Bilder von Suchfehlern.", count: "Ratgeber", update: "Neue Beiträge: 7. November 2026", h1: "UUFinds-Ratgeber.", accent: "Produkte finden. Suchprobleme lösen.", deck: "Beginne mit Spreadsheet und QC-Checkliste. Bei Problemen helfen die Anleitungen zur Bildsuche und Chrome-Erweiterung." },
 pl: { date: "7 listopada 2026", read: "min czytania", next: "Przejdź do powiązanego poradnika", sources: "Sprawdzone źródła", app: "Oficjalny wpis UUFinds w App Store", chrome: "Oficjalny wpis UUFinds w Chrome Web Store", qc: "Oficjalna wyszukiwarka QC UUFinds", note: "Źródła sprawdzono 7 listopada 2026. Oficjalne wpisy potwierdzają opisane funkcje. Sekwencja diagnozy i wskazówki kontroli są niezależnymi metodami redakcyjnymi, nie oficjalną gwarancją naprawy. Funkcje i interfejsy mogą się zmieniać.", archiveTitle: "Poradniki UUFinds: spreadsheet, zdjęcia QC i pomoc w szukaniu", archiveDescription: "Praktyczne poradniki UUFinds o spreadsheetach, zdjęciach QC, przesyłaniu obrazów i rozszerzeniu Chrome. Sprawdzaj linki i odróżniaj brak zdjęć od błędów wyszukiwania.", count: "poradników", update: "Nowe artykuły: 7 listopada 2026", h1: "Poradniki UUFinds.", accent: "Znajdź produkty. Rozwiąż problemy wyszukiwania.", deck: "Zacznij od spreadsheetu i listy kontroli QC. Przy problemach skorzystaj z poradników wyszukiwania obrazem i rozszerzenia Chrome." },
 "pt-br": { date: "7 de novembro de 2026", read: "min de leitura", next: "Continue com um guia relacionado", sources: "Fontes consultadas", app: "Registro oficial do UUFinds na App Store", chrome: "Registro oficial do UUFinds na Chrome Web Store", qc: "Busca QC oficial do UUFinds", note: "Fontes consultadas em 7 de novembro de 2026. Os registros oficiais sustentam as descrições das funções. A sequência de diagnóstico e as dicas de inspeção são métodos editoriais independentes, não uma garantia oficial de solução. Funções e interfaces podem mudar.", archiveTitle: "Guias UUFinds: planilha, fotos QC e ajuda na busca", archiveDescription: "Guias práticos UUFinds sobre planilhas, fotos QC, envio de imagens e extensão Chrome. Confira links e diferencie fotos ausentes de falhas de busca.", count: "guias", update: "Novos artigos: 7 de novembro de 2026", h1: "Guias UUFinds.", accent: "Encontre produtos. Resolva problemas de busca.", deck: "Comece pela planilha e pelo checklist QC. Quando algo falhar, use os guias de busca por imagem e da extensão Chrome." },
} as const;

function parseBody(body: string): Pick<Guide, "intro" | "sections"> {
 const [intro, ...sections] = body.trim().split(/\n\n## /);
 return {
  intro: intro.split(/\n\n/),
  sections: sections.map(section => {
   const [heading, ...paragraphs] = section.split(/\n/);
   return { heading: heading.replace(/^\d+\.\s*/, ""), paragraphs: paragraphs.join("\n").split(/\n\n/).filter(Boolean) };
  }),
 };
}

function metadata(slug: string, locale: ReleaseLocale) {
 const fullKey = (Object.keys(fullSlugs) as Array<keyof typeof fullSlugs>).find(key => fullSlugs[key] === slug);
 const patchKey = (Object.keys(patchSlugs) as Array<keyof typeof patchSlugs>).find(key => patchSlugs[key] === slug);
 if (fullKey) return fullCopy[locale][fullKey];
 if (patchKey) return novemberPatches[locale === "en-gb" ? "en" : locale][patchKey];
 return undefined;
}

export function applyNovemberGuide(guide: Guide, locale: ReleaseLocale = "en"): Guide {
 if (!isNovemberGuide(guide.slug)) return guide;
 const copy = metadata(guide.slug, locale)!;
 const ui = releaseUi[locale];
 let content: Pick<Guide, "intro" | "sections">;
 if ("body" in copy) {
  // UK English shares the complete English article, with local date and spelling.
  const body = locale === "en-gb" ? copy.body.replaceAll("color", "colour").replaceAll("recognizes", "recognises").replaceAll("recognize", "recognise") : copy.body;
  content = parseBody(body);
 } else {
  content = {
   intro: [copy.intro, ...guide.intro.slice(1)],
   sections: [{ heading: copy.heading, paragraphs: [...copy.paragraphs], table: { caption: copy.caption, headers: [...copy.headers], rows: copy.rows.map(row => [...row]) } }, ...guide.sections.map(section => ({ ...section, heading: section.heading.replace(/^\d+\.\s*/, "") }))],
  };
 }
 const words = [...content.intro, ...content.sections.flatMap(s => [...s.paragraphs, ...(s.points ?? []), ...(s.table?.rows.flat() ?? [])])].join(" ").split(/\s+/).length;
 const prefix = locale === "en" ? "" : `/${locale}`;
 const sources = guide.slug === fullSlugs.extension
  ? [{ label: ui.chrome, href: "https://chromewebstore.google.com/detail/uufinds-cnfansmulebuyacbu/fjifkdnhlhndjblobgfjdallikchiape" }]
  : [{ label: ui.app, href: "https://apps.apple.com/us/app/uufinds/id6742487584" }, { label: ui.qc, href: "https://www.uufinds.com/qcfinds" }];
 return {
  ...guide, ...content,
  title: copy.title, seoTitle: copy.seoTitle, description: copy.description, label: copy.label,
  englishOnly: false, updated: ui.date, modifiedISO: "2026-11-07", readTime: `${Math.ceil(words / 200)} ${ui.read}`,
  evidence: undefined, hideSourceNote: false, sourceNote: ui.note, sources,
  relatedLinks: releaseSlugs.filter(slug => slug !== guide.slug).map(slug => {
   const related = metadata(slug, locale)!;
   return { href: `${prefix}/guides/${slug}/`, label: related.title, description: related.description };
  }),
 };
}

export const newNovemberGuides: Guide[] = (["image", "qc"] as const).map(key => applyNovemberGuide({
 slug: fullSlugs[key], label: "", title: "", description: "", updated: "", readTime: "", intro: [], sections: [],
 publishedISO: "2026-11-07", modifiedISO: "2026-11-07",
 primaryKeyword: key === "image" ? "UUFinds image search not working" : "UUFinds no QC photos found",
 longTailKeywords: key === "image" ? ["why can i not put images into uufinds", "UUFinds image upload failed", "UUFinds image search no results"] : ["UUFinds QC photos missing", "UUFinds QC images not loading", "UUFinds no QC results"],
}));
