import Link from "next/link";
import SearchBox from "@/components/SearchBox";

function ArticleCta({ title = "Pesquise um produto no catálogo" }) {
  return (
    <div className="article-search">
      <h2>{title}</h2>
      <p>Use a busca como ponto de partida e confira o anúncio ao vivo, a variante e o preço antes de decidir.</p>
      <SearchBox compact />
    </div>
  );
}

function SourceBoundary({ children, links = [] }) {
  return (
    <div className="article-sources">
      <strong>Fontes e limite da verificação</strong>
      <p>{children}</p>
      {links.length > 0 && <p>{links.map(([label, href], index) => <span key={href}>{index ? " · " : ""}<a href={href} target="_blank" rel="noopener">{label}</a></span>)}</p>}
    </div>
  );
}

function SearchArticle() {
  return <>
    <p className="article-deck">Pesquisar bem no Hubbuy começa antes de colar qualquer link. Defina o produto, encontre a página individual correta e preserve a variante que será comprada. A planilha ajuda a descobrir; o anúncio ao vivo é o que precisa ser conferido.</p>
    <section id="resposta-direta">
      <span>01 · Caminho mais seguro</span>
      <h2>Use a busca para chegar ao anúncio, não para substituir o anúncio</h2>
      <p>O fluxo mais confiável tem quatro registros: termo pesquisado, página da loja ou do item, opção selecionada e resumo do pedido. Comece com uma descrição curta do produto. Ao encontrar um resultado, abra a página individual e confirme nome do vendedor, imagem, preço, cor, tamanho, modelo e quantidade. Só então envie o link ao Hubbuy.</p>
      <p>A página pública do Hubbuy apresenta uma busca por nome de produto ou link e separa pedido, chegada ao armazém e pacote internacional. Isso indica que a pesquisa é o começo de um processo em etapas. Um resultado importado não confirma estoque, medida ou frete final.</p>
      <div className="article-callout"><strong>Regra prática</strong><p>Se você não consegue descrever a variante em uma linha — modelo, cor, tamanho e quantidade — ainda não está pronto para pagar.</p></div>
    </section>
    <section id="formas">
      <span>02 · Três entradas</span>
      <h2>Pesquise por palavra-chave, por link ou pela identidade da loja</h2>
      <p><strong>Palavra-chave</strong> funciona melhor para descoberta. Use o tipo de produto e uma característica observável, como “tênis branco couro”, “moletom cinza pesado” ou “bolsa preta pequena”. Evite frases longas, elogios genéricos e códigos que você não entende.</p>
      <p><strong>Link direto</strong> é melhor quando você já encontrou um item em uma loja de origem. Copie a URL final da página individual, depois de qualquer redirecionamento. Guarde também o identificador do item e uma captura da opção escolhida.</p>
      <p><strong>Loja</strong> é útil quando você quer comparar itens do mesmo vendedor. Registre o nome da loja, abra os produtos individualmente e não presuma que todos têm a mesma política, qualidade ou disponibilidade.</p>
    </section>
    <section id="palavras">
      <span>03 · Termos de busca</span>
      <h2>Construa palavras-chave que reduzam resultados errados</h2>
      <p>Monte o termo em camadas: categoria + característica + público ou uso. Por exemplo: “tênis corrida masculino”, “jaqueta puffer preta” ou “mochila notebook”. Se houver muitos resultados, acrescente material, cor ou modelo. Se não houver nenhum, retire o detalhe menos importante.</p>
      <ul>
        <li><strong>Categoria:</strong> tênis, camiseta, jaqueta, bolsa, relógio ou acessório.</li>
        <li><strong>Forma:</strong> cano baixo, oversized, acolchoada, compacta ou esportiva.</li>
        <li><strong>Cor e material:</strong> úteis apenas quando o anúncio separa essas opções.</li>
        <li><strong>Modelo:</strong> use o nome completo somente quando ele identifica de fato a referência.</li>
      </ul>
      <p>Não misture “barato”, “melhor” ou “original” como se fossem fatos verificáveis. Preço precisa ser lido na opção selecionada; qualidade exige evidência; autenticidade não é provada por uma palavra no título.</p>
    </section>
    <section id="loja">
      <span>04 · Fontes de lojas</span>
      <h2>Salve a loja sem perder o item específico</h2>
      <p>Uma lista de lojas pode acelerar a pesquisa, mas cada compra precisa voltar à página individual. Salve o nome visível da loja, URL, item e data da consulta. Compare anúncios do mesmo vendedor por descrição, tabela de medidas, fotos, opções e envio doméstico. Uma boa experiência anterior não transforma o próximo item em compra garantida.</p>
      <p>Quando um link abre uma busca, página inicial ou tela social, procure o endereço final do item. Se a página exigir login, registre isso. Um importador pode receber menos informações que o seu navegador autenticado.</p>
    </section>
    <section id="validar">
      <span>05 · Validação</span>
      <h2>Compare o resultado importado com a fonte</h2>
      <p>Depois de colar o link, compare título, foto principal, vendedor, preço e opções. Um preço diferente pode pertencer a outra variante. Uma imagem parecida pode levar a outro anúncio. Se algum campo importante não for importado, use a instrução do pedido para registrar a escolha e mantenha a captura original.</p>
      <p>Antes do pagamento, confira o frete dentro da China e o estágio cobrado. O valor do produto não é o custo entregue no Brasil. O frete internacional é decidido depois que o item chega ao armazém, passa por revisão e entra em um pacote.</p>
    </section>
    <section id="erros">
      <span>06 · Erros comuns</span>
      <h2>Evite atalhos que apagam a evidência da compra</h2>
      <ol>
        <li>Comprar pela miniatura da planilha sem abrir a página ao vivo.</li>
        <li>Copiar um link de compartilhamento sem guardar o identificador do item.</li>
        <li>Escolher cor ou tamanho pela foto, ignorando o texto da opção.</li>
        <li>Tratar preço inicial como total final em reais.</li>
        <li>Salvar apenas uma captura, sem URL, loja e data.</li>
      </ol>
    </section>
    <section id="checklist">
      <span>07 · Checklist final</span>
      <h2>Sete campos bastam para manter a pesquisa rastreável</h2>
      <p>Registre termo, URL final, loja, item, variante, preço exibido e data. No pedido, confira os mesmos campos. Na chegada ao armazém, compare as fotos com esse registro. Para aprofundar a etapa seguinte, veja o <Link href="/pt-br/guides/qc-checks/">checklist de QC</Link> e o <Link href="/pt-br/guides/shipping/">guia de pacote e frete</Link>.</p>
    </section>
    <SourceBoundary links={[["Site oficial do Hubbuy", "https://hubbuy.com/"]]}>O fluxo público e a entrada de busca do Hubbuy foram conferidos em 9 de setembro de 2026. Campos internos, disponibilidade, preços e regras podem variar; a interface ativa do pedido continua sendo a fonte da transação.</SourceBoundary>
    <ArticleCta />
  </>;
}

