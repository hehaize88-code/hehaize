import type { Locale } from "./translations";

export type CardCopy = {
  title: string;
  body: string;
  bullets?: string[];
};

export type SectionCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cards: CardCopy[];
};

type HowCopy = {
  articleEyebrow: string;
  articleTitle: string;
  articleBody: string;
  articleCta: string;
  factEyebrow: string;
  factTitle: string;
  facts: string[];
  steps: CardCopy[];
  errorEyebrow: string;
  errorTitle: string;
  errorIntro: string;
  errors: CardCopy[];
};

type CategoryCopy = SectionCopy & {
  decisionEyebrow: string;
  decisionTitle: string;
  decisionIntro: string;
  decisions: CardCopy[];
};

type GuideDepthCopy = {
  products: SectionCopy;
  categories: CategoryCopy;
  how: HowCopy;
  qc: SectionCopy;
  shipping: SectionCopy;
  articles: SectionCopy;
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    points: string[];
  };
  articleSummaries: Record<string, string>;
};

export const guideDepthCopy: Record<Locale, GuideDepthCopy> = {
  en: {
    products: {
      eyebrow: "A repeatable product-screening method",
      title: "Filter a result before it becomes an order",
      intro:
        "A useful product page should reduce uncertainty. Work from the exact search term to a short list, then verify the live listing and preserve the option you intend to submit.",
      cards: [
        {
          title: "Start narrow, then broaden once",
          body:
            "Search the stable part of the name first: product type, model or silhouette. Add one useful qualifier such as material, color or version only when the first result set is too broad. Repeatedly changing several words at once makes it difficult to tell whether a better result came from the model name or from an unrelated keyword.",
          bullets: [
            "Try the model or product type first",
            "Add one visual or material qualifier",
            "Use a category only when the exact term is unknown",
          ],
        },
        {
          title: "Compare options, not hero images",
          body:
            "One marketplace page can group different colors, bundles, qualities or accessories under the same cover image. Open the option selector, note which choice changes the price and confirm that the selected row describes the item shown in your saved order note. A low headline price may belong to a deposit or accessory rather than the main product.",
        },
        {
          title: "Treat every catalog check as dated",
          body:
            "The matched image and destination link are reviewed together, but seller stock, variants, price and delivery terms remain live information. Re-open the destination immediately before ordering. If the page now shows a different product, an unavailable option or a changed condition, the current page overrides the older catalog card.",
        },
        {
          title: "Save the decision-changing details",
          body:
            "Keep the source address, seller name when visible, selected size, color, version, quantity, option code and any seller note that affects what will be sent. A dated screenshot helps when a listing changes. This small record gives the warehouse photographs and any later question a concrete reference instead of relying on memory.",
        },
      ],
    },
    categories: {
      eyebrow: "Category-specific checks",
      title: "Use a different filter for each product type",
      intro:
        "A category is a research shortcut, not a quality label. The useful questions change with the product, so the shortlist should be built around fit, visible QC evidence, return limits and shipping risk.",
      cards: [
        {
          title: "Shoes: measurement beats the printed size",
          body:
            "Record the selected size system and compare an insole or outsole measurement only when the measurement method is clear. Review the pair together for model, color, sole shape, visible glue marks and obvious asymmetry. Shoe boxes can add parcel volume, so decide whether the box is important before packing.",
        },
        {
          title: "Hoodies and sweaters: check the actual garment",
          body:
            "Use a garment you own as the reference and measure it flat in the same places shown by the seller. Confirm the selected color, size label, print or embroidery placement, cuffs, hem and visible marks. A size letter alone does not establish fit, and lighting can make dark colors appear different.",
        },
        {
          title: "Jackets: define the version and included parts",
          body:
            "Jacket listings often vary by lining, season, detachable pieces or material. Save the exact option and note whether a hood, belt, liner or accessory should be included. For QC, compare closures, pockets, major panels and the back as well as the front promotional view.",
        },
        {
          title: "Accessories: match the check to the item",
          body:
            "For headwear, start with dimensions and visible shape; for eyewear, check obvious frame condition and included pieces; for watches or electronics, general photographs cannot establish battery health, electrical safety or long-term function. Do not infer authenticity or safety from a spreadsheet label or warehouse image.",
        },
      ],
      decisionEyebrow: "Before leaving the category page",
      decisionTitle: "Make three decisions explicit",
      decisionIntro:
        "A good shortlist explains why an item remains and what evidence is still missing. These checks prevent a broad category browse from turning into an ambiguous order.",
      decisions: [
        {
          title: "Fit evidence",
          body:
            "Identify the measurement, label or product dimension that can actually change your choice, and save the seller's current chart when one is provided.",
        },
        {
          title: "QC evidence",
          body:
            "Write down the visible angle, label, accessory or condition detail that must appear in the warehouse record before you accept the item.",
        },
        {
          title: "Return risk",
          body:
            "Check the live seller and platform terms early. Custom, restricted or time-sensitive items may leave less room to correct a mistaken option.",
        },
      ],
    },
    how: {
      articleEyebrow: "Complete beginner workflow",
      articleTitle: "Follow one order from product link to warehouse decision",
      articleBody:
        "The long-form guide separates the live listing, submitted order, purchasing stage, seller fulfillment and warehouse evidence. Use it when you need the transaction sequence rather than a broad discovery, QC or shipping guide.",
      articleCta: "Read how to buy from LoloBuy",
      factEyebrow: "Official workflow facts · checked 28 July 2026",
      factTitle: "What the public LoloBuy page confirms",
      facts: [
        "LoloBuy says a shopper can paste a product link to place an order and that it assists with purchases from Chinese online and offline channels.",
        "After a merchant sends goods to the warehouse, the public page describes quality inspection, photographs and 90 days of free storage.",
        "The public flow also says stored products can be selected and submitted as one parcel for global shipping. Live account terms still govern each order.",
      ],
      steps: [
        {
          title: "Find the exact source",
          body:
            "Use a specific search or category to reach the closest match. Open the destination page and confirm that its title, image and available options describe the product you intended to find.",
        },
        {
          title: "Read the live listing",
          body:
            "Check seller information, option selectors, current price, domestic delivery and notes about pre-orders, bundles or return limits. The live page—not the spreadsheet thumbnail—is the purchase record.",
        },
        {
          title: "Write a one-line order brief",
          body:
            "Record the source, exact color, size, version, quantity and any instruction that changes what should be purchased. If you cannot describe the selected option unambiguously, pause before payment.",
        },
        {
          title: "Submit the product link",
          body:
            "Paste the original address into the purchasing flow and compare the imported details with your saved brief. Resolve an incorrect price, missing option or unclear seller note before the purchase is placed.",
        },
        {
          title: "Review the warehouse arrival",
          body:
            "When the item reaches the warehouse, compare its identity, selected option, quantity and visible condition with the order record. Ask for focused evidence only when one decision-changing point remains unclear.",
        },
        {
          title: "Choose pass, question or action",
          body:
            "Accept when the visible evidence matches, ask when a specific angle or measurement can resolve uncertainty, and use the current order options promptly when a clear mismatch changes the decision.",
        },
        {
          title: "Build and submit the parcel",
          body:
            "Select accepted warehouse items, then compare eligible routes using the packed weight, dimensions, restrictions and protection choices. Save the final parcel summary and tracking record.",
        },
      ],
      errorEyebrow: "Common failure examples",
      errorTitle: "Where a seemingly simple order goes wrong",
      errorIntro:
        "Most avoidable problems begin before international shipping. These examples show the missing evidence and the safer correction.",
      errors: [
        {
          title: "The cheapest option was not the product",
          body:
            "A listing showed a low starting price, but that row described an accessory or deposit. Correction: open every selector, confirm the price after choosing the exact variant and save that selected row.",
        },
        {
          title: "A size letter replaced measurements",
          body:
            "The order note said only “L,” even though the seller chart used different dimensions. Correction: record the chosen size system and compare a flat garment measured in the same locations.",
        },
        {
          title: "QC was compared with memory",
          body:
            "The warehouse image looked different from a social post, but the original listing and option were no longer available. Correction: save the dated source page and selected option before submitting the link.",
        },
        {
          title: "Shipping was estimated from item weight",
          body:
            "A bulky parcel cost more than an early scale-only guess. Correction: wait for packed dimensions, check the route's billing method and compare consolidation with a sensible split.",
        },
      ],
    },
    qc: {
      eyebrow: "Product-specific QC evidence",
      title: "Change the checklist when the product changes",
      intro:
        "Identity, option and visible condition come first for every order. After that, ask only for evidence that a warehouse photograph or measurement can reasonably provide.",
      cards: [
        {
          title: "Footwear",
          body:
            "Review both shoes together, visible size labels, color, sole shape, obvious marks and major asymmetry. If length matters, request one clearly positioned insole or outsole measurement and compare it with a reference measured the same way.",
        },
        {
          title: "Apparel",
          body:
            "Confirm the selected size and color, then check front, back, print or embroidery placement, closures and visible stains or tears. Flat measurements can help only when the tape placement is visible and consistent.",
        },
        {
          title: "Bags and accessories",
          body:
            "Check the overall model, color, dimensions, included strap or removable pieces, closures and visible hardware condition. General images cannot prove hidden construction, material composition or authenticity.",
        },
        {
          title: "Electronics and safety-sensitive items",
          body:
            "A photograph may confirm model labels, obvious exterior damage and included pieces, but it cannot establish battery health, electrical safety, regulatory compliance or long-term performance. Use appropriate authorized evidence for those decisions.",
        },
      ],
    },
    shipping: {
      eyebrow: "A comparable route record",
      title: "Compare routes with the same parcel inputs",
      intro:
        "A route name or old per-kilogram quote is not enough. Record the current parcel data and compare only options that accept the destination and product mix.",
      cards: [
        {
          title: "Eligibility before headline price",
          body:
            "Confirm destination, accepted product types, actual and dimensional limits, maximum size and any battery, liquid, branded-item or restricted-goods rule shown for the live route. An ineligible cheap line is not a real alternative.",
        },
        {
          title: "Service terms beside the estimate",
          body:
            "Save the stated transit range, tracking coverage, billing method, compensation conditions and the point at which the quote can change. These terms often matter more than a small difference in the first visible price.",
        },
        {
          title: "Final parcel evidence",
          body:
            "Before payment, keep the packed weight, dimensions, selected protection, declared contents, destination address, chosen route and final quote in one record. After dispatch, add the tracking number and carrier events rather than relying on an earlier estimate.",
        },
      ],
    },
    articles: {
      eyebrow: "How to use this article library",
      title: "Choose the guide for the next decision",
      intro:
        "The article index follows the order of a real buying journey. Each guide is long enough to stand alone, but the strongest reading path begins with the product record and ends with packed parcel evidence.",
      cards: [
        {
          title: "Before ordering: preserve product context",
          body:
            "Start with the spreadsheet guide when you are still choosing a source or variant. It explains search terms, W2C links, option selectors, seller evidence and the short order record to save before a listing changes. The output should be one unambiguous product brief, not a folder of unexplained screenshots.",
        },
        {
          title: "At the warehouse: compare evidence",
          body:
            "Move to the QC guide when an arrival must be compared with the order. The sequence begins with identity, option and quantity before visible condition and product-specific details. It also defines what photographs cannot prove, so a decision is not built on authenticity, fit or safety assumptions.",
        },
        {
          title: "Before international payment: build the parcel",
          body:
            "Use the shipping guide only after accepted items and realistic packed data exist. It separates cost stages and shows how dimensions, restrictions, consolidation and protection affect the route comparison. The goal is a saved final parcel record, not a copied rate from someone else's shipment.",
        },
      ],
    },
    faq: {
      eyebrow: "How these answers are maintained",
      title: "Official facts, live variables and judgment calls are separated",
      intro:
        "The FAQ is not a list of fixed promises. Each answer is written according to the kind of evidence available, so a dated public statement is not confused with a current account quote or an individual customer report.",
      points: [
        "Official public workflow statements are dated and paraphrased without turning them into guarantees.",
        "Fees, photo options, routes, stock and seller terms are treated as live variables when no stable public rule is available.",
        "Risk, authenticity, fit and customs questions are answered with limits and verification steps rather than blanket claims.",
      ],
    },
    articleSummaries: {
      "how-to-use-lolobuy-spreadsheet":
        "Begin here when the spreadsheet is the first place you saw an item. The guide explains how to move from a broad find to an exact source page, record the selected variant, read option selectors and keep the seller decision separate from the purchasing service. It also shows why W2C links, screenshots and dated order notes matter when a marketplace listing changes.",
      "lolobuy-qc-photos-guide":
        "Read this after an item reaches the warehouse or before ordering if you want to define your QC evidence in advance. It provides a repeatable sequence for identity, variant, measurements and visible condition, followed by product-specific limits. The guide does not treat a flattering photo as proof of fit, authenticity, hidden construction or durability.",
      "lolobuy-shipping-cost-guide":
        "Use this once accepted items are ready for parcel planning. The guide separates product cost, domestic delivery and international freight, then explains actual versus volumetric weight, consolidation, packing and route restrictions. Worked examples are clearly labeled so an illustrative divisor or parcel does not look like a guaranteed LoloBuy rate.",
      "how-to-buy-from-lolobuy":
        "Start here when you have a live Chinese product link and want to place a first order. The guide separates the listing, submitted order, purchasing stage, seller fulfillment and warehouse arrival into five checkpoints, then shows how to record evidence and make a pass, question or action decision before parcel planning.",
      "lolobuy-hoodie-size-guide":
        "Use this before choosing a hoodie option or while reviewing its warehouse arrival. It replaces letter-size conversion with flat garment measurements, shows how to compare seller charts measured in the same positions, and defines the focused QC evidence that can support a fit decision without pretending photos guarantee fit.",
      "lolobuy-stitching-finish-qc-checklist":
        "Use this after confirming the correct item and before approving shipment. It orders the review by function: critical joins first, then matched sides, edges, applied decoration and cosmetic cleanup, with a clear pass, focused-question or material-mismatch decision.",
      "lolobuy-alignment-symmetry-print-placement-qc":
        "Use this when a print, patch, panel or matched feature looks off-center. It tests camera perspective, folds and uneven shaping with product-based reference lines before choosing pass, one focused view or a documented placement mismatch.",
    },
  },
  es: {
    products: {
      eyebrow: "Método repetible para filtrar productos",
      title: "Filtra un resultado antes de convertirlo en pedido",
      intro:
        "Una página de producto útil debe reducir la incertidumbre. Parte del término exacto, crea una lista corta, verifica el anuncio vigente y conserva la opción que quieres enviar.",
      cards: [
        {
          title: "Empieza con precisión y amplía una sola vez",
          body:
            "Busca primero la parte estable del nombre: tipo de producto, modelo o silueta. Añade un único dato útil, como material, color o versión, solo si los resultados son demasiado amplios. Cambiar varias palabras a la vez impide saber qué término produjo un resultado mejor.",
          bullets: [
            "Prueba primero el modelo o tipo de producto",
            "Añade un solo rasgo visual o material",
            "Usa la categoría cuando no conozcas el término exacto",
          ],
        },
        {
          title: "Compara opciones, no imágenes principales",
          body:
            "Un mismo anuncio puede agrupar colores, paquetes, calidades o accesorios bajo una sola portada. Abre el selector, observa qué opción cambia el precio y confirma que la fila elegida corresponde a tu nota de pedido. El precio inicial más bajo puede pertenecer a un depósito o accesorio.",
        },
        {
          title: "Considera fechada cada revisión del catálogo",
          body:
            "La imagen y el enlace se revisan juntos, pero el stock, las variantes, el precio y la entrega siguen siendo datos en vivo. Abre de nuevo el destino justo antes de pedir. Si el producto, la opción o las condiciones han cambiado, prevalece la página actual.",
        },
        {
          title: "Guarda los detalles que cambian la decisión",
          body:
            "Conserva la dirección de origen, el vendedor si aparece, talla, color, versión, cantidad, código de opción y cualquier nota relevante. Una captura fechada ayuda cuando el anuncio cambia y da a las fotos de almacén una referencia concreta.",
        },
      ],
    },
    categories: {
      eyebrow: "Controles según la categoría",
      title: "Usa un filtro distinto para cada tipo de producto",
      intro:
        "La categoría es un atajo de investigación, no una etiqueta de calidad. Las preguntas cambian según el producto: ajuste, evidencia QC, límites de devolución y riesgo de envío.",
      cards: [
        {
          title: "Calzado: la medida vale más que la talla impresa",
          body:
            "Registra el sistema de tallas y compara plantilla o suela solo si el método está claro. Revisa el par completo: modelo, color, forma de la suela, pegamento visible y asimetría evidente. Decide antes del embalaje si la caja es importante, porque aumenta el volumen.",
        },
        {
          title: "Sudaderas y jerséis: revisa la prenda real",
          body:
            "Usa una prenda propia como referencia y mídela plana en los mismos puntos del vendedor. Confirma color, etiqueta, estampado o bordado, puños, bajo y marcas visibles. Una letra de talla no garantiza el ajuste y la luz puede alterar los colores oscuros.",
        },
        {
          title: "Chaquetas: define la versión y las piezas",
          body:
            "Los anuncios pueden variar por forro, temporada, piezas desmontables o material. Guarda la opción exacta e indica si incluye capucha, cinturón, forro o accesorio. En QC compara cierres, bolsillos, paneles principales y espalda, no solo la vista frontal.",
        },
        {
          title: "Accesorios: adapta el control al objeto",
          body:
            "En gorras y sombreros empieza por medidas y forma; en gafas, por estado del marco y piezas incluidas; en relojes o electrónica, las fotos generales no prueban batería, seguridad ni funcionamiento duradero. Tampoco prueban autenticidad.",
        },
      ],
      decisionEyebrow: "Antes de abandonar la categoría",
      decisionTitle: "Haz explícitas tres decisiones",
      decisionIntro:
        "Una buena lista corta explica por qué queda un artículo y qué prueba falta. Así una búsqueda amplia no se convierte en un pedido ambiguo.",
      decisions: [
        {
          title: "Prueba de ajuste",
          body:
            "Identifica la medida, etiqueta o dimensión que puede cambiar tu elección y guarda la tabla vigente del vendedor cuando exista.",
        },
        {
          title: "Prueba de QC",
          body:
            "Anota el ángulo, etiqueta, accesorio o detalle de estado que debe aparecer en el registro del almacén antes de aceptar.",
        },
        {
          title: "Riesgo de devolución",
          body:
            "Revisa pronto las condiciones del vendedor y la plataforma. Artículos personalizados o restringidos pueden dejar menos margen para corregir una opción.",
        },
      ],
    },
    how: {
      articleEyebrow: "Flujo completo para principiantes",
      articleTitle: "Sigue un pedido desde el enlace hasta la decisión en almacén",
      articleBody:
        "La guía extensa separa anuncio activo, pedido enviado, compra, despacho del vendedor y pruebas del almacén. Úsala cuando necesites la secuencia de la transacción y no una guía general de búsqueda, QC o envío.",
      articleCta: "Leer cómo comprar con LoloBuy",
      factEyebrow: "Datos oficiales del proceso · verificados el 28 de julio de 2026",
      factTitle: "Lo que confirma la página pública de LoloBuy",
      facts: [
        "LoloBuy indica que se puede pegar un enlace de producto para pedir y que ayuda a comprar en canales chinos en línea y fuera de línea.",
        "Tras el envío del vendedor al almacén, la página pública describe inspección, fotografías y 90 días de almacenamiento gratuito.",
        "También indica que los productos almacenados pueden enviarse como un solo paquete mediante envío global. Las condiciones vigentes rigen cada pedido.",
      ],
      steps: [
        {
          title: "Encuentra la fuente exacta",
          body:
            "Usa una búsqueda precisa o una categoría para llegar a la mejor coincidencia. Abre el destino y confirma que título, imagen y opciones describen el producto buscado.",
        },
        {
          title: "Lee el anuncio vigente",
          body:
            "Comprueba vendedor, opciones, precio actual, entrega nacional y notas sobre preventas, paquetes o devoluciones. La página en vivo, no la miniatura, es el registro de compra.",
        },
        {
          title: "Escribe una nota de pedido",
          body:
            "Registra origen, color, talla, versión, cantidad e instrucciones que cambien la compra. Si no puedes describir la opción sin ambigüedad, detente antes de pagar.",
        },
        {
          title: "Envía el enlace del producto",
          body:
            "Pega la dirección original y compara los datos importados con tu nota. Resuelve un precio incorrecto, una opción ausente o una condición poco clara antes de comprar.",
        },
        {
          title: "Revisa la llegada al almacén",
          body:
            "Compara identidad, opción, cantidad y estado visible con el registro. Pide una prueba concreta solo cuando quede una duda capaz de cambiar la decisión.",
        },
        {
          title: "Elige aceptar, preguntar o actuar",
          body:
            "Acepta si la evidencia coincide, pregunta si un ángulo o medida resuelve la duda y usa pronto las opciones vigentes cuando exista una diferencia clara.",
        },
        {
          title: "Prepara y envía el paquete",
          body:
            "Selecciona los artículos aceptados y compara rutas con peso, dimensiones, restricciones y protección reales. Guarda el resumen final y el seguimiento.",
        },
      ],
      errorEyebrow: "Ejemplos de errores frecuentes",
      errorTitle: "Dónde falla un pedido aparentemente sencillo",
      errorIntro:
        "La mayoría de problemas evitables comienza antes del envío internacional. Estos ejemplos muestran la prueba que faltaba y la corrección.",
      errors: [
        {
          title: "La opción más barata no era el producto",
          body:
            "El precio inicial correspondía a un accesorio o depósito. Corrección: abre todos los selectores, confirma el precio de la variante exacta y guarda esa fila.",
        },
        {
          title: "Una letra sustituyó a las medidas",
          body:
            "La nota decía solo “L” aunque la tabla usaba otras dimensiones. Corrección: registra el sistema y compara una prenda plana medida en los mismos puntos.",
        },
        {
          title: "El QC se comparó con la memoria",
          body:
            "La foto parecía distinta, pero ya no existía el anuncio original. Corrección: guarda la página fechada y la opción elegida antes de enviar el enlace.",
        },
        {
          title: "El envío se calculó con el peso del artículo",
          body:
            "Un paquete voluminoso superó la estimación inicial. Corrección: espera dimensiones embaladas, revisa la facturación de la ruta y compara consolidar con dividir.",
        },
      ],
    },
    qc: {
      eyebrow: "Pruebas QC según el producto",
      title: "Cambia la lista cuando cambia el producto",
      intro:
        "Identidad, opción y estado visible son el comienzo. Después pide únicamente pruebas que una foto o medida de almacén pueda aportar de forma razonable.",
      cards: [
        {
          title: "Calzado",
          body:
            "Revisa ambos zapatos, etiquetas visibles, color, forma de la suela, marcas y asimetría. Si importa la longitud, pide una medida bien colocada y compárala con una referencia tomada igual.",
        },
        {
          title: "Ropa",
          body:
            "Confirma talla y color; revisa frente, espalda, estampado, cierres y daños visibles. Las medidas planas ayudan solo cuando se ve la posición de la cinta.",
        },
        {
          title: "Bolsos y accesorios",
          body:
            "Comprueba modelo, color, dimensiones, correa o piezas desmontables, cierres y herrajes. Las fotos generales no prueban construcción oculta, composición ni autenticidad.",
        },
        {
          title: "Electrónica y artículos sensibles",
          body:
            "Una foto puede confirmar etiqueta, daños y piezas, pero no batería, seguridad eléctrica, conformidad ni duración. Usa pruebas autorizadas adecuadas para esas decisiones.",
        },
      ],
    },
    shipping: {
      eyebrow: "Registro comparable de rutas",
      title: "Compara rutas con los mismos datos",
      intro:
        "El nombre de una ruta o una tarifa antigua no bastan. Registra el paquete actual y compara solo opciones que acepten destino y contenido.",
      cards: [
        {
          title: "Elegibilidad antes que precio",
          body:
            "Confirma destino, productos aceptados, límites de peso real y dimensional, tamaño máximo y restricciones de baterías, líquidos, marcas u otros bienes. Una línea barata no elegible no es alternativa.",
        },
        {
          title: "Condiciones junto a la estimación",
          body:
            "Guarda plazo indicado, seguimiento, método de facturación, compensación y cuándo puede cambiar la cotización. Estas condiciones pueden importar más que una pequeña diferencia inicial.",
        },
        {
          title: "Prueba final del paquete",
          body:
            "Antes de pagar guarda peso, dimensiones, protección, contenido declarado, dirección, ruta y precio final. Tras el despacho, añade seguimiento y eventos reales.",
        },
      ],
    },
    articles: {
      eyebrow: "Cómo usar la biblioteca de artículos",
      title: "Elige la guía para la siguiente decisión",
      intro:
        "El índice sigue el orden real de compra. Cada guía funciona por sí sola, pero la mejor secuencia empieza con el registro del producto y termina con los datos del paquete.",
      cards: [
        {
          title: "Antes de pedir: conserva el contexto",
          body:
            "Empieza con la guía de la hoja para elegir fuente o variante. Trata búsquedas, enlaces W2C, selectores, pruebas del vendedor y la nota breve que debes guardar. El resultado debe ser una descripción inequívoca, no capturas sin explicación.",
        },
        {
          title: "En el almacén: compara pruebas",
          body:
            "Pasa a la guía QC al comparar la llegada con el pedido. Comienza por identidad, opción y cantidad; después estado y detalles. También aclara lo que las fotos no pueden probar sobre autenticidad, ajuste o seguridad.",
        },
        {
          title: "Antes del flete: prepara el paquete",
          body:
            "Usa la guía de envío con artículos aceptados y datos embalados reales. Separa costes y muestra cómo dimensiones, límites, consolidación y protección afectan la ruta. El objetivo es un registro final, no una tarifa copiada.",
        },
      ],
    },
    faq: {
      eyebrow: "Cómo se mantienen estas respuestas",
      title: "Separamos hechos oficiales, variables en vivo y juicios",
      intro:
        "La FAQ no es una lista de promesas fijas. Cada respuesta refleja el tipo de evidencia disponible para no confundir una declaración fechada con una cotización actual o un relato individual.",
      points: [
        "Las declaraciones públicas oficiales se fechan y parafrasean sin convertirlas en garantías.",
        "Tarifas, fotos, rutas, stock y condiciones se tratan como variables cuando no hay una regla pública estable.",
        "Riesgo, autenticidad, ajuste y aduanas se explican con límites y pasos de verificación.",
      ],
    },
    articleSummaries: {
      "how-to-use-lolobuy-spreadsheet":
        "Empieza aquí si viste el artículo por primera vez en la hoja. La guía muestra cómo pasar del hallazgo a la fuente exacta, guardar la variante y leer los selectores. También explica por qué los enlaces W2C, las capturas y las notas fechadas importan cuando cambia un anuncio.",
      "lolobuy-qc-photos-guide":
        "Lee esta guía cuando el artículo llegue al almacén o antes de pedir para definir las pruebas. Sigue una secuencia de identidad, variante, medidas y estado visible, con límites específicos. Una foto atractiva no prueba ajuste, autenticidad, construcción oculta ni duración.",
      "lolobuy-shipping-cost-guide":
        "Úsala cuando los artículos aceptados estén listos. Separa producto, entrega nacional y flete; explica peso real y volumétrico, consolidación, embalaje y restricciones. Los ejemplos están marcados para no parecer una tarifa garantizada.",
      "how-to-buy-from-lolobuy":
        "Empieza aquí con un enlace chino activo y un primer pedido. La guía separa anuncio, pedido enviado, compra, despacho del vendedor y llegada al almacén en cinco controles, y muestra cómo registrar pruebas antes de preparar el paquete.",
      "lolobuy-hoodie-size-guide":
        "Úsala antes de elegir una sudadera o al revisar su llegada al almacén. Sustituye la conversión por letras por medidas planas, compara tablas tomadas en los mismos puntos y define qué prueba QC puede apoyar la decisión sin prometer el ajuste.",
      "lolobuy-stitching-finish-qc-checklist":
        "Úsala después de confirmar el artículo y antes del envío. Prioriza uniones funcionales, lados equivalentes, bordes, decoración y limpieza cosmética, y termina con una decisión de aceptar, preguntar o documentar una diferencia.",
      "lolobuy-alignment-symmetry-print-placement-qc":
        "Úsala cuando un estampado, parche o panel parezca descentrado. Comprueba perspectiva, pliegues y forma con líneas propias del artículo antes de aceptar, pedir una vista o documentar una diferencia.",
    },
  },
  de: {
    products: {
      eyebrow: "Wiederholbare Produktprüfung",
      title: "Prüfe einen Treffer, bevor er zur Bestellung wird",
      intro:
        "Eine gute Produktseite verringert Unsicherheit. Beginne mit dem genauen Suchbegriff, erstelle eine kurze Auswahl, prüfe das aktuelle Angebot und sichere die gewünschte Variante.",
      cards: [
        {
          title: "Eng beginnen, einmal erweitern",
          body:
            "Suche zuerst den stabilen Namensteil: Produkttyp, Modell oder Form. Ergänze nur bei zu vielen Treffern ein Merkmal wie Material, Farbe oder Version. Werden mehrere Wörter gleichzeitig geändert, bleibt unklar, welcher Begriff das bessere Ergebnis gebracht hat.",
          bullets: [
            "Zuerst Modell oder Produkttyp suchen",
            "Ein visuelles oder materielles Merkmal ergänzen",
            "Kategorie nutzen, wenn der genaue Begriff fehlt",
          ],
        },
        {
          title: "Optionen statt Titelbilder vergleichen",
          body:
            "Ein Angebot kann Farben, Sets, Qualitäten oder Zubehör unter demselben Titelbild bündeln. Öffne alle Auswahlfelder, beachte Preisänderungen und prüfe, ob die gewählte Zeile zur Bestellnotiz passt. Der niedrigste Preis kann für eine Anzahlung oder Zubehör gelten.",
        },
        {
          title: "Jede Katalogprüfung hat ein Datum",
          body:
            "Bild und Ziel werden gemeinsam geprüft, doch Bestand, Varianten, Preis und Lieferbedingungen bleiben live. Öffne die Zielseite direkt vor der Bestellung erneut. Bei geändertem Produkt, fehlender Option oder neuen Bedingungen gilt die aktuelle Seite.",
        },
        {
          title: "Entscheidende Details sichern",
          body:
            "Speichere Quelladresse, sichtbaren Verkäufer, Größe, Farbe, Version, Menge, Optionscode und wichtige Hinweise. Ein datierter Screenshot hilft bei späteren Änderungen und gibt Lagerfotos eine konkrete Referenz.",
        },
      ],
    },
    categories: {
      eyebrow: "Prüfungen nach Kategorie",
      title: "Für jeden Produkttyp anders filtern",
      intro:
        "Eine Kategorie ist eine Recherchehilfe, kein Qualitätsurteil. Je nach Produkt zählen Passform, sichtbare QC-Belege, Rückgabelimits und Versandrisiko.",
      cards: [
        {
          title: "Schuhe: Maße sind wichtiger als Größenangaben",
          body:
            "Notiere das Größensystem und vergleiche Innen- oder Außensohle nur bei klarer Messmethode. Prüfe beide Schuhe auf Modell, Farbe, Sohlenform, Klebespuren und deutliche Asymmetrie. Entscheide vor dem Packen, ob der Karton wichtig ist.",
        },
        {
          title: "Hoodies und Pullover: das echte Kleidungsstück prüfen",
          body:
            "Nutze ein eigenes Kleidungsstück als Referenz und miss es flach an denselben Stellen. Prüfe Farbe, Etikett, Druck oder Stickerei, Bündchen, Saum und sichtbare Flecken. Ein Größenbuchstabe garantiert keine Passform.",
        },
        {
          title: "Jacken: Version und Teile festlegen",
          body:
            "Angebote unterscheiden sich bei Futter, Saison, abnehmbaren Teilen oder Material. Sichere die genaue Option und notiere Kapuze, Gürtel, Futter oder Zubehör. Vergleiche Verschlüsse, Taschen, Hauptflächen und Rückseite.",
        },
        {
          title: "Zubehör: Prüfung an den Gegenstand anpassen",
          body:
            "Bei Kopfbedeckungen zählen Maße und Form, bei Brillen Rahmenzustand und Teile. Allgemeine Fotos von Uhren oder Elektronik belegen weder Akku, Sicherheit noch Langzeitfunktion. Auch Echtheit lässt sich so nicht beweisen.",
        },
      ],
      decisionEyebrow: "Vor dem Verlassen der Kategorie",
      decisionTitle: "Drei Entscheidungen ausdrücklich festhalten",
      decisionIntro:
        "Eine gute Vorauswahl erklärt, warum ein Artikel bleibt und welcher Beleg fehlt. So wird aus breitem Stöbern keine unklare Bestellung.",
      decisions: [
        {
          title: "Passformbeleg",
          body:
            "Bestimme das Maß, Etikett oder die Dimension, die deine Wahl ändern kann, und sichere die aktuelle Größentabelle des Verkäufers.",
        },
        {
          title: "QC-Beleg",
          body:
            "Notiere Winkel, Etikett, Zubehör oder Zustandsdetail, das vor der Annahme im Lagerbericht sichtbar sein muss.",
        },
        {
          title: "Rückgaberisiko",
          body:
            "Prüfe Verkäufer- und Plattformbedingungen früh. Individuelle oder eingeschränkte Artikel lassen oft weniger Zeit für Korrekturen.",
        },
      ],
    },
    how: {
      articleEyebrow: "Kompletter Ablauf für Einsteiger",
      articleTitle: "Verfolge eine Bestellung vom Produktlink bis zur Lagerentscheidung",
      articleBody:
        "Der ausführliche Ratgeber trennt aktuelles Angebot, eingereichte Bestellung, Einkauf, Verkäufer-Versand und Lagerbelege. Nutze ihn für den Transaktionsablauf statt eines allgemeinen Such-, QC- oder Versandratgebers.",
      articleCta: "So kaufst du mit LoloBuy",
      factEyebrow: "Offizielle Ablaufdaten · geprüft am 28. Juli 2026",
      factTitle: "Was die öffentliche LoloBuy-Seite bestätigt",
      facts: [
        "LoloBuy erklärt, dass Käufer einen Produktlink einfügen können und Käufe über chinesische Online- und Offline-Kanäle unterstützt werden.",
        "Nach Versand des Händlers an das Lager beschreibt die Seite Qualitätsprüfung, Fotos und 90 Tage kostenlose Lagerung.",
        "Gelagerte Produkte können laut öffentlichem Ablauf als ein Paket für den weltweiten Versand eingereicht werden. Es gelten die aktuellen Kontobedingungen.",
      ],
      steps: [
        {
          title: "Genaue Quelle finden",
          body:
            "Nutze eine genaue Suche oder Kategorie. Öffne die Zielseite und prüfe, ob Titel, Bild und Optionen wirklich das gesuchte Produkt beschreiben.",
        },
        {
          title: "Aktuelles Angebot lesen",
          body:
            "Prüfe Verkäufer, Auswahlfelder, Preis, Inlandslieferung und Hinweise zu Vorbestellung, Sets oder Rückgabe. Die Live-Seite ist der Kaufbeleg, nicht das Thumbnail.",
        },
        {
          title: "Kurze Bestellnotiz schreiben",
          body:
            "Notiere Quelle, Farbe, Größe, Version, Menge und wichtige Anweisung. Kann die Option nicht eindeutig beschrieben werden, halte vor der Zahlung an.",
        },
        {
          title: "Produktlink einreichen",
          body:
            "Füge die Originaladresse ein und vergleiche importierte Daten mit deiner Notiz. Kläre falschen Preis, fehlende Option oder unklare Bedingung vor dem Kauf.",
        },
        {
          title: "Lagereingang prüfen",
          body:
            "Vergleiche Identität, Option, Menge und sichtbaren Zustand mit dem Bestellbeleg. Frage nur nach einem konkreten Beleg, der die Entscheidung ändern kann.",
        },
        {
          title: "Annehmen, fragen oder handeln",
          body:
            "Nimm bei Übereinstimmung an, frage bei lösbarer Unklarheit und nutze die aktuellen Bestelloptionen zügig, wenn eine klare Abweichung sichtbar ist.",
        },
        {
          title: "Paket erstellen und absenden",
          body:
            "Wähle angenommene Artikel und vergleiche geeignete Routen mit Packgewicht, Maßen, Einschränkungen und Schutz. Sichere Zusammenfassung und Tracking.",
        },
      ],
      errorEyebrow: "Häufige Fehlerbeispiele",
      errorTitle: "Wo eine einfache Bestellung scheitert",
      errorIntro:
        "Die meisten vermeidbaren Probleme beginnen vor dem internationalen Versand. Diese Beispiele zeigen fehlende Belege und die Korrektur.",
      errors: [
        {
          title: "Die billigste Option war nicht das Produkt",
          body:
            "Der Startpreis gehörte zu Zubehör oder Anzahlung. Korrektur: alle Auswahlfelder öffnen, Preis der exakten Variante prüfen und diese Zeile speichern.",
        },
        {
          title: "Ein Größenbuchstabe ersetzte Maße",
          body:
            "Die Notiz enthielt nur „L“, obwohl die Tabelle anders maß. Korrektur: System notieren und ein flach gemessenes Kleidungsstück vergleichen.",
        },
        {
          title: "QC wurde mit Erinnerung verglichen",
          body:
            "Das Lagerbild wirkte anders, doch das Ursprungsangebot fehlte. Korrektur: datierte Seite und gewählte Option vor dem Einreichen sichern.",
        },
        {
          title: "Versand wurde aus Artikelgewicht geschätzt",
          body:
            "Ein sperriges Paket überstieg die Schätzung. Korrektur: Packmaße abwarten, Abrechnung prüfen und Zusammenlegung mit Aufteilung vergleichen.",
        },
      ],
    },
    qc: {
      eyebrow: "Produktspezifische QC-Belege",
      title: "Passe die Checkliste an das Produkt an",
      intro:
        "Identität, Option und sichtbarer Zustand stehen immer zuerst. Danach zählt nur, was ein Lagerfoto oder eine Messung sinnvoll belegen kann.",
      cards: [
        {
          title: "Schuhe",
          body:
            "Prüfe beide Schuhe, Etiketten, Farbe, Sohlenform, Spuren und Asymmetrie. Bei wichtiger Länge bitte um eine klar platzierte Messung und vergleiche gleich gemessene Referenzen.",
        },
        {
          title: "Bekleidung",
          body:
            "Prüfe Größe, Farbe, Vorder- und Rückseite, Druck, Verschlüsse und sichtbare Schäden. Flachmaße helfen nur bei sichtbarer, einheitlicher Bandposition.",
        },
        {
          title: "Taschen und Zubehör",
          body:
            "Prüfe Modell, Farbe, Maße, Riemen oder abnehmbare Teile, Verschlüsse und Hardware. Allgemeine Fotos beweisen weder innere Verarbeitung noch Material oder Echtheit.",
        },
        {
          title: "Elektronik und sensible Artikel",
          body:
            "Fotos zeigen Etikett, Schäden und Teile, nicht aber Akku, elektrische Sicherheit, Konformität oder Dauerleistung. Nutze dafür geeignete autorisierte Nachweise.",
        },
      ],
    },
    shipping: {
      eyebrow: "Vergleichbarer Routennachweis",
      title: "Routen mit denselben Paketdaten vergleichen",
      intro:
        "Routenname oder alte Kilopreise reichen nicht. Halte aktuelle Paketdaten fest und vergleiche nur Optionen, die Ziel und Inhalt akzeptieren.",
      cards: [
        {
          title: "Eignung vor Schlagzeilenpreis",
          body:
            "Prüfe Ziel, akzeptierte Artikel, tatsächliche und dimensionale Grenzen, Maximalmaße sowie Regeln für Akkus, Flüssigkeiten, Marken oder eingeschränkte Güter. Eine ungeeignete billige Linie ist keine Alternative.",
        },
        {
          title: "Leistungsbedingungen neben der Schätzung",
          body:
            "Sichere Laufzeit, Tracking, Abrechnung, Entschädigung und mögliche Preisänderungen. Diese Punkte können wichtiger sein als ein kleiner Preisunterschied.",
        },
        {
          title: "Finaler Paketbeleg",
          body:
            "Sichere vor Zahlung Gewicht, Maße, Schutz, Inhalt, Adresse, Route und Endpreis. Ergänze nach Versand Trackingnummer und echte Transportereignisse.",
        },
      ],
    },
    articles: {
      eyebrow: "So nutzt du die Ratgeberbibliothek",
      title: "Wähle den Ratgeber für die nächste Entscheidung",
      intro:
        "Der Index folgt der echten Kaufreise. Jeder Ratgeber ist eigenständig, doch die stärkste Reihenfolge beginnt beim Produktbeleg und endet mit realen Paketdaten.",
      cards: [
        {
          title: "Vor der Bestellung: Produktkontext sichern",
          body:
            "Beginne beim Spreadsheet-Ratgeber für Quelle oder Variante. Er behandelt Suche, W2C-Links, Optionen, Verkäuferbelege und die kurze Bestellnotiz. Das Ergebnis ist eine eindeutige Beschreibung statt ungeordneter Screenshots.",
        },
        {
          title: "Im Lager: Belege vergleichen",
          body:
            "Nutze den QC-Ratgeber für den Vergleich mit der Bestellung. Identität, Option und Menge kommen vor Zustand und Details. Er erklärt auch, was Fotos über Echtheit, Passform oder Sicherheit nicht beweisen.",
        },
        {
          title: "Vor der Frachtzahlung: Paket erstellen",
          body:
            "Nutze den Versandratgeber mit angenommenen Artikeln und Packdaten. Er trennt Kosten und zeigt den Einfluss von Maßen, Limits, Zusammenlegung und Schutz. Ziel ist ein finaler Beleg, kein kopierter Fremdpreis.",
        },
      ],
    },
    faq: {
      eyebrow: "So werden diese Antworten gepflegt",
      title: "Offizielle Fakten, Live-Variablen und Urteile bleiben getrennt",
      intro:
        "Die FAQ ist keine Liste fester Versprechen. Jede Antwort folgt der verfügbaren Evidenz, damit eine datierte Aussage nicht mit einem aktuellen Angebot oder Einzelbericht verwechselt wird.",
      points: [
        "Offizielle öffentliche Aussagen werden datiert und als Aussagen, nicht als Garantien wiedergegeben.",
        "Gebühren, Fotos, Routen, Bestand und Verkäuferbedingungen gelten ohne stabile Regel als Live-Variablen.",
        "Risiko, Echtheit, Passform und Zoll werden mit Grenzen und Prüfschritten statt Pauschalaussagen erklärt.",
      ],
    },
    articleSummaries: {
      "how-to-use-lolobuy-spreadsheet":
        "Beginne hier, wenn du einen Artikel zuerst im Spreadsheet gesehen hast. Der Ratgeber führt vom Fund zur genauen Quelle, Variante und Optionsprüfung. Er erklärt auch, warum W2C-Links, Screenshots und datierte Notizen wichtig sind, wenn sich Angebote ändern.",
      "lolobuy-qc-photos-guide":
        "Lies diesen Ratgeber beim Lagereingang oder definiere die QC-Belege bereits vorher. Er folgt Identität, Variante, Maßen und sichtbarem Zustand samt Grenzen. Ein gutes Foto beweist weder Passform, Echtheit, verborgene Verarbeitung noch Haltbarkeit.",
      "lolobuy-shipping-cost-guide":
        "Nutze ihn für akzeptierte, versandbereite Artikel. Er trennt Produkt, Inlandslieferung und Fracht und erklärt tatsächliches sowie Volumengewicht, Zusammenlegung, Verpackung und Limits. Beispiele sind klar als solche markiert.",
      "how-to-buy-from-lolobuy":
        "Beginne hier mit einem aktuellen chinesischen Produktlink und der ersten Bestellung. Der Ratgeber trennt Angebot, eingereichte Bestellung, Einkauf, Verkäufer-Versand und Lagereingang in fünf Prüfpunkte und zeigt die Belegführung vor der Paketplanung.",
      "lolobuy-hoodie-size-guide":
        "Nutze ihn vor der Hoodie-Größenwahl oder bei der Lagerprüfung. Er ersetzt Buchstaben-Umrechnung durch flache Kleidungsmaße, vergleicht Tabellen mit gleichen Messpunkten und grenzt ein, welche QC-Nachweise die Entscheidung stützen können.",
      "lolobuy-stitching-finish-qc-checklist":
        "Nach der Artikelbestätigung und vor dem Versand nutzen. Der Ratgeber prüft zuerst funktionale Nähte, dann passende Seiten, Kanten, Dekoration und Finish und endet mit Annehmen, gezielter Frage oder dokumentierter Abweichung.",
      "lolobuy-alignment-symmetry-print-placement-qc":
        "Nutze den Ratgeber, wenn Druck, Patch oder Paneel versetzt wirkt. Perspektive, Falten und Form werden mit produktbezogenen Referenzlinien geprüft, bevor du freigibst, gezielt nachfragst oder eine Abweichung dokumentierst.",
    },
  },
  fr: {
    products: {
      eyebrow: "Méthode reproductible de sélection",
      title: "Filtrez un résultat avant d'en faire une commande",
      intro:
        "Une bonne page produit réduit l'incertitude. Partez du terme exact, créez une liste courte, vérifiez l'annonce active et conservez l'option à soumettre.",
      cards: [
        {
          title: "Commencez précisément, élargissez une fois",
          body:
            "Cherchez d'abord la partie stable du nom : type, modèle ou silhouette. Ajoutez un seul critère comme la matière, la couleur ou la version si les résultats sont trop larges. Modifier plusieurs mots à la fois empêche de savoir lequel a amélioré la recherche.",
          bullets: [
            "Essayez d'abord le modèle ou le type",
            "Ajoutez un seul critère visuel ou matériel",
            "Utilisez une catégorie si le terme exact manque",
          ],
        },
        {
          title: "Comparez les options, pas l'image principale",
          body:
            "Une annonce peut réunir couleurs, lots, qualités ou accessoires sous la même image. Ouvrez les sélecteurs, observez les variations de prix et confirmez que la ligne choisie correspond à votre note. Le prix minimal peut concerner un acompte ou un accessoire.",
        },
        {
          title: "Datez chaque contrôle du catalogue",
          body:
            "L'image et le lien sont vérifiés ensemble, mais stock, variantes, prix et livraison restent des données actives. Rouvrez la destination juste avant la commande. Si produit, option ou conditions ont changé, la page actuelle prévaut.",
        },
        {
          title: "Conservez les détails décisifs",
          body:
            "Gardez l'adresse source, le vendeur visible, la taille, la couleur, la version, la quantité, le code d'option et les notes utiles. Une capture datée aide si l'annonce change et donne une référence concrète aux photos d'entrepôt.",
        },
      ],
    },
    categories: {
      eyebrow: "Contrôles propres à chaque catégorie",
      title: "Utilisez un filtre différent selon le produit",
      intro:
        "Une catégorie est un raccourci de recherche, pas un label de qualité. Les questions changent : coupe, preuves QC, limites de retour et risque d'expédition.",
      cards: [
        {
          title: "Chaussures : la mesure dépasse la taille imprimée",
          body:
            "Notez le système de tailles et comparez semelle intérieure ou extérieure uniquement si la méthode est claire. Examinez la paire : modèle, couleur, forme, traces de colle et asymétrie. Décidez avant l'emballage si la boîte est importante.",
        },
        {
          title: "Sweats et pulls : contrôlez le vêtement réel",
          body:
            "Utilisez un vêtement personnel comme référence, mesuré à plat aux mêmes endroits. Vérifiez couleur, étiquette, impression ou broderie, poignets, ourlet et marques. Une lettre de taille ne garantit pas la coupe.",
        },
        {
          title: "Vestes : définissez version et éléments inclus",
          body:
            "Les annonces varient selon doublure, saison, éléments amovibles ou matière. Gardez l'option exacte et notez capuche, ceinture, doublure ou accessoire. Contrôlez fermetures, poches, grands panneaux et dos.",
        },
        {
          title: "Accessoires : adaptez le contrôle à l'objet",
          body:
            "Pour un couvre-chef, vérifiez dimensions et forme ; pour des lunettes, état de la monture et pièces. Les photos de montres ou d'électronique ne prouvent ni batterie, sécurité, fonctionnement durable ni authenticité.",
        },
      ],
      decisionEyebrow: "Avant de quitter la catégorie",
      decisionTitle: "Rendez trois décisions explicites",
      decisionIntro:
        "Une bonne sélection explique pourquoi l'article reste et quelle preuve manque. Une recherche large ne devient ainsi pas une commande ambiguë.",
      decisions: [
        {
          title: "Preuve de coupe",
          body:
            "Identifiez la mesure, l'étiquette ou la dimension qui peut changer votre choix et conservez le tableau actuel du vendeur.",
        },
        {
          title: "Preuve QC",
          body:
            "Notez l'angle, l'étiquette, l'accessoire ou le détail d'état qui doit apparaître avant acceptation.",
        },
        {
          title: "Risque de retour",
          body:
            "Vérifiez tôt les conditions du vendeur et de la plateforme. Les articles personnalisés ou restreints laissent parfois moins de marge.",
        },
      ],
    },
    how: {
      articleEyebrow: "Parcours complet pour débuter",
      articleTitle: "Suivez une commande du lien produit à la décision en entrepôt",
      articleBody:
        "Le guide long sépare annonce active, commande soumise, achat, expédition du vendeur et preuves d'entrepôt. Utilisez-le pour la séquence transactionnelle plutôt qu'un guide général de recherche, QC ou expédition.",
      articleCta: "Lire comment acheter avec LoloBuy",
      factEyebrow: "Faits officiels · vérifiés le 28 juillet 2026",
      factTitle: "Ce que confirme la page publique de LoloBuy",
      facts: [
        "LoloBuy indique qu'un acheteur peut coller un lien produit et que le service aide aux achats via des canaux chinois en ligne et hors ligne.",
        "Après l'envoi du marchand à l'entrepôt, la page décrit contrôle qualité, photos et 90 jours de stockage gratuit.",
        "Les produits stockés peuvent aussi être soumis en un seul colis pour l'expédition mondiale. Les conditions actives régissent chaque commande.",
      ],
      steps: [
        {
          title: "Trouvez la source exacte",
          body:
            "Utilisez une recherche précise ou une catégorie. Ouvrez la destination et confirmez que titre, image et options décrivent bien le produit voulu.",
        },
        {
          title: "Lisez l'annonce active",
          body:
            "Vérifiez vendeur, options, prix, livraison nationale et notes sur précommandes, lots ou retours. La page active, pas la miniature, est le dossier d'achat.",
        },
        {
          title: "Rédigez une note de commande",
          body:
            "Notez source, couleur, taille, version, quantité et instruction importante. Si l'option ne peut être décrite clairement, arrêtez avant le paiement.",
        },
        {
          title: "Soumettez le lien produit",
          body:
            "Collez l'adresse originale et comparez les données importées à votre note. Résolvez prix incorrect, option absente ou condition floue avant l'achat.",
        },
        {
          title: "Contrôlez l'arrivée à l'entrepôt",
          body:
            "Comparez identité, option, quantité et état visible au dossier. Demandez une preuve ciblée uniquement si elle peut changer la décision.",
        },
        {
          title: "Acceptez, questionnez ou agissez",
          body:
            "Acceptez si les preuves concordent, questionnez si un angle ou une mesure suffit, et utilisez vite les options actives en cas d'écart clair.",
        },
        {
          title: "Préparez et soumettez le colis",
          body:
            "Sélectionnez les articles acceptés et comparez les lignes avec poids, dimensions, limites et protection. Gardez résumé final et suivi.",
        },
      ],
      errorEyebrow: "Exemples d'erreurs fréquentes",
      errorTitle: "Où échoue une commande apparemment simple",
      errorIntro:
        "La plupart des problèmes évitables commencent avant l'expédition internationale. Ces exemples montrent la preuve manquante et la correction.",
      errors: [
        {
          title: "L'option la moins chère n'était pas le produit",
          body:
            "Le prix initial concernait un accessoire ou un acompte. Correction : ouvrez tous les sélecteurs, confirmez le prix exact et gardez cette ligne.",
        },
        {
          title: "Une lettre a remplacé les mesures",
          body:
            "La note disait seulement « L » malgré un autre tableau. Correction : notez le système et comparez un vêtement à plat aux mêmes points.",
        },
        {
          title: "Le QC a été comparé à un souvenir",
          body:
            "La photo semblait différente mais l'annonce manquait. Correction : conservez la page datée et l'option choisie avant la soumission.",
        },
        {
          title: "L'envoi a été estimé au poids de l'article",
          body:
            "Un colis volumineux a dépassé l'estimation. Correction : attendez les dimensions emballées, vérifiez la facturation et comparez regroupement et division.",
        },
      ],
    },
    qc: {
      eyebrow: "Preuves QC selon le produit",
      title: "Changez de liste quand le produit change",
      intro:
        "Identité, option et état visible viennent d'abord. Demandez ensuite uniquement ce qu'une photo ou une mesure d'entrepôt peut raisonnablement établir.",
      cards: [
        {
          title: "Chaussures",
          body:
            "Contrôlez la paire, les étiquettes, la couleur, la semelle, les marques et l'asymétrie. Si la longueur compte, demandez une mesure clairement placée et comparez une référence mesurée pareil.",
        },
        {
          title: "Vêtements",
          body:
            "Confirmez taille et couleur, puis face, dos, impression, fermetures et dommages. Les mesures à plat n'aident que si la position du mètre est visible.",
        },
        {
          title: "Sacs et accessoires",
          body:
            "Vérifiez modèle, couleur, dimensions, bandoulière, pièces amovibles, fermetures et métal. Les photos ne prouvent ni construction cachée, ni matière, ni authenticité.",
        },
        {
          title: "Électronique et articles sensibles",
          body:
            "Une photo montre étiquette, dégâts et pièces, pas batterie, sécurité électrique, conformité ou durée. Utilisez les preuves autorisées adaptées.",
        },
      ],
    },
    shipping: {
      eyebrow: "Dossier de comparaison des lignes",
      title: "Comparez les lignes avec les mêmes données",
      intro:
        "Un nom de ligne ou un ancien prix au kilo ne suffit pas. Notez le colis actuel et comparez uniquement les options acceptant destination et contenu.",
      cards: [
        {
          title: "Éligibilité avant prix d'appel",
          body:
            "Vérifiez destination, produits acceptés, limites réelles et volumétriques, taille maximale et règles sur batteries, liquides, marques ou biens restreints. Une ligne bon marché mais inéligible n'est pas une option.",
        },
        {
          title: "Conditions avec l'estimation",
          body:
            "Gardez délai annoncé, suivi, facturation, compensation et circonstances de modification du prix. Ces éléments peuvent compter davantage qu'un petit écart initial.",
        },
        {
          title: "Preuve finale du colis",
          body:
            "Avant paiement, gardez poids, dimensions, protection, contenu, adresse, ligne et prix final. Après départ, ajoutez numéro de suivi et événements réels.",
        },
      ],
    },
    articles: {
      eyebrow: "Comment utiliser la bibliothèque",
      title: "Choisissez le guide pour la prochaine décision",
      intro:
        "L'index suit le parcours réel. Chaque guide est autonome, mais le meilleur ordre commence par le dossier produit et se termine avec les données emballées.",
      cards: [
        {
          title: "Avant commande : conserver le contexte",
          body:
            "Commencez par le guide du tableur pour la source ou la variante. Il couvre recherche, liens W2C, sélecteurs, preuves vendeur et note courte. Le résultat doit être une description claire, pas des captures sans contexte.",
        },
        {
          title: "À l'entrepôt : comparer les preuves",
          body:
            "Passez au guide QC pour comparer l'arrivée. Identité, option et quantité précèdent état et détails. Le guide précise aussi ce que les photos ne prouvent pas sur authenticité, coupe ou sécurité.",
        },
        {
          title: "Avant le fret : construire le colis",
          body:
            "Utilisez le guide d'expédition avec articles acceptés et données emballées. Il sépare les coûts et montre l'effet des dimensions, limites, regroupement et protection. Le but est un dossier final, pas un ancien tarif.",
        },
      ],
    },
    faq: {
      eyebrow: "Entretien de ces réponses",
      title: "Faits officiels, variables actives et jugements restent séparés",
      intro:
        "La FAQ n'est pas une liste de promesses fixes. Chaque réponse suit le niveau de preuve disponible afin de ne pas confondre déclaration datée, devis actif et récit individuel.",
      points: [
        "Les déclarations publiques sont datées et reformulées sans devenir des garanties.",
        "Frais, photos, lignes, stock et conditions restent des variables sans règle publique stable.",
        "Risque, authenticité, coupe et douanes sont traités avec limites et étapes de vérification.",
      ],
    },
    articleSummaries: {
      "how-to-use-lolobuy-spreadsheet":
        "Commencez ici si la feuille vous a fait découvrir l'article. Le guide mène du résultat à la source exacte, à la variante et aux options. Il explique aussi l'utilité des liens W2C, captures et notes datées lorsque l'annonce change.",
      "lolobuy-qc-photos-guide":
        "Lisez ce guide à l'arrivée en entrepôt ou définissez les preuves avant l'achat. Il suit identité, variante, mesures et état visible avec leurs limites. Une belle photo ne prouve ni coupe, authenticité, construction cachée ni durée.",
      "lolobuy-shipping-cost-guide":
        "Utilisez-le lorsque les articles acceptés sont prêts. Il sépare produit, livraison nationale et fret, puis explique poids réel et volumétrique, regroupement, emballage et limites. Les exemples sont clairement signalés.",
      "how-to-buy-from-lolobuy":
        "Commencez ici avec un lien produit chinois actif et une première commande. Le guide sépare annonce, commande soumise, achat, expédition du vendeur et arrivée en entrepôt en cinq contrôles, puis organise les preuves avant le colis.",
      "lolobuy-hoodie-size-guide":
        "Utilisez-le avant de choisir une taille de hoodie ou lors de l'arrivée en entrepôt. Il remplace les équivalences de lettres par des mesures à plat, compare les mêmes points et précise les preuves QC utiles sans promettre la coupe.",
      "lolobuy-stitching-finish-qc-checklist":
        "À utiliser après l'identité et avant l'expédition. Il examine d'abord les assemblages fonctionnels, puis les côtés comparables, bords, décors et finitions avant une décision d'accepter, demander ou documenter un écart.",
      "lolobuy-alignment-symmetry-print-placement-qc":
        "À utiliser lorsqu’un motif, patch ou panneau semble décentré. Le guide teste perspective, plis et forme avec des repères propres à l’article avant d’accepter, demander une vue ou documenter l’écart.",
    },
  },
  it: {
    products: {
      eyebrow: "Metodo ripetibile di selezione",
      title: "Filtra un risultato prima che diventi un ordine",
      intro:
        "Una buona pagina prodotto riduce l'incertezza. Parti dal termine esatto, crea una lista breve, verifica l'inserzione attiva e conserva l'opzione da inviare.",
      cards: [
        {
          title: "Parti preciso, amplia una volta",
          body:
            "Cerca prima la parte stabile del nome: tipo, modello o silhouette. Aggiungi un solo elemento, come materiale, colore o versione, se i risultati sono troppo ampi. Cambiare più parole insieme rende difficile capire quale abbia migliorato la ricerca.",
          bullets: [
            "Prova prima modello o tipo",
            "Aggiungi un solo dettaglio visivo o materiale",
            "Usa la categoria se non conosci il termine esatto",
          ],
        },
        {
          title: "Confronta le opzioni, non l'immagine principale",
          body:
            "Una pagina può riunire colori, set, qualità o accessori sotto la stessa copertina. Apri i selettori, osserva quale scelta cambia il prezzo e verifica che la riga corrisponda alla nota. Il prezzo minimo può riferirsi a deposito o accessorio.",
        },
        {
          title: "Considera datato ogni controllo",
          body:
            "Immagine e destinazione sono verificate insieme, ma disponibilità, varianti, prezzo e consegna restano dati live. Riapri la pagina subito prima dell'ordine. Se prodotto, opzione o condizioni sono cambiati, prevale la pagina attuale.",
        },
        {
          title: "Salva i dettagli che cambiano la decisione",
          body:
            "Conserva indirizzo, venditore visibile, taglia, colore, versione, quantità, codice e note importanti. Uno screenshot datato aiuta se la pagina cambia e fornisce un riferimento concreto alle foto di magazzino.",
        },
      ],
    },
    categories: {
      eyebrow: "Controlli per categoria",
      title: "Usa un filtro diverso per ogni tipo di prodotto",
      intro:
        "La categoria è una scorciatoia di ricerca, non un marchio di qualità. Le domande cambiano: vestibilità, prove QC, limiti di reso e rischio di spedizione.",
      cards: [
        {
          title: "Scarpe: la misura conta più della taglia",
          body:
            "Registra il sistema di taglie e confronta soletta o suola solo con un metodo chiaro. Controlla la coppia: modello, colore, forma, colla visibile e asimmetria. Decidi prima dell'imballaggio se la scatola è importante.",
        },
        {
          title: "Felpe e maglioni: controlla il capo reale",
          body:
            "Usa un tuo capo come riferimento e misuralo piatto negli stessi punti. Verifica colore, etichetta, stampa o ricamo, polsini, orlo e segni. Una lettera di taglia non garantisce la vestibilità.",
        },
        {
          title: "Giacche: definisci versione e parti incluse",
          body:
            "Le inserzioni cambiano per fodera, stagione, parti removibili o materiale. Salva l'opzione esatta e annota cappuccio, cintura, fodera o accessorio. Controlla chiusure, tasche, pannelli e retro.",
        },
        {
          title: "Accessori: adatta il controllo all'oggetto",
          body:
            "Per copricapi controlla misure e forma; per occhiali, telaio e parti incluse. Le foto di orologi o elettronica non provano batteria, sicurezza, funzionamento nel tempo o autenticità.",
        },
      ],
      decisionEyebrow: "Prima di lasciare la categoria",
      decisionTitle: "Rendi esplicite tre decisioni",
      decisionIntro:
        "Una buona lista spiega perché un articolo resta e quale prova manca. Così una ricerca ampia non diventa un ordine ambiguo.",
      decisions: [
        {
          title: "Prova di vestibilità",
          body:
            "Individua misura, etichetta o dimensione che può cambiare la scelta e salva la tabella corrente del venditore.",
        },
        {
          title: "Prova QC",
          body:
            "Annota angolo, etichetta, accessorio o dettaglio che deve apparire nel registro prima dell'accettazione.",
        },
        {
          title: "Rischio di reso",
          body:
            "Controlla presto condizioni di venditore e piattaforma. Articoli personalizzati o limitati possono lasciare meno margine.",
        },
      ],
    },
    how: {
      articleEyebrow: "Percorso completo per iniziare",
      articleTitle: "Segui un ordine dal link prodotto alla decisione in magazzino",
      articleBody:
        "La guida lunga separa inserzione attiva, ordine inviato, acquisto, spedizione del venditore e prove del magazzino. Usala per la sequenza della transazione, non come guida generale a ricerca, QC o spedizione.",
      articleCta: "Leggi come acquistare con LoloBuy",
      factEyebrow: "Fatti ufficiali · verificati il 28 luglio 2026",
      factTitle: "Cosa conferma la pagina pubblica LoloBuy",
      facts: [
        "LoloBuy afferma che si può incollare un link prodotto e che il servizio assiste acquisti da canali cinesi online e offline.",
        "Dopo l'invio del venditore al magazzino, la pagina descrive controllo qualità, foto e 90 giorni di deposito gratuito.",
        "I prodotti conservati possono essere inviati come un unico pacco tramite spedizione globale. Le condizioni attive regolano ogni ordine.",
      ],
      steps: [
        {
          title: "Trova la fonte esatta",
          body:
            "Usa una ricerca precisa o una categoria. Apri la destinazione e verifica che titolo, immagine e opzioni descrivano davvero il prodotto.",
        },
        {
          title: "Leggi l'inserzione attiva",
          body:
            "Controlla venditore, selettori, prezzo, consegna nazionale e note su preordini, set o resi. La pagina live, non la miniatura, è il documento d'acquisto.",
        },
        {
          title: "Scrivi una breve nota d'ordine",
          body:
            "Registra fonte, colore, taglia, versione, quantità e istruzione importante. Se l'opzione non è descrivibile senza ambiguità, fermati prima del pagamento.",
        },
        {
          title: "Invia il link prodotto",
          body:
            "Incolla l'indirizzo originale e confronta i dati importati con la nota. Risolvi prezzo errato, opzione assente o condizione poco chiara prima dell'acquisto.",
        },
        {
          title: "Controlla l'arrivo in magazzino",
          body:
            "Confronta identità, opzione, quantità e condizione visibile con l'ordine. Chiedi una prova mirata solo se può cambiare la decisione.",
        },
        {
          title: "Accetta, chiedi o agisci",
          body:
            "Accetta se le prove coincidono, chiedi se un angolo o misura risolve il dubbio e usa presto le opzioni attive in caso di differenza chiara.",
        },
        {
          title: "Prepara e invia il pacco",
          body:
            "Seleziona gli articoli accettati e confronta rotte con peso, dimensioni, limiti e protezione. Salva riepilogo finale e tracciamento.",
        },
      ],
      errorEyebrow: "Esempi di errori comuni",
      errorTitle: "Dove fallisce un ordine apparentemente semplice",
      errorIntro:
        "Molti problemi evitabili iniziano prima della spedizione internazionale. Questi esempi mostrano la prova mancante e la correzione.",
      errors: [
        {
          title: "L'opzione più economica non era il prodotto",
          body:
            "Il prezzo iniziale riguardava accessorio o deposito. Correzione: apri i selettori, conferma il prezzo della variante esatta e salva la riga.",
        },
        {
          title: "Una lettera ha sostituito le misure",
          body:
            "La nota diceva solo “L” malgrado una tabella diversa. Correzione: registra il sistema e confronta un capo piatto negli stessi punti.",
        },
        {
          title: "Il QC è stato confrontato con la memoria",
          body:
            "La foto sembrava diversa ma mancava l'inserzione. Correzione: salva pagina datata e opzione scelta prima dell'invio.",
        },
        {
          title: "La spedizione è stata stimata dal peso articolo",
          body:
            "Un pacco voluminoso ha superato la stima. Correzione: attendi dimensioni, verifica la fatturazione e confronta consolidamento e divisione.",
        },
      ],
    },
    qc: {
      eyebrow: "Prove QC specifiche",
      title: "Cambia la lista quando cambia il prodotto",
      intro:
        "Identità, opzione e condizione visibile vengono prima. Poi chiedi solo ciò che una foto o misura di magazzino può mostrare ragionevolmente.",
      cards: [
        {
          title: "Calzature",
          body:
            "Controlla entrambe le scarpe, etichette, colore, suola, segni e asimmetria. Se conta la lunghezza, chiedi una misura ben posizionata e confronta riferimenti misurati allo stesso modo.",
        },
        {
          title: "Abbigliamento",
          body:
            "Conferma taglia e colore, fronte, retro, stampa, chiusure e danni. Le misure piatte aiutano solo se la posizione del metro è visibile.",
        },
        {
          title: "Borse e accessori",
          body:
            "Controlla modello, colore, dimensioni, tracolla, parti removibili, chiusure e hardware. Le foto non provano costruzione nascosta, materiale o autenticità.",
        },
        {
          title: "Elettronica e articoli sensibili",
          body:
            "Una foto mostra etichetta, danni e parti, non batteria, sicurezza, conformità o durata. Usa prove autorizzate adeguate.",
        },
      ],
    },
    shipping: {
      eyebrow: "Registro confrontabile delle rotte",
      title: "Confronta rotte con gli stessi dati",
      intro:
        "Il nome della rotta o un vecchio prezzo al chilo non bastano. Registra il pacco attuale e confronta solo opzioni che accettano destinazione e contenuto.",
      cards: [
        {
          title: "Idoneità prima del prezzo",
          body:
            "Controlla destinazione, prodotti accettati, limiti reali e volumetrici, dimensioni massime e regole per batterie, liquidi, marchi o beni limitati. Una linea economica non idonea non è un'alternativa.",
        },
        {
          title: "Condizioni accanto alla stima",
          body:
            "Salva tempi dichiarati, tracciamento, fatturazione, compensazione e condizioni di modifica del prezzo. Possono contare più di una piccola differenza iniziale.",
        },
        {
          title: "Prova finale del pacco",
          body:
            "Prima di pagare salva peso, dimensioni, protezione, contenuto, indirizzo, rotta e prezzo finale. Dopo la partenza aggiungi tracking ed eventi reali.",
        },
      ],
    },
    articles: {
      eyebrow: "Come usare la raccolta di guide",
      title: "Scegli la guida per la prossima decisione",
      intro:
        "L'indice segue il percorso reale. Ogni guida è autonoma, ma l'ordine migliore parte dal registro prodotto e termina con i dati del pacco.",
      cards: [
        {
          title: "Prima dell'ordine: conserva il contesto",
          body:
            "Inizia dalla guida al foglio per fonte o variante. Copre ricerca, link W2C, selettori, prove del venditore e nota breve. Il risultato deve essere una descrizione chiara, non screenshot senza contesto.",
        },
        {
          title: "In magazzino: confronta le prove",
          body:
            "Passa alla guida QC per confrontare l'arrivo. Identità, opzione e quantità precedono condizione e dettagli. Spiega anche cosa le foto non provano su autenticità, vestibilità o sicurezza.",
        },
        {
          title: "Prima del trasporto: prepara il pacco",
          body:
            "Usa la guida di spedizione con articoli accettati e dati imballati. Separa i costi e mostra l'effetto di dimensioni, limiti, consolidamento e protezione. L'obiettivo è un registro finale, non una vecchia tariffa.",
        },
      ],
    },
    faq: {
      eyebrow: "Come vengono mantenute le risposte",
      title: "Fatti ufficiali, variabili live e giudizi restano separati",
      intro:
        "Le FAQ non sono promesse fisse. Ogni risposta segue il tipo di prova disponibile per non confondere dichiarazione datata, preventivo attivo e singola esperienza.",
      points: [
        "Le dichiarazioni pubbliche ufficiali sono datate e parafrasate senza diventare garanzie.",
        "Costi, foto, rotte, disponibilità e condizioni restano variabili senza una regola pubblica stabile.",
        "Rischio, autenticità, vestibilità e dogana sono trattati con limiti e passaggi di verifica.",
      ],
    },
    articleSummaries: {
      "how-to-use-lolobuy-spreadsheet":
        "Inizia qui se hai visto l'articolo nel foglio. La guida passa dal risultato alla fonte esatta, alla variante e ai selettori. Spiega anche perché link W2C, screenshot e note datate servono quando l'inserzione cambia.",
      "lolobuy-qc-photos-guide":
        "Leggi la guida all'arrivo in magazzino o definisci prima le prove. Segue identità, variante, misure e condizione visibile con i loro limiti. Una bella foto non prova vestibilità, autenticità, costruzione nascosta o durata.",
      "lolobuy-shipping-cost-guide":
        "Usala quando gli articoli accettati sono pronti. Separa prodotto, consegna nazionale e trasporto e spiega peso reale e volumetrico, consolidamento, imballaggio e limiti. Gli esempi sono chiaramente indicati.",
      "how-to-buy-from-lolobuy":
        "Inizia qui con un link prodotto cinese attivo e un primo ordine. La guida separa inserzione, ordine inviato, acquisto, spedizione del venditore e arrivo in magazzino in cinque controlli e organizza le prove prima del pacco.",
      "lolobuy-hoodie-size-guide":
        "Usala prima di scegliere la taglia di una felpa o durante il controllo in magazzino. Sostituisce le equivalenze a lettere con misure piatte, confronta gli stessi punti e definisce le prove QC utili senza promettere la vestibilità.",
      "lolobuy-stitching-finish-qc-checklist":
        "Usala dopo aver confermato l'articolo e prima della spedizione. Controlla prima le giunzioni funzionali, poi lati equivalenti, bordi, decorazioni e finiture, con decisione finale di accettare, chiedere o documentare una differenza.",
      "lolobuy-alignment-symmetry-print-placement-qc":
        "Usala quando stampa, patch o pannello sembrano decentrati. Verifica prospettiva, pieghe e forma con riferimenti dell’articolo prima di approvare, chiedere una vista o documentare la differenza.",
    },
  },
};
