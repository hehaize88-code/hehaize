// Buyer decisions beside a real source listing; no inferred material or QC claims.
const PRODUCT_GUIDE_COPY = {
 en:['Before you buy','Original Weidian listing','Images in this gallery','Match the exact size, colour and version on the seller listing. Gallery images do not establish the condition of your own warehouse order.','The displayed USD item price excludes international shipping. Confirm current options, domestic delivery and the final parcel quote.','Check warehouse QC photos','Plan shipping weight and cost','Understand product links and IDs','Compare jacket sizes and packing'],
 de:['Vor dem Kauf','Ursprüngliches Weidian-Angebot','Bilder in dieser Galerie','Vergleiche genaue Größe, Farbe und Version im Verkäuferangebot. Galeriebilder belegen nicht den Zustand deiner eigenen Lagerbestellung.','Der angezeigte USD-Warenpreis enthält keinen internationalen Versand. Prüfe aktuelle Varianten, Inlandslieferung und endgültiges Paketangebot.','Lager-QC-Fotos prüfen','Versandgewicht und Kosten planen','Produktlinks und IDs verstehen','Jackengrößen und Verpackung vergleichen'],
 es:['Antes de comprar','Anuncio original de Weidian','Imágenes de esta galería','Comprueba talla, color y versión exactos en el anuncio. Las imágenes de la galería no demuestran el estado de tu propio pedido en el almacén.','El precio del artículo en USD excluye envío internacional. Confirma opciones actuales, entrega nacional y presupuesto final del paquete.','Revisa las fotos QC del almacén','Planifica peso y coste del envío','Comprende enlaces e identificadores','Compara tallas y embalaje de chaquetas'],
 fr:['Avant l’achat','Annonce Weidian d’origine','Images de cette galerie','Comparez taille, couleur et version exactes sur l’annonce. Les images ne prouvent pas l’état de votre propre commande en entrepôt.','Le prix de l’article en USD exclut le transport international. Vérifiez options actuelles, livraison intérieure et devis final du colis.','Vérifier les photos QC en entrepôt','Prévoir poids et coût de livraison','Comprendre les liens et identifiants','Comparer tailles et emballage des vestes'],
 it:['Prima dell’acquisto','Annuncio originale Weidian','Immagini di questa galleria','Confronta taglia, colore e versione esatti nell’annuncio. Le immagini non dimostrano lo stato del tuo ordine personale in magazzino.','Il prezzo del prodotto in USD esclude la spedizione internazionale. Conferma opzioni, consegna nazionale e preventivo finale del pacco.','Controlla le foto QC del magazzino','Pianifica peso e costo di spedizione','Comprendi link e identificatori','Confronta taglie e imballaggio delle giacche']
};
export function productHelp(lang,category,product,escapeHtml) {
 const t=PRODUCT_GUIDE_COPY[lang]||PRODUCT_GUIDE_COPY.en;
 const links=[['qc-photo-checklist',t[5]],['hipobuy-shipping-calculator',t[6]],category==='jackets'?['hipobuy-jacket-finds',t[8]]:['hipobuy-product-links',t[7]]];
 const source=/^https:\/\/weidian\.com\//.test(product.sourceUrl)?`<a href="${escapeHtml(product.sourceUrl)}" target="_blank" rel="noopener noreferrer">${t[1]} ↗</a>`:'';
 return `<div class="product-evidence"><p>${source}</p><p>${t[2]}: ${product.images.length}</p><p>${t[3]}</p><p>${t[4]}</p></div><nav class="product-guide-links" aria-label="${t[0]}"><strong>${t[0]}</strong>${links.map(([slug,label])=>`<a href="/${lang}/articles/${slug}/">${label} →</a>`).join('')}</nav>`;
}

export function categoryHelp(lang) {
 const t=PRODUCT_GUIDE_COPY[lang]||PRODUCT_GUIDE_COPY.en;
 const links=[['hipobuy-product-links',t[7]],['qc-photo-checklist',t[5]],['hipobuy-shipping-calculator',t[6]]];
 return `<nav class="category-guide-links" aria-label="${t[0]}"><strong>${t[0]}</strong>${links.map(([slug,label])=>`<a href="/${lang}/articles/${slug}/">${label} →</a>`).join('')}</nav>`;
}
