import { faqGroups as englishFaqGroups } from "../faq/page";
import type { ParityLocale } from "./localized-hub-copy";

type FAQItem = { question: string; answer: string };
type FAQGroup = { id: string; label: string; title: string; items: FAQItem[] };
type FAQCopy = {
  eyebrow: string;
  title: [string, string];
  deck: string;
  facts: [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }];
  jumpLabel: string;
  groups: FAQGroup[];
  sourceLabel: string;
  sourceBody: string;
  nextLabel: string;
  nextTitle: string;
  checklistLink: string;
  productsLink: string;
};

const englishPageCopy: Omit<FAQCopy, "groups"> = {
  eyebrow: "FAQ / Official functions reviewed July 23, 2026",
  title: ["Useful questions.", "Evidence-based answers."],
  deck: "Straight answers about UUFinds QC searches, image matching, marketplace links and the checks that still belong on the live CNBuy Sheet product page.",
  facts: [
    { title: "QC discovery", body: "UUFinds publicly describes a finder for available product photos and videos." },
    { title: "Search inputs", body: "Its public information names image recognition plus 1688, Taobao, Weidian and agent links." },
    { title: "Evidence boundary", body: "A matched album documents a sample; it does not guarantee a later unit or live listing data." },
  ],
  jumpLabel: "Jump to a topic",
  sourceLabel: "Source boundary / Reviewed July 23, 2026",
  sourceBody: "Function claims were checked against UUFinds’ public QC finder, QC browsing copy, universal link converter, login and registration pages, personalised display description and the current App Store listing from Uufinds Limited. Those sources support QC-photo and QC-video discovery, image recognition, link conversion and the named marketplace inputs. They do not support a promise of QC coverage for every product, unchanged account limits, guaranteed quality, fixed shipping prices or identical future batches.",
  nextLabel: "Ready to apply the method?",
  nextTitle: "Match first. Inspect second. Confirm the live listing last.",
  checklistLink: "Open the full QC checklist",
  productsLink: "Browse product details",
};

