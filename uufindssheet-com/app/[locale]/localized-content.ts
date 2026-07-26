import type { Guide } from "../guides/article-data";
import type { PolicyPageData } from "../policy-data";
import {
  germanExtras,
  polishExtras,
  portugueseExtras,
} from "../components/language-extras";
import {
  germanResearchExtras,
  polishResearchExtras,
  portugueseResearchExtras,
} from "../components/research-language-extras";
import {
  germanFaqExtras,
  polishFaqExtras,
  portugueseFaqExtras,
} from "../components/faq-language-extras";
import { localizedRouteCopy } from "./localized-route-content";

export type LocalizedContentLocale = "en-gb" | "de" | "pl" | "pt-br";
type TranslatedLocale = Exclude<LocalizedContentLocale, "en-gb">;

const manualExtras: Record<TranslatedLocale, Record<string, string>> = {
  de: {
    "View details ↗": "Details ansehen ↗",
    "SEO BUYING GUIDE": "SEO-KAUFRATGEBER",
    "QC METHOD": "QC-METHODE",
    "BEGINNER GUIDE": "EINSTEIGER-RATGEBER",
    "COMPARISON": "VERGLEICH",
    "Last updated": "Zuletzt aktualisiert",
    "Direct contact": "Direkter Kontakt",
    "About / Independent guide": "Über uns / Unabhängiger Ratgeber",
    "Research first. Route clearly.": "Zuerst recherchieren. Klar weiterleiten.",
    "What UUFinds Sheet publishes, why it exists and how it stays independent from the services it discusses.":
      "Was UUFinds Sheet veröffentlicht, warum die Website existiert und wie sie von den besprochenen Diensten unabhängig bleibt.",
    "What this site is": "Was diese Website ist",
    "UUFinds Sheet is an independent editorial guide for people researching product links, available QC material and the next browsing step on CNBuy Sheet.":
      "UUFinds Sheet ist ein unabhängiger redaktioneller Ratgeber für Menschen, die Produktlinks, verfügbares QC-Material und den nächsten Browsing-Schritt bei CNBuy Sheet recherchieren.",
    "The site does not claim to be UUFinds, does not process orders and does not sell the products shown in its category or product pages.":
      "Die Website behauptet nicht, UUFinds zu sein, bearbeitet keine Bestellungen und verkauft die auf ihren Kategorie- oder Produktseiten gezeigten Artikel nicht.",
    "What readers can expect": "Was Leser erwarten können",
    "Guides separate a product-discovery lead from QC evidence and current destination-page facts. A saved image, an older QC album and a live listing answer different questions and should not be treated as interchangeable.":
      "Die Ratgeber trennen einen Hinweis aus der Produktsuche von QC-Belegen und aktuellen Fakten der Zielseite. Ein gespeichertes Bild, ein älteres QC-Album und ein aktuelles Angebot beantworten unterschiedliche Fragen und dürfen nicht als austauschbar behandelt werden.",
    "Clear labels for independent editorial content": "Klare Kennzeichnung unabhängiger redaktioneller Inhalte",
    "Direct, identifiable CNBuy Sheet category and product routes": "Direkte, eindeutig erkennbare Kategorie- und Produktwege zu CNBuy Sheet",
    "Dated source checks where features or listing details can change": "Datierte Quellenprüfungen bei veränderlichen Funktionen oder Angebotsdaten",
    "Corrections when a supported factual error is identified": "Korrekturen, wenn ein belegter sachlicher Fehler festgestellt wird",
    "Commercial relationship": "Kommerzielle Beziehung",
    "All outbound shopping, category and product links published on this site lead only to CNBuy Sheet. Editorial pages may discuss publicly described UUFinds functions for research context, but the site is not affiliated with, endorsed by or operated by UUFinds.":
      "Alle auf dieser Website veröffentlichten externen Shopping-, Kategorie- und Produktlinks führen ausschließlich zu CNBuy Sheet. Redaktionelle Seiten können öffentlich beschriebene UUFinds-Funktionen als Recherchekontext erläutern, die Website ist jedoch weder mit UUFinds verbunden noch von UUFinds empfohlen oder betrieben.",
    "Contact / Corrections welcome": "Kontakt / Korrekturen willkommen",
    "Tell us what needs attention.": "Sag uns, was geprüft werden sollte.",
    "Contact UUFinds Sheet about factual corrections, broken routes, privacy questions or editorial policy.":
      "Kontaktiere UUFinds Sheet wegen sachlicher Korrekturen, defekter Wege, Datenschutzfragen oder der Redaktionsrichtlinie.",
    "Editorial and website contact": "Kontakt zu Redaktion und Website",
    "For a factual correction, broken link, policy question or technical problem, email the address below. Include the page URL and the specific statement or route that needs review.":
      "Sende bei einer sachlichen Korrektur, einem defekten Link, einer Richtlinienfrage oder einem technischen Problem eine E-Mail an die unten stehende Adresse. Nenne die Seiten-URL und die konkrete Aussage oder Route, die geprüft werden soll.",
    "Factual or source correction": "Sachliche oder Quellenkorrektur",
    "Broken internal, category or product route": "Defekter interner, Kategorie- oder Produktweg",
    "Privacy or data-handling question": "Frage zu Datenschutz oder Datenverarbeitung",
    "Copyright or rights-holder enquiry": "Anfrage zu Urheberrecht oder Rechteinhabern",
    "What to include": "Welche Angaben hilfreich sind",
    "A precise page URL and a short explanation help us verify the issue. When a correction depends on a public source, include the source URL and the date you viewed it. Do not send passwords, order credentials or payment information.":
      "Eine genaue Seiten-URL und eine kurze Erklärung helfen bei der Prüfung. Wenn eine Korrektur von einer öffentlichen Quelle abhängt, nenne die Quellen-URL und das Datum deines Abrufs. Sende keine Passwörter, Bestellzugänge oder Zahlungsinformationen.",
    "Product and order support": "Produkt- und Bestellsupport",
    "UUFinds Sheet does not process purchases, shipping, returns or refunds. Questions about a live product, order or service term should be directed to the platform responsible for that transaction.":
      "UUFinds Sheet bearbeitet keine Käufe, Sendungen, Rückgaben oder Erstattungen. Fragen zu einem aktuellen Produkt, einer Bestellung oder Servicebedingung müssen an die für die Transaktion verantwortliche Plattform gerichtet werden.",
    "Editorial policy / Source before claim": "Redaktionsrichtlinie / Quelle vor Aussage",
    "How information earns a place here.": "Wie Informationen hier aufgenommen werden.",
    "The sourcing, review, independence and correction standards used by UUFinds Sheet.":
      "Die Standards von UUFinds Sheet für Quellen, Prüfung, Unabhängigkeit und Korrekturen.",
    "Source standard": "Quellenstandard",
    "Feature statements are checked against current public pages from the service being discussed, its official app listing or another directly attributable primary source. A third-party comment can illustrate an experience, but it does not establish a platform-wide fact.":
      "Aussagen zu Funktionen werden anhand aktueller öffentlicher Seiten des besprochenen Dienstes, seines offiziellen App-Eintrags oder einer anderen eindeutig zuordenbaren Primärquelle geprüft. Ein Kommentar Dritter kann eine Erfahrung veranschaulichen, belegt aber keine plattformweite Tatsache.",
    "Evidence boundaries": "Grenzen der Belege",
    "The articles distinguish what is visible from what is inferred. A listing image is not automatically a warehouse QC photo, one photographed unit does not guarantee a later batch, and an old guide does not override current price, stock, sizing or service terms.":
      "Die Artikel unterscheiden Sichtbares von Schlussfolgerungen. Ein Angebotsbild ist nicht automatisch ein Warehouse-QC-Foto, ein fotografiertes Exemplar garantiert keine spätere Charge und ein alter Ratgeber ersetzt keine aktuellen Preise, Bestände, Größen oder Servicebedingungen.",
    "No invented QC-photo counts, fees, shipping prices or exchange-rate markups":
      "Keine erfundenen Anzahlen von QC-Fotos, Gebühren, Versandpreisen oder Wechselkursaufschlägen",
    "No guarantee of quality, authenticity, availability or future batch consistency":
      "Keine Garantie für Qualität, Echtheit, Verfügbarkeit oder Gleichheit späterer Chargen",
    "Dates attached to facts that can materially change": "Datumsangaben bei Fakten, die sich wesentlich ändern können",
    "Exact product or seller matching before QC evidence is treated as relevant":
      "Exakter Produkt- oder Verkäuferabgleich, bevor QC-Belege als relevant gelten",
    "Independence and corrections": "Unabhängigkeit und Korrekturen",
    "Editorial conclusions are not supplied by UUFinds. Shopping routes are limited to CNBuy Sheet and are kept visibly separate from source notes. Supported correction requests are reviewed against the strongest available source and the affected page is updated when necessary.":
      "Redaktionelle Schlussfolgerungen werden nicht von UUFinds vorgegeben. Shopping-Wege sind auf CNBuy Sheet beschränkt und sichtbar von Quellenhinweisen getrennt. Belegte Korrekturanfragen werden anhand der stärksten verfügbaren Quelle geprüft; die betroffene Seite wird bei Bedarf aktualisiert.",
    "Privacy / Minimal collection": "Datenschutz / Minimale Erfassung",
    "Useful measurement without ad tracking.": "Nützliche Messung ohne Werbe-Tracking.",
    "What technical and click information UUFinds Sheet processes, why it is used and what the site does not collect.":
      "Welche technischen und Klickinformationen UUFinds Sheet verarbeitet, wofür sie verwendet werden und was die Website nicht erfasst.",
    "Technical delivery": "Technische Bereitstellung",
    "The site is delivered through Cloudflare. Like other web infrastructure providers, Cloudflare may process request information needed to serve pages securely, prevent abuse and diagnose failures.":
      "Die Website wird über Cloudflare bereitgestellt. Wie andere Webinfrastruktur-Anbieter kann Cloudflare Anfrageinformationen verarbeiten, die für eine sichere Auslieferung, Missbrauchsschutz und Fehlerdiagnose erforderlich sind.",
    "First-party site measurement": "Erstanbieter-Website-Messung",
    "UUFinds Sheet records privacy-limited page-view and click events through a same-origin endpoint. An event can contain the current page path, a short link label and the destination host and path. Search phrases, form field values, passwords and payment information are not included.":
      "UUFinds Sheet erfasst datenschutzbeschränkte Seitenaufruf- und Klickereignisse über einen Same-Origin-Endpunkt. Ein Ereignis kann den aktuellen Seitenpfad, eine kurze Linkbezeichnung sowie Host und Pfad des Ziels enthalten. Suchbegriffe, Formularwerte, Passwörter und Zahlungsinformationen werden nicht einbezogen.",
    "This measurement is used to understand which guides, categories and product routes are useful and to find broken navigation. The tracker does not set an advertising cookie and does not create a cross-site advertising profile.":
      "Diese Messung hilft zu verstehen, welche Ratgeber, Kategorien und Produktwege nützlich sind, und defekte Navigation zu erkennen. Der Tracker setzt kein Werbe-Cookie und erstellt kein websiteübergreifendes Werbeprofil.",
    "Contact and external destinations": "Kontakt und externe Ziele",
    "If you email the site, the information you choose to send is used to review and answer that request. When you follow an external CNBuy Sheet link, the destination site applies its own privacy terms.":
      "Wenn du der Website eine E-Mail sendest, werden die freiwillig übermittelten Angaben zur Prüfung und Beantwortung verwendet. Beim Folgen eines externen CNBuy-Sheet-Links gelten die Datenschutzbedingungen der Zielseite.",
    "Terms / Editorial use": "Bedingungen / Redaktionelle Nutzung",
    "Use the guide as research, not a guarantee.": "Nutze den Ratgeber zur Recherche, nicht als Garantie.",
    "The terms that apply when using UUFinds Sheet content, product routes and independent research guidance.":
      "Die Bedingungen für die Nutzung von UUFinds-Sheet-Inhalten, Produktwegen und unabhängigen Recherchehinweisen.",
    "Informational purpose": "Informationszweck",
    "Content is provided for general research and educational purposes. UUFinds Sheet does not sell products, act as a purchasing agent, process payment or make a purchasing decision for the reader.":
      "Die Inhalte dienen allgemeinen Recherche- und Bildungszwecken. UUFinds Sheet verkauft keine Produkte, handelt nicht als Einkaufsagent, verarbeitet keine Zahlungen und trifft keine Kaufentscheidung für den Leser.",
    "Changing information": "Veränderliche Informationen",
    "Prices, stock, variants, seller information, links, shipping terms and platform features can change after a page is reviewed. Confirm material commercial information on the live destination page before acting.":
      "Preise, Bestand, Varianten, Verkäuferinformationen, Links, Versandbedingungen und Plattformfunktionen können sich nach der Prüfung einer Seite ändern. Bestätige wesentliche kommerzielle Angaben auf der aktuellen Zielseite, bevor du handelst.",
    "A product image is not a guarantee of the delivered item": "Ein Produktbild ist keine Garantie für den gelieferten Artikel",
    "QC media documents a particular photographed item or batch": "QC-Material dokumentiert einen bestimmten fotografierten Artikel oder eine Charge",
    "No statement on this site guarantees authenticity, legality or fitness for a purpose":
      "Keine Aussage dieser Website garantiert Echtheit, Rechtmäßigkeit oder Eignung für einen bestimmten Zweck",
    "Readers are responsible for following laws and platform terms that apply to them":
      "Leser sind selbst dafür verantwortlich, die für sie geltenden Gesetze und Plattformbedingungen einzuhalten",
    "Names, links and availability": "Namen, Links und Verfügbarkeit",
    "Third-party names and links are used to identify the service or destination being discussed. Their appearance does not imply endorsement or affiliation. The site may correct, replace or remove content and routes when information changes or a rights issue is supported.":
      "Namen und Links Dritter dienen zur Identifikation des besprochenen Dienstes oder Ziels. Ihre Nennung bedeutet keine Empfehlung oder Verbindung. Die Website kann Inhalte und Wege korrigieren, ersetzen oder entfernen, wenn sich Informationen ändern oder ein Rechteproblem belegt ist.",
  },
  pl: {
    "View details ↗": "Zobacz szczegóły ↗",
    "SEO BUYING GUIDE": "PORADNIK ZAKUPOWY SEO",
    "QC METHOD": "METODA QC",
    "BEGINNER GUIDE": "PORADNIK DLA POCZĄTKUJĄCYCH",
    "COMPARISON": "PORÓWNANIE",
    "Last updated": "Ostatnia aktualizacja",
    "Direct contact": "Kontakt bezpośredni",
    "About / Independent guide": "O stronie / Niezależny przewodnik",
    "Research first. Route clearly.": "Najpierw sprawdź. Potem przejdź świadomie.",
    "What UUFinds Sheet publishes, why it exists and how it stays independent from the services it discusses.":
      "Co publikuje UUFinds Sheet, dlaczego istnieje i jak zachowuje niezależność od opisywanych usług.",
    "What this site is": "Czym jest ta strona",
    "UUFinds Sheet is an independent editorial guide for people researching product links, available QC material and the next browsing step on CNBuy Sheet.":
      "UUFinds Sheet to niezależny przewodnik redakcyjny dla osób analizujących linki produktów, dostępne materiały QC i kolejny krok przeglądania w CNBuy Sheet.",
    "The site does not claim to be UUFinds, does not process orders and does not sell the products shown in its category or product pages.":
      "Strona nie twierdzi, że jest UUFinds, nie obsługuje zamówień i nie sprzedaje produktów pokazanych na stronach kategorii ani produktów.",
    "What readers can expect": "Czego mogą oczekiwać czytelnicy",
    "Guides separate a product-discovery lead from QC evidence and current destination-page facts. A saved image, an older QC album and a live listing answer different questions and should not be treated as interchangeable.":
      "Poradniki oddzielają trop z wyszukiwania produktu od dowodów QC i aktualnych danych strony docelowej. Zapisane zdjęcie, starszy album QC i aktywna oferta odpowiadają na różne pytania i nie powinny być traktowane wymiennie.",
    "Clear labels for independent editorial content": "Jasne oznaczenia niezależnych treści redakcyjnych",
    "Direct, identifiable CNBuy Sheet category and product routes": "Bezpośrednie, rozpoznawalne ścieżki kategorii i produktów CNBuy Sheet",
    "Dated source checks where features or listing details can change": "Datowane sprawdzenia źródeł przy zmiennych funkcjach lub danych oferty",
    "Corrections when a supported factual error is identified": "Korekty po potwierdzeniu błędu rzeczowego",
    "Commercial relationship": "Relacja handlowa",
    "All outbound shopping, category and product links published on this site lead only to CNBuy Sheet. Editorial pages may discuss publicly described UUFinds functions for research context, but the site is not affiliated with, endorsed by or operated by UUFinds.":
      "Wszystkie zewnętrzne linki zakupowe, kategorii i produktów publikowane na tej stronie prowadzą wyłącznie do CNBuy Sheet. Strony redakcyjne mogą omawiać publicznie opisane funkcje UUFinds jako kontekst badawczy, ale strona nie jest powiązana, wspierana ani prowadzona przez UUFinds.",
    "Contact / Corrections welcome": "Kontakt / Korekty mile widziane",
    "Tell us what needs attention.": "Powiedz, co wymaga uwagi.",
    "Contact UUFinds Sheet about factual corrections, broken routes, privacy questions or editorial policy.":
      "Skontaktuj się z UUFinds Sheet w sprawie korekt rzeczowych, niedziałających ścieżek, pytań o prywatność lub polityki redakcyjnej.",
    "Editorial and website contact": "Kontakt z redakcją i stroną",
    "For a factual correction, broken link, policy question or technical problem, email the address below. Include the page URL and the specific statement or route that needs review.":
      "W sprawie korekty rzeczowej, niedziałającego linku, pytania o zasady lub problemu technicznego napisz na poniższy adres. Podaj URL strony i konkretną treść lub ścieżkę wymagającą sprawdzenia.",
    "Factual or source correction": "Korekta faktu lub źródła",
    "Broken internal, category or product route": "Niedziałająca ścieżka wewnętrzna, kategorii lub produktu",
    "Privacy or data-handling question": "Pytanie o prywatność lub przetwarzanie danych",
    "Copyright or rights-holder enquiry": "Zapytanie dotyczące praw autorskich lub właściciela praw",
    "What to include": "Co warto podać",
    "A precise page URL and a short explanation help us verify the issue. When a correction depends on a public source, include the source URL and the date you viewed it. Do not send passwords, order credentials or payment information.":
      "Dokładny URL strony i krótkie wyjaśnienie ułatwiają weryfikację. Jeśli korekta opiera się na publicznym źródle, podaj jego URL i datę odczytu. Nie wysyłaj haseł, danych logowania do zamówień ani informacji płatniczych.",
    "Product and order support": "Wsparcie dotyczące produktów i zamówień",
    "UUFinds Sheet does not process purchases, shipping, returns or refunds. Questions about a live product, order or service term should be directed to the platform responsible for that transaction.":
      "UUFinds Sheet nie obsługuje zakupów, wysyłki, zwrotów ani refundacji. Pytania o aktualny produkt, zamówienie lub warunki usługi należy kierować do platformy odpowiedzialnej za daną transakcję.",
    "Editorial policy / Source before claim": "Polityka redakcyjna / Źródło przed twierdzeniem",
    "How information earns a place here.": "Jak informacje trafiają na tę stronę.",
    "The sourcing, review, independence and correction standards used by UUFinds Sheet.":
      "Standardy źródeł, weryfikacji, niezależności i korekt stosowane przez UUFinds Sheet.",
    "Source standard": "Standard źródeł",
    "Feature statements are checked against current public pages from the service being discussed, its official app listing or another directly attributable primary source. A third-party comment can illustrate an experience, but it does not establish a platform-wide fact.":
      "Opisy funkcji są sprawdzane na aktualnych publicznych stronach omawianej usługi, w jej oficjalnej karcie aplikacji lub innym bezpośrednio przypisanym źródle pierwotnym. Komentarz osoby trzeciej może zilustrować doświadczenie, ale nie ustanawia faktu dotyczącego całej platformy.",
    "Evidence boundaries": "Granice dowodów",
    "The articles distinguish what is visible from what is inferred. A listing image is not automatically a warehouse QC photo, one photographed unit does not guarantee a later batch, and an old guide does not override current price, stock, sizing or service terms.":
      "Artykuły odróżniają to, co widoczne, od wniosków. Zdjęcie oferty nie jest automatycznie magazynowym zdjęciem QC, jedna sfotografowana sztuka nie gwarantuje późniejszej partii, a stary poradnik nie zastępuje aktualnej ceny, stanu, rozmiarów ani warunków usługi.",
    "No invented QC-photo counts, fees, shipping prices or exchange-rate markups":
      "Brak wymyślonych liczb zdjęć QC, opłat, cen wysyłki lub narzutów kursowych",
    "No guarantee of quality, authenticity, availability or future batch consistency":
      "Brak gwarancji jakości, autentyczności, dostępności lub zgodności przyszłych partii",
    "Dates attached to facts that can materially change": "Daty przy faktach, które mogą istotnie się zmienić",
    "Exact product or seller matching before QC evidence is treated as relevant":
      "Dokładne dopasowanie produktu lub sprzedawcy przed uznaniem materiałów QC za istotne",
    "Independence and corrections": "Niezależność i korekty",
    "Editorial conclusions are not supplied by UUFinds. Shopping routes are limited to CNBuy Sheet and are kept visibly separate from source notes. Supported correction requests are reviewed against the strongest available source and the affected page is updated when necessary.":
      "Wnioski redakcyjne nie są dostarczane przez UUFinds. Ścieżki zakupowe ograniczają się do CNBuy Sheet i są wyraźnie oddzielone od not źródłowych. Uzasadnione prośby o korektę są sprawdzane według najsilniejszego dostępnego źródła, a strona jest w razie potrzeby aktualizowana.",
    "Privacy / Minimal collection": "Prywatność / Minimalne gromadzenie",
    "Useful measurement without ad tracking.": "Przydatny pomiar bez śledzenia reklamowego.",
    "What technical and click information UUFinds Sheet processes, why it is used and what the site does not collect.":
      "Jakie dane techniczne i kliknięcia przetwarza UUFinds Sheet, dlaczego są używane i czego strona nie zbiera.",
    "Technical delivery": "Dostarczanie techniczne",
    "The site is delivered through Cloudflare. Like other web infrastructure providers, Cloudflare may process request information needed to serve pages securely, prevent abuse and diagnose failures.":
      "Strona jest dostarczana przez Cloudflare. Podobnie jak inni dostawcy infrastruktury internetowej, Cloudflare może przetwarzać dane żądania potrzebne do bezpiecznego wyświetlania stron, zapobiegania nadużyciom i diagnozowania awarii.",
    "First-party site measurement": "Własny pomiar strony",
    "UUFinds Sheet records privacy-limited page-view and click events through a same-origin endpoint. An event can contain the current page path, a short link label and the destination host and path. Search phrases, form field values, passwords and payment information are not included.":
      "UUFinds Sheet zapisuje ograniczone pod kątem prywatności zdarzenia wyświetlenia i kliknięcia przez endpoint tej samej domeny. Zdarzenie może zawierać bieżącą ścieżkę strony, krótką etykietę linku oraz host i ścieżkę celu. Frazy wyszukiwania, wartości formularzy, hasła i dane płatnicze nie są uwzględniane.",
    "This measurement is used to understand which guides, categories and product routes are useful and to find broken navigation. The tracker does not set an advertising cookie and does not create a cross-site advertising profile.":
      "Pomiar służy do ustalenia, które poradniki, kategorie i ścieżki produktów są użyteczne, oraz do wykrywania błędnej nawigacji. Tracker nie ustawia reklamowego pliku cookie ani nie tworzy międzywitrynowego profilu reklamowego.",
    "Contact and external destinations": "Kontakt i zewnętrzne cele",
    "If you email the site, the information you choose to send is used to review and answer that request. When you follow an external CNBuy Sheet link, the destination site applies its own privacy terms.":
      "Jeśli wysyłasz e-mail do strony, dobrowolnie przekazane informacje są używane do sprawdzenia i odpowiedzi. Po przejściu do zewnętrznego linku CNBuy Sheet obowiązują zasady prywatności strony docelowej.",
    "Terms / Editorial use": "Warunki / Użycie redakcyjne",
    "Use the guide as research, not a guarantee.": "Traktuj poradnik jako materiał badawczy, nie gwarancję.",
    "The terms that apply when using UUFinds Sheet content, product routes and independent research guidance.":
      "Warunki korzystania z treści UUFinds Sheet, ścieżek produktów i niezależnych wskazówek badawczych.",
    "Informational purpose": "Cel informacyjny",
    "Content is provided for general research and educational purposes. UUFinds Sheet does not sell products, act as a purchasing agent, process payment or make a purchasing decision for the reader.":
      "Treści służą ogólnym celom badawczym i edukacyjnym. UUFinds Sheet nie sprzedaje produktów, nie działa jako agent zakupowy, nie przetwarza płatności i nie podejmuje decyzji zakupowej za czytelnika.",
    "Changing information": "Zmieniające się informacje",
    "Prices, stock, variants, seller information, links, shipping terms and platform features can change after a page is reviewed. Confirm material commercial information on the live destination page before acting.":
      "Ceny, stan, warianty, dane sprzedawcy, linki, warunki wysyłki i funkcje platformy mogą się zmienić po weryfikacji strony. Przed działaniem potwierdź istotne informacje handlowe na aktywnej stronie docelowej.",
    "A product image is not a guarantee of the delivered item": "Zdjęcie produktu nie gwarantuje wyglądu dostarczonego przedmiotu",
    "QC media documents a particular photographed item or batch": "Materiały QC dokumentują konkretną sfotografowaną sztukę lub partię",
    "No statement on this site guarantees authenticity, legality or fitness for a purpose":
      "Żadne stwierdzenie na tej stronie nie gwarantuje autentyczności, legalności ani przydatności do celu",
    "Readers are responsible for following laws and platform terms that apply to them":
      "Czytelnicy odpowiadają za przestrzeganie dotyczących ich przepisów i warunków platform",
    "Names, links and availability": "Nazwy, linki i dostępność",
    "Third-party names and links are used to identify the service or destination being discussed. Their appearance does not imply endorsement or affiliation. The site may correct, replace or remove content and routes when information changes or a rights issue is supported.":
      "Nazwy i linki stron trzecich służą do identyfikacji omawianej usługi lub celu. Ich obecność nie oznacza poparcia ani powiązania. Strona może poprawić, zastąpić lub usunąć treści i ścieżki, gdy zmienią się informacje albo zostanie potwierdzona kwestia prawna.",
  },
  "pt-br": {
    "View details ↗": "Ver detalhes ↗",
    "SEO BUYING GUIDE": "GUIA DE COMPRA SEO",
    "QC METHOD": "MÉTODO DE QC",
    "BEGINNER GUIDE": "GUIA PARA INICIANTES",
    "COMPARISON": "COMPARAÇÃO",
    "Last updated": "Última atualização",
    "Direct contact": "Contato direto",
    "About / Independent guide": "Sobre / Guia independente",
    "Research first. Route clearly.": "Pesquise primeiro. Siga uma rota clara.",
    "What UUFinds Sheet publishes, why it exists and how it stays independent from the services it discusses.":
      "O que o UUFinds Sheet publica, por que existe e como mantém independência dos serviços que analisa.",
    "What this site is": "O que é este site",
    "UUFinds Sheet is an independent editorial guide for people researching product links, available QC material and the next browsing step on CNBuy Sheet.":
      "O UUFinds Sheet é um guia editorial independente para quem pesquisa links de produtos, materiais de QC disponíveis e o próximo passo de navegação no CNBuy Sheet.",
    "The site does not claim to be UUFinds, does not process orders and does not sell the products shown in its category or product pages.":
      "O site não afirma ser o UUFinds, não processa pedidos e não vende os produtos exibidos nas páginas de categorias ou produtos.",
    "What readers can expect": "O que os leitores podem esperar",
    "Guides separate a product-discovery lead from QC evidence and current destination-page facts. A saved image, an older QC album and a live listing answer different questions and should not be treated as interchangeable.":
      "Os guias separam uma pista de descoberta de produto das evidências de QC e dos fatos atuais da página de destino. Uma imagem salva, um álbum de QC antigo e um anúncio ativo respondem a perguntas diferentes e não devem ser tratados como equivalentes.",
    "Clear labels for independent editorial content": "Identificação clara de conteúdo editorial independente",
    "Direct, identifiable CNBuy Sheet category and product routes": "Rotas diretas e identificáveis para categorias e produtos do CNBuy Sheet",
    "Dated source checks where features or listing details can change": "Verificações de fonte com data quando recursos ou dados do anúncio podem mudar",
    "Corrections when a supported factual error is identified": "Correções quando um erro factual comprovado é identificado",
    "Commercial relationship": "Relação comercial",
    "All outbound shopping, category and product links published on this site lead only to CNBuy Sheet. Editorial pages may discuss publicly described UUFinds functions for research context, but the site is not affiliated with, endorsed by or operated by UUFinds.":
      "Todos os links externos de compra, categoria e produto publicados neste site levam somente ao CNBuy Sheet. As páginas editoriais podem discutir funções publicamente descritas do UUFinds como contexto de pesquisa, mas o site não é afiliado, endossado nem operado pelo UUFinds.",
    "Contact / Corrections welcome": "Contato / Correções são bem-vindas",
    "Tell us what needs attention.": "Informe o que precisa de atenção.",
    "Contact UUFinds Sheet about factual corrections, broken routes, privacy questions or editorial policy.":
      "Entre em contato com o UUFinds Sheet sobre correções factuais, rotas quebradas, questões de privacidade ou política editorial.",
    "Editorial and website contact": "Contato editorial e do site",
    "For a factual correction, broken link, policy question or technical problem, email the address below. Include the page URL and the specific statement or route that needs review.":
      "Para uma correção factual, link quebrado, dúvida sobre políticas ou problema técnico, envie um e-mail ao endereço abaixo. Inclua a URL da página e a afirmação ou rota específica que precisa de revisão.",
    "Factual or source correction": "Correção factual ou de fonte",
    "Broken internal, category or product route": "Rota interna, de categoria ou de produto quebrada",
    "Privacy or data-handling question": "Questão de privacidade ou tratamento de dados",
    "Copyright or rights-holder enquiry": "Consulta de direitos autorais ou de titular de direitos",
    "What to include": "O que incluir",
    "A precise page URL and a short explanation help us verify the issue. When a correction depends on a public source, include the source URL and the date you viewed it. Do not send passwords, order credentials or payment information.":
      "Uma URL exata e uma breve explicação ajudam a verificar o problema. Quando a correção depender de fonte pública, inclua a URL e a data da consulta. Não envie senhas, credenciais de pedidos ou informações de pagamento.",
    "Product and order support": "Suporte a produtos e pedidos",
    "UUFinds Sheet does not process purchases, shipping, returns or refunds. Questions about a live product, order or service term should be directed to the platform responsible for that transaction.":
      "O UUFinds Sheet não processa compras, envios, devoluções ou reembolsos. Dúvidas sobre produto ativo, pedido ou condição de serviço devem ser encaminhadas à plataforma responsável pela transação.",
    "Editorial policy / Source before claim": "Política editorial / Fonte antes da afirmação",
    "How information earns a place here.": "Como uma informação ganha espaço aqui.",
    "The sourcing, review, independence and correction standards used by UUFinds Sheet.":
      "Os padrões de fontes, revisão, independência e correção usados pelo UUFinds Sheet.",
    "Source standard": "Padrão de fontes",
    "Feature statements are checked against current public pages from the service being discussed, its official app listing or another directly attributable primary source. A third-party comment can illustrate an experience, but it does not establish a platform-wide fact.":
      "Afirmações sobre recursos são verificadas nas páginas públicas atuais do serviço analisado, na listagem oficial do aplicativo ou em outra fonte primária diretamente atribuível. Um comentário de terceiro pode ilustrar uma experiência, mas não estabelece um fato válido para toda a plataforma.",
    "Evidence boundaries": "Limites das evidências",
    "The articles distinguish what is visible from what is inferred. A listing image is not automatically a warehouse QC photo, one photographed unit does not guarantee a later batch, and an old guide does not override current price, stock, sizing or service terms.":
      "Os artigos diferenciam o que é visível do que é inferido. Uma imagem de anúncio não é automaticamente uma foto de QC de armazém, uma unidade fotografada não garante um lote posterior e um guia antigo não substitui preço, estoque, tamanho ou termos de serviço atuais.",
    "No invented QC-photo counts, fees, shipping prices or exchange-rate markups":
      "Sem quantidades inventadas de fotos de QC, taxas, preços de envio ou margens cambiais",
    "No guarantee of quality, authenticity, availability or future batch consistency":
      "Sem garantia de qualidade, autenticidade, disponibilidade ou consistência de lotes futuros",
    "Dates attached to facts that can materially change": "Datas associadas a fatos que podem mudar de forma relevante",
    "Exact product or seller matching before QC evidence is treated as relevant":
      "Correspondência exata de produto ou vendedor antes de considerar a evidência de QC relevante",
    "Independence and corrections": "Independência e correções",
    "Editorial conclusions are not supplied by UUFinds. Shopping routes are limited to CNBuy Sheet and are kept visibly separate from source notes. Supported correction requests are reviewed against the strongest available source and the affected page is updated when necessary.":
      "As conclusões editoriais não são fornecidas pelo UUFinds. As rotas de compra se limitam ao CNBuy Sheet e ficam visivelmente separadas das notas de fonte. Pedidos de correção fundamentados são avaliados pela melhor fonte disponível, e a página afetada é atualizada quando necessário.",
    "Privacy / Minimal collection": "Privacidade / Coleta mínima",
    "Useful measurement without ad tracking.": "Medição útil sem rastreamento publicitário.",
    "What technical and click information UUFinds Sheet processes, why it is used and what the site does not collect.":
      "Quais informações técnicas e de cliques o UUFinds Sheet processa, por que são usadas e o que o site não coleta.",
    "Technical delivery": "Entrega técnica",
    "The site is delivered through Cloudflare. Like other web infrastructure providers, Cloudflare may process request information needed to serve pages securely, prevent abuse and diagnose failures.":
      "O site é entregue pela Cloudflare. Como outros provedores de infraestrutura web, a Cloudflare pode processar informações da solicitação necessárias para servir páginas com segurança, evitar abusos e diagnosticar falhas.",
    "First-party site measurement": "Medição própria do site",
    "UUFinds Sheet records privacy-limited page-view and click events through a same-origin endpoint. An event can contain the current page path, a short link label and the destination host and path. Search phrases, form field values, passwords and payment information are not included.":
      "O UUFinds Sheet registra eventos de visualização e clique com dados limitados por privacidade por meio de um endpoint da mesma origem. Um evento pode conter o caminho atual, um rótulo curto do link e o host e caminho do destino. Frases de busca, valores de formulários, senhas e informações de pagamento não são incluídos.",
    "This measurement is used to understand which guides, categories and product routes are useful and to find broken navigation. The tracker does not set an advertising cookie and does not create a cross-site advertising profile.":
      "Essa medição é usada para entender quais guias, categorias e rotas de produtos são úteis e para localizar navegação quebrada. O rastreador não define cookie publicitário nem cria perfil de publicidade entre sites.",
    "Contact and external destinations": "Contato e destinos externos",
    "If you email the site, the information you choose to send is used to review and answer that request. When you follow an external CNBuy Sheet link, the destination site applies its own privacy terms.":
      "Se você enviar um e-mail ao site, as informações escolhidas serão usadas para analisar e responder à solicitação. Ao seguir um link externo do CNBuy Sheet, aplicam-se os termos de privacidade do site de destino.",
    "Terms / Editorial use": "Termos / Uso editorial",
    "Use the guide as research, not a guarantee.": "Use o guia como pesquisa, não como garantia.",
    "The terms that apply when using UUFinds Sheet content, product routes and independent research guidance.":
      "Os termos aplicáveis ao uso do conteúdo do UUFinds Sheet, das rotas de produtos e da orientação independente de pesquisa.",
    "Informational purpose": "Finalidade informativa",
    "Content is provided for general research and educational purposes. UUFinds Sheet does not sell products, act as a purchasing agent, process payment or make a purchasing decision for the reader.":
      "O conteúdo é fornecido para pesquisa geral e fins educacionais. O UUFinds Sheet não vende produtos, não atua como agente de compras, não processa pagamentos nem toma decisões de compra pelo leitor.",
    "Changing information": "Informações variáveis",
    "Prices, stock, variants, seller information, links, shipping terms and platform features can change after a page is reviewed. Confirm material commercial information on the live destination page before acting.":
      "Preços, estoque, variações, dados do vendedor, links, termos de envio e recursos da plataforma podem mudar depois da revisão. Confirme informações comerciais relevantes na página ativa de destino antes de agir.",
    "A product image is not a guarantee of the delivered item": "Uma imagem do produto não garante o item entregue",
    "QC media documents a particular photographed item or batch": "O material de QC documenta um item ou lote fotografado específico",
    "No statement on this site guarantees authenticity, legality or fitness for a purpose":
      "Nenhuma afirmação deste site garante autenticidade, legalidade ou adequação a uma finalidade",
    "Readers are responsible for following laws and platform terms that apply to them":
      "Os leitores são responsáveis por cumprir as leis e os termos das plataformas aplicáveis",
    "Names, links and availability": "Nomes, links e disponibilidade",
    "Third-party names and links are used to identify the service or destination being discussed. Their appearance does not imply endorsement or affiliation. The site may correct, replace or remove content and routes when information changes or a rights issue is supported.":
      "Nomes e links de terceiros são usados para identificar o serviço ou destino discutido. Sua presença não implica endosso ou afiliação. O site pode corrigir, substituir ou remover conteúdo e rotas quando as informações mudarem ou uma questão de direitos for comprovada.",
  },
};

