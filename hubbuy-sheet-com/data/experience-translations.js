import { experienceCopy } from './experience-copy.js';

// Reviewed UI translations override automated editorial translations. Each row
// follows experienceCopy so the same wording is used in server and browser UI.
export const experienceTranslations = { en: {} };
const addendumKeys = ['Men’s style', 'Women’s style', 'From', 'This combination is unavailable. Choose another option.', 'Product source'];
const readingKeys = ['Read by section', 'Expand all', 'Collapse all', 'Show less'];
const faqKeys = [
  'No catalogue can guarantee current stock or a final checkout price. Use the currency selector for estimated conversions. Catalogue cards may start from USD reference prices, while a selected Weidian option uses its CNY source price. Shipping, taxes and platform fees are separate; confirm the item, option and total on the buying platform.',
  "Search by product name, original ID or link to view this site's catalogue results. Use image search to compare a photo with the indexed catalogue on your device.",
];
const baseKeys = experienceCopy.filter(key => !addendumKeys.includes(key) && !readingKeys.includes(key) && !faqKeys.includes(key));
function addLocale(locale, text) {
  const values = text.trim().split('\n').map(value => value.trim());
  if (values.length !== baseKeys.length) throw new Error(`Incomplete experience translation: ${locale} (${values.length}/${baseKeys.length})`);
  experienceTranslations[locale] = Object.fromEntries(baseKeys.map((key, index) => [key, values[index]]));
}

addLocale('de', `
Währung
Sprache
Sprache auswählen
Sprachen
Produktfotos
Varianten
Variante auswählen
Größe
Größe auswählen
Ausgewählte Option
SKU
Varianten werden geladen…
Die Varianten konnten nicht geladen werden. Öffne das Originalangebot, um die verfügbaren Optionen zu prüfen.
Erneut versuchen
Für dieses Produkt sind keine auswählbaren Varianten angegeben.
Die Variantenfotos dienen als Referenz. Bestätige die ausgewählte Variante und Größe auf der Einkaufsplattform.
Andere Einkaufsagenten
Öffne dieses Produkt bei einem anderen Einkaufsagenten. Prüfe dort den Preis und die verfügbaren Optionen.
Einkaufsagenten suchen
Keine Einkaufsagenten gefunden.
Weidian-Link kopieren
Link und ausgewählte Option kopieren
Kopiert
Kopieren fehlgeschlagen. Markiere und kopiere den Link unten.
Wähle zuerst die vollständige Option aus, bevor du ihre Angaben kopierst.
Originalangebot auf Weidian
Auf Weidian öffnen
QC-Fotos
Für diesen Artikel liegen vom Kataloganbieter keine verifizierten QC-Fotos vor.
QC-Leitfaden lesen
Katalogfotos
Dies sind Referenzfotos aus dem Katalog; sie sind nicht als Lager-QC-Fotos ausgewiesen.
Foto vergrößern
Schließen
Vorheriges Foto
Nächstes Foto
Foto nicht verfügbar
Bild
Produkt-ID
Variante
Nicht auf Lager
Verfügbare Optionen
Referenzpreis
Geschätzte Umrechnung. Versand, Steuern und Plattformgebühren sind nicht enthalten.
Referenzwechselkurse
Kursdatum
Wechselkurse sind vorübergehend nicht verfügbar. Die Preise bleiben in ihrer ursprünglichen Währung.
Wechselkurse werden aktualisiert…
Umgerechnet aus
Weitere Produkte anzeigen
Ausgewählte Produktangaben kopieren
Wähle eine Variante und Größe aus, um den Preis im Originalangebot zu sehen.
Der Originallink öffnet das Produkt. Die kopierte Variante, Größe und SKU helfen dir, dort dieselbe Option auszuwählen.
Zurück zu den Produktfotos
Produkt nicht verfügbar
Seite nicht gefunden
Hubbuy-Produktliste
Produkte suchen
Weitere Fotos
Originaler Produktname
Produktname laut Originalangebot.
`);

addLocale('pt-br', `
Moeda
Idioma
Escolher idioma
Idiomas
Fotos do produto
Modelos
Selecione um modelo
Tamanho
Selecione um tamanho
Opção selecionada
SKU
Carregando modelos…
Não foi possível carregar os modelos. Abra o anúncio original para conferir as opções disponíveis.
Tentar novamente
Não há modelos selecionáveis informados para este produto.
As fotos dos modelos são uma referência. Confirme o modelo e o tamanho selecionados na plataforma de compra.
Outros agentes de compra
Abra este produto em outro agente de compra. Confira o preço e as opções disponíveis nessa plataforma.
Buscar agentes de compra
Nenhum agente de compra encontrado.
Copiar link do Weidian
Copiar link e opção selecionada
Copiado
Não foi possível copiar. Selecione e copie o link abaixo.
Escolha a opção completa antes de copiar sua referência.
Anúncio original no Weidian
Abrir no Weidian
Fotos de QC
A fonte do catálogo não fornece fotos de QC verificadas para este item.
Ler o guia de QC
Fotos do catálogo
Estas são fotos de referência do catálogo; não estão identificadas como fotos de QC do armazém.
Ampliar foto
Fechar
Foto anterior
Próxima foto
Foto indisponível
Imagem
ID do produto
Modelo
Esgotado
Opções disponíveis
Preço de referência
Conversão estimada. Frete, impostos e taxas da plataforma não estão incluídos.
Cotações de referência
Data da cotação
As cotações estão temporariamente indisponíveis. Os preços permanecem na moeda original.
Atualizando cotações…
Convertido de
Mostrar mais produtos
Copiar referência selecionada
Selecione um modelo e um tamanho para ver o preço no anúncio original.
O link original abre o produto. O modelo, o tamanho e o SKU copiados ajudam você a selecionar a mesma opção nessa página.
Voltar às fotos do produto
Produto indisponível
Página não encontrada
Planilha Hubbuy
Buscar produtos
Mais fotos
Nome original do produto
Nome do produto conforme o anúncio de origem.
`);

addLocale('fr', `
Devise
Langue
Choisir une langue
Langues
Photos du produit
Modèles
Sélectionner un modèle
Taille
Sélectionner une taille
Option sélectionnée
SKU
Chargement des modèles…
Impossible de charger les modèles. Ouvrez l’annonce d’origine pour vérifier les options disponibles.
Réessayer
Aucun modèle sélectionnable n’est indiqué pour ce produit.
Les photos des modèles sont fournies à titre indicatif. Confirmez le modèle et la taille sélectionnés sur la plateforme d’achat.
Autres agents d’achat
Ouvrez ce produit chez un autre agent d’achat. Vérifiez son prix et les options disponibles sur cette plateforme.
Rechercher des agents d’achat
Aucun agent d’achat trouvé.
Copier le lien Weidian
Copier le lien et l’option sélectionnée
Copié
La copie a échoué. Sélectionnez et copiez le lien ci-dessous.
Sélectionnez toutes les options avant de copier la référence correspondante.
Annonce d’origine sur Weidian
Ouvrir sur Weidian
Photos QC
La source du catalogue ne fournit aucune photo QC vérifiée pour cet article.
Lire le guide QC
Photos du catalogue
Ces photos sont des références du catalogue ; elles ne sont pas identifiées comme des photos QC prises en entrepôt.
Agrandir la photo
Fermer
Photo précédente
Photo suivante
Photo indisponible
Image
ID du produit
Modèle
Rupture de stock
Options disponibles
Prix indicatif
Conversion estimative. Les frais de livraison, taxes et frais de plateforme ne sont pas inclus.
Taux de référence
Date du taux
Les taux de change sont temporairement indisponibles. Les prix restent dans leur devise d’origine.
Mise à jour des taux de change…
Converti depuis
Afficher plus de produits
Copier la référence sélectionnée
Sélectionnez un modèle et une taille pour voir le prix dans l’annonce d’origine.
Le lien d’origine ouvre le produit. Le modèle, la taille et le SKU copiés vous aident à y sélectionner la même option.
Retour aux photos du produit
Produit indisponible
Page introuvable
Liste de produits Hubbuy
Rechercher des produits
Plus de photos
Nom d’origine du produit
Nom du produit tel qu’il figure dans l’annonce d’origine.
`);

addLocale('es', `
Moneda
Idioma
Elegir idioma
Idiomas
Fotos del producto
Modelos
Selecciona un modelo
Talla
Selecciona una talla
Opción seleccionada
SKU
Cargando modelos…
No se pudieron cargar los modelos. Abre el anuncio original para consultar las opciones disponibles.
Reintentar
No se indican modelos seleccionables para este producto.
Las fotos de los modelos son una referencia. Confirma el modelo y la talla seleccionados en la plataforma de compra.
Otros agentes de compra
Abre este producto con otro agente de compra. Comprueba allí su precio y las opciones disponibles.
Buscar agentes de compra
No se encontraron agentes de compra.
Copiar enlace de Weidian
Copiar enlace y opción seleccionada
Copiado
No se pudo copiar. Selecciona y copia el enlace de abajo.
Elige la opción completa antes de copiar su referencia.
Anuncio original en Weidian
Abrir en Weidian
Fotos QC
La fuente del catálogo no ofrece fotos QC verificadas para este artículo.
Leer la guía QC
Fotos del catálogo
Estas son fotos de referencia del catálogo; no están identificadas como fotos QC del almacén.
Ampliar foto
Cerrar
Foto anterior
Foto siguiente
Foto no disponible
Imagen
ID del producto
Modelo
Agotado
Opciones disponibles
Precio de referencia
Conversión estimada. No incluye envío, impuestos ni comisiones de la plataforma.
Tipos de cambio de referencia
Fecha del tipo de cambio
Los tipos de cambio no están disponibles temporalmente. Los precios se mantienen en su moneda original.
Actualizando tipos de cambio…
Convertido de
Mostrar más productos
Copiar referencia seleccionada
Selecciona un modelo y una talla para ver su precio en el anuncio original.
El enlace original abre el producto. El modelo, la talla y el SKU copiados te ayudan a seleccionar allí la misma opción.
Volver a las fotos del producto
Producto no disponible
Página no encontrada
Lista de productos Hubbuy
Buscar productos
Más fotos
Nombre original del producto
Nombre del producto tal como aparece en el anuncio de origen.
`);