const deGroups: FAQGroup[] = [
  {
    id: "using-uufinds", label: "01 / UUFinds verwenden", title: "Was die öffentlichen Werkzeuge tatsächlich leisten",
    items: [
      { question: "Was macht UUFinds eigentlich?", answer: "UUFinds beschreibt seinen Hauptdienst öffentlich als QC-Finder, der verfügbare Produktfotos und -videos auffindbar macht. Der Finder nennt außerdem Bilderkennung; die öffentlichen App-Informationen beschreiben Linkumwandlung und Produktentdeckung. Nutze UUFinds als Recherche- und Browsingwerkzeug: Es kann Belege oder mögliche Angebote finden, ist aber nicht der Verkäufer und trifft keine Kaufentscheidung." },
      { question: "Welche Produktlinks kann UUFinds laut eigener Aussage verarbeiten?", answer: "Die aktuelle öffentliche App-Auflistung von Uufinds Limited nennt 1688, Taobao, Weidian und Links von Einkaufsagenten. UUFinds veröffentlicht außerdem einen universellen Agentenlink-Konverter. Das unterstützt diese Linktypen als Eingabe, bedeutet aber nicht, dass jede kopierte URL ein Ergebnis liefert. Abgelaufene Angebote, Kurzlinks, Trackingparameter oder ein Link zu einem ähnlichen Produkt können eine exakte Zuordnung verhindern." },
      { question: "Kann UUFinds den Link eines Einkaufsagenten in ein anderes Format umwandeln?", answer: "Linkumwandlung wird im öffentlichen Konverter und in den App-Informationen als Funktion beschrieben. Sie kann die zugrunde liegende Produktroute für einen anderen unterstützten Dienst nutzbar machen. Sie bestätigt weder Verkäufer noch Produktversion, Preis, Bestand oder QC-Verfügbarkeit. Vergleiche nach der Umwandlung Artikel-ID und Verkäuferdaten." },
      { question: "Kann ich bei UUFinds mit einem Bild statt mit einem Produktlink suchen?", answer: "Ja. UUFinds beschreibt öffentlich Bilderkennung und Verbesserungen der Bildsuche. Ein Bild eignet sich zum Finden von Kandidaten, wenn der Original-Link fehlt. Eine ähnliche Silhouette, Farbe oder Katalogaufnahme beweist jedoch nicht denselben Verkäufer, dieselbe Charge oder Variante. Wechsle vom Bildergebnis zu einem eindeutig identifizierbaren Angebot, bevor du ein QC-Album bewertest." },
      { question: "Brauche ich für jede UUFinds-Funktion ein Konto?", answer: "UUFinds besitzt öffentliche Anmelde- und Registrierungsseiten; die Registrierung verspricht mehr Suchvorgänge und vollständige Funktionen. Zugangsregeln können sich ändern. Deshalb garantiert dieser Ratgeber weder, dass jede Funktion ohne Konto verfügbar ist, noch dass ein festes Suchlimit bestehen bleibt. Maßgeblich ist die aktuelle Oberfläche." },
    ],
  },
  {
    id: "matching-results", label: "02 / Ergebnisse zuordnen", title: "So vermeidest du die Prüfung des falschen Produkts",
    items: [
      { question: "Warum liefert ein Produktlink möglicherweise kein QC-Ergebnis?", answer: "UUFinds verspricht öffentlich keine aktuellen QC-Medien für jedes Marketplace-Angebot. Ein leeres Ergebnis kann bedeuten, dass kein passendes Album vorhanden ist, das Linkformat nicht aufgelöst wird, das Angebot geändert wurde oder nie fotografiert wurde. Versuche die bereinigte Original-URL, bewahre die Artikel-ID und entferne unnötige Trackingparameter. Bleibt das Ergebnis leer, notiere „keine Belege gefunden“ statt gute oder schlechte Qualität zu unterstellen." },
      { question: "Woher weiß ich, ob ein QC-Album zum exakten Angebot gehört?", answer: "Beginne mit den stärksten Kennungen: Artikel-ID, Verkäufer oder Shop, Modell, Farbe und sichtbare Variante. Vergleiche danach charakteristische Konstruktion, Druckposition, Beschläge oder Verpackung. Ein Titel oder ähnliches Vorschaubild ist ein schwacher Beleg, weil mehrere Verkäufer dasselbe Katalogbild nutzen können. Stimmen Verkäufer oder Artikel-ID nicht überein, kennzeichne das Album nur als Referenz." },
      { question: "Was tun, wenn die Bildsuche ein ähnliches Produkt eines anderen Verkäufers findet?", answer: "Nutze es, um Prüfpunkte zu erkennen, nicht um dein beabsichtigtes Angebot zu bewerten. Ein ähnliches Ergebnis kann typische Nähte, Maße oder Verpackung zeigen, beweist aber nicht Material, Charge oder Verarbeitung eines anderen Verkäufers. Suche weiter nach der exakten Quelle oder vergleiche mehrere Live-Angebote bei CNBuy Sheet und ordne jeden Beleg eindeutig zu." },
      { question: "Hilft ein altes QC-Album noch?", answer: "Es kann sichtbare Designdetails und bekannte Prüfpunkte zeigen, besonders wenn Artikel-ID und Verkäufer weiterhin übereinstimmen. Mit größerem Zeitabstand sinkt sein Gewicht, da sich Charge, Fabrik, Material, Größe oder Varianten ändern können. Notiere das QC-Datum, vergleiche mehrere Sets, wenn vorhanden, und nutze die Live-Seite für aktuelle Angaben." },
    ],
  },
  {
    id: "reading-qc", label: "03 / QC-Belege lesen", title: "Was Fotos und Videos belegen können – und was nicht",
    items: [
      { question: "Garantiert ein UUFinds-QC-Foto die Produktqualität?", answer: "Nein. Ein QC-Foto dokumentiert den sichtbaren Zustand eines fotografierten Artikels zu einem bestimmten Zeitpunkt. Es kann Beobachtungen zu Form, Nähten, Druckposition, Beschlägen, Etiketten, Farbkonsistenz und sichtbaren Maßen stützen. Es garantiert nicht, dass eine spätere Einheit, andere Größe oder neue Charge identisch ist. Trenne Sichtbares von Vermutungen." },
      { question: "Ist ein QC-Video zuverlässiger als Standbilder?", answer: "Video kann zusätzliche Belege liefern: Stofffall, Reißverschlussbewegung, Sohlenflex, Reflexion und fehlende Blickwinkel. Es belegt dennoch weder langfristige Haltbarkeit noch den inneren Zustand von Elektronik, Materialzusammensetzung oder Echtheit. Halte an wichtigen Bildern an, vergleiche mit den Fotos und notiere verborgene Bereiche." },
      { question: "Können QC-Fotos die richtige Kleider- oder Schuhgröße bestätigen?", answer: "Nur wenn eine relevante Messung klar sichtbar ist und das Angebot exakt zugeordnet wurde. Bei Kleidung helfen Brustweite, Länge, Ärmel- oder Taillenmaß; bei Schuhen können Innen- oder Außensohlenmaße nützen, sind aber nicht automatisch gleichbedeutend mit der Passform. Vergleiche die fotografierte Messung mit der aktuellen Größentabelle und deinen eigenen Maßen." },
      { question: "Was sollte ich in einem QC-Album zuerst prüfen?", answer: "Bestätige zuerst, dass das Album zum vorgesehenen Artikel gehört. Prüfe dann Gesamtform und Proportion, bevor du Details vergrößerst. Bei Kleidung: Nähte, Druck und Maße; bei Schuhen: Symmetrie, Sohlenlage und Klebespuren; bei Taschen: Beschläge, Kanten und Riemen; bei Elektronik nur den sichtbaren äußeren Zustand, sofern kein Funktionstest gezeigt wird." },
      { question: "Was ist die sicherste Schlussfolgerung, wenn ein wichtiger Winkel fehlt?", answer: "Markiere ihn als unbekannt. Verwandle ein fehlendes Sohlenfoto, Etikett, Maß oder einen Funktionstest nicht in eine positive Annahme. Entscheide, ob die vorhandenen Belege für deine Risikotoleranz reichen, vergleiche ein besser dokumentiertes Angebot oder warte auf weitere Informationen. Ein diszipliniertes „unbekannt“ ist wertvoller als eine erfundene Antwort." },
    ],
  },
  {
    id: "this-site", label: "04 / Dieser unabhängige Ratgeber", title: "Wohin die Links führen und was erneut geprüft werden muss",
    items: [
      { question: "Ist uufindssheet.com die offizielle UUFinds-Website?", answer: "Nein. UUFinds Sheet ist ein unabhängiger redaktioneller Ratgeber und eine klar beschriftete Produktroute. Die Seite erklärt eine Recherchemethode rund um öffentlich beschriebene UUFinds-Funktionen, wird aber weder von UUFinds betrieben noch unterstützt oder empfohlen. Es gibt hier keine anklickbaren ausgehenden UUFinds-Links." },
      { question: "Warum öffnen die Einkaufslinks CNBuy Sheet?", answer: "Diese Website verbindet die Recherche mit dem nächsten Browsing-Schritt bei CNBuy Sheet. Produktkarten öffnen zuerst eine interne Detailseite und danach den passenden CNBuy-Sheet-Artikel. Kategoriebuttons öffnen die entsprechende Kategorie; die Suche übergibt die vollständige Suchphrase an CNBuy Sheet statt jeden Besucher auf eine allgemeine Seite zu schicken." },
      { question: "Sind die Produktbilder auf dieser Seite UUFinds-Warehouse-QC-Fotos?", answer: "Nein. Die Bilder im Produktbereich stammen aus den entsprechenden CNBuy-Sheet-Angeboten und werden als Listingbilder gekennzeichnet. Sie sind keine Warehouse-QC-Belege. Nutze sie zur Identifikation der Produktroute und ordne verfügbares QC-Material anschließend separat dem exakten Artikel und Verkäufer zu." },
      { question: "Was sollte ich bei CNBuy Sheet vor dem Fortfahren erneut prüfen?", answer: "Bestätige exakte Produkt-ID und Ziel-Link, aktuellen Preis, Verkäufer oder Quelle, verfügbare Farben und Größen, Maße, Bestand sowie die auf der Live-Seite gezeigten Bedingungen. Widerspricht ein älterer Artikel, Screenshot oder ein QC-Album dem aktuellen Angebot, ist die Live-Seite maßgeblich für aktuelle Geschäftsdaten; älteres Material bleibt historischer Recherchebeleg." },
    ],
  },
];

