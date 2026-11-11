// Human-reviewed navigation, identity, disclosure and prominent product wording.
// Keep names and model identifiers stable across languages. These values override MT.
export const chromeKeys = [
'Hubbuy Sheet · Independent guide','Not the official Hubbuy website','Products','How to buy','QC guide','Shipping','Articles','Contact','◎','Language','Currency','Register','Register on Hubbuy','Hubbuy spreadsheet finds, product photos and practical buying guides.','Explore','Shipping guide','Site','About','Relationship disclosure','Privacy','Terms','Categories','Shoes','Hoodies','Electronics','Register on Hubbuy ↗','© 2026 Hubbuy Sheet. Independent editorial discovery guide.','Independent from Hubbuy. Product data and photos come from CNBuy Sheet; registration and purchase links open the official Hubbuy website. Confirm the item, variant and total cost there.','Hubbuy Sheet home','Hubbuy','Primary navigation','Choose language','Languages','Open menu','HUBBUY SPREADSHEET','Hubbuy Spreadsheet','Read the QC guide','Open on Weidian','Open in Hubbuy','Browse the full spreadsheet','Timberland x Louis Vuitton','Adidas XLG Runner Deluxe','Asics Gel-1130 × Hal Studios','VLENTION High heels','GUCCI Slippers','Nike ZoomX Vaporfly Next% Running Shoes for Men and Women [11 styles]'];
const identityKeys = ['◎','Hubbuy','Timberland x Louis Vuitton','Adidas XLG Runner Deluxe','Asics Gel-1130 × Hal Studios'];
const derivedKeys = ['Register on Hubbuy ↗','HUBBUY SPREADSHEET'];
const manualKeys = chromeKeys.filter(key => !identityKeys.includes(key) && !derivedKeys.includes(key));
export const chromeTranslations = { en: Object.fromEntries(chromeKeys.map(key => [key,key])) };
function addLocale(locale, text) {
  const values = text.trim().split('\n').map(value => value.trim());
  if (values.length !== manualKeys.length) throw new Error(`Incomplete chrome translation: ${locale} (${values.length}/${manualKeys.length})`);
  const dictionary = Object.fromEntries(manualKeys.map((key,index) => [key,values[index]]));
  for (const key of identityKeys) dictionary[key] = key;
  dictionary['Register on Hubbuy ↗'] = `${dictionary['Register on Hubbuy']} ↗`;
  dictionary['HUBBUY SPREADSHEET'] = dictionary['Hubbuy Spreadsheet'];
  chromeTranslations[locale] = dictionary;
}

