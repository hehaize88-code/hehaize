import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localizedAlternates } from "../seo-alternates";

export const metadata: Metadata = {
  title: "UUFinds FAQ: QC Photos, Link Matching & Buying Checks",
  description:
    "Fact-checked answers about UUFinds QC photos, videos, image recognition, Taobao, Weidian and 1688 links, plus the checks to make before opening CNBuy Sheet.",
  alternates: localizedAlternates("/faq/"),
  openGraph: {
    title: "UUFinds FAQ: QC Photos, Link Matching & Buying Checks",
    description: "Fact-checked answers about UUFinds QC photos, videos, image recognition, Taobao, Weidian and 1688 links, plus the checks to make before opening CNBuy Sheet.",
    url: "/faq/",
    siteName: "UUFinds Sheet",
    type: "website",
  },
};

export const faqGroups = [
  {
    id: "using-uufinds",
    label: "01 / Using UUFinds",
    title: "What the public tools actually do",
    items: [
      {
        question: "What does UUFinds actually do?",
        answer:
          "UUFinds publicly describes its main service as a QC finder that helps users locate available product photos and videos. Its QC finder also advertises image recognition, while its public app information describes link conversion and product-discovery functions. Treat it as a research and browsing tool: it can help you find evidence or a candidate listing, but it is not the seller and it does not make the purchasing decision for you.",
      },
      {
        question: "Which product links does UUFinds say it can handle?",
        answer:
          "The current public app listing from Uufinds Limited names 1688, Taobao, Weidian and shopping-agent links. UUFinds also publishes a universal agent-link converter. That supports using those link families as inputs, but it does not mean every copied URL will produce a result. Expired listings, shortened links, tracking parameters or a link to a visually similar product can still prevent an exact match.",
      },
      {
        question: "Can UUFinds convert a shopping-agent link back to another format?",
        answer:
          "Link conversion is one of the functions described by UUFinds in its public converter and app information. Conversion can make the underlying product route easier to reuse with another supported service. It does not verify the seller, product version, price, stock or QC availability. After converting, compare the item identifier and seller details instead of assuming the new link proves an exact match.",
      },
      {
        question: "Can I search UUFinds with an image instead of a product link?",
        answer:
          "Yes, image recognition and image-search improvements are publicly described by UUFinds. An image is best used to generate candidates when the original link is missing. A similar silhouette, color or promotional photo is not enough to establish that the result comes from the same seller, batch or variant. Move from the image result to an identifiable listing before relying on any QC album.",
      },
      {
        question: "Do I need an account to use every UUFinds feature?",
        answer:
          "UUFinds has public login and registration pages, and its registration copy says signing up unlocks more searches and full features. Access rules can change, so this guide does not promise that every feature is available without an account or that a fixed search allowance will remain unchanged. Use the current interface as the authority for account requirements.",
      },
    ],
  },
  {
    id: "matching-results",
    label: "02 / Matching results",
    title: "How to avoid checking the wrong product",
    items: [
      {
        question: "Why might a product link return no QC result?",
        answer:
          "UUFinds does not publicly promise recent QC media for every marketplace listing. A blank result can mean that no matching album is available, the link format is not resolving, the listing has changed, or the source item has never been photographed in the available data. Try the clean original marketplace URL, preserve the item identifier and remove unnecessary tracking parameters. If the result is still empty, record it as “no evidence found” rather than interpreting it as good or bad quality.",
      },
      {
        question: "How do I know a QC album belongs to the exact listing?",
        answer:
          "Start with the strongest identifiers: item ID, seller or store, selected model, color and visible variant details. Then compare the listing images with the QC set for distinctive construction, print placement, hardware or packaging. A title or a visually similar thumbnail is weak evidence because multiple sellers can use the same catalog image. If the seller or item ID does not agree, label the album as a reference only.",
      },
      {
        question: "What if image search finds a similar product from another seller?",
        answer:
          "Use it to learn what details deserve inspection, not to grade your intended listing. A similar result may reveal common stitching patterns, measurements or packaging, but it cannot establish the material, batch or workmanship of another seller’s item. Keep searching for the exact source link, or compare several live listings on CNBuy Sheet and clearly mark which evidence belongs to which product.",
      },
      {
        question: "Does an old QC album still help?",
        answer:
          "It can help identify visible design details and known inspection points, especially when the item ID and seller still match. Its value falls as the time gap grows because sellers can change batches, factories, materials, sizing or listing options. Record the QC date, compare more than one set when available and use the live destination page for current price, variants and availability.",
      },
    ],
  },
  {
    id: "reading-qc",
    label: "03 / Reading QC evidence",
    title: "What photos and videos can—and cannot—prove",
    items: [
      {
        question: "Does a UUFinds QC photo guarantee product quality?",
        answer:
          "No. A QC photo records the visible condition of one photographed item at one point in time. It can support observations about shape, stitching, print position, hardware, labels, color consistency and any measurements shown. It cannot guarantee that a later unit, another size or a new production batch will be identical. Separate what is visible from what you are merely inferring.",
      },
      {
        question: "Is a QC video more reliable than still photos?",
        answer:
          "Video can add useful evidence: fabric drape, zipper movement, sole flex, reflectivity and angles that may be absent from a photo set. It still cannot prove long-term durability, internal electronic condition, material composition or authenticity. Pause at key frames, compare the video with still images and list any important area that remains hidden.",
      },
      {
        question: "Can QC photos confirm the correct clothing or shoe size?",
        answer:
          "Only when a relevant measurement is clearly visible and the matched listing is exact. For clothing, useful evidence can include chest width, length, sleeve or waist measurements. For footwear, an insole or outsole measurement may help, but it is not automatically the same as internal fit. Compare the photographed measurement with the live size chart and your own known measurements.",
      },
      {
        question: "What should I inspect first in a QC album?",
        answer:
          "First confirm that the album matches the intended item. Then inspect overall shape and proportion before zooming into construction details. For clothing, check seams, print placement and measurements; for footwear, check symmetry, sole alignment and glue lines; for bags and accessories, check hardware, edge paint and strap attachment; for electronics, limit conclusions to visible exterior condition unless functional evidence is actually shown.",
      },
      {
        question: "What is the safest conclusion when an important angle is missing?",
        answer:
          "Mark it as unknown. Do not convert a missing outsole photo, label view, measurement or functional test into a positive assumption. Decide whether the existing evidence is enough for your risk tolerance, compare another listing with better documentation, or wait for more information. A disciplined unknown is more useful than an invented answer.",
      },
    ],
  },
  {
    id: "this-site",
    label: "04 / This independent guide",
    title: "Where the links go and what to re-check",
    items: [
      {
        question: "Is uufindssheet.com the official UUFinds website?",
        answer:
          "No. UUFinds Sheet is an independent editorial and routing guide. It explains a research method around publicly described UUFinds functions, but it is not operated by, endorsed by or affiliated with UUFinds. There are no clickable UUFinds outbound links on this site.",
      },
      {
        question: "Why do the shopping links open CNBuy Sheet?",
        answer:
          "This site is designed to connect research with your next browsing step on CNBuy Sheet. Product cards open an on-site detail page first, then provide a direct route to the matching CNBuy Sheet item. Category buttons open the corresponding CNBuy Sheet category, and the search box passes your complete keyword phrase to CNBuy Sheet rather than sending every visitor to a generic page.",
      },
      {
        question: "Are the product images on this site UUFinds warehouse QC photos?",
        answer:
          "No. The product images displayed in the product section come from the corresponding CNBuy Sheet listings and are presented as listing images. They should not be treated as warehouse QC evidence. Use them to identify the product route, then separately match any available QC material to the exact item and seller.",
      },
      {
        question: "What should I re-check on CNBuy Sheet before continuing?",
        answer:
          "Confirm the exact product ID and destination link, current price, seller or source information, available colors and sizes, measurement details, stock status and any terms shown on the live page. If an older article, saved image or QC album conflicts with the current listing, treat the live listing as the source for current commercial information and the older material only as historical research evidence.",
      },
    ],
  },
];