function ShoesArticle() {
  return <>
    <p className="article-deck">Uma planilha Hubbuy de tênis é útil para encontrar links de Nike, Golden Goose e outros modelos, mas não decide tamanho, variante ou qualidade. O processo seguro liga a referência da planilha ao anúncio atual, à medida necessária e às fotos do armazém.</p>
    <section id="uso"><span>01 · Uso correto</span><h2>Trate cada linha da planilha como uma pista verificável</h2><p>Abra o cartão do tênis e anote o nome da referência, a loja, o link final, o preço e a data. Em seguida, abra o anúncio ao vivo. Confirme se a imagem, o texto e a opção disponível ainda representam o mesmo modelo. Uma planilha não controla alterações feitas pelo vendedor.</p><p>Pesquise pelo modelo completo quando souber exatamente o que procura. Para descoberta, combine categoria, cor e formato. “Tênis branco cano baixo” é mais útil que “melhor tênis”. Em qualquer resultado, a variante selecionada precisa aparecer por escrito no seu registro.</p></section>
    <section id="busca"><span>02 · Nike e Golden Goose</span><h2>Use a marca para localizar, não para concluir autenticidade</h2><p>Consultas como “planilha Hubbuy Nike”, “Hubbuy tênis” e “links Hubbuy Golden Goose” expressam uma intenção clara de produto. Inclua o modelo e a cor quando isso reduzir ambiguidades, mas não use o nome da marca como prova de origem. Título, foto, embalagem ou comentário do vendedor não certificam autenticidade.</p><p>Compare anúncios distintos por identidade da loja, descrição, tabela de tamanhos, materiais declarados, opções e envio doméstico. Quando duas páginas reutilizam imagens, isso não demonstra que o produto recebido será igual. Preserve a página escolhida e avalie a unidade que chega ao armazém.</p></section>
    <section id="tamanho"><span>03 · Tamanho</span><h2>Converta o tamanho com medida, não apenas com equivalência</h2><p>Numerações EU, BR, US e CN podem aparecer na mesma listagem e a conversão pode variar. Comece pela medida do pé em centímetros e pela tabela do vendedor. Veja se a tabela descreve o pé, a palmilha ou o comprimento externo do calçado; essas medidas não são intercambiáveis.</p><p>Se o anúncio não deixar a base da medida clara, registre a dúvida antes de comprar. Na etapa de QC, uma foto da palmilha com régua pode ajudar quando o vendedor e o armazém oferecem essa possibilidade, mas ela ainda não garante conforto, largura interna ou ajuste pessoal.</p><div className="article-callout"><strong>Registro de tamanho</strong><p>Salve numeração selecionada, sistema de tamanho, comprimento indicado e a imagem da tabela. Não dependa apenas de “uso 41 no Brasil”.</p></div></section>
    <section id="anuncio"><span>04 · Anúncio</span><h2>Confirme o que está incluído na opção selecionada</h2><p>Alguns anúncios agrupam cores, versões, materiais e faixas de preço. Clique na opção desejada e verifique se preço, imagem e descrição mudam. Registre também se caixa, cadarços extras ou acessórios aparecem como incluídos. Uma foto editorial não cria obrigação se a opção não informa o conteúdo.</p><p>Confira quantidade, envio até o armazém e prazo exibido. O preço do item e o envio doméstico pertencem ao pedido inicial; o frete internacional será calculado mais tarde, com peso, volume, embalagem e rota.</p></section>
    <section id="qc"><span>05 · QC de tênis</span><h2>Use as fotos para responder perguntas visíveis</h2><p>Compare primeiro o modelo, a cor, o tamanho marcado e a quantidade com o pedido salvo. Depois observe forma geral, par esquerdo e direito, costuras, cola visível, manchas, sola, etiqueta e acessórios que deveriam acompanhar o produto. Peça uma imagem adicional somente quando ela puder resolver uma dúvida concreta.</p><ul><li><strong>Identidade:</strong> modelo, cor e opção batem com o registro?</li><li><strong>Tamanho:</strong> etiqueta e caixa mostram a numeração escolhida?</li><li><strong>Condição:</strong> há dano, deformação, manchas ou diferenças evidentes entre os pés?</li><li><strong>Medida:</strong> falta uma medida capaz de mudar a decisão?</li></ul><p>Fotos de QC reduzem incerteza visível. Elas não comprovam autenticidade, composição interna, conforto, durabilidade ou ajuste no pé.</p></section>
    <section id="frete"><span>06 · Caixa e frete</span><h2>Decida sobre a caixa depois de entender proteção e volume</h2><p>A caixa de varejo pode aumentar as dimensões do pacote, mas removê-la também pode diminuir proteção ou eliminar um item que você quer conservar. Compare a opção de embalagem e o peso ou dimensões mostrados na etapa de pacote. Não use uma regra fixa para todos os tênis.</p><p>Ao consolidar pares com roupas ou acessórios, confirme se todos passaram pela revisão. Um pacote leve pode ter peso cobrável maior por causa do volume, conforme a regra da rota ativa. Veja também o <Link href="/pt-br/articles/hubbuy-shipping-cost-guide/">guia de custo de frete</Link>.</p></section>
    <section id="decisao"><span>07 · Decisão</span><h2>Feche o ciclo entre planilha, anúncio, pedido e armazém</h2><p>A melhor planilha é aquela que mantém o caminho até a fonte. Antes de aprovar o item, compare a linha original, a variante paga e as fotos de QC. Se houver diferença material, registre-a antes de montar o pacote internacional. Se tudo estiver consistente, preserve as capturas até a entrega.</p></section>
    <SourceBoundary links={[["Site oficial do Hubbuy", "https://hubbuy.com/"]]}>O fluxo público de pedido, inspeção no armazém e pacote foi conferido em 9 de setembro de 2026. As menções a marcas servem para atender à intenção de pesquisa e não fazem afirmação de autenticidade.</SourceBoundary>
    <ArticleCta title="Pesquise um modelo de tênis" />
  </>;
}

