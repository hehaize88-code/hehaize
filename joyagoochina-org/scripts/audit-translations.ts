import { translations, type Locale } from "../app/i18n";
import { localizedContent } from "../app/localizedContent";
import { getSeoArticleEntries } from "../app/seoArticleLibrary";
import { completeLocalizedSections } from "../app/contentParity";

const locales = Object.keys(localizedContent) as Locale[];

for (const locale of locales) {
  console.log(`LOCALE ${locale} FAQ ${translations[locale].faq.length}`);

  for (const [slug, guide] of Object.entries(localizedContent[locale].guides)) {
    const completedSections = completeLocalizedSections(
      locale,
      guide.sections,
      localizedContent.en.guides[slug].sections,
      slug,
    );
    console.log(
      "GUIDE",
      slug,
      "sections",
      completedSections.length,
      "paras",
      completedSections
        .map((section) => section.paragraphs.length)
        .join(","),
      "words",
      completedSections
        .flatMap((section) => section.paragraphs)
        .join(" ")
        .split(/\s+/).length,
    );
  }

  for (const entry of getSeoArticleEntries(locale)) {
    console.log(
      "ARTICLE",
      entry.slug,
      "sections",
      entry.article.sections.length,
      "paras",
      entry.article.sections
        .map((section) => section.paragraphs.length)
        .join(","),
      "words",
      entry.article.sections
        .flatMap((section) => section.paragraphs)
        .join(" ")
        .split(/\s+/).length,
      "chars",
      entry.article.sections
        .flatMap((section) => section.paragraphs)
        .join("")
        .length,
    );
  }
}
