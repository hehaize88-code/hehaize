import assert from 'node:assert/strict';
import worker from '../worker/index.js';
import { editorialContent } from '../worker/editorial-content.js';

globalThis.fetch = async () => new Response('<urlset></urlset>');
const host = 'vigorbuygrid.com';
const get = path => worker.fetch(new Request('https://' + host + path));
const schemas = html => [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(match => JSON.parse(match[1]));
for (const [lang, content] of Object.entries(editorialContent)) {
  const path = '/' + lang + '/articles/';
  const index = await get(path);
  assert.equal(index.status, 200);
  const indexHTML = await index.text();
  assert.equal(content.articles.length, 10);
  const map = await (await get('/sitemap-' + lang + '.xml')).text();
  const questions = schemas(await (await get('/' + lang + '/guide/')).text()).find(item => item['@type'] === 'FAQPage');
  assert.equal(questions.mainEntity.length, 22);
  assert.equal(new Set(questions.mainEntity.map(q => q.name)).size, 22);
  const articleHeaders = new Set();
  for (const article of content.articles) {
    const articlePath = path + article.slug + '/';
    const response = await get(articlePath);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(indexHTML.includes('href="' + articlePath + '"'));
    assert.ok(map.includes('https://' + host + articlePath));
    assert.ok(html.includes('rel="canonical" href="https://' + host + articlePath + '"'));
    const metadata = schemas(html).find(item => item['@type'] === 'Article');
    assert.equal(metadata.headline, article.title);
    assert.equal(metadata.inLanguage, lang);
    assert.equal(metadata.mainEntityOfPage, 'https://' + host + articlePath);
    assert.ok(metadata.citation.length > 0);
    const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
    articleHeaders.add(description);
    if (lang === 'en') {
      const words = [article.intro, ...article.sections.flatMap(section => section.slice(1))].join(' ').trim().split(/\s+/).length;
      assert.ok(words >= 1200 && words <= 1800, article.slug + ' ' + words);
    }
    assert.equal((await get(articlePath.slice(0,-1))).status, 308);
  }
  assert.equal(articleHeaders.size, 10);
  assert.equal((await get(path + 'nonexistent/')).status, 404);
}
console.log('PASS editorial article content, FAQ and metadata for ' + Object.keys(editorialContent).length + ' locale(s)');