addLocale('it', `
Valuta
Lingua
Scegli la lingua
Lingue
Foto del prodotto
Modelli
Seleziona un modello
Taglia
Seleziona una taglia
Opzione selezionata
SKU
Caricamento dei modelli…
Impossibile caricare i modelli. Apri l’inserzione originale per controllare le opzioni disponibili.
Riprova
Per questo prodotto non sono indicati modelli selezionabili.
Le foto dei modelli sono indicative. Conferma il modello e la taglia selezionati sulla piattaforma di acquisto.
Altri agenti di acquisto
Apri questo prodotto con un altro agente di acquisto. Verifica il prezzo e le opzioni disponibili sulla sua piattaforma.
Cerca agenti di acquisto
Nessun agente di acquisto trovato.
Copia il link Weidian
Copia il link e l’opzione selezionata
Copiato
Copia non riuscita. Seleziona e copia il link qui sotto.
Completa la selezione delle opzioni prima di copiarne il riferimento.
Inserzione originale su Weidian
Apri su Weidian
Foto QC
La fonte del catalogo non fornisce foto QC verificate per questo articolo.
Leggi la guida QC
Foto del catalogo
Queste sono foto di riferimento del catalogo; non sono identificate come foto QC del magazzino.
Ingrandisci la foto
Chiudi
Foto precedente
Foto successiva
Foto non disponibile
Immagine
ID prodotto
Modello
Esaurito
Opzioni disponibili
Prezzo indicativo
Conversione stimata. Spedizione, imposte e commissioni della piattaforma non sono incluse.
Tassi di riferimento
Data del tasso
I tassi di cambio sono temporaneamente indisponibili. I prezzi restano nella valuta originale.
Aggiornamento dei tassi di cambio…
Convertito da
Mostra altri prodotti
Copia il riferimento selezionato
Seleziona un modello e una taglia per vedere il prezzo nell’inserzione originale.
Il link originale apre il prodotto. Il modello, la taglia e lo SKU copiati ti aiutano a selezionare la stessa opzione su quella pagina.
Torna alle foto del prodotto
Prodotto non disponibile
Pagina non trovata
Lista prodotti Hubbuy
Cerca prodotti
Altre foto
Nome originale del prodotto
Nome del prodotto riportato nell’inserzione originale.
`);

addLocale('nl', `
Valuta
Taal
Taal kiezen
Talen
Productfoto’s
Uitvoeringen
Kies een uitvoering
Maat
Kies een maat
Geselecteerde optie
SKU
Uitvoeringen laden…
De uitvoeringen konden niet worden geladen. Open de oorspronkelijke advertentie om de beschikbare opties te bekijken.
Opnieuw proberen
Voor dit product zijn geen selecteerbare uitvoeringen opgegeven.
De foto’s van de uitvoeringen dienen als referentie. Bevestig de gekozen uitvoering en maat op het aankoopplatform.
Andere aankoopagenten
Open dit product bij een andere aankoopagent. Controleer daar de prijs en beschikbare opties.
Aankoopagenten zoeken
Geen aankoopagenten gevonden.
Weidian-link kopiëren
Link en geselecteerde optie kopiëren
Gekopieerd
Kopiëren mislukt. Selecteer en kopieer de onderstaande link.
Maak de volledige selectie voordat je de bijbehorende gegevens kopieert.
Oorspronkelijke advertentie op Weidian
Openen op Weidian
QC-foto’s
De catalogusbron biedt geen geverifieerde QC-foto’s voor dit artikel.
QC-gids lezen
Catalogusfoto’s
Dit zijn referentiefoto’s uit de catalogus; ze zijn niet aangemerkt als QC-foto’s uit het magazijn.
Foto vergroten
Sluiten
Vorige foto
Volgende foto
Foto niet beschikbaar
Afbeelding
Product-ID
Uitvoering
Niet op voorraad
Beschikbare opties
Richtprijs
Geschatte omrekening. Verzendkosten, belastingen en platformkosten zijn niet inbegrepen.
Referentiewisselkoersen
Koersdatum
Wisselkoersen zijn tijdelijk niet beschikbaar. Prijzen blijven in hun oorspronkelijke valuta staan.
Wisselkoersen bijwerken…
Omgerekend van
Meer producten tonen
Geselecteerde productgegevens kopiëren
Kies een uitvoering en maat om de prijs in de oorspronkelijke advertentie te zien.
De oorspronkelijke link opent het product. De gekopieerde uitvoering, maat en SKU helpen je daar dezelfde optie te kiezen.
Terug naar de productfoto’s
Product niet beschikbaar
Pagina niet gevonden
Hubbuy-productlijst
Producten zoeken
Meer foto’s
Oorspronkelijke productnaam
Productnaam zoals vermeld in de oorspronkelijke advertentie.
`);

addLocale('pl', `
Waluta
Język
Wybierz język
Języki
Zdjęcia produktu
Warianty
Wybierz wariant
Rozmiar
Wybierz rozmiar
Wybrana opcja
SKU
Wczytywanie wariantów…
Nie udało się wczytać wariantów. Otwórz oryginalną ofertę, aby sprawdzić dostępne opcje.
Spróbuj ponownie
Dla tego produktu nie podano wariantów do wyboru.
Zdjęcia wariantów mają charakter poglądowy. Potwierdź wybrany wariant i rozmiar na platformie zakupowej.
Inni pośrednicy zakupowi
Otwórz ten produkt u innego pośrednika zakupowego. Sprawdź tam cenę i dostępne opcje.
Szukaj pośredników zakupowych
Nie znaleziono pośredników zakupowych.
Kopiuj link Weidian
Kopiuj link i wybraną opcję
Skopiowano
Kopiowanie nie powiodło się. Zaznacz i skopiuj link poniżej.
Wybierz wszystkie opcje przed skopiowaniem ich danych.
Oryginalna oferta na Weidian
Otwórz w Weidian
Zdjęcia QC
Źródło katalogu nie udostępnia zweryfikowanych zdjęć QC tego artykułu.
Przeczytaj poradnik QC
Zdjęcia katalogowe
Są to zdjęcia poglądowe z katalogu; nie oznaczono ich jako zdjęć QC z magazynu.
Powiększ zdjęcie
Zamknij
Poprzednie zdjęcie
Następne zdjęcie
Zdjęcie niedostępne
Obraz
ID produktu
Wariant
Brak w magazynie
Dostępne opcje
Cena orientacyjna
Szacunkowe przeliczenie. Nie obejmuje wysyłki, podatków ani opłat platformy.
Referencyjne kursy walut
Data kursu
Kursy walut są chwilowo niedostępne. Ceny pozostają w oryginalnej walucie.
Aktualizowanie kursów walut…
Przeliczono z
Pokaż więcej produktów
Kopiuj dane wybranej opcji
Wybierz wariant i rozmiar, aby zobaczyć cenę w oryginalnej ofercie.
Oryginalny link otwiera produkt. Skopiowany wariant, rozmiar i SKU pomogą Ci wybrać tam tę samą opcję.
Wróć do zdjęć produktu
Produkt niedostępny
Nie znaleziono strony
Lista produktów Hubbuy
Szukaj produktów
Więcej zdjęć
Oryginalna nazwa produktu
Nazwa produktu podana w ofercie źródłowej.
`);

addLocale('ro', `
Monedă
Limbă
Alege limba
Limbi
Fotografii ale produsului
Modele
Selectează un model
Mărime
Selectează o mărime
Opțiunea selectată
SKU
Se încarcă modelele…
Modelele nu au putut fi încărcate. Deschide anunțul original pentru a verifica opțiunile disponibile.
Încearcă din nou
Nu sunt indicate modele selectabile pentru acest produs.
Fotografiile modelelor sunt orientative. Confirmă modelul și mărimea selectate pe platforma de cumpărare.
Alți agenți de cumpărături
Deschide acest produs la un alt agent de cumpărături. Verifică acolo prețul și opțiunile disponibile.
Caută agenți de cumpărături
Nu s-au găsit agenți de cumpărături.
Copiază linkul Weidian
Copiază linkul și opțiunea selectată
Copiat
Copierea a eșuat. Selectează și copiază linkul de mai jos.
Selectează toate opțiunile înainte de a copia datele corespunzătoare.
Anunțul original pe Weidian
Deschide pe Weidian
Fotografii QC
Sursa catalogului nu oferă fotografii QC verificate pentru acest articol.
Citește ghidul QC
Fotografii din catalog
Acestea sunt fotografii de referință din catalog; nu sunt identificate ca fotografii QC din depozit.
Mărește fotografia
Închide
Fotografia anterioară
Fotografia următoare
Fotografie indisponibilă
Imagine
ID produs
Model
Stoc epuizat
Opțiuni disponibile
Preț orientativ
Conversie estimativă. Transportul, taxele și comisioanele platformei nu sunt incluse.
Cursuri de referință
Data cursului
Cursurile de schimb sunt temporar indisponibile. Prețurile rămân în moneda originală.
Se actualizează cursurile de schimb…
Convertit din
Arată mai multe produse
Copiază datele opțiunii selectate
Selectează un model și o mărime pentru a vedea prețul din anunțul original.
Linkul original deschide produsul. Modelul, mărimea și codul SKU copiate te ajută să selectezi aceeași opțiune acolo.
Înapoi la fotografiile produsului
Produs indisponibil
Pagina nu a fost găsită
Lista de produse Hubbuy
Caută produse
Mai multe fotografii
Numele original al produsului
Numele produsului așa cum apare în anunțul sursă.
`);