const dictionaries: Record<TranslatedLocale, Record<string, string>> = {
  de: {
    ...germanExtras,
    ...germanResearchExtras,
    ...germanFaqExtras,
    ...manualExtras.de,
  },
  pl: {
    ...polishExtras,
    ...polishResearchExtras,
    ...polishFaqExtras,
    ...manualExtras.pl,
  },
  "pt-br": {
    ...portugueseExtras,
    ...portugueseResearchExtras,
    ...portugueseFaqExtras,
    ...manualExtras["pt-br"],
  },
};

export function localizeText(locale: LocalizedContentLocale, value: string): string {
  if (locale === "en-gb") return value;
  return dictionaries[locale][value] ?? value;
}

export function localizeGuide(locale: LocalizedContentLocale, guide: Guide): Guide {
  if (locale === "en-gb") return guide;
  const routeCopy = localizedRouteCopy[locale].guides[guide.slug];
  const translate = (value: string) => localizeText(locale, value);

  return {
    ...guide,
    label: translate(guide.label),
    title: routeCopy?.title ?? translate(guide.title),
    description: routeCopy?.description ?? translate(guide.description),
    updated: translate(guide.updated),
    readTime: translate(guide.readTime),
    sourceNote: guide.sourceNote ? translate(guide.sourceNote) : undefined,
    intro: guide.intro.map(translate),
    sections: guide.sections.map((section) => ({
      heading: translate(section.heading),
      paragraphs: section.paragraphs.map(translate),
      points: section.points?.map(translate),
    })),
  };
}

export function localizePolicy(
  locale: LocalizedContentLocale,
  page: PolicyPageData,
): PolicyPageData {
  if (locale === "en-gb") return page;
  const translate = (value: string) => localizeText(locale, value);

  return {
    ...page,
    eyebrow: translate(page.eyebrow),
    title: translate(page.title),
    description: translate(page.description),
    updated: translate(page.updated),
    sections: page.sections.map((section) => ({
      heading: translate(section.heading),
      paragraphs: section.paragraphs.map(translate),
      points: section.points?.map(translate),
    })),
  };
}
