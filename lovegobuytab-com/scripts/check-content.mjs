import fs from "node:fs";
const langs =
  "en de es fr it pl pt ro sv nl da fi el cs hu bg sk hr sl lt lv et ga mt".split(
    " ",
  );
const read = (group, lang) =>
  JSON.parse(fs.readFileSync(`src/content/${group}/${lang}.json`, "utf8"));
const en = {
  copy: read("copy", "en"),
  faq: read("faq", "en"),
  articles: read("articles", "en"),
};
const errors = [];
for (const lang of langs) {
  try {
    const copy = read("copy", lang),
      faq = read("faq", lang),
      articles = read("articles", lang);
    if (
      JSON.stringify(Object.keys(copy).sort()) !==
      JSON.stringify(Object.keys(en.copy).sort())
    )
      errors.push(`${lang} copy keys`);
    if (Object.values(copy).some((v) => typeof v !== "string" || !v.trim()))
      errors.push(`${lang} blank copy`);
    if (faq.faq.length !== 36 || articles.articles.length !== 10)
      errors.push(`${lang} counts`);
    const sourceIds = new Set(
      [...faq.sources, ...articles.sources].map((s) => s.id),
    );
    for (const [i, f] of faq.faq.entries()) {
      if (f.id !== en.faq.faq[i]?.id || !f.question || !f.answer)
        errors.push(`${lang} FAQ ${i}`);
      if (
        JSON.stringify(f.sourceIds) !== JSON.stringify(en.faq.faq[i]?.sourceIds)
      )
        errors.push(`${lang} FAQ source ${i}`);
    }
    for (const [i, a] of articles.articles.entries()) {
      const e = en.articles.articles[i];
      if (a.slug !== e?.slug) errors.push(`${lang} article slug ${i}`);
      if (
        a.intro.length !== e.intro.length ||
        a.sections.length !== e.sections.length ||
        a.takeaways.length !== e.takeaways.length
      )
        errors.push(`${lang} article shape ${i}`);
      for (const [j, s] of a.sections.entries()) {
        const es = e.sections[j];
        if (
          !s.heading ||
          s.paragraphs.length !== es?.paragraphs.length ||
          (s.bullets || []).length !== (es?.bullets || []).length ||
          s.paragraphs.some((p) => !p.trim())
        )
          errors.push(`${lang} article ${i} section ${j}`);
      }
      for (const id of a.sourceIds)
        if (!sourceIds.has(id)) errors.push(`${lang} unknown source ${id}`);
      if (lang !== "en" && a.intro.join("") === e.intro.join(""))
        errors.push(`${lang} untranslated ${i}`);
    }
    for (const s of [...faq.sources, ...articles.sources])
      if (!/^https:\/\/(?:www\.|m\.)?lovegobuy\.com\//.test(s.url))
        errors.push(`${lang} unofficial source ${s.url}`);
  } catch (e) {
    errors.push(`${lang}: ${e.message}`);
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  "Validated 24 locales, 240 full articles, 864 FAQs; matching keys, structure and official source references.",
);