addLocale('sv', `
Valuta
Språk
Välj språk
Språk
Produktbilder
Varianter
Välj en variant
Storlek
Välj en storlek
Valt alternativ
SKU
Läser in varianter…
Det gick inte att läsa in varianterna. Öppna originalannonsen för att kontrollera vilka alternativ som finns.
Försök igen
Inga valbara varianter anges för den här produkten.
Variantbilderna är vägledande. Bekräfta vald variant och storlek på köpplattformen.
Andra inköpsagenter
Öppna produkten hos en annan inköpsagent. Kontrollera priset och de tillgängliga alternativen där.
Sök efter inköpsagenter
Inga inköpsagenter hittades.
Kopiera Weidian-länk
Kopiera länk och valt alternativ
Kopierat
Det gick inte att kopiera. Markera och kopiera länken nedan.
Gör alla val innan du kopierar uppgifterna för alternativet.
Originalannons på Weidian
Öppna på Weidian
QC-bilder
Katalogkällan tillhandahåller inga verifierade QC-bilder för den här artikeln.
Läs QC-guiden
Katalogbilder
Det här är referensbilder från katalogen; de är inte angivna som QC-bilder från lagret.
Förstora bilden
Stäng
Föregående bild
Nästa bild
Bilden är inte tillgänglig
Bild
Produkt-ID
Variant
Slut i lager
Tillgängliga alternativ
Riktpris
Uppskattad omräkning. Frakt, skatter och plattformsavgifter ingår inte.
Referenskurser
Kursdatum
Växelkurserna är tillfälligt otillgängliga. Priserna visas fortfarande i sin ursprungliga valuta.
Uppdaterar växelkurser…
Omräknat från
Visa fler produkter
Kopiera uppgifter för valt alternativ
Välj variant och storlek för att se priset i originalannonsen.
Originallänken öppnar produkten. Kopierad variant, storlek och SKU hjälper dig att välja samma alternativ där.
Tillbaka till produktbilderna
Produkten är inte tillgänglig
Sidan hittades inte
Hubbuy-produktlista
Sök produkter
Fler bilder
Ursprungligt produktnamn
Produktnamnet som det anges i originalannonsen.
`);

addLocale('da', `
Valuta
Sprog
Vælg sprog
Sprog
Produktbilleder
Varianter
Vælg en variant
Størrelse
Vælg en størrelse
Valgt mulighed
SKU
Indlæser varianter…
Varianterne kunne ikke indlæses. Åbn den oprindelige annonce for at se de tilgængelige muligheder.
Prøv igen
Der er ikke angivet valgbare varianter for dette produkt.
Variantbillederne er vejledende. Bekræft den valgte variant og størrelse på købsplatformen.
Andre indkøbsagenter
Åbn produktet hos en anden indkøbsagent. Tjek prisen og de tilgængelige muligheder dér.
Søg efter indkøbsagenter
Ingen indkøbsagenter fundet.
Kopiér Weidian-link
Kopiér link og valgt mulighed
Kopieret
Kopiering mislykkedes. Markér og kopiér linket nedenfor.
Foretag alle valg, før du kopierer oplysningerne om den valgte mulighed.
Oprindelig annonce på Weidian
Åbn på Weidian
QC-billeder
Katalogkilden har ingen verificerede QC-billeder af denne vare.
Læs QC-guiden
Katalogbilleder
Dette er referencebilleder fra kataloget; de er ikke identificeret som QC-billeder fra lageret.
Forstør billede
Luk
Forrige billede
Næste billede
Billedet er ikke tilgængeligt
Billede
Produkt-ID
Variant
Udsolgt
Tilgængelige muligheder
Vejledende pris
Anslået omregning. Fragt, skatter og platformgebyrer er ikke inkluderet.
Referencekurser
Kursdato
Valutakurserne er midlertidigt utilgængelige. Priserne forbliver i deres oprindelige valuta.
Opdaterer valutakurser…
Omregnet fra
Vis flere produkter
Kopiér de valgte produktoplysninger
Vælg variant og størrelse for at se prisen i den oprindelige annonce.
Det oprindelige link åbner produktet. Den kopierede variant, størrelse og SKU hjælper dig med at vælge samme mulighed dér.
Tilbage til produktbilleder
Produktet er ikke tilgængeligt
Siden blev ikke fundet
Hubbuy-produktliste
Søg efter produkter
Flere billeder
Oprindeligt produktnavn
Produktnavnet som angivet i den oprindelige annonce.
`);

addLocale('fi', `
Valuutta
Kieli
Valitse kieli
Kielet
Tuotekuvat
Mallit
Valitse malli
Koko
Valitse koko
Valittu vaihtoehto
SKU
Ladataan malleja…
Malleja ei voitu ladata. Tarkista saatavilla olevat vaihtoehdot alkuperäisestä tuoteilmoituksesta.
Yritä uudelleen
Tälle tuotteelle ei ole ilmoitettu valittavia malleja.
Mallikuvat ovat viitteellisiä. Vahvista valittu malli ja koko ostopalvelussa.
Muut ostoagentit
Avaa tuote toisen ostoagentin palvelussa. Tarkista hinta ja saatavilla olevat vaihtoehdot siellä.
Etsi ostoagentteja
Ostoagentteja ei löytynyt.
Kopioi Weidian-linkki
Kopioi linkki ja valittu vaihtoehto
Kopioitu
Kopiointi epäonnistui. Valitse ja kopioi alla oleva linkki.
Tee kaikki valinnat ennen vaihtoehdon tietojen kopiointia.
Alkuperäinen Weidian-tuoteilmoitus
Avaa Weidianissa
QC-kuvat
Luettelon lähde ei tarjoa tälle tuotteelle vahvistettuja QC-kuvia.
Lue QC-opas
Luettelokuvat
Nämä ovat luettelon viitekuvia; niitä ei ole merkitty varaston QC-kuviksi.
Suurenna kuva
Sulje
Edellinen kuva
Seuraava kuva
Kuva ei ole saatavilla
Kuva
Tuotetunnus
Malli
Loppuunmyyty
Saatavilla olevat vaihtoehdot
Viitehinta
Arvioitu valuuttamuunnos. Toimitus, verot ja palvelumaksut eivät sisälly hintaan.
Viitekurssit
Kurssin päivämäärä
Valuuttakurssit eivät ole tilapäisesti saatavilla. Hinnat näytetään alkuperäisessä valuutassa.
Päivitetään valuuttakursseja…
Muunnettu valuutasta
Näytä lisää tuotteita
Kopioi valitun vaihtoehdon tiedot
Valitse malli ja koko nähdäksesi alkuperäisen tuoteilmoituksen hinnan.
Alkuperäinen linkki avaa tuotteen. Kopioitu malli, koko ja SKU auttavat valitsemaan saman vaihtoehdon siellä.
Takaisin tuotekuviin
Tuote ei ole saatavilla
Sivua ei löytynyt
Hubbuy-tuotelista
Etsi tuotteita
Lisää kuvia
Alkuperäinen tuotenimi
Tuotteen nimi alkuperäisessä tuoteilmoituksessa.
`);

addLocale('el', `
Νόμισμα
Γλώσσα
Επιλογή γλώσσας
Γλώσσες
Φωτογραφίες προϊόντος
Σχέδια
Επιλέξτε σχέδιο
Μέγεθος
Επιλέξτε μέγεθος
Επιλεγμένη παραλλαγή
SKU
Φόρτωση σχεδίων…
Δεν ήταν δυνατή η φόρτωση των σχεδίων. Ανοίξτε την αρχική καταχώριση για να ελέγξετε τις διαθέσιμες επιλογές.
Δοκιμάστε ξανά
Δεν αναφέρονται επιλέξιμα σχέδια για αυτό το προϊόν.
Οι φωτογραφίες των σχεδίων είναι ενδεικτικές. Επιβεβαιώστε το επιλεγμένο σχέδιο και μέγεθος στην πλατφόρμα αγοράς.
Άλλοι μεσάζοντες αγορών
Ανοίξτε αυτό το προϊόν σε άλλον μεσάζοντα αγορών. Ελέγξτε εκεί την τιμή και τις διαθέσιμες επιλογές.
Αναζήτηση μεσαζόντων αγορών
Δεν βρέθηκαν μεσάζοντες αγορών.
Αντιγραφή συνδέσμου Weidian
Αντιγραφή συνδέσμου και επιλεγμένης παραλλαγής
Αντιγράφηκε
Η αντιγραφή απέτυχε. Επιλέξτε και αντιγράψτε τον παρακάτω σύνδεσμο.
Ολοκληρώστε την επιλογή πριν αντιγράψετε τα στοιχεία της.
Αρχική καταχώριση στο Weidian
Άνοιγμα στο Weidian
Φωτογραφίες QC
Η πηγή του καταλόγου δεν παρέχει επαληθευμένες φωτογραφίες QC για αυτό το είδος.
Διαβάστε τον οδηγό QC
Φωτογραφίες καταλόγου
Αυτές είναι ενδεικτικές φωτογραφίες του καταλόγου· δεν έχουν χαρακτηριστεί ως φωτογραφίες QC από την αποθήκη.
Μεγέθυνση φωτογραφίας
Κλείσιμο
Προηγούμενη φωτογραφία
Επόμενη φωτογραφία
Η φωτογραφία δεν είναι διαθέσιμη
Εικόνα
ID προϊόντος
Σχέδιο
Εξαντλημένο
Διαθέσιμες επιλογές
Ενδεικτική τιμή
Εκτιμώμενη μετατροπή. Δεν περιλαμβάνονται μεταφορικά, φόροι και χρεώσεις της πλατφόρμας.
Ισοτιμίες αναφοράς
Ημερομηνία ισοτιμίας
Οι συναλλαγματικές ισοτιμίες δεν είναι προσωρινά διαθέσιμες. Οι τιμές παραμένουν στο αρχικό τους νόμισμα.
Ενημέρωση συναλλαγματικών ισοτιμιών…
Μετατροπή από
Εμφάνιση περισσότερων προϊόντων
Αντιγραφή στοιχείων επιλεγμένης παραλλαγής
Επιλέξτε σχέδιο και μέγεθος για να δείτε την τιμή στην αρχική καταχώριση.
Ο αρχικός σύνδεσμος ανοίγει το προϊόν. Το αντιγραμμένο σχέδιο, μέγεθος και SKU σας βοηθούν να επιλέξετε την ίδια παραλλαγή εκεί.
Επιστροφή στις φωτογραφίες του προϊόντος
Το προϊόν δεν είναι διαθέσιμο
Η σελίδα δεν βρέθηκε
Λίστα προϊόντων Hubbuy
Αναζήτηση προϊόντων
Περισσότερες φωτογραφίες
Αρχική ονομασία προϊόντος
Η ονομασία του προϊόντος όπως εμφανίζεται στην αρχική καταχώριση.
`);