const plGroups: FAQGroup[] = [
  {
    id: "using-uufinds", label: "01 / Korzystanie z UUFinds", title: "Co naprawdę robią publiczne narzędzia",
    items: [
      { question: "Co właściwie robi UUFinds?", answer: "UUFinds publicznie opisuje swoją główną usługę jako wyszukiwarkę QC pomagającą odnaleźć dostępne zdjęcia i filmy produktów. Wyszukiwarka promuje też rozpoznawanie obrazu, a publiczne informacje o aplikacji wymieniają konwersję linków i odkrywanie produktów. Traktuj ją jako narzędzie badawcze: pomaga znaleźć dowody lub możliwą ofertę, ale nie jest sprzedawcą i nie podejmuje decyzji zakupowej." },
      { question: "Jakie linki produktów UUFinds deklaruje jako obsługiwane?", answer: "Aktualna publiczna karta aplikacji Uufinds Limited wymienia 1688, Taobao, Weidian oraz linki agentów zakupowych. UUFinds publikuje też uniwersalny konwerter linków agentów. Nie oznacza to, że każdy skopiowany adres zwróci wynik. Wygasła oferta, skrócony link, parametry śledzące lub link do podobnego produktu nadal mogą uniemożliwić dokładne dopasowanie." },
      { question: "Czy UUFinds może przekonwertować link agenta zakupowego do innego formatu?", answer: "Konwersja linków jest opisana w publicznym konwerterze i informacjach o aplikacji. Może ułatwić ponowne użycie źródłowej ścieżki produktu w innej obsługiwanej usłudze. Nie weryfikuje sprzedawcy, wersji produktu, ceny, stanu magazynowego ani dostępności QC. Po konwersji porównaj identyfikator produktu i dane sprzedawcy." },
      { question: "Czy mogę wyszukiwać w UUFinds obrazem zamiast linkiem produktu?", answer: "Tak. UUFinds publicznie opisuje rozpoznawanie obrazu i ulepszenia wyszukiwania obrazem. Obraz najlepiej służy do tworzenia listy kandydatów, gdy brakuje oryginalnego linku. Podobna sylwetka, kolor lub zdjęcie promocyjne nie dowodzą tego samego sprzedawcy, partii czy wariantu. Przejdź do identyfikowalnej oferty, zanim oprzesz się na albumie QC." },
      { question: "Czy potrzebuję konta do każdej funkcji UUFinds?", answer: "UUFinds ma publiczne strony logowania i rejestracji, a tekst rejestracyjny mówi o większej liczbie wyszukiwań i pełnych funkcjach. Zasady dostępu mogą się zmieniać, dlatego ten przewodnik nie obiecuje, że wszystko działa bez konta ani że stały limit wyszukiwań pozostanie bez zmian. Aktualny interfejs jest źródłem obowiązujących wymagań." },
    ],
  },
  {
    id: "matching-results", label: "02 / Dopasowywanie wyników", title: "Jak nie sprawdzić niewłaściwego produktu",
    items: [
      { question: "Dlaczego link produktu może nie zwrócić wyniku QC?", answer: "UUFinds nie obiecuje publicznie aktualnych materiałów QC dla każdej oferty. Pusty wynik może oznaczać brak albumu, nierozpoznany format linku, zmienioną ofertę albo brak zdjęć w dostępnych danych. Spróbuj czystej oryginalnej URL, zachowaj ID produktu i usuń zbędne parametry śledzące. Jeśli nadal jest pusto, zapisz „nie znaleziono dowodów”, a nie ocenę jakości." },
      { question: "Skąd mam wiedzieć, że album QC należy do dokładnej oferty?", answer: "Zacznij od najmocniejszych identyfikatorów: ID produktu, sprzedawcy lub sklepu, modelu, koloru i wariantu. Następnie porównaj charakterystyczną konstrukcję, położenie nadruku, okucia albo opakowanie. Tytuł lub podobna miniatura to słaby dowód, bo wielu sprzedawców używa tych samych zdjęć katalogowych. Gdy sprzedawca lub ID się nie zgadza, oznacz album wyłącznie jako referencję." },
      { question: "Co zrobić, gdy wyszukiwanie obrazem znajdzie podobny produkt innego sprzedawcy?", answer: "Użyj go do poznania punktów kontroli, a nie do oceny zamierzonej oferty. Podobny wynik może pokazać typowe szwy, wymiary lub opakowanie, ale nie potwierdza materiału, partii ani wykonania innego sprzedawcy. Szukaj dokładnego linku źródłowego lub porównaj kilka aktywnych ofert w CNBuy Sheet i wyraźnie przypisz dowody do każdego produktu." },
      { question: "Czy stary album QC nadal jest pomocny?", answer: "Może pomagać w identyfikacji widocznych detali i punktów kontroli, zwłaszcza gdy ID i sprzedawca nadal się zgadzają. Jego wartość maleje z czasem, bo mogą zmienić się partie, fabryki, materiały, rozmiary lub warianty. Zapisz datę QC, porównaj więcej zestawów, jeśli są dostępne, a aktualne dane sprawdzaj na stronie na żywo." },
    ],
  },
  {
    id: "reading-qc", label: "03 / Odczytywanie dowodów QC", title: "Co zdjęcia i filmy mogą — i czego nie mogą — udowodnić",
    items: [
      { question: "Czy zdjęcie QC z UUFinds gwarantuje jakość produktu?", answer: "Nie. Zdjęcie QC zapisuje widoczny stan jednej sfotografowanej sztuki w określonym czasie. Może wspierać obserwacje kształtu, szwów, położenia nadruku, okuć, etykiet, koloru i pokazanych wymiarów. Nie gwarantuje identyczności późniejszej sztuki, innego rozmiaru ani nowej partii. Oddziel to, co widać, od tego, czego się domyślasz." },
      { question: "Czy film QC jest bardziej wiarygodny niż zdjęcia?", answer: "Film może dodać przydatne dowody: układanie tkaniny, ruch zamka, ugięcie podeszwy, odblaskowość i brakujące kąty. Nadal nie potwierdza długotrwałej wytrzymałości, stanu wnętrza elektroniki, składu materiału ani autentyczności. Zatrzymuj kluczowe klatki, porównuj je ze zdjęciami i zapisuj niewidoczne obszary." },
      { question: "Czy zdjęcia QC mogą potwierdzić prawidłowy rozmiar ubrania lub butów?", answer: "Tylko gdy odpowiedni pomiar jest wyraźnie widoczny, a oferta została dokładnie dopasowana. Dla odzieży przydatne są szerokość klatki, długość, rękaw i talia; dla obuwia pomiar wkładki lub podeszwy może pomóc, lecz nie jest automatycznie równy dopasowaniu wewnętrznemu. Porównaj pomiar ze stroną rozmiarów na żywo i własnym znanym wymiarem." },
      { question: "Co najpierw sprawdzić w albumie QC?", answer: "Najpierw potwierdź zgodność albumu z zamierzonym produktem. Potem oceń ogólny kształt i proporcje, zanim przybliżysz detale. W odzieży sprawdź szwy, nadruk i pomiary; w butach symetrię, ustawienie podeszwy i ślady kleju; w torbach okucia, krawędzie i mocowanie pasków; w elektronice ogranicz wnioski do widocznego stanu, chyba że pokazano test działania." },
      { question: "Jaki jest najbezpieczniejszy wniosek, gdy brakuje ważnego ujęcia?", answer: "Oznacz je jako niewiadomą. Nie zamieniaj braku zdjęcia podeszwy, etykiety, pomiaru lub testu działania w pozytywne założenie. Oceń, czy istniejące dowody wystarczają dla twojej tolerancji ryzyka, porównaj lepiej udokumentowaną ofertę albo poczekaj na więcej danych. Zdyscyplinowana niewiadoma jest cenniejsza niż wymyślona odpowiedź." },
    ],
  },
  {
    id: "this-site", label: "04 / Ten niezależny przewodnik", title: "Dokąd prowadzą linki i co trzeba sprawdzić ponownie",
    items: [
      { question: "Czy uufindssheet.com jest oficjalną stroną UUFinds?", answer: "Nie. UUFinds Sheet to niezależny przewodnik redakcyjny i routingowy. Wyjaśnia metodę badania opartą na publicznie opisanych funkcjach UUFinds, ale nie jest przez UUFinds prowadzony, popierany ani z nim powiązany. Na stronie nie ma klikalnych wychodzących linków do UUFinds." },
      { question: "Dlaczego linki zakupowe otwierają CNBuy Sheet?", answer: "Strona łączy badanie produktu z kolejnym krokiem przeglądania w CNBuy Sheet. Karty otwierają najpierw wewnętrzne szczegóły, a potem dopasowany produkt CNBuy Sheet. Przyciski kategorii prowadzą do odpowiednich kategorii, a wyszukiwarka przekazuje całą frazę do CNBuy Sheet zamiast kierować wszystkich na stronę ogólną." },
      { question: "Czy zdjęcia produktów na tej stronie to magazynowe zdjęcia QC z UUFinds?", answer: "Nie. Zdjęcia w sekcji produktów pochodzą z odpowiadających ofert CNBuy Sheet i są prezentowane jako zdjęcia ofertowe. Nie należy traktować ich jak magazynowych dowodów QC. Służą do rozpoznania ścieżki produktu; dostępne materiały QC trzeba osobno dopasować do dokładnego produktu i sprzedawcy." },
      { question: "Co ponownie sprawdzić w CNBuy Sheet przed przejściem dalej?", answer: "Potwierdź dokładne ID i link docelowy, aktualną cenę, sprzedawcę lub źródło, dostępne kolory i rozmiary, pomiary, stan magazynowy oraz warunki widoczne na stronie na żywo. Jeśli starszy artykuł, obraz lub album QC przeczy aktualnej ofercie, bieżąca strona jest źródłem aktualnych informacji handlowych, a starszy materiał pozostaje dowodem historycznym." },
    ],
  },
];

