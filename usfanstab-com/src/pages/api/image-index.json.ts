import index from '../../content/image-index.json';
export function GET(){return Response.json(index,{headers:{'Cache-Control':'public,max-age=300'}});}
