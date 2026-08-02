import type { Locale } from "./i18n";
import type { Article } from "./site-data";

type LocalizedTrackingArticle = Pick<
  Article,
  | "title"
  | "shortTitle"
  | "description"
  | "eyebrow"
  | "readingTime"
  | "factCheckLine"
  | "visual"
  | "sources"
  | "intro"
  | "sections"
>;

export const trackingArticleLocales: Record<
  Exclude<Locale, "en">,
  LocalizedTrackingArticle
> = {
  es: {
    title: "¿El tracking de Lolobuy no se actualiza? Diagnostica el último escaneo antes de reclamar",
    shortTitle: "Qué hacer si el tracking de Lolobuy no se actualiza",
    description: "Checklist para un tracking de Lolobuy sin cambios: traspasos, aduanas, dirección y pruebas útiles para soporte.",
    eyebrow: "SOLUCIÓN DE PROBLEMAS DE TRACKING",
    readingTime: "14 min de lectura",
    factCheckLine: "Verificado el 2 de agosto de 2026 con la web y la interfaz de paquetes de LoloBuy y las guías actuales de DHL eCommerce, USPS y UPS.",
    visual: {
      eyebrow: "MÉTODO DEL ÚLTIMO ESCANEO",
      title: "Diagnostica las pruebas antes de adivinar dónde está el paquete.",
      caption: "Registra el envío, localiza el último evento, clasifica el silencio y reclama con un expediente breve.",
      items: [
        { label: "Registrar", text: "Guarda paquete, tracking, ruta, despacho y dirección enviada." },
        { label: "Localizar", text: "Busca el evento fechado más reciente en la web del transportista responsable." },
        { label: "Clasificar", text: "Separa creación de etiqueta, traspaso, tránsito, aduanas y entrega." },
        { label: "Escalar", text: "Envía el último evento, tiempo transcurrido y la comprobación solicitada." },
      ],
    },
    sources: [
      { label: "Web e interfaz de paquetes de LoloBuy — comprobadas el 2 de agosto de 2026", note: "Fuente primaria para pedido, QC, fotos, 90 días de almacenamiento y la indicación de vigilar el tracking y contactar ante una actualización anómala." },
      { label: "FAQ de tracking de DHL eCommerce — comprobada el 2 de agosto de 2026", note: "Pruebas específicas del transportista sobre hitos, traspasos, aduanas, incidencias y la posible investigación del remitente; no es un plazo de LoloBuy." },
      { label: "USPS Tracking: The Basics — comprobado el 2 de agosto de 2026", note: "Guía estadounidense que explica que las alertas necesitan un evento nuevo; conviene revisar el registro del transportista." },
      { label: "UPS Tracking Support — comprobado el 2 de agosto de 2026", note: "Guía que separa estados, aduanas, cambios de entrega y reclamaciones según el envío." },
      { label: "Marco del último escaneo de Lolobuy Sheet", note: "Tabla y plantilla editoriales para ordenar hechos observables; no son una promesa de plataforma ni una regla del transportista." },
    ],
    intro: [
      "Puede existir un número de tracking mientras la página parece inmóvil. Tal vez solo se creó la etiqueta, falta la aceptación física, un socio de exportación no publicó el siguiente hito, espera el transportista local o aduanas necesita información. Cada caso exige una acción distinta.",
      "La interfaz pública actual de LoloBuy indica que se vigile el paquete y se contacte si aparece una actualización anómala, pero no publica un plazo universal para el primer escaneo, la pérdida o la compensación. Por eso esta guía empieza por el último hecho verificable y la ruta actual.",
    ],
    sections: [
      { heading: "Separa el estado del paquete del tracking del transportista", paragraphs: ["El expediente puede mostrar envío creado, pago, procesamiento, despacho, aceptación y tracking público. Un estado interno como procesado o enviado no equivale necesariamente a un escaneo físico. Guarda texto, hora y página de cada estado para saber si preguntas por despacho de almacén o movimiento del transportista.", "No cuentes desde el pago al vendedor. La entrega doméstica, el QC, el embalaje y el despacho internacional son fases distintas; usa el evento de entrega al transportista del paquete internacional."] },
      { heading: "Crea un registro de cinco campos", paragraphs: ["Guarda referencia del paquete, tracking exacto, ruta, fecha de despacho y último evento con hora y lugar. Añade país y una copia censurada de la dirección. Conserva cualquier segundo número local y la fecha en que apareció.", "Así evitas dar un número de pedido a un transportista que necesita un tracking o comparar otra ruta. No publiques nombre, dirección y número completo juntos."], bullets: ["Referencia y tracking internacional", "Ruta o servicio", "Fecha de despacho o traspaso", "Último escaneo, hora y lugar", "País y dirección censurada"] },
      { heading: "Comprueba al transportista responsable", paragraphs: ["Copia el número y abre la web del transportista indicado. Un agregador ayuda a descubrir socios, pero puede ir retrasado o traducir de otra forma. Si aparece otro número para la entrega local, compruébalo y conserva la relación entre ambos.", "Sin resultado puede significar error, etiqueta no aceptada, transportista equivocado o seguimiento limitado. Pregunta quién controla ahora el escaneo y si hubo aceptación física; no concluyas pérdida solo por ese mensaje."] },
      { heading: "Clasifica el último evento", paragraphs: ["Etiqueta creada o datos recibidos no prueban posesión física. Aceptado o recogido sí registra custodia. En tránsito describe hitos, no GPS continuo. Exportación, llegada, aduanas y reparto local pertenecen a etapas distintas.", "Guarda el código exacto de una excepción: dirección incompleta, destinatario ausente, datos aduaneros, retención, devolución o daño exigen pruebas diferentes. Conserva texto original y captura."] },
      { heading: "Entiende por qué el paquete puede moverse sin cambios", paragraphs: ["DHL eCommerce explica que muchos servicios muestran hitos y pueden pasar periodos sin evento durante el traslado o un traspaso postal. También cita clima, aduanas y acumulación operativa. USPS indica que una alerta necesita un evento nuevo. Son ejemplos de transportistas, no promesas para tu ruta.", "Compara el silencio con la estimación actual y el tipo de último escaneo. Un intervalo después de exportar no equivale a una excepción pasada la fecha prevista. No copies el plazo de otro comprador con otra ruta."] },
      { heading: "Trata dirección y aduanas como tareas de prueba", paragraphs: ["Ante un problema de dirección, compara destinatario, calle, piso, ciudad, región, código postal, país y teléfono con el registro. Algunos transportistas limitan cambios después del despacho; usa solo la acción oficial del transportista o remitente.", "Ante aduanas, registra quién solicita, referencia, documento y plazo. Responde por un canal oficial y guarda confirmación. Un escaneo aduanero no prueba incautación, impuesto o fecha de salida sin aviso real."] },
      { heading: "Escala con un informe breve del último escaneo", paragraphs: ["Indica paquete, ruta, tracking, despacho, último evento y diferencia respecto a la estimación. Pregunta algo comprobable: aceptación física, nuevo número, socio actual o investigación abierta. Adjunta una captura completa y el registro relevante.", "Acude al remitente si no hay aceptación o solo su cliente contractual puede investigar; al transportista ante una excepción de entrega; a aduanas solo con instrucción auténtica. Guarda respuestas y número de caso."], bullets: ["Estado del paquete", "Estado del transportista", "Último evento y tiempo", "Estimación o excepción comparada", "Una acción concreta"] },
      { heading: "Reconoce lo que el tracking no demuestra", paragraphs: ["Una página quieta no prueba pérdida; entregado no prueba quién recibió ni el estado del contenido; una fecha estimada no garantiza; aduanas no revela por sí sola el resultado; un caso abierto no garantiza compensación.", "Si llega, fotografía exterior sellado, etiqueta y daño antes de abrir. Si no llega, conserva historial y términos actuales de la ruta o protección."] },
      { heading: "Un camino sereno para un paquete sin actualización", paragraphs: ["Identifica si solo hay estado interno o aceptación del transportista. Crea el registro, comprueba responsable, clasifica el último evento y compara con la ruta actual. Actúa ante una excepción real o escala al cruzar el límite publicado.", "El método no vuelve predecible el transporte, pero aclara quién registró por última vez el paquete, qué prueba falta y quién puede producirla."] },
    ],
  },
  de: {
    title: "Lolobuy-Tracking ohne Update? Den letzten Scan vor der Eskalation prüfen",
    shortTitle: "Was tun, wenn sich das Lolobuy-Tracking nicht aktualisiert?",
    description: "Checkliste für stilles Lolobuy-Tracking: Übergaben, Zoll, Adressprobleme und belastbare Belege für den Support.",
    eyebrow: "PAKET-TRACKING KLÄREN",
    readingTime: "14 Min. Lesezeit",
    factCheckLine: "Am 2. August 2026 mit LoloBuy-Website und Paketoberfläche sowie aktuellen Hinweisen von DHL eCommerce, USPS und UPS geprüft.",
    visual: {
      eyebrow: "DIE LETZTER-SCAN-METHODE",
      title: "Erst Belege prüfen, dann den Paketort einschätzen.",
      caption: "Sendung erfassen, letzten Carrier-Eintrag finden, Lücke einordnen und mit einer kompakten Akte eskalieren.",
      items: [
        { label: "Erfassen", text: "Paket-ID, Tracking, Route, Versanddatum und Anschrift sichern." },
        { label: "Finden", text: "Den neuesten datierten Eintrag beim zuständigen Carrier suchen." },
        { label: "Einordnen", text: "Label, Übergabe, Transit, Zoll und Zustellung trennen." },
        { label: "Eskalieren", text: "Letztes Ereignis, verstrichene Zeit und konkrete Prüffrage senden." },
      ],
    },
    sources: [
      { label: "LoloBuy-Website und Paketoberfläche — geprüft am 2. August 2026", note: "Primärquelle für Bestellung, QC, Fotos, 90 Tage Lagerung sowie den Hinweis, Tracking zu beobachten und bei Auffälligkeiten Kontakt aufzunehmen." },
      { label: "DHL-eCommerce-Tracking-FAQ — geprüft am 2. August 2026", note: "Carrier-spezifische Hinweise zu Meilensteinen, Übergaben, Zoll, Störungen und Nachforschungen des Absenders; kein LoloBuy-Zeitplan." },
      { label: "USPS Tracking: The Basics — geprüft am 2. August 2026", note: "US-Hinweis, dass Benachrichtigungen ein neues Tracking-Ereignis voraussetzen." },
      { label: "UPS Tracking Support — geprüft am 2. August 2026", note: "Carrier-Hilfe zu Status, Zoll, Zustelländerungen und Ansprüchen." },
      { label: "Letzter-Scan-Rahmen von Lolobuy Sheet", note: "Redaktionelle Methode zur Ordnung beobachtbarer Fakten; keine Plattformzusage oder Carrier-Regel." },
    ],
    intro: [
      "Eine Trackingnummer kann vorhanden sein, obwohl die Seite stillsteht. Vielleicht wurde nur das Label erzeugt, die physische Annahme fehlt, ein Exportpartner hat keinen neuen Meilenstein veröffentlicht, der lokale Zusteller wartet auf die Übergabe oder der Zoll benötigt Angaben.",
      "LoloBuys öffentliche Oberfläche empfiehlt, Pakete zu verfolgen und bei ungewöhnlichen Updates Kontakt aufzunehmen. Einen universellen ersten Scan, Verlustzeitpunkt, Carrierplan oder Entschädigungsausgang veröffentlicht sie nicht. Deshalb beginnt dieser Leitfaden mit dem letzten belegbaren Ereignis.",
    ],
    sections: [
      { heading: "Paketstatus und Carrier-Tracking zuerst trennen", paragraphs: ["Ein Datensatz kann Paketeinreichung, Zahlung, Bearbeitung, Versand, Annahme und öffentliches Tracking enthalten. Bearbeitet oder versandt ist nicht automatisch ein physischer Carrier-Scan. Text, Zeit und Seite zeigen, ob Lagerausgang oder Transport zu klären ist.", "Nicht ab Verkäuferzahlung zählen. Inlandsweg, Lager, QC, Verpackung und internationaler Versand sind getrennt; maßgeblich ist die Übergabe des internationalen Pakets."] },
      { heading: "Einen Versanddatensatz mit fünf Feldern anlegen", paragraphs: ["Paketreferenz, exakte Tracking-ID, Route, Versanddatum und letzten Eintrag mit Zeit und Ort sichern. Zielland und geschwärzte Anschrift ergänzen. Eine spätere lokale Nummer mit Datum behalten.", "So landen Auftragsnummern nicht beim falschen Carrier und Vergleiche bleiben routengleich. Trackingnummer, Name und Anschrift nie gemeinsam öffentlich teilen."], bullets: ["Paketreferenz und internationale Tracking-ID", "Route oder Service", "Versand- oder Übergabedatum", "Letzter Scan mit Zeit und Ort", "Zielland und geschwärzte Adresse"] },
      { heading: "Beim verantwortlichen Carrier prüfen", paragraphs: ["Nummer kopieren und die im Paketdatensatz genannte Carrier-Seite öffnen. Aggregatoren können Partner finden, aber hinterherhinken oder anders übersetzen. Bei einer lokalen Zweitnummer beide IDs verknüpft dokumentieren.", "Kein Ergebnis kann Tippfehler, noch nicht angenommenes Label, falsche Carrier-Seite oder begrenztes Tracking bedeuten. Nach physischer Annahme und aktuellem Scan-Eigentümer fragen, nicht sofort Verlust behaupten."] },
      { heading: "Das letzte Ereignis klassifizieren", paragraphs: ["Label erstellt oder Daten erhalten belegt noch keine Besitzübernahme. Angenommen oder abgeholt tut dies eher. Transit zeigt Meilensteine statt GPS. Export, Ankunft, Zoll und lokale Zustellung gehören zu anderen Phasen.", "Bei Ausnahmen den exakten Code sichern: unvollständige Adresse, Abwesenheit, Zollangaben, Halt, Rücksendung oder Schaden verlangen unterschiedliche Schritte."] },
      { heading: "Warum sich ein Paket ohne Update bewegen kann", paragraphs: ["DHL eCommerce beschreibt Meilenstein-Tracking, Lücken und lokale Postübergaben sowie Wetter, Zoll und Rückstände. USPS erklärt, dass eine Benachrichtigung ein neues Ereignis braucht. Das sind Carrier-Beispiele, keine Zusage für die konkrete Route.", "Stille immer mit aktueller Routenschätzung und letzter Scanart vergleichen. Eine Exportlücke ist etwas anderes als eine ungelöste Ausnahme nach dem erwarteten Termin. Keine fremde Tagesregel übernehmen."] },
      { heading: "Adresse und Zoll als Belegaufgaben behandeln", paragraphs: ["Bei Adressausnahme Empfänger, Straße, Wohnung, Ort, Region, Postleitzahl, Land und Telefon mit dem Datensatz vergleichen. Änderungen nach Versand können begrenzt sein; nur offizielle Carrier- oder Absenderaktionen nutzen.", "Beim Zoll Behörde oder Carrier, Referenz, angefordertes Dokument und Frist notieren. Über offizielle Kanäle antworten. Ein Zollscan allein beweist weder Beschlagnahme noch Abgabe oder Freigabedatum."] },
      { heading: "Mit einem kompakten Letzter-Scan-Bericht eskalieren", paragraphs: ["Paket, Route, Tracking, Versand, letzten Eintrag und Abweichung zur Schätzung nennen. Eine prüfbare Frage stellen: physische Übergabe, Ersatznummer, aktueller Partner oder eröffnete Nachforschung. Vollständigen Screenshot beifügen.", "Absender zuerst bei fehlender Annahme oder vertraglicher Nachforschung; Carrier bei Zustellcode; Zoll nur nach echter Anweisung. Antworten und Fallnummer zusammen speichern."], bullets: ["Aussage des Paketdatensatzes", "Aussage des Carriers", "Letztes Ereignis und Zeit", "Verglichene Schätzung oder Ausnahme", "Eine konkrete Aktion"] },
      { heading: "Grenzen des Trackingbelegs kennen", paragraphs: ["Stille beweist keinen Verlust; zugestellt beweist weder Empfänger noch Zustand; Schätzdatum ist keine Garantie; Zollstatus verrät nicht das Ergebnis; Fallnummer garantiert keine Entschädigung.", "Bei Ankunft versiegelte Außenseite, Label und Schäden vor dem Öffnen fotografieren. Bei Nichtankunft Verlauf und aktuelle Routenbedingungen sichern."] },
      { heading: "Ein ruhiger Entscheidungsweg ohne Update", paragraphs: ["Zuerst internen Status oder Carrier-Annahme unterscheiden. Datensatz bauen, Carrier prüfen, letzten Scan einordnen und mit der aktuellen Route vergleichen. Echte Ausnahme sofort, sonst nach veröffentlichter Grenze gezielt eskalieren.", "Der Transport wird dadurch nicht vorhersagbar, aber klar wird, wer zuletzt erfasst hat, welcher Beleg fehlt und wer ihn liefern kann."] },
    ],
  },
  fr: {
    title: "Le suivi Lolobuy ne bouge plus ? Diagnostiquer le dernier scan avant l'escalade",
    shortTitle: "Que faire si le suivi Lolobuy ne se met plus à jour ?",
    description: "Checklist pour un suivi Lolobuy bloqué : relais, douane, adresse et dossier de preuve utile au support.",
    eyebrow: "DÉPANNAGE DU SUIVI COLIS",
    readingTime: "14 min de lecture",
    factCheckLine: "Vérifié le 2 août 2026 avec le site et l'interface colis LoloBuy ainsi que les guides actuels de DHL eCommerce, USPS et UPS.",
    visual: {
      eyebrow: "MÉTHODE DU DERNIER SCAN",
      title: "Diagnostiquer les preuves avant de deviner où se trouve le colis.",
      caption: "Enregistrer l'envoi, trouver le dernier événement, classer le silence et transmettre un dossier compact.",
      items: [
        { label: "Enregistrer", text: "Conserver colis, suivi, route, expédition et adresse transmise." },
        { label: "Localiser", text: "Trouver le dernier événement daté chez le transporteur responsable." },
        { label: "Classer", text: "Distinguer étiquette, relais, transit, douane et livraison." },
        { label: "Escalader", text: "Envoyer dernier événement, durée et vérification demandée." },
      ],
    },
    sources: [
      { label: "Site et interface colis LoloBuy — vérifiés le 2 août 2026", note: "Source primaire pour commande, QC, photos, 90 jours de stockage et consigne de surveiller le suivi puis contacter en cas d'anomalie." },
      { label: "FAQ de suivi DHL eCommerce — vérifiée le 2 août 2026", note: "Éléments propres au transporteur sur jalons, relais, douane, perturbations et enquête par l'expéditeur ; ce n'est pas un délai LoloBuy." },
      { label: "USPS Tracking: The Basics — vérifié le 2 août 2026", note: "Guide américain indiquant qu'une notification suppose un nouvel événement de suivi." },
      { label: "UPS Tracking Support — vérifié le 2 août 2026", note: "Guide transporteur distinguant statuts, douane, modification et réclamation." },
      { label: "Cadre du dernier scan de Lolobuy Sheet", note: "Analyse éditoriale pour ordonner des faits observables ; ni promesse de plateforme ni règle transporteur." },
    ],
    intro: [
      "Un numéro peut exister alors que la page semble figée. L'étiquette a peut-être seulement été créée, l'acceptation physique manque, le partenaire export n'a pas publié de jalon, le transporteur local attend le relais ou la douane demande une information.",
      "L'interface publique LoloBuy demande de suivre le colis et de contacter le service en cas d'actualisation anormale. Elle ne publie pas de délai universel pour le premier scan, la perte, les transporteurs ou l'indemnisation. Ce guide part donc du dernier fait vérifiable.",
    ],
    sections: [
      { heading: "Distinguer d'abord statut du colis et suivi transporteur", paragraphs: ["Le dossier peut afficher soumission, paiement, traitement, expédition, acceptation et suivi public. Traité ou expédié ne vaut pas forcément scan physique. Notez texte, heure et page pour savoir si le blocage concerne l'entrepôt ou le transporteur.", "Ne comptez pas depuis le paiement au vendeur. Trajet domestique, QC, emballage et expédition internationale sont des phases différentes ; utilisez le relais du colis international."] },
      { heading: "Créer une fiche d'envoi en cinq champs", paragraphs: ["Conservez référence colis, numéro exact, route, date d'expédition et dernier événement avec heure et lieu. Ajoutez pays et adresse masquée. Gardez tout numéro local apparu plus tard.", "Cela évite de donner un numéro de commande au transporteur ou de comparer une autre route. Ne publiez jamais ensemble suivi complet, nom et adresse."], bullets: ["Référence et suivi international", "Route ou service", "Date d'expédition ou relais", "Dernier scan, heure et lieu", "Pays et adresse masquée"] },
      { heading: "Vérifier le transporteur responsable", paragraphs: ["Copiez le numéro et ouvrez la page du transporteur indiqué. Un agrégateur peut découvrir un partenaire mais retarder ou traduire différemment. Si un numéro local apparaît, conservez le lien entre les deux.", "Aucun résultat peut signifier erreur, étiquette non acceptée, mauvais transporteur ou événements limités. Demandez qui détient le scan et si le colis a été accepté physiquement."] },
      { heading: "Classer le dernier événement", paragraphs: ["Étiquette créée ou données reçues ne prouvent pas la possession. Accepté ou collecté l'enregistre. En transit montre des jalons, pas un GPS continu. Export, arrivée, douane et dernier kilomètre exigent des actions distinctes.", "Conservez le code exact d'une exception : adresse incomplète, absence, information douanière, retenue, retour ou dommage."] },
      { heading: "Comprendre un silence compatible avec le mouvement", paragraphs: ["DHL eCommerce décrit un suivi par jalons, des intervalles et des relais postaux, ainsi que météo, douane et encombrement. USPS explique qu'une alerte demande un événement nouveau. Ce sont des exemples de transporteur, pas une promesse de route.", "Comparez le silence à l'estimation actuelle et au type de dernier scan. Un intervalle après export diffère d'une exception non résolue après la date prévue. N'empruntez pas le délai d'un autre acheteur."] },
      { heading: "Traiter adresse et douane comme des tâches de preuve", paragraphs: ["Pour une adresse, comparez destinataire, rue, appartement, ville, région, code postal, pays et téléphone. Certains transporteurs limitent les changements ; utilisez uniquement l'action officielle du transporteur ou de l'expéditeur.", "Pour la douane, notez organisme, référence, document et délai. Répondez par canal officiel. Un scan douanier seul ne prouve ni saisie, ni taxe, ni date de libération."] },
      { heading: "Escalader avec un rapport compact du dernier scan", paragraphs: ["Indiquez colis, route, suivi, expédition, dernier événement et écart avec l'estimation. Posez une question vérifiable : relais physique, nouveau numéro, partenaire actuel ou enquête ouverte. Joignez une capture complète.", "Contactez l'expéditeur si l'acceptation manque ou si lui seul peut enquêter ; le transporteur pour un code de livraison ; la douane seulement après instruction authentique. Gardez réponses et dossier."], bullets: ["Statut du colis", "Statut transporteur", "Dernier événement et durée", "Estimation ou exception comparée", "Une action précise"] },
      { heading: "Connaître les limites du suivi", paragraphs: ["Une page immobile ne prouve pas la perte ; livré ne prouve ni destinataire ni état ; une estimation ne garantit rien ; un événement douanier ne donne pas l'issue ; un dossier n'assure pas l'indemnisation.", "À l'arrivée, photographiez emballage scellé, étiquette et dommages avant ouverture. Sinon, conservez historique et conditions actuelles de route."] },
      { heading: "Un parcours calme pour un colis sans mise à jour", paragraphs: ["Distinguez statut interne et acceptation, créez la fiche, vérifiez le responsable, classez le scan et comparez à la route. Traitez une exception réelle ou escaladez après la limite publiée.", "La méthode ne prédit pas le transport, mais précise qui a enregistré en dernier, quelle preuve manque et qui peut la produire."] },
    ],
  },
  it: {
    title: "Tracking Lolobuy fermo? Diagnostica l'ultima scansione prima di segnalare",
    shortTitle: "Cosa fare se il tracking Lolobuy non si aggiorna",
    description: "Checklist per un tracking Lolobuy fermo: passaggi, dogana, indirizzo e prove utili per l'assistenza.",
    eyebrow: "RISOLVERE IL TRACKING DEL PACCO",
    readingTime: "14 min di lettura",
    factCheckLine: "Verificato il 2 agosto 2026 con sito e interfaccia pacchi LoloBuy e con le guide attuali di DHL eCommerce, USPS e UPS.",
    visual: {
      eyebrow: "METODO DELL'ULTIMA SCANSIONE",
      title: "Diagnostica le prove prima di indovinare dove sia il pacco.",
      caption: "Registra la spedizione, trova l'ultimo evento, classifica il silenzio e segnala con un dossier compatto.",
      items: [
        { label: "Registra", text: "Salva pacco, tracking, rotta, spedizione e indirizzo inviato." },
        { label: "Trova", text: "Cerca l'evento datato più recente sul sito del vettore responsabile." },
        { label: "Classifica", text: "Distingui etichetta, passaggio, transito, dogana e consegna." },
        { label: "Segnala", text: "Invia ultimo evento, tempo trascorso e verifica richiesta." },
      ],
    },
    sources: [
      { label: "Sito e interfaccia pacchi LoloBuy — controllati il 2 agosto 2026", note: "Fonte primaria per ordine, QC, foto, 90 giorni di deposito e indicazione di seguire il pacco e contattare il servizio per aggiornamenti anomali." },
      { label: "FAQ tracking DHL eCommerce — controllata il 2 agosto 2026", note: "Informazioni del vettore su tappe, passaggi, dogana, disservizi e indagine del mittente; non è una tempistica LoloBuy." },
      { label: "USPS Tracking: The Basics — controllato il 2 agosto 2026", note: "Guida USA secondo cui una notifica richiede un nuovo evento di tracking." },
      { label: "UPS Tracking Support — controllato il 2 agosto 2026", note: "Guida del vettore che separa stati, dogana, modifiche di consegna e reclami." },
      { label: "Schema ultima scansione di Lolobuy Sheet", note: "Analisi editoriale per ordinare fatti osservabili; non è promessa della piattaforma né regola del vettore." },
    ],
    intro: [
      "Un numero di tracking può esistere mentre la pagina resta ferma. Forse è stata creata solo l'etichetta, manca l'accettazione fisica, il partner export non ha pubblicato una tappa, il vettore locale attende il passaggio o la dogana chiede dati.",
      "L'interfaccia pubblica LoloBuy invita a seguire il pacco e contattare il servizio per aggiornamenti anomali, ma non pubblica una scadenza universale per prima scansione, smarrimento, vettori o compensazione. La guida parte dall'ultimo fatto verificabile.",
    ],
    sections: [
      { heading: "Separa prima stato del pacco e tracking del vettore", paragraphs: ["La pratica può mostrare invio pacco, pagamento, lavorazione, spedizione, accettazione e tracking pubblico. Lavorato o spedito non equivale sempre a scansione fisica. Annota testo, ora e pagina per capire se chiedere al magazzino o al vettore.", "Non contare dal pagamento al venditore. Tratta domestica, QC, imballaggio e spedizione internazionale sono fasi diverse; usa il passaggio del pacco internazionale."] },
      { heading: "Crea un registro di cinque campi", paragraphs: ["Salva riferimento, numero esatto, rotta, data di spedizione e ultimo evento con ora e luogo. Aggiungi paese e indirizzo oscurato. Conserva un eventuale numero locale con la data di comparsa.", "Eviti così di dare un numero ordine al vettore o confrontare una rotta diversa. Non pubblicare insieme tracking completo, nome e indirizzo."], bullets: ["Riferimento e tracking internazionale", "Rotta o servizio", "Data di spedizione o passaggio", "Ultima scansione, ora e luogo", "Paese e indirizzo oscurato"] },
      { heading: "Controlla il vettore responsabile", paragraphs: ["Copia il numero e apri il sito del vettore indicato. Un aggregatore può trovare partner ma essere in ritardo o tradurre diversamente. Se appare un numero locale, conserva il legame tra i due.", "Nessun risultato può significare errore, etichetta non accettata, vettore errato o eventi limitati. Chiedi chi controlla la scansione e se c'è stata accettazione fisica."] },
      { heading: "Classifica l'ultimo evento", paragraphs: ["Etichetta creata o dati ricevuti non provano il possesso. Accettato o ritirato registra la custodia. In transito mostra tappe, non GPS continuo. Export, arrivo, dogana e ultimo miglio richiedono azioni diverse.", "Salva il codice esatto di un'eccezione: indirizzo incompleto, assenza, dati doganali, fermo, reso o danno."] },
      { heading: "Capisci perché il pacco può muoversi senza aggiornamenti", paragraphs: ["DHL eCommerce descrive tracking a tappe, intervalli e passaggi postali, oltre a meteo, dogana e arretrati. USPS spiega che un avviso richiede un evento nuovo. Sono esempi di vettori, non promesse per la rotta.", "Confronta il silenzio con la stima corrente e il tipo di ultima scansione. Un intervallo dopo l'export è diverso da un'eccezione oltre la data prevista. Non copiare i giorni di un altro acquirente."] },
      { heading: "Tratta indirizzo e dogana come compiti di prova", paragraphs: ["Per l'indirizzo confronta destinatario, via, interno, città, regione, CAP, paese e telefono. Alcuni vettori limitano modifiche dopo l'invio; usa solo l'azione ufficiale del vettore o mittente.", "Per la dogana registra ente, riferimento, documento e scadenza. Rispondi tramite canale ufficiale. Una scansione doganale non prova sequestro, tassa o data di rilascio."] },
      { heading: "Segnala con un rapporto compatto dell'ultima scansione", paragraphs: ["Indica pacco, rotta, tracking, spedizione, ultimo evento e differenza rispetto alla stima. Fai una domanda verificabile: consegna fisica, nuovo numero, partner attuale o indagine aperta. Allega una schermata completa.", "Vai al mittente se manca accettazione o solo lui può indagare; al vettore per un'eccezione di consegna; alla dogana solo con istruzione autentica. Conserva risposte e pratica."], bullets: ["Stato del pacco", "Stato del vettore", "Ultimo evento e tempo", "Stima o eccezione confrontata", "Un'azione precisa"] },
      { heading: "Conosci ciò che il tracking non prova", paragraphs: ["Una pagina ferma non prova smarrimento; consegnato non prova destinatario o condizioni; una stima non garantisce; dogana non rivela l'esito; una pratica non garantisce compensazione.", "All'arrivo fotografa esterno sigillato, etichetta e danni prima di aprire. Se non arriva, conserva cronologia e termini attuali della rotta."] },
      { heading: "Un percorso calmo per un pacco senza aggiornamenti", paragraphs: ["Distingui stato interno e accettazione, crea il registro, controlla il responsabile, classifica l'ultima scansione e confronta la rotta. Gestisci un'eccezione reale o segnala dopo il limite pubblicato.", "Il metodo non rende prevedibile il trasporto, ma chiarisce chi ha registrato per ultimo, quale prova manca e chi può produrla."] },
    ],
  },
};
