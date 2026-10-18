import { targets } from '../../site-targets.mjs';

export const SITE_ORIGIN = new URL(import.meta.env.SITE_URL || targets.production).origin;
export const isProductionOrigin = (url: URL) => url.origin === SITE_ORIGIN;
