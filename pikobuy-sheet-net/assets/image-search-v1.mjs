import { imageFeatures } from './image-features-v1.mjs';

const labels = {
  en: ['Search by image','Searching images…','Similar products','No similar products found.','Image search failed. Choose the image to retry.'],
  de: ['Bildersuche','Bilder werden durchsucht…','Ähnliche Produkte','Keine ähnlichen Produkte gefunden.','Bildersuche fehlgeschlagen. Bild erneut auswählen.'],
  fr: ['Recherche par image','Recherche en cours…','Produits similaires','Aucun produit similaire.','Échec de la recherche. Sélectionnez à nouveau l’image.'],
  es: ['Buscar por imagen','Buscando imágenes…','Productos similares','No se encontraron productos similares.','Error de búsqueda. Vuelve a elegir la imagen.'],
  it: ['Ricerca per immagine','Ricerca in corso…','Prodotti simili','Nessun prodotto simile trovato.','Ricerca non riuscita. Seleziona di nuovo l’immagine.'],
  nl: ['Zoeken op afbeelding','Afbeeldingen zoeken…','Vergelijkbare producten','Geen vergelijkbare producten gevonden.','Zoeken mislukt. Kies de afbeelding opnieuw.'],
  pt: ['Pesquisar por imagem','A pesquisar imagens…','Produtos semelhantes','Nenhum produto semelhante.','A pesquisa falhou. Selecione a imagem novamente.'],
  pl: ['Szukaj obrazem','Wyszukiwanie obrazów…','Podobne produkty','Nie znaleziono podobnych produktów.','Wyszukiwanie nie powiodło się. Wybierz obraz ponownie.'],
  ro: ['Caută după imagine','Se caută imagini…','Produse similare','Nu s-au găsit produse similare.','Căutarea a eșuat. Alege din nou imaginea.'],
  sv: ['Sök med bild','Söker efter bilder…','Liknande produkter','Inga liknande produkter hittades.','Sökningen misslyckades. Välj bilden igen.'],
  zh: ['以图搜商品','正在检索图片…','相似商品','未找到相似商品。','搜图失败，请重新选择图片。'],
  da: ['Søg med billede','Søger efter billeder…','Lignende produkter','Ingen lignende produkter fundet.','Søgningen mislykkedes. Vælg billedet igen.'],
  fi: ['Hae kuvalla','Haetaan kuvia…','Samankaltaiset tuotteet','Samankaltaisia tuotteita ei löytynyt.','Haku epäonnistui. Valitse kuva uudelleen.'],
  el: ['Αναζήτηση με εικόνα','Αναζήτηση εικόνων…','Παρόμοια προϊόντα','Δεν βρέθηκαν παρόμοια προϊόντα.','Η αναζήτηση απέτυχε. Επιλέξτε ξανά την εικόνα.'],
  cs: ['Hledat podle obrázku','Vyhledávání obrázků…','Podobné produkty','Nebyly nalezeny podobné produkty.','Vyhledávání selhalo. Vyberte obrázek znovu.'],
  hu: ['Keresés képpel','Képek keresése…','Hasonló termékek','Nincs hasonló termék.','Sikertelen keresés. Válaszd ki újra a képet.'],
  bg: ['Търсене по изображение','Търсене на изображения…','Подобни продукти','Няма подобни продукти.','Неуспешно търсене. Изберете отново изображението.'],
  sk: ['Hľadať podľa obrázka','Vyhľadávanie obrázkov…','Podobné produkty','Nenašli sa podobné produkty.','Vyhľadávanie zlyhalo. Vyberte obrázok znova.'],
  hr: ['Pretraži slikom','Pretraživanje slika…','Slični proizvodi','Nema sličnih proizvoda.','Pretraživanje nije uspjelo. Ponovno odaberite sliku.'],
  ja: ['画像で検索','画像を検索中…','類似商品','類似商品が見つかりませんでした。','検索に失敗しました。画像をもう一度選択してください。'],
  ko: ['이미지로 검색','이미지 검색 중…','유사 상품','유사 상품을 찾을 수 없습니다.','검색에 실패했습니다. 이미지를 다시 선택하세요.'],
  vi: ['Tìm bằng hình ảnh','Đang tìm hình ảnh…','Sản phẩm tương tự','Không tìm thấy sản phẩm tương tự.','Tìm kiếm thất bại. Vui lòng chọn lại ảnh.'],
  th: ['ค้นหาด้วยรูปภาพ','กำลังค้นหารูปภาพ…','สินค้าที่คล้ายกัน','ไม่พบสินค้าที่คล้ายกัน','ค้นหาไม่สำเร็จ โปรดเลือกรูปภาพอีกครั้ง'],
  id: ['Cari dengan gambar','Mencari gambar…','Produk serupa','Tidak ditemukan produk serupa.','Pencarian gagal. Silakan pilih gambar lagi.']
};
const language = document.documentElement.lang.toLowerCase().split('-')[0] || 'en';
const words = labels[language] || labels.en;
const base = (language === 'en' ? '' : '/' + language) + '/catalog';
const camera = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 7h4l1.6-2.5h6.8L17 7h4v12H3z"/><circle cx="12" cy="12.5" r="3.5"/></svg>';
const form = document.querySelector('#search-main')?.form;
let input = document.getElementById('image-file');
let panel = input?.closest('section');

