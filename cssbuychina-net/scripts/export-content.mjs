import { build } from 'esbuild';
const result=await build({ stdin:{contents:'import { articles } from "./app/articles/article-data"; import { guides } from "./app/guides/guide-data"; console.log(JSON.stringify({articles,guides}));',resolveDir:process.cwd()},bundle:true,platform:'node',format:'cjs',write:false });
const { runInNewContext }=await import('node:vm');
runInNewContext(result.outputFiles[0].text,{console});
