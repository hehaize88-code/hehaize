import script from '../../../lib/visual/search-worker.js?raw';
export const GET = () => new Response(script, {headers:{'Content-Type':'application/javascript; charset=utf-8','Cache-Control':'public, max-age=300'}});
