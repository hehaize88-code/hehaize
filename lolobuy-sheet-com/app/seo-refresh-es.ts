import type { Article } from "./site-data";

const translatedArticles: Article[] = [
  {
    slug: "lolobuy-product-link-not-working",
    title: "Cómo recuperar un enlace de producto de LoloBuy que no funciona: Taobao, Weidian y 1688",
    searchTitle: "Enlace LoloBuy no funciona: recuperar Taobao, Weidian y 1688",
    shortTitle: "Recuperar un enlace de producto de LoloBuy",
    description: "Diagnostica un enlace inválido de LoloBuy, recupera el anuncio original de Taobao, Weidian o 1688 y conserva la variante exacta antes de comprar.",
    eyebrow: "RECUPERACIÓN DE ENLACES",
    published: "2026-09-15", updated: "2026-10-17", readingTime: "14 min de lectura",
    factCheckLine: "Comprobación original de la descripción pública de pedidos mediante enlaces y del flujo de búsqueda de LoloBuy: 15 de septiembre de 2026. Revisión editorial y traducción: 17 de octubre de 2026; no constituyen una nueva prueba de compra.",
    visual: { eyebrow: "CADENA DE RECUPERACIÓN", title: "Recupera la identidad del producto antes que el botón de compra.", caption: "Un sustituto válido debe conservar la fuente, el producto, la variante y las pruebas; una foto parecida no basta.", items: [
      { label: "Fuente", text: "Identifica el mercado y conserva la URL completa." },
      { label: "Identidad", text: "Contrasta título, vendedor, imágenes e identificadores estables." },
      { label: "Variante", text: "Reconstruye color, talla, versión, cantidad y notas." },
      { label: "Verificación", text: "Revisa el pedido interpretado antes de pagar." },
    ] },
    sources: [
      { label: "Sitio público de LoloBuy — comprobación del 15 de septiembre de 2026", note: "Fuente primaria de la posibilidad de comenzar un pedido pegando un enlace y del flujo público de inspección en almacén." },
      { label: "Registros actuales del destino y del mercado", note: "Los campos del anuncio vigente determinan vendedor, variante, cantidad, precio y disponibilidad." },
      { label: "Método de recuperación de Lolobuy Sheet", note: "La secuencia de diagnóstico y el registro de pruebas son métodos editoriales independientes, no políticas de LoloBuy." },
    ],
    intro: [
      "Un enlace de producto de LoloBuy puede fallar en varios puntos. El mercado original puede haber retirado la página, una URL acortada puede haber perdido parámetros, el destino puede rechazar un formato incompatible o una entrada antigua de una hoja de cálculo puede apuntar a un anuncio que ha cambiado. Los síntomas se parecen en pantalla, pero requieren soluciones distintas.",
      "LoloBuy indica públicamente que se puede pegar un enlace de producto para iniciar un pedido. Esto confirma la importancia de la URL de origen, pero no garantiza que todos los anuncios antiguos de Taobao, Weidian o 1688 sigan disponibles ni se interpreten correctamente. El objetivo seguro no es forzar un enlace roto, sino reunir pruebas suficientes para decidir si la página recuperada corresponde al mismo artículo y a la variante exacta.",
    ],
    sections: [
      { heading: "Clasifica el fallo antes de modificar la URL", paragraphs: [
        "Primero registra lo que ocurre. Un error del navegador, una pantalla de inicio de sesión, un aviso de artículo retirado, un formulario vacío, una vista previa equivocada y un error 404 del destino son síntomas diferentes. Prueba el enlace sin modificar en un navegador normal y después en el campo de pedido. Anota la fecha, el dominio visible, la URL final tras las redirecciones y cualquier identificador estable antes de probar alternativas.",
        "No elimines parámetros ni cambies dominios al azar. Los enlaces pueden contener identificadores de artículos, contexto del vendedor, parámetros de campañas y redirecciones entre móvil y ordenador. Algunas partes son prescindibles, pero quitar la incorrecta puede abrir otro anuncio o una página vacía. Conserva el original como prueba de solo lectura y experimenta con una copia.",
      ], bullets: ["URL original y URL final redirigida", "Mercado e identificador visible del artículo", "Error exacto o vista previa incorrecta", "Fecha y dispositivo de la comprobación"] },
      { heading: "Distingue un fallo de interpretación de un anuncio retirado", paragraphs: [
        "Si la página del mercado abre y muestra el artículo esperado, la fuente sigue disponible aunque el formulario no pueda interpretarla. Copia la URL canónica o de compartir de esa página, elimina únicamente envoltorios evidentes de aplicaciones cuando el identificador permanezca igual y vuelve a enviarla. Compara el título generado, la primera imagen y las opciones con el original antes de continuar.",
        "Si la propia página del vendedor indica que el artículo no está disponible, limpiar la URL no repone existencias. Guarda nombre del vendedor, texto del producto, imágenes clave, especificaciones y variantes. Esas pistas permiten buscar de nuevo, pero no hacen equivalente cualquier sustituto. Considera cada anuncio nuevo como un candidato independiente, con sus condiciones y pruebas.",
      ] },
      { heading: "Recupera enlaces de Taobao sin perder la identidad", paragraphs: [
        "En un registro de Taobao, busca el identificador estable en la página abierta o en su URL. Un enlace móvil puede pasar por varias redirecciones: deja que termine y copia el destino desde el navegador. Confirma que título, tienda, imágenes y opciones coincidan con la hoja de cálculo. Una foto principal idéntica es una prueba débil, porque distintos vendedores reutilizan imágenes de catálogo.",
        "Antes de pegar el enlace recuperado, escribe la selección prevista: color o estilo, talla, cantidad, personalización y texto original de la opción. Si el precio antiguo difiere, decide usando el importe vigente. El precio de una hoja desactualizada aporta contexto histórico; no obliga al vendedor a mantenerlo.",
      ] },
      { heading: "Comprueba juntos el vendedor y la variante en Weidian", paragraphs: [
        "Un enlace de Weidian resulta más fiable cuando conserva tanto la página del artículo como la identidad del vendedor. Si se abre dentro de una aplicación, utiliza la opción de abrir en navegador y guarda el identificador. Contrasta tienda, título, orden de la galería, etiquetas de opciones y datos de talla. Si alguno contradice el registro anterior, no lo consideres el mismo anuncio sin resolver la diferencia.",
        "Algunos anuncios incluyen condiciones importantes dentro de imágenes o descripciones extensas. Guarda la tabla de medidas, nombre de versión o lote, condiciones de depósito y notas del vendedor antes de enviar el enlace. La vista previa puede resumir el anuncio y omitir condiciones. Una nota de pedido debe resolver ambigüedades, no repetir expresiones vagas como «igual que en la foto».",
      ] },
      { heading: "En 1688, cantidad y precio forman parte de la verificación", paragraphs: [
        "Una página recuperada de 1688 no está verificada hasta comprobar unidad de compra, cantidad mínima, combinación de SKU y tramo de precio aplicable. La página puede abrir correctamente mientras el precio aparente corresponde a un lote mayor, un componente o una especificación distinta. Registra la combinación exacta, no solo la cifra destacada.",
        "Si hay varios colores y tallas, comprueba si se pueden mezclar cantidades y si cada SKU sigue disponible. Cuando una condición no esté clara, no deduzcas la aceptación del vendedor únicamente a partir de la interfaz. Envía una solicitud precisa o pausa el pedido hasta que el registro actual explique cómo se tramitará la combinación deseada.",
      ], bullets: ["Unidad de compra", "Cantidad mínima", "Combinación exacta de SKU", "Tramo de precio aplicable", "Envío nacional mostrado actualmente"] },
      { heading: "Usa la búsqueda para recuperar candidatos, no para demostrar equivalencia", paragraphs: [
        "Si el original ha desaparecido, busca siguiendo una escala de pruebas. Empieza por una frase distintiva del título o un código de modelo; añade material, dimensiones, color, vendedor o una etiqueta de opción inusual. La búsqueda por imagen genera candidatos cuando las palabras fallan, pero sus resultados son solo un punto de descubrimiento. Abre varias páginas y compáralas campo por campo.",
        "Define qué debe coincidir y qué puede variar antes de elegir sustituto. En una prenda pueden ser esenciales la tabla de medidas, el tejido y la posición del estampado; vendedor, embalaje o precio podrían ser flexibles. En un recambio, dimensiones y conector pueden ser imprescindibles. Así evitas sustituir silenciosamente la identidad funcional por semejanza visual.",
      ] },
      { heading: "Valida el pedido interpretado antes del pago", paragraphs: [
        "Cuando LoloBuy acepte el enlace recuperado, compara el pedido creado con el anuncio vigente. Revisa producto, vendedor, variante, cantidad, importe, transporte dentro de China y cualquier nota que afecte al suministro. Si la traducción simplifica las opciones, conserva el texto original junto a tu explicación para poder reconstruir la solicitud.",
        "Una vista previa correcta no demuestra que el artículo físico coincidirá. Verifica la transferencia de datos, no el cumplimiento del vendedor. La descripción pública de LoloBuy menciona inspección y fotografías después de la llegada al almacén: compara ese registro posterior con las pruebas guardadas. Recuperación del enlace y control de calidad resuelven problemas diferentes.",
      ] },
      { heading: "Crea un registro útil de enlaces rotos", paragraphs: [
        "Mantén un historial compacto: URL anterior, mercado, identificador, última fecha visible, tipo de fallo, URL recuperada, campos coincidentes, cambios y decisión final. Es más útil que sobrescribir la celda antigua, porque explica por qué se aceptó o rechazó un sustituto y permite repetir la comprobación.",
        "Marca claramente el estado: activo y coincidente, activo pero modificado, problema de interpretación, retirado, candidato sustituto o sin resolver. Comprueba de nuevo justo antes de comprar: recuperar hoy una página no garantiza su disponibilidad mañana. Un registro cuidadoso convierte el enlace roto en una verificación controlada del producto.",
      ], links: [{ label: "Entender los gastos antes de volver a comprar", href: "/es/articles/lolobuy-fees-explained" }, { label: "Planificar el envío del pedido recuperado", href: "/es/guides/shipping" }] },
    ],
  },
  {
    slug: "lolobuy-image-search-guide",
    title: "Búsqueda por imagen para LoloBuy: encuentra un producto a partir de una foto sin adivinar",
    searchTitle: "LoloBuy: buscar productos por imagen y verificar coincidencias",
    shortTitle: "Encontrar un producto de LoloBuy desde una imagen",
    description: "Usa búsqueda inversa y pruebas del producto para localizar un anuncio, comparar candidatos y evitar comprar una coincidencia visual aproximada.",
    eyebrow: "DESCUBRIMIENTO POR IMÁGENES",
    published: "2026-09-15", updated: "2026-10-17", readingTime: "14 min de lectura",
    factCheckLine: "Comprobación original de la descripción pública de pedidos mediante enlaces y fotografías de almacén: 15 de septiembre de 2026. La búsqueda visual es un método editorial independiente; traducción revisada el 17 de octubre de 2026.",
    visual: { eyebrow: "DE LA FOTO AL REGISTRO VERIFICADO", title: "La imagen inicia la búsqueda; las especificaciones la completan.", caption: "La mejor coincidencia combina rasgos visibles, dimensiones, opciones, pruebas del vendedor y una página de origen activa.", items: [
      { label: "Preparar", text: "Recorta el producto conservando sus detalles distintivos." },
      { label: "Buscar", text: "Haz una búsqueda amplia y reúne varios candidatos." },
      { label: "Comparar", text: "Comprueba atributos que la foto no demuestra con fiabilidad." },
      { label: "Registrar", text: "Guarda enlace y variante exactos para el control posterior." },
    ] },
    sources: [
      { label: "Sitio público de LoloBuy — comprobación del 15 de septiembre de 2026", note: "Fuente primaria de pedidos mediante enlaces, inspección de almacén y fotografías para el usuario." },
      { label: "Anuncios vigentes de vendedores", note: "Los registros actuales determinan título, vendedor, opciones, especificaciones, precio y disponibilidad." },
      { label: "Método de búsqueda visual de Lolobuy Sheet", note: "El proceso de recorte, selección y comparación es un análisis editorial independiente." },
    ],
    intro: [
      "Una foto ayuda cuando no tienes un enlace válido, pero es una especificación de compra deficiente. La misma imagen de catálogo puede aparecer en páginas de varios vendedores; versiones casi idénticas pueden tener otros materiales o dimensiones, y una publicación recortada puede ocultar precisamente el detalle que distingue un modelo. La búsqueda visual debe producir una lista de candidatos, no un pedido inmediato.",
      "LoloBuy describe públicamente un proceso que comienza con un enlace de producto y después incorpora inspección y fotografías en almacén. La búsqueda por imagen ocurre antes: ayuda a localizar posibles páginas originales. Esta guía explica cómo pasar de una foto a un anuncio respaldado por pruebas, manteniendo visibles las incertidumbres de cada paso.",
    ],
    sections: [
      { heading: "Distingue lo que la imagen identifica de lo que no demuestra", paragraphs: [
        "Antes de buscar, enumera rasgos observables: silueta, distribución de paneles, forma de herrajes, número de bolsillos, posición del estampado, bloques de color y texto de modelo legible. Después apunta atributos ocultos o poco fiables: dimensiones exactas, composición, construcción interior, peso, accesorios incluidos, rendimiento y autenticidad. Ese límite evita atribuir a la imagen más de lo que muestra.",
        "Un código, etiqueta o marca del embalaje puede ayudar, pero léelo con cautela. Baja resolución, imágenes invertidas o textos decorativos generan términos falsos. Conserva la imagen original, anota las observaciones por separado y registra letras dudosas con alternativas en lugar de corregirlas hasta formar la frase que esperabas.",
      ], bullets: ["Forma y distribución observables", "Texto legible o pistas del modelo", "Especificaciones ocultas necesarias", "Detalles que podrían deberse a luz o compresión"] },
      { heading: "Prepara varios recortes para buscar", paragraphs: [
        "Crea un recorte del producto completo que elimine bordes, textos sociales y objetos ajenos sin perder la silueta. Añade otro centrado en el rasgo constructivo más distintivo: cierre, dibujo de suela, bolsillos o gráfico. Un tercero puede conservar una etiqueta o código legible. Cada recorte prueba una hipótesis distinta en vez de repetir una búsqueda débil.",
        "Evita recortar únicamente un logotipo. Suele devolver páginas de marcas y productos visualmente similares que no comparten construcción. Tampoco amplíes una imagen pequeña hasta confundir artefactos del enfoque con costuras o letras reales. Los buscadores admiten imágenes imperfectas; tu tarea es no añadir pruebas falsas.",
      ] },
      { heading: "Reúne candidatos antes de escoger un anuncio", paragraphs: [
        "Busca primero con la imagen completa y abre varios resultados plausibles. Registra mercado, vendedor, título, conjunto actual de imágenes y URL. Prueba después los recortes de detalle para comprobar si reaparecen los mismos candidatos. Esa repetición es una pista útil, pero no demuestra que todas las páginas vendan el mismo lote, material, tallas o accesorios.",
        "Conserva al menos tres candidatos cuando sea posible. Un único resultado favorece el sesgo de confirmación: todos los detalles ambiguos empiezan a parecer coincidencias. La comparación hace visibles las diferencias, especialmente cuando un vendedor solo aporta fotos de catálogo y otro incluye medidas, imágenes de cada variante o detalles del embalaje.",
      ] },
      { heading: "Convierte la imagen en consultas de texto", paragraphs: [
        "Los resultados visuales suelen revelar vocabulario ausente en la foto original. Extrae términos neutrales: tipo de prenda, corte, descripción del material, código, dibujo, cierre y dimensiones. Combina dos o tres pistas distintivas sin copiar un título publicitario completo. Busca la frase exacta y una versión abreviada para no perder resultados por cambios de redacción.",
        "Usa las palabras del vendedor como pistas, no como especificaciones verificadas. Si un resultado llama impermeable a una chaqueta, de piel a un bolso o atribuye un modelo a unas zapatillas, localiza el respaldo en descripción y opciones. El fragmento del buscador puede estar desactualizado o incompleto. Evalúa el anuncio abierto.",
      ] },
      { heading: "Compara candidatos mediante una matriz de identidad", paragraphs: [
        "Crea filas para silueta, costuras, herrajes, etiquetas, gráficos, dimensiones, material, tallas, accesorios, vendedor y condiciones del precio. Marca cada candidato como coincidente, diferente o desconocido. Desconocido no significa descartado: señala la información pendiente. Una página con menos contradicciones puede ser mejor que la de la foto principal más parecida.",
        "Da más peso a la función que al parecido decorativo. En calzado, el método de talla y la construcción de suela pueden importar más que el color. En bolsos, dimensiones, anclajes de correas y compartimentos pueden pesar más que una vista frontal. En electrónica o recambios, conector, voltaje y compatibilidad deben prevalecer sobre cualquier semejanza estética.",
      ], bullets: ["Coincide", "Es diferente", "No se muestra", "Necesita aclaración del vendedor o del pedido"] },
      { heading: "Comprueba que la variante elegida corresponde a la foto", paragraphs: [
        "Una misma URL puede reunir productos distintos. Selecciona color, talla, estilo y conjunto previstos y observa si cambian imagen, precio y disponibilidad. El importe mínimo puede corresponder a un depósito, accesorio o versión pequeña. Guarda el texto original de la opción y una explicación breve de lo que esperas recibir.",
        "Si ninguna opción coincide claramente con la foto, no envíes una nota genérica pidiendo la versión fotografiada. Identifica la contradicción y solicita aclaración. Una instrucción vaga incorpora tu suposición al pedido y deja al comprador o al vendedor la posibilidad de interpretarla de otra manera.",
      ] },
      { heading: "Envía un enlace verificado y conserva la comparación", paragraphs: [
        "Cuando un candidato supere la matriz, pega su enlace vigente en el proceso de pedido actual. Contrasta el resumen generado con la página del vendedor y la opción guardada. La descripción de LoloBuy respalda los pedidos mediante enlaces, pero la transferencia necesita revisión humana. Guarda los otros candidatos por si la página elegida cambia o desaparece.",
        "Captura la página, selección de opción, tabla de medidas, imágenes decisivas y fecha. Esas pruebas ofrecen una referencia justa para las futuras fotografías de almacén. Sin ellas, el control de calidad depende de la memoria y una edición del anuncio puede impedir reconstruir lo que esperabas.",
      ] },
      { heading: "Usa las fotos de almacén para verificar la llegada", paragraphs: [
        "Al llegar el artículo al almacén, compara tipo, color, talla etiquetada, cantidad, componentes incluidos y estado visible con el registro guardado. Revisa los detalles distintivos que motivaron la selección. Si no se ve una zona crítica, define el ángulo o la medida necesarios y consulta las opciones actuales del pedido, sin asumir que las pruebas adicionales sean automáticas o gratuitas.",
        "Las fotos de almacén no demuestran retrospectivamente que el resultado procediera del vendedor original ni que las especificaciones ocultas sean correctas. Documentan lo recibido del pedido elegido. Separa la confianza de la búsqueda de las pruebas de recepción y pausa la decisión si queda una diferencia importante sin resolver.",
      ], links: [{ label: "Solicitar fotografías y medidas útiles", href: "/es/articles/lolobuy-extra-qc-photos-measurements" }, { label: "Revisar los gastos de la compra", href: "/es/articles/lolobuy-fees-explained" }] },
    ],
  },
  {
    slug: "lolobuy-order-status-guide",
    title: "Estados de pedido de LoloBuy: compra, envío del vendedor, almacén y expedición",
    searchTitle: "Estados LoloBuy: comprado, enviado, almacenado y expedido",
    shortTitle: "Entender cada estado de un pedido de LoloBuy",
    description: "Interpreta los estados de pedido y paquete de LoloBuy, identifica quién controla el siguiente paso y reúne pruebas útiles antes de comunicar un retraso.",
    eyebrow: "DIAGNÓSTICO DEL ESTADO",
    published: "2026-09-15", updated: "2026-10-17", readingTime: "14 min de lectura",
    factCheckLine: "Comprobación original de las descripciones públicas de compra, inspección, fotografías, almacenamiento y envío: 15 de septiembre de 2026. Revisión editorial del 17 de octubre de 2026: consulta el plazo actual de cada artículo; no se afirma una duración universal de almacenamiento.",
    visual: { eyebrow: "UN PEDIDO, CUATRO ETAPAS", title: "Identifica la etapa antes de interpretar el retraso.", caption: "La preparación del vendedor, el almacén, el paquete y el transporte tienen responsables y pruebas diferentes.", items: [
      { label: "Compra", text: "Registro del pedido, variante, pago y acción del vendedor." },
      { label: "Entrada", text: "Trayecto nacional desde el vendedor hasta el almacén." },
      { label: "Almacén", text: "Recepción, inspección, fotografías y decisiones pendientes." },
      { label: "Paquete", text: "Embalaje, salida, escaneos y entrega en destino." },
    ] },
    sources: [
      { label: "Sitio público de LoloBuy — comprobación original del 15 de septiembre de 2026", note: "Fuente primaria del proceso general de compra, inspección, fotografías, almacenamiento y envío internacional. El plazo aplicable debe comprobarse en el registro actual de cada artículo." },
      { label: "Registros actuales de pedidos y paquetes", note: "La etiqueta, fecha, acción disponible y respuesta de asistencia del pedido concreto determinan su situación." },
      { label: "Método de etapas y responsables de Lolobuy Sheet", note: "La matriz de diagnóstico es orientación editorial independiente, no un plazo de servicio prometido." },
    ],
    intro: [
      "Una etiqueta de estado solo es útil si se vincula a una etapa, una fecha y un responsable. «Enviado por el vendedor» no significa que el paquete internacional haya salido de China; «almacenado» no significa que lo hayas aprobado, y tener un número de seguimiento no siempre implica que exista un primer escaneo físico. Tratar todo el recorrido como un único plazo genera falsas alarmas y decisiones tardías.",
      "El sitio público de LoloBuy describe compra, inspección y fotografías en almacén, almacenamiento y envío internacional. No publica un plazo universal para cada estado. Comprueba la fecha límite vigente de cada artículo en tu cuenta. Esta guía se centra en las pruebas: qué representa normalmente cada etapa, qué revisar y qué información vuelve útil una solicitud de asistencia.",
    ],
    sections: [
      { heading: "Construye una cronología antes de investigar un bloqueo", paragraphs: [
        "Anota etiqueta exacta, número de pedido, última fecha, estado anterior y cualquier nota visible. Separa pedidos de compra y registros de paquetes, porque pueden usar identificadores diferentes. Si una compra agrupa varios artículos, sigue cada uno por separado: el retraso de un vendedor no describe necesariamente el resto del conjunto.",
        "Utiliza una zona horaria coherente y guarda capturas solo cuando aporten pruebas. La cronología debe explicar qué cambió y cuándo, no acumular pantallas idénticas. Incluye las acciones que completaste: pago, confirmación de variante, decisión de QC o solicitud de paquete. Un paso pendiente del comprador puede parecer un retraso de tramitación.",
      ], bullets: ["Estado y fecha exactos", "Identificador del pedido o paquete", "Última acción completada por el comprador", "Advertencia o información solicitada", "Próxima prueba esperada, sin inventar plazos"] },
      { heading: "Interpreta la compra como una etapa del pedido al vendedor", paragraphs: [
        "Los estados de compra o adquisición corresponden al período anterior al envío del vendedor. Comprueba que el pago esté registrado, que el anuncio siga activo y que color, talla, versión y cantidad sean inequívocos. Si la página cambió después del envío del pedido, conserva tanto las pruebas originales como la página actual; no supongas que todos ven lo mismo que viste tú.",
        "Una consulta útil es concreta: si se ha cursado la compra original, si falta confirmación del vendedor o si el artículo requiere una aclaración tuya. No pidas seguimiento internacional en esta etapa. El paquete aún no existe y debe resolverse la disponibilidad del vendedor antes de que aparezcan pruebas del almacén.",
      ] },
      { heading: "Interpreta el envío del vendedor como transporte nacional", paragraphs: [
        "La etiqueta de envío del vendedor suele referirse al recorrido hasta el almacén receptor, no a la ruta internacional. Busca una referencia de seguimiento nacional o una nota de salida si el pedido las ofrece. La siguiente prueba significativa es la recepción en almacén, no un escaneo en tu país. Mantén esa distinción al determinar dónde está el artículo.",
        "Si el estado no cambia, compara la fecha de salida con el último evento nacional y revisa si solo se creó un número sin aceptación del transportista. No inventes un umbral para declararlo perdido. Solicita confirmación del evento más reciente, de la dirección receptora o de la gestión con el vendedor según los datos disponibles.",
      ] },
      { heading: "Separa recepción en almacén y aprobación del QC", paragraphs: [
        "LoloBuy indica públicamente que las llegadas al almacén se inspeccionan y fotografían. Por eso una recepción puede preceder a las imágenes completas o a la disponibilidad final en inventario. Comprueba que llegaron todas las unidades, si queda inspección pendiente y si alguna incidencia requiere tu intervención. No apruebes el artículo solo porque el almacén lo recibió.",
        "Cuando aparezcan las fotos, compara identidad, variante, cantidad, estado visible y medidas necesarias con el pedido guardado. Registra las diferencias importantes mientras sigan disponibles las acciones del almacén. La página pública no establece un plazo de devolución universal: la fecha mostrada en el pedido y la respuesta actual de asistencia deben guiar la actuación.",
      ] },
      { heading: "Almacenado significa disponible, no perfecto", paragraphs: [
        "Almacenado indica que el artículo llegó a esa etapa y normalmente puede incorporarse después a una decisión de envío. No demuestra que talla, color, estado o anuncio coincidan con tus expectativas. Consulta la fecha de entrada y la fecha límite vigentes para cada artículo; un período de almacenamiento no equivale a un derecho de devolución del mismo tiempo ni garantiza todas las acciones hasta el final.",
        "Registra la fecha de almacén y los problemas pendientes de cada unidad. En un conjunto de compras, el artículo más antiguo puede condicionar la planificación aunque otros acaben de llegar. Resuelve las dudas de QC antes de centrarte en la consolidación: preparar un paquete transforma artículos separados en una decisión conjunta de transporte.",
      ] },
      { heading: "Distingue solicitud, embalaje y expedición del paquete", paragraphs: [
        "Crear la solicitud de paquete, recibir su peso embalado y pagar el transporte internacional son eventos distintos. Verifica artículos incluidos, destino, embalaje, rutas aptas, dimensiones, peso facturable e importe en el momento en que cada dato esté disponible. Una estimación anterior al embalaje no debe tratarse como el registro definitivo del envío.",
        "El número de seguimiento puede asignarse antes de la primera aceptación física del transportista. Diferencia la creación de etiqueta de la entrega real. Guarda número de paquete, ruta, fecha de pago y primer escaneo cuando aparezca. Así delimitas claramente la preparación del almacén y la responsabilidad del transportista.",
      ], bullets: ["Solicitud de paquete enviada", "Datos del paquete embalado disponibles", "Transporte pagado", "Entrega o primer escaneo", "Eventos de la red de destino"] },
      { heading: "Investiga el seguimiento desde el último evento físico", paragraphs: [
        "Lee texto, ubicación, fecha y fuente del último escaneo. Una notificación electrónica repetida no equivale a salida de exportación, presentación aduanera, llegada al destino o intento de entrega. Cuando sea posible, consulta el mismo identificador en la página del transportista: un agregador puede actualizar tarde o simplificar los eventos.",
        "No cuentes desde la compra del producto para investigar el transporte internacional. Parte de la entrega relevante o del primer escaneo físico y determina quién controla la etapa actual. Las estimaciones de una ruta no son garantías universales; esta guía no inventa un número de días sin novedades que demuestre una pérdida.",
      ] },
      { heading: "Escala la incidencia con pruebas de la etapa concreta", paragraphs: [
        "Una solicitud sólida identifica un registro, un último evento y una aclaración deseada. Por ejemplo: confirmar si se cursó la compra, verificar la entrega al transportista nacional, explicar una incidencia de almacén o comprobar si el paquete llegó al operador internacional. Adjunta solo el anuncio, línea del pedido, imagen de QC o evento que respalde esa consulta.",
        "Completa la cronología con respuesta, nueva fecha, acción indicada y próximo momento de revisión. Si cambia el estado, conserva las pruebas anteriores. Este método facilita detectar retrasos reales y evita atribuir al vendedor, al almacén o al transportista tareas que corresponden a otra etapa.",
      ], links: [{ label: "Preparar el envío internacional", href: "/es/guides/shipping" }, { label: "Separar los dos pagos del pedido", href: "/es/articles/lolobuy-payment-guide" }] },
    ],
  },
  {
    slug: "lolobuy-fees-explained",
    title: "Gastos de LoloBuy en 2026: producto, transporte nacional y envío internacional",
    searchTitle: "Gastos LoloBuy 2026: precio, pagos y envío internacional",
    shortTitle: "Entender las distintas capas de gastos de LoloBuy",
    description: "Desglosa los gastos de un pedido de LoloBuy, separa importes confirmados de estimaciones y compara totales sin inventar porcentajes fijos de comisión.",
    eyebrow: "DESGLOSE DE COSTES",
    published: "2026-09-15", updated: "2026-10-17", readingTime: "15 min de lectura",
    factCheckLine: "Comprobación original del sitio público y de la descripción oficial de la aplicación: 15 de septiembre de 2026. Revisión editorial del 17 de octubre de 2026; no se publican comisiones o tipos de cambio fijos sin verificar.",
    visual: { eyebrow: "REGISTRO DE GASTOS", title: "Separa cada cargo antes de comparar el total.", caption: "La compra y el transporte internacional ocurren en etapas distintas: un precio destacado no representa el coste completo.", items: [
      { label: "Origen", text: "Precio del artículo, cantidad y transporte dentro de China." },
      { label: "Pago", text: "Moneda mostrada, conversión e importe a pagar." },
      { label: "Almacén", text: "Únicamente servicios actuales elegidos o ajustes confirmados." },
      { label: "Paquete", text: "Dimensiones, ruta, protección y costes en destino." },
    ] },
    sources: [
      { label: "Sitio público de LoloBuy — comprobación del 15 de septiembre de 2026", note: "Fuente primaria de las etapas de pedido, almacén y transporte internacional; no proporciona una tabla pública universal de tarifas." },
      { label: "Ficha oficial de la aplicación LoloBuy — comprobación del 15 de septiembre de 2026", note: "Su descripción menciona pagos seguros, varios idiomas y monedas y transporte internacional, sin especificar todos los cargos." },
      { label: "Pantallas actuales de pedido, pago y paquete", note: "El importe exigible y las condiciones mostradas para la transacción concreta son las pruebas que determinan el coste." },
      { label: "Método de registro de costes de Lolobuy Sheet", note: "La hoja de registro y las reglas de comparación son análisis editorial independiente." },
    ],
    intro: [
      "La expresión «gastos de LoloBuy» suele agrupar transacciones distintas. Primero puedes ver el precio del vendedor, después un total en otra moneda, más tarde opciones del almacén y, solo cuando existe información de embalaje, la cotización internacional. Sumar estas etapas prematuramente produce una cifra aparentemente precisa que todavía no está completa.",
      "El sitio público de LoloBuy describe compra, inspección y fotografías en almacén, almacenamiento y transporte internacional. La ficha pública de su aplicación también menciona pagos y varias monedas. Ninguna de esas descripciones ofrece un porcentaje permanente válido para todos los pedidos. Conviene usar un registro que distinga importes confirmados, estimados y desconocidos.",
    ],
    sections: [
      { heading: "Empieza por la combinación exacta del pedido original", paragraphs: [
        "Anota el precio vigente de la variante elegida, el número de unidades y el transporte dentro de China que muestre el vendedor. No uses el precio mínimo del anuncio antes de seleccionar talla, color, conjunto o tramo de cantidad. En páginas con múltiples opciones, el primer importe puede corresponder a un depósito, accesorio o especificación menor.",
        "Guarda moneda del vendedor y fecha junto a cada valor. Si el anuncio cambia, conserva el importe utilizado al crear el pedido y compáralo con los ajustes posteriores. El precio de una hoja de cálculo es una pista de descubrimiento, no un presupuesto garantizado, y nunca debe sustituir silenciosamente al registro real de la compra.",
      ], bullets: ["Precio unitario de la opción elegida", "Cantidad", "Transporte dentro de China", "Moneda del vendedor y fecha", "Ajuste o confirmación del vendedor"] },
      { heading: "Distingue cargos del vendedor y cargos de la plataforma", paragraphs: [
        "El precio del producto y la entrega nacional proceden de la operación de origen. Una plataforma puede mostrar gastos de servicio, procesamiento, pago u opciones adicionales, pero debes leerlos en el pago actual, sin copiarlos de otro agente o una promoción antigua. Asigna a cada línea visible una fila y conserva su nombre exacto.",
        "Si no aparece una comisión de servicio separada, no concluyas que todo es gratuito. El total puede incorporar precios o conversión de otro modo y las etapas posteriores pueden tener gastos propios. Tampoco inventes un porcentaje oculto simplemente porque el total convertido difiera de un cálculo con el tipo de cambio de mercado.",
      ] },
      { heading: "Observa la conversión en la pantalla de pago", paragraphs: [
        "Cuando las monedas del vendedor y del pago difieran, guarda subtotal original, importe convertido mostrado, hora e importe finalmente cargado por el medio de pago. Compara datos del mismo momento. Los cambios fluctúan y una tarjeta o cartera puede aplicar condiciones de conversión o transfronterizas fuera del total mostrado por la plataforma.",
        "Utiliza la relación entre importes como tipo efectivo observado, no como prueba de un recargo permanente. Una operación puede incluir redondeo, cargos del medio de pago, cupones o ajustes. Etiqueta el resultado con método y fecha para que una observación temporal no termine convertida en una supuesta norma de la plataforma.",
      ] },
      { heading: "Mantén condicionados los servicios opcionales del almacén", paragraphs: [
        "LoloBuy confirma públicamente inspección y fotografías, pero su página principal no ofrece un catálogo completo y permanente de precios para fotos adicionales, medidas, vídeos, embalajes u otros servicios. Incluye un coste de almacén solo cuando el pedido actual lo ofrezca, lo selecciones y muestre el importe a pagar.",
        "Relaciona cada servicio con una decisión. Una medida adicional puede aclarar el ajuste de una prenda; un ángulo concreto puede resolver un posible defecto. Pedir pruebas genéricas puede añadir costes sin responder a la duda. Registra tanto el importe como la incertidumbre que pretendes resolver.",
      ] },
      { heading: "Estima el transporte internacional sin presentarlo como definitivo", paragraphs: [
        "Antes de embalar, puedes disponer de pesos de productos, dimensiones del vendedor o promedios de categoría. Trátalos como rangos. El transporte internacional puede depender de destino, ruta, peso real y volumétrico, dimensiones embaladas, restricciones y tarifas vigentes. Una cifra universal por kilogramo omite variables que suelen modificar el resultado.",
        "Planifica un escenario bajo, uno de trabajo y uno alto. Sustituye estimaciones por datos del paquete preparado en cuanto existan. Registra qué peso factura la ruta, qué protección o embalaje seleccionas y si el importe excluye impuestos de destino, gestión aduanera, entrega remota u otros cargos locales.",
      ], bullets: ["Peso estimado de los artículos", "Volumen previsto del embalaje", "Ruta apta comprobada posteriormente", "Peso facturable definitivo", "Conceptos excluidos de la cotización"], links: [{ label: "Guía de planificación del envío", href: "/es/guides/shipping" }] },
      { heading: "Compara consolidar y dividir por el resultado completo", paragraphs: [
        "Un paquete único puede evitar cargos básicos repetidos, pero uno grande o irregular puede aumentar el peso volumétrico o eliminar rutas disponibles. Dividir puede aislar artículos restringidos o frágiles, aunque duplique embalajes y mínimos. No decidas solo por el número de artículos: compara escenarios para el destino y contenido reales.",
        "Escribe el motivo de cada división: ruta apta, plazo de almacén, concentración de valor, fragilidad o tamaño. Si no existe una restricción práctica, comprueba la opción conjunta. Si un artículo cambia la ruta o las dimensiones de todo el envío, compáralo aparte. La línea más barata no siempre produce el coste total más bajo.",
      ] },
      { heading: "Trata los cupones como descuentos, no como precios habituales", paragraphs: [
        "Añade un cupón como fila negativa únicamente cuando el pago actual lo acepte y muestre el total reducido. Guarda de forma privada su código o nombre, alcance, vencimiento mostrado y etapa de pedido o paquete en que se aplica. No publiques una promoción antigua como regla permanente de tarifas.",
        "Compara importes antes y después del descuento. Un cupón llamativo puede exigir un mínimo, determinadas rutas o pertenecer a un grupo de cuentas. Importa el pago neto, no la cifra publicitaria. Presupuesta pedidos futuros sin dar por hecho que volverá la misma oferta.",
      ] },
      { heading: "Cierra el registro separando confirmado y estimado", paragraphs: [
        "Usa columnas de etapa, concepto, importe, moneda, estado, prueba y fecha. Marca como confirmado solo lo respaldado por un registro actual del vendedor, pedido, pago o paquete. Identifica como estimados el transporte preliminar y los cargos de destino; los servicios desconocidos deben figurar como desconocidos, no como cero. Obtendrás un rango honesto antes del envío y un total comprobable después.",
        "Para comparar, calcula por separado producto, costes dentro de China, total de pago, servicios del almacén, paquete internacional y costes de destino. Divide por unidades útiles solo cuando ayude a decidir. Un artículo barato y voluminoso puede tener un coste final mayor que otro compacto más caro. El registro debe orientar futuras compras y explicar la actual.",
      ], links: [{ label: "Cómo documentar cada pago", href: "/es/articles/lolobuy-payment-guide" }, { label: "Revisar restricciones antes de consolidar", href: "/es/articles/lolobuy-restricted-items-shipping-routes" }] },
    ],
  },
  {
    slug: "lolobuy-payment-guide",
    title: "Guía de pagos de LoloBuy: primera compra, ajustes y pago del envío internacional",
    searchTitle: "Pagos LoloBuy: compra, ajustes y transporte internacional",
    shortTitle: "Planificar las dos etapas de pago de LoloBuy",
    description: "Separa el pago de los productos del transporte internacional posterior, verifica monedas y ajustes y conserva un registro respaldado por pruebas.",
    eyebrow: "PROCESO DE PAGO",
    published: "2026-09-15", updated: "2026-10-17", readingTime: "14 min de lectura",
    factCheckLine: "Comprobación original de las descripciones públicas de compra y transporte y de la ficha oficial de la aplicación: 15 de septiembre de 2026. Traducción y revisión editorial: 17 de octubre de 2026; no es una nueva prueba de transacción.",
    visual: { eyebrow: "DOS DECISIONES, DOS TOTALES", title: "El primer pago no representa el coste final en destino.", caption: "La compra inicial financia el pedido al vendedor; la decisión posterior utiliza las pruebas del almacén y del paquete embalado.", items: [
      { label: "Pedir", text: "Confirma fuente, variante, cantidad e importe en China." },
      { label: "Conciliar", text: "Registra cambios del vendedor, devoluciones y ajustes de saldo." },
      { label: "Preparar", text: "Revisa inventario, datos de embalaje y rutas disponibles." },
      { label: "Enviar", text: "Paga el total actual del paquete tras las comprobaciones finales." },
    ] },
    sources: [
      { label: "Sitio público de LoloBuy — comprobación del 15 de septiembre de 2026", note: "Fuente primaria de las etapas separadas de compra mediante enlace, gestión de almacén y transporte internacional." },
      { label: "Ficha oficial de la aplicación LoloBuy — comprobación del 15 de septiembre de 2026", note: "La descripción menciona pagos seguros, varios idiomas y monedas, sin enumerar todos los métodos ni cargos." },
      { label: "Pago actual y registros de transacciones", note: "Métodos disponibles, importes, moneda, estado, reembolsos y ajustes deben comprobarse en la cuenta actual." },
      { label: "Método de control de pagos de Lolobuy Sheet", note: "Los pasos de conciliación son orientación editorial independiente." },
    ],
    intro: [
      "Comprar a través de fronteras suele implicar más de una decisión de pago. La primera financia la compra al vendedor y el transporte dentro de China. Otra posterior puede cubrir el paquete internacional preparado después de recepción, inspección y embalaje. Llamar a ambas simplemente «el pago de LoloBuy» facilita confundir el subtotal del producto con el coste completo o pagar sin revisar la etapa.",
      "El sitio público de LoloBuy describe pedidos mediante enlaces, inspección de almacén, fotografías, almacenamiento y transporte internacional. La ficha oficial menciona pagos seguros y varias monedas, pero no proporciona una lista permanente de métodos, cargos o plazos de reembolso. Esta guía explica cómo verificar la transacción vigente sin prometer condiciones que pueden cambiar.",
    ],
    sections: [
      { heading: "Identifica exactamente qué cubre el primer pago", paragraphs: [
        "Antes de pagar, contrasta URL de origen, vendedor, color, talla o versión, cantidad, importe y entrega dentro de China. Revisa las notas que afecten a lo que debe comprarse. Si el anuncio tiene precios por cantidad o varios conjuntos, confirma qué combinación produjo el total y no te guíes por el importe mínimo destacado.",
        "Lee cada línea de la pantalla y registra la moneda. Subtotal original, conversión mostrada, cargo de pago, cupón y saldo de cartera son componentes diferentes. Documenta el primer pago como total de la etapa de compra, sin llamarlo coste definitivo de recibir los productos en otro país.",
      ], bullets: ["Referencia del pedido", "Variante y cantidad exactas", "Subtotal del vendedor", "Entrega o servicios visibles", "Moneda e importe final a pagar"] },
      { heading: "Verifica el medio de pago en tu cuenta actual", paragraphs: [
        "Utiliza únicamente un medio ofrecido por el pago actual para tu cuenta, moneda y operación. Un método mencionado en un vídeo antiguo, otro país u otra plataforma puede no estar disponible. Antes de autorizar, revisa destinatario, importe, moneda y referencia; vuelve al pedido mediante un marcador fiable, no mediante un mensaje no solicitado.",
        "La aplicación oficial utiliza la expresión pagos seguros, pero esa afirmación general no elimina la necesidad de proteger credenciales y revisar la operación. Nunca envíes contraseña, datos completos de tarjeta ni código de verificación de un solo uso a quien afirme necesitar completar el pedido manualmente. Utiliza el pago autenticado y conserva su confirmación.",
      ] },
      { heading: "Compara conversiones con datos del mismo momento", paragraphs: [
        "Si difieren las monedas de origen y pago, guarda ambos importes a la vez. Compararlos horas después puede confundir fluctuaciones del mercado con condiciones de la plataforma o del proveedor de pagos. Comprueba también si tu tarjeta o cartera aplica su propia conversión: el cargo contabilizado puede diferir del importe mostrado antes de autorizar.",
        "No conviertas una relación observada en una afirmación permanente sobre recargos cambiarios. Redondeos, cupones, comisiones de pago y ajustes afectan al resultado. Registra el tipo efectivo como observación vinculada a fecha, método y transacción, y compara los pagos futuros con el mismo criterio.",
      ] },
      { heading: "Espera un resultado registrado antes de pagar otra vez", paragraphs: [
        "Después de autorizar, anota si la operación figura como completada, en proceso, fallida o revertida. Si se cierra el navegador o el pedido continúa sin pagar, revisa el historial y el registro del proveedor antes de repetir. Dos intentos pueden generar dos autorizaciones aunque inicialmente solo veas un pedido.",
        "Si el estado es incierto, facilita a asistencia referencia del pedido, hora, importe, moneda, método e identificador no sensible del recibo. Oculta números completos de cuenta y tarjeta. Pregunta si se recibió el pago y si hace falta otro intento; una anotación bancaria pendiente no demuestra por sí sola que el pedido esté financiado.",
      ] },
      { heading: "Concilia cambios del vendedor y movimientos de saldo", paragraphs: [
        "Tras enviar un pedido, el vendedor puede cambiar disponibilidad, transporte nacional o importe exacto. Considera cada solicitud adicional como una nueva decisión: compárala con el anuncio actual y confirma qué cambió. Registra también cancelaciones parciales, devoluciones del vendedor y abonos de cartera contra el pedido original, sin tratar el saldo como dinero inexplicable.",
        "La página pública no establece un tiempo universal de procesamiento de reembolsos. Utiliza el estado vigente y las respuestas de asistencia. Conserva fechas separadas para acción del vendedor, registro de la plataforma, abono de saldo y devolución al medio original: son eventos distintos que pueden ocurrir en momentos diferentes.",
      ] },
      { heading: "Prepara el segundo pago con pruebas del paquete embalado", paragraphs: [
        "El pago del transporte internacional se puede valorar adecuadamente cuando sabes qué artículos incluye, destino, dimensiones embaladas, peso facturable, rutas aptas y embalaje elegido. Una estimación inicial permite reservar presupuesto, pero no sustituye al total final. Revisa de nuevo artículos restringidos o frágiles antes de solicitar el paquete.",
        "Compara las condiciones de ruta que aparecen en ese momento, no una recomendación estática. Confirma si el importe incluye protección, seguro u otros extras seleccionados y si quedan fuera impuestos, aduanas o entrega local. Guarda la pantalla final antes del pago para disponer de una referencia clara ante dudas posteriores.",
      ], bullets: ["Artículos de almacén incluidos", "Dimensiones y peso facturable", "Destino y ruta disponible", "Servicios elegidos", "Exclusiones mostradas y total final"], links: [{ label: "Planificar el transporte internacional", href: "/es/guides/shipping" }] },
      { heading: "Evita suposiciones de última hora al pagar el paquete", paragraphs: [
        "Revisa la dirección del registro final: destinatario, código postal, región y formato de teléfono cuando se solicite. Contrástala con una fuente fiable, no con la memoria. Confirmar un pago no corrige un destino equivocado; una ruta elegida para otro país puede dejar de ser válida al cambiar la dirección.",
        "No pagues únicamente porque pasa el tiempo de almacenamiento. Consulta la fecha límite actual de cada artículo y las acciones todavía disponibles. Una condición general de almacenamiento no sustituye esos datos ni justifica enviar un problema de QC sin resolver. Antes de autorizar, resuelve diferencias importantes y revisa el artículo más antiguo.",
      ] },
      { heading: "Conserva un registro completo que proteja tus datos", paragraphs: [
        "Para cada transacción, registra etapa, referencia de pedido o paquete, importe, moneda, método, hora, estado y concepto cubierto. Vincula ajustes y reembolsos con esa fila. No guardes contraseñas, códigos de seguridad, números completos de tarjeta ni documentos de identidad innecesarios. Un recibo con datos sensibles ocultos basta para la mayoría de conciliaciones.",
        "Al terminar, suma pagos de compra, ajustes posteriores, servicios del almacén, transporte internacional y costes de destino; resta una sola vez los reembolsos o abonos confirmados. Así conectas lo que pagaste inicialmente con lo que acabó costando el pedido sin inventar una tarifa o regla cambiaria para toda la plataforma.",
      ], links: [{ label: "Desglosar todos los gastos de LoloBuy", href: "/es/articles/lolobuy-fees-explained" }, { label: "Documentar una devolución o reembolso", href: "/es/articles/lolobuy-return-refund-guide" }] },
    ],
  },
  {
    slug: "lolobuy-return-refund-guide",
    title: "Devoluciones y reembolsos en LoloBuy: qué comprobar antes del envío internacional",
    searchTitle: "Devolución y reembolso LoloBuy: pruebas y pasos antes del envío",
    shortTitle: "Gestionar una devolución de LoloBuy antes de enviar",
    description: "Prepara pruebas para solicitar una devolución o reembolso, separa incidencias del vendedor y del almacén y consulta las acciones actuales antes de enviar.",
    eyebrow: "PRUEBAS PARA DEVOLUCIONES",
    published: "2026-09-15", updated: "2026-10-17", readingTime: "15 min de lectura",
    factCheckLine: "Comprobación original de la descripción pública de inspección en almacén: 15 de septiembre de 2026. Revisión editorial del 17 de octubre de 2026; no se afirma un plazo universal de devolución, reembolso ni almacenamiento.",
    visual: { eyebrow: "EXPEDIENTE DE LA INCIDENCIA", title: "Relaciona pedido, pruebas, diferencia y solución solicitada.", caption: "Una solicitud resulta más fácil de valorar cuando muestra qué se pidió, qué llegó y por qué importa la diferencia.", items: [
      { label: "Esperado", text: "Anuncio guardado, variante, cantidad y condiciones del vendedor." },
      { label: "Observado", text: "Imagen de almacén, etiqueta, medida o componente ausente." },
      { label: "Diferencia", text: "Una descripción objetiva que conecte ambos registros." },
      { label: "Solicitud", text: "Una acción actual de devolución, cambio, aclaración o reembolso." },
    ] },
    sources: [
      { label: "Sitio público de LoloBuy — comprobación original del 15 de septiembre de 2026", note: "Fuente primaria de inspección, fotografías y almacenamiento; la página pública indexada no ofrece una política universal y completa de devoluciones." },
      { label: "Registros actuales del vendedor, pedido y asistencia", note: "Las condiciones vigentes del vendedor, el estado de almacén y las acciones de ese pedido determinan el caso." },
      { label: "Método de expediente de Lolobuy Sheet", note: "La organización de pruebas y los criterios de decisión son orientación editorial independiente." },
    ],
    intro: [
      "Conviene investigar un artículo incorrecto, defecto visible o pieza ausente antes de incorporarlo a un paquete internacional. En el almacén todavía puedes comparar el pedido original y sus fotografías dentro del mismo expediente. Después de la salida, el problema puede implicar más transporte, manipulación y pruebas de destino, lo que complica su solución.",
      "LoloBuy confirma públicamente inspección y fotografías de las llegadas al almacén. Su página pública indexada no publica un único plazo de devolución, tabla de gastos o tiempo de reembolso para todos los vendedores y pedidos. Comprueba también el vencimiento vigente del almacenamiento de cada artículo. Una guía útil enseña a encontrar la acción disponible y preparar un caso preciso sin prometer su resultado.",
    ],
    sections: [
      { heading: "Guarda lo que se pidió antes de evaluar el defecto", paragraphs: [
        "Conserva URL, vendedor, título, color, talla o versión, cantidad, imagen de opción, tabla de medidas, precio, transporte nacional y fecha. Incluye condiciones que afecten directamente a devoluciones o personalización. Si la página cambió, mantén las pruebas originales y la versión actual, sin reemplazar una por otra.",
        "Describe el artículo esperado en una frase neutral. Por ejemplo, indica talla y color seleccionados y cualquier pieza incluida. Así evitas que el análisis se desplace hacia otra variante mostrada en el anuncio. La referencia de comparación es el pedido, no la foto principal ni el recuerdo.",
      ], bullets: ["Anuncio de origen y vendedor", "Opción y cantidad exactas", "Descripción o tabla decisiva", "Referencia y fecha del pedido", "Condición relevante del vendedor"] },
      { heading: "Clasifica el problema según las pruebas necesarias", paragraphs: [
        "Los problemas de identidad incluyen producto, color, talla etiquetada, versión o cantidad incorrectos. Los de estado incluyen roturas, manchas, agujeros o herrajes ausentes. Las medidas requieren un método y puntos de referencia claros. Diferencias leves de color o forma deben interpretarse con prudencia: iluminación, compresión y ángulo pueden distorsionar la comparación.",
        "No afirmes que una fotografía demuestra composición oculta, comodidad, durabilidad, rendimiento electrónico o autenticidad. Si la reclamación depende de una propiedad no visible, identifica qué prueba actual y permitida podría comprobarla. Una solicitud basada en una conclusión fotográfica imposible es más débil que otra que reconoce honestamente sus límites.",
      ] },
      { heading: "Expresa la diferencia como una contradicción observable", paragraphs: [
        "Usa una estructura breve: el pedido indica X; la imagen o medida Y muestra Z; por ello, lo recibido parece presentar una diferencia importante. Identifica número de foto, etiqueta o extremos de la regla. Evita calificativos como terrible, falso o inaceptable cuando «etiqueta de talla incorrecta», «correa ausente» o «esquina agrietada» comunica mejor el problema.",
        "Si la prueba es ambigua, presenta la duda como tal. Una marca oscura puede ser mancha, sombra o compresión; una diferencia cromática puede deberse a la luz. Pide una vista que distinga esas explicaciones. No conviertas incertidumbre en prueba para que la reclamación parezca más contundente.",
      ] },
      { heading: "Consulta en el pedido la acción y el plazo actuales", paragraphs: [
        "Abre el pedido concreto y revisa estado, fecha de almacén, acción disponible de devolución o posventa, fecha límite y condiciones del vendedor. El plazo de almacenamiento no equivale al plazo de devolución. Custodia, aceptación del vendedor y tramitación de la plataforma son cuestiones distintas y pueden seguir calendarios diferentes.",
        "Si la interfaz no es clara, pregunta a asistencia qué acción está disponible y qué pruebas o costes requiere. Guarda la respuesta fechada. No adoptes un plazo, una promesa de devolución gratuita o un calendario de reembolso de otro agente, mercado o tutorial antiguo: podría no aplicarse a tu pedido.",
      ] },
      { heading: "Elige entre aclaración, pruebas, cambio y devolución", paragraphs: [
        "Solicita aclaración si el registro es ambiguo y pruebas concretas si un dato visible cambiará tu decisión. Considera un cambio solo cuando lo ofrezcan el vendedor y el pedido actual y puedas contrastar el sustituto con las mismas especificaciones. Considera devolver cuando la diferencia sea importante y exista esa acción.",
        "Compara incertidumbre, coste y tiempo mostrados para cada opción. Un cambio puede iniciar otro ciclo de envío y QC; una devolución puede implicar transporte nacional o deducciones; aceptar traslada el riesgo al envío internacional. Esta guía no elige por todos los compradores, pero permite mantener visibles las consecuencias de cada alternativa.",
      ], bullets: ["Aclarar el registro", "Pedir una comprobación que cambie la decisión", "Cambiar según las condiciones actuales", "Devolver según las condiciones actuales", "Aceptar dejando registrado el riesgo pendiente"] },
      { heading: "Envía un expediente que proteja tus datos", paragraphs: [
        "Incluye referencia de pedido, variante esperada, pruebas de almacén, una frase sobre la diferencia y solución solicitada. Aporta imágenes completas junto con un recorte marcado si el detalle es pequeño. Oculta datos ajenos al caso de dirección, pago e identidad. Un expediente enfocado permite revisar el problema sin recorrer todas las capturas de la compra.",
        "Mantén un tono factual y pide el siguiente evento observable: aprobación del vendedor, etiqueta o seguimiento de devolución, salida del almacén, pedido sustituto, registro de reembolso o abono. Un acuse de recibo de asistencia no equivale a una solución completada. Actualiza el expediente cuando aparezca un evento nuevo.",
      ] },
      { heading: "Sigue por separado la devolución física y el reembolso", paragraphs: [
        "El artículo devuelto puede pasar por preparación de almacén, transportista nacional, recepción y decisión del vendedor antes de que aparezca el reembolso. Registra cada evento e importe. Si se acepta solo parte de la reclamación o se aplica una deducción, compárala con las condiciones vigentes y pide una explicación vinculada al pedido.",
        "Un abono en el saldo de la plataforma y un reembolso al medio de pago original tienen destinos distintos. Anota dónde aparece el valor, en qué moneda y en qué fecha. La página pública no promete un plazo universal: sigue el estado real de la transacción sin contar hacia una fecha inventada.",
      ] },
      { heading: "Cierra la incidencia antes de construir el paquete", paragraphs: [
        "No incluyas el artículo en disputa mientras quede una diferencia importante o devolución pendiente. Confirma si se retiró, cambió, aceptó o reembolsó y actualiza el inventario. Revisa la fecha límite vigente del artículo más antiguo para que la incidencia no oculte otro problema de planificación del almacenamiento.",
        "Termina con un resumen del resultado: problema, pruebas, condiciones actuales, acción elegida, costes directos, importe reembolsado y fecha final. Ese registro ayuda a decidir mejor sobre productos y vendedores sin convertir un caso particular en una afirmación universal sobre las devoluciones de LoloBuy.",
      ], links: [{ label: "Conciliar pagos, abonos y devoluciones", href: "/es/articles/lolobuy-payment-guide" }, { label: "Planificar el envío tras resolver el QC", href: "/es/guides/shipping" }] },
    ],
  },
  {
    slug: "lolobuy-extra-qc-photos-measurements",
    title: "Cómo solicitar fotos y medidas adicionales de QC en LoloBuy que resuelvan una duda concreta",
    searchTitle: "Fotos QC LoloBuy: pedir imágenes y medidas adicionales útiles",
    shortTitle: "Solicitar fotos adicionales de QC útiles en LoloBuy",
    description: "Prepara una solicitud precisa de fotos o medidas de QC, define las pruebas necesarias y evita pagar por imágenes que no cambian la decisión.",
    eyebrow: "SOLICITUDES DE QC PRECISAS",
    published: "2026-09-15", updated: "2026-10-17", readingTime: "15 min de lectura",
    factCheckLine: "Comprobación original de la descripción pública de inspección y fotografías: 15 de septiembre de 2026. Revisión editorial del 17 de octubre de 2026; no se afirma una cantidad de fotos, tarifa o servicio de vídeo sin verificar.",
    visual: { eyebrow: "UNA DUDA POR IMAGEN", title: "Pide un resultado observable, no simplemente más fotos.", caption: "Una solicitud útil identifica artículo, vista, referencias y decisión que depende de la prueba.", items: [
      { label: "Duda", text: "Identifica la incertidumbre importante de las imágenes actuales." },
      { label: "Vista", text: "Especifica ángulo, distancia, luz o colocación de la regla." },
      { label: "Referencia", text: "Nombra etiquetas, bordes o puntos que deben verse." },
      { label: "Decisión", text: "Explica si la prueba determina talla, devolución o envío." },
    ] },
    sources: [
      { label: "Sitio público de LoloBuy — comprobación del 15 de septiembre de 2026", note: "Fuente primaria de la afirmación de que las llegadas al almacén se inspeccionan y fotografían." },
      { label: "Interfaz actual del pedido de almacén y asistencia", note: "La cuenta debe confirmar si existe la opción de foto, medida o vídeo, su coste y cuándo puede solicitarse." },
      { label: "Método de solicitud de pruebas de Lolobuy Sheet", note: "Los ejemplos y controles de medición son orientación editorial independiente." },
    ],
    intro: [
      "Las pruebas adicionales de QC son valiosas cuando resuelven una decisión específica. Resultan poco útiles si solo añaden otra fotografía general de las mismas superficies. Un comprador de calzado puede necesitar la plantilla extraíble medida de talón a punta; uno de bolsos, el ancho de la apertura; otro de ropa, el pecho entre costuras definidas. «Haz más fotos» no comunica ninguna de esas necesidades.",
      "LoloBuy declara públicamente que inspecciona y fotografía las llegadas al almacén. Su página pública indexada no especifica un número universal de fotos gratuitas, una tarifa de fotos adicionales ni servicios o precios de medidas y vídeo. Esta guía enseña a diseñar la solicitud y a confirmar disponibilidad y coste en el pedido vigente antes de contar con ella.",
    ],
    sections: [
      { heading: "Revisa las fotos existentes en un orden fijo", paragraphs: [
        "Empieza por la identidad: tipo de producto, color, talla etiquetada, versión, cantidad y piezas incluidas. Continúa con el estado: frente, reverso, laterales, esquinas, costuras, cierres y daños evidentes. Después examina detalles y medidas propios de la categoría. Un orden fijo evita que una pequeña preocupación estética oculte una variante equivocada o una pieza ausente.",
        "Clasifica cada punto como conocido, contradicho o no mostrado. No pidas otra imagen de un dato ya visible con resolución suficiente. La lista debe aislar solo carencias que puedan cambiar una decisión de aprobación, aclaración, cambio, devolución o envío.",
      ], bullets: ["Identidad y opción", "Cantidad y componentes incluidos", "Estado visible", "Medidas críticas", "Puntos decisivos ocultos o ambiguos"] },
      { heading: "Define la decisión antes de elegir el ángulo", paragraphs: [
        "Escribe qué harás ante cada resultado posible. Si la plantilla entra en tu rango aceptable, conservarás el calzado; si queda claramente fuera, consultarás la devolución disponible. Si una marca desaparece bajo luz uniforme, puede ser un efecto de la imagen; si permanece, documentarás el estado. Esto mantiene la solicitud proporcionada.",
        "No pidas al almacén que juzgue calidad subjetiva o autenticidad. Solicita pruebas observables: texto de etiqueta, lectura de regla, alineación de costuras, superficie del herraje, pieza ausente o ubicación del daño. La interpretación sigue siendo tuya y debe respetar los límites de una fotografía.",
      ] },
      { heading: "Redacta la solicitud con cuatro referencias", paragraphs: [
        "Una instrucción clara identifica pedido o artículo, cara o detalle necesario, encuadre y referencia. Por ejemplo: fotografiar juntas las etiquetas de talla de ambos zapatos, lo bastante cerca para leerlas completas e identificando izquierda y derecha. Para una esquina de bolso, pide una vista frontal con luz uniforme que incluya la esquina y la costura contigua.",
        "Evita expresiones relativas como «más cerca», «mejor» o «en el mismo sitio». La persona puede desconocer qué foto previa mencionas o qué detalle importa. Identifica el número de imagen y describe el cambio: encuadre más amplio, vista perpendicular, reverso, comparación con otra luz o regla alineada entre puntos concretos.",
      ] },
      { heading: "Controla el método para medir prendas", paragraphs: [
        "Indica que la prenda debe colocarse plana, sin estirar. Define extremos: ancho de pecho entre costuras de axila, hombros entre sus costuras, largo desde un punto concreto del cuello al bajo, manga desde la costura del hombro o cintura de extremo a extremo. No confundas contorno con ancho en plano.",
        "Compara el método del almacén con el de la tabla del vendedor y el de una prenda que te quede bien. Una pequeña diferencia puede deberse a tensión del tejido, costura elegida o regla. Define un rango aceptable antes de interpretar la foto. Si no se ven los extremos o la regla se dobla, la medición no respalda una conclusión precisa.",
      ] },
      { heading: "Controla el método para medir calzado", paragraphs: [
        "La talla etiquetada y el espacio interior del zapato son pruebas diferentes. Cuando sea posible, pide colocar la plantilla extraíble plana con una regla desde el borde del talón hasta la punta más larga. Si no se puede sacar, pregunta qué medida es viable en lugar de tratar la longitud exterior de la suela como espacio para el pie. Si sospechas un par desigual, fotografía juntas ambas etiquetas.",
        "Compara el resultado con la plantilla de un calzado que te quede bien y esté medida de la misma forma. No elijas solo mediante una tabla genérica de equivalencias. Horma, margen de dedos y construcción siguen influyendo: la imagen reduce incertidumbre sin garantizar comodidad.",
      ] },
      { heading: "Define vistas útiles de bolsos, accesorios y herrajes", paragraphs: [
        "En bolsos, indica dimensión y si es exterior: ancho de base o zona más ancha, altura sin asas, fondo de base, rango de correa o ancho de apertura. Pide que el cero de cinta o regla sea visible y permanezca en el mismo plano que el borde medido. La perspectiva puede exagerar el resultado.",
        "Para herrajes, solicita el componente completo y un detalle con luz uniforme. Un recorte macro aislado puede magnificar polvo, reflejos o pequeñas variaciones. En accesorios, incluye escala y anclajes. El objetivo es comprobar presencia, alineación e integridad visible, no crear una imagen dramática.",
      ] },
      { heading: "Confirma disponibilidad, precio y momento de la solicitud", paragraphs: [
        "Abre el pedido de almacén actual y comprueba si ofrece esa foto, medida o inspección. Confirma importe, moneda, gestión prevista y fechas límite relevantes para el artículo. La página pública no respalda publicar permanentemente una cantidad de fotos gratis o un precio de servicio adicional.",
        "Si la cuenta no ofrece la prueba, pregunta a asistencia qué alternativa observable existe. No supongas que hay servicio de vídeo o que una petición no publicada será gratuita. Decide si puedes aceptar la incertidumbre restante antes de que cambien las acciones disponibles de devolución o envío.",
      ], bullets: ["Servicio ofrecido actualmente", "Solicitud exacta aceptada", "Coste y moneda mostrados", "Fecha límite relevante del pedido", "Alternativa si no se puede obtener la prueba"] },
      { heading: "Evalúa el resultado con el criterio fijado al principio", paragraphs: [
        "Cuando llegue la nueva prueba, compárala con el umbral que escribiste. No rechaces una medida dentro de rango solo porque aparezca otro detalle menor, ni aceptes una diferencia importante por cansancio de esperar. Registra qué quedó resuelto y qué sigue desconocido.",
        "Guarda imágenes originales y adicionales con texto de solicitud, fecha y decisión final. El registro aclara una eventual devolución y mejora las notas de futuras compras. La mejor solicitud de QC no es la que acumula más imágenes, sino el conjunto mínimo que permite una decisión responsable.",
      ], links: [{ label: "Preparar pruebas para una devolución", href: "/es/articles/lolobuy-return-refund-guide" }, { label: "Registrar los servicios y gastos elegidos", href: "/es/articles/lolobuy-fees-explained" }] },
    ],
  },
  {
    slug: "lolobuy-restricted-items-shipping-routes",
    title: "Artículos restringidos y rutas de LoloBuy: comprobaciones antes de preparar un paquete",
    searchTitle: "LoloBuy: artículos restringidos y rutas de envío disponibles",
    shortTitle: "Comprobar restricciones antes del envío de LoloBuy",
    description: "Revisa restricciones antes de comprar, vuelve a comprobar el artículo en almacén y evita asumir que una misma ruta admite todos los productos y países.",
    eyebrow: "COMPATIBILIDAD DE RUTAS",
    published: "2026-09-15", updated: "2026-10-17", readingTime: "15 min de lectura",
    factCheckLine: "Comprobación original de las descripciones públicas de compra y transporte internacional: 15 de septiembre de 2026. Revisión editorial del 17 de octubre de 2026; la compatibilidad actual debe verificarse en el proceso del paquete real.",
    visual: { eyebrow: "TRES COMPROBACIONES", title: "Poder comprar no significa poder enviar por cualquier ruta.", caption: "Examina el producto antes de comprar, confirma el registro del almacén y utiliza las rutas ofrecidas para el paquete final.", items: [
      { label: "Producto", text: "Identifica material, componentes, batería, líquidos y descripción." },
      { label: "Destino", text: "Consulta las restricciones legales y del transportista vigentes." },
      { label: "Paquete", text: "Revisa clasificación final, medidas y combinación de artículos." },
      { label: "Ruta", text: "Escoge únicamente opciones actuales compatibles y sus condiciones." },
    ] },
    sources: [
      { label: "Sitio público de LoloBuy — comprobación del 15 de septiembre de 2026", note: "Fuente primaria de las etapas generales de compra y envío internacional; no proporciona una matriz pública permanente por artículo y ruta." },
      { label: "Descripción actual del vendedor y clasificación del pedido", note: "Materiales, componentes y declaraciones deben verificarse para la variante exacta elegida." },
      { label: "Interfaz actual del paquete y normas del destino", note: "Las rutas mostradas para destino y contenido reales determinan compatibilidad operativa; la normativa aplicable debe consultarse por separado." },
      { label: "Lista de tres comprobaciones de Lolobuy Sheet", note: "La secuencia es orientación editorial independiente y no una conclusión jurídica." },
    ],
    intro: [
      "Un vendedor chino puede tener disponible un producto que no resulte admisible en cierta ruta internacional. Baterías, líquidos, polvos, recipientes presurizados, imanes, materiales frágiles, alimentos, plantas, medicamentos, químicos, armas, productos sujetos a derechos de propiedad intelectual y otras categorías sensibles pueden tener condiciones distintas según transportista o destino. La regla depende del artículo, país, ruta y clasificación vigentes.",
      "LoloBuy describe públicamente compra en canales chinos y transporte internacional, pero su página indexada no publica una lista completa y permanente de artículos restringidos o rutas. Esta lista no declara legal un artículo ni garantiza su envío. Enseña a reunir datos antes de comprar y a comprobar la compatibilidad cuando aparezcan las opciones del paquete real.",
    ],
    sections: [
      { heading: "Describe el producto más allá de su nombre comercial", paragraphs: [
        "Escribe qué es físicamente, qué contiene y cómo se alimenta. «Dispositivo de belleza» resulta insuficiente si incluye batería de litio y cartucho líquido; «juguete» no explica imanes potentes, mecanismo de proyectil o transmisor de radio. Utiliza la variante elegida, porque otro conjunto de la misma URL puede incluir componentes diferentes.",
        "Registra materiales, tipo y capacidad de batería cuando se indiquen, volumen de líquido o polvo, presión, fuerza magnética documentada, partes cortantes, función inalámbrica, contenido alimentario o biológico y accesorios. Si falta un dato crítico, márcalo como desconocido y pide aclaración antes de pagar, sin adivinar a partir de la imagen.",
      ], bullets: ["SKU exacto seleccionado", "Materiales y contenido", "Alimentación o batería", "Líquido, polvo, aerosol o imán", "Uso regulado, con marca o sensible para la seguridad"] },
      { heading: "Separa aceptación de compra y admisibilidad del transporte", paragraphs: [
        "La descripción pública de compra no significa que cualquier enlace aceptado pueda viajar por todas las líneas. Compra, recepción en almacén, exportación, aceptación del transportista e importación en destino son filtros diferentes. Un pedido realizado correctamente nunca demuestra que después vaya a existir una ruta internacional adecuada.",
        "Consulta pronto las opciones cuando el artículo sea sensible o caro de devolver. Proporciona descripción exacta y destino, no solo una categoría genérica. Guarda respuesta, fecha y condiciones, reconociendo que la disponibilidad puede cambiar antes de preparar el paquete.",
      ] },
      { heading: "Consulta las reglas de destino en fuentes autorizadas", paragraphs: [
        "Compatibilidad con el transportista y legalidad en destino no son equivalentes. Una ruta visible no sustituye normas aduaneras, aéreas, postales, fiscales, de seguridad de producto o propiedad intelectual. Consulta la fuente oficial o del transportista aplicable al artículo exacto cuando la consecuencia sea relevante y busca asesoramiento profesional si la cuestión jurídica no está clara.",
        "Evita listas comunitarias que declaran países enteros seguros o inseguros para una categoría. Las reglas pueden depender de cantidad, valor, uso previsto, documentos y composición. Registra fuente, fecha y alcance de cada comprobación para no aplicar por error una regla de cosméticos a una batería o al revés.",
      ] },
      { heading: "Confirma la clasificación durante la etapa de almacén", paragraphs: [
        "Cuando llegue el producto, compara artículo, etiqueta, piezas y embalaje visible con el registro original. El vendedor puede enviar otro conjunto, incluir una batería inesperada u omitir un accesorio declarado. LoloBuy confirma inspección y fotos, pero estas no demuestran composición química, estado de batería ni cumplimiento normativo.",
        "Si aparece un componente inesperado o una etiqueta de restricción, pausa la preparación y pregunta cómo se clasifica el artículo. Conserva pruebas y acciones actuales de devolución o gestión. No ocultes ni cambies etiquetas para conseguir una ruta: una declaración exacta protege tu envío y los demás paquetes de la red.",
      ] },
      { heading: "Organiza los paquetes según el artículo más restrictivo", paragraphs: [
        "Un único artículo restringido puede eliminar rutas disponibles para ropa o accesorios ordinarios. Antes de consolidar, agrupa según restricciones conocidas, fragilidad, baterías, líquidos, tamaño y valor. Comprueba si separar el artículo sensible cambia compatibilidad o coste, sin asumir que dividir convierte en permitido un producto prohibido.",
        "Considera también cómo interactúan los embalajes. Un líquido puede dañar tejidos, un imán afectar al contenido cercano y una pieza pesada aplastar artículos frágiles. Incluso una combinación físicamente segura debe cumplir las condiciones actuales de ruta y destino. Registra por qué incluyes o separas cada artículo.",
      ], bullets: ["Mercancía ordinaria", "Productos con batería o alimentación", "Líquidos, polvos o aerosoles", "Artículos magnéticos, cortantes o frágiles", "Productos regulados en destino"] },
      { heading: "Evalúa las rutas ofrecidas para el paquete final", paragraphs: [
        "Después de seleccionar artículos y destino, compara las rutas mostradas para ese paquete. Revisa tipos de producto admitidos, cálculo del peso facturable, límites de medidas, seguimiento, protección o seguro, reglas de valor declarado y exclusiones. La ruta de un artículo antiguo o de otra cuenta puede no corresponder a tu país o contenido.",
        "Si no aparece ninguna, no cambies etiquetas repetidamente hasta obtener una. Identifica el artículo o combinación responsable y consulta opciones conformes: retirar un artículo, devolverlo según las condiciones actuales, utilizar una ruta especializada permitida si realmente existe o detener el envío. Nunca inventes una solución basada en una declaración inexacta.",
      ] },
      { heading: "Examina por separado marcas y propiedad intelectual", paragraphs: [
        "Una foto de hoja de cálculo, una afirmación del vendedor o una imagen de QC no demuestra autenticidad ni autorización para importar productos con marca. Las actuaciones aduaneras y de titulares de derechos varían según destino y circunstancias. No consideres la disponibilidad de una ruta una garantía legal ni llames autenticación a la inspección del almacén.",
        "Ante un artículo con marca o diseño protegido, valora si la fuente está autorizada y si importación, reventa o uso personal tienen restricciones donde vives. Si faltan pruebas, no comprar puede ser la decisión de menor riesgo. Esta guía aporta un método de revisión, no una conclusión jurídica.",
      ] },
      { heading: "Crea un registro de preparación antes de pagar", paragraphs: [
        "Termina con una fila por artículo: SKU exacto, descripción física, atributos sensibles, datos desconocidos, comprobación del destino, clasificación de la plataforma, rutas observadas, agrupación y fecha de decisión. Considera las pruebas vigentes solo para la transacción revisada. Examina de nuevo cualquier pedido posterior porque vendedores, rutas y normas pueden cambiar.",
        "Utiliza tres resultados: preparado para una ruta actual compatible, en pausa por falta de pruebas o excluido del paquete. Este registro evita que una sorpresa tardía en almacén fuerce una decisión costosa y vincula la selección de ruta al paquete real, no a una promesa genérica sobre envíos de LoloBuy.",
      ], links: [{ label: "Planificar el paquete y su envío", href: "/es/guides/shipping" }, { label: "Comparar costes de consolidar o dividir", href: "/es/articles/lolobuy-fees-explained" }] },
    ],
  },
  {
    slug: "lolobuy-shipping-france-guide",
    searchTitle: "Envíos LoloBuy a Francia: gastos, pasos y seguimiento",
    title: "Envíos de LoloBuy a Francia: prepara un presupuesto de entrega claro",
    shortTitle: "Envíos a Francia: gastos y pasos",
    description: "Planifica un envío de LoloBuy a Francia con una lista de destino, un registro completo de costes, comparación de paquetes y seguimiento por etapas.",
    eyebrow: "ENVÍOS A FRANCIA",
    published: "2026-10-17", updated: "2026-10-17", readingTime: "8 min de lectura",
    factCheckLine: "Revisión editorial: 17 de octubre de 2026. La secuencia se basa en la descripción indexada del sitio oficial de LoloBuy. Precios, rutas, almacenamiento y estimaciones de entrega deben comprobarse en la cuenta actual; no se afirma haber realizado un envío personal.",
    visual: { eyebrow: "PRIMERO EL DESTINO", title: "Una dirección francesa, tres etapas distintas", caption: "Separa compra, decisiones del almacén y transporte internacional para entender la finalidad de cada pago.", items: [
      { label: "Comprar", text: "Guarda artículo, opción exacta y coste de entrega en China." },
      { label: "Preparar", text: "Revisa pruebas del almacén y compara opciones de paquete compatibles." },
      { label: "Recibir", text: "Conserva el registro pagado y sigue los eventos del transportista." },
    ] },
    sources: [
      { label: "Sitio oficial de LoloBuy · lolobuy.com", note: "Descripción indexada revisada el 17 de octubre de 2026: pedidos mediante enlaces, pago del producto y transporte nacional, fotos QC, consolidación de artículos elegidos, solicitud de envío y pago de transporte, embalaje, pesaje, expedición y seguimiento. Disponibilidad y redacción pueden cambiar." },
      { label: "Ejemplos editoriales de planificación", note: "Plantillas de comparación, criterios y cálculos son ejemplos explicativos de esta guía. No son cotizaciones de LoloBuy, resultados de entregas medidas ni afirmaciones sobre normas aduaneras vigentes." },
    ],
    intro: [
      "Planificar un envío de LoloBuy a Francia comienza por la dirección de entrega y el conjunto completo de productos, no por un precio único por kilogramo. Un par de zapatos compacto, un abrigo acolchado y un paquete mixto pueden generar dimensiones y rutas distintas. Una estimación para un destino o embalaje no sirve automáticamente para otro. Registra qué envías y adónde debe llegar antes de comparar cotizaciones.",
      "Esta guía sigue la secuencia descrita por la página oficial indexada de LoloBuy: comprar los artículos, revisar el QC del almacén, elegir los productos del paquete, presentar la solicitud y pagar el transporte correspondiente, y después seguir salida y seguimiento. No promete transportista, tiempo de entrega ni tratamiento fiscal concretos. Su propósito es ayudarte a sustituir importes desconocidos por pruebas actuales antes de comprometer el envío internacional.",
    ],
    sections: [
      { heading: "Anota el destino real antes de preparar la cesta", paragraphs: [
        "Utiliza los datos completos admitidos por el formulario actual: país o territorio, código postal, localidad, calle, edificio y detalles necesarios de entrega. No supongas que todas las direcciones descritas informalmente como Francia tienen los mismos servicios. Contrasta las opciones de destino con el lugar donde se recibirá el paquete. Un presupuesto para otro código postal, territorio o formato de dirección no es una cotización confirmada para ti.",
        "Mantén coherentes nombre y contacto del destinatario con el registro de entrega. Si compras para otra persona, resuelve su dirección antes de comparar rutas. Incluye también la fecha necesaria: distingue una preferencia de un evento después del cual los productos ya no servirían. El tránsito estimado es solo parte del recorrido y una estimación corta no elimina las esperas del vendedor o del almacén.",
      ] },
      { heading: "Separa la compra en China de la entrega en Francia", paragraphs: [
        "El pago del producto y el posterior pago internacional responden a decisiones diferentes. Al comprar, comprueba variante, cantidad, importe y entrega nacional hasta el almacén. Tras la recepción, el paquete depende de los artículos recibidos, su protección y las rutas disponibles para el destino. Pagar el producto no demuestra que también se haya pagado o organizado el transporte internacional.",
        "Crea una fila para cada artículo, sin conservar únicamente el subtotal de la cesta. Guarda juntos enlace, talla, color, cantidad y registro de pago. Cuando llegue al almacén, añade su identificador a esa fila. Así podrás detectar artículos que todavía no llegaron o variantes distintas antes de incorporarlos al paquete destinado a Francia.",
      ], links: [{ label: "Entender las dos etapas de pago", href: "/es/articles/lolobuy-payment-guide" }] },
      { heading: "Usa un presupuesto que muestre lo desconocido", paragraphs: [
        "Un presupuesto útil para Francia incluye más que la cifra junto a un servicio de transporte. Conserva moneda y fecha de cada cotización. Marca un campo como desconocido si no se ha confirmado; no escribas cero porque todavía no apareció el cargo. Si la ruta afirma que incluye algo, guarda esa redacción y comprueba sus condiciones.",
        "La tabla es una plantilla de planificación, no afirma que todos los pedidos tengan todos esos cargos. Algunos conceptos pueden estar incluidos, ser opcionales o no aplicarse. Tu tarea es determinar qué corresponde al pedido actual y quién lo cobra. Para cargos de destino, consulta información oficial actual y condiciones del servicio, sin convertir una estimación de redes sociales en una norma.",
      ], table: { headers: ["Concepto", "Qué registrar", "Qué comprobar antes de seguir"], rows: [
        ["Productos y entrega en China", "Importe pagado y moneda", "Opciones y cantidades correctas"],
        ["Servicios del almacén", "Servicio elegido y precio", "Necesario, opcional o ya incluido"],
        ["Transporte internacional", "Cotización actual del paquete", "Destino, dimensiones y ruta apta"],
        ["Pago o conversión de moneda", "Importe de la pantalla de pago", "Total en la moneda que pagas"],
        ["Cargos de destino", "Inclusión confirmada o importe pendiente", "Condiciones actuales e información oficial"],
      ] } },
      { heading: "Resuelve las comprobaciones útiles de QC antes de solicitar el paquete", paragraphs: [
        "Las fotos del almacén ayudan a verificar variante y estado visible. Empieza por identidad del pedido, cantidad, etiqueta de talla y color antes de detalles menores. Una foto cuidada no demuestra ajuste, composición ni durabilidad. Si una medida resulta esencial, solicita esa prueba únicamente cuando el servicio actual la ofrezca y espera la respuesta antes de autorizar el envío.",
        "En calzado, decide si necesitas la caja original y qué protección importa. En un abrigo, considera volumen además de peso. En accesorios frágiles, identifica las piezas vulnerables. Son decisiones de embalaje específicas, no motivos para reducir el paquete a cualquier precio. Excluye artículos equivocados o daños sin resolver hasta entender las acciones disponibles y sus condiciones.",
      ], links: [{ label: "Revisar fotografías del almacén", href: "/es/articles/how-to-read-qc-photos" }] },
      { heading: "Compara rutas con las mismas condiciones del paquete", paragraphs: [
        "Crea una comparación fechada con destino, productos, peso estimado, dimensiones y solicitud de embalaje iguales. Compara solo servicios que aparezcan como aptos. Registra precio, intervalo de entrega indicado, seguimiento y condiciones relevantes. Un resultado más barato calculado para otro paquete no demuestra que puedas enviar más barato la cesta original.",
        "Separa tiempo estimado y compromiso garantizado. Anota cuándo comienza el intervalo si el servicio lo explica; si no, deja el dato pendiente. Registra límites de contenido y dimensiones. Disponibilidad y aceptación pueden cambiar: repite la comparación cuando cambien las medidas del almacén o los productos elegidos, en lugar de depender de una captura antigua.",
      ], table: { headers: ["Dato comparado", "Ruta A", "Ruta B"], rows: [
        ["Destino y código postal", "La misma dirección", "La misma dirección"],
        ["Productos y embalaje", "Los mismos artículos", "Los mismos artículos"],
        ["Peso y dimensiones", "Datos actuales registrados", "Los mismos datos"],
        ["Precio, moneda y fecha", "Copiar lo mostrado actualmente", "Copiar lo mostrado actualmente"],
        ["Condiciones y dudas pendientes", "Registrar antes del pago", "Registrar antes del pago"],
      ] } },
      { heading: "Reduce costes evitables sin adivinar el resultado", paragraphs: [
        "Si la cotización supera tu presupuesto, compara alternativas concretas. Retira un artículo que no necesites, pregunta qué embalaje innecesario se puede quitar o compara una opción de preparación ofrecida. Confirma que se mantiene protección suficiente. Importa el nuevo total del paquete modificado, no si quitar una caja suele ahorrar dinero a otra persona.",
        "Consolidar puede cambiar peso y volumen. Dividir puede añadir cargos básicos o generar rutas distintas. Ninguna opción es automáticamente más barata. Compara el importe combinado de todos los paquetes resultantes con los mismos servicios seleccionados. No añadas un producto innecesario para repartir el transporte entre más artículos: su precio sigue aumentando tu gasto total.",
      ], links: [{ label: "Revisar los datos de la calculadora de envío", href: "/es/articles/lolobuy-shipping-calculator-guide" }] },
      { heading: "Conserva el registro completo al solicitar y pagar", paragraphs: [
        "Antes de finalizar, revisa juntos artículos de almacén, dirección, embalaje y servicio cotizado. Guarda identificador del paquete y confirmación de pago. Indica qué importe es estimado y si el proceso explica mediciones o ajustes posteriores. Si el total difiere de tu comparación, identifica el dato modificado antes de aceptarlo.",
        "Guarda pedidos y paquete en una misma carpeta, manteniendo separados sus identificadores. Número de compra, referencia de almacén, número de paquete y seguimiento pueden corresponder a etapas distintas. Esta separación evita consultar por un envío internacional dando solo la referencia de compra al vendedor, sin los datos necesarios para localizar el paquete.",
      ] },
      { heading: "Sigue el recorrido por etapas y actúa sobre el último evento confirmado", paragraphs: [
        "Después del pago, revisa el estado real del paquete sin asumir que el transportista ya lo tiene. Embalar, pesar, expedir y realizar el primer escaneo son eventos distintos. Guarda fecha y texto de la última actualización confirmada. Cuando exista seguimiento, contrasta la referencia con el transportista y atiende instrucciones de entrega mediante una cuenta o canal verificado.",
        "Si el progreso es incierto, envía a asistencia un registro breve con identificador, destino, último evento, fecha y consulta concreta. Evita pagos repetidos o solicitudes duplicadas mientras localizas un envío existente. Tras la entrega, compara el contenido con tu lista y conserva pruebas de diferencias. Ese historial sirve mejor para el siguiente presupuesto a Francia que una afirmación sin fecha sobre tiempos habituales.",
      ], links: [{ label: "Entender la solicitud de paquete", href: "/es/articles/lolobuy-submit-package-guide" }, { label: "Investigar un seguimiento sin novedades", href: "/es/articles/lolobuy-tracking-not-updating-guide" }] },
    ],
  },
  {
    slug: "lolobuy-shipping-calculator-guide",
    searchTitle: "Calculadora de envío LoloBuy: peso, volumen y gastos",
    title: "Calculadora de envío de LoloBuy: convierte una estimación en una comparación útil",
    shortTitle: "Calculadora de envío: peso y costes",
    description: "Entiende los datos de la calculadora de envío de LoloBuy, el peso real y volumétrico, ejemplos ilustrativos y por qué puede cambiar el importe final.",
    eyebrow: "CALCULADORA DE ENVÍO",
    published: "2026-10-17", updated: "2026-10-17", readingTime: "8 min de lectura",
    factCheckLine: "Revisión editorial: 17 de octubre de 2026. La secuencia se basa en la descripción indexada del sitio oficial de LoloBuy. Precios, rutas, almacenamiento y estimaciones de entrega deben comprobarse en la cuenta actual; no se afirma haber realizado un envío personal.",
    visual: { eyebrow: "CONSERVA LOS DATOS", title: "Cada estimación corresponde a un paquete concreto", caption: "Si cambias destino, embalaje o contenido, la estimación anterior puede dejar de representar tu envío.", items: [
      { label: "Datos", text: "Destino, artículos elegidos, peso y dimensiones embaladas." },
      { label: "Reglas", text: "Utiliza las condiciones actuales de facturación del servicio apto." },
      { label: "Comparación", text: "Registra importe, moneda, momento y datos sin resolver." },
    ] },
    sources: [
      { label: "Sitio oficial de LoloBuy · lolobuy.com", note: "Descripción indexada revisada el 17 de octubre de 2026: pedidos mediante enlaces, pago del producto y transporte nacional, fotos QC, consolidación de artículos elegidos, solicitud de envío y pago de transporte, embalaje, pesaje, expedición y seguimiento. Disponibilidad y redacción pueden cambiar." },
      { label: "Ejemplos editoriales de planificación", note: "Plantillas de comparación, criterios y cálculos son ejemplos explicativos de esta guía. No son cotizaciones de LoloBuy, resultados de entregas medidas ni afirmaciones sobre normas aduaneras vigentes." },
    ],
    intro: [
      "La calculadora de envío de LoloBuy resulta útil si tratas su resultado como consecuencia de unos datos concretos. Pierde utilidad cuando copias una cifra sin destino, peso, dimensiones o servicio. Antes de decidir si puedes pagar la cesta, anota qué incluye la estimación y qué datos siguen siendo aproximaciones.",
      "Esta guía explica cómo preparar una comparación repetible e interpretar diferencias entre una estimación y los cargos posteriores. No reproduce una calculadora de LoloBuy en tiempo real ni proporciona tarifas de transportistas. Todos los ejemplos numéricos son deliberadamente ilustrativos. Divisor, redondeo, servicios y cargos de un envío real deben obtenerse de la cotización y sus condiciones actuales, no de estos cálculos de ejemplo.",
    ],
    sections: [
      { heading: "Reúne los datos antes de mirar el precio", paragraphs: [
        "Empieza por destino y artículos exactos. Separa lo que sabes de lo que estimas. Un peso medido en almacén tiene un respaldo distinto de un peso aproximado del vendedor, y ninguno describe necesariamente el paquete final. Registra el origen de cada dato para sustituir suposiciones cuando estén disponibles las medidas reales.",
        "Utiliza las unidades que pide el formulario. Distingue kilogramos de gramos y centímetros de otras unidades antes de introducir números. Un error decimal puede producir una cifra precisa para un paquete totalmente distinto. Anota también la categoría o descripción solicitada. No selecciones otra categoría solo para obtener una ruta aparentemente más barata.",
      ], table: { headers: ["Dato", "Registro útil", "Incertidumbre frecuente"], rows: [
        ["Destino", "País o territorio y código postal reales", "Estimación hecha para otra dirección"],
        ["Contenido", "Artículos y cantidades exactos", "Productos añadidos después de comparar"],
        ["Peso de báscula", "Valor, unidad y fuente", "Solo mercancía o paquete embalado"],
        ["Dimensiones", "Largo, ancho y alto embalados", "Medidas de productos individuales"],
        ["Servicios", "Embalaje y opciones elegidas", "Qué incluye el precio mostrado"],
      ] } },
      { heading: "Distingue peso real y peso volumétrico", paragraphs: [
        "El peso real es la masa medida en una báscula. El volumétrico es una medida de facturación calculada a partir de las dimensiones y las reglas del servicio. Por eso un paquete ligero y voluminoso puede facturarse de forma distinta que uno denso con el mismo peso de báscula. Comprueba si la ruta utiliza peso volumétrico y cómo lo calcula.",
        "No atribuyas un divisor universal a LoloBuy ni supongas que todos los servicios eligen el peso del mismo modo. Lee fórmula, redondeo, mínimos y límites actuales. Si la cotización indica peso facturable, guárdalo junto a las medidas originales. Sin esos detalles, multiplicar un peso supuesto por un precio por kilogramo puede no reproducir el total mostrado.",
      ] },
      { heading: "Calcula un ejemplo de volumen expresamente ilustrativo", paragraphs: [
        "Imagina una caja embalada de 40 × 30 × 20 centímetros y 3 kilogramos de peso real. Su volumen es de 24.000 centímetros cúbicos. Solo para este ejemplo, supón que un servicio ficticio divide el volumen entre 6.000 y factura el mayor entre peso real y volumétrico. El volumétrico sería de 4 kilogramos; el peso facturable del ejemplo sería 4 kilogramos antes de cualquier redondeo ficticio.",
        "Es aritmética para explicar el concepto, no una fórmula verificada de LoloBuy. Si el servicio real emplea otro divisor o método, cambia el resultado. Sustituye todas las suposiciones por las reglas de la ruta actual. La enseñanza útil es que reducir solo el peso de báscula puede no modificar la base de facturación si el volumen sigue determinándola.",
      ], table: { headers: ["Dato u operación ilustrativa", "Resultado del ejemplo"], rows: [
        ["Dimensiones embaladas", "40 × 30 × 20 cm"],
        ["Volumen", "24.000 cm³"],
        ["Divisor únicamente del ejemplo", "6.000 cm³ por kg"],
        ["Peso volumétrico ilustrativo", "24.000 ÷ 6.000 = 4 kg"],
        ["Peso real ilustrativo", "3 kg"],
        ["Si la regla ficticia utiliza el mayor", "4 kg antes del redondeo"],
      ] } },
      { heading: "Prueba un cambio de embalaje sin garantizar ahorro", paragraphs: [
        "Continúa el mismo ejemplo ficticio. Supón que un embalaje adecuado cambia la caja a 40 × 30 × 15 centímetros y mantiene el peso real embalado en 3 kilogramos. El volumen pasa a 18.000 centímetros cúbicos. Dividido por el mismo divisor de ejemplo da 3 kilogramos. Con la regla ficticia del mayor valor, el peso facturable sería ahora 3 kilogramos antes de redondear.",
        "La comparación identifica una posible variación en la base de cobro; no demuestra ahorro monetario. Una ruta real puede tener tramos, mínimos, costes de reembalaje u otras condiciones de aceptación. Solicita una nueva cotización y conserva protección adecuada. Quitar protección a un artículo frágil para bajar el volumen puede provocar un problema mucho más caro que el ahorro previsto.",
      ] },
      { heading: "Cambia una variable cada vez al comparar opciones", paragraphs: [
        "Conserva un escenario base con artículos, destino, medidas y servicios originales. Crea una segunda fila para un cambio específico, como excluir un artículo voluminoso o usar una opción de embalaje disponible. Mantén las demás suposiciones cuando sea posible. Así puedes identificar qué produjo la diferencia, en vez de comparar cifras sin relación entre sus datos.",
        "Si divides el envío, compara la suma de todos los paquetes con la alternativa conjunta. Dos cotizaciones separadas forman un total de dos partes, no una elección entre sus precios individuales. Incluye los servicios de forma coherente y conserva las monedas. Si cambian los servicios disponibles, incorpora esa diferencia a la decisión, sin presentar solo el importe como comparación equivalente.",
      ], table: { headers: ["Escenario", "Qué guardar", "Decisión"], rows: [
        ["Base", "Cesta, medidas y cotización originales", "Compatibilidad con el presupuesto"],
        ["Nuevo embalaje", "Cambio de protección, medidas y coste", "Conveniencia del total revisado"],
        ["Un artículo retirado", "Productos restantes y nueva cotización", "Valor del artículo frente a todo su coste adicional"],
        ["Dos paquetes", "Los dos totales completos", "Mejora del resultado conjunto"],
      ] } },
      { heading: "Separa transporte y gasto total de la compra", paragraphs: [
        "El resultado de envío puede ser solo una parte del presupuesto. Mantén separados pago del producto, entrega en China, servicios de almacén, transporte internacional y otros cargos confirmados. Comprueba qué incluye la cotización actual. Un campo vacío debe quedar pendiente hasta obtener respuesta; tratarlo como gratuito abarata la apariencia sin mejorar la precisión.",
        "Si el pago se convierte a otra moneda, guarda tanto el importe cotizado como el mostrado al pagar. Compara el total que realmente autorizarías con las mismas condiciones. No deduzcas el tratamiento fiscal por el apodo de una ruta ni por el comentario de otro comprador. Completa esa parte usando condiciones vigentes e información oficial pertinente para el destino real.",
      ], links: [{ label: "Preparar un registro completo de costes", href: "/es/articles/lolobuy-fees-explained" }] },
      { heading: "Explica un cambio de importe comprobando los datos modificados", paragraphs: [
        "Cuando el importe posterior difiera de la estimación, compara primero peso, dimensiones embaladas, productos y servicios seleccionados. Revisa también destino y ruta. El peso del vendedor, el del artículo en almacén y el del paquete completo pueden representar cosas diferentes. La diferencia resulta más fácil de investigar si guardaste la fuente de cada dato previo.",
        "Después compara fecha, moneda y condiciones de facturación indicadas. No supongas que toda diferencia es un error ni una comisión inevitable. Pide la medida o línea concreta que la explica. Guarda la respuesta con el registro y evita pagar otra vez solo porque la primera confirmación tarde en aparecer. El estado real de la cuenta debe orientar el siguiente paso.",
      ] },
      { heading: "Guarda una cotización reproducible y vuelve a calcular cuando cambie el paquete", paragraphs: [
        "Una cotización útil conserva fecha, destino, productos, origen del peso, dimensiones, servicio, importe, moneda y condiciones relevantes. Guarda captura o registro escrito junto al inventario de almacén. Así podrás reproducir comparaciones posteriores y dar a asistencia información suficiente para entender la estimación que mencionas.",
        "Calcula de nuevo si cambian contenido, embalaje, peso medido, dimensiones, destino o servicio. Antes de solicitar el paquete, confirma que el importe actual siga dentro del presupuesto y que las dudas esenciales estén resueltas. La calculadora apoya esa decisión. Una cifra aparentemente exacta basada en datos incompletos sigue siendo una estimación hasta que el proceso actual confirme el importe aplicable.",
      ], links: [{ label: "Planificar un paquete para Francia", href: "/es/articles/lolobuy-shipping-france-guide" }, { label: "Preparar la solicitud de paquete", href: "/es/articles/lolobuy-submit-package-guide" }] },
    ],
  },
  {
    slug: "lolobuy-submit-package-guide",
    searchTitle: "Submit package en LoloBuy: significado, pasos y pago",
    title: "Submit package en LoloBuy: de artículos en almacén a una solicitud de envío",
    shortTitle: "Solicitar el paquete: la siguiente decisión",
    description: "Entiende qué significa solicitar un paquete en LoloBuy, qué revisar antes de autorizarlo y cómo se diferencian compra, pago del transporte y seguimiento.",
    eyebrow: "PROCESO DEL PAQUETE",
    published: "2026-10-17", updated: "2026-10-17", readingTime: "8 min de lectura",
    factCheckLine: "Revisión editorial: 17 de octubre de 2026. La secuencia se basa en la descripción indexada del sitio oficial de LoloBuy. Precios, rutas, almacenamiento y estimaciones de entrega deben comprobarse en la cuenta actual; no se afirma haber realizado un envío personal.",
    visual: { eyebrow: "IDENTIFICA LA ETAPA", title: "Comprar productos no significa haber expedido el paquete", caption: "Identifica el último paso confirmado antes de decidir si revisar, pagar, esperar o pedir ayuda.", items: [
      { label: "Almacén", text: "Contrasta lo recibido con el pedido y resuelve dudas importantes de QC." },
      { label: "Solicitud", text: "Elige artículos aptos, destino, embalaje y servicio disponible." },
      { label: "Expedición", text: "Confirma pago, progreso y entrega al transportista." },
    ] },
    sources: [
      { label: "Sitio oficial de LoloBuy · lolobuy.com", note: "Descripción indexada revisada el 17 de octubre de 2026: pedidos mediante enlaces, pago del producto y transporte nacional, fotos QC, consolidación de artículos elegidos, solicitud de envío y pago de transporte, embalaje, pesaje, expedición y seguimiento. Disponibilidad y redacción pueden cambiar." },
      { label: "Ejemplos editoriales de planificación", note: "Plantillas de comparación, criterios y cálculos son ejemplos explicativos de esta guía. No son cotizaciones de LoloBuy, resultados de entregas medidas ni afirmaciones sobre normas aduaneras vigentes." },
    ],
    intro: [
      "En el proceso de un agente de compras, «submit package» significa pasar de artículos individuales en almacén a solicitar la preparación y envío de un paquete seleccionado. Es una decisión distinta de comprar los productos. Si ves esa instrucción, identifica primero qué artículos están disponibles, qué dudas quedan pendientes y qué etapa de pago muestra actualmente la cuenta.",
      "La página oficial indexada de LoloBuy describe elegir productos del almacén, combinar los seleccionados, presentar una solicitud de envío y pagar el transporte, seguidos de embalaje, pesaje, expedición y seguimiento. Etiquetas y opciones pueden cambiar. Esta guía explica las decisiones del proceso sin afirmar que todas las cuentas muestren los mismos botones, opciones o secuencia de pantallas.",
    ],
    sections: [
      { heading: "Identifica qué ha ocurrido realmente con cada artículo", paragraphs: [
        "Abre pedidos e inventario actuales y distingue lo comprado de lo recibido. Una confirmación de pago no demuestra llegada al almacén. Contrasta referencia, opción y cantidad, y registra el último estado confirmado. Si un artículo continúa con el vendedor o en transporte nacional, no supongas que se incluirá automáticamente en un paquete que se está preparando ahora.",
        "Prepara una lista breve usando identificadores de almacén cuando existan. Separa lo que quieres enviar de lo que sigues evaluando. Resulta especialmente útil con varios pedidos de zapatos, tallas o colores parecidos. La lista convierte la selección en una decisión deliberada y reduce el riesgo de enviar una opción incorrecta porque reconoces su miniatura.",
      ], table: { headers: ["Registro", "Qué demuestra", "Qué no demuestra"], rows: [
        ["Pago del producto", "Un pago de la etapa de compra", "Expedición internacional"],
        ["Artículo en almacén", "El estado registrado de lo recibido", "Que pertenezca a un paquete pagado"],
        ["Solicitud de paquete", "Productos e instrucciones seleccionados", "Que lo tenga el transportista"],
        ["Confirmación del transporte", "El estado registrado del pago del paquete", "Entrega completada"],
        ["Evento del transportista", "Un evento comunicado del recorrido", "El estado de todos los artículos dentro"],
      ] } },
      { heading: "Resuelve las dudas de QC que cambiarían el paquete", paragraphs: [
        "Revisa cantidad recibida, etiquetas de variante y estado visible antes de seleccionar. Compara las fotos con la opción exacta comprada, no con otro color o ejemplo del vendedor. Si una duda importante te haría devolver, cambiar o excluir el artículo, resuélvela antes de autorizar. La acción disponible y su plazo deben leerse en las condiciones vigentes del pedido.",
        "Pide pruebas que respondan a una decisión concreta. Una foto clara de talla puede resolver la variante; una medida pertinente puede ayudar a valorar el ajuste. Más imágenes no demuestran todo sobre material o durabilidad. Mantén enfocada la solicitud y no trates una respuesta pendiente como aprobación porque los demás productos ya estén listos.",
      ], links: [{ label: "Interpretar fotografías de QC", href: "/es/articles/how-to-read-qc-photos" }, { label: "Organizar pruebas de un artículo incorrecto", href: "/es/articles/lolobuy-qc-mismatch-evidence-guide" }] },
      { heading: "Decide qué artículos deben viajar juntos", paragraphs: [
        "Selecciona según destino, disponibilidad, necesidades de embalaje y servicios aptos mostrados. Los productos comprados juntos no forman una decisión indivisible. Un objeto frágil, un abrigo voluminoso y una prenda compacta plantean restricciones diferentes. Revisa reglas actuales para el contenido real, sin asumir que una ruta apta para un artículo acepta toda la cesta.",
        "Si valoras esperar otra compra, consulta directamente condiciones de almacén y posibles cargos actuales. Esta guía no establece una duración fija de almacenamiento gratuito. Registra fecha y regla aplicables a tus artículos. Esperar solo puede valorarse conociendo el efecto sobre costes, preparación y fecha necesaria de entrega.",
      ], links: [{ label: "Comprobar restricciones de artículos y rutas", href: "/es/articles/lolobuy-restricted-items-shipping-routes" }] },
      { heading: "Elige instrucciones de embalaje que describan el resultado necesario", paragraphs: [
        "Piensa en proteger antes de reducir volumen. Indica qué embalaje sobra solo si el servicio actual lo permite y entiendes las consecuencias. Una caja de calzado, funda o inserto de soporte puede tener una función distinta del envoltorio exterior del vendedor. Si el artículo es frágil o importa conservar su forma, describe esa necesidad en lugar de ordenar quitarlo todo.",
        "Registra servicios elegidos y precios mostrados. Si una decisión necesita medición o valoración del almacén, conserva esa incertidumbre. No te prometas una reducción concreta de peso antes de realizar el trabajo. Una instrucción práctica permite comprobar después el resultado mediante el registro embalado, sin depender de palabras vagas como «más seguro» o «más barato».",
      ] },
      { heading: "Revisa juntos dirección y servicio actualmente disponible", paragraphs: [
        "Usa destinatario y dirección reales al consultar servicios. Confirma código postal, calle, edificio y datos de contacto requeridos. No selecciones un destino cercano más cómodo solo para mostrar precio. La cotización debe corresponder a la dirección a la que quieres enviar los productos.",
        "Lee la descripción del servicio para el paquete actual, incluidos límites, estimación y condiciones relevantes. Cuando se soliciten contenido o valores, proporciona datos exactos respaldados por la compra y sigue las instrucciones aplicables. No copies lo que escribió otro comprador sin comprobar que describe tu mercancía. Resuelve cualquier requisito importante antes de convertir la solicitud en un envío pagado.",
      ] },
      { heading: "Revisa el importe en la etapa de pago correcta", paragraphs: [
        "Compara el importe actual con tu estimación guardada. Comprueba si cubre solo transporte o también servicios elegidos y conserva la moneda. El pago del producto y el del paquete son registros separados aunque aparezcan en la misma cuenta. Un cargo en la etapa de envío no demuestra por sí mismo que te hayan cobrado dos veces lo mismo.",
        "A la vez, un estado confuso no justifica repetir el pago. Revisa antes la confirmación existente y el registro del paquete. Si cambia el importe, compara productos, medidas, embalaje y servicio antes de preguntar por una línea concreta. Guarda la explicación de mediciones o ajustes posteriores que ofrezca el proceso actual, sin asumir una política universal de recargos o reembolsos.",
      ], links: [{ label: "Separar pagos de producto y paquete", href: "/es/articles/lolobuy-payment-guide" }, { label: "Interpretar una estimación de transporte", href: "/es/articles/lolobuy-shipping-calculator-guide" }] },
      { heading: "Haz una revisión breve antes de confirmar", paragraphs: [
        "Detente en la revisión final y compara la solicitud con tu lista escrita. Comprueba que no reaparezca un artículo excluido y que las cantidades sean correctas. Lee otra vez la dirección en su formato definitivo. Revisa como conjunto embalaje y servicio, porque una edición anterior puede haber cambiado las opciones disponibles.",
        "Guarda identificador resultante, importe cotizado o pagado, confirmación y hora. Conserva las condiciones que influyan en tu decisión. No garantiza la entrega, pero deja un registro fiable de lo solicitado y evita confusiones cuando la cuenta contiene varias compras y más de un paquete en curso.",
      ], bullets: ["Artículos de almacén y cantidades coinciden con la lista prevista.", "Las dudas importantes de QC están resueltas o el artículo afectado queda excluido.", "Destinatario, dirección y contacto son correctos.", "Entiendes embalaje, servicio actual e importe mostrado.", "Has comprobado el estado del pago antes de pagar de nuevo."] },
      { heading: "Después de solicitar, sigue el próximo evento confirmado", paragraphs: [
        "Enviar una solicitud no equivale a entregar el paquete al transportista. Revisa el estado real mientras se prepara, mide, expide y recibe seguimiento. No inventes un plazo basado en otra experiencia de compra. Utiliza la estimación o compromiso vigente que muestre tu solicitud y conserva el último evento confirmado cuando necesites investigar el progreso.",
        "Si detectas un error de dirección o contenido, contacta pronto con asistencia indicando paquete y corrección exacta. No supongas que aún puede editarse o cancelarse: depende de etapa y condiciones actuales. Si el pago parece correcto pero el estado es incierto, aporta su confirmación en lugar de duplicar la solicitud. Cuando exista seguimiento, vincúlalo al registro e investiga las pausas con esa referencia.",
      ], links: [{ label: "Entender las etapas del pedido", href: "/es/articles/lolobuy-order-status-guide" }, { label: "Revisar un seguimiento sin novedades", href: "/es/articles/lolobuy-tracking-not-updating-guide" }, { label: "Preparar el destino Francia", href: "/es/articles/lolobuy-shipping-france-guide" }] },
    ],
  },
];

export const seoRefreshEs: Record<string, Article> = Object.fromEntries(
  translatedArticles.map((article) => [article.slug, article]),
);
