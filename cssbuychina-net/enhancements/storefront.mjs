import {withLocalization} from './localization.mjs';
import {brandAsset,brandPage} from './branding.mjs';
export function enhanceStorefront(base) {
  const localized = withLocalization(base);
  return {async fetch(request, env, ctx) {
    const branded = brandAsset(request);
    if (branded) return branded;
    const response = await localized.fetch(request, env, ctx);
    return brandPage(response, request);
  }};
}
