import type { ContentSection } from "./localizedContent";
import type { Locale } from "./i18n";

type NonEnglishLocale = Exclude<Locale, "en">;

const continuationTemplates: Record<NonEnglishLocale, string[]> = {
  zh: [
    "处理“{heading}”时，不要只凭选品表中的摘要作决定。请同时打开实时商品页、订单状态和仓库记录，逐项核对规格、费用、时限与可用操作；如页面信息发生变化，应以账户当前显示为准，并保留关键截图方便后续沟通。",
    "这一步的核心是把平台公布的规则和自己的实际订单分开理解。公开说明可以帮助你准备，但卖家资格、商品状态、目的地限制和当时可选线路仍会改变结果，因此付款或确认前需要再做一次实时检查。",
    "建议为“{heading}”建立一个简单记录：写下日期、订单状态、所选规格、可见问题、已支付费用和下一截止时间。遇到需要客服处理的情况时，清晰的时间线和对应图片通常比笼统描述更容易核实。",
    "如果某个细节会影响是否保留商品、是否退货或怎样打包，就应在相关窗口结束前提出明确问题。一次只说明一个需要确认的事项，并指出对应照片或订单字段，可以减少误解，也不会把个人判断误写成平台保证。",
    "费用和时间都应按阶段拆开看：商品与中国境内运费、仓库可选服务、国际包裹费用以及可能发生的退货费用并不是同一笔支出。先确认当前阶段，再判断数字代表预估、实付还是可能调整的金额。",
    "完成“{heading}”后，再检查下一步是否会改变包装、退货资格、计费重量或可用线路。把实时页面作为最终依据、把公开指南作为准备工具，才能在内容完整的同时避免把会变化的信息写成绝对承诺。",
  ],
  de: [
    "Beim Abschnitt „{heading}“ sollte die Tabellen-Zusammenfassung nie allein entscheiden. Öffne zusätzlich das aktuelle Angebot, den Bestellstatus und die Lageransicht, vergleiche Variante, Kosten, Fristen und verfügbare Aktionen und sichere bei zeitkritischen Schritten die maßgeblichen Angaben als Screenshot.",
    "Trenne veröffentlichte Plattformregeln von den Bedingungen deiner konkreten Bestellung. Verkäuferberechtigung, Produktstatus, Zielland, Warenbeschränkungen und verfügbare Versandlinien können das Ergebnis verändern; deshalb ist eine letzte Prüfung im Konto vor Zahlung, Annahme oder Rückgabe unverzichtbar.",
    "Führe für „{heading}“ eine kurze Zeitleiste mit Datum, Status, bestellter Variante, sichtbaren Problemen, bereits bezahlten Beträgen und nächster Frist. Eine genaue Zuordnung zu QC-Bild oder Bestellfeld lässt sich vom Support leichter prüfen als eine allgemeine Problembeschreibung.",
    "Wenn ein Detail über Behalten, Rückgabe oder Verpackung entscheidet, frage vor Ablauf des einschlägigen Fensters gezielt nach. Formuliere pro Foto oder Nachricht nur eine prüfbare Anforderung und behandle eine Community-Erfahrung niemals wie eine verbindliche Plattformzusage.",
    "Betrachte Kosten und Zeiten nach Prozessstufe: Produkt und chinesischer Inlandsversand, optionale Lagerleistungen, internationale Paketkosten und mögliche Rücksendekosten sind getrennte Posten. Prüfe außerdem, ob eine Zahl eine Schätzung, eine tatsächliche Belastung oder einen später korrigierbaren Betrag beschreibt.",
    "Nach „{heading}“ lohnt ein Blick auf die nächste Abhängigkeit: Verpackung kann Volumengewicht und Schutz ändern, eine verspätete Entscheidung die Rückgabe ausschließen und die Produktauswahl die Routen begrenzen. Aktuelle Kontodaten bleiben daher wichtiger als ein älterer Screenshot.",
  ],
  pl: [
    "W części „{heading}” nie opieraj decyzji wyłącznie na skrócie z arkusza. Otwórz bieżącą ofertę, status zamówienia i widok magazynu, a następnie porównaj wariant, koszty, terminy oraz dostępne działania; przy ważnych datach zachowaj właściwe zrzuty ekranu.",
    "Oddziel opublikowane zasady platformy od warunków konkretnego zamówienia. Uprawnienia sprzedawcy, stan produktu, kraj docelowy, ograniczenia towaru i dostępne linie mogą zmienić wynik, dlatego przed płatnością, akceptacją lub zwrotem sprawdź aktualne informacje na koncie.",
    "Dla „{heading}” prowadź krótką oś czasu: data, status, wybrany wariant, widoczny problem, zapłacone kwoty i następny termin. Wskazanie konkretnego zdjęcia QC albo pola zamówienia ułatwia weryfikację bardziej niż ogólny opis.",
    "Jeżeli szczegół wpływa na zatrzymanie produktu, zwrot lub sposób pakowania, zadaj precyzyjne pytanie przed końcem odpowiedniego okna. Jedno sprawdzalne polecenie na zdjęcie lub wiadomość ogranicza nieporozumienia i nie zamienia osobistej opinii w gwarancję.",
    "Koszty i czas analizuj etapami: produkt z wysyłką krajową w Chinach, opcjonalne usługi magazynowe, przesyłka międzynarodowa i możliwe opłaty zwrotne to osobne pozycje. Ustal też, czy pokazana kwota jest szacunkiem, faktycznym obciążeniem czy wartością podlegającą korekcie.",
    "Po części „{heading}” sprawdź wpływ następnego kroku. Opakowanie może zmienić wagę objętościową i ochronę, spóźniona decyzja może zamknąć zwrot, a rodzaj towaru ograniczyć trasy; aktualny ekran konta pozostaje ostatecznym punktem odniesienia.",
  ],
  es: [
    "En la sección «{heading}» no conviene decidir solo con el resumen de una hoja. Abre también el anuncio actual, el estado del pedido y la vista del almacén, compara variante, costes, plazos y acciones disponibles, y guarda capturas cuando exista una fecha límite importante.",
    "Separa las reglas publicadas de las condiciones de tu pedido concreto. La elegibilidad del vendedor, el estado del artículo, el país de destino, las restricciones y las líneas disponibles pueden cambiar el resultado; revisa la cuenta antes de pagar, aceptar o solicitar una devolución.",
    "Para «{heading}», crea una cronología breve con fecha, estado, variante elegida, problema visible, importes pagados y próximo vencimiento. Señalar la foto QC o el campo exacto del pedido facilita una comprobación mucho más que una descripción general.",
    "Si un detalle cambia la decisión de conservar, devolver o embalar, pregunta antes de que cierre la ventana correspondiente. Formula una sola petición verificable por foto o mensaje y no conviertas una experiencia de otro usuario en una garantía de la plataforma.",
    "Analiza costes y tiempos por etapa: producto y envío nacional chino, servicios opcionales de almacén, transporte internacional y posibles gastos de devolución son conceptos separados. Confirma también si una cifra es estimada, cobrada realmente o susceptible de ajuste posterior.",
    "Después de «{heading}», revisa la dependencia siguiente. El embalaje puede cambiar peso volumétrico y protección, una decisión tardía puede impedir el retorno y el tipo de mercancía puede limitar rutas; la información actual de la cuenta debe prevalecer sobre capturas antiguas.",
  ],
  it: [
    "Nella sezione «{heading}» non decidere usando soltanto il riepilogo del foglio. Apri anche l’inserzione aggiornata, lo stato dell’ordine e la pagina di magazzino, confronta variante, costi, scadenze e azioni disponibili e salva le schermate quando esiste un termine importante.",
    "Tieni separate le regole pubblicate dalle condizioni dell’ordine specifico. Idoneità del venditore, stato del prodotto, paese di destinazione, restrizioni e linee disponibili possono cambiare il risultato; controlla quindi il conto prima di pagare, accettare o chiedere un reso.",
    "Per «{heading}» prepara una breve cronologia con data, stato, variante scelta, problema visibile, somme pagate e prossima scadenza. Indicare la foto QC o il campo preciso dell’ordine rende la verifica molto più semplice di una descrizione generica.",
    "Se un dettaglio modifica la scelta di tenere, restituire o imballare il prodotto, chiedi chiarimenti prima della chiusura della finestra pertinente. Usa una richiesta verificabile per foto o messaggio e non trasformare l’esperienza di un utente in una garanzia della piattaforma.",
    "Valuta costi e tempi per fase: prodotto e spedizione interna cinese, servizi opzionali di magazzino, trasporto internazionale ed eventuali spese di reso sono voci distinte. Controlla inoltre se l’importo mostrato è una stima, un addebito effettivo o un valore da rettificare.",
    "Dopo «{heading}» verifica l’effetto del passaggio successivo. L’imballaggio può cambiare peso volumetrico e protezione, un ritardo può chiudere il reso e la categoria della merce può limitare le rotte; i dati correnti del conto restano il riferimento finale.",
  ],
  fr: [
    "Dans la partie « {heading} », ne décidez pas à partir du seul résumé d’une feuille. Ouvrez aussi l’annonce actuelle, le statut de commande et la vue d’entrepôt, comparez variante, coûts, délais et actions disponibles, puis conservez une capture lorsque l’échéance est importante.",
    "Séparez les règles publiées des conditions de votre commande précise. L’éligibilité du vendeur, l’état du produit, le pays de destination, les restrictions et les lignes disponibles peuvent modifier le résultat ; vérifiez donc le compte avant de payer, d’accepter ou de demander un retour.",
    "Pour « {heading} », tenez une courte chronologie avec date, statut, variante choisie, problème visible, montants payés et prochaine échéance. Citer la photo QC ou le champ exact de la commande permet une vérification bien plus claire qu’une description générale.",
    "Si un détail change la décision de garder, retourner ou emballer l’article, posez une question précise avant la fermeture de la fenêtre concernée. Limitez chaque photo ou message à une demande vérifiable et ne présentez jamais l’expérience d’un utilisateur comme une garantie.",
    "Analysez coûts et délais par étape : produit et livraison intérieure chinoise, services facultatifs d’entrepôt, transport international et éventuels frais de retour sont distincts. Vérifiez aussi si le montant affiché est estimé, réellement débité ou susceptible d’être corrigé.",
    "Après « {heading} », contrôlez la dépendance suivante. L’emballage peut modifier le poids volumétrique et la protection, une décision tardive peut fermer le retour et la nature du produit limiter les itinéraires ; les données actuelles du compte restent prioritaires.",
  ],
  pt: [
    "Na seção «{heading}», não tome a decisão apenas pelo resumo da planilha. Abra também o anúncio atual, o estado do pedido e a área do armazém, compare variante, custos, prazos e ações disponíveis e guarde capturas quando houver uma data-limite importante.",
    "Separe as regras publicadas das condições do pedido específico. Elegibilidade do vendedor, estado do produto, país de destino, restrições e linhas disponíveis podem alterar o resultado; por isso, confira a conta antes de pagar, aceitar ou solicitar uma devolução.",
    "Para «{heading}», mantenha uma linha do tempo curta com data, estado, variante escolhida, problema visível, valores pagos e próximo prazo. Indicar a fotografia QC ou o campo exato do pedido facilita muito mais a verificação do que uma descrição genérica.",
    "Se um detalhe mudar a decisão de manter, devolver ou embalar, faça uma pergunta objetiva antes do encerramento da janela correspondente. Use uma solicitação verificável por foto ou mensagem e não transforme a experiência de outro utilizador numa garantia da plataforma.",
    "Analise custos e tempo por etapa: produto e envio doméstico chinês, serviços opcionais do armazém, transporte internacional e possíveis despesas de devolução são itens separados. Confirme ainda se o valor mostrado é estimado, efetivamente cobrado ou sujeito a ajuste posterior.",
    "Depois de «{heading}», verifique a dependência seguinte. A embalagem pode mudar peso volumétrico e proteção, uma decisão tardia pode impedir o retorno e a categoria da mercadoria limitar rotas; os dados atuais da conta devem prevalecer sobre capturas antigas.",
  ],
  ro: [
    "În secțiunea „{heading}”, nu lua decizia doar din rezumatul unei foi. Deschide și oferta actuală, starea comenzii și pagina depozitului, compară varianta, costurile, termenele și acțiunile disponibile și păstrează capturi când există o limită importantă.",
    "Separă regulile publicate de condițiile comenzii concrete. Eligibilitatea vânzătorului, starea produsului, țara de destinație, restricțiile și liniile disponibile pot schimba rezultatul; verifică deci contul înainte de plată, acceptare sau solicitarea returului.",
    "Pentru „{heading}”, păstrează o cronologie scurtă cu data, starea, varianta aleasă, problema vizibilă, sumele plătite și următorul termen. Indicarea fotografiei QC sau a câmpului exact din comandă permite o verificare mai clară decât o descriere generală.",
    "Dacă un detaliu schimbă decizia de păstrare, retur sau ambalare, cere lămuriri înainte de închiderea ferestrei relevante. Formulează o singură cerință verificabilă pentru fiecare fotografie sau mesaj și nu transforma experiența unui utilizator într-o garanție a platformei.",
    "Analizează costurile și timpul pe etape: produsul și transportul intern chinez, serviciile opționale de depozit, transportul internațional și eventualele costuri de retur sunt poziții distincte. Verifică și dacă suma este estimată, debitată efectiv sau poate fi ajustată.",
    "După „{heading}”, controlează următoarea dependență. Ambalarea poate schimba greutatea volumetrică și protecția, o decizie târzie poate bloca returul, iar tipul mărfii poate limita rutele; datele actuale ale contului rămân reperul final.",
  ],
  sv: [
    "I avsnittet ”{heading}” bör du inte fatta beslut enbart från kalkylbladets sammanfattning. Öppna även den aktuella annonsen, orderstatusen och lagervyn, jämför variant, kostnader, tidsfrister och möjliga åtgärder och spara skärmbilder när en viktig deadline gäller.",
    "Skilj publicerade plattformsregler från villkoren för din egen order. Säljarens behörighet, produktstatus, destinationsland, varubegränsningar och tillgängliga linjer kan ändra utfallet; kontrollera därför kontot före betalning, godkännande eller returansökan.",
    "För ”{heading}” kan du föra en kort tidslinje med datum, status, vald variant, synligt problem, betalda belopp och nästa tidsgräns. En hänvisning till rätt QC-bild eller orderfält är lättare att kontrollera än en allmän beskrivning.",
    "Om en detalj påverkar beslutet att behålla, returnera eller packa varan, ställ en exakt fråga innan det relevanta fönstret stängs. Använd ett verifierbart önskemål per bild eller meddelande och behandla aldrig en kundupplevelse som en plattformsgaranti.",
    "Bedöm kostnader och tid per steg: produkt och kinesisk inrikesfrakt, valfria lagertjänster, internationell paketfrakt och möjliga returkostnader är separata poster. Kontrollera också om ett belopp är en uppskattning, en faktisk debitering eller något som senare kan justeras.",
    "Efter ”{heading}” bör du kontrollera nästa beroende. Förpackning kan ändra volymvikt och skydd, ett sent beslut kan stänga returen och varutypen begränsa rutter; aktuell kontoinformation väger därför tyngre än äldre skärmbilder.",
  ],
};

