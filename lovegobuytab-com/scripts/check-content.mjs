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
    if (
      faq.faq.length !== 36 ||
      articles.articles.length !== 13 ||
      new Set(articles.articles.map((a) => a.slug)).size !== 13
    )
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
      if (!a.title?.trim() || !a.description?.trim())
        errors.push(`${lang} missing article metadata ${i}`);
      if (
        a.datePublished !== e.datePublished ||
        a.dateModified !== e.dateModified
      )
        errors.push(`${lang} article dates ${i}`);
      if (JSON.stringify(a.sourceIds) !== JSON.stringify(e.sourceIds))
        errors.push(`${lang} article source parity ${i}`);
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
        if (
          lang !== "en" &&
          s.paragraphs.some((p) => es?.paragraphs.includes(p))
        )
          errors.push(`${lang} untranslated paragraph ${i}/${j}`);
        if (Boolean(s.table) !== Boolean(es?.table))
          errors.push(`${lang} missing table ${i}/${j}`);
        if (s.table && es.table) {
          if (
            s.table.columns.length !== es.table.columns.length ||
            s.table.rows.length !== es.table.rows.length
          )
            errors.push(`${lang} table shape ${i}/${j}`);
          for (const row of s.table.rows)
            if (
              row.length !== s.table.columns.length ||
              row.some((cell) => typeof cell !== "string" || !cell.trim())
            )
              errors.push(`${lang} table cells ${i}/${j}`);
        }
      }
      if (JSON.stringify(a.relatedSlugs) !== JSON.stringify(e.relatedSlugs))
        errors.push(`${lang} related links ${i}`);
      for (const slug of a.relatedSlugs || [])
        if (
          !articles.articles.some((other) => other.slug === slug) ||
          slug === a.slug
        )
          errors.push(`${lang} broken related link ${slug}`);
      if (lang !== "en" && a.title === e.title)
        errors.push(`${lang} untranslated title ${i}`);
      if (lang !== "en" && a.description === e.description)
        errors.push(`${lang} untranslated description ${i}`);
      if (lang === "en" && a.datePublished === "2026-10-23") {
        const text = [
          ...a.intro,
          ...a.takeaways,
          ...a.sections.flatMap((s) => [
            s.heading,
            ...s.paragraphs,
            ...(s.bullets || []),
            ...(s.table ? [...s.table.columns, ...s.table.rows.flat()] : []),
          ]),
        ].join(" ");
        const count = text.trim().split(/\s+/).length;
        if (count < 1200 || count > 1800)
          errors.push(
            `New English article ${a.slug}: ${count} words; expected 1200–1800`,
          );
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
  "Validated 24 locales, 312 full articles, 864 FAQs; matching text structure, tables, related links and official source references.",
);