addLocale('de', `
Hubbuy Sheet · Unabhängiger Leitfaden
Nicht die offizielle Hubbuy-Website
Produkte
So kaufst du ein
QC-Leitfaden
Versand
Artikel
Kontakt
Sprache
Währung
Registrieren
Bei Hubbuy registrieren
Produktfunde, Produktfotos und praktische Einkaufsleitfäden für Hubbuy.
Entdecken
Versandleitfaden
Website
Über uns
Offenlegung unserer Verbindungen
Datenschutz
Nutzungsbedingungen
Kategorien
Schuhe
Hoodies
Elektronik
© 2026 Hubbuy Sheet. Unabhängiger redaktioneller Einkaufsleitfaden.
Unabhängig von Hubbuy. Produktdaten und Fotos stammen von CNBuy Sheet. Registrierungs- und Kauflinks öffnen die offizielle Hubbuy-Website. Bestätige dort den Artikel, die Variante und die Gesamtkosten.
Hubbuy Sheet – Startseite
Hauptnavigation
Sprache auswählen
Sprachen
Menü öffnen
Hubbuy Produktliste
QC-Leitfaden lesen
Auf Weidian öffnen
In Hubbuy öffnen
Die vollständige Produktliste ansehen
VLENTION High Heels
GUCCI Hausschuhe
Nike ZoomX Vaporfly Next% Laufschuhe für Damen und Herren [11 Varianten]
`);
addLocale('fr', `
Hubbuy Sheet · Guide indépendant
Ce site n’est pas le site officiel de Hubbuy
Produits
Comment acheter
Guide QC
Livraison
Articles
Contact
Langue
Devise
S’inscrire
S’inscrire sur Hubbuy
Sélections de produits, photos et guides d’achat pratiques pour Hubbuy.
Découvrir
Guide de livraison
Site
À propos
Transparence sur nos liens
Confidentialité
Conditions d’utilisation
Catégories
Chaussures
Sweats à capuche
Électronique
© 2026 Hubbuy Sheet. Guide éditorial indépendant pour découvrir des produits.
Ce site est indépendant de Hubbuy. Les données et photos des produits proviennent de CNBuy Sheet ; les liens d’inscription et d’achat ouvrent le site officiel de Hubbuy. Confirmez-y l’article, la variante et le coût total.
Accueil de Hubbuy Sheet
Navigation principale
Choisir une langue
Langues
Ouvrir le menu
Catalogue Hubbuy
Lire le guide QC
Ouvrir sur Weidian
Ouvrir dans Hubbuy
Parcourir le catalogue complet
VLENTION chaussures à talons
GUCCI chaussons
Nike ZoomX Vaporfly Next% chaussures de course pour hommes et femmes [11 modèles]
`);
addLocale('es', `
Hubbuy Sheet · Guía independiente
Este no es el sitio web oficial de Hubbuy
Productos
Cómo comprar
Guía de QC
Envío
Artículos
Contacto
Idioma
Moneda
Registrarse
Registrarse en Hubbuy
Selecciones de productos, fotos y guías prácticas de compra para Hubbuy.
Explorar
Guía de envío
Sitio
Acerca de
Información sobre nuestras vinculaciones
Privacidad
Condiciones de uso
Categorías
Calzado
Sudaderas con capucha
Electrónica
© 2026 Hubbuy Sheet. Guía editorial independiente para descubrir productos.
Este sitio es independiente de Hubbuy. Los datos y las fotos de los productos proceden de CNBuy Sheet; los enlaces de registro y compra abren el sitio web oficial de Hubbuy. Confirma allí el artículo, la variante y el coste total.
Inicio de Hubbuy Sheet
Navegación principal
Elegir idioma
Idiomas
Abrir menú
Catálogo Hubbuy
Leer la guía de QC
Abrir en Weidian
Abrir en Hubbuy
Ver el catálogo completo
VLENTION zapatos de tacón
GUCCI zapatillas de casa
Nike ZoomX Vaporfly Next% zapatillas de running para hombre y mujer [11 modelos]
`);
addLocale('it', `
Hubbuy Sheet · Guida indipendente
Questo non è il sito ufficiale di Hubbuy
Prodotti
Come acquistare
Guida QC
Spedizione
Articoli
Contatti
Lingua
Valuta
Registrati
Registrati su Hubbuy
Selezioni di prodotti, foto e guide pratiche agli acquisti per Hubbuy.
Esplora
Guida alle spedizioni
Sito
Chi siamo
Trasparenza sui nostri rapporti
Privacy
Condizioni d’uso
Categorie
Scarpe
Felpe con cappuccio
Elettronica
© 2026 Hubbuy Sheet. Guida editoriale indipendente alla scoperta dei prodotti.
Questo sito è indipendente da Hubbuy. I dati e le foto dei prodotti provengono da CNBuy Sheet; i link di registrazione e acquisto aprono il sito ufficiale di Hubbuy. Conferma lì l’articolo, la variante e il costo totale.
Home di Hubbuy Sheet
Navigazione principale
Scegli la lingua
Lingue
Apri menu
Catalogo Hubbuy
Leggi la guida QC
Apri su Weidian
Apri in Hubbuy
Sfoglia il catalogo completo
VLENTION scarpe con tacco
GUCCI pantofole
Nike ZoomX Vaporfly Next% scarpe da corsa da uomo e da donna [11 modelli]
`);
addLocale('nl', `
Hubbuy Sheet · Onafhankelijke gids
Dit is niet de officiële website van Hubbuy
Producten
Zo koop je
QC-gids
Verzending
Artikelen
Contact
Taal
Valuta
Registreren
Registreren bij Hubbuy
Productvondsten, productfoto’s en praktische koopgidsen voor Hubbuy.
Ontdekken
Verzendgids
Website
Over ons
Toelichting op onze relaties
Privacy
Gebruiksvoorwaarden
Categorieën
Schoenen
Hoodies
Elektronica
© 2026 Hubbuy Sheet. Onafhankelijke redactionele gids om producten te ontdekken.
Deze site staat los van Hubbuy. Productgegevens en foto’s komen van CNBuy Sheet; registratie- en kooplinks openen de officiële website van Hubbuy. Controleer daar het artikel, de variant en de totale kosten.
Hubbuy Sheet – startpagina
Hoofdnavigatie
Taal kiezen
Talen
Menu openen
Hubbuy-productoverzicht
Lees de QC-gids
Openen op Weidian
Openen in Hubbuy
Bekijk het volledige productoverzicht
VLENTION schoenen met hoge hakken
GUCCI pantoffels
Nike ZoomX Vaporfly Next% hardloopschoenen voor dames en heren [11 modellen]
`);
addLocale('pt-br', `
Hubbuy Sheet · Guia independente
Este não é o site oficial da Hubbuy
Produtos
Como comprar
Guia de QC
Frete
Artigos
Contato
Idioma
Moeda
Cadastre-se
Cadastre-se na Hubbuy
Seleções de produtos, fotos e guias práticos de compra para a Hubbuy.
Explorar
Guia de frete
Site
Sobre
Divulgação de vínculos
Privacidade
Termos de uso
Categorias
Calçados
Moletons com capuz
Eletrônicos
© 2026 Hubbuy Sheet. Guia editorial independente para descobrir produtos.
Este site é independente da Hubbuy. Os dados e as fotos dos produtos vêm de CNBuy Sheet; os links de cadastro e compra abrem o site oficial da Hubbuy. Confirme lá o item, a variante e o custo total.
Página inicial de Hubbuy Sheet
Navegação principal
Escolher idioma
Idiomas
Abrir menu
Catálogo Hubbuy
Ler o guia de QC
Abrir na Weidian
Abrir na Hubbuy
Ver o catálogo completo
VLENTION sapatos de salto alto
GUCCI pantufas
Nike ZoomX Vaporfly Next% tênis de corrida masculinos e femininos [11 modelos]
`);
addLocale('pl', `
Hubbuy Sheet · Niezależny poradnik
To nie jest oficjalna strona Hubbuy
Produkty
Jak kupować
Poradnik QC
Wysyłka
Artykuły
Kontakt
Język
Waluta
Zarejestruj się
Zarejestruj się w Hubbuy
Wybrane produkty, zdjęcia i praktyczne poradniki zakupowe dla Hubbuy.
Odkrywaj
Poradnik wysyłki
Serwis
O nas
Informacje o naszych powiązaniach
Prywatność
Warunki korzystania
Kategorie
Obuwie
Bluzy z kapturem
Elektronika
© 2026 Hubbuy Sheet. Niezależny poradnik redakcyjny pomagający odkrywać produkty.
Ten serwis jest niezależny od Hubbuy. Dane i zdjęcia produktów pochodzą z CNBuy Sheet; linki rejestracji i zakupu otwierają oficjalną stronę Hubbuy. Potwierdź tam produkt, wariant i całkowity koszt.
Strona główna Hubbuy Sheet
Nawigacja główna
Wybierz język
Języki
Otwórz menu
Katalog Hubbuy
Przeczytaj poradnik QC
Otwórz w Weidian
Otwórz w Hubbuy
Przeglądaj pełny katalog
VLENTION buty na wysokim obcasie
GUCCI kapcie
Nike ZoomX Vaporfly Next% buty do biegania dla kobiet i mężczyzn [11 modeli]
`);
addLocale('ro', `
Hubbuy Sheet · Ghid independent
Acesta nu este site-ul oficial Hubbuy
Produse
Cum cumperi
Ghid QC
Livrare
Articole
Contact
Limbă
Monedă
Înregistrare
Înregistrează-te pe Hubbuy
Selecții de produse, fotografii și ghiduri practice de cumpărături pentru Hubbuy.
Explorează
Ghid de livrare
Site
Despre noi
Transparența relațiilor noastre
Confidențialitate
Condiții de utilizare
Categorii
Încălțăminte
Hanorace
Electronice
© 2026 Hubbuy Sheet. Ghid editorial independent pentru descoperirea produselor.
Acest site este independent de Hubbuy. Datele și fotografiile produselor provin de la CNBuy Sheet; linkurile de înregistrare și cumpărare deschid site-ul oficial Hubbuy. Confirmă acolo produsul, varianta și costul total.
Pagina principală Hubbuy Sheet
Navigare principală
Alege limba
Limbi
Deschide meniul
Catalog Hubbuy
Citește ghidul QC
Deschide pe Weidian
Deschide în Hubbuy
Vezi catalogul complet
VLENTION pantofi cu toc înalt
GUCCI papuci
Nike ZoomX Vaporfly Next% pantofi de alergare pentru femei și bărbați [11 modele]
`);
addLocale('sv', `
Hubbuy Sheet · Oberoende guide
Det här är inte den officiella webbplatsen för Hubbuy
Produkter
Så handlar du
QC-guide
Frakt
Artiklar
Kontakt
Språk
Valuta
Registrera dig
Registrera dig på Hubbuy
Utvalda produkter, produktbilder och praktiska köpguider för Hubbuy.
Utforska
Fraktguide
Webbplats
Om oss
Information om våra relationer
Integritet
Användarvillkor
Kategorier
Skor
Huvtröjor
Elektronik
© 2026 Hubbuy Sheet. Oberoende redaktionell guide för att upptäcka produkter.
Den här webbplatsen är oberoende av Hubbuy. Produktdata och bilder kommer från CNBuy Sheet; registrerings- och köplänkar öppnar den officiella webbplatsen för Hubbuy. Bekräfta produkt, variant och totalkostnad där.
Hubbuy Sheet – startsida
Huvudmeny
Välj språk
Språk
Öppna menyn
Hubbuy-produktlista
Läs QC-guiden
Öppna på Weidian
Öppna i Hubbuy
Se hela produktlistan
VLENTION högklackade skor
GUCCI tofflor
Nike ZoomX Vaporfly Next% löparskor för damer och herrar [11 modeller]
`);
addLocale('zh', `
Hubbuy Sheet · 独立指南
本站并非 Hubbuy 官方网站
商品
购买指南
QC 验货指南
运输
文章
联系
语言
货币
注册
在 Hubbuy 注册
Hubbuy 商品表精选、商品图片与实用购买指南。
探索
运输指南
网站
关于我们
关联关系说明
隐私政策
使用条款
商品分类
鞋类
连帽卫衣
电子产品
© 2026 Hubbuy Sheet。独立编辑的商品发现指南。
本站独立于 Hubbuy。商品数据和图片来自 CNBuy Sheet；注册和购买链接将打开 Hubbuy 官方网站。请在那里确认商品、款式和总费用。
Hubbuy Sheet 首页
主导航
选择语言
语言列表
打开菜单
Hubbuy 商品表
阅读 QC 验货指南
在微店 Weidian 打开
在 Hubbuy 打开
浏览完整商品表
VLENTION 高跟鞋
GUCCI 拖鞋
Nike ZoomX Vaporfly Next% 男女跑鞋 [11 款]
`);
addLocale('da', `
Hubbuy Sheet · Uafhængig guide
Dette er ikke den officielle hjemmeside for Hubbuy
Produkter
Sådan køber du
QC-guide
Forsendelse
Artikler
Kontakt
Sprog
Valuta
Opret konto
Opret konto hos Hubbuy
Udvalgte produkter, produktbilleder og praktiske købsguider til Hubbuy.
Udforsk
Forsendelsesguide
Hjemmeside
Om os
Oplysninger om vores relationer
Privatliv
Brugsvilkår
Kategorier
Sko
Hættetrøjer
Elektronik
© 2026 Hubbuy Sheet. Uafhængig redaktionel guide til at finde produkter.
Denne hjemmeside er uafhængig af Hubbuy. Produktdata og billeder kommer fra CNBuy Sheet; links til registrering og køb åbner den officielle hjemmeside for Hubbuy. Bekræft varen, varianten og den samlede pris der.
Hubbuy Sheet – forside
Hovednavigation
Vælg sprog
Sprog
Åbn menu
Hubbuy-produktoversigt
Læs QC-guiden
Åbn på Weidian
Åbn i Hubbuy
Se hele produktoversigten
VLENTION højhælede sko
GUCCI hjemmesko
Nike ZoomX Vaporfly Next% løbesko til kvinder og mænd [11 modeller]
`);
addLocale('fi', `
Hubbuy Sheet · Riippumaton opas
Tämä ei ole Hubbuy-palvelun virallinen verkkosivusto
Tuotteet
Näin ostat
QC-opas
Toimitus
Artikkelit
Yhteystiedot
Kieli
Valuutta
Rekisteröidy
Rekisteröidy Hubbuy-palveluun
Tuotelöytöjä, tuotekuvia ja käytännön osto-oppaita Hubbuy-palveluun.
Tutustu
Toimitusopas
Sivusto
Tietoa meistä
Tietoa sidonnaisuuksistamme
Tietosuoja
Käyttöehdot
Kategoriat
Kengät
Hupparit
Elektroniikka
© 2026 Hubbuy Sheet. Riippumaton toimituksellinen opas tuotteiden löytämiseen.
Tämä sivusto on riippumaton Hubbuy-palvelusta. Tuotetiedot ja kuvat ovat peräisin CNBuy Sheet -palvelusta. Rekisteröinti- ja ostolinkit avaavat Hubbuy-palvelun virallisen verkkosivuston. Vahvista siellä tuote, vaihtoehto ja kokonaishinta.
Hubbuy Sheet – etusivu
Päänavigaatio
Valitse kieli
Kielet
Avaa valikko
Hubbuy-tuoteluettelo
Lue QC-opas
Avaa Weidian-palvelussa
Avaa Hubbuy-palvelussa
Selaa koko tuoteluetteloa
VLENTION korkokengät
GUCCI tohvelit
Nike ZoomX Vaporfly Next% juoksukengät naisille ja miehille [11 mallia]
`);
addLocale('el', `
Hubbuy Sheet · Ανεξάρτητος οδηγός
Αυτός δεν είναι ο επίσημος ιστότοπος του Hubbuy
Προϊόντα
Πώς να αγοράσετε
Οδηγός QC
Αποστολή
Άρθρα
Επικοινωνία
Γλώσσα
Νόμισμα
Εγγραφή
Εγγραφή στο Hubbuy
Επιλεγμένα προϊόντα, φωτογραφίες και πρακτικοί οδηγοί αγορών για το Hubbuy.
Εξερευνήστε
Οδηγός αποστολής
Ιστότοπος
Σχετικά με εμάς
Γνωστοποίηση των σχέσεών μας
Απόρρητο
Όροι χρήσης
Κατηγορίες
Παπούτσια
Φούτερ με κουκούλα
Ηλεκτρονικά
© 2026 Hubbuy Sheet. Ανεξάρτητος συντακτικός οδηγός για την ανακάλυψη προϊόντων.
Αυτός ο ιστότοπος είναι ανεξάρτητος από το Hubbuy. Τα δεδομένα και οι φωτογραφίες των προϊόντων προέρχονται από το CNBuy Sheet· οι σύνδεσμοι εγγραφής και αγοράς ανοίγουν τον επίσημο ιστότοπο του Hubbuy. Επιβεβαιώστε εκεί το προϊόν, την παραλλαγή και το συνολικό κόστος.
Αρχική σελίδα Hubbuy Sheet
Κύρια πλοήγηση
Επιλέξτε γλώσσα
Γλώσσες
Άνοιγμα μενού
Κατάλογος Hubbuy
Διαβάστε τον οδηγό QC
Άνοιγμα στο Weidian
Άνοιγμα στο Hubbuy
Δείτε τον πλήρη κατάλογο
VLENTION ψηλοτάκουνα παπούτσια
GUCCI παντόφλες
Nike ZoomX Vaporfly Next% παπούτσια τρεξίματος για άνδρες και γυναίκες [11 σχέδια]
`);
addLocale('cs', `
Hubbuy Sheet · Nezávislý průvodce
Toto není oficiální web Hubbuy
Produkty
Jak nakupovat
Průvodce QC
Doprava
Články
Kontakt
Jazyk
Měna
Registrovat se
Registrovat se na Hubbuy
Vybrané produkty, fotografie a praktické nákupní průvodce pro Hubbuy.
Prozkoumat
Průvodce dopravou
Web
O nás
Informace o našich vztazích
Soukromí
Podmínky použití
Kategorie
Obuv
Mikiny s kapucí
Elektronika
© 2026 Hubbuy Sheet. Nezávislý redakční průvodce objevováním produktů.
Tento web je nezávislý na Hubbuy. Údaje a fotografie produktů pocházejí z CNBuy Sheet; registrační a nákupní odkazy otevírají oficiální web Hubbuy. Tam potvrďte produkt, variantu a celkovou cenu.
Hubbuy Sheet – úvodní stránka
Hlavní navigace
Vybrat jazyk
Jazyky
Otevřít nabídku
Katalog Hubbuy
Přečíst průvodce QC
Otevřít na Weidian
Otevřít v Hubbuy
Prohlédnout celý katalog
VLENTION boty na vysokém podpatku
GUCCI pantofle
Nike ZoomX Vaporfly Next% běžecké boty pro ženy a muže [11 variant]
`);
addLocale('hu', `
Hubbuy Sheet · Független útmutató
Ez nem a Hubbuy hivatalos weboldala
Termékek
Hogyan vásárolj
QC-útmutató
Szállítás
Cikkek
Kapcsolat
Nyelv
Pénznem
Regisztráció
Regisztráció a Hubbuy oldalán
Válogatott termékek, termékfotók és gyakorlati vásárlási útmutatók a Hubbuy használatához.
Felfedezés
Szállítási útmutató
Weboldal
Rólunk
Kapcsolataink ismertetése
Adatvédelem
Felhasználási feltételek
Kategóriák
Cipők
Kapucnis pulóverek
Elektronika
© 2026 Hubbuy Sheet. Független szerkesztői útmutató termékek felfedezéséhez.
Ez a weboldal független a Hubbuy szolgáltatástól. A termékadatok és fotók a CNBuy Sheet oldaláról származnak; a regisztrációs és vásárlási hivatkozások a Hubbuy hivatalos weboldalát nyitják meg. Ott ellenőrizd a terméket, a változatot és a teljes költséget.
Hubbuy Sheet – kezdőlap
Fő navigáció
Nyelv kiválasztása
Nyelvek
Menü megnyitása
Hubbuy termékkatalógus
A QC-útmutató elolvasása
Megnyitás a Weidian oldalán
Megnyitás a Hubbuy oldalán
A teljes katalógus böngészése
VLENTION magas sarkú cipők
GUCCI papucsok
Nike ZoomX Vaporfly Next% futócipők nőknek és férfiaknak [11 változat]
`);
addLocale('bg', `
Hubbuy Sheet · Независим наръчник
Това не е официалният уебсайт на Hubbuy
Продукти
Как да купувате
Наръчник за QC
Доставка
Статии
Контакт
Език
Валута
Регистрация
Регистрация в Hubbuy
Подбрани продукти, снимки и практични наръчници за покупки чрез Hubbuy.
Разгледайте
Наръчник за доставка
Уебсайт
За нас
Информация за нашите връзки
Поверителност
Условия за ползване
Категории
Обувки
Суитшърти с качулка
Електроника
© 2026 Hubbuy Sheet. Независим редакционен наръчник за откриване на продукти.
Този уебсайт е независим от Hubbuy. Данните и снимките на продуктите са от CNBuy Sheet; връзките за регистрация и покупка отварят официалния уебсайт на Hubbuy. Потвърдете там продукта, варианта и общата цена.
Начална страница на Hubbuy Sheet
Основна навигация
Избор на език
Езици
Отваряне на менюто
Каталог Hubbuy
Прочетете наръчника за QC
Отваряне в Weidian
Отваряне в Hubbuy
Разгледайте целия каталог
VLENTION обувки на висок ток
GUCCI чехли
Nike ZoomX Vaporfly Next% обувки за бягане за жени и мъже [11 модела]
`);
addLocale('sk', `
Hubbuy Sheet · Nezávislý sprievodca
Toto nie je oficiálna webová stránka Hubbuy
Produkty
Ako nakupovať
Sprievodca QC
Doprava
Články
Kontakt
Jazyk
Mena
Registrovať sa
Registrovať sa na Hubbuy
Vybrané produkty, fotografie a praktickí nákupní sprievodcovia pre Hubbuy.
Preskúmať
Sprievodca dopravou
Web
O nás
Informácie o našich vzťahoch
Súkromie
Podmienky používania
Kategórie
Obuv
Mikiny s kapucňou
Elektronika
© 2026 Hubbuy Sheet. Nezávislý redakčný sprievodca objavovaním produktov.
Tento web je nezávislý od Hubbuy. Údaje a fotografie produktov pochádzajú z CNBuy Sheet; registračné a nákupné odkazy otvárajú oficiálnu webovú stránku Hubbuy. Tam si potvrďte produkt, variant a celkovú cenu.
Hubbuy Sheet – úvodná stránka
Hlavná navigácia
Vybrať jazyk
Jazyky
Otvoriť ponuku
Katalóg Hubbuy
Prečítať sprievodcu QC
Otvoriť na Weidian
Otvoriť v Hubbuy
Prezrieť celý katalóg
VLENTION topánky na vysokom podpätku
GUCCI papuče
Nike ZoomX Vaporfly Next% bežecké topánky pre ženy a mužov [11 variantov]
`);
addLocale('hr', `
Hubbuy Sheet · Neovisni vodič
Ovo nije službena web-stranica Hubbuy
Proizvodi
Kako kupovati
QC vodič
Dostava
Članci
Kontakt
Jezik
Valuta
Registracija
Registrirajte se na Hubbuy
Odabrani proizvodi, fotografije i praktični vodiči za kupnju putem Hubbuy.
Istražite
Vodič za dostavu
Web-stranica
O nama
Informacije o našim vezama
Privatnost
Uvjeti korištenja
Kategorije
Obuća
Majice s kapuljačom
Elektronika
© 2026 Hubbuy Sheet. Neovisni urednički vodič za otkrivanje proizvoda.
Ova je web-stranica neovisna o Hubbuy. Podaci i fotografije proizvoda dolaze iz CNBuy Sheet; poveznice za registraciju i kupnju otvaraju službenu web-stranicu Hubbuy. Ondje potvrdite proizvod, varijantu i ukupni trošak.
Hubbuy Sheet – početna stranica
Glavna navigacija
Odaberite jezik
Jezici
Otvorite izbornik
Hubbuy katalog
Pročitajte QC vodič
Otvorite na Weidian
Otvorite u Hubbuy
Pregledajte cijeli katalog
VLENTION cipele s visokom petom
GUCCI papuče
Nike ZoomX Vaporfly Next% tenisice za trčanje za žene i muškarce [11 modela]
`);
addLocale('ja', `
Hubbuy Sheet · 独立ガイド
Hubbuy の公式サイトではありません
商品
購入方法
QCガイド
配送
記事
お問い合わせ
言語
通貨
登録
Hubbuy に登録
Hubbuy の商品探し、商品写真、実用的な購入ガイド。
探す
配送ガイド
サイト
このサイトについて
関係性の開示
プライバシー
利用規約
カテゴリー
靴
パーカー
電子機器
© 2026 Hubbuy Sheet。独立した編集による商品発見ガイド。
当サイトは Hubbuy から独立しています。商品データと写真は CNBuy Sheet から提供されたもので、登録・購入リンクは Hubbuy 公式サイトを開きます。商品、バリエーション、合計費用はそこで確認してください。
Hubbuy Sheet ホーム
メインナビゲーション
言語を選択
言語一覧
メニューを開く
Hubbuy 商品一覧
QCガイドを読む
Weidian で開く
Hubbuy で開く
商品一覧をすべて見る
VLENTION ハイヒール
GUCCI スリッパ
Nike ZoomX Vaporfly Next% 男女兼用ランニングシューズ [11種類]
`);
addLocale('ko', `
Hubbuy Sheet · 독립 가이드
Hubbuy 공식 웹사이트가 아닙니다
상품
구매 방법
QC 가이드
배송
글
문의
언어
통화
가입
Hubbuy 가입
Hubbuy 상품 모음, 상품 사진과 실용적인 구매 가이드.
둘러보기
배송 가이드
사이트
소개
관계 및 제휴 안내
개인정보 보호
이용약관
카테고리
신발
후드티
전자제품
© 2026 Hubbuy Sheet. 독립적으로 편집한 상품 탐색 가이드.
이 사이트는 Hubbuy와 독립적으로 운영됩니다. 상품 정보와 사진은 CNBuy Sheet에서 제공하며, 가입 및 구매 링크는 Hubbuy 공식 웹사이트로 연결됩니다. 해당 사이트에서 상품, 옵션, 총비용을 확인하세요.
Hubbuy Sheet 홈
주 메뉴
언어 선택
언어 목록
메뉴 열기
Hubbuy 상품 목록
QC 가이드 읽기
Weidian에서 열기
Hubbuy에서 열기
전체 상품 목록 보기
VLENTION 하이힐
GUCCI 슬리퍼
Nike ZoomX Vaporfly Next% 남녀 러닝화 [11가지 스타일]
`);
addLocale('vi', `
Hubbuy Sheet · Hướng dẫn độc lập
Đây không phải là trang web chính thức của Hubbuy
Sản phẩm
Cách mua hàng
Hướng dẫn QC
Vận chuyển
Bài viết
Liên hệ
Ngôn ngữ
Tiền tệ
Đăng ký
Đăng ký trên Hubbuy
Sản phẩm chọn lọc, hình ảnh và hướng dẫn mua hàng thực tế dành cho Hubbuy.
Khám phá
Hướng dẫn vận chuyển
Trang web
Giới thiệu
Thông tin về các mối liên hệ
Quyền riêng tư
Điều khoản sử dụng
Danh mục
Giày dép
Áo hoodie
Đồ điện tử
© 2026 Hubbuy Sheet. Hướng dẫn khám phá sản phẩm được biên soạn độc lập.
Trang web này độc lập với Hubbuy. Dữ liệu và hình ảnh sản phẩm đến từ CNBuy Sheet; các liên kết đăng ký và mua hàng sẽ mở trang web chính thức của Hubbuy. Hãy xác nhận sản phẩm, biến thể và tổng chi phí tại đó.
Trang chủ Hubbuy Sheet
Điều hướng chính
Chọn ngôn ngữ
Danh sách ngôn ngữ
Mở menu
Danh mục Hubbuy
Đọc hướng dẫn QC
Mở trên Weidian
Mở trong Hubbuy
Xem toàn bộ danh mục
VLENTION giày cao gót
GUCCI dép
Nike ZoomX Vaporfly Next% giày chạy bộ nam và nữ [11 mẫu]
`);
addLocale('th', `
Hubbuy Sheet · คู่มืออิสระ
เว็บไซต์นี้ไม่ใช่เว็บไซต์ทางการของ Hubbuy
สินค้า
วิธีซื้อ
คู่มือ QC
การจัดส่ง
บทความ
ติดต่อ
ภาษา
สกุลเงิน
สมัครสมาชิก
สมัครสมาชิกบน Hubbuy
สินค้าคัดสรร รูปสินค้า และคู่มือการซื้อที่ใช้งานได้จริงสำหรับ Hubbuy
สำรวจ
คู่มือการจัดส่ง
เว็บไซต์
เกี่ยวกับเรา
การเปิดเผยความเกี่ยวข้อง
ความเป็นส่วนตัว
ข้อกำหนดการใช้งาน
หมวดหมู่
รองเท้า
เสื้อฮู้ด
อุปกรณ์อิเล็กทรอนิกส์
© 2026 Hubbuy Sheet คู่มือค้นหาสินค้าที่จัดทำโดยกองบรรณาธิการอิสระ
เว็บไซต์นี้ดำเนินงานอย่างอิสระจาก Hubbuy ข้อมูลและรูปสินค้ามาจาก CNBuy Sheet ส่วนลิงก์สมัครสมาชิกและซื้อสินค้าจะเปิดเว็บไซต์ทางการของ Hubbuy โปรดยืนยันสินค้า ตัวเลือก และค่าใช้จ่ายรวมที่นั่น
หน้าแรก Hubbuy Sheet
เมนูหลัก
เลือกภาษา
รายการภาษา
เปิดเมนู
รายการสินค้า Hubbuy
อ่านคู่มือ QC
เปิดบน Weidian
เปิดใน Hubbuy
ดูรายการสินค้าทั้งหมด
VLENTION รองเท้าส้นสูง
GUCCI รองเท้าแตะ
Nike ZoomX Vaporfly Next% รองเท้าวิ่งสำหรับผู้ชายและผู้หญิง [11 แบบ]
`);
addLocale('id', `
Hubbuy Sheet · Panduan independen
Ini bukan situs web resmi Hubbuy
Produk
Cara membeli
Panduan QC
Pengiriman
Artikel
Kontak
Bahasa
Mata uang
Daftar
Daftar di Hubbuy
Pilihan produk, foto produk, dan panduan belanja praktis untuk Hubbuy.
Jelajahi
Panduan pengiriman
Situs
Tentang kami
Pengungkapan hubungan kami
Privasi
Ketentuan penggunaan
Kategori
Sepatu
Hoodie
Elektronik
© 2026 Hubbuy Sheet. Panduan editorial independen untuk menemukan produk.
Situs ini independen dari Hubbuy. Data dan foto produk berasal dari CNBuy Sheet; tautan pendaftaran dan pembelian membuka situs web resmi Hubbuy. Konfirmasikan barang, varian, dan biaya total di sana.
Beranda Hubbuy Sheet
Navigasi utama
Pilih bahasa
Daftar bahasa
Buka menu
Katalog Hubbuy
Baca panduan QC
Buka di Weidian
Buka di Hubbuy
Lihat seluruh katalog
VLENTION sepatu hak tinggi
GUCCI sandal
Nike ZoomX Vaporfly Next% sepatu lari pria dan wanita [11 model]
`);

const faqLabels = {
  en:'FAQ',de:'Häufige Fragen',fr:'Questions fréquentes',es:'Preguntas frecuentes',it:'Domande frequenti',nl:'Veelgestelde vragen','pt-br':'Perguntas frequentes',pl:'Najczęstsze pytania',ro:'Întrebări frecvente',sv:'Vanliga frågor',zh:'常见问题',da:'Ofte stillede spørgsmål',fi:'Usein kysytyt kysymykset',el:'Συχνές ερωτήσεις',cs:'Časté dotazy',hu:'Gyakori kérdések',bg:'Често задавани въпроси',sk:'Časté otázky',hr:'Česta pitanja',ja:'よくある質問',ko:'자주 묻는 질문',vi:'Câu hỏi thường gặp',th:'คำถามที่พบบ่อย',id:'Pertanyaan umum',
};
chromeKeys.push('FAQ');
for (const [locale,label] of Object.entries(faqLabels)) chromeTranslations[locale].FAQ = label;
