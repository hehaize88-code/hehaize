// Repair the observed malformed shared category links. Unknown paths stay 404.
const locales = 'en|de|es|fr|it|pl|pt|ro|sv|nl|da|fi|el|cs|hu|bg|sk|hr|sl|lt|lv|et|ga|mt';
const categories = 'shoes|hoodies-sweaters|t-shirts|jackets|pants-shorts|headwear|accessories|short-sets|electronics|other-stuff|jersey';
const malformed = new RegExp(`^(/(?:(?:${locales})/)?category/(?:${categories})/)&(?:source|ss|ct)=[^/]*$`);
export function normalizeTrackingPath(pathname) {
  return malformed.exec(pathname)?.[1] || null;
}
