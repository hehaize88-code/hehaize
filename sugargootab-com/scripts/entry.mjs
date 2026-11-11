import { createApp } from 'astro/app/entrypoint';
import { targets } from '../site-targets.mjs';
import { normalizeTrackingPath } from './tracking-path.mjs';
import {experienceRoute} from './commerce-api.mjs';
const app=createApp();
export default {
  async fetch(request,env,ctx){
    const url = new URL(request.url);
    const production = new URL(targets.production);
    const commerce=await experienceRoute(request);
    if(commerce)return commerce;
    const cleanPath = normalizeTrackingPath(url.pathname);
    if (cleanPath) {
      url.pathname = cleanPath;
      if (url.hostname === production.hostname || url.hostname === `www.${production.hostname}`) {
        url.protocol = production.protocol; url.host = production.host;
      }
      return Response.redirect(url.href, 308);
    }
    // The approved design is now live. Preserve links shared during review.
    if (url.pathname === '/design-preview' || url.pathname.startsWith('/design-preview/')) {
      url.pathname = url.pathname.slice('/design-preview'.length) || '/';
      url.protocol = production.protocol;
      url.host = production.host;
      return Response.redirect(url.href, 308);
    }
    if (url.hostname === `www.${production.hostname}` || (url.hostname === production.hostname && url.protocol !== 'https:')) {
      url.protocol = 'https:';
      url.host = production.host;
      return Response.redirect(url.href, 308);
    }
    if (env?.ASSETS && (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/brand/') || url.pathname.startsWith('/_astro/'))) {
      return env.ASSETS.fetch(request);
    }
    return app.render(request,{locals:{assets:env?.ASSETS},waitUntil:ctx?.waitUntil?.bind(ctx)});
  }
};