function PriceArticle() {
  return <>
    <p className="article-deck">Para entender o preço Hubbuy em real, separe o valor do item, a moeda exibida, o câmbio aplicado no pagamento e os custos que surgem em outras etapas. Uma multiplicação rápida ajuda a estimar, mas o débito final depende da conversão realmente oferecida.</p>
    <section id="formula"><span>01 · Fórmula prática</span><h2>Converta cada pagamento, não um total imaginário</h2><p>Use a fórmula <strong>valor em moeda estrangeira × taxa de conversão = referência em reais</strong>. Depois acrescente apenas cobranças realmente mostradas para aquela transação. Faça uma conta para o pedido do produto e outra para o pacote internacional. Isso evita misturar valores pagos em datas e câmbios diferentes.</p><div className="article-formula"><small>Estimativa em reais</small><strong>valor exibido × câmbio de referência + custos identificados</strong></div><p>O resultado é uma estimativa até a tela de autorização. Não publique nem confie em uma “taxa fixa do Hubbuy” sem verificar a interface ativa.</p></section>
    <section id="moeda"><span>02 · Moeda exibida</span><h2>Identifique a unidade antes de calcular</h2><p>Leia o símbolo e o código da moeda no anúncio, no resumo do pedido e na tela do meio de pagamento. CNY, USD e BRL representam unidades diferentes. Uma página pode mostrar uma referência em uma moeda e a cobrança seguinte em outra. Tire uma captura com valor, moeda, etapa e horário.</p><p>Se a planilha apresentar preço aproximado em dólar e o anúncio original usar yuan, volte à página ao vivo. A opção escolhida pode ter outro valor. O preço inicial também não inclui automaticamente envio dentro da China, pacote internacional ou cobranças de destino.</p></section>
    <section id="conversao"><span>03 · Conversão</span><h2>Use uma cotação de referência para planejar e a tela final para decidir</h2><p>Uma cotação pública ajuda a comparar cenários, mas não garante a taxa comercial do seu cartão, banco ou carteira. Registre a cotação usada e a data. Na autorização, compare o valor em moeda estrangeira, o valor convertido, a taxa apresentada e qualquer cobrança separada.</p><p>O Banco Central informa que, em compras internacionais com cartão de crédito, a taxa de conversão aplicável é a da instituição no dia da realização efetiva do gasto. Por isso, uma calculadora genérica e a fatura podem divergir sem que a diferença seja necessariamente um erro do anúncio.</p></section>
    <section id="custos"><span>04 · Custos separados</span><h2>Organize o custo por estágio da compra</h2><ul><li><strong>Pedido:</strong> produto, variante e envio do vendedor até o armazém.</li><li><strong>Armazém:</strong> apenas serviços opcionais que você realmente selecionar e que apareçam com valor.</li><li><strong>Pacote:</strong> embalagem, peso cobrável, rota e frete internacional.</li><li><strong>Pagamento:</strong> conversão, tarifa ou cobrança mostrada pelo provedor.</li><li><strong>Destino:</strong> tributos ou encargos aplicáveis, sem presumir isenção.</li></ul><p>Não some cupons, tarifas ou impostos a partir de publicações antigas. Use linhas separadas e marque “a confirmar” quando o valor ainda não existir.</p></section>
    <section id="cartao"><span>05 · Cartão e câmbio</span><h2>Confira quem está fazendo a conversão</h2><p>A conversão pode ser oferecida pelo site, pelo provedor de pagamento ou pelo emissor. Compare as opções disponíveis para a mesma transação, na mesma hora. O nome do meio de pagamento não basta para determinar o menor custo.</p><p>Depois que a compra for lançada, compare o débito final com o registro da autorização. Divida o valor em reais pelo valor em moeda estrangeira para obter a taxa observada e anote cobranças separadas. Preserve apenas comprovantes mascarados, sem número completo de cartão ou dados de acesso.</p></section>
    <section id="comparar"><span>06 · Comparação</span><h2>Compare propostas completas na mesma base</h2><p>Monte uma pequena tabela com método, moeda cobrada, valor estrangeiro, valor proposto em reais, custo separado e total. Se uma opção não mostrar o total, não invente. Uma taxa percentual menor pode terminar em débito maior quando o câmbio ou a cobrança fixa for pior.</p><p>Para estimar o valor entregue, conecte esta conta ao <Link href="/pt-br/articles/hubbuy-shipping-cost-guide/">guia de frete Hubbuy</Link>. Produto e frete internacional são decisões distintas.</p></section>
    <section id="registro"><span>07 · Registro final</span><h2>Guarde uma trilha simples até a fatura</h2><p>Salve pedido, moeda, horário, tela de autorização, comprovante mascarado e lançamento final. Esse conjunto permite identificar se a diferença veio da variante, do estágio, do câmbio, de uma tarifa ou de outra cobrança. Sem essa separação, qualquer total parece uma surpresa.</p></section>
    <SourceBoundary links={[["Hubbuy", "https://hubbuy.com/"], ["Banco Central do Brasil", "https://www.bcb.gov.br/meubc/faqs/p/qual-a-taxa-de-cambio-cobrada-quando-faco-compras-de-bens-e-servicos-no-exterior-em-moeda-estrangeira-utilizando-cartao-de-credito"]]}>O fluxo público do Hubbuy e a orientação cambial do Banco Central foram conferidos em 9 de setembro de 2026. A página não publica uma taxa permanente nem substitui a proposta do seu provedor.</SourceBoundary>
    <ArticleCta />
  </>;
}

