// Navigation and hero copy in the catalogue's supported languages.
const storeCopy={
 en:['Spreadsheet','Buying guide','Best QC & Save Money','For you'],zh:['电子表格','购买流程','查 QC，挑好货，省预算','为你推荐'],de:['Produkttabelle','Kaufanleitung','QC prüfen und sparen','Für dich'],fr:['Tableau des produits','Guide d’achat','Comparez les photos QC et économisez','Pour vous'],es:['Hoja de productos','Cómo comprar','Compara fotos QC y ahorra','Para ti'],it:['Foglio prodotti','Come acquistare','Confronta le foto QC e risparmia','Per te'],nl:['Productoverzicht','Koopgids','Bekijk QC-foto’s en bespaar','Voor jou'],'pt-br':['Planilha','Como comprar','Compare fotos de QC e economize','Para você'],pl:['Arkusz produktów','Jak kupować','Sprawdź zdjęcia QC i oszczędzaj','Dla Ciebie'],ro:['Tabel de produse','Cum cumperi','Compară fotografiile QC și economisește','Pentru tine'],sv:['Produktlista','Köpguide','Jämför QC-bilder och spara','För dig'],da:['Produktark','Købsguide','Sammenlign QC-billeder og spar','Til dig'],fi:['Tuotetaulukko','Osto-opas','Vertaa QC-kuvia ja säästä','Sinulle'],el:['Πίνακας προϊόντων','Οδηγός αγοράς','Σύγκρινε φωτογραφίες QC και εξοικονόμησε χρήματα','Για εσένα'],cs:['Tabulka produktů','Jak nakupovat','Porovnejte QC fotografie a ušetřete','Pro vás'],hu:['Terméktáblázat','Vásárlási útmutató','Hasonlítsd össze a QC-fotókat és spórolj','Neked'],bg:['Таблица с продукти','Как да купя','Сравнявайте QC снимки и спестявайте','За вас'],sk:['Tabuľka produktov','Ako nakupovať','Porovnajte QC fotografie a ušetrite','Pre vás'],hr:['Tablica proizvoda','Kako kupovati','Usporedite QC fotografije i uštedite','Za vas'],ja:['商品一覧表','購入手順','QC写真を比べて、お得に探そう','おすすめ'],ko:['상품 목록','구매 절차','QC 사진을 비교하고 알뜰하게 쇼핑하세요','추천'],vi:['Bảng sản phẩm','Cách mua hàng','So sánh ảnh QC và tiết kiệm','Dành cho bạn'],th:['ตารางสินค้า','ขั้นตอนการซื้อ','เทียบภาพ QC เพื่อเลือกซื้ออย่างคุ้มค่า','สำหรับคุณ'],id:['Tabel produk','Cara membeli','Bandingkan foto QC dan hemat','Untuk Anda']};
function storefront(lang,t){
 const [sheet,buy,headline,feed]=storeCopy[lang]||storeCopy.en,home='/'+lang+'/',catalog=home+'spreadsheet/';
 const articles=lang==='zh'?'SEO 文章':lang==='en'?'SEO Articles':'SEO · '+t('Articles');
 const sections=[['spreadsheet/',sheet],['faq/',t('FAQ')],['articles/',articles],['how-to-buy/',buy]];
 const nav=sections.map(([path,label])=>'<a href="'+home+path+'">'+label+'</a>').join('');
 const categories=Object.entries(cats).map(([key,label])=>'<a href="'+catalog+(key==='AllProducts'?'':'?cat='+key)+'">'+t(label)+'</a>').join('');
 const editorial=editorialView(lang,t);
 function guide(path){
  let heading,body;
  if(path!=='how-to-buy/')return editorial.page(path);
  if(path==='how-to-buy/'){heading=buy;body='<ol>'+[[sheet,'Search products or source ID',catalog],[t('Styles'),'Select a style and size to see its source price.',catalog],[t('QC photos'),'Style photos are a reference. Confirm the selected style and size on the buying platform.',qc],[t('Open in UUFinds'),'The original link opens the product. The copied style, size and SKU help you select the same option there.',register]].map(([label,line,href])=>'<li><a href="'+href+'">'+label+'</a><p>'+t(line)+'</p></li>').join('')+'</ol>';}
  else return null;
  return {heading,body:'<article class="reader"><h1>'+heading+'</h1>'+body+'</article>'};
 }
 function hero(search){
  const shortcuts=[['🔥',t('Popular'),catalog+'?sort=click'],['🛍️',sheet,catalog],['📸',t('QC photos'),qc],['✨',t('Latest'),catalog+'?sort=new'],['🔎',t('Search by image'),home+'image-search/'],['👟',t('Shoes'),catalog+'?cat=shoes'],['📚',articles,home+'articles/'],['🛒',buy,home+'how-to-buy/']];
  return '<section class="store-hero"><div class="hero-inner"><div><h1>'+headline+'</h1>'+search+'</div><aside><div><h2>'+t('Register on UUFinds')+'</h2><p>✓ '+t('Search products')+'</p><p>✓ '+t('QC photos')+'</p><a href="'+register+'">'+t('Register')+'</a></div><div class="hero-art" aria-hidden="true"><i></i><b>QC</b><em>✓</em></div></aside></div></section><nav class="shortcuts">'+shortcuts.map(([icon,label,href])=>'<a href="'+href+'"><span aria-hidden="true">'+icon+'</span>'+label+'</a>').join('')+'</nav>';
 }
 return {sheet,nav,categories,feed,hero,guide,latest:editorial.latest};
}