const ptBrGroups: FAQGroup[] = [
  {
    id: "using-uufinds", label: "01 / Como usar o UUFinds", title: "O que as ferramentas públicas realmente fazem",
    items: [
      { question: "O que o UUFinds realmente faz?", answer: "O UUFinds descreve publicamente seu serviço principal como um localizador de QC que ajuda a encontrar fotos e vídeos disponíveis de produtos. O localizador também divulga reconhecimento de imagem, enquanto as informações públicas do aplicativo mencionam conversão de links e descoberta de produtos. Trate-o como ferramenta de pesquisa: ele pode localizar evidências ou um anúncio candidato, mas não é o vendedor e não decide a compra." },
      { question: "Quais links de produtos o UUFinds diz aceitar?", answer: "A listagem pública atual da Uufinds Limited cita links do 1688, Taobao, Weidian e agentes de compras. O UUFinds também publica um conversor universal de links de agentes. Isso permite usar essas famílias de links como entrada, mas não significa que toda URL produzirá resultado. Anúncios expirados, links encurtados, parâmetros de rastreamento ou links de produtos semelhantes podem impedir uma relação exata." },
      { question: "O UUFinds pode converter um link de agente de compras para outro formato?", answer: "A conversão de links é descrita no conversor público e nas informações do aplicativo. Ela pode facilitar o reaproveitamento da rota original do produto em outro serviço compatível. Não verifica vendedor, versão, preço, estoque ou disponibilidade de QC. Depois da conversão, compare o identificador do item e os dados do vendedor." },
      { question: "Posso pesquisar no UUFinds com uma imagem em vez de um link?", answer: "Sim. Reconhecimento e melhorias de busca por imagem são descritos publicamente pelo UUFinds. A imagem serve melhor para gerar candidatos quando falta o link original. Silhueta, cor ou foto promocional semelhante não comprovam o mesmo vendedor, lote ou variante. Passe do resultado visual para um anúncio identificável antes de confiar em um álbum de QC." },
      { question: "Preciso de conta para usar todos os recursos do UUFinds?", answer: "O UUFinds possui páginas públicas de login e cadastro, e o texto do cadastro diz liberar mais buscas e funções completas. As regras podem mudar; por isso este guia não promete que tudo esteja disponível sem conta nem que um limite fixo permaneça. A interface atual é a autoridade sobre os requisitos de acesso." },
    ],
  },
  {
    id: "matching-results", label: "02 / Como relacionar resultados", title: "Como evitar conferir o produto errado",
    items: [
      { question: "Por que um link pode não retornar resultado de QC?", answer: "O UUFinds não promete publicamente QC recente para todo anúncio. Um resultado vazio pode significar ausência de álbum correspondente, formato não resolvido, anúncio alterado ou item nunca fotografado nos dados disponíveis. Tente a URL original limpa, preserve o ID e remova parâmetros desnecessários. Se continuar vazio, registre “nenhuma evidência encontrada”, e não uma conclusão de qualidade." },
      { question: "Como saber se um álbum de QC pertence ao anúncio exato?", answer: "Comece pelos identificadores mais fortes: ID, vendedor ou loja, modelo, cor e variante visível. Depois compare construção, posição de estampas, ferragens ou embalagem. Título ou miniatura parecida é evidência fraca, pois vendedores podem reutilizar fotos de catálogo. Se vendedor ou ID não coincidir, marque o álbum apenas como referência." },
      { question: "E se a busca por imagem encontrar produto semelhante de outro vendedor?", answer: "Use-o para descobrir o que merece inspeção, não para avaliar seu anúncio. Um resultado semelhante pode mostrar costuras, medidas ou embalagem comuns, mas não comprova material, lote ou acabamento de outro vendedor. Continue buscando a fonte exata ou compare vários anúncios ativos no CNBuy Sheet, identificando a qual produto pertence cada evidência." },
      { question: "Um álbum de QC antigo ainda ajuda?", answer: "Pode ajudar a reconhecer detalhes visíveis e pontos de inspeção, principalmente se ID e vendedor ainda coincidirem. Seu peso diminui com o tempo, porque lote, fábrica, material, tamanho ou opções podem mudar. Registre a data, compare mais de um conjunto quando houver e use a página ativa para preço, variantes e disponibilidade atuais." },
    ],
  },
  {
    id: "reading-qc", label: "03 / Como ler evidências de QC", title: "O que fotos e vídeos podem — e não podem — comprovar",
    items: [
      { question: "Uma foto de QC do UUFinds garante a qualidade?", answer: "Não. A foto registra a condição visível de um item fotografado em determinado momento. Ela pode apoiar observações sobre formato, costura, posição da estampa, ferragens, etiquetas, consistência de cor e medidas mostradas. Não garante que uma unidade posterior, outro tamanho ou novo lote seja idêntico. Separe o que está visível do que é apenas inferido." },
      { question: "Um vídeo de QC é mais confiável que fotos?", answer: "O vídeo pode acrescentar evidências: caimento do tecido, movimento do zíper, flexão da sola, reflexo e ângulos ausentes. Ainda não comprova durabilidade de longo prazo, condição interna de eletrônicos, composição do material ou autenticidade. Pause em quadros importantes, compare com as fotos e liste áreas que continuam ocultas." },
      { question: "Fotos de QC confirmam o tamanho correto de roupa ou calçado?", answer: "Somente quando uma medida relevante aparece com clareza e o anúncio está relacionado exatamente. Em roupas, largura do peito, comprimento, manga e cintura podem ajudar; em calçados, medida da palmilha ou sola pode ser útil, mas não equivale automaticamente ao ajuste interno. Compare a medida fotografada com a tabela ativa e suas próprias medidas conhecidas." },
      { question: "O que devo inspecionar primeiro em um álbum de QC?", answer: "Primeiro confirme que o álbum corresponde ao item pretendido. Depois avalie formato geral e proporção antes dos detalhes. Em roupas, confira costuras, estampa e medidas; em calçados, simetria, alinhamento da sola e cola; em bolsas, ferragens, bordas e fixação das alças; em eletrônicos, limite a conclusão à condição externa, salvo quando houver teste funcional." },
      { question: "Qual é a conclusão mais segura quando falta um ângulo importante?", answer: "Marque-o como desconhecido. Não transforme a ausência de foto da sola, etiqueta, medida ou teste funcional em suposição positiva. Decida se as evidências bastam para sua tolerância ao risco, compare um anúncio melhor documentado ou aguarde mais informações. Um desconhecido disciplinado vale mais que uma resposta inventada." },
    ],
  },
  {
    id: "this-site", label: "04 / Este guia independente", title: "Para onde os links levam e o que conferir novamente",
    items: [
      { question: "uufindssheet.com é o site oficial do UUFinds?", answer: "Não. UUFinds Sheet é um guia editorial e de rotas independente. Explica um método de pesquisa baseado em funções publicamente descritas do UUFinds, mas não é operado, endossado nem afiliado ao UUFinds. Não há links clicáveis de saída para o UUFinds neste site." },
      { question: "Por que os links de compra abrem o CNBuy Sheet?", answer: "O site liga a pesquisa ao próximo passo no CNBuy Sheet. Os cartões abrem primeiro uma página interna de detalhes e depois o item correspondente no CNBuy Sheet. Botões de categoria levam à categoria correta, e a busca envia a frase completa ao CNBuy Sheet em vez de levar todos a uma página genérica." },
      { question: "As imagens de produtos deste site são fotos de QC do armazém do UUFinds?", answer: "Não. As imagens exibidas vêm dos anúncios correspondentes no CNBuy Sheet e são apresentadas como imagens de anúncio. Elas não são evidência de QC de armazém. Use-as para identificar a rota do produto e depois relacione separadamente qualquer material de QC ao item e vendedor exatos." },
      { question: "O que devo conferir novamente no CNBuy Sheet antes de continuar?", answer: "Confirme ID e link exatos, preço atual, vendedor ou fonte, cores e tamanhos disponíveis, medidas, estoque e condições exibidas na página ativa. Se artigo, imagem salva ou álbum antigo divergir do anúncio atual, trate a página ativa como fonte dos dados comerciais atuais e o material anterior apenas como evidência histórica." },
    ],
  },
];

