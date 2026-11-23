import fs from 'node:fs';
import path from 'node:path';

export function readEditorial(workerDir) {
  const english = fs.readFileSync(path.join(workerDir, 'editorial.js'), 'utf8');
  const prefix = 'export const editorialData = ';
  const base = JSON.parse(english.trimEnd().slice(prefix.length, -1)).en;
  const locales = path.join(workerDir, 'editorial-locales');
  const files = fs.existsSync(locales) ? fs.readdirSync(locales).filter(file => file.endsWith('.json')).sort() : [];
  const additions = files.map(file => {
    const lang = path.basename(file, '.json');
    const data = JSON.parse(fs.readFileSync(path.join(locales, file), 'utf8'));
    const complete = data.articles?.length === base.articles.length && data.faq?.length === base.faq.length
      && data.articles.every((article, i) => article.slug === base.articles[i].slug
        && article.sections?.length === base.articles[i].sections.length
        && article.sections.every((section, j) => section.length === base.articles[i].sections[j].length)
        && article.sources?.length === base.articles[i].sources.length
        && article.sources.every((entry, j) => entry[1] === base.articles[i].sources[j][1]));
    if (!complete) throw new Error('Incomplete editorial locale: ' + file);
    return 'editorialData[' + JSON.stringify(lang) + '] = ' + JSON.stringify(data) + ';';
  });
  return [english.replace('export const editorialData', 'const editorialData'), ...additions].join('\n');
}