function AddressArticle() {
  return <>
    <p className="article-deck">No formulário internacional, “door number” ou “house number” corresponde ao número do imóvel — não ao apartamento, ao CEP ou ao telefone. Separar rua, número e complemento reduz o risco de criar uma etiqueta ambígua para entrega no Brasil.</p>
    <section id="mapa"><span>01 · Mapa dos campos</span><h2>Traduza o endereço por função</h2><div className="article-point-grid"><div><b>STREET</b><strong>Logradouro</strong><span>Tipo e nome oficial da rua, avenida, estrada ou equivalente.</span></div><div><b>DOOR / HOUSE NUMBER</b><strong>Número do imóvel</strong><span>O número que identifica casa, prédio, lote ou entrada.</span></div><div><b>ADDRESS LINE 2</b><strong>Complemento</strong><span>Apartamento, bloco, casa, fundos ou outra informação adicional.</span></div><div><b>POSTAL CODE</b><strong>CEP</strong><span>Oito dígitos correspondentes ao endereço.</span></div></div><p>Bairro, cidade e estado devem ocupar seus próprios campos quando existirem. Não repita dados em campos diferentes apenas para preencher todos os espaços.</p></section>
    <section id="numero"><span>02 · Número da porta</span><h2>Digite apenas a identificação do imóvel</h2><p>Se o endereço for “Avenida Paulista, 123, Loja B”, o logradouro é “Avenida Paulista”, o número é “123” e o complemento é “Loja B”. Os Correios explicam que o número especifica o imóvel no qual o objeto deve ser entregue.</p><p>Não coloque o número do apartamento no campo de número quando o edifício tem outro número de rua. Em “Rua Exemplo, 450, bloco 2, ap. 31”, o número é 450; bloco 2 e apartamento 31 pertencem ao complemento.</p></section>
    <section id="complemento"><span>03 · Complemento</span><h2>Use o complemento para localizar a unidade dentro do imóvel</h2><p>Inclua apartamento, bloco, torre, casa, sala, loja, fundos ou referência estrutural necessária. Seja curto e objetivo. Se o campo tiver limite, preserve primeiro os elementos que distinguem a unidade. Evite instruções longas de entrega que possam ser cortadas na etiqueta.</p><p>Use caracteres simples quando o formulário rejeitar acentos, mas não traduza nomes próprios de rua ou bairro. Mantenha o telefone com DDD em seu campo específico e confirme o nome completo do destinatário.</p></section>
    <section id="cep"><span>04 · CEP, cidade e UF</span><h2>Confirme se os campos descrevem o mesmo lugar</h2><p>O CEP brasileiro tem oito dígitos. Os Correios destacam que ele orienta a triagem e deve estar alinhado ao logradouro. Consulte o Busca CEP quando houver dúvida e compare rua, bairro, cidade e estado. Não use um CEP aproximado de outra região.</p><p>Em “state/province”, informe a sigla da unidade federativa quando o formulário aceitar, como SP, RJ ou MG. Em “city”, use o município. “District” ou “neighborhood” normalmente corresponde ao bairro, não ao estado.</p></section>
    <section id="sem-numero"><span>05 · Sem número</span><h2>Use a indicação adotada para o endereço real</h2><p>Os Correios recomendam “s/n” para logradouro sem numeração. Se o formulário aceitar somente dígitos ou bloquear a sigla, não invente um número silenciosamente. Consulte o suporte da plataforma e confirme como a etiqueta final representará o endereço sem número.</p><p>Uma referência de localização não substitui CEP, logradouro, cidade e destinatário. Quando o endereço rural ou o condomínio tem instruções próprias, confirme a forma usada normalmente em outras entregas.</p></section>
    <section id="revisao"><span>06 · Revisão</span><h2>Leia a etiqueta como um entregador</h2><ol><li>Nome completo do destinatário.</li><li>Rua ou avenida com nome oficial.</li><li>Número correto do imóvel.</li><li>Complemento suficiente para localizar a unidade.</li><li>Bairro, cidade, UF e CEP consistentes.</li><li>Telefone com DDD, se solicitado.</li></ol><p>Revise também o endereço salvo na conta e o endereço selecionado no pacote. Corrigir o cadastro não garante que um pacote já criado foi atualizado. Preserve uma captura da versão final sem expor publicamente dados pessoais.</p></section>
    <SourceBoundary links={[["Guia de Endereçamento dos Correios", "https://www.correios.com.br/enviar/precisa-de-ajuda/guia-de-enderecamento/guia-de-enderecamento"]]}>A correspondência entre número, complemento, CEP e demais campos foi conferida no guia oficial dos Correios em 9 de setembro de 2026. Os rótulos exatos do Hubbuy podem mudar; confira a prévia final da etiqueta.</SourceBoundary>
  </>;
}

