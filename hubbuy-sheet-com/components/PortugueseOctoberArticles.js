import Link from "next/link";
import SearchBox from "@/components/SearchBox";

export default function PortugueseOctoberArticle({ article }) {
  return <>
    <p className="article-deck">{article.deck}</p>
    {article.sections.map((section, index) => <section id={section.id} key={section.id}>
      <span>{String(index + 1).padStart(2, "0")} · {article.category}</span>
      <h2>{section.title}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {article.slug === "pre-embalagem-hubbuy-rehearsal-shipping" && index === 0 && <div className="article-point-grid">
        <div><b>ESTIMATIVA</b><strong>Planejar o orçamento</strong><span>Calcula um cenário com os dados informados; peso e dimensões podem mudar.</span></div>
        <div><b>PRÉ-EMBALAGEM</b><strong>Conferir o pacote</strong><span>Quando disponível, permite rever a decisão com o resultado da preparação.</span></div>
        <div><b>SUBMIT PARCEL</b><strong>Solicitar o envio</strong><span>Confirme itens, proteção, rota e cobrança na etapa final antes de autorizar.</span></div>
      </div>}
    </section>)}
    <div className="article-sources">
      <strong>Fontes e limite da verificação</strong>
      <p>Fluxo público de compra, inspeção, consolidação e calculadora do HubbuyCN consultados em 1 de outubro de 2026. Os exemplos de medidas e cálculos são ilustrativos. Regras, serviços, valores e prazos do pedido devem ser confirmados na interface ativa; este guia independente não representa o atendimento da plataforma.</p>
    </div>
    <section className="article-search">
      <h2>Continue a pesquisa do seu produto</h2>
      <p>Encontre uma referência no catálogo e confirme anúncio, variante e preço na página atual.</p>
      <SearchBox compact />
    </section>
  </>;
}

export function PortugueseRelatedArticles({ article }) {
  const links = article.related || [
    ["/pt-br/articles/tamanhos-roupas-hubbuy-medidas-brasil/", "Tabela de medidas para roupas"],
    ["/pt-br/articles/devolucao-reembolso-hubbuy-apos-qc/", "Devolução e acompanhamento do reembolso"],
    ["/pt-br/articles/pre-embalagem-hubbuy-rehearsal-shipping/", "Pré-embalagem antes do envio"],
    ["/pt-br/articles/link-hubbuy-nao-funciona-produto-original/", "Como verificar um link que não funciona"],
  ];
  return <section className="related-guides"><div className="wrap">
    <span className="eyebrow">Leitura relacionada</span>
    <h2>Resolva a próxima etapa da compra</h2>
    <div>{links.map(([href, label]) => <Link key={href} href={href}>{label} →</Link>)}</div>
  </div></section>;
}

export function PortugueseShippingUpdate({ slug }) {
  if (slug !== "hubbuy-shipping-cost-guide") return null;
  return <section id="frete-brasil"><span>Atualização · Outubro de 2026</span>
    <h2>Frete Hubbuy para o Brasil: confira a base de cada cotação</h2>
    <p>Compare propostas para o mesmo destino, com a mesma lista de itens e a mesma proteção. Registre peso real, dimensões externas, regra de peso cobrável da rota, moeda e serviços incluídos. A calculadora pública solicita país, categoria de mercadoria, peso em gramas e dimensões em centímetros; preencher apenas um peso aproximado não fecha o custo do pacote.</p>
    <p>Como exemplo didático, uma caixa de 40 × 30 × 20 cm tem volume de 24.000 cm³. Se uma rota usar divisor 6.000, o peso volumétrico será 4 kg; com divisor 5.000, será 4,8 kg. Esses divisores ilustram o cálculo, não são uma regra confirmada para todas as rotas Hubbuy. Confira também arredondamento, limites e o valor efetivamente apresentado antes de pagar.</p>
    <p>Uma cotação menor para caixa sem proteção não é equivalente à cotação de um pacote protegido. Para decidir se vale obter medidas do pacote preparado, veja o <Link href="/pt-br/articles/pre-embalagem-hubbuy-rehearsal-shipping/">guia de pré-embalagem e envio</Link>. Mantenha produto, frete doméstico, frete internacional e demais cobranças identificadas em linhas separadas do orçamento.</p>
  </section>;
}