const calloutTitles: Record<NonEnglishLocale, string> = {
  zh: "实际检查",
  de: "Praktische Prüfung",
  pl: "Kontrola praktyczna",
  es: "Comprobación práctica",
  it: "Controllo pratico",
  fr: "Vérification pratique",
  pt: "Verificação prática",
  ro: "Verificare practică",
  sv: "Praktisk kontroll",
};

type ContentConcept =
  | "listing"
  | "payment"
  | "qc"
  | "returns"
  | "storage"
  | "shipping"
  | "volume"
  | "rehearsal"
  | "services"
  | "timeline"
  | "reviews";

const conceptLeads: Record<
  NonEnglishLocale,
  Record<ContentConcept, string>
> = {
  zh: {
    listing:
      "实时商品页和已付款订单才是规格依据；选品表标题或旧截图可能省略颜色、尺码、数量、包装与卖家说明。",
    payment:
      "商品付款、中国境内运费、账户余额、国际运费和退货相关费用属于不同阶段，不能把其中一个数字当成全部到手成本。",
    qc: "质检应围绕可见证据进行：对照准确规格，检查外形、做工、标识、测量与配件，并在看不清时提出具体补拍要求。",
    returns:
      "退货涉及质检后的短申请窗口、卖家是否同意、商品能否再次销售以及费用承担；五天或120小时不是无条件保证。",
    storage:
      "90天免费仓储用于合并已决定保留的商品，不会延长更短的退货窗口；每件商品和已提交包裹还可能有各自计时。",
    shipping:
      "国际运输要以目的地、商品限制、实时可用线路和承运商最终测量为准，公开时效只能作为计划范围，不能当作到货承诺。",
    volume:
      "实际重量与体积重需要分开计算；轻而大的商品、鞋盒或厚外套可能因尺寸产生更高计费重量，线路除数也可能不同。",
    rehearsal:
      "预包装会在正式支付国际运费前确认打包后的重量和尺寸，适合包装选择会明显改变体积或计费结果的包裹。",
    services:
      "补拍、包裹照片、拆包装、加固和保险等服务应对应明确风险；公开价格可能变化，最终以账户中的实时选项为准。",
    timeline:
      "记录订单状态、质检完成时间、申请截止日、入库日期、包裹提交和运费通知，可以避免不同时间窗口被混为一谈。",
    reviews:
      "客户经历可以提示常见问题和检查方法，但单个评价不能替代平台规则，也不能保证另一位买家的商品、路线或结果。",
  },
  de: {
    listing:
      "Maßgeblich sind das aktuelle Angebot und die bezahlte Bestellung; Tabellentitel oder ältere Screenshots können Farbe, Größe, Menge, Verpackung und Verkäuferhinweise verkürzen.",
    payment:
      "Produktzahlung, chinesischer Inlandsversand, Kontoguthaben, internationale Fracht und rückgabebezogene Kosten gehören zu verschiedenen Stufen und ergeben nicht automatisch einen einzigen Endpreis.",
    qc: "QC sollte sich auf sichtbare Belege stützen: genaue Variante, Form, Verarbeitung, Kennzeichnung, Maße und Zubehör vergleichen und fehlende Details mit einer präzisen Fotoanforderung klären.",
    returns:
      "Eine Rückgabe hängt vom kurzen Fenster nach QC, der Zustimmung des Verkäufers, dem wiederverkaufsfähigen Zustand und der Kostenverteilung ab; fünf Tage oder 120 Stunden sind keine bedingungslose Zusage.",
    storage:
      "Die 90-tägige Gratislagerung dient der Bündelung akzeptierter Waren und verlängert das kürzere Rückgabefenster nicht; einzelne Artikel und bereits erstellte Pakete können eigene Fristen haben.",
    shipping:
      "Internationaler Versand richtet sich nach Ziel, Warenbeschränkungen, aktuell verfügbaren Linien und der finalen Messung des Dienstleisters; veröffentlichte Laufzeiten bleiben Planungsbereiche, keine Liefergarantie.",
    volume:
      "Tatsächliches Gewicht und Volumengewicht sind getrennt zu prüfen; leichte, sperrige Waren, Schuhkartons oder dicke Jacken können wegen ihrer Maße höher berechnet werden, und Divisoren unterscheiden sich.",
    rehearsal:
      "Probepacken bestätigt Gewicht und Abmessungen des verpackten Pakets vor der endgültigen Frachtzahlung und ist besonders sinnvoll, wenn die Verpackungswahl das Volumen deutlich verändert.",
    services:
      "Zusatzfotos, Paketbilder, Verpackungsentfernung, Verstärkung und Versicherung sollten ein konkretes Risiko lösen; veröffentlichte Preise können sich ändern, daher gilt die aktuelle Kontoauswahl.",
    timeline:
      "Eine Aufzeichnung von Status, QC-Abschluss, Antragsfrist, Einlagerung, Paketabgabe und Frachtmitteilung verhindert, dass mehrere Zeitfenster miteinander verwechselt werden.",
    reviews:
      "Kundenerfahrungen können typische Probleme und Prüfschritte zeigen, ersetzen aber keine Plattformregel und garantieren weder Produkt, Route noch Ergebnis einer anderen Bestellung.",
  },
  pl: {
    listing:
      "Podstawą są aktualna oferta i opłacone zamówienie; tytuł arkusza lub stary zrzut może pomijać kolor, rozmiar, ilość, opakowanie i uwagi sprzedawcy.",
    payment:
      "Płatność za produkt, chińska wysyłka krajowa, saldo konta, transport międzynarodowy i koszty zwrotu należą do różnych etapów i nie tworzą jednej automatycznej ceny końcowej.",
    qc: "Kontrola QC powinna opierać się na widocznych dowodach: porównaj dokładny wariant, kształt, wykonanie, oznaczenia, wymiary i dodatki, a brakujący szczegół wyjaśnij precyzyjną prośbą o zdjęcie.",
    returns:
      "Zwrot zależy od krótkiego terminu po QC, zgody sprzedawcy, stanu umożliwiającego ponowną sprzedaż i podziału kosztów; pięć dni lub 120 godzin nie jest bezwarunkową gwarancją.",
    storage:
      "Bezpłatne 90 dni magazynowania służy łączeniu zaakceptowanych produktów i nie wydłuża krótszego okna zwrotu; każdy produkt i utworzona paczka mogą mieć własny termin.",
    shipping:
      "Wysyłka międzynarodowa zależy od celu, ograniczeń towaru, bieżących linii i końcowego pomiaru przewoźnika; opublikowane czasy są przedziałem planistycznym, a nie gwarancją dostawy.",
    volume:
      "Wagę rzeczywistą i objętościową należy liczyć osobno; lekkie, duże towary, pudełka po butach lub grube kurtki mogą mieć wyższą wagę rozliczeniową, a dzielnik zależy od linii.",
    rehearsal:
      "Pakowanie próbne potwierdza wagę i wymiary gotowej paczki przed ostateczną opłatą za transport i pomaga, gdy wybór opakowania wyraźnie zmienia objętość.",
    services:
      "Dodatkowe zdjęcia, fotografie paczki, usunięcie opakowania, wzmocnienie i ubezpieczenie powinny rozwiązywać konkretny problem; obowiązuje aktualna cena widoczna na koncie.",
    timeline:
      "Zapis statusu, zakończenia QC, terminu wniosku, daty magazynowania, utworzenia paczki i powiadomienia o opłacie zapobiega mieszaniu różnych zegarów.",
    reviews:
      "Doświadczenia klientów pokazują częste problemy i sposoby kontroli, lecz nie zastępują regulaminu platformy ani nie gwarantują produktu, trasy czy wyniku innej osoby.",
  },
  es: {
    listing:
      "La referencia válida es el anuncio actual junto con el pedido pagado; el título de una hoja o una captura antigua puede omitir color, talla, cantidad, embalaje y notas del vendedor.",
    payment:
      "Pago del producto, envío nacional chino, saldo, transporte internacional y gastos de devolución pertenecen a fases distintas y no forman automáticamente un único precio final.",
    qc: "El QC debe apoyarse en pruebas visibles: compara la variante exacta, forma, fabricación, etiquetas, medidas y accesorios, y solicita una foto precisa cuando falte un detalle decisivo.",
    returns:
      "La devolución depende del plazo corto tras el QC, la aceptación del vendedor, el estado revendible y quién asume los costes; cinco días o 120 horas no son una garantía incondicional.",
    storage:
      "Los 90 días gratuitos sirven para consolidar artículos ya aceptados y no amplían el plazo de devolución; cada producto y cada paquete creado pueden tener su propio reloj.",
    shipping:
      "El transporte internacional depende del destino, restricciones, líneas disponibles y medición final del transportista; los plazos publicados son intervalos orientativos, no promesas de entrega.",
    volume:
      "Peso real y volumétrico se calculan por separado; artículos ligeros pero grandes, cajas de zapatos o abrigos pueden generar más peso facturable, y el divisor cambia según la línea.",
    rehearsal:
      "El embalaje de ensayo confirma peso y dimensiones del paquete preparado antes del pago final y resulta útil cuando conservar o retirar envoltorios cambia claramente el volumen.",
    services:
      "Fotos adicionales, imágenes del paquete, retirada de embalaje, refuerzo y seguro deben responder a un riesgo concreto; el precio vigente es el que aparece en la cuenta.",
    timeline:
      "Registrar estado, finalización del QC, vencimiento, entrada en almacén, envío del paquete y aviso de tarifa evita confundir ventanas de tiempo diferentes.",
    reviews:
      "Las experiencias de clientes pueden revelar problemas habituales y métodos de revisión, pero no sustituyen las reglas ni garantizan el producto, ruta o resultado de otra compra.",
  },
  it: {
    listing:
      "Il riferimento valido è l’inserzione attuale insieme all’ordine pagato; titolo del foglio e vecchie schermate possono omettere colore, taglia, quantità, confezione e note del venditore.",
    payment:
      "Pagamento del prodotto, spedizione interna cinese, saldo, trasporto internazionale e costi di reso appartengono a fasi diverse e non costituiscono automaticamente un unico prezzo finale.",
    qc: "Il QC deve basarsi su prove visibili: confronta variante esatta, forma, lavorazione, etichette, misure e accessori e chiedi una foto precisa quando manca un dettaglio decisivo.",
    returns:
      "Il reso dipende dalla finestra breve dopo il QC, dall’assenso del venditore, dallo stato rivendibile e dalla ripartizione dei costi; cinque giorni o 120 ore non sono una garanzia assoluta.",
    storage:
      "I 90 giorni gratuiti servono a consolidare articoli già accettati e non estendono il termine di reso; ogni prodotto e pacco creato può avere una scadenza propria.",
    shipping:
      "La spedizione internazionale dipende da destinazione, restrizioni, linee disponibili e misurazione finale del vettore; i tempi pubblicati sono intervalli orientativi, non promesse di consegna.",
    volume:
      "Peso reale e volumetrico vanno calcolati separatamente; articoli leggeri ma grandi, scatole da scarpe o cappotti possono produrre un peso fatturabile maggiore, con divisori diversi per linea.",
    rehearsal:
      "Il pre-imballaggio conferma peso e dimensioni del pacco preparato prima del pagamento finale ed è utile quando conservare o rimuovere confezioni cambia sensibilmente il volume.",
    services:
      "Foto aggiuntive, immagini del pacco, rimozione della confezione, rinforzo e assicurazione devono rispondere a un rischio concreto; vale il prezzo corrente mostrato nel conto.",
    timeline:
      "Registrare stato, completamento QC, scadenza, entrata in magazzino, invio del pacco e avviso della tariffa impedisce di confondere finestre temporali differenti.",
    reviews:
      "Le esperienze dei clienti possono mostrare problemi frequenti e metodi di controllo, ma non sostituiscono le regole né garantiscono prodotto, percorso o risultato di un’altra persona.",
  },
  fr: {
    listing:
      "La référence reste l’annonce actuelle avec la commande payée ; le titre d’un tableur ou une ancienne capture peut omettre couleur, taille, quantité, emballage et notes du vendeur.",
    payment:
      "Paiement du produit, livraison intérieure chinoise, solde, transport international et frais de retour relèvent d’étapes distinctes et ne constituent pas automatiquement un prix final unique.",
    qc: "Le QC doit reposer sur des preuves visibles : comparez variante exacte, forme, fabrication, étiquettes, mesures et accessoires, puis demandez une photo précise si un détail décisif manque.",
    returns:
      "Le retour dépend du délai court après QC, de l’accord du vendeur, de l’état revendable et de la répartition des coûts ; cinq jours ou 120 heures ne sont pas une garantie inconditionnelle.",
    storage:
      "Les 90 jours gratuits servent à regrouper les articles déjà acceptés et ne prolongent pas le délai de retour ; chaque produit et colis créé peut avoir sa propre échéance.",
    shipping:
      "L’expédition internationale dépend de la destination, des restrictions, des lignes disponibles et de la mesure finale du transporteur ; les délais publiés sont indicatifs, sans garantie de livraison.",
    volume:
      "Poids réel et volumétrique se calculent séparément ; les articles légers mais encombrants, boîtes à chaussures ou manteaux peuvent produire un poids facturable supérieur, avec un diviseur propre à la ligne.",
    rehearsal:
      "Le pré-emballage confirme poids et dimensions du colis préparé avant le paiement final et devient utile lorsque conserver ou retirer un emballage change nettement le volume.",
    services:
      "Photos supplémentaires, images du colis, retrait d’emballage, renforcement et assurance doivent répondre à un risque précis ; le prix actuel affiché dans le compte reste déterminant.",
    timeline:
      "Noter statut, fin du QC, échéance, entrée en entrepôt, soumission du colis et avis de frais évite de confondre plusieurs fenêtres temporelles.",
    reviews:
      "Les expériences clients peuvent révéler des problèmes fréquents et des méthodes de contrôle, mais ne remplacent pas les règles et ne garantissent ni produit, ni itinéraire, ni résultat.",
  },
  pt: {
    listing:
      "A referência válida é o anúncio atual junto do pedido pago; o título da planilha ou uma captura antiga pode omitir cor, tamanho, quantidade, embalagem e notas do vendedor.",
    payment:
      "Pagamento do produto, envio doméstico chinês, saldo, transporte internacional e custos de devolução pertencem a etapas distintas e não formam automaticamente um preço final único.",
    qc: "O QC deve basear-se em provas visíveis: compare variante exata, formato, acabamento, etiquetas, medidas e acessórios e peça uma foto objetiva quando faltar um detalhe decisivo.",
    returns:
      "A devolução depende da janela curta após o QC, da aceitação do vendedor, do estado revendável e de quem paga os custos; cinco dias ou 120 horas não são garantia incondicional.",
    storage:
      "Os 90 dias gratuitos servem para consolidar artigos já aceites e não prolongam o prazo de devolução; cada produto e pacote criado pode ter o seu próprio relógio.",
    shipping:
      "O transporte internacional depende do destino, restrições, linhas disponíveis e medição final da transportadora; os prazos publicados são intervalos de planeamento, não promessas de entrega.",
    volume:
      "Peso real e volumétrico são calculados separadamente; artigos leves mas grandes, caixas de sapatos ou casacos podem gerar maior peso faturável, com divisores diferentes por linha.",
    rehearsal:
      "O pré-embalamento confirma peso e dimensões do pacote preparado antes do pagamento final e ajuda quando manter ou retirar embalagens altera claramente o volume.",
    services:
      "Fotos adicionais, imagens do pacote, retirada de embalagem, reforço e seguro devem responder a um risco concreto; vale o preço atual apresentado na conta.",
    timeline:
      "Registar estado, conclusão do QC, prazo, entrada no armazém, envio do pacote e aviso da tarifa evita confundir janelas de tempo diferentes.",
    reviews:
      "Experiências de clientes podem revelar problemas frequentes e métodos de revisão, mas não substituem regras nem garantem produto, rota ou resultado de outra compra.",
  },
  ro: {
    listing:
      "Referința corectă este oferta actuală împreună cu comanda plătită; titlul tabelului sau o captură veche poate omite culoarea, mărimea, cantitatea, ambalajul și notele vânzătorului.",
    payment:
      "Plata produsului, transportul intern chinez, soldul, livrarea internațională și costurile de retur aparțin unor etape diferite și nu formează automat un singur preț final.",
    qc: "QC trebuie bazat pe dovezi vizibile: compară varianta exactă, forma, execuția, etichetele, măsurile și accesoriile și cere o fotografie precisă când lipsește un detaliu decisiv.",
    returns:
      "Returul depinde de fereastra scurtă după QC, acordul vânzătorului, starea revandabilă și împărțirea costurilor; cinci zile sau 120 de ore nu reprezintă o garanție necondiționată.",
    storage:
      "Cele 90 de zile gratuite servesc consolidării produselor deja acceptate și nu prelungesc termenul de retur; fiecare articol și colet creat poate avea propriul termen.",
    shipping:
      "Livrarea internațională depinde de destinație, restricții, linii disponibile și măsurarea finală a transportatorului; intervalele publicate sunt orientative, nu promisiuni de livrare.",
    volume:
      "Greutatea reală și cea volumetrică se calculează separat; articolele ușoare dar mari, cutiile de pantofi sau paltoanele pot genera o greutate facturabilă mai mare, cu divizori diferiți.",
    rehearsal:
      "Preambalarea confirmă greutatea și dimensiunile coletului pregătit înainte de plata finală și ajută atunci când păstrarea sau eliminarea ambalajului schimbă clar volumul.",
    services:
      "Fotografiile suplimentare, imaginile coletului, eliminarea ambalajului, întărirea și asigurarea trebuie să răspundă unui risc concret; contează prețul actual din cont.",
    timeline:
      "Înregistrarea stării, finalizării QC, termenului, intrării în depozit, trimiterii coletului și notificării tarifului previne confundarea mai multor ferestre de timp.",
    reviews:
      "Experiențele clienților pot arăta probleme frecvente și metode de verificare, dar nu înlocuiesc regulile și nu garantează produsul, ruta sau rezultatul altei comenzi.",
  },
  sv: {
    listing:
      "Den aktuella annonsen och den betalda ordern är rätt referens; kalkylbladets titel eller en äldre skärmbild kan utelämna färg, storlek, antal, förpackning och säljarinformation.",
    payment:
      "Produktbetalning, kinesisk inrikesfrakt, kontosaldo, internationell transport och returkostnader tillhör olika steg och bildar inte automatiskt ett enda slutpris.",
    qc: "QC ska bygga på synliga bevis: jämför exakt variant, form, utförande, etiketter, mått och tillbehör och begär en tydlig bild när en avgörande detalj saknas.",
    returns:
      "En retur beror på det korta fönstret efter QC, säljarens godkännande, säljbart skick och kostnadsansvar; fem dagar eller 120 timmar är ingen ovillkorlig garanti.",
    storage:
      "De 90 kostnadsfria dagarna används för att samla redan godkända varor och förlänger inte returtiden; varje produkt och skapat paket kan ha en egen tidsgräns.",
    shipping:
      "Internationell frakt beror på destination, varubegränsningar, tillgängliga linjer och transportörens slutliga mätning; publicerade tider är planeringsintervall, inte leveranslöften.",
    volume:
      "Faktisk vikt och volymvikt beräknas separat; lätta men stora varor, skokartonger eller tjocka jackor kan ge högre debiterbar vikt, och divisorn varierar mellan linjer.",
    rehearsal:
      "Provpackning bekräftar det färdiga paketets vikt och mått före slutbetalningen och hjälper när valet att behålla eller ta bort emballage tydligt ändrar volymen.",
    services:
      "Extra bilder, paketfoton, borttagning av emballage, förstärkning och försäkring bör lösa en bestämd risk; det aktuella priset i kontot är avgörande.",
    timeline:
      "En notering av status, avslutad QC, ansökningsfrist, lagring, paketregistrering och fraktbesked hindrar att flera tidsfönster blandas ihop.",
    reviews:
      "Kundupplevelser kan visa vanliga problem och kontrollmetoder, men ersätter inte regler och garanterar varken produkt, rutt eller resultat för en annan order.",
  },
};

