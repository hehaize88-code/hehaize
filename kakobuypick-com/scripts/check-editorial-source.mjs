import fs from 'node:fs';
import assert from 'node:assert/strict';

const root = new URL('../src/content/editorial/', import.meta.url);
const locales = process.argv.slice(2).length ? process.argv.slice(2) : 'en de es fr it pl pt ro sv nl da fi el cs hu bg sk hr sl lt lv et ga mt'.split(' ');
const base = JSON.parse(fs.readFileSync(new URL('en.json', root), 'utf8'));
function numericTokens(text) {
  return (text.replace(/(?<=\d)[ ,.\u00a0]000\b/g, '000').replace(/,/g, '.').match(/\d+(?:\.\d+)?/g) || []).sort();
}
function compare(value, source, path, locale) {
  assert.equal(typeof value, typeof source, `${locale}: type at ${path}`);
  if (Array.isArray(source)) {
    assert.ok(Array.isArray(value), `${locale}: array at ${path}`);
    assert.equal(value.length, source.length, `${locale}: incomplete ${path}`);
    source.forEach((item, i) => compare(value[i], item, `${path}.${i}`, locale));
  } else if (source && typeof source === 'object') {
    assert.deepEqual(Object.keys(value).sort(), Object.keys(source).sort(), `${locale}: keys at ${path}`);
    for (const key of Object.keys(source)) compare(value[key], source[key], `${path}.${key}`, locale);
  } else if (typeof source === 'string') {
    assert.ok(value.trim(), `${locale}: empty ${path}`);
    assert.deepEqual(numericTokens(value), numericTokens(source), `${locale}: changed numeric facts at ${path}`);
    if (/\.(slug|id|category|publishedOn|updatedOn)$/.test(path) || /\.sources\.\d+$/.test(path)) {
      assert.equal(value, source, `${locale}: changed identifier at ${path}`);
    } else if (locale !== 'en') {
      for (const sentence of source.split(/(?<=[.!?])\s+/)) {
        if (sentence.split(/\s+/).length >= 7)
          assert.ok(!value.includes(sentence), `${locale}: untranslated sentence at ${path}`);
      }
    }
  } else {
    assert.equal(value, source, `${locale}: changed value at ${path}`);
  }
}
for (const locale of locales) {
  const data = JSON.parse(fs.readFileSync(new URL(`${locale}.json`, root), 'utf8'));
  compare(data, base, '', locale);
  assert.equal(data.articles.length, 13);
  assert.equal(new Set(data.articles.map(a=>a.slug)).size,13,`${locale}: duplicate article slug`);
  for(const article of data.articles) {
    assert.ok(article.updatedOn>=article.publishedOn,`${locale}: invalid article dates`);
    assert.equal(article.seoTitle,article.title,`${locale}: localized search title`);
  }
  assert.equal(data.faq.length, 26);
  assert.equal(data.guide.sections.length, 6);
  if (locale !== 'en') assert.notEqual(data.ui.sources, base.ui.sources, `${locale}: source heading`);
  for (const [id, numbers] of Object.entries({ 'storage-normal': ['100', '90', '2026'], 'storage-unmatched': ['60'], 'damaged-delivery': ['72'] })) {
    const text = data.faq.find(f => f.id === id).a;
    for (const n of numbers) assert.ok(text.includes(n), `${locale}: ${id} lost ${n}`);
  }
  console.log(`PASS ${locale}: complete editorial structure and language checks`);
}
