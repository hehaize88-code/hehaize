import {detail} from '../../lib/catalog';
import {styles} from '../../lib/styles';
import snapshot from '../../content/style-options.json';
export async function GET({url}){
  const path=url.searchParams.get('path')||'';
  try{const p=await detail(path);try{const photos=await styles(p.sourceId);return Response.json({photos,sourceId:p.sourceId,cached:false},{headers:{'Cache-Control':'public,max-age=300'}});}catch{
    const saved=snapshot.items[path];if(saved&&saved.sourceId===p.sourceId)return Response.json({...saved,cached:true,checkedAt:snapshot.checkedAt},{headers:{'Cache-Control':'public,max-age=120'}});
    return Response.json({error:'Style source unavailable'},{status:503});
  }}catch{return Response.json({error:'Product source unavailable'},{status:503});}
}
