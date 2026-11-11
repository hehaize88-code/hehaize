import { categoryDepth } from './category-depth.js';
import { products } from './site.js';

// Full translations for text missed by the original static-page dictionaries.
// Brand and model identifiers remain unchanged; descriptive product terms are localized.
export const localeRepair = { de: {}, 'pt-br': {} };
const add = (source, de, pt) => {
  localeRepair.de[source] = de;
  localeRepair['pt-br'][source] = pt;
};

const categoryCopy = {
  shoes: {
    de: [
      'Prüfe zuerst die Passform und danach die Farbvarianten.',
      'Eine Schuhauswahl ist erst hilfreich, wenn sich jede Referenz einem aktuellen Angebot zuordnen lässt. Beginne mit den acht unten verlinkten Recherche-Seiten und vergleiche anschließend die aktuelle Verkäuferseite, die Quellen-ID, das angegebene Größensystem und die ausgewählte Farbe. Ein vertrauter Modellname macht zwei Angebote nicht austauschbar: Verfügbare Größen, Variantenbezeichnungen, enthaltene Verpackung und das fotografierte Produkt können abweichen. Speichere die genaue Variante statt nur eines zugeschnittenen Katalogbilds.',
      'Rechne die Angaben in der Größentabelle des Verkäufers in Zentimeter um und vergleiche sie mit Schuhen, die du bereits trägst. Ist die Tabelle unklar, hilft eine Messung der Innensohle mehr als die Frage, ob der Schuh größengerecht ausfällt. Prüfe im Lager beide Schuhe gemeinsam: linkes und rechtes Profil, Sohlenmuster, Fersenausrichtung, Größenetiketten und sichtbare Flecken. Plane die Verpackung erst danach, denn ein Schuhkarton kann die Form schützen, erhöht aber möglicherweise das berechnete Volumen.',
      'Größensystem und Innensohlenlänge', 'QC von Paar, Sohle und Ferse', 'Volumen mit und ohne Schuhkarton',
    ],
    'pt-br': [
      'Compare as medidas e o ajuste antes das cores.',
      'Uma seleção de calçados só é útil quando cada referência pode ser vinculada a um anúncio atual. Comece pelas oito páginas de pesquisa abaixo e depois compare o anúncio do vendedor, o ID de origem, o sistema de tamanhos informado e a cor selecionada. Um nome de modelo conhecido não torna dois anúncios equivalentes: tamanhos disponíveis, nomes das variantes, embalagem incluída e produto fotografado podem ser diferentes. Salve a opção exata, em vez de apenas uma imagem recortada do catálogo.',
      'Para avaliar o ajuste, converta a tabela do vendedor para centímetros e compare com calçados que você já usa. Quando a tabela não for clara, uma medida da palmilha é mais útil do que perguntar se o calçado tem tamanho padrão. Na conferência do armazém, compare os dois pés: perfis esquerdo e direito, desenho da sola, alinhamento dos calcanhares, etiquetas de tamanho e marcas visíveis. Planeje a embalagem depois, pois manter a caixa pode proteger o formato e aumentar o volume cobrável.',
      'Sistema de tamanhos e comprimento da palmilha', 'QC do par, da sola e do calcanhar', 'Volume com e sem a caixa',
    ],
  },
  hoodies: {
    de: [
      'Behandle jede Designvariante als eigene Kleiderauswahl.',
      'Angebote für Kapuzenpullover und Sweatshirts fassen oft mehrere Aufdrucke oder Farben unter einem Titel zusammen. Die acht Referenzen auf dieser Seite führen deshalb zu eigenen Recherche-Einträgen, die Quellen-ID und beobachteten Preis festhalten, bevor du den aktuellen Katalog öffnest. Öffne die gewünschte Variante und notiere Farbe, Aufdruck, Größe sowie die Maße des Verkäufers. Ein einzelnes Titelbild kann nicht jede Variante eines Angebots mit mehreren Designs beschreiben.',
      'Brustweite, Kleidungs- und Ärmellänge sind verlässlicher als eine aus einem anderen Markt übernommene Buchstabengröße. Lagerfotos sollten eine gerade Vorder- und Rückansicht zeigen, damit sich Proportionen und Position des Aufdrucks mit der gespeicherten Variante vergleichen lassen. Nahaufnahmen helfen am meisten bei einer konkreten Frage, etwa zu Bündchen, Nähten, Reißverschlussteilen oder einer sichtbaren Stelle. Weiche Kleidung lässt sich platzsparend zusammenpacken, dichtes Fleece trägt aber weiterhin zum tatsächlichen Paketgewicht bei.',
      'Brustweite, Kleidungs- und Ärmellänge', 'Ausrichtung von Aufdruck, Bündchen und Kapuze', 'Stoffgewicht und Feuchtigkeitsschutz',
    ],
    'pt-br': [
      'Trate cada modelo como uma escolha de roupa separada.',
      'Anúncios de moletons com e sem capuz costumam reunir várias estampas ou cores em um único título. Por isso, as oito referências desta página levam a registros individuais que preservam o ID de origem e o preço observado antes de abrir o catálogo atual. Abra a opção desejada e registre cor, estampa, tamanho e medidas do vendedor. Uma única imagem de capa não descreve todas as opções de um anúncio com vários modelos.',
      'Largura do peito, comprimento da peça e comprimento das mangas são mais confiáveis do que um tamanho por letra copiado de outro mercado. As fotos do armazém devem mostrar frente e costas alinhadas, permitindo comparar proporções e posição da estampa com a opção salva. Fotos aproximadas são mais úteis para uma dúvida específica, como punhos, costuras, peças do zíper ou uma marca visível. Roupas macias podem ser consolidadas de forma eficiente, mas um tecido de fleece denso ainda aumenta o peso real do pacote.',
      'Medidas do peito, da peça e das mangas', 'Alinhamento da estampa, dos punhos e do capuz', 'Peso do tecido e proteção contra umidade',
    ],
  },
  't-shirts': {
    de: [
      'Prüfe Aufdruck, Kleidergröße und aktuellen Preis getrennt.',
      'T-Shirt-Angebote wirken oft einfach, obwohl sie Dutzende auswählbare Designs enthalten. Nutze jede lokale Referenzseite, um Katalogartikel und Quellen-ID festzustellen. Öffne anschließend das aktuelle Angebot erneut und prüfe, welches Design zum angezeigten Preis gehört. Speichere den ausgewählten Aufdruck, die Farbe und die Größe zusammen. Andernfalls lässt sich ein späteres Lagerfoto möglicherweise nicht mehr mit der tatsächlich bestellten Variante vergleichen.',
      'Miss ein vorhandenes T-Shirt von Achsel zu Achsel und von der Schulter bis zum Saum. Vergleiche diese Zentimeterangaben mit der Tabelle des Verkäufers. Prüfe beim QC die Gesamtproportionen, Kragenform, Nahtführung, Zentrierung des Aufdrucks und sichtbare Flecken. Benenne bei einer Messanfrage genau das benötigte Maß. T-Shirts nutzen den Paketraum meist effizient; helle Stücke sollten aber von schmutzigen Verpackungen und dunklen Materialien getrennt werden, die abfärben könnten.',
      'Genauer Aufdruck und Farbvariante', 'Brustweite und Kleidungsstücklänge', 'QC von Kragen, Nähten und Aufdruck',
    ],
    'pt-br': [
      'Separe a escolha da estampa, o tamanho e o preço atual.',
      'Páginas de camisetas podem parecer simples e ainda oferecer dezenas de estampas selecionáveis. Use cada página de referência para identificar o item do catálogo e o ID de origem. Depois, reabra o anúncio atual para confirmar qual modelo corresponde ao preço exibido. Salve a estampa, a cor e o tamanho juntos. Caso contrário, talvez não seja possível comparar uma foto posterior do armazém com a opção realmente enviada no pedido.',
      'Meça uma camiseta que você já tem de axila a axila e do ombro até a barra. Compare essas medidas em centímetros com a tabela do vendedor. No QC, confira proporções gerais, formato da gola, direção das costuras, centralização da estampa e manchas visíveis. Ao pedir uma foto com régua, indique exatamente a medida necessária. Camisetas costumam ocupar bem o espaço do pacote, mas peças claras devem ficar separadas de embalagens sujas e materiais escuros que possam transferir marcas.',
      'Estampa e opção de cor exatas', 'Largura do peito e comprimento da peça', 'QC da gola, das costuras e da estampa',
    ],
  },
  jackets: {
    de: [
      'Prüfe zuerst den Aufbau, denn Oberbekleidung verändert das Paket.',
      'Jacken, Mäntel und Steppjacken können sich bei Futter, Füllung, Verschlüssen und abnehmbaren Teilen stark unterscheiden, selbst wenn ihre Katalogtitel ähnlich klingen. Die acht lokalen Referenzen machen die jeweiligen Ziele einzeln auffindbar und halten die erfassten Quellen-IDs getrennt. Prüfe vor der Bestellung Schulterbreite, Brustweite, Ärmellänge und Gesamtlänge. Speichere anschließend die genaue Farbe und Ausführung der ausgewählten Variante.',
      'Die Lageraufnahmen sollten gerade Vorder- und Rückansichten sowie eine Ansicht des geöffneten Kleidungsstücks enthalten, wenn Futter oder Verschluss wichtig sind. Prüfe Reißverschlussführungen, Druckknöpfe, Bündchen, Nähte und die allgemeine Symmetrie, bevor du kleine Zierdetails betrachtest. Gefütterte und formstabile Oberbekleidung kann zu höherem Volumengewicht führen. Kompression spart möglicherweise Platz, kann aber Beschichtungen verknittern, Füllungen zusammendrücken oder Stoffteile verformen. Die günstigste Verpackungsmethode ist deshalb nicht automatisch die sicherste.',
      'Vier Kleidungsmaße', 'Futter, Verschluss und Beschläge', 'Formstabilität und Kompression',
    ],
    'pt-br': [
      'Confira primeiro a construção, pois casacos mudam o pacote.',
      'Jaquetas, casacos e peças acolchoadas podem ter forros, enchimentos, fechos e partes removíveis muito diferentes, mesmo quando os títulos do catálogo são parecidos. As oito referências locais permitem identificar cada destino separadamente e mantêm distintos os IDs de origem registrados. Antes de comprar, confira ombros, peito, mangas e comprimento total. Depois, salve a cor e a construção exatas da variante selecionada.',
      'As imagens do armazém devem mostrar frente e costas alinhadas, além da peça aberta quando o forro ou o fechamento for importante. Confira trilhos do zíper, botões de pressão, punhos, costuras e simetria geral antes de focar em pequenos detalhes decorativos. Peças acolchoadas e estruturadas podem aumentar o peso volumétrico. A compressão pode economizar espaço, mas também pode marcar revestimentos, achatar o isolamento ou deformar painéis. Portanto, a embalagem mais barata não é automaticamente a mais segura.',
      'Quatro medidas da peça', 'Forro, fechamento e ferragens', 'Estrutura e compressão',
    ],
  },
  tops: {
    de: [
      'Nutze Kleidungsmaße statt einer vertrauten Größenbezeichnung.',
      'Langarmshirts, Poloshirts, Hemden und Strickjacken benötigen einen genaueren Vergleich als die allgemeine Bezeichnung Oberteile. Jede der acht Recherche-Seiten dokumentiert ein Katalogziel, eine Quellen-ID und einen beobachteten Preis. Prüfe auf der aktuellen Seite die genaue Kleidungsart, Kragen- oder Verschlussform, Farbe und Variante. Zusammengefasste Angebote können Kleidungsstücke mit unterschiedlichem Aufbau und unterschiedlichen Größen enthalten.',
      'Vergleiche Schulterbreite, Brustweite, Ärmellänge und Gesamtlänge in Zentimetern mit einem Kleidungsstück, das bereits passt. Bei geknöpften Oberteilen oder Stücken mit Kragen sollten Lagerfotos die Ausrichtung der Knopfleiste, Kragenform, Bündchen und gerade Nähte zeigen. Bei Strickwaren hilft außerdem eine klare Aufnahme von gezogenen Fäden oder ungleichmäßigen Kanten. Die meisten Oberteile lassen sich gut mit anderen weichen Waren zusammenpacken; feste Knöpfe, Kragen und strukturierte Oberflächen sollten aber nicht für eine geringe Volumeneinsparung zerdrückt werden.',
      'Schulterbreite, Brustweite, Ärmel- und Gesamtlänge', 'QC von Kragen, Knöpfen und Bündchen', 'Formstabile Oberflächen schützen',
    ],
    'pt-br': [
      'Use as medidas da peça, em vez de um tamanho conhecido.',
      'Peças de manga longa, polos, camisas e cardigãs precisam de uma comparação mais específica do que a categoria genérica de blusas. Cada uma das oito páginas de pesquisa registra um destino no catálogo, um ID de origem e um preço observado. No anúncio atual, confirme o tipo exato de peça, a gola ou o fechamento, a cor e a variante. Anúncios agrupados podem reunir produtos com construções e medidas diferentes.',
      'Compare ombros, peito, mangas e comprimento em centímetros com uma peça que já veste bem. Para itens com botões ou gola, as imagens do armazém devem mostrar o alinhamento da vista de botões, o formato da gola, os punhos e as costuras retas. Em peças de tricô, também é útil uma imagem clara de fios puxados ou bordas irregulares. A maioria das blusas pode ser consolidada com outras peças macias, mas botões rígidos, golas e acabamentos texturizados não devem ser esmagados apenas para reduzir um pouco o volume.',
      'Ombros, peito, mangas e comprimento', 'QC da gola, dos botões e dos punhos', 'Proteja acabamentos estruturados',
    ],
  },
  accessories: {
    de: [
      'Zähle die enthaltenen Teile und passe die Prüfung dem Gegenstand an.',
      'Accessoires umfassen sehr unterschiedliche Gegenstände: Taschen und Geldbörsen ebenso wie Masken, Schlüsselanhänger und Uhren. Deshalb verwendet diese Kategorie acht eigenständige Produktdatensätze, statt jede Karte direkt auf dieselbe externe Liste zu verlinken. Prüfe auf der aktuellen Angebotsseite die Maße, die Farbe, die Materialbeschreibung und jeden enthaltenen Riemen, Beutel, Verschluss sowie jedes abnehmbare Teil.',
      'Eine formstabile Tasche benötigt gerade Ansichten ihrer Form, ihres Bodens, ihrer Kanten, Griffe und Beschläge. Bei kleinen Accessoires sind eine klare Stückzahl und ein Größenvergleich wichtig. Lagerfotos können weder Materialzusammensetzung noch Echtheit nachweisen; beschränke die Fragen daher auf sichtbare Merkmale. Verhindere beim Verpacken, dass harte Metallteile an empfindlichen Flächen reiben, sichere lose Teile und entscheide, ob ein formstabiler Gegenstand eine innere Stütze statt starker Kompression benötigt.',
      'Maße und enthaltene Teile', 'Kanten, Verschlüsse und Beschläge', 'Kleine oder formstabile Teile sichern',
    ],
    'pt-br': [
      'Conte as peças incluídas e adapte a conferência ao objeto.',
      'Acessórios incluem objetos muito diferentes, de bolsas e carteiras a máscaras, chaveiros e relógios. Por isso, esta categoria usa oito registros distintos de produtos, em vez de enviar todos os cartões para uma única lista externa. Confira no anúncio atual as dimensões, a cor, a descrição do material e cada alça, bolsa de proteção, fecho ou componente removível incluído.',
      'Uma bolsa estruturada precisa de imagens alinhadas de seu formato, base, bordas, alças e ferragens; um acessório pequeno precisa de uma contagem clara e de uma referência de escala. Fotos do armazém não comprovam composição do material ou autenticidade, portanto limite as perguntas aos fatos visíveis. Na embalagem, evite que peças de metal rígido esfreguem em superfícies delicadas, prenda partes soltas e avalie se um item estruturado precisa de suporte interno em vez de compressão intensa.',
      'Dimensões e peças incluídas', 'Bordas, fechos e ferragens', 'Prenda partes pequenas ou estruturadas',
    ],
  },
  electronics: {
    de: [
      'Bestätige das genaue Modell, bevor du die Qualität beurteilst.',
      'Die Recherche zu Elektronik beginnt mit der Identifikation: Modell, Version, Farbe, angegebene Kapazität oder Verbindungsmöglichkeiten, Steckertyp und enthaltenes Zubehör. Die acht lokalen Referenzseiten halten Bezeichnung, Quellen-ID und beobachteten CNY-Preis fest. Maßgeblich für aktuell auswählbare Varianten bleibt jedoch das aktuelle Angebot. Ähnlich aussehende Geräte können unterschiedliche technische Daten haben; ein Katalogfoto belegt weder die inneren Bauteile noch den Zustand des Akkus.',
      'Lagerbilder können sichtbare Etiketten, Anschlüsse, Stückzahl, offensichtliche Schäden und das Vorhandensein aufgeführten Zubehörs bestätigen. Sie belegen weder langfristige Leistung, Softwareunterstützung, Echtheit noch elektrische Sicherheit. Prüfe vor dem Paketauftrag die aktuellen Versandregeln für Akkus und magnetische Artikel, da andere Versandlinien zulässig sein können als für gewöhnliche Kleidung. Eine schützende Verkaufsverpackung erhöht möglicherweise das Volumen; ihre Entfernung kann jedoch Displays, Gehäuse und Zubehör beschädigungsanfälliger machen.',
      'Modell, Version und enthaltene Teile', 'Etiketten, Anschlüsse und sichtbarer Zustand', 'Akku und Eignung der Versandlinie',
    ],
    'pt-br': [
      'Confirme o modelo exato antes de avaliar a qualidade.',
      'A pesquisa de eletrônicos começa pela identificação: modelo, versão, cor, capacidade ou conectividade informada, tipo de plugue e acessórios incluídos. As oito páginas locais preservam o nome, o ID de origem e o preço em CNY observado, mas o anúncio atual é a referência para as opções disponíveis. Aparelhos parecidos podem ter especificações diferentes, e uma foto de catálogo não comprova os componentes internos ou a condição da bateria.',
      'Imagens do armazém podem confirmar etiquetas visíveis, portas, quantidade, danos aparentes e presença dos acessórios informados. Elas não demonstram desempenho de longo prazo, suporte de software, autenticidade ou segurança elétrica. Antes de enviar o pacote, confira as regras atuais das linhas para baterias e itens magnéticos, pois as rotas disponíveis podem ser diferentes das utilizadas para roupas comuns. A embalagem de varejo pode aumentar o volume, mas sua retirada pode deixar telas, carcaças e acessórios mais expostos a danos.',
      'Modelo, versão e peças incluídas', 'Etiquetas, portas e condição visível', 'Compatibilidade da bateria com a rota',
    ],
  },
  collectibles: {
    de: [
      'Halte Größe, Stückzahl und Form fest, bevor du das Paket planst.',
      'Sammelfiguren, Plüschartikel und Überraschungsboxen lassen sich anhand eines Titelbilds schwer beurteilen, weil Größe und Stückzahl unklar sein können. Nutze die acht lokalen Einträge, um Quellen-IDs und Referenzpreise auseinanderzuhalten. Prüfe anschließend im aktuellen Angebot die genaue Figur, Edition, Maße, Stückzahl und Verpackungsoption. Ein Serienbild beweist nicht, dass alle gezeigten Designs enthalten oder auswählbar sind.',
      'Bitte beim QC zunächst um eine gerade Gesamtansicht. Fordere erst danach eine Nahaufnahme einer Naht, eines Etiketts, eines Gesichtsdetails oder eines Zubehörteils an, wenn sie deine Entscheidung beeinflussen kann. Zähle alle zugesagten Teile und vergleiche das sichtbare Design mit der gespeicherten Variante. Weiche Sammlerstücke können leicht sein, aber viel Platz benötigen; verpackte Figuren brauchen Schutz an den Ecken. Kompression kann das Volumen verringern, aber Füllung, Gesicht, Ausstellungsform oder Verpackung dauerhaft verformen.',
      'Maße, Edition und Stückzahl', 'Form, Nähte und enthaltene Teile', 'Kompression und Ausstellungszustand',
    ],
    'pt-br': [
      'Registre escala, quantidade e formato antes de planejar o pacote.',
      'Figuras colecionáveis, pelúcias e caixas-surpresa são difíceis de avaliar por uma imagem de capa, pois escala e quantidade podem não estar claras. Use os oito registros locais para distinguir IDs de origem e preços de referência. Depois, confirme no anúncio atual o personagem, a edição, as dimensões, a quantidade e a opção de caixa. Uma imagem da coleção não comprova que todos os modelos mostrados estejam incluídos ou disponíveis para escolha.',
      'No QC, solicite primeiro uma imagem alinhada do item inteiro. Depois, peça aproximação de uma costura, etiqueta, detalhe do rosto ou acessório que possa mudar sua decisão. Conte todas as peças prometidas e compare o desenho visível com a opção salva. Colecionáveis macios podem ser leves e ocupar bastante espaço; figuras em caixa precisam de proteção nos cantos. A compressão pode reduzir o volume, mas pode deformar permanentemente o enchimento, os rostos, o formato de exposição ou a embalagem.',
      'Dimensões, edição e quantidade', 'Formato, costuras e peças incluídas', 'Compressão e condição para exposição',
    ],
  },
};

