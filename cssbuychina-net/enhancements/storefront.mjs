import {withLocalization} from './localization.mjs';
import {brandAsset,brandPage} from './branding.mjs';
import {withVisualDelivery} from './visual-delivery.mjs';
export function enhanceStorefront(base) {
  const localized = withLocalization(base);
  return withVisualDelivery({async fetch(request, env, ctx) {
    const branded = brandAsset(request);
    if (branded) return branded;
    const response = await localized.fetch(request, env, ctx);
    return brandPage(response, request);
  }});
}
