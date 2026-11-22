const productTitleMaps = new Map();
const originalProductTitle = title => title;

export async function loadProductTitles(env, request, language) {
  const lang = language === 'zh-cn' || language === 'zh-CN' ? 'zh' : language;
  if (!/^(en|de|fr|es|it|nl|pt|pl|ro|sv|zh|da|fi|el|cs|hu|bg|sk|hr|ja|ko|vi|th|id)$/.test(lang) || !env?.ASSETS)
    return originalProductTitle;

  if (!productTitleMaps.has(lang)) {
    if (productTitleMaps.size >= 4) productTitleMaps.delete(productTitleMaps.keys().next().value);
    const url = new URL('/assets/catalog-titles/' + lang + '.json', request.url);
    const pending = env.ASSETS.fetch(new Request(url)).then(async response => {
      if (!response.ok) throw new Error('Product titles unavailable');
      const dictionary = await response.json();
      return title => {
        const key = String(title).normalize('NFKC').trim().replace(/\s+/gu, ' ').toLowerCase();
        return Object.hasOwn(dictionary, key) ? dictionary[key] : title;
      };
    }).catch(() => {
      productTitleMaps.delete(lang);
      return originalProductTitle;
    });
    productTitleMaps.set(lang, pending);
  }
  return productTitleMaps.get(lang);
}