addLocale('cs', `
Měna
Jazyk
Vybrat jazyk
Jazyky
Fotografie produktu
Varianty
Vyberte variantu
Velikost
Vyberte velikost
Vybraná možnost
SKU
Načítání variant…
Varianty se nepodařilo načíst. Dostupné možnosti ověřte v původní nabídce.
Zkusit znovu
U tohoto produktu nejsou uvedeny žádné volitelné varianty.
Fotografie variant jsou orientační. Vybranou variantu a velikost potvrďte na nákupní platformě.
Další nákupní zprostředkovatelé
Otevřete tento produkt u jiného nákupního zprostředkovatele. Ověřte tam cenu a dostupné možnosti.
Hledat nákupní zprostředkovatele
Nebyli nalezeni žádní nákupní zprostředkovatelé.
Kopírovat odkaz Weidian
Kopírovat odkaz a vybranou možnost
Zkopírováno
Kopírování se nezdařilo. Označte a zkopírujte odkaz níže.
Před zkopírováním údajů vyberte všechny možnosti.
Původní nabídka na Weidian
Otevřít na Weidian
Fotografie QC
Zdroj katalogu neposkytuje pro tuto položku žádné ověřené fotografie QC.
Přečíst průvodce QC
Katalogové fotografie
Jedná se o referenční fotografie z katalogu; nejsou označeny jako fotografie QC ze skladu.
Zvětšit fotografii
Zavřít
Předchozí fotografie
Další fotografie
Fotografie není dostupná
Obrázek
ID produktu
Varianta
Vyprodáno
Dostupné možnosti
Orientační cena
Odhadovaný přepočet. Nezahrnuje dopravu, daně ani poplatky platformy.
Referenční kurzy
Datum kurzu
Směnné kurzy jsou dočasně nedostupné. Ceny zůstávají v původní měně.
Aktualizace směnných kurzů…
Přepočteno z
Zobrazit další produkty
Kopírovat údaje vybrané možnosti
Vyberte variantu a velikost a zobrazí se cena v původní nabídce.
Původní odkaz otevře produkt. Zkopírovaná varianta, velikost a SKU vám pomohou vybrat stejnou možnost i tam.
Zpět na fotografie produktu
Produkt není dostupný
Stránka nenalezena
Seznam produktů Hubbuy
Hledat produkty
Další fotografie
Původní název produktu
Název produktu uvedený v původní nabídce.
`);

addLocale('hu', `
Pénznem
Nyelv
Nyelv kiválasztása
Nyelvek
Termékfotók
Változatok
Válassz változatot
Méret
Válassz méretet
Kiválasztott opció
SKU
Változatok betöltése…
Nem sikerült betölteni a változatokat. A rendelkezésre álló opciókat az eredeti termékoldalon ellenőrizheted.
Újrapróbálás
Ehhez a termékhez nincsenek megadva választható változatok.
A változatok fotói tájékoztató jellegűek. Ellenőrizd a kiválasztott változatot és méretet a vásárlási platformon.
Más vásárlási közvetítők
Nyisd meg ezt a terméket egy másik vásárlási közvetítőnél. Ott ellenőrizd az árat és a rendelkezésre álló opciókat.
Vásárlási közvetítők keresése
Nem található vásárlási közvetítő.
Weidian-hivatkozás másolása
Hivatkozás és kiválasztott opció másolása
Másolva
A másolás sikertelen. Jelöld ki és másold le az alábbi hivatkozást.
Az adatok másolása előtt válaszd ki az összes szükséges opciót.
Eredeti Weidian-termékoldal
Megnyitás a Weidianon
QC-fotók
A katalógus forrása nem biztosít ellenőrzött QC-fotókat erről a termékről.
QC-útmutató elolvasása
Katalógusfotók
Ezek a katalógus tájékoztató fotói; nincsenek raktári QC-fotóként megjelölve.
Fotó nagyítása
Bezárás
Előző fotó
Következő fotó
A fotó nem érhető el
Kép
Termékazonosító
Változat
Elfogyott
Elérhető opciók
Tájékoztató ár
Becsült átváltás. A szállítási költség, az adók és a platform díjai nem szerepelnek benne.
Referenciaárfolyamok
Árfolyam dátuma
Az árfolyamok átmenetileg nem érhetők el. Az árak az eredeti pénznemben maradnak.
Árfolyamok frissítése…
Átváltás alapja
További termékek megjelenítése
A kiválasztott opció adatainak másolása
Válassz változatot és méretet az eredeti termékoldalon szereplő ár megtekintéséhez.
Az eredeti hivatkozás megnyitja a terméket. A kimásolt változat, méret és SKU segít ugyanazt az opciót kiválasztani ott.
Vissza a termékfotókhoz
A termék nem érhető el
Az oldal nem található
Hubbuy-terméklista
Termékek keresése
További fotók
Eredeti terméknév
A termék neve az eredeti termékoldalon szereplő formában.
`);

addLocale('bg', `
Валута
Език
Избор на език
Езици
Снимки на продукта
Модели
Изберете модел
Размер
Изберете размер
Избрана опция
SKU
Зареждане на моделите…
Моделите не можаха да се заредят. Отворете оригиналната обява, за да проверите наличните опции.
Опитайте отново
За този продукт не са посочени модели за избор.
Снимките на моделите са ориентировъчни. Потвърдете избрания модел и размер в платформата за покупка.
Други посредници за покупки
Отворете този продукт при друг посредник за покупки. Проверете там цената и наличните опции.
Търсене на посредници за покупки
Няма намерени посредници за покупки.
Копиране на връзката към Weidian
Копиране на връзката и избраната опция
Копирано
Копирането не бе успешно. Маркирайте и копирайте връзката по-долу.
Изберете всички опции, преди да копирате съответните данни.
Оригинална обява в Weidian
Отваряне в Weidian
QC снимки
Източникът на каталога не предоставя проверени QC снимки за този артикул.
Прочетете ръководството за QC
Каталожни снимки
Това са ориентировъчни снимки от каталога; те не са обозначени като QC снимки от склада.
Увеличаване на снимката
Затваряне
Предишна снимка
Следваща снимка
Снимката не е налична
Изображение
ID на продукта
Модел
Изчерпан
Налични опции
Ориентировъчна цена
Приблизително преизчисление. Доставката, данъците и таксите на платформата не са включени.
Референтни валутни курсове
Дата на курса
Валутните курсове временно не са налични. Цените остават в оригиналната си валута.
Актуализиране на валутните курсове…
Преизчислено от
Покажи още продукти
Копиране на данните за избраната опция
Изберете модел и размер, за да видите цената в оригиналната обява.
Оригиналната връзка отваря продукта. Копираните модел, размер и SKU ви помагат да изберете същата опция там.
Обратно към снимките на продукта
Продуктът не е наличен
Страницата не е намерена
Списък с продукти на Hubbuy
Търсене на продукти
Още снимки
Оригинално име на продукта
Името на продукта, както е посочено в оригиналната обява.
`);

addLocale('sk', `
Mena
Jazyk
Vybrať jazyk
Jazyky
Fotografie produktu
Varianty
Vyberte variant
Veľkosť
Vyberte veľkosť
Vybraná možnosť
SKU
Načítavajú sa varianty…
Varianty sa nepodarilo načítať. Dostupné možnosti si overte v pôvodnej ponuke.
Skúsiť znova
Pre tento produkt nie sú uvedené žiadne varianty na výber.
Fotografie variantov sú orientačné. Vybraný variant a veľkosť potvrďte na nákupnej platforme.
Ďalší nákupní sprostredkovatelia
Otvorte tento produkt u iného nákupného sprostredkovateľa. Overte si tam cenu a dostupné možnosti.
Hľadať nákupných sprostredkovateľov
Nenašli sa žiadni nákupní sprostredkovatelia.
Kopírovať odkaz Weidian
Kopírovať odkaz a vybranú možnosť
Skopírované
Kopírovanie zlyhalo. Označte a skopírujte odkaz nižšie.
Pred kopírovaním údajov vyberte všetky potrebné možnosti.
Pôvodná ponuka na Weidian
Otvoriť na Weidian
Fotografie QC
Zdroj katalógu neposkytuje pre túto položku žiadne overené fotografie QC.
Prečítať sprievodcu QC
Katalógové fotografie
Toto sú referenčné fotografie z katalógu; nie sú označené ako fotografie QC zo skladu.
Zväčšiť fotografiu
Zavrieť
Predchádzajúca fotografia
Nasledujúca fotografia
Fotografia nie je dostupná
Obrázok
ID produktu
Variant
Vypredané
Dostupné možnosti
Orientačná cena
Odhadovaný prepočet. Nezahŕňa dopravu, dane ani poplatky platformy.
Referenčné kurzy
Dátum kurzu
Výmenné kurzy sú dočasne nedostupné. Ceny zostávajú v pôvodnej mene.
Aktualizujú sa výmenné kurzy…
Prepočítané z
Zobraziť ďalšie produkty
Kopírovať údaje vybranej možnosti
Vyberte variant a veľkosť, aby sa zobrazila cena v pôvodnej ponuke.
Pôvodný odkaz otvorí produkt. Skopírovaný variant, veľkosť a SKU vám pomôžu vybrať si tam rovnakú možnosť.
Späť na fotografie produktu
Produkt nie je dostupný
Stránka sa nenašla
Zoznam produktov Hubbuy
Hľadať produkty
Ďalšie fotografie
Pôvodný názov produktu
Názov produktu uvedený v pôvodnej ponuke.
`);

