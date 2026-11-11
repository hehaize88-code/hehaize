// Populated from the built, translated site shell by build-commerce.mjs.
let chrome = {};
export function configureChrome(value) { chrome = value; }
export function styles() { return chrome.styles || ''; }
export function nav(locale, path, query = '') {
  let header = chrome[locale]?.header || chrome.en?.header || '';
  if (!chrome[locale] && locale !== 'en') header = header.replace(/href="\/(?!\/|assets\/|brand\/|_next\/)([^"#]*)"/g, (_, path) => `href="/${locale}/${path}"`).replace(/(<summary[^>]*>[\s\S]*?<strong>)EN(<\/strong>)/, '$1' + locale.toUpperCase() + '$2');
  return header.replace(/<a\b([^>]*data-locale-code="([^"]+)"[^>]*)>/g, (tag, attributes, code) => {
    const prefix = code === 'en' ? '' : '/' + code;
    const href = (prefix + path + query).replaceAll('&', '&amp;').replaceAll('"', '&quot;');
    return '<a' + attributes.replace(/href="[^"]*"/, `href="${href}"`) + '>';
  });
}
export function footer(locale) { return chrome[locale]?.footer || (chrome.en?.footer || '').replace(/href="\/(?!\/|assets\/|brand\/)([^"#]*)"/g, (_, path) => `href="/${locale}/${path}"`); }
