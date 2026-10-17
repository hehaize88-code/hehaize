import type { Article } from "./site-data";

// Traduzioni integrali; la data editoriale non sostituisce la verifica delle fonti indicata in ogni articolo.
export const seoRefreshIt: Record<string, Article> = {
  "lolobuy-product-link-not-working": {
    slug: "lolobuy-product-link-not-working",
    title: "Link prodotto LoloBuy non funzionante: recuperare gli URL di Taobao, Weidian e 1688",
    searchTitle: "Link LoloBuy non funzionante: guida a Taobao, Weidian e 1688",
    shortTitle: "Recuperare un link prodotto LoloBuy non funzionante",
    description: "Individua la causa di un link LoloBuy non valido, recupera l'inserzione originale di Taobao, Weidian o 1688 e conserva la variante esatta prima di ordinare.",
    eyebrow: "RECUPERO DEI LINK",
    published: "2026-09-15", updated: "2026-10-17", readingTime: "14 min di lettura",
    factCheckLine: "Fonti pubbliche sul flusso di acquisto tramite link e ricerca prodotti verificate il 15 settembre 2026. Revisione editoriale e traduzione del 17 ottobre 2026; non costituiscono una nuova prova diretta del servizio.",
    visual: {
      eyebrow: "LA SEQUENZA DI RECUPERO", title: "Recupera l'identità del prodotto prima del pulsante di acquisto.",
      caption: "Una sostituzione valida conserva origine, prodotto, opzione e riscontri: non basta una fotografia simile.",
      items: [
        { label: "Origine", text: "Identifica il marketplace e conserva l'URL completo, senza abbreviazioni." },
        { label: "Identità", text: "Confronta titolo, venditore, immagini e identificativi stabili dell'inserzione." },
        { label: "Variante", text: "Ricostruisci colore, taglia, versione, quantità e note." },
        { label: "Verifica", text: "Controlla l'ordine generato prima di impegnare denaro." },
      ],
    },
    sources: [
      { label: "Sito pubblico LoloBuy — verifica del 15 settembre 2026", note: "Fonte primaria per l'avvio dell'ordine incollando un link prodotto e per il flusso pubblico di controllo in magazzino." },
      { label: "Schede attuali della destinazione e del marketplace", note: "I campi dell'inserzione attiva determinano venditore, variante, quantità, prezzo e disponibilità." },
      { label: "Metodo di recupero di Lolobuy Sheet", note: "La sequenza diagnostica e il registro dei riscontri sono metodi editoriali indipendenti, non condizioni di LoloBuy." },
    ],
    intro: [
      "Un link prodotto LoloBuy può smettere di funzionare in punti diversi. La pagina originale del marketplace potrebbe essere stata rimossa, un URL abbreviato potrebbe aver perso i propri parametri, la destinazione potrebbe rifiutare un formato non supportato oppure una vecchia voce dello spreadsheet potrebbe rimandare a un'inserzione modificata. Sullo schermo questi problemi possono sembrare uguali, ma richiedono soluzioni diverse.",
      "LoloBuy dichiara pubblicamente che è possibile iniziare un ordine incollando un link prodotto. Questo conferma l'importanza dell'URL originale, ma non garantisce che ogni vecchia pagina Taobao, Weidian o 1688 rimanga disponibile o venga importata correttamente. L'obiettivo sicuro non è forzare un link guasto: è ricostruire riscontri sufficienti per capire se la pagina recuperata rappresenti ancora lo stesso articolo e la stessa opzione.",
    ],
    sections: [
      {
        heading: "Classifica il problema prima di modificare l'URL",
        paragraphs: [
          "Registra innanzitutto ciò che accade realmente. Un errore del browser, una richiesta di accesso al marketplace, un avviso di articolo rimosso, un'importazione vuota, un'anteprima errata e una pagina di destinazione 404 sono sintomi differenti. Prova il link senza modificarlo in un normale browser, poi nel campo dell'ordine. Annota data, dominio visibile, URL finale dopo i reindirizzamenti ed eventuale identificativo stabile dell'articolo prima di cercare alternative.",
          "Non cancellare parametri né sostituire domini a caso. I link dei marketplace possono contenere identificativi del prodotto, informazioni sul venditore, parametri promozionali e passaggi tra versione mobile e desktop. Alcune parti possono essere superflue, ma eliminarne una necessaria può aprire un'altra inserzione o una pagina vuota. Conserva l'originale come riscontro non modificabile e fai le prove su una copia.",
        ],
        bullets: ["URL originale e URL finale dopo i reindirizzamenti", "Marketplace e identificativo prodotto visibile", "Errore preciso o anteprima sbagliata", "Data e dispositivo utilizzati per il controllo"],
      },
      {
        heading: "Distingui un problema di importazione da un'inserzione rimossa",
        paragraphs: [
          "Se la pagina del marketplace si apre mostrando l'articolo previsto, l'origine è ancora attiva anche quando il modulo d'ordine non riesce a leggerla. Copia l'URL canonico o di condivisione dalla pagina aperta; rimuovi eventuali involucri evidenti delle app social soltanto se l'identificativo del prodotto rimane invariato, quindi riprova. Prima di procedere, confronta titolo generato, prima immagine e opzioni con la pagina originale.",
          "Se è la pagina del venditore a dichiarare l'articolo non disponibile, ripulire l'URL non può ripristinare le scorte. Salva nome del negozio, descrizione, immagini principali, specifiche e testo delle opzioni. Questi elementi possono aiutare una nuova ricerca, ma non rendono equivalente un sostituto. Considera ogni nuova inserzione un candidato distinto, con condizioni e riscontri propri.",
        ],
      },
      {
        heading: "Recupera i link Taobao senza perdere l'identità dell'articolo",
        paragraphs: [
          "Per una voce Taobao, cerca l'identificativo stabile nella pagina aperta o nell'URL. Un link condiviso da mobile può attraversare più indirizzi: lascia terminare i reindirizzamenti e copia la destinazione dal browser. Verifica che titolo, negozio, immagini e opzioni selezionabili corrispondano alla voce dello spreadsheet. La sola foto principale è un riscontro debole, perché diversi venditori possono riutilizzare le stesse immagini di catalogo.",
          "Ricostruisci per iscritto la selezione desiderata prima di incollare il link recuperato: colore o stile, taglia, quantità, eventuale personalizzazione e testo originale visualizzato accanto all'opzione. Se il prezzo precedente è diverso, decidi sulla base dell'importo attuale. Il prezzo di un vecchio spreadsheet è un riferimento storico, non una promessa che il venditore debba rispettare.",
        ],
      },
      {
        heading: "Recupera i link Weidian controllando insieme venditore e variante",
        paragraphs: [
          "Un link Weidian è più affidabile quando conserva sia la pagina dell'articolo sia l'identità del negozio. Se il link condiviso si apre all'interno di un'app, usa l'opzione di apertura nel browser e mantieni l'identificativo del prodotto. Confronta nome del negozio, titolo, ordine delle immagini, etichette delle opzioni e indicazioni sulle taglie. Se uno di questi campi contraddice la vecchia scheda, non considerarla automaticamente la stessa inserzione.",
          "Alcune condizioni importanti si trovano nelle immagini o in descrizioni lunghe. Conserva la tabella delle misure, il nome della versione o del lotto, un eventuale riferimento ad acconti e le note del venditore prima di inviare il link. L'anteprima di destinazione può riassumere la pagina senza riportare ogni condizione. La nota d'ordine deve eliminare le ambiguità, non ripetere istruzioni vaghe come «uguale alla foto».",
        ],
      },
      {
        heading: "Su 1688 considera quantità e prezzi parte dell'identità del link",
        paragraphs: [
          "Su 1688 il recupero della pagina non è completo finché non controlli unità d'acquisto, quantità minima, combinazione di SKU e fascia di prezzo applicabile. Una pagina può aprirsi correttamente mentre il prezzo apparente riguarda un lotto più grande, un componente o una specifica diversa. Registra la combinazione esatta che produce il prezzo, senza limitarti al numero principale.",
          "Se la pagina propone più colori e taglie, verifica se è possibile combinare le quantità e se ogni SKU è disponibile. Quando una condizione è poco chiara, l'interfaccia da sola non dimostra l'approvazione del venditore. Invia una richiesta precisa oppure sospendi l'ordine finché la scheda attuale non chiarisce come verrà gestita la combinazione desiderata.",
        ],
        bullets: ["Unità d'acquisto", "Quantità minima", "Combinazione precisa di SKU", "Fascia di prezzo applicabile", "Consegna interna attualmente indicata"],
      },
      {
        heading: "Usa la ricerca per trovare candidati, non per provare equivalenza",
        paragraphs: [
          "Quando la pagina originale non esiste più, cerca seguendo una sequenza di riscontri. Parti da una frase distintiva del titolo o da un codice modello; aggiungi poi materiale, dimensioni, colore, nome del negozio o un'etichetta particolare delle opzioni. La ricerca per immagini può proporre candidati quando le parole non bastano, ma l'elenco dei risultati serve soltanto alla scoperta. Apri più pagine e confrontale campo per campo.",
          "Prima di scegliere un sostituto, stabilisci cosa debba coincidere e cosa possa cambiare. Per un indumento possono essere indispensabili tabella delle misure, descrizione del tessuto e posizione della stampa, mentre venditore, confezione e prezzo possono essere flessibili. Per un ricambio, dimensioni e tipo di connettore possono essere vincolanti. Questo evita che la somiglianza visiva sostituisca di nascosto l'identità funzionale.",
        ],
      },
      {
        heading: "Controlla l'ordine importato prima del pagamento",
        paragraphs: [
          "Dopo che LoloBuy accetta il link recuperato, confronta l'ordine creato con l'inserzione attiva. Verifica identità del prodotto, venditore, variante selezionata, quantità, importo, consegna in Cina e tutte le note che incidono sull'evasione. Se la pagina d'ordine semplifica le etichette tradotte, conserva il testo originale dell'opzione accanto alla spiegazione, in modo da poter ricostruire la richiesta.",
          "Un'anteprima funzionante non dimostra che il prodotto fisico corrisponderà. Conferma il trasferimento dei dati, non l'evasione. La descrizione pubblica di LoloBuy prevede controlli e fotografie dopo l'arrivo in magazzino: usa quei riscontri successivi per confrontare quanto ricevuto con l'ordine salvato. Recupero del link e QC risolvono problemi diversi.",
        ],
      },
      {
        heading: "Crea un registro dei link guasti che rimanga utile",
        paragraphs: [
          "Mantieni un breve registro: vecchio URL, marketplace, identificativo, ultima data di disponibilità, tipo di errore, URL recuperato, campi coincidenti, campi cambiati e decisione finale. È più utile che sovrascrivere la vecchia cella, perché spiega perché un sostituto sia stato accettato o rifiutato e permette a un'altra persona di ripetere il controllo.",
          "Indica chiaramente lo stato: attivo e corrispondente, attivo ma modificato, problema di importazione, rimosso, possibile sostituto o irrisolto. Ricontrolla appena prima di ordinare: un recupero riuscito oggi non garantisce la disponibilità domani. Un registro accurato trasforma un link guasto da esercizio di supposizione in una verifica controllata del prodotto.",
        ],
        links: [{ label: "Ricerca LoloBuy per immagini", href: "/it/articles/lolobuy-image-search-guide" }, { label: "Controllare i costi dell'ordine", href: "/it/articles/lolobuy-fees-explained" }],
      },
    ],
  },
  "lolobuy-image-search-guide": {
    slug: "lolobuy-image-search-guide",
    title: "Ricerca LoloBuy per immagini: trovare un prodotto da una foto senza affidarsi alle supposizioni",
    searchTitle: "Ricerca LoloBuy per immagini: foto, link e confronto prodotti",
    shortTitle: "Trovare un prodotto LoloBuy partendo da una foto",
    description: "Usa la ricerca inversa per immagini e i dati del prodotto per trovare un'inserzione LoloBuy, confrontare i candidati ed evitare semplici somiglianze visive.",
    eyebrow: "RICERCA PER IMMAGINI", published: "2026-09-15", updated: "2026-10-17", readingTime: "14 min di lettura",
    factCheckLine: "Descrizioni pubbliche di acquisto tramite link e foto in magazzino verificate il 15 settembre 2026. La ricerca per immagini è un metodo indipendente; revisione editoriale del 17 ottobre 2026, senza nuova prova diretta.",
    visual: {
      eyebrow: "DALLA FOTO ALLA SCHEDA VERIFICATA", title: "La foto avvia la ricerca; le specifiche la completano.",
      caption: "La corrispondenza migliore combina caratteristiche visive, dimensioni, opzioni, riscontri sul venditore e una pagina originale attiva.",
      items: [
        { label: "Prepara", text: "Ritaglia il prodotto conservandone gli elementi costruttivi distintivi." },
        { label: "Cerca", text: "Avvia una ricerca ampia e raccogli più candidati." },
        { label: "Confronta", text: "Controlla gli attributi che la foto non può dimostrare." },
        { label: "Registra", text: "Salva il link attivo e l'opzione precisa per il successivo QC." },
      ],
    },
    sources: [
      { label: "Sito pubblico LoloBuy — verifica del 15 settembre 2026", note: "Fonte primaria per acquisto tramite link, controlli in magazzino e fotografie fornite all'utente." },
      { label: "Inserzioni attive dei venditori", note: "Le schede originali attuali determinano titolo, venditore, opzioni, specifiche, prezzo e disponibilità." },
      { label: "Metodo di ricerca per immagini di Lolobuy Sheet", note: "Il flusso di ritaglio, selezione e confronto è un'analisi editoriale indipendente." },
    ],
    intro: [
      "Una foto è utile quando non hai un link funzionante, ma è una specifica d'acquisto incompleta. La stessa immagine di catalogo può comparire su pagine di venditori diversi, versioni quasi identiche possono avere materiali o dimensioni differenti e una ricondivisione può tagliare proprio il dettaglio che distingue un modello dall'altro. La ricerca per immagini dovrebbe quindi produrre una selezione di candidati, non un ordine immediato.",
      "LoloBuy descrive pubblicamente un processo che inizia con un link prodotto e prosegue con controlli e fotografie in magazzino. La ricerca per immagini precede questo processo: aiuta a individuare le possibili pagine originali. Questa guida spiega come passare da un'immagine a un'inserzione sostenuta da riscontri, mantenendo visibili le incertezze in ogni fase.",
    ],
    sections: [
      {
        heading: "Stabilisci cosa la foto possa identificare e cosa no",
        paragraphs: [
          "Prima di cercare, elenca gli elementi osservabili: sagoma, disposizione dei pannelli, forma degli accessori metallici, numero di tasche, posizione della stampa, combinazioni di colori ed eventuali codici leggibili. Elenca poi quelli nascosti o poco affidabili: dimensioni esatte, composizione del tessuto, costruzione interna, peso, accessori inclusi, prestazioni e autenticità. Questa distinzione impedisce di attribuire al risultato più informazioni di quante l'immagine mostri.",
          "Un codice distintivo, un'etichetta o un segno sulla confezione possono essere utili, ma leggili con cautela. Bassa risoluzione, immagini specchiate e testo decorativo possono generare termini errati. Conserva l'originale intatto, annota separatamente le osservazioni e registra le alternative per i caratteri incerti, anziché correggerli silenziosamente nella frase che ti aspetti.",
        ],
        bullets: ["Forma e disposizione osservabili", "Testo leggibile o indizi sul modello", "Specifiche nascoste indispensabili", "Dettagli forse dovuti a luce o compressione"],
      },
      {
        heading: "Prepara più ritagli per la ricerca",
        paragraphs: [
          "Crea un ritaglio dell'intero prodotto eliminando bordi, didascalie social e oggetti estranei, ma conservando tutta la sagoma. Aggiungine un secondo sull'elemento costruttivo più distintivo, come chiusura, disegno della suola, disposizione delle tasche o grafica. Un terzo può isolare un'etichetta o un codice leggibile. Ritagli diversi verificano ipotesi diverse, invece di ripetere una sola ricerca debole.",
          "Evita un ritaglio strettissimo del solo logo: tende a restituire pagine del marchio e prodotti somiglianti senza la stessa costruzione. Non ingrandire eccessivamente una miniatura fino a far apparire gli artefatti di nitidezza come cuciture o testo reali. I motori possono lavorare con immagini imperfette; il tuo compito è non aggiungere falsi riscontri.",
        ],
      },
      {
        heading: "Raccogli i candidati prima di scegliere una pagina",
        paragraphs: [
          "Cerca prima con l'immagine completa e apri più risultati plausibili. Annota marketplace, venditore, titolo, galleria attuale e URL. Usa poi i ritagli di dettaglio per vedere se ricompaiono gli stessi candidati. La ripetizione è un indizio utile, ma non dimostra che tutte le pagine vendano lo stesso lotto, materiale, assortimento di taglie o contenuto della confezione.",
          "Quando possibile, conserva almeno tre candidati. Un unico risultato favorisce la conferma delle proprie aspettative: ogni caratteristica ambigua sembra coincidere. Un gruppo di confronto rende evidenti le differenze, soprattutto quando un negozio mostra solo foto di catalogo e un altro include misure, immagini specifiche delle varianti o dettagli della confezione.",
        ],
      },
      {
        heading: "Trasforma gli elementi dell'immagine in ricerche testuali",
        paragraphs: [
          "I risultati per immagini spesso rivelano termini che mancavano nella foto iniziale. Estrai parole neutrali relative a tipo di indumento, taglio, materiale dichiarato, codice modello, motivo, chiusura e dimensioni. Combina due o tre indizi distintivi anziché copiare un titolo promozionale. Cerca sia la frase esatta sia una versione abbreviata, perché un titolo riscritto dal venditore potrebbe nascondere un risultato utile.",
          "Il linguaggio del venditore è un indizio, non una specifica già verificata. Se un risultato definisce una giacca impermeabile, una borsa in pelle o una scarpa con un determinato modello, cerca il riscontro nella descrizione e nelle opzioni. Il riepilogo del motore può essere vecchio o incompleto. La scheda aperta è il documento da valutare.",
        ],
      },
      {
        heading: "Confronta i candidati con una matrice di identità",
        paragraphs: [
          "Crea righe per sagoma, cuciture, parti metalliche, etichette, grafiche, dimensioni, materiale dichiarato, taglie, accessori, venditore e condizioni di prezzo. Per ogni candidato segna corrispondente, diverso o sconosciuto. Un dato sconosciuto non è un fallimento: indica l'informazione da ottenere prima dell'ordine. Una pagina con meno contraddizioni può essere migliore di quella con la foto principale più simile.",
          "Dai più peso ai campi funzionali che alla somiglianza decorativa. Per le scarpe, metodo di misurazione e costruzione della suola possono contare più del colore. Per le borse, dimensioni, attacchi della tracolla e scomparti possono pesare più di una vista frontale identica. Per elettronica e ricambi, connettore, tensione e compatibilità devono prevalere su qualsiasi indizio estetico.",
        ],
        bullets: ["Corrispondente", "Diverso", "Non mostrato", "Da chiarire con il venditore o nell'ordine"],
      },
      {
        heading: "Controlla che l'opzione selezionata corrisponda alla foto",
        paragraphs: [
          "Una sola inserzione può includere prodotti diversi. Seleziona colore, taglia, stile e confezione desiderati, osservando se cambiano immagine, prezzo e disponibilità. L'importo più basso può riferirsi a un acconto, un accessorio o una versione più piccola. Conserva il testo dell'opzione nella lingua originale insieme a una breve spiegazione di ciò che vuoi ricevere.",
          "Se nessuna opzione corrisponde chiaramente all'immagine, non inviare una nota generica chiedendo la versione fotografata. Identifica il conflitto e chiedi chiarimenti. Un'istruzione vaga trasferisce la tua supposizione nell'ordine e lascia a chi acquista o vende la possibilità di interpretarla diversamente.",
        ],
      },
      {
        heading: "Invia un link verificato e conserva il confronto",
        paragraphs: [
          "Quando un candidato supera il confronto, incolla il suo link originale attivo nel flusso d'ordine corrente. Confronta il riepilogo generato con la pagina del venditore e l'opzione salvata. La descrizione pubblica di LoloBuy supporta l'acquisto tramite link, ma il trasferimento richiede comunque una verifica umana. Conserva gli altri candidati nel caso la pagina scelta cambi o diventi indisponibile.",
          "Salva pagina originale, selezione dell'opzione, tabella delle misure, immagini decisive e data. Questi riscontri offrono un riferimento corretto per le future foto di magazzino. Senza di essi il QC diventa una prova di memoria, e una pagina modificata dal venditore può rendere difficile ricostruire l'aspettativa iniziale.",
        ],
      },
      {
        heading: "Usa le foto di magazzino per verificare l'arrivo",
        paragraphs: [
          "Quando il prodotto arriva in magazzino, confronta tipo, colore, taglia sull'etichetta, quantità, componenti inclusi e condizioni visibili con la scheda salvata. Ricontrolla i dettagli distintivi che avevano suggerito la corrispondenza. Se una zona importante non è visibile, definisci l'angolazione o la misura necessaria e controlla le opzioni dell'ordine, senza presumere che ulteriori riscontri siano automatici o gratuiti.",
          "Le fotografie di magazzino non possono dimostrare retroattivamente che il risultato della ricerca provenga dal venditore originario o che le caratteristiche nascoste siano corrette. Documentano l'articolo ricevuto con l'ordine scelto. Distingui la fiducia nella ricerca dai riscontri sull'arrivo e sospendi la decisione quando rimane una differenza sostanziale irrisolta.",
        ],
        links: [{ label: "Richiedere foto QC e misure utili", href: "/it/articles/lolobuy-extra-qc-photos-measurements" }, { label: "Pianificare la spedizione LoloBuy", href: "/it/guides/shipping" }],
      },
    ],
  },
  "lolobuy-order-status-guide": {
    slug: "lolobuy-order-status-guide",
    title: "Stati dell'ordine LoloBuy: acquisto, invio del venditore, deposito e spedizione",
    searchTitle: "Stato ordine LoloBuy: acquisto, magazzino e spedizione",
    shortTitle: "Comprendere ogni stato dell'ordine LoloBuy",
    description: "Leggi gli stati di ordini e pacchi LoloBuy per fase, individua chi deve intervenire e raccogli i riscontri giusti prima di segnalare un ritardo.",
    eyebrow: "LEGGERE GLI STATI", published: "2026-09-15", updated: "2026-10-17", readingTime: "14 min di lettura",
    factCheckLine: "Descrizioni pubbliche di acquisto, controlli, fotografie, deposito e spedizione verificate il 15 settembre 2026. Revisione editoriale del 17 ottobre 2026: la scadenza di deposito va verificata sul singolo articolo nell'account.",
    visual: {
      eyebrow: "UN ORDINE, QUATTRO TEMPI", title: "Identifica la fase prima di valutare il ritardo.",
      caption: "Evasione del venditore, lavorazione in magazzino, preparazione del pacco e trasporto hanno responsabili e riscontri diversi.",
      items: [
        { label: "Acquisto", text: "Scheda dell'ordine, opzione, pagamento e azione del venditore." },
        { label: "In arrivo", text: "Trasporto interno dal venditore verso il magazzino." },
        { label: "Depositato", text: "Ricezione, controllo, fotografie e decisioni in magazzino." },
        { label: "Pacco", text: "Imballaggio, invio, scansioni del corriere e consegna finale." },
      ],
    },
    sources: [
      { label: "Sito pubblico LoloBuy — verifica del 15 settembre 2026", note: "Fonte primaria per le fasi generali di acquisto, controllo e fotografie in magazzino, deposito e spedizione internazionale. Non si ripropone una durata fissa del deposito." },
      { label: "Ordini e pacchi presenti nell'account", note: "Etichetta attuale, data, azione disponibile e risposta dell'assistenza determinano il singolo caso." },
      { label: "Metodo fasi e responsabilità di Lolobuy Sheet", note: "La matrice diagnostica è una guida editoriale indipendente, non un tempo di servizio promesso." },
    ],
    intro: [
      "Un'etichetta di stato è utile solo se collegata a fase, data e soggetto responsabile. «Inviato dal venditore» non significa che un pacco internazionale sia partito dalla Cina; «depositato» non significa che l'articolo sia stato approvato; un numero di tracciamento non implica sempre una prima scansione fisica del corriere. Trattare tutto il viaggio come un unico intervallo genera falsi allarmi e decisioni tardive.",
      "Il sito pubblico LoloBuy descrive acquisto, controlli e fotografie in magazzino, deposito e spedizione internazionale. Non pubblica una scadenza universale per ogni stato. Controlla il termine di deposito attuale del singolo articolo nell'account. Questa guida si concentra quindi sui riscontri: cosa rappresenta ogni fase, cosa verificare e quali informazioni rendono utile una richiesta di assistenza.",
    ],
    sections: [
      {
        heading: "Crea una cronologia prima di indagare uno stato fermo",
        paragraphs: [
          "Registra l'etichetta esatta, il numero d'ordine, l'ultimo orario, lo stato precedente e le note visibili. Tieni separati gli ordini d'acquisto dai pacchi, perché possono avere identificativi diversi. Se l'interfaccia raggruppa più articoli, seguili singolarmente: il ritardo di un venditore non descrive necessariamente il resto della spedizione.",
          "Usa sempre lo stesso riferimento orario e salva schermate solo quando aggiungono riscontri. La cronologia deve spiegare cosa sia cambiato e quando, non diventare una raccolta di schermate identiche. Includi le azioni completate da te — pagamento, conferma della variante, decisione QC o richiesta del pacco — perché un passaggio dell'acquirente non concluso può sembrare un ritardo di lavorazione.",
        ],
        bullets: ["Stato preciso e data/ora", "Identificativo dell'ordine o del pacco", "Ultima azione completata dall'acquirente", "Avviso o informazione richiesta", "Prossimo riscontro atteso, senza inventare una scadenza"],
      },
      {
        heading: "Interpreta gli stati di acquisto come fase del venditore",
        paragraphs: [
          "Uno stato relativo all'acquisto o all'approvvigionamento precede la spedizione del venditore. Verifica che il pagamento risulti registrato, che l'inserzione sia ancora attiva e che colore, taglia, versione e quantità siano chiari. Se la pagina è cambiata dopo l'invio, conserva sia i riscontri originali sia la pagina attuale, senza presumere che piattaforma e negozio vedano gli stessi contenuti che avevi visto tu.",
          "La richiesta utile è specifica: l'ordine alla fonte è stato effettuato, manca una conferma del venditore oppure servono chiarimenti dell'acquirente? In questa fase non chiedere un aggiornamento del tracking internazionale. Il pacco non esiste ancora e la disponibilità del negozio deve essere risolta prima che possano comparire i riscontri di magazzino.",
        ],
      },
      {
        heading: "Leggi l'invio del venditore come trasporto interno",
        paragraphs: [
          "L'etichetta che indica l'invio del venditore riguarda generalmente il tragitto verso il magazzino ricevente, non la tratta internazionale. Cerca un riferimento di tracking interno o una nota di spedizione, se presenti nell'ordine. Il prossimo riscontro significativo è la ricezione in magazzino, non una scansione nel paese di destinazione. Mantieni questa distinzione quando cerchi di capire dove si trovi l'articolo.",
          "Se lo stato resta invariato, confronta la data d'invio con l'ultimo evento del trasporto interno e controlla se il venditore abbia creato soltanto un numero senza scansione di accettazione. Non inventare una soglia oltre la quale il prodotto sarebbe perso. Chiedi conferma dell'ultimo evento del corriere, della corrispondenza dell'indirizzo o del sollecito al negozio, sulla base dei dati visibili nell'ordine.",
        ],
      },
      {
        heading: "Distingui la ricezione in magazzino dalla decisione QC",
        paragraphs: [
          "LoloBuy dichiara pubblicamente che gli articoli arrivati vengono controllati e fotografati. Uno stato di ricezione può quindi precedere le immagini complete o la disponibilità finale nel deposito. Controlla che siano arrivate tutte le unità, se il controllo sia ancora in corso e se una nota di eccezione richieda un intervento. Non approvare il prodotto solo perché il magazzino ne ha registrato la ricezione.",
          "Quando compaiono le foto, confronta identità, opzione selezionata, quantità, condizioni visibili e misure necessarie con l'ordine salvato. Documenta eventuali differenze sostanziali mentre le azioni di magazzino sono ancora disponibili. La homepage pubblica non indica una finestra di reso universale: tempi e possibilità vanno verificati nell'ordine e nella risposta attuale dell'assistenza.",
        ],
      },
      {
        heading: "Considera il deposito una disponibilità, non una garanzia di conformità",
        paragraphs: [
          "Lo stato di deposito indica che l'articolo ha raggiunto il magazzino e normalmente può essere incluso in una successiva decisione di spedizione. Non dimostra che pagina del venditore, taglia, colore e condizioni corrispondano alle aspettative. Controlla il termine di deposito attuale nell'account: non equivale a un diritto di reso per l'intero periodo né garantisce che ogni operazione resti disponibile fino alla scadenza.",
          "Registra la data d'arrivo e ogni problema irrisolto per ciascun articolo. In un acquisto composto da più prodotti, quello più vecchio può determinare il margine pratico di pianificazione anche se altri sono arrivati dopo. Risolvi i dubbi QC prima di concentrarti sul consolidamento, perché preparare il pacco trasforma prodotti separati in un'unica decisione di trasporto.",
        ],
      },
      {
        heading: "Separa richiesta del pacco, imballaggio e partenza",
        paragraphs: [
          "Creare una richiesta di pacco, ricevere peso e dimensioni dopo l'imballaggio e pagare il trasporto internazionale sono eventi distinti. Verifica articoli inclusi, destinazione, imballaggio, compatibilità delle linee, dimensioni, peso fatturabile e importo dovuto nella fase in cui ciascun dato diventa disponibile. Una stima precedente all'imballaggio non è la scheda definitiva della spedizione.",
          "Il tracking può essere assegnato prima dell'accettazione fisica del corriere. Distingui la creazione dell'etichetta dalla consegna effettiva al vettore. Salva numero del pacco, linea indicata, orario del pagamento e prima scansione quando compare. Questo crea un confine chiaro tra preparazione in magazzino e responsabilità del trasportatore.",
        ],
        bullets: ["Richiesta del pacco inviata", "Dati dopo l'imballaggio disponibili", "Trasporto pagato", "Consegna al corriere o prima scansione", "Scansioni nella rete di destinazione"],
      },
      {
        heading: "Analizza il tracking dall'ultimo evento fisico",
        paragraphs: [
          "Leggi testo dell'ultima scansione, luogo, data e fonte del corriere. La ripetizione di un evento di trasmissione elettronica dei dati è diversa da partenza, presentazione in dogana, arrivo a destinazione o tentativo di consegna. Quando possibile, confronta lo stesso identificativo sul sito del vettore: un aggregatore può aggiornarsi in ritardo o semplificare gli eventi.",
          "Quando indaghi un pacco internazionale, non contare dall'ordine del prodotto. Parti dalla consegna al corriere o dalla prima scansione fisica pertinente, poi identifica la fase responsabile del trasporto in quel momento. Le stime delle linee non sono garanzie universali e questa guida non inventa un numero fisso di giorni senza aggiornamenti che dimostri lo smarrimento.",
        ],
      },
      {
        heading: "Invia una richiesta con riscontri relativi alla fase corretta",
        paragraphs: [
          "Una buona richiesta identifica una scheda, un ultimo evento e un chiarimento desiderato. Per esempio: verificare se l'ordine alla fonte sia stato eseguito, confermare la consegna al corriere interno, spiegare un'eccezione del magazzino o controllare se il pacco sia arrivato al vettore internazionale. Allega soltanto inserzione, riga d'ordine, immagine QC o evento di tracking che sostenga la domanda.",
          "Aggiungi alla cronologia risposta, nuova data, azione promessa e prossimo controllo. Se lo stato cambia, conserva i riscontri precedenti invece di riscrivere la storia. Questo metodo rende più chiari i ritardi reali ed evita di attribuire al venditore, al magazzino o al corriere il lavoro di un altro soggetto.",
        ],
        links: [{ label: "Tracking LoloBuy senza aggiornamenti", href: "/it/articles/lolobuy-tracking-not-updating-guide" }, { label: "Guida alle fasi di spedizione", href: "/it/guides/shipping" }],
      },
    ],
  },
  "lolobuy-fees-explained": {
    slug: "lolobuy-fees-explained",
    title: "Costi LoloBuy 2026: prodotto, consegna in Cina e spedizione internazionale",
    searchTitle: "Costi LoloBuy 2026: commissioni, pagamento e spedizione",
    shortTitle: "Comprendere tutte le componenti dei costi LoloBuy",
    description: "Distingui le componenti del costo di un ordine LoloBuy, separa importi confermati e stimati e confronta i totali senza percentuali fisse inventate.",
    eyebrow: "DETTAGLIO DEI COSTI", published: "2026-09-15", updated: "2026-10-17", readingTime: "15 min di lettura",
    factCheckLine: "Sito pubblico e descrizione dell'app LoloBuy verificati il 15 settembre 2026. Revisione editoriale del 17 ottobre 2026; nessuna commissione fissa o quotazione di cambio non verificata è presentata come regola attuale.",
    visual: {
      eyebrow: "IL REGISTRO DEI COSTI", title: "Separa ogni voce prima di confrontare i totali.",
      caption: "Acquisto del prodotto e spedizione internazionale avvengono in fasi diverse: un singolo prezzo non descrive il costo completo.",
      items: [
        { label: "Origine", text: "Prezzo dell'articolo, quantità della variante e consegna in Cina." },
        { label: "Pagamento", text: "Valuta indicata, conversione e totale da pagare." },
        { label: "Magazzino", text: "Solo servizi e adeguamenti attuali effettivamente selezionati." },
        { label: "Pacco", text: "Dati dopo l'imballaggio, linea, protezione e costi a destinazione." },
      ],
    },
    sources: [
      { label: "Sito pubblico LoloBuy — verifica del 15 settembre 2026", note: "Fonte primaria per acquisto tramite link, servizi di magazzino e trasporto internazionale; non fornisce un tariffario pubblico universale." },
      { label: "Scheda ufficiale dell'app LoloBuy — verifica del 15 settembre 2026", note: "La descrizione pubblica cita pagamenti sicuri, supporto multilingue e multivaluta e spedizione internazionale senza specificare ogni costo." },
      { label: "Schermate attuali di ordine, pagamento e pacco", note: "Importo dovuto e condizioni della transazione concreta sono i riscontri determinanti per il costo." },
      { label: "Registro dei costi di Lolobuy Sheet", note: "Il prospetto e le regole di confronto costituiscono un'analisi editoriale indipendente." },
    ],
    intro: [
      "L'espressione «costi LoloBuy» spesso riunisce transazioni differenti. Prima si vede il prezzo del venditore, poi un totale in un'altra valuta, successivamente le opzioni di magazzino e infine un preventivo internazionale quando sono disponibili i dati del pacco. Unire troppo presto queste fasi produce un numero apparentemente preciso ma ancora incompleto.",
      "Il sito pubblico LoloBuy descrive acquisto, controlli e fotografie in magazzino, deposito e trasporto internazionale. La scheda dell'app cita inoltre pagamenti e supporto multivaluta. Nessuna di queste descrizioni fornisce una percentuale permanente valida per ogni ordine. È più utile tenere un registro che distingua chiaramente importi confermati, stimati e sconosciuti.",
    ],
    sections: [
      {
        heading: "Parti dal calcolo esatto dell'ordine alla fonte",
        paragraphs: [
          "Registra il prezzo attuale della variante scelta, il numero di unità e la consegna in Cina indicata dal venditore. Non usare il prezzo minimo dell'inserzione prima di selezionare taglia, colore, confezione e fascia di quantità desiderati. Nelle pagine con più opzioni, il primo importo visibile può riguardare un acconto, un accessorio o una versione più piccola.",
          "Accanto all'importo conserva valuta e data. Se la pagina cambia, mantieni il valore utilizzato al momento dell'ordine e confrontalo con gli eventuali adeguamenti successivi. Il prezzo nello spreadsheet è un'indicazione per la ricerca, non un preventivo garantito, e non deve sostituire senza spiegazioni il dato attuale dell'ordine.",
        ],
        bullets: ["Prezzo unitario della variante", "Quantità", "Consegna in Cina", "Valuta del venditore e data", "Adeguamento o conferma del venditore"],
      },
      {
        heading: "Distingui i costi del venditore da quelli della piattaforma",
        paragraphs: [
          "Prezzo del prodotto e consegna interna derivano dalla transazione originale. La piattaforma può mostrare voci di servizio, elaborazione, pagamento o servizi opzionali, ma le etichette vanno lette nel checkout attuale, senza dedurle da altri agenti o vecchie promozioni. Assegna una riga separata a ogni voce visibile e copiane il nome esatto.",
          "L'assenza di una commissione separata non dimostra che ogni servizio sia gratuito. Il totale può riflettere prezzi o conversioni in altro modo e le fasi successive possono aggiungere costi. Allo stesso tempo, non inventare una percentuale nascosta soltanto perché il totale convertito differisce da un calcolo effettuato con un cambio di mercato.",
        ],
      },
      {
        heading: "Valuta la conversione dalla schermata di pagamento",
        paragraphs: [
          "Quando valuta del venditore e valuta di pagamento sono diverse, registra subtotale originale, importo convertito mostrato, orario e addebito finale del metodo scelto. Confronta valori riferiti allo stesso momento. I cambi si muovono e carta o portafoglio possono applicare condizioni proprie di conversione o pagamento internazionale, esterne all'importo mostrato nell'ordine.",
          "Il rapporto tra gli importi è un cambio effettivo osservato, non la prova di un ricarico permanente. Un singolo ordine può includere arrotondamenti, commissioni di pagamento, coupon o adeguamenti. Associa il risultato a metodo e data, evitando che un confronto futuro trasformi un valore temporaneo in una regola della piattaforma.",
        ],
      },
      {
        heading: "Mantieni condizionali i servizi opzionali di magazzino",
        paragraphs: [
          "LoloBuy conferma pubblicamente controlli e fotografie, ma la homepage non fornisce un elenco permanente completo con i prezzi di ogni foto aggiuntiva, misura, video, richiesta di imballaggio o altro servizio. Inserisci un costo di magazzino soltanto quando l'ordine attuale lo propone, lo selezioni e viene mostrato l'importo dovuto.",
          "Collega la spesa a una decisione. Una misura aggiuntiva può essere utile per la vestibilità; un'altra angolazione può chiarire un difetto. Una richiesta generica di ulteriori riscontri può aggiungere un costo senza risolvere il dubbio. Registra sia l'importo sia l'incertezza che il servizio dovrebbe eliminare.",
        ],
      },
      {
        heading: "Stima il trasporto internazionale senza presentarlo come definitivo",
        paragraphs: [
          "Prima dell'imballaggio potresti avere pesi dei prodotti, dimensioni dichiarate dal venditore o medie di categoria. Trattali come intervalli. Il trasporto può dipendere da destinazione, linee compatibili, peso reale, peso volumetrico, dimensioni esterne, restrizioni e tariffe attuali. Una tariffa universale al chilogrammo ignora proprio le variabili che spesso cambiano il risultato.",
          "Per pianificare usa uno scenario basso, uno di riferimento e uno alto. Sostituisci le stime con i dati del pacco preparato appena disponibili. Registra quale peso venga fatturato, protezioni e imballaggi selezionati e se l'importo escluda imposte a destinazione, gestione doganale, consegna in aree remote o altri costi locali.",
        ],
        bullets: ["Peso stimato degli articoli", "Volume previsto dopo l'imballaggio", "Linea compatibile da confermare", "Peso fatturabile finale", "Voci escluse dal preventivo"],
      },
      {
        heading: "Confronta consolidamento e divisione sul costo complessivo",
        paragraphs: [
          "Un solo pacco può ridurre la ripetizione dei costi base, mentre un pacco grande o irregolare può aumentare il peso volumetrico o eliminare alcune linee. Dividere può isolare prodotti soggetti a restrizioni o fragili, ma anche duplicare imballaggi e importi minimi. Non decidere dal solo numero di articoli: confronta le configurazioni disponibili per destinazione e contenuto effettivi.",
          "Annota il motivo di ogni divisione: compatibilità della linea, tempi di deposito, concentrazione del valore, fragilità o ingombro. Se non esiste una ragione concreta, valuta l'opzione unita. Se un solo articolo modifica linea o dimensioni dell'intero pacco, confrontalo separatamente. La voce più economica non coincide sempre con il costo completo più basso.",
        ],
      },
      {
        heading: "Tratta i coupon come riduzioni, non come prezzi ordinari",
        paragraphs: [
          "Inserisci il coupon come riga negativa separata solo dopo che il checkout attuale lo ha accettato e mostra il totale ridotto. Registra privatamente codice o nome della promozione, ambito, scadenza indicata e fase dell'ordine o del pacco in cui si applica. Non pubblicare un valore promozionale passato come regola permanente sulle commissioni.",
          "Confronta i totali prima e dopo lo sconto. Un coupon nominalmente elevato può valere soltanto oltre una soglia, su linee specifiche o per alcuni account. Conta l'importo netto, più del numero pubblicitario, e un ordine futuro va preventivato senza presumere che la stessa offerta ritorni.",
        ],
      },
      {
        heading: "Concludi con un prospetto di importi confermati e stimati",
        paragraphs: [
          "Usa colonne per fase, voce, importo, valuta, stato, riscontro e data. Considera confermato un valore soltanto se sostenuto da una scheda attuale del venditore, dell'ordine, del pagamento o del pacco. Segna come stimati il trasporto preliminare e i costi a destinazione; lascia sconosciuti i servizi non ancora quantificati, anziché attribuire loro zero. Otterrai un intervallo onesto prima dell'invio e un totale verificabile dopo la consegna.",
          "Per confrontare, calcola separatamente prodotti, consegna in Cina, pagamento, servizi di magazzino, trasporto internazionale e costi a destinazione. Dividi poi per unità utili solo se serve a decidere. Un articolo economico ma voluminoso può costare all'arrivo più di un prodotto compatto e più caro: il registro finale dovrebbe orientare anche le scelte future, oltre a spiegare l'ordine attuale.",
        ],
        links: [{ label: "Pagamenti LoloBuy in due fasi", href: "/it/articles/lolobuy-payment-guide" }, { label: "Pianificare peso e costi di spedizione", href: "/it/guides/shipping" }],
      },
    ],
  },
  "lolobuy-payment-guide": {
    slug: "lolobuy-payment-guide",
    title: "Pagamenti LoloBuy: primo acquisto, adeguamenti e spedizione internazionale",
    searchTitle: "Pagamento LoloBuy: acquisto, adeguamenti e trasporto",
    shortTitle: "Pianificare le due fasi di pagamento LoloBuy",
    description: "Separa il pagamento dei prodotti dal trasporto internazionale, verifica valuta e adeguamenti e conserva un registro fondato sui dati delle transazioni.",
    eyebrow: "FASI DI PAGAMENTO", published: "2026-09-15", updated: "2026-10-17", readingTime: "14 min di lettura",
    factCheckLine: "Descrizioni pubbliche di acquisto e spedizione e scheda ufficiale dell'app verificate il 15 settembre 2026. Revisione editoriale del 17 ottobre 2026, senza nuova prova di pagamento diretta.",
    visual: {
      eyebrow: "DUE DECISIONI, DUE TOTALI", title: "Il checkout del prodotto non è il costo finale all'arrivo.",
      caption: "Il primo ordine finanzia l'acquisto; la decisione sul pacco utilizza in seguito i riscontri del magazzino e dell'imballaggio.",
      items: [
        { label: "Ordina", text: "Conferma origine, variante, quantità e importo in Cina." },
        { label: "Riconcilia", text: "Registra modifiche del venditore, rimborsi e variazioni del saldo." },
        { label: "Prepara", text: "Controlla articoli depositati, dati del pacco e linee compatibili." },
        { label: "Spedisci", text: "Paga il totale attuale del pacco dopo i controlli finali." },
      ],
    },
    sources: [
      { label: "Sito pubblico LoloBuy — verifica del 15 settembre 2026", note: "Fonte primaria per acquisto tramite link, gestione in magazzino e spedizione internazionale come fasi separate." },
      { label: "Scheda ufficiale dell'app LoloBuy — verifica del 15 settembre 2026", note: "La descrizione cita pagamenti sicuri e supporto multilingue e multivaluta senza elencare ogni metodo o commissione." },
      { label: "Checkout e transazioni attuali", note: "Metodi disponibili, totali dovuti, valuta, stato, rimborsi e adeguamenti vanno verificati nell'account." },
      { label: "Metodo di controllo dei pagamenti di Lolobuy Sheet", note: "I passaggi di riconciliazione sono indicazioni editoriali indipendenti." },
    ],
    intro: [
      "Un acquisto internazionale normalmente comporta più di una decisione di pagamento. La prima finanzia il prodotto alla fonte e il trasporto in Cina. Un pagamento successivo può coprire il pacco internazionale preparato, dopo ricezione, controllo e disponibilità dei dati d'imballaggio. Chiamare entrambi semplicemente «pagamento LoloBuy» rende facile confondere il subtotale dei prodotti con il costo completo oppure pagare senza verificare la fase.",
      "Il sito pubblico LoloBuy descrive acquisto tramite link, controlli, fotografie, deposito e spedizione internazionale. La scheda ufficiale dell'app cita pagamenti sicuri e supporto multivaluta, ma le descrizioni pubbliche non offrono un elenco permanente di metodi, commissioni o tempi di rimborso. Questa guida mostra quindi come controllare la transazione attuale, senza promettere condizioni che possono cambiare.",
    ],
    sections: [
      {
        heading: "Identifica con precisione cosa copre il primo pagamento",
        paragraphs: [
          "Prima di pagare, confronta URL originale, venditore, colore, taglia o versione selezionata, quantità, importo del prodotto e consegna in Cina. Controlla ogni nota che incide su ciò che deve essere acquistato. Se l'inserzione presenta prezzi per quantità o più confezioni, conferma quale combinazione produca il totale mostrato, senza affidarti al prezzo minimo della pagina.",
          "Leggi tutte le righe della schermata di pagamento e registra la valuta. Subtotale originale, conversione mostrata, commissione, coupon e saldo del portafoglio sono componenti diverse. Documenta il primo pagamento come totale della fase di acquisto, non come costo definitivo per ricevere i prodotti in un altro paese.",
        ],
        bullets: ["Riferimento dell'ordine", "Variante e quantità esatte", "Subtotale del venditore", "Voci visibili di consegna o servizio", "Valuta e importo finale dovuto"],
      },
      {
        heading: "Verifica il metodo nell'account attuale",
        paragraphs: [
          "Usa soltanto un metodo proposto dal checkout per il tuo account, la valuta e la transazione. Un sistema citato in un vecchio video, in un altro paese o su un'altra piattaforma potrebbe non essere disponibile ora. Controlla beneficiario, importo, valuta e riferimento dell'ordine prima di autorizzare; ritorna all'ordine da un segnalibro affidabile, non da un messaggio inatteso.",
          "La descrizione ufficiale dell'app parla di pagamenti sicuri, ma questa indicazione generale non elimina la necessità di proteggere credenziali e controllare la transazione. Non inviare password, dati completi della carta o codici monouso a chi sostiene di dover completare manualmente l'ordine. Usa il checkout autenticato e conserva la conferma.",
        ],
      },
      {
        heading: "Confronta le conversioni riferite allo stesso momento",
        paragraphs: [
          "Se valuta originale e valuta di pagamento differiscono, salva contemporaneamente importo alla fonte e totale dovuto. Un confronto fatto ore dopo può confondere il movimento del mercato con le condizioni della piattaforma o del fornitore di pagamento. Controlla anche se carta o portafoglio propongano una propria conversione: l'importo contabilizzato può differire da quello mostrato prima dell'autorizzazione.",
          "Non trasformare un singolo rapporto osservato in un ricarico di cambio permanente. Arrotondamenti, coupon, commissioni e adeguamenti dell'ordine possono influire. Registra il cambio effettivo come osservazione legata a data, metodo e transazione, poi confronta i pagamenti futuri sulla stessa base.",
        ],
      },
      {
        heading: "Attendi un esito registrato invece di pagare due volte",
        paragraphs: [
          "Dopo l'autorizzazione, annota se la transazione risulti riuscita, in elaborazione, fallita o stornata. Se il browser si chiude o l'ordine appare ancora non pagato, controlla cronologia e registrazione del fornitore di pagamento prima di ripetere. Due tentativi possono generare due autorizzazioni anche se immediatamente è visibile un solo ordine.",
          "Quando lo stato è incerto, fornisci all'assistenza riferimento dell'ordine, orario, importo, valuta, metodo e identificativo non sensibile della ricevuta. Oscura dati completi di conto e carta. Chiedi se la piattaforma abbia ricevuto il pagamento e se occorra un nuovo tentativo; un movimento bancario in sospeso non dimostra da solo che l'ordine sia stato finanziato correttamente.",
        ],
      },
      {
        heading: "Riconcilia modifiche del venditore e movimenti del saldo",
        paragraphs: [
          "Dopo l'invio dell'ordine il venditore può modificare disponibilità, consegna interna o importo. Tratta ogni richiesta di integrazione come una nuova decisione: confrontala con l'inserzione attuale e verifica cosa sia cambiato. Registra allo stesso modo cancellazioni parziali, rimborsi del negozio e accrediti del portafoglio collegandoli all'ordine originale, anziché considerarli denaro libero senza spiegazione.",
          "La homepage pubblica non indica un tempo universale di elaborazione dei rimborsi. Fanno riferimento lo stato attuale della transazione e la comunicazione dell'assistenza. Conserva date distinte per azione del venditore, registrazione della piattaforma, accredito sul saldo e ritorno al metodo di pagamento originario: sono eventi separati che potrebbero non avvenire insieme.",
        ],
      },
      {
        heading: "Prepara il secondo pagamento usando i dati del pacco",
        paragraphs: [
          "Il trasporto internazionale diventa una decisione informata quando conosci articoli depositati inclusi, destinazione, dimensioni esterne, peso fatturabile, linee compatibili e imballaggio scelto. Le stime preliminari servono a riservare un budget, ma non sono il totale definitivo. Ricontrolla i prodotti soggetti a restrizioni o fragili prima di inviare la richiesta del pacco.",
          "Confronta le condizioni delle linee attualmente visibili, non una raccomandazione statica. Verifica se l'importo includa protezioni, assicurazione o altri servizi scelti e se imposte, costi doganali o consegna locale restino esclusi. Salva la schermata finale del pacco prima di pagare, così eventuali dubbi successivi avranno un riferimento preciso.",
        ],
        bullets: ["Articoli depositati inclusi", "Dimensioni esterne e peso fatturabile", "Destinazione e linea disponibile", "Servizi selezionati", "Esclusioni indicate e totale finale"],
      },
      {
        heading: "Evita supposizioni dell'ultimo momento sul pagamento del pacco",
        paragraphs: [
          "Controlla l'indirizzo nella scheda definitiva, compresi destinatario, codice postale, regione e formato del telefono quando richiesto. Confrontalo con una fonte affidabile anziché con la memoria. La conferma del pagamento non può correggere una destinazione sbagliata e una linea selezionata per un paese potrebbe non rimanere valida dopo una modifica dell'indirizzo.",
          "Non pagare soltanto perché passa il tempo di deposito. Verifica nell'account la data d'arrivo e la scadenza attuale di ciascun articolo: una durata generica non sostituisce questi dati e non giustifica l'invio frettoloso di un prodotto con dubbi QC irrisolti. Risolvi le differenze importanti e controlla l'articolo più vecchio prima di autorizzare la spedizione.",
        ],
      },
      {
        heading: "Conserva un registro completo rispettando la privacy",
        paragraphs: [
          "Per ogni transazione annota fase, riferimento dell'ordine o del pacco, importo, valuta, metodo, orario, stato e oggetto del pagamento. Collega a quella riga adeguamenti e rimborsi. Non archiviare password, codici di sicurezza, numeri completi delle carte o documenti d'identità non necessari. Per la maggior parte delle riconciliazioni basta una ricevuta con i dati sensibili oscurati.",
          "Alla fine somma pagamenti dei prodotti, adeguamenti successivi, servizi di magazzino, trasporto internazionale ed eventuali costi a destinazione, poi sottrai una sola volta rimborsi o crediti confermati. Questo chiarisce la differenza tra «quanto ho pagato all'inizio» e «quanto è costato davvero l'ordine», senza inventare commissioni o regole di cambio valide per tutta la piattaforma.",
        ],
        links: [{ label: "Registro completo dei costi LoloBuy", href: "/it/articles/lolobuy-fees-explained" }, { label: "Preparare la spedizione internazionale", href: "/it/guides/shipping" }],
      },
    ],
  },
  "lolobuy-return-refund-guide": {
    slug: "lolobuy-return-refund-guide",
    title: "Resi e rimborsi LoloBuy: verifiche da fare prima della spedizione internazionale",
    searchTitle: "Reso e rimborso LoloBuy: controlli prima della spedizione",
    shortTitle: "Gestire un reso o rimborso LoloBuy prima dell'invio",
    description: "Prepara i riscontri per un reso o rimborso LoloBuy, distingui problemi del venditore e del magazzino e controlla le azioni attuali prima della partenza del pacco.",
    eyebrow: "RISCONTRI PER IL RESO", published: "2026-09-15", updated: "2026-10-17", readingTime: "15 min di lettura",
    factCheckLine: "Descrizione pubblica dei controlli in magazzino verificata il 15 settembre 2026. Revisione editoriale del 17 ottobre 2026; nessuna finestra di reso o durata del rimborso universale viene promessa.",
    visual: {
      eyebrow: "IL DOSSIER DELLA RICHIESTA", title: "Collega ordine, riscontro, differenza e azione richiesta.",
      caption: "Una richiesta è più facile da valutare quando mostra cosa è stato ordinato, cosa è arrivato e perché la differenza conta.",
      items: [
        { label: "Atteso", text: "Inserzione salvata, opzione esatta, quantità e condizioni del venditore." },
        { label: "Osservato", text: "Foto di magazzino, etichetta, misura o componente mancante." },
        { label: "Differenza", text: "Una frase oggettiva che collega i riscontri." },
        { label: "Richiesta", text: "Un'azione attuale di reso, cambio, chiarimento o rimborso." },
      ],
    },
    sources: [
      { label: "Sito pubblico LoloBuy — verifica del 15 settembre 2026", note: "Fonte primaria per controlli, fotografie e deposito; la pagina pubblica indicizzata non offre una politica di reso universale completa." },
      { label: "Schede attuali del venditore, ordine e assistenza", note: "Condizioni del negozio, stato di magazzino e azioni disponibili per l'ordine specifico determinano il caso." },
      { label: "Metodo del dossier di Lolobuy Sheet", note: "Organizzazione dei riscontri e criteri decisionali sono indicazioni editoriali indipendenti." },
    ],
    intro: [
      "Il momento migliore per verificare un articolo sbagliato, un difetto visibile o un componente mancante è prima che entri in un pacco internazionale. In magazzino puoi ancora confrontare ordine originale e fotografie nello stesso dossier. Dopo la partenza, il problema può coinvolgere ulteriori trasporti, gestione del corriere e riscontri a destinazione, rendendo più complessa la soluzione.",
      "LoloBuy conferma pubblicamente che gli arrivi vengono controllati e fotografati e descrive un servizio di deposito. La scadenza attuale va verificata sul singolo articolo. La homepage pubblica indicizzata non pubblica una sola finestra di reso, tabella di costi o durata del rimborso valida per tutti i venditori e gli ordini. Una guida utile deve mostrare come trovare l'azione disponibile e preparare una richiesta precisa, senza prometterne l'esito.",
    ],
    sections: [
      {
        heading: "Conserva i dati dell'ordine prima di esaminare il difetto",
        paragraphs: [
          "Salva URL originale, venditore, titolo, colore, taglia o versione, quantità, immagine dell'opzione, tabella delle misure, prezzo, consegna interna e data. Includi ogni condizione del negozio che incida direttamente su resi o prodotti personalizzati. Se la pagina cambia, conserva sia la versione originale sia quella attuale, senza sostituire l'una con l'altra.",
          "Descrivi il prodotto atteso in una frase neutrale, indicando per esempio taglia e colore selezionati e gli accessori inclusi. Questo impedisce che il controllo QC si sposti verso una variante diversa mostrata altrove nella pagina. È la registrazione dell'ordine, non la foto principale o la memoria, a definire il riferimento del confronto.",
        ],
        bullets: ["Inserzione originale e venditore", "Opzione e quantità precise", "Descrizione o tabella decisiva", "Riferimento dell'ordine e data", "Condizione pertinente del venditore"],
      },
      {
        heading: "Classifica il problema in base ai riscontri necessari",
        paragraphs: [
          "I problemi d'identità comprendono prodotto, colore, taglia sull'etichetta, variante o quantità errati. Quelli di condizione includono rotture, macchie, fori e componenti mancanti. I problemi di misura richiedono un metodo chiaro e punti di riferimento. Le differenze d'aspetto, come lievi variazioni di colore o forma, vanno valutate con cautela perché luce, compressione e angolazione possono alterare il confronto.",
          "Non affermare che le foto di magazzino dimostrino composizione interna, comodità, durata, prestazioni elettroniche o autenticità. Se il reclamo dipende da una proprietà non visibile, identifica quale riscontro attuale e consentito potrebbe verificarla. Una richiesta basata su una conclusione fotografica impossibile è meno solida di una che dichiara onestamente il limite.",
        ],
      },
      {
        heading: "Descrivi la differenza come un contrasto osservabile",
        paragraphs: [
          "Usa una struttura semplice: l'ordine indica X; la foto o misura Y mostra Z; l'articolo ricevuto sembra quindi diverso in un punto sostanziale. Cita numero della foto, etichetta o estremi del righello. Evita aggettivi come pessimo, falso o inaccettabile quando una descrizione oggettiva — taglia errata, tracolla mancante, angolo crepato — comunica meglio il problema.",
          "Se il riscontro è ambiguo, presentalo come un dubbio da risolvere. Un segno scuro può essere una macchia, un'ombra o un artefatto di compressione; un colore diverso può dipendere dalla luce. Chiedi una vista mirata che distingua queste spiegazioni. Non trasformare l'incertezza in prova soltanto per rendere la richiesta più forte.",
        ],
      },
      {
        heading: "Controlla nell'ordine attuale azione e scadenza",
        paragraphs: [
          "Apri l'ordine specifico e controlla stato, data d'arrivo in magazzino, azione di reso o assistenza disponibile, termine mostrato ed eventuali condizioni del venditore. Il termine di deposito non coincide con una finestra di reso. Deposito, accettazione del negozio e lavorazione della piattaforma sono questioni distinte e possono avere tempi diversi.",
          "Se l'interfaccia non è chiara, chiedi all'assistenza quale azione sia disponibile ora e quali riscontri o costi richieda. Conserva risposta e data. Non applicare a questo ordine una finestra di reso, una promessa di gratuità o un calendario di rimborso presi da un altro agente, marketplace o vecchio tutorial.",
        ],
      },
      {
        heading: "Scegli fra chiarimento, verifica aggiuntiva, cambio e reso",
        paragraphs: [
          "Chiedi chiarimenti quando la scheda dell'ordine è ambigua e riscontri mirati quando un fatto osservabile può cambiare la decisione. Valuta il cambio solo se venditore e ordine attuale lo consentono e il sostituto può essere confrontato con la stessa specifica. Valuta il reso quando la differenza è importante e l'azione disponibile lo supporta.",
          "Confronta incertezza, costi e tempi mostrati per ogni opzione. Un cambio può richiedere un nuovo invio del negozio e un nuovo ciclo QC; un reso può comportare trasporto interno o trattenute; accettare il prodotto trasferisce il rischio alla fase internazionale. Non esiste una scelta valida per ogni acquirente, ma ogni compromesso deve restare visibile.",
        ],
        bullets: ["Chiarire la scheda", "Richiedere un controllo che incida sulla decisione", "Cambiare secondo le condizioni attuali", "Restituire secondo le condizioni attuali", "Accettare registrando il rischio residuo"],
      },
      {
        heading: "Invia riscontri pertinenti proteggendo i dati personali",
        paragraphs: [
          "Includi riferimento dell'ordine, opzione attesa, riscontro di magazzino, frase che descrive il contrasto e soluzione richiesta. Fornisci immagini complete insieme a un ritaglio evidenziato se il dettaglio è piccolo. Rimuovi indirizzi, dati di pagamento e identificazione estranei al problema. Un dossier mirato permette di seguire il caso senza esaminare ogni schermata dell'acquisto.",
          "Mantieni la comunicazione fattuale e chiedi il prossimo evento osservabile: approvazione del venditore, etichetta o tracking del reso, uscita dal magazzino, ordine sostitutivo, registrazione del rimborso o accredito sul saldo. La presa in carico dell'assistenza non è una soluzione completata. Aggiorna il caso quando si verifica un nuovo evento.",
        ],
      },
      {
        heading: "Segui separatamente reso e rimborso",
        paragraphs: [
          "Un articolo restituito può attraversare preparazione in magazzino, corriere interno, ricezione del negozio e decisione del venditore prima che compaia un rimborso. Registra ciascun evento e importo. Se viene accettata solo una parte della richiesta o compare una trattenuta, confrontala con le condizioni attuali e chiedi una spiegazione collegata all'ordine.",
          "Un accredito sul saldo della piattaforma e un rimborso al metodo di pagamento originale non hanno la stessa destinazione. Registra dove compare il valore, in quale valuta e in quale data. La homepage pubblica non promette un periodo di lavorazione universale: segui lo stato reale della transazione, senza contare verso una scadenza inventata.",
        ],
      },
      {
        heading: "Chiudi il caso prima di comporre il pacco",
        paragraphs: [
          "Non includere l'articolo contestato in un pacco mentre una differenza sostanziale o un reso restano irrisolti. Conferma se sia stato rimosso, sostituito, accettato o rimborsato, poi aggiorna l'elenco del deposito. Ricontrolla la data dell'articolo più vecchio e la relativa scadenza attuale, perché la gestione del reclamo non nasconda un problema di deposito degli altri prodotti.",
          "Concludi con un breve resoconto: problema, riscontri, condizioni attuali della piattaforma o del venditore, azione scelta, costi diretti, importo rimborsato e data finale. Questo migliora le future decisioni su prodotti e negozi senza trasformare un solo caso in un'affermazione universale sui resi LoloBuy.",
        ],
        links: [{ label: "Foto QC e misure aggiuntive", href: "/it/articles/lolobuy-extra-qc-photos-measurements" }, { label: "Controllare pagamenti e rimborsi", href: "/it/articles/lolobuy-payment-guide" }],
      },
    ],
  },
  "lolobuy-extra-qc-photos-measurements": {
    slug: "lolobuy-extra-qc-photos-measurements",
    title: "Foto QC e misure aggiuntive LoloBuy: richiedere riscontri che risolvano un dubbio concreto",
    searchTitle: "Foto QC LoloBuy aggiuntive: richieste, misure e controlli",
    shortTitle: "Richiedere foto QC LoloBuy davvero utili",
    description: "Prepara una richiesta mirata di foto o misure QC LoloBuy, definisci il riscontro necessario ed evita immagini aggiuntive che non cambiano la decisione.",
    eyebrow: "RICHIESTE QC MIRATE", published: "2026-09-15", updated: "2026-10-17", readingTime: "15 min di lettura",
    factCheckLine: "Descrizione pubblica di controlli e fotografie in magazzino verificata il 15 settembre 2026. Revisione editoriale del 17 ottobre 2026; non vengono inventati quantità di foto, tariffe o servizi video.",
    visual: {
      eyebrow: "UN DUBBIO PER IMMAGINE", title: "Chiedi un risultato osservabile, non soltanto più fotografie.",
      caption: "Una richiesta utile precisa articolo, vista, riferimenti e decisione che dipende dal riscontro.",
      items: [
        { label: "Lacuna", text: "Individua l'incertezza importante nelle immagini esistenti." },
        { label: "Vista", text: "Specifica angolo, distanza, luce o posizione del righello." },
        { label: "Riferimento", text: "Indica etichette, bordi o punti che devono restare visibili." },
        { label: "Decisione", text: "Spiega se il risultato serve per vestibilità, reso o spedizione." },
      ],
    },
    sources: [
      { label: "Sito pubblico LoloBuy — verifica del 15 settembre 2026", note: "Fonte primaria per la dichiarazione che gli arrivi in magazzino vengono controllati e fotografati." },
      { label: "Ordine di magazzino e assistenza attuali", note: "L'account deve confermare se siano disponibili foto aggiuntive, misurazioni o video, quanto costino e quando possano essere richiesti." },
      { label: "Metodo di richiesta dei riscontri di Lolobuy Sheet", note: "Modelli di richiesta e criteri di misurazione sono indicazioni editoriali indipendenti." },
    ],
    intro: [
      "Un riscontro QC aggiuntivo è utile quando risolve una decisione precisa. È superfluo quando aggiunge soltanto un'altra foto generale delle stesse superfici. Chi compra scarpe può aver bisogno della soletta removibile misurata dal tallone alla punta; per una borsa può servire la larghezza dell'apertura; per un indumento, la distanza tra cuciture definite del torace. «Fate più foto» non comunica nessuna di queste esigenze.",
      "LoloBuy dichiara pubblicamente che gli arrivi vengono controllati e fotografati. La homepage pubblica indicizzata non specifica un numero universale di foto gratuite, un prezzo per le aggiuntive, un servizio di misurazione o una tariffa video. Questa guida si concentra quindi su come formulare la richiesta e invita a verificare disponibilità e costo nell'ordine attuale prima di farvi affidamento.",
    ],
    sections: [
      {
        heading: "Esamina le immagini esistenti in un ordine costante",
        paragraphs: [
          "Parti dall'identità: tipo di prodotto, colore, taglia indicata, versione, quantità e parti incluse. Passa alle condizioni: davanti, dietro, lati, angoli, cuciture, chiusure e danni evidenti. Controlla infine dettagli specifici della categoria e misure. Una sequenza costante evita che un piccolo problema estetico nasconda una variante sbagliata o un componente mancante.",
          "Classifica ogni dubbio come dato noto, dato contraddetto o dato non mostrato. Non richiedere una nuova immagine per un fatto già visibile a risoluzione sufficiente. L'elenco deve isolare soltanto le lacune che possono modificare una decisione di approvazione, chiarimento, cambio, reso o preparazione del pacco.",
        ],
        bullets: ["Identità e opzione", "Quantità e componenti inclusi", "Condizioni visibili", "Misure decisive", "Punti importanti non visibili o ambigui"],
      },
      {
        heading: "Definisci la decisione prima dell'angolazione fotografica",
        paragraphs: [
          "Stabilisci cosa farai per ciascun risultato. Se la soletta rientra nell'intervallo accettabile, tieni le scarpe; se è chiaramente fuori, verifica l'azione di reso attuale. Se un segno scompare con luce neutra, consideralo un artefatto dell'immagine; se rimane, documenta la condizione. Questo mantiene proporzionata la richiesta.",
          "Evita di chiedere al magazzino un giudizio soggettivo sulla qualità o sull'autenticità. Chiedi ciò che può osservare: testo dell'etichetta, lettura del righello, allineamento delle cuciture, superficie di un componente, parte assente o posizione di un danno. L'interpretazione resta tua, entro i limiti di una fotografia.",
        ],
      },
      {
        heading: "Scrivi la richiesta fotografica con quattro riferimenti",
        paragraphs: [
          "Una richiesta chiara nomina ordine o articolo, lato o caratteristica richiesta, inquadratura e riferimento. Per esempio: fotografare insieme le due etichette di taglia delle scarpe, abbastanza vicino da leggere tutto e distinguendo sinistra e destra. Per un angolo di una borsa, richiedi una vista frontale con luce uniforme che mostri tutto l'angolo e la cucitura vicina.",
          "Evita espressioni relative come «più vicino», «meglio» o «nello stesso punto». Chi fotografa potrebbe non sapere a quale immagine precedente ti riferisci o quale dettaglio conti. Cita il numero della foto attuale e descrivi la modifica desiderata: vista più ampia, angolo perpendicolare, lato opposto, confronto con luce naturale o righello allineato a estremi nominati.",
        ],
      },
      {
        heading: "Controlla il metodo di misurazione degli indumenti",
        paragraphs: [
          "Specifica che il capo sia disteso senza essere tirato. Definisci gli estremi: larghezza del torace da cucitura ascellare a cucitura ascellare, spalle tra le rispettive cuciture, lunghezza da un punto preciso del collo all'orlo, manica dalla cucitura della spalla o vita attraverso la cintura. Non confondere una circonferenza con una larghezza misurata in piano.",
          "Confronta il metodo del magazzino con la tabella del venditore e con un tuo capo di riferimento. Piccole differenze possono dipendere da tensione del tessuto, cucitura scelta o posizione del righello: definisci quindi un intervallo accettabile prima di interpretare la foto. Se gli estremi non si vedono o il righello è piegato, la misura non giustifica una conclusione precisa.",
        ],
      },
      {
        heading: "Controlla il metodo di misurazione delle scarpe",
        paragraphs: [
          "Per le scarpe, taglia sull'etichetta e spazio interno sono riscontri diversi. Quando possibile, chiedi la soletta removibile distesa con un righello dal bordo del tallone al punto più lungo della punta. Se non si può estrarre, chiedi quale misura sia realmente fattibile anziché considerare la lunghezza della suola esterna equivalente allo spazio per il piede. Per una possibile coppia spaiata, fotografa insieme entrambe le etichette.",
          "Confronta il valore con la soletta di una scarpa che calza bene, misurata con lo stesso metodo. Non scegliere solo da una tabella generica di conversione delle taglie. Forma, margine in punta e costruzione incidono ancora sulla vestibilità: la foto riduce l'incertezza, ma non garantisce comodità.",
        ],
      },
      {
        heading: "Definisci viste e misure per borse, accessori e componenti",
        paragraphs: [
          "Per una borsa indica la dimensione e se sia esterna: larghezza alla base o nel punto più ampio, altezza senza manici, profondità alla base, intervallo della tracolla o apertura. Chiedi che nastro o righello partano da uno zero visibile e rimangano sullo stesso piano del bordo misurato. Altrimenti la prospettiva può alterare il risultato.",
          "Per un componente metallico chiedi una vista completa insieme a un dettaglio ravvicinato con luce uniforme. Un ritaglio macro isolato può far sembrare gravi polvere, riflessi o minime variazioni di finitura. Per gli accessori includi un riferimento dimensionale e i punti di fissaggio. Lo scopo è vedere se il pezzo sia presente, allineato e visibilmente integro, non produrre un'immagine drammatica.",
        ],
      },
      {
        heading: "Conferma disponibilità, prezzo e tempi della richiesta",
        paragraphs: [
          "Apri l'ordine di magazzino attuale e verifica se venga offerta la foto, misura o altra ispezione desiderata. Conferma importo, valuta, lavorazione prevista e scadenze pertinenti a quell'ordine. La homepage pubblica non giustifica la pubblicazione di un numero permanente di immagini gratuite o di un prezzo fisso per i servizi aggiuntivi.",
          "Se l'account non propone quel riscontro, chiedi all'assistenza quale alternativa osservabile sia possibile. Non presumere che esista un servizio video o che una richiesta non elencata sia gratuita. Valuta se l'incertezza restante sia accettabile prima che cambino le azioni disponibili per reso o pacco.",
        ],
        bullets: ["Servizio attualmente mostrato", "Richiesta precisa accettata", "Costo e valuta indicati", "Scadenza pertinente dell'ordine", "Alternativa se il riscontro non è ottenibile"],
      },
      {
        heading: "Valuta il risultato senza cambiare i criteri a posteriori",
        paragraphs: [
          "Quando arriva il nuovo riscontro, confrontalo con la soglia definita prima. Non rifiutare una misura dentro il tuo intervallo soltanto perché la foto rivela un nuovo dettaglio minore, e non accettare una differenza sostanziale perché sei stanco di aspettare. Annota ciò che è stato risolto e ciò che rimane sconosciuto.",
          "Conserva immagini originali e aggiuntive insieme a testo della richiesta, data e decisione finale. Questo rende più chiaro un eventuale reso e migliora le note degli ordini futuri. La richiesta QC migliore non è quella con più foto: è il più piccolo insieme di riscontri sufficiente a sostenere una decisione responsabile.",
        ],
        links: [{ label: "Valutare un reso prima della spedizione", href: "/it/articles/lolobuy-return-refund-guide" }, { label: "Costi dei servizi e del pacco", href: "/it/articles/lolobuy-fees-explained" }],
      },
    ],
  },
  "lolobuy-restricted-items-shipping-routes": {
    slug: "lolobuy-restricted-items-shipping-routes",
    title: "Articoli soggetti a restrizioni LoloBuy: controllare le linee prima di preparare un pacco",
    searchTitle: "Restrizioni LoloBuy: articoli e linee di spedizione",
    shortTitle: "Verificare le restrizioni prima della spedizione LoloBuy",
    description: "Controlla le restrizioni di un prodotto LoloBuy prima dell'ordine, ricontrollale in magazzino ed evita di presumere che una linea sia adatta a ogni articolo e paese.",
    eyebrow: "COMPATIBILITÀ DELLE LINEE", published: "2026-09-15", updated: "2026-10-17", readingTime: "15 min di lettura",
    factCheckLine: "Descrizioni pubbliche di acquisto e trasporto internazionale verificate il 15 settembre 2026. Revisione editoriale del 17 ottobre 2026; la compatibilità attuale va verificata nel flusso del pacco e nelle fonti pertinenti.",
    visual: {
      eyebrow: "TRE CONTROLLI DISTINTI", title: "Un articolo acquistabile non è automaticamente spedibile su ogni linea.",
      caption: "Valuta il prodotto prima dell'ordine, conferma la scheda di magazzino e usa le linee offerte per il pacco finale.",
      items: [
        { label: "Prodotto", text: "Identifica materiali, contenuto, batteria, liquidi e dichiarazioni." },
        { label: "Destinazione", text: "Controlla vincoli attuali delle autorità e del vettore." },
        { label: "Pacco", text: "Esamina classificazione finale, dimensioni e abbinamenti." },
        { label: "Linea", text: "Scegli soltanto fra opzioni compatibili e condizioni attuali." },
      ],
    },
    sources: [
      { label: "Sito pubblico LoloBuy — verifica del 15 settembre 2026", note: "Fonte primaria per le fasi generali di acquisto e trasporto internazionale; non fornisce una matrice pubblica permanente per ogni articolo e linea." },
      { label: "Descrizione attuale del venditore e classificazione dell'ordine", note: "Materiali, componenti e dichiarazioni vanno verificati per la variante esatta selezionata." },
      { label: "Interfaccia attuale del pacco e regole della destinazione", note: "Le linee mostrate per destinazione e contenuto imballato determinano la compatibilità operativa; la normativa applicabile resta esterna alla guida." },
      { label: "Metodo dei tre controlli di Lolobuy Sheet", note: "La sequenza è una guida editoriale indipendente, non un parere legale." },
    ],
    intro: [
      "Un prodotto può essere disponibile presso un venditore cinese e non essere ammesso su una determinata linea internazionale. Batterie, liquidi, polveri, contenitori pressurizzati, magneti, materiali fragili, alimenti, piante, medicinali, sostanze chimiche, armi, beni soggetti a diritti di proprietà intellettuale e altre categorie sensibili possono comportare vincoli diversi del vettore o della destinazione. La regola precisa dipende da articolo, paese, linea e classificazione attuale.",
      "LoloBuy descrive pubblicamente acquisti da canali cinesi e spedizione internazionale, ma la homepage indicizzata non pubblica un elenco completo e permanente di restrizioni o una matrice delle linee. Questa lista di controllo non dichiara un articolo legale né ne garantisce l'invio. Mostra come raccogliere i fatti necessari prima dell'ordine e come ricontrollare la compatibilità quando compaiono le opzioni del pacco reale.",
    ],
    sections: [
      {
        heading: "Descrivi il prodotto oltre il nome commerciale",
        paragraphs: [
          "Scrivi cosa sia fisicamente l'articolo, cosa contenga e come venga alimentato. «Dispositivo di bellezza» è troppo generico se include una batteria al litio e una cartuccia liquida; «giocattolo» è incompleto se contiene magneti potenti, un meccanismo di lancio o un trasmettitore radio. Usa la variante scelta, perché un'altra confezione sotto lo stesso URL può avere contenuti diversi.",
          "Registra materiali, tipo e capacità della batteria quando indicati, volume di liquidi o polveri, pressurizzazione, forza magnetica se documentata, parti affilate, funzioni senza fili, componenti alimentari o biologici e accessori. Se manca un dato decisivo, segnalo come sconosciuto e chiedi chiarimenti prima di pagare, anziché dedurlo dalla foto.",
        ],
        bullets: ["SKU preciso selezionato", "Materiali e contenuto", "Alimentazione o batteria", "Liquidi, polveri, aerosol o magneti", "Uso regolamentato, marchiato o sensibile per la sicurezza"],
      },
      {
        heading: "Separa l'accettazione dell'acquisto dalla compatibilità della linea",
        paragraphs: [
          "La descrizione pubblica dell'acquisto non significa che ogni link accettato possa viaggiare su qualsiasi linea. Acquisto, accettazione del magazzino, gestione dell'esportazione, ammissione del vettore e importazione a destinazione sono passaggi separati. Un ordine riuscito non va mai usato come prova che comparirà in seguito una linea internazionale adatta.",
          "Verifica la possibilità di trasporto prima dell'acquisto quando il prodotto è sensibile o costoso da restituire. Fornisci descrizione precisa e destinazione, non soltanto una categoria generica. Conserva risposta, data e condizioni, riconoscendo comunque che la disponibilità può cambiare prima della preparazione del pacco.",
        ],
      },
      {
        heading: "Controlla le regole della destinazione nelle fonti autorevoli",
        paragraphs: [
          "Compatibilità del vettore e legalità a destinazione sono questioni diverse. Una linea visibile nell'interfaccia non sostituisce regole doganali, aeronautiche, postali, fiscali, di sicurezza del prodotto o di proprietà intellettuale. Quando le conseguenze sono rilevanti, consulta la fonte governativa o del vettore attuale e pertinente all'articolo esatto; per dubbi giuridici richiedi un parere qualificato.",
          "Evita elenchi della comunità che definiscono interi paesi sicuri o non sicuri per una categoria. Le regole possono dipendere da quantità, valore, uso previsto, documenti e composizione. Annota fonte, data e ambito di ogni controllo, affinché una regola sui cosmetici non venga applicata per errore a una batteria o viceversa.",
        ],
      },
      {
        heading: "Usa l'arrivo in magazzino per confermare la classificazione",
        paragraphs: [
          "All'arrivo confronta prodotto, etichetta, componenti inclusi e confezione visibile con la scheda originale. Il venditore potrebbe aver inviato una confezione diversa, aggiunto una batteria imprevista o omesso un accessorio. LoloBuy conferma controlli e fotografie, ma le immagini non dimostrano composizione chimica, condizioni interne della batteria o conformità normativa.",
          "Se la scheda di magazzino mostra un componente inatteso o un'etichetta di restrizione, sospendi la preparazione del pacco e chiedi come venga classificato l'articolo. Conserva riscontro e azione attualmente disponibile per reso o gestione. Non nascondere né rinominare contenuti sensibili per ottenere una linea: una dichiarazione accurata protegge la spedizione e gli altri pacchi nella rete.",
        ],
      },
      {
        heading: "Organizza gli abbinamenti considerando l'articolo più vincolante",
        paragraphs: [
          "Un solo articolo soggetto a restrizioni può eliminare linee altrimenti disponibili per abbigliamento o accessori comuni. Prima del consolidamento, raggruppa i prodotti per restrizioni note, fragilità, presenza di batterie o liquidi, dimensioni e valore. Verifica se separare il prodotto sensibile cambi compatibilità o costo, senza presumere che dividere renda accettabile un articolo proibito.",
          "Considera anche le interazioni nell'imballaggio. I liquidi possono danneggiare i tessuti, i magneti interferire con oggetti vicini e componenti pesanti schiacciare quelli fragili. Anche la combinazione più prudente deve rispettare le condizioni attuali di linea e destinazione. Registra perché ciascun articolo sia incluso o separato.",
        ],
        bullets: ["Merci ordinarie", "Prodotti con batteria o alimentazione", "Liquidi, polveri o aerosol", "Prodotti magnetici, affilati o fragili", "Merci regolamentate a destinazione"],
      },
      {
        heading: "Esamina le linee attualmente offerte per il pacco finale",
        paragraphs: [
          "Dopo aver selezionato articoli e destinazione, confronta le linee mostrate per quel pacco. Verifica categorie accettate, calcolo del peso fatturabile, limiti dimensionali, tracking, condizioni di protezione o assicurazione, valore dichiarato ed esclusioni. Una linea citata in un vecchio articolo o nell'account di un'altra persona potrebbe non applicarsi al tuo paese o contenuto.",
          "Se non compare alcuna linea, non cambiare ripetutamente etichette finché ne appare una. Individua articolo o combinazione che genera il vincolo e chiedi quali opzioni conformi esistano: escluderlo, restituirlo secondo le condizioni attuali, usare una linea specializzata consentita se effettivamente disponibile oppure non procedere. Non inventare scorciatoie basate su dichiarazioni inesatte.",
        ],
      },
      {
        heading: "Mantieni separato il rischio relativo a marchi e proprietà intellettuale",
        paragraphs: [
          "Una foto nello spreadsheet, una dichiarazione del venditore o un'immagine QC non dimostrano autenticità né autorizzazione all'importazione di beni marchiati. Gli interventi doganali e dei titolari dei diritti possono variare per destinazione e circostanze. Non considerare la disponibilità di una linea una garanzia legale e non descrivere il controllo di magazzino come autenticazione.",
          "Per prodotti che riportano marchi o design protetti, verifica se la fonte sia autorizzata e se importazione, rivendita o uso personale comportino restrizioni nel luogo in cui vivi. Se i riscontri sono insufficienti, la decisione meno rischiosa può essere rinunciare all'ordine. Questa guida fornisce un metodo di verifica, non una conclusione giuridica.",
        ],
      },
      {
        heading: "Crea un registro di preparazione alla spedizione prima di pagare",
        paragraphs: [
          "Prepara una riga per articolo con SKU preciso, descrizione fisica, caratteristiche sensibili, dati mancanti, controllo della destinazione, classificazione della piattaforma, linee osservate, raggruppamento nel pacco e data della decisione. Considera attuali i riscontri solo per la transazione verificata. Un ordine successivo richiede un nuovo controllo, perché venditori, linee e regole possono cambiare.",
          "Usa tre esiti: pronto per una linea attuale compatibile, sospeso in attesa di dati oppure da non includere. Questo semplice registro evita che una sorpresa tardiva in magazzino obblighi a una decisione costosa e mantiene la scelta della linea legata al pacco reale, anziché a una promessa generica sulla spedizione LoloBuy.",
        ],
        links: [{ label: "Guida alla spedizione LoloBuy", href: "/it/guides/shipping" }, { label: "Confrontare il costo complessivo del pacco", href: "/it/articles/lolobuy-fees-explained" }],
      },
    ],
  },
  "lolobuy-shipping-france-guide": {
    slug: "lolobuy-shipping-france-guide",
    searchTitle: "Spedizione LoloBuy in Francia: costi, fasi e tracking",
    title: "Spedizione LoloBuy in Francia: preparare un budget chiaro per la consegna",
    shortTitle: "Spedizione in Francia: costi e passaggi",
    description: "Pianifica una spedizione LoloBuy in Francia con controlli sulla destinazione, un registro completo dei costi, confronti dei pacchi e un metodo pratico per il tracking.",
    eyebrow: "SPEDIZIONE IN FRANCIA", published: "2026-10-17", updated: "2026-10-17", readingTime: "8 min di lettura",
    factCheckLine: "Revisione editoriale: 17 ottobre 2026. La sequenza d'ordine deriva dalla descrizione indicizzata della homepage ufficiale LoloBuy. Prezzi, linee, deposito e tempi stimati vanno controllati nell'account attuale; non viene dichiarata una spedizione provata personalmente.",
    visual: {
      eyebrow: "PRIMA LA DESTINAZIONE", title: "Un indirizzo francese, tre fasi separate",
      caption: "Distingui acquisto, decisioni di magazzino e consegna internazionale, così ogni pagamento ha uno scopo preciso.",
      items: [
        { label: "Acquista", text: "Salva articolo esatto, opzione e costo della consegna in Cina." },
        { label: "Prepara", text: "Esamina i riscontri di magazzino e confronta le opzioni compatibili." },
        { label: "Ricevi", text: "Conserva la scheda del pacco pagato e segui il tracking del corriere." },
      ],
    },
    sources: [
      { label: "Sito ufficiale LoloBuy · lolobuy.com", note: "Descrizione indicizzata della homepage esaminata il 17 ottobre 2026: acquisto tramite link, pagamento dei prodotti e trasporto interno, foto QC in magazzino, consolidamento degli articoli scelti, invio della lettera di vettura e pagamento del trasporto, imballaggio, pesatura, partenza e tracking. Disponibilità e formulazioni possono cambiare." },
      { label: "Esempi editoriali di pianificazione", note: "Modelli di confronto, criteri decisionali e calcoli sono esempi esplicativi creati per la guida. Non sono preventivi LoloBuy, tempi di consegna misurati o dichiarazioni sulle norme doganali attuali." },
    ],
    intro: [
      "Pianificare una spedizione LoloBuy in Francia comincia dall'indirizzo di consegna e dall'intero assortimento di prodotti, non da un singolo prezzo al chilogrammo. Un paio di scarpe compatte, un cappotto imbottito e un pacco misto possono generare dimensioni e linee disponibili diverse. Una stima per una destinazione o un imballaggio non è automaticamente utile per un altro. Registra cosa vuoi spedire e dove debba arrivare prima di confrontare i preventivi.",
      "Questa guida segue la sequenza descritta dalla homepage ufficiale LoloBuy indicizzata: acquisto dei prodotti selezionati, controllo QC in magazzino, scelta degli articoli del pacco, richiesta di spedizione e pagamento del relativo trasporto, poi partenza e tracking. Non promette un corriere, un tempo di consegna o un trattamento fiscale specifico. Serve a sostituire gli importi sconosciuti con riscontri attuali prima di impegnarti nella spedizione internazionale.",
    ],
    sections: [
      {
        heading: "Annota la destinazione reale prima di comporre il carrello",
        paragraphs: [
          "Usa l'indirizzo completo supportato dal modulo attuale: paese o territorio, codice postale, città, strada, edificio ed eventuali dettagli necessari alla consegna. Non presumere che ogni indirizzo chiamato genericamente «Francia» disponga degli stessi servizi. Verifica le opzioni di destinazione rispetto al luogo in cui il pacco sarà effettivamente ricevuto. Un preventivo per un codice postale, territorio o formato d'indirizzo diverso non è un preventivo confermato per te.",
          "Mantieni coerenti nome del destinatario e recapiti con la scheda di consegna. Se acquisti per un'altra persona, conferma il suo indirizzo prima di confrontare le linee. Registra anche un'eventuale scadenza: distingui una data desiderata da un evento dopo il quale i prodotti non saranno più utili. Il transito stimato è solo una parte del viaggio; una stima breve non elimina l'attesa del venditore o del magazzino.",
        ],
      },
      {
        heading: "Separa l'acquisto in Cina dalla consegna in Francia",
        paragraphs: [
          "Pagamento del prodotto e pagamento successivo del pacco internazionale rispondono a esigenze diverse. All'acquisto controlla variante esatta, quantità, importo e consegna interna al magazzino. Dopo l'arrivo, la decisione sul pacco dipende dai prodotti ricevuti, dalle necessità di imballaggio e dalle linee disponibili per la destinazione. Avere pagato il prodotto non dimostra che la consegna internazionale sia stata pagata o organizzata.",
          "Crea una riga per ogni articolo, invece di conservare solo il subtotale del carrello. Salva insieme link originale, taglia e colore scelti, quantità e pagamento. Quando il prodotto arriva in magazzino, aggiungi il suo identificativo alla stessa riga. Sarà più facile individuare un articolo non ancora arrivato o una variante diversa dall'ordine prima di includerla nel pacco destinato alla Francia.",
        ],
        links: [{ label: "Comprendere le due fasi di pagamento", href: "/it/articles/lolobuy-payment-guide" }],
      },
      {
        heading: "Usa un registro dei costi che renda visibili i dati mancanti",
        paragraphs: [
          "Un budget utile per la Francia include più dell'importo mostrato accanto al servizio di spedizione. Conserva valuta e data di ogni preventivo. Segna un campo come sconosciuto se non è stato confermato; non scrivere zero soltanto perché il costo non è ancora apparso. Se una descrizione dichiara una voce inclusa, conserva la formulazione insieme al confronto e verificane le condizioni.",
          "La tabella è un modello di pianificazione, non afferma che tutte le voci vengano addebitate in ogni ordine. Alcune possono essere incluse, opzionali o non applicabili. Devi capire quali valgano per la transazione attuale e chi le riscuota. Per i costi a destinazione usa indicazioni ufficiali aggiornate e condizioni del servizio, senza trasformare una stima sui social in una regola.",
        ],
        table: { headers: ["Voce di costo", "Dato da registrare", "Verifica prima di procedere"], rows: [
          ["Prodotti e consegna in Cina", "Importo pagato e valuta", "Opzioni e quantità corrette"],
          ["Servizi di magazzino", "Servizio scelto e prezzo", "Necessario, opzionale o già incluso"],
          ["Trasporto internazionale", "Preventivo attuale del pacco", "Destinazione, dimensioni e linea compatibile"],
          ["Pagamento o conversione", "Importo del checkout", "Totale mostrato nella valuta di pagamento"],
          ["Costi a destinazione", "Inclusione confermata o importo irrisolto", "Condizioni attuali e indicazioni ufficiali"],
        ] },
      },
      {
        heading: "Completa i controlli QC utili prima di inviare la richiesta",
        paragraphs: [
          "Le foto di magazzino aiutano a controllare variante ricevuta e condizioni visibili. Inizia da identità dell'ordine, quantità, etichetta della taglia e colore, poi passa ai dettagli minori. Una foto ordinata non dimostra vestibilità, composizione o durata. Se una misura è decisiva, richiedila soltanto quando il servizio attuale la offre e attendi il risultato prima di autorizzare la spedizione.",
          "Per le scarpe stabilisci se serva la scatola originale e quale protezione sia importante. Per un cappotto considera il volume oltre al peso sulla bilancia. Per accessori fragili individua le parti vulnerabili. Sono decisioni di imballaggio specifiche, non motivi per ottenere il pacco più piccolo a qualsiasi costo. Lascia fuori un prodotto errato o con un possibile danno finché non siano chiare l'azione disponibile e le sue condizioni.",
        ],
        links: [{ label: "Esaminare le fotografie di magazzino", href: "/it/articles/how-to-read-qc-photos" }],
      },
      {
        heading: "Confronta le linee usando le stesse ipotesi sul pacco",
        paragraphs: [
          "Prepara un confronto datato con identica destinazione, articoli, peso stimato, dimensioni e richiesta d'imballaggio. Considera solo i servizi mostrati come compatibili con quel pacco. Registra prezzo, intervallo di consegna dichiarato, informazioni di tracking e condizioni importanti. Un risultato più basso ottenuto per un pacco diverso non dimostra un modo più economico di spedire il carrello originale.",
          "Distingui un tempo stimato da un impegno garantito. Se il servizio spiega da quale momento parta l'intervallo, annotalo; altrimenti lascia il punto irrisolto. Registra anche limiti su contenuto e dimensioni. Disponibilità e accettazione possono cambiare: ripeti il confronto quando cambiano misure di magazzino o articoli selezionati, senza affidarti a una schermata precedente.",
        ],
        table: { headers: ["Campo di confronto", "Linea A", "Linea B"], rows: [
          ["Destinazione e codice postale", "Stesso indirizzo", "Stesso indirizzo"],
          ["Articoli e imballaggio", "Stessi prodotti selezionati", "Stessi prodotti selezionati"],
          ["Peso e dimensioni", "Dati attuali registrati", "Stessi dati registrati"],
          ["Preventivo, valuta e data", "Copiare il dato attuale", "Copiare il dato attuale"],
          ["Condizioni e dubbi irrisolti", "Registrare prima di pagare", "Registrare prima di pagare"],
        ] },
      },
      {
        heading: "Riduci i costi evitabili verificando il risultato",
        paragraphs: [
          "Se il preventivo supera il budget, confronta alternative concrete. Escludi un articolo non desiderato, chiedi quali imballaggi superflui possano essere rimossi o confronta un'opzione di confezionamento supportata. Conferma che rimanga una protezione adeguata. Conta il nuovo totale per il nuovo pacco, non il fatto che togliere una scatola faccia normalmente risparmiare a qualcun altro.",
          "Il consolidamento può modificare sia peso sia volume. Dividere gli articoli può aggiungere più costi base o creare altre possibilità di linea. Nessuna delle due scelte è automaticamente più economica. Confronta la somma di tutti i pacchi risultanti, includendo gli stessi servizi, prima di decidere. Non aggiungere un prodotto inutile soltanto per distribuire la spedizione su più articoli: il suo prezzo aumenta comunque la spesa totale.",
        ],
        links: [{ label: "Preparare i dati del calcolatore di spedizione", href: "/it/articles/lolobuy-shipping-calculator-guide" }],
      },
      {
        heading: "Conserva una scheda completa della richiesta e del pagamento",
        paragraphs: [
          "Prima di confermare il pacco, esamina insieme articoli di magazzino selezionati, indirizzo, imballaggio e servizio preventivato. Salva identificativo e conferma del pagamento. Annota quali importi siano stimati e se il processo spieghi eventuali misurazioni o adeguamenti successivi. Se il totale differisce dal confronto, individua il dato cambiato prima di accettarlo.",
          "Conserva ordini dei prodotti e scheda del pacco nella stessa cartella, ma mantieni i diversi identificativi. Numero d'acquisto, riferimento di magazzino, numero del pacco e tracking del corriere possono indicare fasi differenti. Questa semplice distinzione evita un problema frequente con l'assistenza: chiedere del trasporto internazionale fornendo soltanto il riferimento dell'acquisto, senza i dati necessari a individuare la spedizione.",
        ],
      },
      {
        heading: "Segui il viaggio per fase e parti dall'ultimo evento confermato",
        paragraphs: [
          "Dopo il pagamento controlla lo stato reale del pacco, senza presumere che il corriere lo possieda già. Imballaggio, pesatura, partenza e prima scansione sono eventi distinti. Salva data e testo dell'ultimo aggiornamento confermato. Quando il tracking diventa disponibile, confronta il riferimento del pacco con quello del vettore e segui eventuali istruzioni di consegna tramite account o canali verificati.",
          "Se l'avanzamento è poco chiaro, invia all'assistenza una scheda concisa con identificativo, destinazione, ultimo evento, orario e domanda precisa. Evita pagamenti ripetuti o richieste duplicate mentre cerchi una spedizione esistente. Dopo la consegna confronta il contenuto con l'elenco salvato e conserva i riscontri di eventuali differenze. Questo registro sarà più utile per il prossimo budget verso la Francia di un'affermazione senza data sui tempi tipici.",
        ],
        links: [{ label: "Comprendere l'invio della richiesta del pacco", href: "/it/articles/lolobuy-submit-package-guide" }, { label: "Verificare un tracking senza aggiornamenti", href: "/it/articles/lolobuy-tracking-not-updating-guide" }],
      },
    ],
  },
  "lolobuy-shipping-calculator-guide": {
    slug: "lolobuy-shipping-calculator-guide",
    searchTitle: "Calcolatore spedizione LoloBuy: peso, volume e costi",
    title: "Calcolatore di spedizione LoloBuy: trasformare una stima in un confronto utile",
    shortTitle: "Calcolatore di spedizione: peso e costi",
    description: "Comprendi i dati del calcolatore di spedizione LoloBuy, peso reale e volumetrico, esempi di calcolo e motivi delle differenze con l'importo finale del pacco.",
    eyebrow: "CALCOLATORE DI SPEDIZIONE", published: "2026-10-17", updated: "2026-10-17", readingTime: "8 min di lettura",
    factCheckLine: "Revisione editoriale: 17 ottobre 2026. La sequenza d'ordine deriva dalla descrizione indicizzata della homepage ufficiale LoloBuy. Prezzi, linee, deposito e tempi stimati vanno controllati nell'account attuale; non viene dichiarata una spedizione provata personalmente.",
    visual: {
      eyebrow: "CONSERVA I DATI INSERITI", title: "Una stima si riferisce a uno specifico scenario di pacco",
      caption: "Se cambiano destinazione, imballaggio o contenuto, la vecchia stima potrebbe non descrivere più il tuo pacco.",
      items: [
        { label: "Dati", text: "Destinazione, articoli selezionati, peso e dimensioni dopo l'imballaggio." },
        { label: "Regole", text: "Usa le condizioni di fatturazione attuali del servizio compatibile." },
        { label: "Confronto", text: "Registra importo, valuta, orario e campi ancora irrisolti." },
      ],
    },
    sources: [
      { label: "Sito ufficiale LoloBuy · lolobuy.com", note: "Descrizione indicizzata della homepage esaminata il 17 ottobre 2026: acquisto tramite link, pagamento dei prodotti e trasporto interno, foto QC in magazzino, consolidamento degli articoli scelti, invio della lettera di vettura e pagamento del trasporto, imballaggio, pesatura, partenza e tracking. Disponibilità e formulazioni possono cambiare." },
      { label: "Esempi editoriali di pianificazione", note: "Modelli di confronto, criteri decisionali e calcoli sono esempi esplicativi creati per la guida. Non sono preventivi LoloBuy, tempi di consegna misurati o dichiarazioni sulle norme doganali attuali." },
    ],
    intro: [
      "Un calcolatore di spedizione LoloBuy è utile quando consideri il risultato come l'esito di un insieme preciso di dati. È molto meno utile se copi un numero senza destinazione, peso, dimensioni o servizio scelto. Prima di usare una stima per decidere se un acquisto rientri nel budget, annota cosa includa e quali dati siano ancora supposizioni.",
      "Questa guida spiega come preparare un confronto ripetibile e interpretare le differenze tra preventivo e importi successivi del pacco. Non riproduce un calcolatore LoloBuy in tempo reale né fornisce un tariffario del corriere. Tutti gli esempi numerici sono volutamente illustrativi. Divisore, arrotondamenti, servizi compatibili e costi reali devono provenire dal preventivo attuale e dalle condizioni del servizio, non dai calcoli d'esempio.",
    ],
    sections: [
      {
        heading: "Raccogli i dati prima di guardare il prezzo",
        paragraphs: [
          "Parti dalla destinazione e dai prodotti esatti che vuoi spedire. Separa ciò che conosci da ciò che stai stimando. Un peso di magazzino è un riscontro diverso dal peso approssimativo dichiarato dal venditore, e nessuno dei due descrive necessariamente il pacco finale imballato. Registra la fonte di ogni dato per poter sostituire le ipotesi con misurazioni quando diventano disponibili.",
          "Usa le unità richieste dal modulo attuale. Controlla chilogrammi rispetto a grammi e centimetri rispetto ad altre unità prima di inserire i numeri. Un errore decimale può produrre un confronto apparentemente preciso che riguarda un pacco completamente diverso. Annota anche la categoria o le informazioni sul contenuto richieste. Non selezionare una categoria inesatta soltanto per ottenere una linea più economica.",
        ],
        table: { headers: ["Dato", "Registrazione utile", "Incertezza frequente"], rows: [
          ["Destinazione", "Paese o territorio reale e codice postale", "Stima effettuata per un altro indirizzo"],
          ["Contenuto", "Articoli precisi e quantità selezionate", "Prodotti aggiunti dopo il confronto"],
          ["Peso sulla bilancia", "Valore, unità e fonte", "Solo prodotti oppure pacco imballato"],
          ["Dimensioni", "Lunghezza, larghezza e altezza del pacco", "Dimensioni dei singoli prodotti"],
          ["Servizi", "Imballaggio e altre opzioni scelte", "Voci incluse nel prezzo mostrato"],
        ] },
      },
      {
        heading: "Comprendi peso reale e peso volumetrico",
        paragraphs: [
          "Il peso reale è la massa misurata con una bilancia. Il peso volumetrico è un criterio di fatturazione calcolato dalle dimensioni secondo le regole del servizio. Un pacco leggero ma ingombrante può quindi avere una base tariffaria diversa da un pacco denso con lo stesso peso reale. L'eventuale uso del peso volumetrico e il metodo preciso vanno verificati per la linea scelta.",
          "Non attribuire a LoloBuy un divisore universale né presumere che tutti i servizi scelgano il peso allo stesso modo. Leggi le condizioni attuali su formula volumetrica, arrotondamento, importi minimi e limiti. Se il preventivo fornisce un peso fatturabile, conservalo insieme alle misure originali. Senza questi dettagli, moltiplicare un peso ipotizzato per un prezzo al chilogrammo può non ricostruire il totale mostrato.",
        ],
      },
      {
        heading: "Segui un esempio volumetrico esplicitamente illustrativo",
        paragraphs: [
          "Immagina un cartone imballato di 40 × 30 × 20 centimetri con peso reale di 3 chilogrammi. Il volume è 24.000 centimetri cubi. Solo per questo esempio, supponiamo che un servizio immaginario divida il volume per 6.000 e fatturi il maggiore tra peso reale e volumetrico. Il peso volumetrico risulta 4 chilogrammi: quello fatturabile dell'esempio sarebbe quindi 4 chilogrammi, prima di eventuali arrotondamenti ipotetici.",
          "È un calcolo per comprendere il concetto, non la formula verificata di LoloBuy. Se un servizio reale utilizza un altro divisore o criterio, il risultato cambia. Sostituisci ogni ipotesi con la regola indicata per la linea effettiva. Il punto utile è che ridurre soltanto il peso sulla bilancia potrebbe non ridurre la base di fatturazione quando il volume resta il fattore determinante.",
        ],
        table: { headers: ["Dato o operazione illustrativa", "Risultato dell'esempio"], rows: [
          ["Dimensioni del pacco", "40 × 30 × 20 cm"],
          ["Volume", "24.000 cm³"],
          ["Divisore esclusivamente d'esempio", "6.000 cm³ per kg"],
          ["Peso volumetrico illustrativo", "24.000 ÷ 6.000 = 4 kg"],
          ["Peso reale illustrativo", "3 kg"],
          ["Se la regola immaginaria usa il valore maggiore", "4 kg prima dell'arrotondamento"],
        ] },
      },
      {
        heading: "Valuta un diverso imballaggio senza promettere risparmi",
        paragraphs: [
          "Proseguiamo con lo stesso esempio immaginario. Supponiamo che un reimballaggio adeguato porti il cartone a 40 × 30 × 15 centimetri mantenendo il peso reale a 3 chilogrammi. Il volume diventa 18.000 centimetri cubi. Dividendo per lo stesso divisore d'esempio si ottengono 3 chilogrammi. Con la regola ipotetica del valore maggiore, il peso fatturabile diventa 3 chilogrammi prima degli arrotondamenti.",
          "Il confronto mostra una possibile variazione della base tariffaria, ma non dimostra un risparmio monetario. Una linea reale può avere fasce di prezzo, un minimo, costi di reimballaggio o condizioni di accettazione diverse. Chiedi un nuovo preventivo e proteggi adeguatamente i prodotti. Togliere materiale protettivo a un articolo fragile per ridurre la stima volumetrica può creare un problema molto più costoso del risparmio sperato.",
        ],
      },
      {
        heading: "Cambia una variabile alla volta nei confronti",
        paragraphs: [
          "Conserva uno scenario di riferimento con prodotti, destinazione, misure e servizi originali. Crea una seconda riga per una modifica precisa, per esempio escludere un articolo voluminoso o scegliere un'opzione d'imballaggio supportata. Mantieni uguali le altre ipotesi, quando possibile. Vedrai così la causa della differenza, anziché confrontare prezzi ottenuti da dati non comparabili.",
          "Per una spedizione divisa, confronta la somma di tutti i pacchi con l'alternativa unita. Due pacchi quotati separatamente formano un totale di due componenti, non una scelta tra i singoli prezzi. Includi coerentemente i servizi e conserva le valute. Se i servizi disponibili cambiano tra scenari, registra anche questa differenza nella decisione, invece di presentare i soli importi come equivalenti.",
        ],
        table: { headers: ["Scenario", "Dati da conservare", "Decisione"], rows: [
          ["Riferimento", "Carrello originale, misure e preventivo attuale", "Rientra nel budget?"],
          ["Reimballaggio", "Protezione modificata, nuove dimensioni e costo", "Il nuovo totale conviene?"],
          ["Un articolo escluso", "Prodotti restanti e nuovo preventivo", "L'articolo giustifica l'intero costo aggiuntivo?"],
          ["Due pacchi", "Totale completo di entrambi", "La divisione migliora il risultato complessivo?"],
        ] },
      },
      {
        heading: "Distingui il trasporto dalla spesa complessiva",
        paragraphs: [
          "Il risultato della spedizione può essere solo una parte del budget. Mantieni separati pagamento dei prodotti, consegna in Cina, servizi di magazzino scelti, trasporto internazionale e altri costi confermati. Controlla le voci dichiarate incluse nel preventivo attuale. Un campo vuoto resta irrisolto finché non ottieni una risposta: considerarlo gratuito rende il confronto più economico solo in apparenza.",
          "Se il pagamento viene convertito in un'altra valuta, conserva sia l'importo preventivato originale sia quello mostrato al checkout. Confronta il totale che autorizzeresti realmente usando le stesse ipotesi. Non dedurre il trattamento fiscale a destinazione dal soprannome di una linea o da un commento su un altro ordine. Per completare quella parte del budget usa condizioni attuali e informazioni ufficiali pertinenti alla destinazione reale.",
        ],
        links: [{ label: "Creare un registro completo dei costi", href: "/it/articles/lolobuy-fees-explained" }],
      },
      {
        heading: "Spiega una variazione dell'importo controllando i dati cambiati",
        paragraphs: [
          "Quando il costo successivo del pacco differisce dalla stima iniziale, confronta per primi peso, dimensioni esterne, articoli e servizi selezionati. Controlla anche destinazione e linea. Peso dichiarato dal venditore, peso del prodotto in magazzino e peso misurato del pacco completo possono descrivere cose diverse. La differenza è più facile da analizzare se ogni dato precedente ha una fonte registrata.",
          "Confronta poi data, valuta ed eventuali condizioni di fatturazione. Non presumere che ogni scostamento sia un errore o una commissione inevitabile. Chiedi quale misura o voce specifica lo spieghi. Conserva la risposta con il pacco ed evita un secondo pagamento soltanto perché la prima conferma non compare subito. Lo stato reale dell'account deve guidare l'azione successiva.",
        ],
      },
      {
        heading: "Salva un preventivo utile e riconosci quando ricalcolare",
        paragraphs: [
          "Un preventivo utile include data, destinazione, articoli selezionati, fonte del peso, dimensioni, servizio, importo, valuta e condizioni pertinenti. Conserva la schermata o la registrazione scritta accanto all'elenco di magazzino. Il confronto futuro sarà ripetibile e l'assistenza avrà informazioni sufficienti per capire a quale stima ti riferisci.",
          "Ricalcola quando cambiano contenuto, imballaggio, peso misurato, dimensioni, destinazione o servizio disponibile. Prima di inviare la richiesta, verifica che l'importo attuale rientri ancora nel budget e che le incertezze decisive siano risolte. Il calcolatore serve a sostenere questa decisione. Un numero apparentemente preciso basato su dati incompleti resta una stima finché il processo attuale del pacco non conferma l'importo applicabile.",
        ],
        links: [{ label: "Pianificare un pacco per la Francia", href: "/it/articles/lolobuy-shipping-france-guide" }, { label: "Preparare la richiesta del pacco", href: "/it/articles/lolobuy-submit-package-guide" }],
      },
    ],
  },
  "lolobuy-submit-package-guide": {
    slug: "lolobuy-submit-package-guide",
    searchTitle: "Submit Package LoloBuy: significato, passaggi e pagamento",
    title: "Submit Package LoloBuy: dagli articoli in magazzino alla richiesta di spedizione",
    shortTitle: "Inviare il pacco: la decisione successiva",
    description: "Comprendi cosa significhi inviare una richiesta di pacco LoloBuy, cosa controllare prima di autorizzarla e come differiscano acquisto, pagamento del trasporto e tracking.",
    eyebrow: "PROCEDURA DEL PACCO", published: "2026-10-17", updated: "2026-10-17", readingTime: "8 min di lettura",
    factCheckLine: "Revisione editoriale: 17 ottobre 2026. La sequenza d'ordine deriva dalla descrizione indicizzata della homepage ufficiale LoloBuy. Prezzi, linee, deposito e tempi stimati vanno controllati nell'account attuale; non viene dichiarata una spedizione provata personalmente.",
    visual: {
      eyebrow: "CONTROLLA LA FASE", title: "I prodotti acquistati non sono ancora un pacco partito",
      caption: "Individua l'ultimo passaggio confermato prima di decidere se controllare, pagare, attendere o chiedere assistenza.",
      items: [
        { label: "Articoli in magazzino", text: "Confronta quanto ricevuto con l'ordine e risolvi i dubbi QC importanti." },
        { label: "Richiesta del pacco", text: "Scegli articoli compatibili, destinazione, imballaggio e servizio disponibile." },
        { label: "Partenza", text: "Conferma stato del pagamento, avanzamento del pacco e consegna al corriere." },
      ],
    },
    sources: [
      { label: "Sito ufficiale LoloBuy · lolobuy.com", note: "Descrizione indicizzata della homepage esaminata il 17 ottobre 2026: acquisto tramite link, pagamento dei prodotti e trasporto interno, foto QC in magazzino, consolidamento degli articoli scelti, invio della lettera di vettura e pagamento del trasporto, imballaggio, pesatura, partenza e tracking. Disponibilità e formulazioni possono cambiare." },
      { label: "Esempi editoriali di pianificazione", note: "Modelli di confronto, criteri decisionali e calcoli sono esempi esplicativi creati per la guida. Non sono preventivi LoloBuy, tempi di consegna misurati o dichiarazioni sulle norme doganali attuali." },
    ],
    intro: [
      "Nel processo di un agente d'acquisto, inviare una richiesta di pacco significa passare dai singoli articoli in magazzino alla richiesta di preparare e spedire una selezione. È una decisione diversa dall'acquisto dei prodotti. Se trovi l'indicazione Submit Package, individua prima quali articoli siano disponibili, quali dubbi rimangano e quale fase di pagamento mostri attualmente l'account.",
      "La homepage ufficiale LoloBuy indicizzata descrive la scelta dei prodotti in magazzino, l'unione degli articoli selezionati, l'invio della lettera di vettura e il pagamento del trasporto, seguiti da imballaggio, pesatura, spedizione e tracking. Etichette dell'interfaccia e opzioni disponibili possono cambiare. Questa guida spiega le decisioni dietro la procedura, senza affermare che ogni account mostri gli stessi pulsanti, opzioni o schermate.",
    ],
    sections: [
      {
        heading: "Identifica cosa sia realmente accaduto a ogni articolo",
        paragraphs: [
          "Apri le schede attuali di ordine e magazzino e distingui un prodotto ordinato da uno ricevuto. Una conferma di pagamento non dimostra da sola l'arrivo in deposito. Confronta riferimento del prodotto, variante e quantità, poi registra l'ultimo stato confermato. Se un articolo è ancora dal venditore o in trasporto interno, non presumere che venga automaticamente aggiunto a un pacco preparato ora.",
          "Crea un breve elenco del pacco usando gli identificativi di magazzino quando disponibili. Tieni separati i prodotti da spedire da quelli ancora in valutazione. È particolarmente utile quando diversi ordini contengono scarpe, taglie o colori simili. Un elenco chiaro rende intenzionale la selezione e riduce il rischio di inviare una variante sbagliata soltanto perché la miniatura sembra familiare.",
        ],
        table: { headers: ["Registrazione", "Cosa dimostra", "Cosa non dimostra"], rows: [
          ["Pagamento del prodotto", "Un pagamento per la fase d'acquisto", "La partenza internazionale"],
          ["Scheda di magazzino", "Lo stato registrato di un articolo ricevuto", "L'inclusione in un pacco pagato"],
          ["Richiesta del pacco", "Articoli scelti e istruzioni di spedizione", "Il possesso da parte del corriere"],
          ["Conferma del pagamento del trasporto", "Lo stato registrato del pagamento del pacco", "Una consegna completata"],
          ["Evento di tracking del corriere", "Un evento comunicato durante il viaggio", "Le condizioni di ogni articolo all'interno"],
        ] },
      },
      {
        heading: "Risolvi i dubbi QC che potrebbero cambiare il pacco",
        paragraphs: [
          "Controlla quantità ricevuta, etichette delle varianti e condizioni visibili prima di selezionare gli articoli. Confronta le foto con l'opzione ordinata, non con un altro colore o esempio del venditore. Se un problema importante potrebbe portarti a restituire, cambiare o escludere il prodotto, risolvilo prima di autorizzare il pacco. Azione disponibile e relativo limite temporale vanno letti nelle condizioni attuali dell'ordine.",
          "Chiedi riscontri che risolvano una decisione specifica. Una foto leggibile della taglia può chiarire la variante; una misura pertinente può aiutare sulla vestibilità. Ulteriori immagini non possono provare ogni aspetto di materiali e durata. Mantieni mirata la richiesta e non considerare approvato un articolo in attesa di risposta soltanto perché gli altri sono pronti.",
        ],
        links: [{ label: "Leggere le fotografie QC di magazzino", href: "/it/articles/how-to-read-qc-photos" }, { label: "Organizzare i riscontri di una differenza nell'articolo", href: "/it/articles/lolobuy-qc-mismatch-evidence-guide" }],
      },
      {
        heading: "Decidi quali articoli appartengano alla stessa spedizione",
        paragraphs: [
          "Seleziona i prodotti in base a destinazione, disponibilità, necessità di imballaggio e servizi compatibili mostrati. Gli articoli acquistati insieme non costituiscono necessariamente una decisione indivisibile. Un oggetto fragile, un cappotto voluminoso e un indumento compatto possono creare vincoli pratici diversi. Controlla le regole attuali per il contenuto reale, senza presumere che una linea adatta a un prodotto lo sia per tutto il carrello.",
          "Se pensi di attendere un altro acquisto, verifica direttamente nell'account condizioni di deposito, scadenza dei singoli articoli ed eventuali costi. Questa guida non indica deliberatamente un periodo gratuito fisso. Registra data pertinente e regola applicabile ai tuoi prodotti. Attendere è una scelta sensata solo se ne comprendi gli effetti su spesa, disponibilità e termine della consegna desiderata.",
        ],
        links: [{ label: "Controllare restrizioni dei prodotti e delle linee", href: "/it/articles/lolobuy-restricted-items-shipping-routes" }],
      },
      {
        heading: "Scegli istruzioni di imballaggio che descrivano il risultato necessario",
        paragraphs: [
          "Considera la protezione prima di ridurre il volume. Indica quale confezione sia superflua solo quando il servizio consente la scelta e ne comprendi le conseguenze. Scatola delle scarpe, custodia protettiva e inserto di sostegno possono avere funzioni diverse dall'imballaggio esterno del venditore. Se un articolo è fragile o deve mantenere la forma, descrivi l'esigenza invece di chiedere genericamente di rimuovere tutto.",
          "Registra servizi di imballaggio scelti e prezzi mostrati. Se una decisione richiede una misura o una valutazione del magazzino, lascia visibile quell'incertezza. Non prometterti una determinata riduzione di peso prima del lavoro. Un'istruzione pratica permette di verificare il risultato nella scheda finale, senza affidarsi a parole vaghe come «il più sicuro» o «il più economico».",
        ],
      },
      {
        heading: "Controlla insieme indirizzo e servizio attualmente compatibile",
        paragraphs: [
          "Usa dati reali del destinatario e della destinazione quando esamini i servizi disponibili. Conferma codice postale, strada, edificio ed eventuali recapiti necessari. Non selezionare una destinazione vicina più comoda soltanto per ottenere un prezzo. Il preventivo deve corrispondere all'indirizzo a cui vuoi inviare gli articoli scelti.",
          "Leggi la descrizione del servizio per il pacco attuale, inclusi limiti, stima e condizioni pertinenti. Quando vengono richiesti descrizioni del contenuto o valori, fornisci informazioni accurate sostenute dai dati d'acquisto e segui le istruzioni applicabili. Non copiare la dichiarazione di un altro acquirente senza verificare che descriva i tuoi prodotti. Chiarisci ogni requisito importante prima che la richiesta diventi una spedizione pagata.",
        ],
      },
      {
        heading: "Valuta l'importo nella fase di pagamento corretta",
        paragraphs: [
          "Confronta l'importo attuale del pacco con la stima di spedizione salvata. Controlla se comprenda soltanto il trasporto o anche i servizi selezionati e conserva la valuta. Pagamento del prodotto e del pacco sono registrazioni distinte, anche nello stesso account. Un addebito nella fase di spedizione non dimostra da solo che tu stia pagando due volte la medesima cosa.",
          "Allo stesso tempo, uno stato poco chiaro non giustifica la ripetizione del pagamento. Verifica prima conferma e scheda esistenti. Se l'importo è diverso, confronta prodotti, misure, imballaggio e servizio, poi chiedi all'assistenza della voce precisa. Registra le spiegazioni attuali su successive misurazioni o adeguamenti, senza presumere che una politica di rimborso o supplemento valga per tutti i pacchi.",
        ],
        links: [{ label: "Separare pagamenti dei prodotti e del pacco", href: "/it/articles/lolobuy-payment-guide" }, { label: "Interpretare una stima di spedizione", href: "/it/articles/lolobuy-shipping-calculator-guide" }],
      },
      {
        heading: "Fai un controllo finale prima di confermare la richiesta",
        paragraphs: [
          "Alla schermata finale confronta la richiesta attuale con l'elenco scritto. Verifica che un articolo escluso non sia ricomparso e che le quantità siano corrette. Rileggi l'indirizzo nella forma visualizzata. Esamina insieme istruzioni di imballaggio e servizio, perché una modifica precedente potrebbe aver cambiato le opzioni disponibili.",
          "Salva identificativo del pacco, importo preventivato o pagato, conferma e orario. Conserva le condizioni pertinenti quando incidono sulla decisione. Questo non garantisce la consegna, ma fornisce una registrazione affidabile della richiesta. Evita inoltre confusione quando nello stesso account sono presenti più ordini e diversi pacchi in corso.",
        ],
        bullets: [
          "Articoli di magazzino e quantità coincidono con il pacco desiderato.",
          "I dubbi QC importanti sono risolti oppure il prodotto interessato è escluso.",
          "Destinatario, indirizzo e recapiti sono corretti.",
          "Imballaggio, servizio attuale e importo mostrato sono compresi.",
          "Lo stato del pagamento è stato controllato prima di effettuare altri pagamenti.",
        ],
      },
      {
        heading: "Dopo la richiesta segui il prossimo evento confermato",
        paragraphs: [
          "L'invio della richiesta non coincide con la consegna al corriere. Controlla lo stato reale nell'account mentre il pacco viene preparato, misurato, spedito e associato al tracking. Non ricavare una scadenza dall'esperienza di un'altra persona. Usa le stime o gli impegni attuali mostrati per la tua richiesta e conserva l'ultimo evento confermato se occorre indagare l'avanzamento.",
          "Se noti un errore nell'indirizzo o nel contenuto dopo l'invio, contatta rapidamente l'assistenza con identificativo e correzione precisa. Non presumere che la richiesta sia ancora modificabile o annullabile: dipende dalla fase e dalle condizioni attuali. Se il pagamento appare riuscito ma lo stato del pacco è incerto, fornisci la conferma invece di aprire un duplicato. Quando il tracking esiste, collegalo alla scheda del pacco e usa quel riferimento per indagare eventuali pause.",
        ],
        links: [{ label: "Comprendere gli stati dell'ordine", href: "/it/articles/lolobuy-order-status-guide" }, { label: "Verificare problemi di aggiornamento del tracking", href: "/it/articles/lolobuy-tracking-not-updating-guide" }, { label: "Usare i controlli per la destinazione Francia", href: "/it/articles/lolobuy-shipping-france-guide" }],
      },
    ],
  },
};
