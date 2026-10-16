import imageSearch from './growth/image-search.js';
import clothing from './growth/clothing.js';
import searchLinks from './growth/search-links.js';
import shoes from './growth/shoes.js';

const localeLabels = {
 en: { language: 'English article', date: '16 October 2026', oldDate: '9 September 2026', read: '7 min read', steps: [['Find', 'Source link'], ['Compare', 'Exact option'], ['Check', 'Order evidence']] },
 'pt-br': { language: 'Artigo em português', date: '16 de outubro de 2026', oldDate: '9 de setembro de 2026', read: '7 min de leitura', steps: [['Encontrar', 'Link de origem'], ['Comparar', 'Variante exata'], ['Conferir', 'Dados do pedido']] },
 de: { language: 'Artikel auf Deutsch', date: '16. Oktober 2026', oldDate: '9. September 2026', read: '7 Min. Lesezeit', steps: [['Finden', 'Quellenlink'], ['Vergleichen', 'Genaue Variante'], ['Prüfen', 'Bestellnachweise']] },
};
export const countEnglishWords = text => text.replace(/[^A-Za-z0-9£¥€$.%+-]+/g, ' ').trim().split(/\s+/).filter(Boolean).length;
export const growthArticles = [imageSearch, clothing, searchLinks, shoes].map(source => {
 const variants = Object.fromEntries(Object.entries(source.copy).map(([locale, copy]) => {
  const labels = localeLabels[locale];
  const text = [copy.deck, ...copy.sections.flat(), ...copy.links.map(link => link[0])].join(' ');
  return [locale, {
   title: copy.title, seoTitle: copy.title, excerpt: copy.excerpt, category: copy.category,
   deck: copy.deck, growthContent: copy, socialImageAlt: copy.title,
   languageLabel: labels.language, displayDate: source.published ? labels.oldDate : labels.date,
   factCheckedDisplayDate: labels.date, readTime: labels.read,
   wordCount: locale === 'en' ? countEnglishWords(text) : text.split(/\s+/).filter(Boolean).length,
   cover: { label: copy.category.toLocaleUpperCase(locale), tone: 'workflow', steps: labels.steps },
   toc: copy.sections.map(([heading], index) => [`step-${index + 1}`, heading]),
  }];
 }));
 return {
  slug: source.slug, ...variants.en, variants,
  locales: ['en', 'pt-br', 'de'],
  primaryKeyword: source.keyword, longTailKeywords: source.secondary,
  published: source.published || '2026-10-16', updated: '2026-10-16', factChecked: '2026-10-16',
  socialImage: source.image, citations: ['https://hubbuy-sheet.com/catalog/', 'https://hubbuy-sheet.com/catalog/image-search/', 'https://hubbuy.com/'],
  images: [], hideResearchEvidence: true, noExternalSourceLinks: true,
 };
});