if (!input && form) {
  const label = document.createElement('label');
  label.className = 'piko-camera';
  label.title = words[0];
  label.innerHTML = camera;
  input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/jpeg,image/png,image/webp';
  input.setAttribute('aria-label', words[0]);
  label.append(input);
  form.classList.add('piko-camera-form');
  form.insertBefore(label, form.querySelector('[type=submit]'));
  panel = document.createElement('section');
  panel.className = 'image-search-panel piko-visual-home';
  panel.hidden = true;
  panel.innerHTML = '<img id="image-preview" alt="" hidden><p id="image-status" role="status" aria-live="polite"></p><div class="catalog-grid" id="image-results"></div>';
  form.after(panel);
}

if (input && panel) {
  const preview = document.getElementById('image-preview');
  const status = document.getElementById('image-status');
  const results = document.getElementById('image-results');
  let worker, metadata, titles, generation = 0, previewURL;
  const manifest = () => metadata ||= fetch('/catalog-image-index.json', {cache:'no-cache'}).then(readJSON).catch(error => {metadata=null; throw error});
  async function readJSON(response) {
    if (!response.ok) throw Error('Image data unavailable');
    return response.json();
  }
  function warm() {
    if (worker) return;
    worker = new Worker('/assets/image-worker-v1.js');
    worker.onerror = () => {worker?.terminate(); worker=null; status.textContent=words[4]};
    worker.onmessage = ({data}) => display(data).catch(() => {if(data.generation === generation) status.textContent=words[4]});
    manifest().then(config => worker?.postMessage({config})).catch(()=>{});
  }
  async function display({generation:id, matches, error}) {
    if (id !== generation) return;
    if (error) {status.textContent=words[4]; return}
    const config = await manifest();
    titles ||= fetch('/assets/visual-index/'+config.revision+'/titles.json').then(readJSON).catch(e=>{titles=null;throw e});
    const [names, translate] = await Promise.all([titles, window.pikoProductTitles?.(language)]);
    if (id !== generation) return;
    const cards = document.createDocumentFragment();
    for (const {path,url} of matches) {
      if (!/^\/[a-z0-9-]+\/\d+\.html$/.test(path)) continue;
      const article=document.createElement('article'), link=document.createElement('a'), photo=document.createElement('img'), name=document.createElement('h2');
      const sourceTitle=names[path] || '';
      name.textContent=translate?.(sourceTitle) || sourceTitle;
      article.className='catalog-card';
      photo.width=400; photo.height=400; photo.loading='lazy'; photo.alt=name.textContent; photo.src=url;
      link.href=base+path+'?match='+encodeURIComponent(url);
      link.append(photo,name);article.append(link);cards.append(article);
    }
    results.replaceChildren(cards);
    status.textContent=matches.length?words[2]+' · '+matches.length:words[3];
  }
  async function search(file) {
    if (!file) return;
    const id=++generation;
    results.replaceChildren();preview.hidden=true;panel.hidden=false;
    if (previewURL) URL.revokeObjectURL(previewURL);
    if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size>20*1024*1024) {
      status.textContent='JPEG · PNG · WebP · ≤ 20 MB';return;
    }
    status.textContent=words[1];
    try {
      warm();
      previewURL=URL.createObjectURL(file);
      const img=new Image();img.src=previewURL;
      const [config]=await Promise.all([manifest(),img.decode()]);
      if (id !== generation) return;
      preview.src=previewURL;preview.hidden=false;
      worker.postMessage({generation:id,config,query:imageFeatures(img)});
    } catch {if (id===generation) status.textContent=words[4]}
  }
  input.addEventListener('pointerdown',warm,{once:true});
  input.addEventListener('change',()=>{const file=input.files[0];input.value='';search(file)});
  const dropZone=form || panel;
  dropZone.addEventListener('dragover',e=>e.preventDefault());
  dropZone.addEventListener('drop',e=>{e.preventDefault();search(e.dataTransfer.files[0])});
  document.addEventListener('paste',e=>{const entry=Array.from(e.clipboardData?.items || []).find(it=>it.type.startsWith('image/'));if(entry)search(entry.getAsFile())});
}