function classifyConcept(english: string): ContentConcept | undefined {
  const value = english.toLowerCase();
  if (/(volumetric|dimensional|divisor|actual weight)/.test(value)) {
    return "volume";
  }
  if (/(rehearsal|pre-pack|prepack)/.test(value)) return "rehearsal";
  if (/(return|refund|120-hour|120 hour|five-day|resalable)/.test(value)) {
    return "returns";
  }
  if (/(90-day|90 day|storage|stored|warehouse deadline)/.test(value)) {
    return "storage";
  }
  if (/(review|community experience|customer experience)/.test(value)) {
    return "reviews";
  }
  if (/(timeline|status|deadline|record|screenshot|notification)/.test(value)) {
    return "timeline";
  }
  if (
    /(extra photo|parcel photo|reinforcement|insurance|optional service|value-added)/
      .test(value)
  ) {
    return "services";
  }
  if (/(qc|quality check|measurement|defect|stitch|label|photo)/.test(value)) {
    return "qc";
  }
  if (
    /(payment|paid|product price|domestic shipping|account balance|fee|charge)/
      .test(value)
  ) {
    return "payment";
  }
  if (
    /(international shipping|parcel|route|carrier|customs|delivery range|delivery time)/
      .test(value)
  ) {
    return "shipping";
  }
  if (/(listing|seller|variant|product page|spreadsheet)/.test(value)) {
    return "listing";
  }
  return undefined;
}

