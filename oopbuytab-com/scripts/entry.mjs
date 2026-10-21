import { createApp } from 'astro/app/entrypoint';
const app=createApp();
export default {async fetch(request,env,ctx){return app.render(request,{locals:{},waitUntil:ctx?.waitUntil?.bind(ctx)})}};