addLocale('hr', `
Valuta
Jezik
Odaberite jezik
Jezici
Fotografije proizvoda
Modeli
Odaberite model
Veličina
Odaberite veličinu
Odabrana opcija
SKU
Učitavanje modela…
Modele nije bilo moguće učitati. Otvorite izvorni oglas kako biste provjerili dostupne opcije.
Pokušajte ponovno
Za ovaj proizvod nisu navedeni modeli koje je moguće odabrati.
Fotografije modela služe kao referenca. Potvrdite odabrani model i veličinu na platformi za kupnju.
Drugi posrednici za kupnju
Otvorite ovaj proizvod kod drugog posrednika za kupnju. Tamo provjerite cijenu i dostupne opcije.
Pretražite posrednike za kupnju
Nisu pronađeni posrednici za kupnju.
Kopiraj poveznicu za Weidian
Kopiraj poveznicu i odabranu opciju
Kopirano
Kopiranje nije uspjelo. Označite i kopirajte poveznicu u nastavku.
Odaberite sve opcije prije kopiranja njihovih podataka.
Izvorni oglas na Weidianu
Otvori na Weidianu
QC fotografije
Izvor kataloga ne pruža provjerene QC fotografije za ovaj artikl.
Pročitajte vodič za QC
Fotografije iz kataloga
Ovo su referentne fotografije iz kataloga; nisu označene kao QC fotografije iz skladišta.
Povećaj fotografiju
Zatvori
Prethodna fotografija
Sljedeća fotografija
Fotografija nije dostupna
Slika
ID proizvoda
Model
Nema na zalihi
Dostupne opcije
Okvirna cijena
Procijenjena konverzija. Dostava, porezi i naknade platforme nisu uključeni.
Referentni tečajevi
Datum tečaja
Tečajevi trenutačno nisu dostupni. Cijene ostaju u izvornoj valuti.
Ažuriranje tečajeva…
Preračunato iz
Prikaži više proizvoda
Kopiraj podatke odabrane opcije
Odaberite model i veličinu kako biste vidjeli cijenu u izvornom oglasu.
Izvorna poveznica otvara proizvod. Kopirani model, veličina i SKU pomoći će vam da tamo odaberete istu opciju.
Natrag na fotografije proizvoda
Proizvod nije dostupan
Stranica nije pronađena
Hubbuy popis proizvoda
Pretražite proizvode
Više fotografija
Izvorni naziv proizvoda
Naziv proizvoda kako je naveden u izvornom oglasu.
`);

addLocale('zh', `
货币
语言
选择语言
语言
商品图片
款式
选择款式
尺码
选择尺码
已选规格
SKU
正在加载款式…
款式加载失败。请打开原始商品页查看可选规格。
重试
此商品未提供可选款式信息。
款式图片仅供参考。请在购买平台确认所选款式和尺码。
其他代购平台
在其他代购平台打开此商品，并在该平台确认价格和可选规格。
搜索代购平台
未找到代购平台。
复制微店（Weidian）链接
复制链接和所选规格
已复制
复制失败。请选中并复制下方链接。
请先选齐所需选项，再复制对应信息。
微店（Weidian）原始商品页
在微店（Weidian）打开
QC 图片
目录数据源暂未提供此商品经过核实的 QC 图片。
查看 QC 指南
目录商品图片
这些是商品目录中的参考图片，未被标注为仓库 QC 图片。
放大图片
关闭
上一张
下一张
图片暂不可用
图片
商品 ID
款式
缺货
可选规格
参考价格
换算金额仅供参考，不包含运费、税费和平台费用。
参考汇率
汇率日期
汇率暂不可用，价格仍以原始货币显示。
正在更新汇率…
换算自
显示更多商品
复制所选规格信息
选择款式和尺码，查看原始商品页中对应的价格。
原始链接打开的是商品页。复制的款式、尺码和 SKU 可帮助你在该页面选择同一规格。
返回商品图片
商品暂不可用
页面未找到
Hubbuy 商品清单
搜索商品
更多图片
原始商品名称
商品名称与数据源中的名称一致。
`);

addLocale('ja', `
通貨
言語
言語を選択
言語
商品写真
デザイン
デザインを選択
サイズ
サイズを選択
選択中の仕様
SKU
デザインを読み込み中…
デザインを読み込めませんでした。元の商品ページで選択可能な仕様を確認してください。
再試行
この商品には選択可能なデザインの情報がありません。
デザインの写真は参考画像です。購入先のプラットフォームで、選んだデザインとサイズを確認してください。
ほかの購入代行サービス
この商品をほかの購入代行サービスで開きます。移動先で価格と選択可能な仕様を確認してください。
購入代行サービスを検索
購入代行サービスが見つかりません。
Weidianリンクをコピー
リンクと選択した仕様をコピー
コピーしました
コピーできませんでした。下のリンクを選択してコピーしてください。
必要な仕様をすべて選んでから、その情報をコピーしてください。
Weidianの元の商品ページ
Weidianで開く
QC写真
カタログの提供元には、この商品の確認済みQC写真がありません。
QCガイドを読む
カタログ写真
これらはカタログの参考写真です。倉庫で撮影されたQC写真として確認されたものではありません。
写真を拡大
閉じる
前の写真
次の写真
写真を表示できません
画像
商品ID
デザイン
在庫切れ
選択可能な仕様
参考価格
概算の換算額です。送料、税金、プラットフォーム手数料は含まれません。
参考為替レート
レートの日付
為替レートを一時的に取得できません。価格は元の通貨で表示されます。
為替レートを更新中…
換算元
商品をもっと見る
選択した仕様の情報をコピー
デザインとサイズを選ぶと、元の商品ページの対応する価格を確認できます。
元のリンクは商品ページを開きます。コピーしたデザイン、サイズ、SKUを参考に、移動先で同じ仕様を選んでください。
商品写真に戻る
商品を表示できません
ページが見つかりません
Hubbuy商品リスト
商品を検索
ほかの写真
元の商品名
提供元の商品ページに記載されている商品名です。
`);

addLocale('ko', `
통화
언어
언어 선택
언어
상품 사진
디자인
디자인 선택
사이즈
사이즈 선택
선택한 옵션
SKU
디자인을 불러오는 중…
디자인을 불러오지 못했습니다. 원본 상품 페이지에서 선택 가능한 옵션을 확인해 주세요.
다시 시도
이 상품에는 선택 가능한 디자인 정보가 없습니다.
디자인 사진은 참고용입니다. 구매 플랫폼에서 선택한 디자인과 사이즈를 확인해 주세요.
다른 구매대행 플랫폼
다른 구매대행 플랫폼에서 이 상품을 엽니다. 해당 플랫폼에서 가격과 선택 가능한 옵션을 확인해 주세요.
구매대행 플랫폼 검색
구매대행 플랫폼을 찾을 수 없습니다.
Weidian 링크 복사
링크와 선택한 옵션 복사
복사됨
복사하지 못했습니다. 아래 링크를 선택해 복사해 주세요.
필요한 옵션을 모두 선택한 후 해당 정보를 복사해 주세요.
Weidian 원본 상품 페이지
Weidian에서 열기
QC 사진
카탈로그 제공처에서 이 상품의 확인된 QC 사진을 제공하지 않습니다.
QC 가이드 읽기
카탈로그 사진
이 사진은 카탈로그의 참고 이미지이며, 창고 QC 사진으로 확인된 것이 아닙니다.
사진 확대
닫기
이전 사진
다음 사진
사진을 표시할 수 없음
이미지
상품 ID
디자인
품절
선택 가능한 옵션
참고 가격
예상 환산 금액입니다. 배송비, 세금 및 플랫폼 수수료는 포함되지 않습니다.
참고 환율
환율 기준일
일시적으로 환율을 불러올 수 없습니다. 가격은 원래 통화로 표시됩니다.
환율 업데이트 중…
환산 기준 통화
상품 더 보기
선택한 옵션 정보 복사
디자인과 사이즈를 선택하면 원본 상품 페이지의 해당 가격을 볼 수 있습니다.
원본 링크는 상품 페이지를 엽니다. 복사한 디자인, 사이즈 및 SKU를 참고해 해당 페이지에서 같은 옵션을 선택할 수 있습니다.
상품 사진으로 돌아가기
상품을 표시할 수 없음
페이지를 찾을 수 없음
Hubbuy 상품 목록
상품 검색
사진 더 보기
원본 상품명
원본 상품 페이지에 기재된 상품명입니다.
`);

addLocale('vi', `
Tiền tệ
Ngôn ngữ
Chọn ngôn ngữ
Ngôn ngữ
Ảnh sản phẩm
Mẫu
Chọn mẫu
Kích cỡ
Chọn kích cỡ
Tùy chọn đã chọn
SKU
Đang tải các mẫu…
Không tải được các mẫu. Hãy mở trang sản phẩm gốc để kiểm tra những tùy chọn hiện có.
Thử lại
Sản phẩm này không có thông tin về mẫu có thể chọn.
Ảnh mẫu chỉ dùng để tham khảo. Hãy xác nhận mẫu và kích cỡ đã chọn trên nền tảng mua hàng.
Các đơn vị mua hộ khác
Mở sản phẩm này tại một đơn vị mua hộ khác. Hãy kiểm tra giá và các tùy chọn hiện có tại đó.
Tìm đơn vị mua hộ
Không tìm thấy đơn vị mua hộ.
Sao chép liên kết Weidian
Sao chép liên kết và tùy chọn đã chọn
Đã sao chép
Không sao chép được. Hãy chọn và sao chép liên kết bên dưới.
Hãy chọn đầy đủ các tùy chọn trước khi sao chép thông tin tương ứng.
Trang sản phẩm gốc trên Weidian
Mở trên Weidian
Ảnh QC
Nguồn danh mục không cung cấp ảnh QC đã được xác minh cho mặt hàng này.
Đọc hướng dẫn QC
Ảnh trong danh mục
Đây là ảnh tham khảo trong danh mục; chúng không được xác định là ảnh QC tại kho.
Phóng to ảnh
Đóng
Ảnh trước
Ảnh tiếp theo
Ảnh không khả dụng
Hình ảnh
ID sản phẩm
Mẫu
Hết hàng
Các tùy chọn hiện có
Giá tham khảo
Giá quy đổi ước tính, chưa bao gồm vận chuyển, thuế và phí nền tảng.
Tỷ giá tham khảo
Ngày áp dụng tỷ giá
Tỷ giá tạm thời không khả dụng. Giá vẫn được hiển thị bằng loại tiền gốc.
Đang cập nhật tỷ giá…
Quy đổi từ
Hiển thị thêm sản phẩm
Sao chép thông tin tùy chọn đã chọn
Chọn mẫu và kích cỡ để xem giá tương ứng trên trang sản phẩm gốc.
Liên kết gốc mở trang sản phẩm. Mẫu, kích cỡ và SKU đã sao chép giúp bạn chọn đúng tùy chọn đó trên trang này.
Quay lại ảnh sản phẩm
Sản phẩm không khả dụng
Không tìm thấy trang
Danh sách sản phẩm Hubbuy
Tìm sản phẩm
Thêm ảnh
Tên sản phẩm gốc
Tên sản phẩm như được ghi trên trang nguồn.
`);