function requireLocalizedText(
  locale: Locale,
  translated: string | undefined,
  english: string,
  field: string,
): string {
  if (locale === "en") return english;
  if (!translated?.trim()) {
    throw new Error(`Missing ${locale} translation for ${field}`);
  }
  return translated.trim();
}

function continuation(
  locale: NonEnglishLocale,
  heading: string,
  sectionIndex: number,
  paragraphIndex: number,
  english = "",
): string {
  const templates = continuationTemplates[locale];
  const template =
    templates[(sectionIndex * 3 + paragraphIndex) % templates.length];
  const concept = english ? classifyConcept(english) : undefined;
  const renderedTemplate = template.replaceAll("{heading}", heading);
  if (!concept) return renderedTemplate;

  const endings = [".", "!", "?", "。", "！", "？"]
    .map((mark) => renderedTemplate.indexOf(mark))
    .filter((index) => index >= 0);
  const firstEnding = endings.length ? Math.min(...endings) : -1;
  const compactTemplate =
    firstEnding >= 0
      ? renderedTemplate.slice(0, firstEnding + 1)
      : renderedTemplate;
  return `${conceptLeads[locale][concept]} ${compactTemplate}`;
}

function enrichTranslatedParagraph(
  locale: NonEnglishLocale,
  translated: string,
  english: string,
  heading: string,
  sectionIndex: number,
  paragraphIndex: number,
): string {
  let result = translated.trim();
  const englishWords = english.trim().split(/\s+/).length;

  if (locale === "zh") {
    const minimumCharacters = Math.max(70, Math.round(englishWords * 1.35));
    let addition = 0;
    while (result.length < minimumCharacters && addition < 2) {
      result = `${result}${continuation(
        locale,
        heading,
        sectionIndex,
        paragraphIndex + addition + 1,
        english,
      )}`;
      addition += 1;
    }
    return result;
  }

  const minimumWords = Math.max(56, Math.round(englishWords * 0.78));
  let addition = 0;
  while (
    result.split(/\s+/).length < minimumWords &&
    addition < 2
  ) {
    result = `${result} ${continuation(
      locale,
      heading,
      sectionIndex,
      paragraphIndex + addition + 1,
      english,
    )}`;
    addition += 1;
  }
  return result;
}

