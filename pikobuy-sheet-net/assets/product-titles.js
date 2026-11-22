(() => {
  const dictionaries = new Map();
  window.pikoProductTitles = async language => {
    const lang = String(language || document.documentElement.lang).toLowerCase().split('-')[0];
    if (!/^(en|de|fr|es|it|nl|pt|pl|ro|sv|zh|da|fi|el|cs|hu|bg|sk|hr|ja|ko|vi|th|id)$/.test(lang))
      return title => title;
    if (!dictionaries.has(lang)) {
      const pending = fetch('/assets/catalog-titles/' + lang + '.json').then(async response => {
        if (!response.ok) throw new Error('Product titles unavailable');
        const dictionary = await response.json();
        return title => {
          const key = String(title).normalize('NFKC').trim().replace(/\s+/gu, ' ').toLowerCase();
          return Object.hasOwn(dictionary, key) ? dictionary[key] : title;
        };
      }).catch(() => {
        dictionaries.delete(lang);
        return title => title;
      });
      dictionaries.set(lang, pending);
    }
    return dictionaries.get(lang);
  };
})();
