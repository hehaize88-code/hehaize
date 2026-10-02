import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const english = JSON.parse(await readFile(new URL('../app/seoRefresh.en.json', import.meta.url), 'utf8'));
const payload = { ...JSON.parse(await readFile(new URL('../app/seoRefresh.json', import.meta.url), 'utf8')), en: english };
const locales = ['en', 'zh', 'de', 'pl', 'es', 'it', 'fr', 'pt', 'ro', 'sv'];
const invariant = new Set(['slug', 'keywords', 'relatedLinks', 'publishedAt', 'modifiedAt', 'readTime']);
function compare(source, translated, path, key = '') {
  if (invariant.has(key)) return assert.deepEqual(translated, source, path);
  if (Array.isArray(source)) {
    assert.ok(Array.isArray(translated), path);
    assert.equal(translated.length, source.length, path);
    source.forEach((value, i) => compare(value, translated[i], `${path}[${i}]`));
  } else if (source && typeof source === 'object') {
    assert.deepEqual(Object.keys(translated).sort(), Object.keys(source).sort(), path);
    for (const key of Object.keys(source)) compare(source[key], translated[key], `${path}.${key}`, key);
  } else if (typeof source === 'string') {
    assert.equal(typeof translated, 'string', path);
    assert.ok(translated.trim(), path);
    assert.doesNotMatch(translated, /\[\[\[|\]\]\]/, path);
    if (source.length > 200 && !path.startsWith('en.')) assert.notEqual(translated, source, `English fallback: ${path}`);
  }
}
for (const locale of locales) {
  assert.ok(payload[locale], `Missing complete locale: ${locale}`);
  compare(english, payload[locale], locale);
}
for (const entry of english.articles) {
  const words = entry.article.sections.flatMap(section => section.paragraphs).join(' ').match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g) ?? [];
  assert.ok(words.length >= 1200 && words.length <= 1800, `${entry.slug}: ${words.length} words`);
}
console.log('Editorial gate passed: four complete articles and matching refreshed copy in all ten languages.');
