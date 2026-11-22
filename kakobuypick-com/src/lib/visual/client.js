export function bindImageSearch(config,features) {
  const get=id=>document.getElementById(id), input=get('visual-file'), status=get('visual-status'),
    preview=get('visual-query'), results=get('visual-results'), zone=get('visual-drop'), retry=get('visual-retry');
  let engine, generation=0, previewURL, lastFile;
  function failed(message) {
    status.textContent=message;
    retry.hidden=false;
  }
  async function display({generation:id,matches,error}) {
    if(id!==generation)return;
    if(error){failed(config.error);return;}
    try {
      const q=new URLSearchParams({lang:config.lang});
      for(const match of matches)q.append('p',match.path);
      let names={};
      if(matches.length){
        const response=await fetch('/api/image-index/titles?'+q);
        if(!response.ok)throw Error('Titles unavailable');
        names=await response.json();
      }
      if(id!==generation)return;
      for(const match of matches){
        const card=document.createElement('a'),photo=document.createElement('img'),name=document.createElement('strong');
        card.href=config.base+match.path+'?match='+encodeURIComponent(match.url);
        photo.src=match.url;photo.loading='lazy';photo.alt=names[match.path] || '';
        name.textContent=photo.alt;card.append(photo,name);results.append(card);
      }
      status.textContent=matches.length?config.matches+' · '+matches.length:config.empty;
    }catch{if(id===generation)failed(config.error);}
  }
  async function run(file) {
    if(!file)return;
    const id=++generation;
    lastFile=file;
    retry.hidden=true;results.replaceChildren();preview.hidden=true;
    if(previewURL)URL.revokeObjectURL(previewURL);
    if(!file.type.startsWith('image/') || file.size>25*1024*1024){status.textContent=config.failed;return;}
    status.textContent=config.searching;
    try {
      previewURL=URL.createObjectURL(file);
      const img=new Image();img.src=previewURL;await img.decode();
      if(id!==generation)return;
      preview.src=previewURL;preview.hidden=false;
      const query=features(img);
      worker().postMessage({generation:id,config,query});
    }catch{if(id===generation)failed(config.failed);}
  }
  function worker(){
    if(!engine){
      engine=new Worker('/api/image-index/worker.js');
      engine.onmessage=({data})=>display(data);
      engine.onerror=()=>{engine.terminate();engine=null;if(lastFile)failed(config.error);};
    }
    return engine;
  }
  function warm(){
    if(engine)return;
    try{worker().postMessage({config});}catch{/* An upload can retry. */}
  }
  zone.addEventListener('pointerdown',warm,{once:true});
  zone.addEventListener('dragenter',warm,{once:true});
  input.addEventListener('focus',warm,{once:true});
  input.addEventListener('change',()=>run(input.files[0]));
  retry.addEventListener('click',()=>run(lastFile));
  zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('dragging');});
  zone.addEventListener('dragleave',()=>zone.classList.remove('dragging'));
  zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('dragging');run(e.dataTransfer.files[0]);});
  document.addEventListener('paste',e=>{
    const item=Array.from(e.clipboardData?.items || []).find(entry=>entry.type.startsWith('image/'));
    if(item)run(item.getAsFile());
  });
}