function TrackingArticle() {
  return <>
    <p className="article-deck">Quando o rastreamento Hubbuy não atualiza, o primeiro passo não é contar dias: é descobrir se o item ainda é um pedido, já chegou ao armazém ou virou um pacote internacional. Cada etapa tem um responsável e um conjunto de evidências diferentes.</p>
    <section id="etapa"><span>01 · Localize a etapa</span><h2>Separe status do pedido e rastreamento do pacote</h2><p>O fluxo público do Hubbuy mostra o vendedor enviando o item ao armazém antes da inspeção e do pacote internacional. Portanto, “sem atualização” pode significar: compra aguardando ação, envio doméstico do vendedor, recebimento no armazém, preparação do pacote ou transporte internacional.</p><p>Abra o pedido e anote o último evento concluído, data, código disponível e nome da etapa. Não trate um status interno como se fosse um scan do transportador. O primeiro código doméstico pode deixar de ser o código usado depois da consolidação.</p></section>
    <section id="antes-armazem"><span>02 · Antes do armazém</span><h2>Verifique pagamento, compra e despacho do vendedor</h2><p>Confirme se o pagamento foi aceito, se a compra foi realizada e se o vendedor forneceu rastreio doméstico. Um rótulo criado sem movimento é diferente de uma coleta confirmada. Compare o horário do primeiro evento do transportador com o momento em que o pedido ficou disponível para o vendedor.</p><p>Se a página do item exigiu complemento de informação, opção ou preço, o pedido pode estar aguardando sua resposta. Guarde a mensagem e o identificador do item. Quando outro produto já chegou ao armazém, isso não prova atraso deste vendedor.</p></section>
    <section id="depois-envio"><span>03 · Depois do envio internacional</span><h2>Registre o pacote, a rota e o código ativo</h2><p>Depois da submissão do pacote, salve número do pacote, data de pagamento do frete, rota escolhida, código de rastreio e primeiro evento de aceitação. Veja se o código mudou após a entrega a um parceiro ou ao operador de última milha.</p><p>Consulte a página indicada para a rota e, quando o objeto estiver no Brasil, verifique se o código é reconhecido pelos Correios ou pelo transportador informado. Sites genéricos podem reorganizar mensagens; preserve o texto e o horário da fonte responsável pelo evento.</p></section>
    <section id="pausa"><span>04 · Pausa no rastreio</span><h2>Uma lacuna não identifica sozinha a causa</h2><p>O rastreio pode ficar sem novo scan entre centros, durante voo, transferência, processamento aduaneiro ou integração com o operador local. A ausência de evento não demonstra perda nem libera uma promessa de prazo. Compare a última localização, a descrição do evento e o próximo marco esperado para a rota.</p><p>Evite atualizar a página repetidamente sem registrar mudanças. Faça uma captura do último evento, espere o intervalo indicado pelo canal oficial da rota e use esse registro se precisar solicitar verificação.</p></section>
    <section id="estado-anormal"><span>05 · Estado anormal</span><h2>Leia a mensagem literalmente e identifique quem pode agir</h2><p>“Estado anormal”, falha de entrega, endereço insuficiente, retenção ou devolução são categorias diferentes. Copie a mensagem completa e o código, não apenas o título. Confira se o problema pertence ao endereço, ao desembaraço, ao transporte, à entrega local ou a uma atualização interna.</p><p>Quando houver solicitação de documento ou pagamento, entre somente pelo domínio oficial do operador informado no pedido ou no rastreio. Não use links recebidos por mensagem sem confirmar a origem. O site Hubbuy Sheet não visualiza pedidos nem recebe pagamentos.</p></section>
    <section id="suporte"><span>06 · Dados para suporte</span><h2>Envie um pacote de evidências que reduza idas e voltas</h2><ul><li>Número do pedido e, se existir, número do pacote.</li><li>Código de rastreamento ativo e rota escolhida.</li><li>Último evento completo, com data e fuso quando disponível.</li><li>Endereço de destino mascarado, preservando cidade, UF e CEP para conferência.</li><li>Capturas da página oficial e descrição objetiva do que você precisa confirmar.</li></ul><p>Não envie senha, código de acesso ou número completo de pagamento. Pergunte pela próxima ação verificável: confirmação do código, transportador responsável, documento necessário ou abertura de consulta.</p></section>
    <section id="proximo-passo"><span>07 · Próximo passo</span><h2>Use o último handoff confirmado para escolher o canal</h2><p>Antes do despacho do vendedor, trate o pedido. Entre vendedor e armazém, investigue o envio doméstico. Depois da submissão internacional, use os dados da rota, do transportador e do operador local. Se o status mostrar entrega mas o pacote não estiver com você, registre portaria, vizinho autorizado e prova disponibilizada pelo operador.</p><p>Para evitar lacunas no próximo envio, guarde o histórico desde a compra e revise o <Link href="/pt-br/guides/shipping/">checklist de pacote</Link> antes de pagar o frete internacional.</p></section>
    <SourceBoundary links={[["Hubbuy", "https://hubbuy.com/"], ["Correios", "https://www.correios.com.br/"]]}>A separação entre pedido, armazém e pacote foi conferida no fluxo público do Hubbuy em 9 de setembro de 2026. Prazos, rotas e canais variam; o evento do transportador e a interface ativa controlam o caso concreto.</SourceBoundary>
  </>;
}

const bodies = {
  "como-pesquisar-no-hubbuy-produtos-lojas-links": SearchArticle,
  "planilha-hubbuy-tenis-nike-golden-goose-qc": ShoesArticle,
  "hubbuy-preco-em-real-cambio-taxas": PriceArticle,
  "numero-da-porta-hubbuy-endereco-brasil": AddressArticle,
  "rastreamento-hubbuy-pedido-sem-atualizacao": TrackingArticle,
};

export const portugueseGrowthSlugs = new Set(Object.keys(bodies));

export default function PortugueseGrowthArticle({ article }) {
  const Body = bodies[article.slug];
  return Body ? <Body /> : null;
}
