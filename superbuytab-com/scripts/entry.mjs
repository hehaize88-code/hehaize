import { createApp } from 'astro/app/entrypoint';
import { targets } from '../site-targets.mjs';
const app=createApp();
export default {
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    const host=new URL(targets.production).hostname;
    if(url.hostname===`www.${host}` || (url.hostname===host && url.protocol!=='https:')){
      url.protocol='https:';url.host=host;
      return Response.redirect(url.href,308);
    }
    if(env?.ASSETS && (url.pathname.startsWith('/brand/') || url.pathname.startsWith('/_astro/'))){
      return env.ASSETS.fetch(request);
    }
    return app.render(request,{locals:{},waitUntil:ctx?.waitUntil?.bind(ctx)});
  }
};