addLocale('th', `
สกุลเงิน
ภาษา
เลือกภาษา
ภาษา
รูปสินค้า
แบบสินค้า
เลือกแบบสินค้า
ขนาด
เลือกขนาด
ตัวเลือกที่เลือกไว้
SKU
กำลังโหลดแบบสินค้า…
ไม่สามารถโหลดแบบสินค้าได้ กรุณาเปิดหน้าสินค้าต้นฉบับเพื่อตรวจสอบตัวเลือกที่มี
ลองอีกครั้ง
สินค้านี้ไม่มีข้อมูลแบบสินค้าที่เลือกได้
รูปแบบสินค้าใช้เพื่ออ้างอิงเท่านั้น กรุณายืนยันแบบและขนาดที่เลือกบนแพลตฟอร์มที่ใช้ซื้อ
ผู้ให้บริการรับซื้อสินค้าแทนรายอื่น
เปิดสินค้านี้กับผู้ให้บริการรับซื้อสินค้าแทนรายอื่น แล้วตรวจสอบราคาและตัวเลือกที่มีบนแพลตฟอร์มนั้น
ค้นหาผู้ให้บริการรับซื้อสินค้าแทน
ไม่พบผู้ให้บริการรับซื้อสินค้าแทน
คัดลอกลิงก์ Weidian
คัดลอกลิงก์และตัวเลือกที่เลือกไว้
คัดลอกแล้ว
คัดลอกไม่สำเร็จ กรุณาเลือกและคัดลอกลิงก์ด้านล่าง
กรุณาเลือกตัวเลือกให้ครบก่อนคัดลอกข้อมูลอ้างอิง
หน้าสินค้าต้นฉบับบน Weidian
เปิดบน Weidian
รูป QC
แหล่งข้อมูลแคตตาล็อกไม่มีรูป QC ที่ผ่านการยืนยันสำหรับสินค้านี้
อ่านคู่มือ QC
รูปจากแคตตาล็อก
รูปเหล่านี้เป็นรูปอ้างอิงจากแคตตาล็อก ไม่ได้ระบุว่าเป็นรูป QC จากคลังสินค้า
ขยายรูป
ปิด
รูปก่อนหน้า
รูปถัดไป
ไม่สามารถแสดงรูปได้
รูปภาพ
รหัสสินค้า
แบบสินค้า
สินค้าหมด
ตัวเลือกที่มี
ราคาอ้างอิง
เป็นการแปลงสกุลเงินโดยประมาณ ไม่รวมค่าจัดส่ง ภาษี และค่าธรรมเนียมแพลตฟอร์ม
อัตราแลกเปลี่ยนอ้างอิง
วันที่ของอัตราแลกเปลี่ยน
อัตราแลกเปลี่ยนไม่พร้อมใช้งานชั่วคราว ราคายังคงแสดงในสกุลเงินเดิม
กำลังอัปเดตอัตราแลกเปลี่ยน…
แปลงจาก
แสดงสินค้าเพิ่มเติม
คัดลอกข้อมูลตัวเลือกที่เลือกไว้
เลือกแบบสินค้าและขนาดเพื่อดูราคาที่ตรงกันในหน้าสินค้าต้นฉบับ
ลิงก์ต้นฉบับจะเปิดหน้าสินค้า แบบสินค้า ขนาด และ SKU ที่คัดลอกไว้จะช่วยให้คุณเลือกตัวเลือกเดียวกันในหน้านั้นได้
กลับไปที่รูปสินค้า
สินค้าไม่พร้อมใช้งาน
ไม่พบหน้า
รายการสินค้า Hubbuy
ค้นหาสินค้า
รูปเพิ่มเติม
ชื่อสินค้าต้นฉบับ
ชื่อสินค้าตามที่ระบุในหน้าสินค้าต้นฉบับ
`);

addLocale('id', `
Mata uang
Bahasa
Pilih bahasa
Bahasa
Foto produk
Model
Pilih model
Ukuran
Pilih ukuran
Opsi terpilih
SKU
Memuat model…
Model tidak dapat dimuat. Buka halaman produk asli untuk memeriksa opsi yang tersedia.
Coba lagi
Tidak ada model yang dapat dipilih untuk produk ini dalam data yang tersedia.
Foto model hanya sebagai referensi. Konfirmasikan model dan ukuran yang dipilih di platform pembelian.
Agen pembelian lainnya
Buka produk ini melalui agen pembelian lain. Periksa harga dan opsi yang tersedia di platform tersebut.
Cari agen pembelian
Tidak ada agen pembelian yang ditemukan.
Salin tautan Weidian
Salin tautan dan opsi terpilih
Disalin
Gagal menyalin. Pilih dan salin tautan di bawah ini.
Pilih semua opsi yang diperlukan sebelum menyalin detailnya.
Halaman produk asli di Weidian
Buka di Weidian
Foto QC
Sumber katalog tidak menyediakan foto QC yang terverifikasi untuk barang ini.
Baca panduan QC
Foto katalog
Ini adalah foto referensi dari katalog; foto-foto ini tidak ditandai sebagai foto QC dari gudang.
Perbesar foto
Tutup
Foto sebelumnya
Foto berikutnya
Foto tidak tersedia
Gambar
ID produk
Model
Stok habis
Opsi yang tersedia
Harga referensi
Perkiraan konversi. Belum termasuk ongkos kirim, pajak, dan biaya platform.
Kurs referensi
Tanggal kurs
Kurs sementara tidak tersedia. Harga tetap ditampilkan dalam mata uang asal.
Memperbarui kurs…
Dikonversi dari
Tampilkan lebih banyak produk
Salin detail opsi terpilih
Pilih model dan ukuran untuk melihat harga yang sesuai di halaman produk asli.
Tautan asli membuka halaman produk. Model, ukuran, dan SKU yang disalin membantu Anda memilih opsi yang sama di sana.
Kembali ke foto produk
Produk tidak tersedia
Halaman tidak ditemukan
Daftar produk Hubbuy
Cari produk
Foto lainnya
Nama produk asli
Nama produk sebagaimana tercantum di halaman sumber.
`);

const addendum = {
  de: ['Herrenmodell', 'Damenmodell', 'Ab', 'Diese Kombination ist nicht verfügbar. Wähle eine andere Option.', 'Produktquelle'],
  'pt-br': ['Modelo masculino', 'Modelo feminino', 'A partir de', 'Esta combinação não está disponível. Escolha outra opção.', 'Fonte do produto'],
  fr: ['Modèle homme', 'Modèle femme', 'À partir de', 'Cette combinaison n’est pas disponible. Choisissez une autre option.', 'Source du produit'],
  es: ['Modelo de hombre', 'Modelo de mujer', 'Desde', 'Esta combinación no está disponible. Elige otra opción.', 'Fuente del producto'],
  it: ['Modello da uomo', 'Modello da donna', 'Da', 'Questa combinazione non è disponibile. Scegli un’altra opzione.', 'Fonte del prodotto'],
  nl: ['Herenmodel', 'Damesmodel', 'Vanaf', 'Deze combinatie is niet beschikbaar. Kies een andere optie.', 'Productbron'],
  pl: ['Model męski', 'Model damski', 'Od', 'Ta kombinacja jest niedostępna. Wybierz inną opcję.', 'Źródło produktu'],
  ro: ['Model pentru bărbați', 'Model pentru femei', 'De la', 'Această combinație nu este disponibilă. Alege altă opțiune.', 'Sursa produsului'],
  sv: ['Herrmodell', 'Dammodell', 'Från', 'Den här kombinationen är inte tillgänglig. Välj ett annat alternativ.', 'Produktkälla'],
  da: ['Herremodel', 'Damemodel', 'Fra', 'Denne kombination er ikke tilgængelig. Vælg en anden mulighed.', 'Produktkilde'],
  fi: ['Miesten malli', 'Naisten malli', 'Alkaen', 'Tämä yhdistelmä ei ole saatavilla. Valitse toinen vaihtoehto.', 'Tuotteen lähde'],
  el: ['Ανδρικό σχέδιο', 'Γυναικείο σχέδιο', 'Από', 'Αυτός ο συνδυασμός δεν είναι διαθέσιμος. Επιλέξτε άλλη επιλογή.', 'Πηγή προϊόντος'],
  cs: ['Pánský model', 'Dámský model', 'Od', 'Tato kombinace není dostupná. Vyberte jinou možnost.', 'Zdroj produktu'],
  hu: ['Férfi változat', 'Női változat', 'Kezdőár:', 'Ez a kombináció nem érhető el. Válassz másik opciót.', 'A termék forrása'],
  bg: ['Мъжки модел', 'Дамски модел', 'От', 'Тази комбинация не е налична. Изберете друга опция.', 'Източник на продукта'],
  sk: ['Pánsky model', 'Dámsky model', 'Od', 'Táto kombinácia nie je dostupná. Vyberte inú možnosť.', 'Zdroj produktu'],
  hr: ['Muški model', 'Ženski model', 'Od', 'Ova kombinacija nije dostupna. Odaberite drugu opciju.', 'Izvor proizvoda'],
  zh: ['男款', '女款', '起价', '此规格组合暂不可用，请选择其他选项。', '商品来源'],
  ja: ['メンズモデル', 'レディースモデル', '最低価格', 'この組み合わせは選べません。別の仕様を選択してください。', '商品の出典'],
  ko: ['남성용 디자인', '여성용 디자인', '최저', '이 조합은 선택할 수 없습니다. 다른 옵션을 선택해 주세요.', '상품 출처'],
  vi: ['Mẫu nam', 'Mẫu nữ', 'Từ', 'Tổ hợp này không khả dụng. Vui lòng chọn tùy chọn khác.', 'Nguồn sản phẩm'],
  th: ['แบบผู้ชาย', 'แบบผู้หญิง', 'เริ่มต้น', 'ไม่มีตัวเลือกชุดนี้ กรุณาเลือกตัวเลือกอื่น', 'แหล่งที่มาของสินค้า'],
  id: ['Model pria', 'Model wanita', 'Mulai', 'Kombinasi ini tidak tersedia. Pilih opsi lain.', 'Sumber produk'],
};
for (const [locale, values] of Object.entries(addendum)) {
  if (values.length !== addendumKeys.length) throw new Error(`Incomplete experience addendum: ${locale}`);
  Object.assign(experienceTranslations[locale], Object.fromEntries(addendumKeys.map((key, index) => [key, values[index]])));
}