for (const [category, copy] of Object.entries(categoryCopy)) {
  const source = categoryDepth[category];
  const keys = [source.heading, ...source.paragraphs, ...source.signals];
  for (const locale of ['de', 'pt-br']) keys.forEach((key, i) => { localeRepair[locale][key] = copy[locale][i]; });
}

const entries = [
  ['20 July 2026.', '20. Juli 2026.', '20 de julho de 2026.'],
  ['22 July 2026', '22. Juli 2026', '22 de julho de 2026'],
  ['22 Jul', '22. Juli', '22 jul.'], ['23 Jul', '23. Juli', '23 jul.'], ['25 Jul', '25. Juli', '25 jul.'],
  ['Hubbuy Sheet · Independent guide', 'Hubbuy Sheet · Unabhängiger Leitfaden', 'Hubbuy Sheet · Guia independente'],
  ['Not the official Hubbuy website', 'Nicht die offizielle Hubbuy-Website', 'Não é o site oficial do Hubbuy'],
  ['© 2026 Hubbuy Sheet. Independent editorial discovery guide.', '© 2026 Hubbuy Sheet. Unabhängiger redaktioneller Einkaufsleitfaden.', '© 2026 Hubbuy Sheet. Guia editorial independente para encontrar produtos.'],
  ['HUBBUY SPREADSHEET', 'HUBBUY-PRODUKTLISTE', 'PLANILHA HUBBUY'],
  ['All product references', 'Alle Produktreferenzen', 'Todas as referências de produtos'],
  ['Destination catalog', 'Verlinkter Katalog', 'Catálogo de destino'],
  ['How to review this category', 'So prüfst du diese Kategorie', 'Como avaliar esta categoria'],
  ['Keep each shortlist specific.', 'Halte jede Vorauswahl konkret.', 'Mantenha cada seleção específica.'],
  ['Open the category QC checklist', 'QC-Checkliste der Kategorie öffnen', 'Abrir checklist de QC da categoria'],
  ['Open the parcel checklist', 'Paket-Checkliste öffnen', 'Abrir checklist do pacote'],
  ['Hubbuy product-link troubleshooting guide', 'Leitfaden bei Problemen mit Hubbuy-Produktlinks', 'guia para resolver problemas com links de produtos no Hubbuy'],
  ['If the marketplace page opens but Hubbuy imports the wrong item—or does not import it at all—use the', 'Wenn sich die Marktplatzseite öffnet, Hubbuy aber den falschen Artikel oder gar keinen Artikel importiert, lies den', 'Se a página do marketplace abrir, mas o Hubbuy importar o item errado ou não importar nenhum item, consulte o'],
  ['before entering the order manually.', 'bevor du die Bestellung manuell eingibst.', 'antes de preencher o pedido manualmente.'],
  ['Labels:', 'Etiketten:', 'Etiquetas:'],
  ['QC Images', 'QC-Bilder', 'Fotos de QC'],
  ['Research evidence · checked', 'Recherchegrundlage · geprüft', 'Fontes da pesquisa · verificadas'],
  ['Verified against the official Hubbuy homepage on', 'Mit der offiziellen Hubbuy-Startseite abgeglichen am', 'Conferido com a página inicial oficial do Hubbuy em'],
  ['Practical checklists are independent editorial guidance; live account terms remain the current source.', 'Die praktischen Checklisten sind unabhängige redaktionelle Hinweise; maßgeblich bleiben die aktuellen Bedingungen in deinem Konto.', 'Os checklists são orientações editoriais independentes; as condições atuais da conta continuam sendo a referência.'],
  ['That sequence shows where each decision belongs. A seller price is not a delivered price, a paid product is not yet an international parcel, and a warehouse photo is the checkpoint between those moments. The navigation also exposes separate entries for a shipping-cost estimate, forwarding and “Fill & Buy.”', 'Diese Reihenfolge zeigt, wann welche Entscheidung ansteht. Der Verkäuferpreis entspricht nicht den Gesamtkosten bis zur Lieferung, ein bezahlter Artikel ist noch kein internationales Paket, und das Lagerfoto bildet den Kontrollpunkt dazwischen. Die Navigation bietet außerdem eigene Einträge für eine Versandkostenschätzung, Weiterleitung und „Fill & Buy“.', 'Essa sequência mostra em que etapa cada decisão acontece. O preço do vendedor não é o custo entregue, um produto pago ainda não é um pacote internacional, e a foto do armazém é o ponto de conferência entre esses momentos. A navegação também oferece entradas separadas para estimativa de frete, encaminhamento e “Fill & Buy”.'],
  ['This independent guide was checked against the public Hubbuy homepage on 22 July 2026. It does not accept orders or payments. Where the public page does not provide a number or rule, this article does not invent one.', 'Dieser unabhängige Leitfaden wurde am 22. Juli 2026 mit der öffentlich zugänglichen Hubbuy-Startseite abgeglichen. Er nimmt keine Bestellungen oder Zahlungen an. Wo die öffentliche Seite keine Zahl oder Regel nennt, erfindet dieser Artikel keine.', 'Este guia independente foi conferido com a página inicial pública do Hubbuy em 22 de julho de 2026. Ele não recebe pedidos nem pagamentos. Quando a página pública não informa um valor ou uma regra, este artigo não os inventa.'],
  ['Reference ¥', 'Referenz ¥', 'Referência ¥'], ['approx.', 'ca.', 'aprox.'],
  ['Jacket', 'Jacke', 'Jaqueta'], ['Watch', 'Uhr', 'Relógio'], ['Timing', 'Zeitplanung', 'Prazos'], ['Match', 'Treffer', 'Correspondência'],
  ['Hubbuy Sheet Editorial', 'Hubbuy-Sheet-Redaktion', 'Redação Hubbuy Sheet'],
  ['Breadcrumb', 'Brotkrumennavigation', 'Caminho de navegação'],
  ['Example warehouse inventory ledger', 'Beispiel einer Lagerbestandsübersicht', 'Exemplo de registro de estoque no armazém'],
  ['Search by image', 'Mit Bild suchen', 'Buscar por imagem'],
  ['Hubbuy spreadsheet,Hubbuy finds,Hubbuy shoes spreadsheet,Hubbuy clothing spreadsheet,Hubbuy QC photos,how to buy on Hubbuy', 'Hubbuy-Produktliste,Hubbuy-Funde,Hubbuy-Schuhliste,Hubbuy-Kleidungsliste,Hubbuy-QC-Fotos,bei Hubbuy einkaufen', 'planilha Hubbuy,achados Hubbuy,planilha de calçados Hubbuy,planilha de roupas Hubbuy,fotos QC Hubbuy,como comprar no Hubbuy'],
  ['Hoodies', 'Kapuzenpullover', 'Moletons'], ['Tops', 'Oberteile', 'Blusas'], ['T-Shirts', 'T-Shirts', 'Camisetas'], ['Legal', 'Rechtliches', 'Informações legais'],
  ['link.', 'Link.', 'link.'],
];
entries.forEach(([source, de, pt]) => add(source, de, pt));