const faqEntities = faqGroups.flatMap((group) =>
  group.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
);

export default function FAQPage() {
  return (
    <main className="hub-page faq-page">
      <SiteHeader routePath="/faq/" />
      <section className="hub-hero faq-hero">
        <p className="eyebrow">FAQ / Official functions reviewed July 23, 2026</p>
        <h1>Useful questions.<br /><em>Evidence-based answers.</em></h1>
        <p>
          Straight answers about UUFinds QC searches, image matching, marketplace links and the checks that still belong on the live CNBuy Sheet product page.
        </p>
      </section>

      <section className="hub-content faq-page-content">
        <div className="official-fact-strip">
          <article>
            <span>01</span>
            <div><strong>QC discovery</strong><p>UUFinds publicly describes a finder for available product photos and videos.</p></div>
          </article>
          <article>
            <span>02</span>
            <div><strong>Search inputs</strong><p>Its public information names image recognition plus 1688, Taobao, Weidian and agent links.</p></div>
          </article>
          <article>
            <span>03</span>
            <div><strong>Evidence boundary</strong><p>A matched album documents a sample; it does not guarantee a later unit or live listing data.</p></div>
          </article>
        </div>

        <div className="faq-directory">
          <aside aria-label="FAQ topics">
            <p className="eyebrow">Jump to a topic</p>
            {faqGroups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.label}</a>)}
          </aside>

          <div className="faq-groups">
            {faqGroups.map((group, groupIndex) => (
              <section id={group.id} className="faq-group" key={group.id}>
                <p className="eyebrow">{group.label}</p>
                <h2>{group.title}</h2>
                <div className="faq-list">
                  {group.items.map((item, itemIndex) => (
                    <details key={item.question} open={groupIndex === 0 && itemIndex === 0}>
                      <summary>{item.question}<span aria-hidden="true">+</span></summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="source-method-note">
          <p className="eyebrow">Source boundary / Reviewed July 23, 2026</p>
          <p>
            Function claims were checked against UUFinds’ public QC finder, QC browsing copy, universal link converter, login and registration pages, personalized display description and the current App Store listing from Uufinds Limited. Those sources support QC-photo and QC-video discovery, image recognition, link conversion and the named marketplace inputs. They do not support a promise of QC coverage for every product, unchanged account limits, guaranteed quality, fixed shipping prices or identical future batches.
          </p>
        </div>

        <section className="faq-next-step">
          <div>
            <p className="eyebrow inverse">Ready to apply the method?</p>
            <h2>Match first. Inspect second. Confirm the live listing last.</h2>
          </div>
          <div>
            <Link href="/guides/uufinds-qc-checklist/">Open the full QC checklist →</Link>
            <Link href="/products/">Browse product details →</Link>
          </div>
        </section>
      </section>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqEntities,
          }),
        }}
      />
    </main>
  );
}