const readingCopy = {
  de: ['Nach Abschnitten lesen', 'Alle ausklappen', 'Alle einklappen', 'Weniger anzeigen'],
  'pt-br': ['Ler por seção', 'Expandir tudo', 'Recolher tudo', 'Mostrar menos'],
  fr: ['Lire par section', 'Tout développer', 'Tout réduire', 'Afficher moins'],
  es: ['Leer por secciones', 'Expandir todo', 'Contraer todo', 'Mostrar menos'],
  it: ['Leggi per sezione', 'Espandi tutto', 'Comprimi tutto', 'Mostra meno'],
  nl: ['Per onderdeel lezen', 'Alles uitklappen', 'Alles inklappen', 'Minder tonen'],
  pl: ['Czytaj według sekcji', 'Rozwiń wszystko', 'Zwiń wszystko', 'Pokaż mniej'],
  ro: ['Citește pe secțiuni', 'Extinde tot', 'Restrânge tot', 'Arată mai puțin'],
  sv: ['Läs avsnittsvis', 'Fäll ut alla', 'Fäll ihop alla', 'Visa mindre'],
  da: ['Læs afsnit for afsnit', 'Fold alle ud', 'Fold alle sammen', 'Vis mindre'],
  fi: ['Lue osio kerrallaan', 'Laajenna kaikki', 'Supista kaikki', 'Näytä vähemmän'],
  el: ['Ανάγνωση ανά ενότητα', 'Ανάπτυξη όλων', 'Σύμπτυξη όλων', 'Εμφάνιση λιγότερων'],
  cs: ['Číst po sekcích', 'Rozbalit vše', 'Sbalit vše', 'Zobrazit méně'],
  hu: ['Olvasás szakaszonként', 'Összes kibontása', 'Összes összecsukása', 'Kevesebb megjelenítése'],
  bg: ['Четене по раздели', 'Разгъни всички', 'Свий всички', 'Покажи по-малко'],
  sk: ['Čítať po sekciách', 'Rozbaliť všetko', 'Zbaliť všetko', 'Zobraziť menej'],
  hr: ['Čitaj po odjeljcima', 'Proširi sve', 'Sažmi sve', 'Prikaži manje'],
  zh: ['按章节阅读', '展开全部', '收起全部', '收起'],
  ja: ['セクションごとに読む', 'すべて展開', 'すべて折りたたむ', '表示を減らす'],
  ko: ['섹션별로 읽기', '모두 펼치기', '모두 접기', '간략히 보기'],
  vi: ['Đọc theo từng mục', 'Mở rộng tất cả', 'Thu gọn tất cả', 'Hiển thị ít hơn'],
  th: ['อ่านทีละส่วน', 'ขยายทั้งหมด', 'ยุบทั้งหมด', 'แสดงน้อยลง'],
  id: ['Baca per bagian', 'Perluas semua', 'Ciutkan semua', 'Tampilkan lebih sedikit'],
};
for (const [locale, values] of Object.entries(readingCopy)) {
  if (values.length !== readingKeys.length) throw new Error(`Incomplete reading translation: ${locale}`);
  Object.assign(experienceTranslations[locale], Object.fromEntries(readingKeys.map((key, index) => [key, values[index]])));
}

