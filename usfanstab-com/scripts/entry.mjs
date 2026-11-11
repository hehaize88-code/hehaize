import {createApp} from 'astro/app/entrypoint';
const app=createApp();
export default {async fetch(request,env,ctx){
 const url=new URL(request.url);
 if(url.hostname==='www.usfanstab.com'||(url.hostname==='usfanstab.com'&&url.protocol!=='https:')){url.protocol='https:';url.hostname='usfanstab.com';return Response.redirect(url.href,308);}
 const res=await app.render(request,{locals:{assets:env?.ASSETS},waitUntil:ctx?.waitUntil?.bind(ctx)});
 const headers=new Headers(res.headers);
 if(url.hostname!=='usfanstab.com'||url.pathname.startsWith('/api/')||res.status>=400)headers.set('X-Robots-Tag','noindex, nofollow');
 return new Response(res.body,{status:res.status,headers});
}};
