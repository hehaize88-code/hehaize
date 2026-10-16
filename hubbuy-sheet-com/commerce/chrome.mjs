// Populated from the built, translated site shell by build-commerce.mjs.
let chrome = {};
export function configureChrome(value) { chrome = value; }
export function styles() { return chrome.styles || ''; }
export function nav(locale, path, query = '') {
  return (chrome[locale]?.header || '').replace(/<a\b([^>]*data-locale-code="([^"]+)"[^>]*)>/g, (tag, attributes, code) => {
    const prefix = code === 'en' ? '' : '/' + code;
    const href = (prefix + path + query).replaceAll('&', '&amp;').replaceAll('"', '&quot;');
    return '<a' + attributes.replace(/href="[^"]*"/, `href="${href}"`) + '>';
  });
}
export function footer(locale) { return chrome[locale]?.footer || ''; }
