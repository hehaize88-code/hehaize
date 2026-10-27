"""Localized reader routes for the October 2026 search-intent release."""
from html import escape

HUBS={
'en':{
 'shipping_title':'Hipobuy Shipping Cost: Calculator, Weight and Tracking',
 'shipping_desc':'Estimate Hipobuy shipping with packed weight and dimensions. Compare the full quote, understand volumetric weight and follow the right tracking record.',
 'qc_title':'Hipobuy QC Photos: Find the Right Record and Check Your Item',
 'qc_desc':'Understand QC photos, distinguish listing images from your own warehouse order and find the next step when pictures or measurements are missing.',
 'shipping':[
 ('Start with the same parcel','Write down destination, contents, packed weight and outside dimensions. The official estimator uses grams for weight; the calculator here uses kilograms. Compare eligible routes with identical inputs and replace estimated measurements after packing.'),
 ('Compare the full payable amount','Keep goods, domestic delivery, international shipping, optional services and any destination charges separate. A cheap item or a coupon does not establish the delivered total. Use the live eligible quote before payment; no current shipping rates are loaded by this calculator.'),
 ('Check what the billed weight means','Read the chosen route’s actual or volumetric basis, divisor, rounding and price tiers. The illustrative calculator does not include every minimum charge or surcharge. Repacking or splitting a parcel needs a fresh quote and a check that adequate protection remains.'),
 ('Follow the correct shipment','Seller delivery to the warehouse, warehouse storage and international shipping are different stages. Use the parcel record and its named carrier after international dispatch. If scans stop, record the last dated event and any required action before contacting official support.')],
 'qc':[
 ('Choose the right photo source','The product search below finds catalogue listings and their source images. It does not access private warehouse orders or authenticate QC for your purchase. For your received item, open its order record on Hipobuy and match the selected variant before inspecting photos.'),
 ('Read status before requesting pictures','Arrived means receipt with inspection pending in the official status guide. Stored is the storage stage. If pictures are missing, distinguish an incomplete inspection from a loading problem, then request the specific view or measurement that changes your decision.'),
 ('Check identity, then condition','Compare size label, colour, quantity and included parts with the saved order. Inspect relevant surfaces, seams and closures. Images do not prove material composition, durability or authenticity. Keep the decision unresolved if an essential measurement is still missing.'),
 ('Resolve a mismatch before packing','Record the concern and contact official support promptly. Preserve packaging and tags while checking return eligibility and the order’s deadline. A photo request does not automatically extend the return window, and storage availability is a separate rule.')],
 'groups':['Find the guide for your next step','QC and item checks','Shipping and parcel weight','Orders, tracking and refunds'],
 'links':['Missing QC photos','QC inspection checklist','Size and measurements','Shipping calculator','Volumetric weight examples','Packing and rehearsal','Order status','Tracking not updating','Refund still pending'],
 'category':['Before you order','Check product links','Inspect warehouse photos','Plan shipping'],
 'photo':'Product photos', 'updated':'Updated', 'sources':'Official references', 'source_date':'Source review'},
'de':{
 'shipping_title':'Hipobuy-Versandkosten: Rechner, Gewicht und Tracking',
 'shipping_desc':'Plane den Versand mit Paketgewicht und Maßen. Vergleiche Gesamtkosten, prüfe Volumengewicht und verfolge die richtige Sendung.',
 'qc_title':'Hipobuy QC-Bilder: Fotos finden und den Artikel prüfen',
 'qc_desc':'Unterscheide Angebotsbilder und persönliche Lagerfotos. Prüfe den richtigen Auftrag und erfahre, was bei fehlenden Bildern oder Maßen zu tun ist.',
 'shipping':[
 ('Dasselbe Paket vergleichen','Notiere Ziel, Inhalt, verpacktes Gewicht und Außenmaße. Der offizielle Rechner verwendet Gramm, dieser Rechner Kilogramm. Vergleiche zulässige Linien mit identischen Angaben und ersetze Schätzungen nach dem Packen.'),
 ('Den gesamten Zahlbetrag prüfen','Trenne Waren, Inlandslieferung, internationalen Versand, Zusatzleistungen und mögliche Zielkosten. Ein günstiger Artikel oder Gutschein bestimmt nicht den Gesamtpreis. Prüfe vor Zahlung das aktuelle Angebot; dieser Rechner lädt keine Live-Tarife.'),
 ('Abrechnungsgewicht verstehen','Prüfe Real- oder Volumengewicht, Divisor, Rundung und Preisstufen der Linie. Das Rechenmodell enthält nicht alle Mindestentgelte oder Zuschläge. Umpacken und Aufteilen benötigen neue Angebote und ausreichenden Schutz.'),
 ('Die richtige Sendung verfolgen','Verkäuferversand, Lagerung und internationaler Versand sind verschiedene Phasen. Nutze nach Auslandsversand den Paketdatensatz und den dort genannten Transporteur. Bei fehlenden Scans notiere letztes Ereignis und erforderliche Handlung für den Support.')],
 'qc':[
 ('Die Bildquelle wählen','Die Suche zeigt Katalogangebote und deren Produktbilder. Sie greift nicht auf private Lagerbestellungen zu und bestätigt keine QC deiner Ware. Öffne dafür den Auftrag bei Hipobuy und gleiche zuerst die Variante ab.'),
 ('Zuerst den Status lesen','Arrived bedeutet laut offizieller Beschreibung Eingang bei ausstehender Prüfung; Stored bezeichnet die Lagerung. Unterscheide fehlende Kontrolle von Ladefehlern und frage nach der entscheidenden Ansicht oder Messung.'),
 ('Identität vor Zustand prüfen','Vergleiche Größenetikett, Farbe, Menge und Zubehör mit der Bestellung. Prüfe relevante Flächen, Nähte und Verschlüsse. Fotos bestätigen weder Zusammensetzung noch Haltbarkeit oder Echtheit. Eine wichtige fehlende Messung bleibt ein offener Punkt.'),
 ('Abweichungen vor dem Packen klären','Dokumentiere das Problem und kontaktiere den offiziellen Support zeitnah. Bewahre Etiketten und Verpackung auf und prüfe Frist und Rückgabebedingungen. Eine Fotoanfrage verlängert die Frist nicht automatisch; Lagerung ist eine separate Regel.')],
 'groups':['Den passenden Ratgeber finden','QC und Artikelprüfung','Versand und Paketgewicht','Bestellung, Tracking und Erstattung'],
 'links':['QC-Fotos fehlen','QC-Checkliste','Größe und Maße','Versandrechner','Volumengewicht berechnen','Probeverpackung','Bestellstatus','Tracking ohne Update','Erstattung ausstehend'],
 'category':['Vor der Bestellung','Produktlinks prüfen','Lagerfotos kontrollieren','Versand planen'],
 'photo':'Produktbilder','updated':'Aktualisiert','sources':'Offizielle Quellen','source_date':'Quellenprüfung'},
'es':{
 'shipping_title':'Envío Hipobuy: coste, calculadora y seguimiento',
 'shipping_desc':'Estima el envío con peso y dimensiones del paquete. Compara el coste completo, entiende el peso volumétrico y consulta el seguimiento correcto.',
 'qc_title':'Fotos QC Hipobuy: localiza el pedido y revisa el artículo',
 'qc_desc':'Distingue imágenes del anuncio y fotos de tu pedido en almacén. Comprueba el estado y qué hacer cuando faltan vistas o medidas.',
 'shipping':[
 ('Compara el mismo paquete','Anota destino, contenido, peso embalado y medidas exteriores. El estimador oficial usa gramos; esta calculadora, kilogramos. Compara rutas admisibles con datos idénticos y sustituye las estimaciones después del embalaje.'),
 ('Revisa el importe completo','Separa productos, transporte nacional, envío internacional, servicios y posibles cargos de destino. Un artículo barato o cupón no define el coste entregado. Consulta el presupuesto actual antes de pagar; aquí no se cargan tarifas en directo.'),
 ('Entiende el peso facturable','Revisa base real o volumétrica, divisor, redondeo y tramos de precio. El modelo no incluye todos los mínimos o recargos. Reembalar o dividir requiere presupuestos nuevos y comprobar que la protección siga siendo suficiente.'),
 ('Sigue el envío correcto','Entrega del vendedor, almacenamiento y transporte internacional son fases diferentes. Tras la expedición internacional usa el registro del paquete y su transportista. Si faltan actualizaciones, anota el último evento y cualquier acción necesaria para soporte.')],
 'qc':[
 ('Elige la fuente de las imágenes','La búsqueda encuentra anuncios del catálogo e imágenes de origen. No accede a pedidos privados ni autentica el QC de tu compra. Abre el pedido en Hipobuy y compara primero la variante recibida.'),
 ('Lee el estado antes de pedir fotos','Arrived indica recepción con inspección pendiente según la guía oficial; Stored corresponde al almacenamiento. Distingue revisión incompleta y error de carga y pide la vista o medida que permite decidir.'),
 ('Comprueba identidad y después estado','Compara etiqueta, color, cantidad y accesorios con el pedido. Examina superficies, costuras y cierres. Las fotos no prueban composición, durabilidad o autenticidad. Una medida esencial ausente deja la decisión pendiente.'),
 ('Resuelve discrepancias antes de embalar','Documenta el problema y contacta pronto con soporte oficial. Conserva etiquetas y embalaje mientras verificas condiciones y plazo de devolución. Pedir fotos no amplía automáticamente el plazo; el almacenamiento es una regla distinta.')],
 'groups':['Encuentra la guía del siguiente paso','QC y revisión del artículo','Envío y peso del paquete','Pedidos, seguimiento y reembolso'],
 'links':['Faltan fotos QC','Checklist QC','Tallas y medidas','Calculadora de envío','Peso volumétrico','Ensayo de embalaje','Estado del pedido','Seguimiento sin actualizar','Reembolso pendiente'],
 'category':['Antes de comprar','Comprueba los enlaces','Revisa las fotos de almacén','Planifica el envío'],
 'photo':'Fotos del producto','updated':'Actualizado','sources':'Referencias oficiales','source_date':'Revisión de fuentes'},
'fr':{
 'shipping_title':'Livraison Hipobuy : frais, calculateur et suivi',
 'shipping_desc':'Estimez la livraison avec poids et dimensions du colis. Comparez le coût total, comprenez le poids volumétrique et consultez le bon suivi.',
 'qc_title':'Photos QC Hipobuy : retrouver et vérifier votre article',
 'qc_desc':'Distinguez images de l’annonce et photos de votre commande en entrepôt. Vérifiez le statut et les étapes utiles si des vues ou mesures manquent.',
 'shipping':[
 ('Comparer le même colis','Notez destination, contenu, poids emballé et dimensions extérieures. L’outil officiel utilise les grammes, celui-ci les kilogrammes. Comparez des lignes admissibles avec les mêmes données et remplacez les estimations après emballage.'),
 ('Vérifier le total payable','Séparez articles, transport intérieur, livraison internationale, options et frais éventuels à destination. Un prix bas ou coupon ne définit pas le total livré. Consultez le devis actuel avant paiement ; ce calculateur ne charge aucun tarif en direct.'),
 ('Comprendre le poids facturable','Vérifiez base réelle ou volumétrique, diviseur, arrondi et tranches tarifaires. Le modèle ne comprend pas tous les minimums et suppléments. Reconditionner ou séparer exige de nouveaux devis et une protection suffisante.'),
 ('Suivre le bon envoi','Livraison vendeur, stockage et transport international sont des étapes différentes. Après expédition, consultez le dossier du colis et le transporteur indiqué. Si le suivi se fige, notez dernier événement et action demandée pour le support.')],
 'qc':[
 ('Choisir la source des photos','La recherche affiche annonces et images du catalogue source. Elle n’accède pas aux commandes privées et n’authentifie pas votre QC. Ouvrez votre commande Hipobuy et comparez d’abord la variante.'),
 ('Lire le statut avant de demander des vues','Arrived indique une réception avec inspection en attente dans la documentation officielle ; Stored désigne le stockage. Distinguez contrôle incomplet et problème d’affichage, puis demandez la vue ou mesure décisive.'),
 ('Contrôler identité puis état','Comparez étiquette, couleur, quantité et accessoires avec la commande. Examinez surfaces, coutures et fermetures utiles. Les photos ne prouvent ni composition, ni durabilité, ni authenticité. Une mesure essentielle absente laisse la décision ouverte.'),
 ('Résoudre les écarts avant emballage','Documentez le problème et contactez rapidement le support officiel. Gardez emballage et étiquettes pendant la vérification du délai et des conditions de retour. Une demande de photo ne prolonge pas automatiquement le délai ; le stockage relève d’une autre règle.')],
 'groups':['Trouver le guide de la prochaine étape','QC et vérification du produit','Livraison et poids du colis','Commande, suivi et remboursement'],
 'links':['Photos QC absentes','Liste de contrôle QC','Tailles et mesures','Calculateur de livraison','Poids volumétrique','Préparation d’essai','Statut de commande','Suivi sans mise à jour','Remboursement en attente'],
 'category':['Avant de commander','Vérifier les liens','Contrôler les photos en entrepôt','Prévoir la livraison'],
 'photo':'Photos du produit','updated':'Mis à jour','sources':'Références officielles','source_date':'Vérification des sources'},
'it':{
 'shipping_title':'Spedizione Hipobuy: costo, calcolatore e tracking',
 'shipping_desc':'Stima la spedizione con peso e misure del pacco. Confronta il costo totale, verifica il peso volumetrico e consulta il tracking corretto.',
 'qc_title':'Foto QC Hipobuy: trova l’ordine e controlla l’articolo',
 'qc_desc':'Distingui immagini dell’annuncio e foto del tuo ordine in magazzino. Verifica stato e azioni utili quando mancano viste o misure.',
 'shipping':[
 ('Confronta lo stesso pacco','Annota destinazione, contenuto, peso imballato e misure esterne. Lo stimatore ufficiale usa grammi, questo calcolatore chilogrammi. Confronta rotte ammesse con dati identici e sostituisci le stime dopo l’imballaggio.'),
 ('Controlla il totale da pagare','Separa prodotti, trasporto nazionale, spedizione internazionale, servizi e possibili costi a destinazione. Un prezzo basso o coupon non definisce il totale consegnato. Verifica il preventivo attuale prima di pagare: qui non si caricano tariffe in tempo reale.'),
 ('Comprendi il peso fatturabile','Controlla base reale o volumetrica, divisore, arrotondamento e scaglioni. Il modello non include tutti i minimi e supplementi. Reimballare o dividere richiede nuovi preventivi e protezione adeguata.'),
 ('Segui la spedizione corretta','Consegna del venditore, deposito e trasporto internazionale sono fasi distinte. Dopo la partenza usa il registro del pacco e il corriere indicato. Se il tracking si ferma, annota ultimo evento e azioni richieste per l’assistenza.')],
 'qc':[
 ('Scegli la fonte delle immagini','La ricerca trova annunci e immagini del catalogo originale. Non accede a ordini privati né autentica il QC del tuo acquisto. Apri il tuo ordine Hipobuy e confronta prima la variante.'),
 ('Leggi lo stato prima di chiedere foto','Arrived indica ricezione con ispezione in attesa nella guida ufficiale; Stored corrisponde al deposito. Distingui controllo incompleto ed errore di caricamento, poi chiedi la vista o misura necessaria per decidere.'),
 ('Controlla identità e poi condizioni','Confronta etichetta, colore, quantità e accessori con l’ordine. Esamina superfici, cuciture e chiusure pertinenti. Le foto non provano composizione, durata o autenticità. Una misura essenziale mancante lascia la decisione aperta.'),
 ('Risolvi differenze prima dell’imballaggio','Documenta il problema e contatta presto l’assistenza ufficiale. Conserva confezione ed etichette mentre verifichi condizioni e termine del reso. Una richiesta di foto non prolunga automaticamente la scadenza; il deposito segue una regola diversa.')],
 'groups':['Trova la guida per il prossimo passo','QC e controllo del prodotto','Spedizione e peso del pacco','Ordini, tracking e rimborsi'],
 'links':['Foto QC mancanti','Checklist QC','Taglie e misure','Calcolatore di spedizione','Peso volumetrico','Preparazione di prova','Stato dell’ordine','Tracking senza aggiornamenti','Rimborso in attesa'],
 'category':['Prima di ordinare','Controlla i link','Verifica le foto in magazzino','Pianifica la spedizione'],
 'photo':'Foto del prodotto','updated':'Aggiornato','sources':'Riferimenti ufficiali','source_date':'Verifica delle fonti'}
}

def apply_hub_copy(translations):
    for lang,t in translations.items():
        copy=HUBS[lang]
        for route,idx in [('qc',4),('shipping',5)]:
            t['page_titles'][idx]=copy[route+'_title']
            t['page_subs'][idx]=copy[route+'_desc']
            t['body'][route]=copy[route]

def topic_paths(lang):
    t=HUBS[lang]
    slugs=['hipobuy-qc-photos-not-showing','qc-photo-checklist','hipobuy-size-guide','hipobuy-shipping-calculator','hipobuy-volumetric-weight','hipobuy-rehearsal-packing','order-status-workflow','hipobuy-tracking-not-updating','hipobuy-refund-pending']
    groups=[]
    for i in range(3):
        links=''.join(f'<a href="/{lang}/articles/{slugs[j]}/">{escape(t["links"][j])} →</a>' for j in range(i*3,i*3+3))
        groups.append('<div><h3>'+escape(t['groups'][i+1])+'</h3>'+links+'</div>')
    return '<nav class="topic-paths" aria-label="'+escape(t['groups'][0])+'">'+''.join(groups)+'</nav>'