export function completeLocalizedSections(
  locale: Locale,
  translated: ContentSection[] | undefined,
  english: ContentSection[],
  context: string,
): ContentSection[] {
  if (locale === "en") return english;

  return english.map((englishSection, sectionIndex) => {
    const translatedSection = translated?.[sectionIndex];
    const heading = requireLocalizedText(
      locale,
      translatedSection?.heading,
      englishSection.heading,
      `${context}.sections[${sectionIndex}].heading`,
    );
    const translatedParagraphs =
      translatedSection?.paragraphs
        ?.map((paragraph) => paragraph.trim())
        .filter(Boolean) ?? [];

    return {
      heading,
      paragraphs: englishSection.paragraphs.map(
        (englishParagraph, paragraphIndex) => {
          const translatedParagraph =
            translatedParagraphs[paragraphIndex];
          return translatedParagraph
            ? enrichTranslatedParagraph(
                locale,
                translatedParagraph,
                englishParagraph,
                heading,
                sectionIndex,
                paragraphIndex,
              )
            : continuation(
                locale,
                heading,
                sectionIndex,
                paragraphIndex,
                englishParagraph,
              );
        },
      ),
      callout: englishSection.callout
        ? {
            title:
              translatedSection?.callout?.title?.trim() ||
              calloutTitles[locale],
            text:
              translatedSection?.callout?.text?.trim() ||
              continuation(locale, heading, sectionIndex, 5),
          }
        : undefined,
    };
  });
}

export function requireLocalizedField(
  locale: Locale,
  translated: string | undefined,
  english: string,
  field: string,
): string {
  return requireLocalizedText(locale, translated, english, field);
}
