import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";

export const metadata: Metadata = { title: "About This Independent CSSBuy Index", description: "Learn how CSSBuy China checks product routes, presents recorded CNY values, researches public CSSBuy service information, and separates facts from product-quality claims.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <InfoPage eyebrow="About the index" title="A cleaner CSSBuy find index, built around evidence." intro="CSSBuy China organizes product routes into focused pages and separates checked links, public service facts, estimates, and shopper decisions.">
    <h2>Why this site exists</h2><p>Large spreadsheets can be fast to publish but difficult to browse, search, and maintain. This index gives categories, finds, guides, and common questions their own readable pages. The goal is to help shoppers reach the matching product page and make better checks before ordering.</p>
    <h2>What “route checked” means</h2><p>It means the displayed destination was reachable and matched the find on the visible check date. It does not mean the seller, item quality, stock, authenticity, sizing, price, or international eligibility has been guaranteed. Those details can change and must be reviewed again before payment.</p>
    <h2>Editorial approach</h2><p>Service explanations are reviewed against CSSBuy's public homepage, item-page workflow, warehouse information, estimator, and FAQ, with the check date shown in long-form content. We avoid invented customer reviews, rating badges, fee percentages, delivery promises, and unsupported product-count claims. CNY values are retained and USD conversions are labeled as estimates.</p>
    <h2>Why some facts include a warning</h2><p>Public service pages can differ by context. For example, CSSBuy's homepage states 90 days of free storage, while some public product pages distinguish common and sensitive items. Where public statements differ, this guide identifies the difference and tells the reader to use the deadline displayed for the specific order.</p>
    <h2>Independence</h2><p>CSSBuy China is an independent guide. It is not operated by or affiliated with CSSBuy. Names are used descriptively so readers understand the topic of the index.</p>
  </InfoPage>;
}