const productNames = [
  ['Acne Studios Longsleeve', 'Acne Studios Langarmshirt', 'Camiseta de manga longa Acne Studios'],
  ['Adidas Bag', 'Adidas Tasche', 'Bolsa Adidas'],
  ['Adidas Futurecraft 4D Running Shoes - Innovative Tech Sneakers', 'Adidas Futurecraft 4D Laufschuhe – Sneaker mit innovativer Technik', 'Tênis de corrida Adidas Futurecraft 4D – tecnologia inovadora'],
  ['Akimbo Layton Jacket (Zip up Hoodie', 'Akimbo Layton Jacke (Kapuzenjacke mit Reißverschluss)', 'Jaqueta Akimbo Layton (moletom com capuz e zíper)'],
  ['Apple Watch ULTRA2 watch', 'Apple Watch ULTRA2 Uhr', 'Relógio Apple Watch ULTRA2'],
  ['BZ20-M Color-Block Puffer Jacket [18 styles]', 'BZ20-M Steppjacke in Kontrastfarben [18 Varianten]', 'Jaqueta acolchoada BZ20-M em blocos de cores [18 modelos]'],
  ['Balenciaga Puffer', 'Balenciaga Steppjacke', 'Jaqueta acolchoada Balenciaga'],
  ['Black 8 letter T-shirt (2 styles)', 'T-Shirt mit „Black 8“-Schriftzug (2 Varianten)', 'Camiseta com inscrição Black 8 (2 modelos)'],
  ['Boss Polo Shirt / Boss Shorts / Zipper Sweatshirt / Hoodie', 'Boss Poloshirt / Shorts / Sweatjacke mit Reißverschluss / Kapuzenpullover', 'Polo Boss / shorts Boss / moletom com zíper / moletom com capuz'],
  ['Burberry Shirt (10+ styles)', 'Burberry Hemd (über 10 Varianten)', 'Camisa Burberry (mais de 10 modelos)'],
  ['CK Calvin Klein T-shirt TEE (9+ styles)', 'CK Calvin Klein T-Shirt (über 9 Varianten)', 'Camiseta CK Calvin Klein (mais de 9 modelos)'],
  ['Celine Coat', 'Celine Mantel', 'Casaco Celine'],
  ['Denim Tears Cotton Bloom Sweatshirt [8 styles]', 'Denim Tears Cotton Bloom Sweatshirt [8 Varianten]', 'Moletom Denim Tears Cotton Bloom [8 modelos]'],
  ['Dior 1947 T-Shirt [39 styles]', 'Dior 1947 T-Shirt [39 Varianten]', 'Camiseta Dior 1947 [39 modelos]'],
  ['Dior Sweater', 'Dior Pullover', 'Suéter Dior'],
  ['Dragon Ball Z Action Figures [32 styles]', 'Dragon Ball Z Actionfiguren [32 Varianten]', 'Figuras de ação Dragon Ball Z [32 modelos]'],
  ['EVISU Fashion T-shirts Shirts (40 CP)', 'EVISU T-Shirts und Hemden (40 CP)', 'Camisetas e camisas EVISU (40 CP)'],
  ['Electronic Watch S8 (2 CP)', 'Elektronische Uhr S8 (2 CP)', 'Relógio eletrônico S8 (2 CP)'],
  ['HOKA One One Speedgoat 5 Trail Running Shoes', 'HOKA One One Speedgoat 5 Trail-Laufschuhe', 'Tênis de corrida em trilha HOKA One One Speedgoat 5'],
  ['KAWS toy', 'KAWS Spielzeugfigur', 'Brinquedo KAWS'],
  ['Keychain', 'Schlüsselanhänger', 'Chaveiro'],
  ['LV smart watch', 'LV Smartwatch', 'Relógio inteligente LV'],
  ['Labubu Coke Pendant', 'Labubu Coke Anhänger', 'Pingente Labubu Coke'],
  ['Labubu Widgets', 'Labubu Accessoires', 'Acessórios Labubu'],
  ['Louis Vuitton Bag', 'Louis Vuitton Tasche', 'Bolsa Louis Vuitton'],
  ['Louis Vuitton Jacket', 'Louis Vuitton Jacke', 'Jaqueta Louis Vuitton'],
  ['Louis Vuitton Slides', 'Louis Vuitton Badesandalen', 'Chinelos slide Louis Vuitton'],
  ['Louis Vuitton Tee', 'Louis Vuitton T-Shirt', 'Camiseta Louis Vuitton'],
  ['MARSHALL SPEAKER', 'MARSHALL LAUTSPRECHER', 'CAIXA DE SOM MARSHALL'],
  ['Maison Margiela Graphic Print Sweatshirt [28 styles]', 'Maison Margiela Sweatshirt mit Grafikdruck [28 Varianten]', 'Moletom Maison Margiela com estampa gráfica [28 modelos]'],
  ['Maison Margiela Hoodie', 'Maison Margiela Kapuzenpullover', 'Moletom com capuz Maison Margiela'],
  ['Maison Margiela Longsleeve', 'Maison Margiela Langarmshirt', 'Camiseta de manga longa Maison Margiela'],
  ['Maison Margiela Replica Sweatshirt [29 styles]', 'Maison Margiela Replica Sweatshirt [29 Varianten]', 'Moletom Maison Margiela Replica [29 modelos]'],
  ['Maison Margiela Tabi Heart Number Print Sweatshirt [40 styles]', 'Maison Margiela Tabi Sweatshirt mit Herz- und Zahlendruck [40 Varianten]', 'Moletom Maison Margiela Tabi com estampa de coração e números [40 modelos]'],
  ["Men's Premium Knit Cardigan with Horn Buttons - Etonic", 'Hochwertige Herren-Strickjacke mit Hornknöpfen – Etonic', 'Cardigã masculino de tricô premium com botões de chifre – Etonic'],
  ['NBA NIKE Lakers training T-shirt tee (40+)', 'NBA NIKE Lakers Trainings-T-Shirt (40+)', 'Camiseta de treino NBA NIKE Lakers (40+)'],
  ['NEW ERA shirt (28 styles)', 'NEW ERA Shirt (28 Varianten)', 'Camiseta NEW ERA (28 modelos)'],
  ['New Balance 1906/740 shoes', 'New Balance 1906/740 Schuhe', 'Calçados New Balance 1906/740'],
  ['Nike Bag', 'Nike Tasche', 'Bolsa Nike'], ['Nike Elite Backpack', 'Nike Elite Rucksack', 'Mochila Nike Elite'],
  ['ONE PIECE Figures', 'ONE PIECE Figuren', 'Figuras ONE PIECE'],
  ['Off-White Tee', 'Off-White T-Shirt', 'Camiseta Off-White'],
  ['Polo Ralph Lauren Long Sleeve', 'Polo Ralph Lauren Langarmshirt', 'Peça de manga longa Polo Ralph Lauren'],
  ['Ralph Lauren Longsleeve', 'Ralph Lauren Langarmshirt', 'Camiseta de manga longa Ralph Lauren'],
  ['Razer Seiren Mini Ultra-Compact Condenser Microphone (4 styles)', 'Razer Seiren Mini ultrakompaktes Kondensatormikrofon (4 Varianten)', 'Microfone condensador ultracompacto Razer Seiren Mini (4 modelos)'],
  ['Saint Vanity Windbreaker', 'Saint Vanity Windjacke', 'Jaqueta corta-vento Saint Vanity'],
  ['Stitch series blind box trendy figure and plush toy', 'Stitch Sammelfigur und Plüschtier in Überraschungsbox', 'Figura e pelúcia da série Stitch em caixa-surpresa'],
  ['Stussy Diamond Logo Jacket [3 styles]', 'Stussy Jacke mit Diamond-Logo [3 Varianten]', 'Jaqueta Stussy com logo Diamond [3 modelos]'],
  ['Stussy Spray Can Hoodie [33 styles]', 'Stussy Spray Can Kapuzenpullover [33 Varianten]', 'Moletom com capuz Stussy Spray Can [33 modelos]'],
  ['Supreme Jacket', 'Supreme Jacke', 'Jaqueta Supreme'], ['Syna World Mask', 'Syna World Maske', 'Máscara Syna World'],
  ['Versace Shirts Polo T-Shirts (15 styles)', 'Versace Hemden, Poloshirts und T-Shirts (15 Varianten)', 'Camisas, polos e camisetas Versace (15 modelos)'],
  ['Winter hooded down jacket', 'Winter-Daunenjacke mit Kapuze', 'Jaqueta de inverno com capuz e enchimento de plumas'],
  ['apple16 PRO MAX (8 styles)', 'apple16 PRO MAX (8 Varianten)', 'apple16 PRO MAX (8 modelos)'],
  ['bluetooth headset', 'Bluetooth-Headset', 'Fone de ouvido Bluetooth'], ['carhartt wallet', 'Carhartt Geldbörse', 'Carteira Carhartt'],
  ['collectible figures', 'Sammelfiguren', 'Figuras colecionáveis'],
];
productNames.forEach(([source, de, pt]) => add(source, de, pt));

// Exact accessible labels are generated from the same catalogue names used by ProductCard.
for (const product of products) {
  const name = product.name;
  const de = localeRepair.de[name] || name;
  const pt = localeRepair['pt-br'][name] || name;
  for (const verb of ['Open', 'View']) {
    add(`${verb} ${name} product photos`, `Produktfotos von ${de} ansehen`, `Ver fotos de ${pt}`);
  }
}