const faqCopy = {
  de: [
    'Kein Katalog kann den aktuellen Lagerbestand oder den endgültigen Preis beim Bezahlen garantieren. Nutze die Währungsauswahl für geschätzte Umrechnungen. Produktkarten im Katalog können auf Referenzpreisen in USD basieren, während für eine ausgewählte Weidian-Variante der Originalpreis in CNY verwendet wird. Versand, Steuern und Plattformgebühren kommen gesondert hinzu. Prüfe Artikel, Variante und Gesamtbetrag auf der Kaufplattform.',
    'Suche nach Produktname, ursprünglicher ID oder Link, um Ergebnisse aus dem Katalog dieser Website anzuzeigen. Mit der Bildersuche kannst du ein Foto auf deinem Gerät mit dem indexierten Katalog vergleichen.',
  ],
  'pt-br': [
    'Nenhum catálogo pode garantir o estoque atual ou o preço final no checkout. Use o seletor de moeda para obter conversões estimadas. Os cartões do catálogo podem usar preços de referência em USD como base, enquanto uma opção selecionada no Weidian usa o preço original em CNY. Frete, impostos e taxas da plataforma são cobrados à parte; confirme o item, a opção e o valor total na plataforma de compra.',
    'Pesquise pelo nome do produto, ID original ou link para ver os resultados do catálogo deste site. Use a busca por imagem para comparar uma foto com o catálogo indexado no seu dispositivo.',
  ],
  fr: [
    'Aucun catalogue ne peut garantir le stock actuel ni le prix final au moment du paiement. Utilisez le sélecteur de devise pour obtenir des conversions estimatives. Les fiches du catalogue peuvent se baser sur des prix de référence en USD, tandis qu’une option Weidian sélectionnée utilise son prix d’origine en CNY. Les frais de livraison, taxes et frais de plateforme sont en supplément ; vérifiez l’article, l’option et le montant total sur la plateforme d’achat.',
    'Recherchez par nom de produit, identifiant d’origine ou lien pour afficher les résultats du catalogue de ce site. Utilisez la recherche par image pour comparer une photo au catalogue indexé sur votre appareil.',
  ],
  es: [
    'Ningún catálogo puede garantizar las existencias actuales ni el precio final al pagar. Usa el selector de moneda para obtener conversiones estimadas. Las tarjetas del catálogo pueden partir de precios de referencia en USD, mientras que una opción seleccionada de Weidian utiliza su precio original en CNY. El envío, los impuestos y las comisiones de la plataforma se cobran por separado; confirma el artículo, la opción y el importe total en la plataforma de compra.',
    'Busca por nombre del producto, ID original o enlace para ver los resultados del catálogo de este sitio. Usa la búsqueda por imagen para comparar una foto con el catálogo indexado en tu dispositivo.',
  ],
  it: [
    'Nessun catalogo può garantire la disponibilità attuale o il prezzo finale al pagamento. Usa il selettore di valuta per ottenere conversioni indicative. Le schede del catalogo possono basarsi su prezzi di riferimento in USD, mentre un’opzione Weidian selezionata utilizza il suo prezzo originale in CNY. Spedizione, imposte e commissioni della piattaforma sono separate; verifica l’articolo, l’opzione e il totale sulla piattaforma di acquisto.',
    'Cerca per nome del prodotto, ID originale o link per visualizzare i risultati del catalogo di questo sito. Usa la ricerca per immagini per confrontare una foto con il catalogo indicizzato sul tuo dispositivo.',
  ],
  nl: [
    'Geen enkele catalogus kan de actuele voorraad of de definitieve prijs bij het afrekenen garanderen. Gebruik de valutakiezer voor geschatte omrekeningen. Productkaarten in de catalogus kunnen uitgaan van referentieprijzen in USD, terwijl een geselecteerde Weidian-optie de oorspronkelijke prijs in CNY gebruikt. Verzending, belastingen en platformkosten worden apart berekend; controleer het artikel, de optie en het totaalbedrag op het aankoopplatform.',
    'Zoek op productnaam, oorspronkelijke ID of link om resultaten uit de catalogus van deze website te bekijken. Gebruik zoeken op afbeelding om op je apparaat een foto met de geïndexeerde catalogus te vergelijken.',
  ],
  pl: [
    'Żaden katalog nie może zagwarantować aktualnej dostępności ani ostatecznej ceny przy płatności. Użyj selektora waluty, aby uzyskać orientacyjne przeliczenia. Karty produktów w katalogu mogą bazować na cenach referencyjnych w USD, natomiast wybrana opcja z Weidian korzysta z oryginalnej ceny w CNY. Wysyłka, podatki i opłaty platformy są naliczane osobno; sprawdź produkt, opcję i łączną kwotę na platformie zakupowej.',
    'Szukaj według nazwy produktu, oryginalnego identyfikatora lub linku, aby wyświetlić wyniki z katalogu tej witryny. Użyj wyszukiwania obrazem, aby porównać zdjęcie z zaindeksowanym katalogiem na swoim urządzeniu.',
  ],
  ro: [
    'Niciun catalog nu poate garanta stocul actual sau prețul final la plată. Folosește selectorul de monedă pentru conversii estimative. Fișele produselor din catalog pot porni de la prețuri de referință în USD, în timp ce o opțiune Weidian selectată folosește prețul original în CNY. Transportul, taxele și comisioanele platformei se calculează separat; confirmă produsul, opțiunea și totalul pe platforma de cumpărare.',
    'Caută după numele produsului, ID-ul original sau link pentru a vedea rezultatele din catalogul acestui site. Folosește căutarea după imagine pentru a compara o fotografie cu catalogul indexat pe dispozitivul tău.',
  ],
  sv: [
    'Ingen katalog kan garantera aktuellt lagersaldo eller det slutliga priset i kassan. Använd valutaväljaren för uppskattade omräkningar. Produktkorten i katalogen kan utgå från referenspriser i USD, medan ett valt Weidian-alternativ använder sitt ursprungliga pris i CNY. Frakt, skatter och plattformsavgifter tillkommer separat; kontrollera varan, alternativet och totalsumman på köpplattformen.',
    'Sök efter produktnamn, ursprungligt ID eller länk för att se resultat från den här webbplatsens katalog. Använd bildsökning för att jämföra ett foto med den indexerade katalogen på din enhet.',
  ],
  da: [
    'Intet katalog kan garantere den aktuelle lagerbeholdning eller den endelige pris ved betaling. Brug valutavælgeren til vejledende omregninger. Produktkortene i kataloget kan tage udgangspunkt i referencepriser i USD, mens en valgt Weidian-variant bruger sin oprindelige pris i CNY. Fragt, skatter og platformsgebyrer beregnes separat; kontrollér varen, varianten og det samlede beløb på købsplatformen.',
    'Søg efter produktnavn, oprindeligt ID eller link for at se resultater fra denne hjemmesides katalog. Brug billedsøgning til at sammenligne et foto med det indekserede katalog på din enhed.',
  ],
  fi: [
    'Mikään tuoteluettelo ei voi taata ajantasaista saatavuutta tai lopullista hintaa kassalla. Käytä valuuttavalitsinta suuntaa antaviin valuuttamuunnoksiin. Luettelon tuotekorttien hinnat voivat perustua USD-viitehintoihin, kun taas valitun Weidian-vaihtoehdon hinta perustuu sen alkuperäiseen CNY-hintaan. Toimituskulut, verot ja alustan maksut veloitetaan erikseen; tarkista tuote, vaihtoehto ja kokonaishinta ostoalustalla.',
    'Hae tuotteen nimellä, alkuperäisellä tunnisteella tai linkillä nähdäksesi tämän sivuston tuoteluettelon tulokset. Kuvahaulla voit verrata kuvaa indeksoituun luetteloon omalla laitteellasi.',
  ],
  el: [
    'Κανένας κατάλογος δεν μπορεί να εγγυηθεί το τρέχον απόθεμα ή την τελική τιμή κατά την πληρωμή. Χρησιμοποιήστε τον επιλογέα νομίσματος για ενδεικτικές μετατροπές. Οι κάρτες προϊόντων του καταλόγου μπορεί να βασίζονται σε τιμές αναφοράς σε USD, ενώ μια επιλεγμένη παραλλαγή στο Weidian χρησιμοποιεί την αρχική τιμή της σε CNY. Τα μεταφορικά, οι φόροι και οι χρεώσεις της πλατφόρμας υπολογίζονται χωριστά· επιβεβαιώστε το προϊόν, την παραλλαγή και το συνολικό ποσό στην πλατφόρμα αγοράς.',
    'Αναζητήστε με το όνομα του προϊόντος, το αρχικό αναγνωριστικό ή τον σύνδεσμο για να δείτε αποτελέσματα από τον κατάλογο αυτού του ιστοτόπου. Χρησιμοποιήστε την αναζήτηση με εικόνα για να συγκρίνετε μια φωτογραφία με τον ευρετηριασμένο κατάλογο στη συσκευή σας.',
  ],
  cs: [
    'Žádný katalog nemůže zaručit aktuální skladovou dostupnost ani konečnou cenu při placení. Pro orientační přepočty použijte volbu měny. Produktové karty v katalogu mohou vycházet z referenčních cen v USD, zatímco vybraná varianta z Weidian používá původní cenu v CNY. Doprava, daně a poplatky platformy se účtují zvlášť; ověřte produkt, variantu a celkovou částku na nákupní platformě.',
    'Hledejte podle názvu produktu, původního ID nebo odkazu a zobrazte si výsledky z katalogu tohoto webu. Pomocí vyhledávání podle obrázku můžete na svém zařízení porovnat fotografii s indexovaným katalogem.',
  ],
  hu: [
    'Egyetlen katalógus sem tudja garantálni az aktuális készletet vagy a fizetéskor érvényes végösszeget. A pénznemválasztóval becsült átváltásokat kaphatsz. A katalógus termékkártyái USD-ben megadott referenciaárakból indulhatnak ki, míg a kiválasztott Weidian-változat az eredeti, CNY-ban megadott árát használja. A szállítás, az adók és a platform díjai külön fizetendők; ellenőrizd a terméket, a változatot és a végösszeget a vásárlási platformon.',
    'Keress terméknév, eredeti azonosító vagy hivatkozás alapján az oldal katalógusában. A képes kereséssel a saját eszközödön hasonlíthatsz össze egy fotót az indexelt katalógussal.',
  ],
  bg: [
    'Никой каталог не може да гарантира текущата наличност или крайната цена при плащане. Използвайте избора на валута за ориентировъчно превалутиране. Продуктовите карти в каталога може да се базират на референтни цени в USD, докато избраният вариант от Weidian използва оригиналната си цена в CNY. Доставката, данъците и таксите на платформата се начисляват отделно; проверете продукта, варианта и общата сума в платформата за покупка.',
    'Търсете по име на продукта, оригинален идентификатор или връзка, за да видите резултати от каталога на този сайт. Използвайте търсенето по изображение, за да сравните снимка с индексирания каталог на устройството си.',
  ],
  sk: [
    'Žiadny katalóg nemôže zaručiť aktuálnu skladovú dostupnosť ani konečnú cenu pri platení. Na orientačné prepočty použite výber meny. Produktové karty v katalógu môžu vychádzať z referenčných cien v USD, zatiaľ čo vybraný variant z Weidian používa pôvodnú cenu v CNY. Doprava, dane a poplatky platformy sa účtujú osobitne; overte produkt, variant a celkovú sumu na nákupnej platforme.',
    'Hľadajte podľa názvu produktu, pôvodného ID alebo odkazu a zobrazte si výsledky z katalógu tohto webu. Pomocou vyhľadávania podľa obrázka môžete na svojom zariadení porovnať fotografiu s indexovaným katalógom.',
  ],
  hr: [
    'Nijedan katalog ne može jamčiti trenutačnu dostupnost ni konačnu cijenu pri plaćanju. Za okvirno preračunavanje upotrijebite izbornik valute. Kartice proizvoda u katalogu mogu se temeljiti na referentnim cijenama u USD, dok odabrana varijanta s Weidiana upotrebljava izvornu cijenu u CNY. Dostava, porezi i naknade platforme obračunavaju se zasebno; provjerite proizvod, varijantu i ukupan iznos na platformi za kupnju.',
    'Pretražujte prema nazivu proizvoda, izvornom ID-u ili poveznici kako biste vidjeli rezultate iz kataloga ove stranice. Pretraživanjem prema slici možete na svom uređaju usporediti fotografiju s indeksiranim katalogom.',
  ],
  zh: [
    '任何商品目录都无法保证实时库存或结账时的最终价格。你可以通过货币选择器查看估算换算价格。目录商品卡片可能以美元（USD）参考价为换算基础，而选中的微店（Weidian）规格则使用其人民币（CNY）原价。运费、税费和平台费用另计；请在购买平台确认商品、规格及总金额。',
    '输入商品名称、原始商品 ID 或链接，即可查看本站目录中的搜索结果。使用图片搜索时，你可以在自己的设备上将照片与已建立索引的商品目录进行比对。',
  ],
  ja: [
    'どのカタログも、現在の在庫や決済時の最終価格を保証するものではありません。通貨選択で概算の換算価格を確認できます。カタログの商品カードはUSDの参考価格を基準にする場合がありますが、選択したWeidianの仕様には元のCNY価格が使われます。送料、税金、プラットフォームの手数料は別途かかります。購入先のプラットフォームで商品、仕様、合計金額を確認してください。',
    '商品名、元の商品ID、またはリンクで検索すると、このサイトのカタログ内の結果を表示できます。画像検索では、お使いの端末上で写真とインデックス化されたカタログを比較できます。',
  ],
  ko: [
    '어떤 카탈로그도 현재 재고나 결제 시 최종 가격을 보장할 수 없습니다. 통화 선택기로 예상 환산 가격을 확인하세요. 카탈로그의 상품 카드는 USD 기준 가격으로 환산할 수 있지만, 선택한 Weidian 옵션에는 원래 CNY 가격이 사용됩니다. 배송비, 세금, 플랫폼 수수료는 별도입니다. 구매 플랫폼에서 상품, 옵션, 총금액을 확인하세요.',
    '상품명, 원본 상품 ID 또는 링크로 검색하면 이 사이트의 카탈로그 검색 결과를 볼 수 있습니다. 이미지 검색을 사용하면 내 기기에서 사진과 색인된 카탈로그를 비교할 수 있습니다.',
  ],
  vi: [
    'Không danh mục nào có thể bảo đảm tình trạng còn hàng hiện tại hoặc giá cuối cùng khi thanh toán. Dùng bộ chọn tiền tệ để xem mức quy đổi ước tính. Các thẻ sản phẩm trong danh mục có thể lấy giá tham khảo bằng USD làm cơ sở, còn tùy chọn Weidian đã chọn sử dụng giá gốc bằng CNY. Phí vận chuyển, thuế và phí nền tảng được tính riêng; hãy xác nhận sản phẩm, tùy chọn và tổng tiền trên nền tảng mua hàng.',
    'Tìm theo tên sản phẩm, ID gốc hoặc đường dẫn để xem kết quả trong danh mục của trang này. Dùng tìm kiếm bằng hình ảnh để so sánh ảnh với danh mục đã lập chỉ mục ngay trên thiết bị của bạn.',
  ],
  th: [
    'ไม่มีแค็ตตาล็อกใดรับประกันสต็อกปัจจุบันหรือราคาสุดท้ายเมื่อชำระเงินได้ ใช้ตัวเลือกสกุลเงินเพื่อดูราคาแปลงโดยประมาณ การ์ดสินค้าในแค็ตตาล็อกอาจใช้ราคาอ้างอิงในสกุล USD เป็นฐาน ส่วนตัวเลือกสินค้าจาก Weidian ที่เลือกจะใช้ราคาต้นทางในสกุล CNY ค่าจัดส่ง ภาษี และค่าธรรมเนียมแพลตฟอร์มคิดแยกต่างหาก โปรดยืนยันสินค้า ตัวเลือก และยอดรวมบนแพลตฟอร์มที่ใช้ซื้อ',
    'ค้นหาด้วยชื่อสินค้า ID ต้นฉบับ หรือลิงก์ เพื่อดูผลลัพธ์จากแค็ตตาล็อกของเว็บไซต์นี้ ใช้การค้นหาด้วยภาพเพื่อเปรียบเทียบรูปกับแค็ตตาล็อกที่จัดทำดัชนีไว้บนอุปกรณ์ของคุณ',
  ],
  id: [
    'Tidak ada katalog yang dapat menjamin stok saat ini atau harga akhir saat checkout. Gunakan pemilih mata uang untuk melihat perkiraan konversi. Kartu produk di katalog dapat menggunakan harga referensi dalam USD sebagai dasar, sedangkan opsi Weidian yang dipilih menggunakan harga asalnya dalam CNY. Ongkos kirim, pajak, dan biaya platform dihitung terpisah; pastikan produk, opsi, dan jumlah total di platform pembelian.',
    'Cari berdasarkan nama produk, ID asli, atau tautan untuk melihat hasil dari katalog situs ini. Gunakan pencarian gambar untuk membandingkan foto dengan katalog yang sudah diindeks di perangkat Anda.',
  ],
};
for (const [locale, values] of Object.entries(faqCopy)) {
  if (values.length !== faqKeys.length) throw new Error(`Incomplete FAQ translation: ${locale}`);
  Object.assign(experienceTranslations[locale], Object.fromEntries(faqKeys.map((key, index) => [key, values[index]])));
}
