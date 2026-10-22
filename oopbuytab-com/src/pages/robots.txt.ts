export const GET=()=>new Response(import.meta.env.OOPBUY_PRODUCTION==='true'
  ?'User-agent: *\nAllow: /\nSitemap: https://oopbuytab.com/sitemap.xml\n'
  :'User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});
