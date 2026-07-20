import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCover from "@/components/ArticleCover";
import AdditionalArticleBody from "@/components/AdditionalArticleBodies";
import SearchBox from "@/components/SearchBox";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { articles, getArticle } from "@/data/articles";
import { SITE_URL } from "@/data/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const path = `/articles/${article.slug}/`;
  return {
    title: { absolute: article.seoTitle },
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `${SITE_URL}${path}`,
      publishedTime: article.published,
      modifiedTime: article.updated,
      images: [{ url: "/brand/og-card.png", width: 1200, height: 630, alt: article.title }],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleUrl = `${SITE_URL}/articles/${article.slug}/`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: article.published,
    dateModified: article.updated,
    wordCount: article.wordCount,
    inLanguage: "en",
    author: { "@type": "Organization", name: "Hubbuy Sheet Editorial" },
    publisher: {
      "@type": "Organization",
      name: "Hubbuy Sheet",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/hubbuy.png` },
    },
    image: [`${SITE_URL}/brand/og-card.png`, ...article.images.map((src) => `${SITE_URL}${src}`)],
    citation: ["https://hubbuy.com/"],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE_URL}/articles/` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header className="seo-article-hero">
        <div className="wrap seo-article-hero-grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span><Link href="/articles">Articles</Link><span>/</span><span>Field guide</span>
            </nav>
            <div className="article-card-meta"><span>{article.category}</span><span>English article</span></div>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
            <div className="article-byline">
              <span>Hubbuy Sheet Editorial</span>
              <span>Published {article.displayDate}</span>
              <span>{article.readTime}</span>
            </div>
          </div>
          <ArticleCover cover={article.cover} />
        </div>
      </header>

      <section className="seo-article-section">
        <div className="wrap seo-article-layout">
          <aside className="article-toc">
            <strong>In this article</strong>
            {article.toc.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
            <Link href="/articles">All articles <ArrowIcon size={14} /></Link>
          </aside>

          <article className="seo-article-body" data-no-translate>
            {article.slug === "how-to-use-a-hubbuy-spreadsheet" ? <>
            <p className="article-deck">A Hubbuy spreadsheet is useful when it gets you to the right product link faster. It becomes risky when the shortcut is mistaken for the source of truth. The practical approach is to treat the spreadsheet as discovery, the live seller page as evidence and Hubbuy as the purchasing, warehouse and parcel layer between China and your address.</p>

            <div className="article-disclosure">
              <CheckIcon />
              <p><strong>Research note:</strong> This independent guide was checked against the public <a href="https://hubbuy.com/" target="_blank" rel="noopener">Hubbuy homepage</a> on 20 July 2026. It does not accept orders or payments. Where the public page does not provide a number or rule, this article does not invent one.</p>
            </div>

            <section id="official">
              <span>01 · Verified on the official website</span>
              <h2>Hubbuy is a staged buying process, not one international checkout</h2>
              <p>Hubbuy’s homepage describes the service in plain terms: it purchases Chinese goods for customers. More importantly, its public “How to Purchase” section breaks the journey into three stages. First, the shopper searches for a product and places an order, paying the product price and the China shipping fee. Hubbuy then orders the goods, and the seller sends them to the warehouse.</p>
              <p>The second stage begins at warehouse arrival. Hubbuy says the item enters quality inspection, the buyer receives free quality-inspection images and storage is free for 300 days. The third stage is the parcel: different orders can be combined, the buyer pays the international shipping fee and then waits for delivery.</p>
              <p>That sequence is the most useful fact on the whole site because it shows where each decision belongs. A low seller price is not a delivered price. A paid product is not yet an international parcel. A warehouse photo is a checkpoint between those two moments. The navigation also exposes separate entries for a shipping-cost estimate, forwarding and “Fill & Buy,” reinforcing that there is more than one way to begin, but the same basic warehouse-and-parcel logic still matters.</p>

              <div className="official-workflow" aria-label="Hubbuy official three-stage buying workflow">
                <div><b>01</b><strong>Order</strong><span>Product price + China shipping</span></div>
                <div><b>02</b><strong>Warehouse</strong><span>Inspection images + storage</span></div>
                <div><b>03</b><strong>Parcel</strong><span>Combine orders + international shipping</span></div>
              </div>
            </section>

            <section id="source">
              <span>02 · Before submitting a product</span>
              <h2>Use the spreadsheet to discover the item; verify it on the live source page</h2>
              <p>I would not begin with “Is this item cheap?” The better first question is “Can I identify the exact item I am asking someone else to buy?” A spreadsheet card can be useful and still be old. Sellers change prices, replace pictures, remove colors and rewrite size charts. Even two options on the same listing can represent different materials or models.</p>
              <p>Open the live source page and match five things before you submit anything: seller, current price, color or model, size, and quantity. Read the option text instead of relying on the thumbnail. If buyer feedback or recent sales are visible, use them as context rather than proof. When the original listing has disappeared, a similar image is not evidence that a replacement is identical.</p>
              <div className="article-callout">
                <strong>My four-file rule</strong>
                <p>Save the source URL, a screenshot of the selected option, the seller’s size chart and any note that changes the order. Those four records give you something concrete to compare with the warehouse images later.</p>
              </div>

              <figure className="article-image-pair">
                <div>
                  <img src="/products/3356.webp" alt="Catalog example showing front and back views of a black jacket" width="750" height="750" loading="lazy" />
                  <span>Front and back views help define the expected shape.</span>
                </div>
                <div>
                  <img src="/products/3346.webp" alt="Catalog example showing several backpack color variants" width="750" height="750" loading="lazy" />
                  <span>Several colors on one page make the exact variant essential.</span>
                </div>
                <figcaption>Illustrative catalog references from this website’s linked product feed. They are not Hubbuy warehouse QC images and make no authenticity claim.</figcaption>
              </figure>
            </section>

            <section id="cost">
              <span>03 · Cost planning</span>
              <h2>The official workflow tells you why the source price is only the first number</h2>
              <p>Hubbuy’s public process places the product price and China shipping fee at the order stage, while international shipping is paid later at the parcel stage. That is enough to reject the most common bad calculation: treating the seller price as the delivered total.</p>
              <p>Build a range instead. Include the item, delivery to the Chinese warehouse, any current payment or optional-service costs shown in your account, packing choices, international freight and possible destination taxes. Some figures will remain unknown until the item is weighed and the parcel is packed, so a precise-looking early total can be less honest than a sensible low-to-high estimate.</p>
              <div className="article-formula">
                <small>Useful planning range</small>
                <strong>Item + China shipping + current account charges + packing + international shipping + destination charges</strong>
              </div>
              <p>The public navigation includes a shipping-cost estimate, which is useful for planning scenarios. Still, treat any pre-warehouse result as an estimate rather than the final packed bill. A shoe box, a bulky jacket or protective packing can change chargeable volume. Check the live exchange rate, route rules and promotions when you actually pay; this article deliberately avoids publishing a fixed markup or coupon as though it were permanent.</p>
            </section>

            <section>
              <span>04 · Order instructions</span>
              <h2>Write instructions that a warehouse team can actually verify</h2>
              <p>Select the exact color, size, model and quantity. If a seller uses an unusual option name, copy it exactly and add one short distinguishing note. Measurements in centimetres are more useful than “I usually wear a US medium,” because regional labels are not consistent. Before payment, compare the product image, variant text, quantity and China shipping charge with the evidence you saved.</p>
              <p>Keep requests observable. “Please make sure it is high quality” cannot be proven from a warehouse desk. “Please check that the size label says XL and photograph the chest measurement” gives the team a specific task.</p>
            </section>

            <section id="qc">
              <span>05 · Warehouse arrival</span>
              <h2>Hubbuy advertises free QC images—use them to answer specific questions</h2>
              <p>The official homepage explicitly says that goods enter the warehouse for quality inspection and that free quality-inspection images are provided. It does not state a universal image count in that public workflow, so check the actual photo set and any extra-photo options shown inside the current order rather than relying on an old post.</p>
              <p>QC is most useful when you know what would make you accept or reject the item. First compare it with the saved option. Then count visible pieces, inspect the overall shape, look for obvious stains or damage, and read any visible size or model label. After that, switch to category-specific questions: clothing needs useful measurements and seam views; shoes benefit from both sides, soles and size tags; bags benefit from straight views, hardware and included straps.</p>
              <p>A warehouse photo can reduce visible uncertainty, but it cannot certify authenticity, material composition, internal electronics, exact fit or long-term durability. If one important fact is missing, ask for one clear image. “Place a ruler across the insole from heel to toe” is actionable. “Send better photos” is not. Our separate <Link href="/guides/qc-checks">Hubbuy QC checklist</Link> gives category-by-category prompts.</p>
              <ul>
                <li><strong>Identity:</strong> Does the visible product match the saved option?</li>
                <li><strong>Quantity:</strong> Are the expected pieces and accessories present?</li>
                <li><strong>Condition:</strong> Is there visible damage, staining or deformation?</li>
                <li><strong>Scale:</strong> Is a measurement needed before you approve it?</li>
              </ul>
            </section>

            <section id="storage">
              <span>06 · Warehouse timing</span>
              <h2>Use the advertised 300-day free-storage period as breathing room, not a deadline to ignore</h2>
              <p>Hubbuy’s homepage currently advertises 300 days of free storage. That can be valuable when orders from different sellers arrive on different dates, but “free storage” should not become “forget the order.” Track each arrival, complete QC while the evidence is fresh and check the live storage and return rules before waiting for another seller. The practical purpose of storage is consolidation and decision time—not indefinite ownership by the warehouse.</p>
            </section>

            <section id="parcel">
              <span>07 · International shipping</span>
              <h2>Combine orders only after every item has passed review</h2>
              <p>The official site says Hubbuy supports combining different orders for shipping and describes combining products from multiple sellers into one parcel as a way to lower cost. The important word is “can.” Consolidation is useful, but it is not automatically the cheapest or safest answer for every mix of goods.</p>
              <p>Approve each item first. Then compare the combined actual weight, dimensions, packaging needs and available routes. A light but bulky parcel may be charged by volume. Batteries, liquids, fragile goods and other restricted categories may reduce the route choices. Removing unnecessary retail packaging can reduce volume, while shoes, structured bags or breakable items may justify more protection.</p>
              <p>Compare routes by eligibility, chargeable weight, tracking, expected handling, compensation limits and destination customs—not by the headline price alone. The official sequence places international shipping payment at this parcel stage, which is exactly when you finally have enough warehouse information to make a sensible choice. Use the <Link href="/guides/shipping">parcel-planning guide</Link> before submitting.</p>
            </section>

            <section id="mistakes">
              <span>08 · Avoidable errors</span>
              <h2>Five mistakes that turn a useful spreadsheet into an expensive shortcut</h2>
              <ol>
                <li><strong>Buying from the card alone.</strong> A curated card cannot confirm today’s price, seller or available variant.</li>
                <li><strong>Budgeting only for the product.</strong> Hubbuy’s own workflow separates China shipping from later international shipping.</li>
                <li><strong>Writing vague instructions.</strong> Exact option names and measurable requests are easier to purchase and inspect.</li>
                <li><strong>Treating QC as certification.</strong> Photos show visible details; they do not prove everything about the product.</li>
                <li><strong>Choosing a route before packing.</strong> Final weight, dimensions, restrictions and protection needs belong in the shipping decision.</li>
              </ol>
            </section>

            <section>
              <span>Final checklist</span>
              <h2>The workflow worth repeating</h2>
              <p>Discover the product, open the live source, save the exact variant, estimate a delivered-cost range and submit precise instructions. When it reaches the warehouse, compare the free QC images with your saved evidence. Approve the item before consolidation, then choose packaging and shipping from the final parcel data. Keep the order summary, photos, parcel measurements and tracking until delivery is complete.</p>
            </section>

            <section id="faq" className="article-faq-section">
              <span>Hubbuy spreadsheet FAQ</span>
              <h2>Short answers based on the public workflow</h2>
              <div className="article-faq-list">
                <div><h3>What is a Hubbuy spreadsheet?</h3><p>It is an independent product-discovery list, not the seller page and not Hubbuy’s checkout. Use it to find leads, then verify the live listing before paying.</p></div>
                <div><h3>Does Hubbuy provide QC photos?</h3><p>Yes. The official homepage currently says customers receive free quality-inspection images after warehouse arrival. It does not publish a universal image count in that public workflow.</p></div>
                <div><h3>Can Hubbuy combine different orders?</h3><p>Yes. The homepage says different orders can be combined for shipping and also describes combining products from multiple sellers into one parcel.</p></div>
                <div><h3>When do I pay international shipping?</h3><p>The public three-stage process places that payment after warehouse inspection, when you prepare the parcel for international delivery.</p></div>
              </div>
            </section>

            <div className="article-sources">
              <strong>Official source and editorial boundary</strong>
              <p>The three purchase stages, free quality-inspection images, 300-day free storage, order consolidation and separate international-shipping payment were checked on the <a href="https://hubbuy.com/" target="_blank" rel="noopener">official Hubbuy homepage</a> on 20 July 2026. Product-research, QC interpretation and parcel-planning recommendations are independent editorial guidance. No fixed exchange markup, photo count, extra-photo fee, route price, delivery time or customs result is claimed.</p>
            </div>

            <div className="article-search">
              <h2>Ready to check a live product?</h2>
              <p>Search the current catalog, then verify the individual listing before making a decision.</p>
              <SearchBox compact />
            </div>
            </> : <AdditionalArticleBody article={article} />}
          </article>
        </div>
      </section>

      <section className="related-guides">
        <div className="wrap">
          <span className="eyebrow">Continue reading</span>
          <h2>Use the guide for the next decision.</h2>
          <div>
            <Link href="/guides/how-to-buy">Beginner buying workflow <ArrowIcon /></Link>
            <Link href="/guides/qc-checks">Warehouse QC checklist <ArrowIcon /></Link>
            <Link href="/guides/shipping">Parcel planning guide <ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