export const localizedFAQCopy: Record<ParityLocale, FAQCopy> = {
  "en-gb": { ...englishPageCopy, groups: englishFaqGroups },
  de: {
    eyebrow: "FAQ / Offizielle Funktionen geprüft am 23. Juli 2026",
    title: ["Nützliche Fragen.", "Evidenzbasierte Antworten."],
    deck: "Klare Antworten zu UUFinds-QC-Suchen, Bilderabgleich, Marketplace-Links und den Prüfungen, die weiterhin auf der aktuellen CNBuy-Sheet-Produktseite stattfinden müssen.",
    facts: [
      { title: "QC-Suche", body: "UUFinds beschreibt öffentlich einen Finder für verfügbare Produktfotos und -videos." },
      { title: "Sucheingaben", body: "Die öffentlichen Informationen nennen Bilderkennung sowie 1688-, Taobao-, Weidian- und Agentenlinks." },
      { title: "Beweisgrenze", body: "Ein zugeordnetes Album dokumentiert ein Muster; es garantiert keine spätere Einheit oder aktuelle Angebotsdaten." },
    ],
    jumpLabel: "Zu einem Thema springen", groups: deGroups,
    sourceLabel: "Quellengrenze / Geprüft am 23. Juli 2026",
    sourceBody: "Funktionsangaben wurden mit dem öffentlichen UUFinds-QC-Finder, der QC-Übersicht, dem universellen Link-Konverter, den Anmelde- und Registrierungsseiten, der Beschreibung personalisierter Anzeigen und der aktuellen App-Store-Auflistung von Uufinds Limited abgeglichen. Diese Quellen stützen QC-Foto- und QC-Video-Suche, Bilderkennung, Linkumwandlung und die genannten Marketplace-Eingaben. Sie versprechen weder QC-Abdeckung für jedes Produkt noch unveränderte Kontolimits, garantierte Qualität, feste Versandpreise oder identische spätere Chargen.",
    nextLabel: "Bereit, die Methode anzuwenden?", nextTitle: "Zuerst zuordnen. Dann prüfen. Zuletzt das Live-Angebot bestätigen.",
    checklistLink: "Vollständige QC-Checkliste öffnen", productsLink: "Produktdetails ansehen",
  },
  pl: {
    eyebrow: "FAQ / Oficjalne funkcje sprawdzone 23 lipca 2026",
    title: ["Przydatne pytania.", "Odpowiedzi oparte na dowodach."],
    deck: "Konkretne odpowiedzi o wyszukiwaniu QC w UUFinds, dopasowaniu obrazów, linkach marketplace oraz kontrolach, które nadal trzeba wykonać na aktywnej stronie produktu CNBuy Sheet.",
    facts: [
      { title: "Odkrywanie QC", body: "UUFinds publicznie opisuje wyszukiwarkę dostępnych zdjęć i filmów produktów." },
      { title: "Dane wyszukiwania", body: "Publiczne informacje wymieniają rozpoznawanie obrazu oraz linki 1688, Taobao, Weidian i agentów." },
      { title: "Granica dowodów", body: "Dopasowany album dokumentuje próbkę; nie gwarantuje późniejszej sztuki ani aktualnych danych oferty." },
    ],
    jumpLabel: "Przejdź do tematu", groups: plGroups,
    sourceLabel: "Granica źródeł / Sprawdzono 23 lipca 2026",
    sourceBody: "Informacje o funkcjach sprawdzono na publicznej wyszukiwarce QC UUFinds, stronie przeglądania QC, uniwersalnym konwerterze linków, stronach logowania i rejestracji, opisie spersonalizowanych prezentacji oraz aktualnej karcie App Store Uufinds Limited. Źródła te wspierają wyszukiwanie zdjęć i filmów QC, rozpoznawanie obrazu, konwersję linków i wymienione źródła marketplace. Nie obiecują QC dla każdego produktu, niezmiennych limitów konta, gwarantowanej jakości, stałych cen wysyłki ani identycznych późniejszych partii.",
    nextLabel: "Chcesz zastosować tę metodę?", nextTitle: "Najpierw dopasuj. Potem sprawdź. Na końcu potwierdź ofertę na żywo.",
    checklistLink: "Otwórz pełną listę kontrolną QC", productsLink: "Przeglądaj szczegóły produktów",
  },
  "pt-br": {
    eyebrow: "FAQ / Funções oficiais revisadas em 23 de julho de 2026",
    title: ["Perguntas úteis.", "Respostas baseadas em evidências."],
    deck: "Respostas diretas sobre buscas de QC no UUFinds, relação de imagens, links de marketplaces e as verificações que ainda devem ser feitas na página ativa do produto no CNBuy Sheet.",
    facts: [
      { title: "Descoberta de QC", body: "O UUFinds descreve publicamente um localizador de fotos e vídeos disponíveis de produtos." },
      { title: "Entradas de busca", body: "As informações públicas citam reconhecimento de imagem e links do 1688, Taobao, Weidian e agentes." },
      { title: "Limite da evidência", body: "Um álbum relacionado documenta uma amostra; não garante uma unidade posterior nem dados atuais do anúncio." },
    ],
    jumpLabel: "Ir para um tema", groups: ptBrGroups,
    sourceLabel: "Limite das fontes / Revisado em 23 de julho de 2026",
    sourceBody: "As afirmações sobre funções foram conferidas no localizador público de QC do UUFinds, na página de navegação de QC, no conversor universal de links, nas páginas de login e cadastro, na descrição de exibição personalizada e na listagem atual da Uufinds Limited na App Store. Essas fontes sustentam descoberta de fotos e vídeos de QC, reconhecimento de imagem, conversão de links e as entradas de marketplace citadas. Não sustentam promessa de QC para todo produto, limites de conta imutáveis, qualidade garantida, preços fixos de envio ou lotes futuros idênticos.",
    nextLabel: "Pronto para aplicar o método?", nextTitle: "Primeiro relacione. Depois inspecione. Por último, confirme o anúncio ativo.",
    checklistLink: "Abra o checklist completo de QC", productsLink: "Veja os detalhes dos produtos",
  },
};
