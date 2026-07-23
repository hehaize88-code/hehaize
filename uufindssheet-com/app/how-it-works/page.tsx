import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export const metadata: Metadata = {
  title: "How to Use UUFinds QC Research Before Opening CNBuy Sheet",
  description: "A fact-checked UUFinds workflow for matching a product link, reading available QC photos or video, and verifying the live CNBuy Sheet listing.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <main className="hub-page">
      <SiteHeader />
      <section className="hub-hero">
        <p className="eyebrow">How it works / Fact-checked July 23, 2026</p>
        <h1>Match the link.<br />Read the evidence.<br /><em>Verify what changed.</em></h1>
        <p>UUFinds publicly describes a QC finder for photos and videos, image recognition, and link handling for Taobao, Weidian, 1688 and shopping agents. Those tools can support research, but the exact live listing still decides the current price, variants and availability.</p>
      </section>
      <section className="hub-content how-page-content">
        <div className="official-fact-strip" aria-label="Verified UUFinds functions">
          <article><span>01</span><div><strong>QC media</strong><p>UUFinds says its QC finder can surface available product photos and videos.</p></div></article>
          <article><span>02</span><div><strong>Supported inputs</strong><p>Its public app information names 1688, Taobao, Weidian and shopping-agent link conversion.</p></div></article>
          <article><span>03</span><div><strong>Platform boundary</strong><p>UUFinds states that it does not sell products directly or indirectly.</p></div></article>
        </div>

        <div className="workflow-grid">
          <article>
            <span>01</span>
            <p className="step-label">MATCH</p>
            <h2>Preserve the exact source</h2>
            <p>Keep the full marketplace or agent link. Compare the item ID, seller and visible variant before treating an album as a match. Image recognition may find a visually similar item, but similarity alone does not prove it is the same listing or batch.</p>
            <Link href="/finds">Build a category shortlist →</Link>
          </article>
          <article>
            <span>02</span>
            <p className="step-label">INSPECT</p>
            <h2>Read every available angle</h2>
            <p>Start with silhouette and proportion, then inspect construction, finish and measurements. Note the QC date and whether more than one example exists. Record missing angles as unknowns instead of turning them into assumptions.</p>
            <Link href="/guides/uufinds-qc-checklist">Use the full QC checklist →</Link>
          </article>
          <article>
            <span>03</span>
            <p className="step-label">CONFIRM</p>
            <h2>Check today’s listing facts</h2>
            <p>Open the exact CNBuy Sheet product page and re-check the identifier, current price, variants, size information and availability. An older QC set can inform the decision, but it cannot confirm what the seller offers today.</p>
            <Link href="/products">Open product details →</Link>
          </article>
        </div>

        <section className="evidence-matrix">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Tool versus conclusion</p>
              <h2>Know what each signal can prove.</h2>
            </div>
            <p>This distinction prevents a useful research tool from being mistaken for a product guarantee.</p>
          </div>
          <div className="evidence-grid">
            <article><p className="step-label">QC PHOTOS</p><h3>Useful for visible condition</h3><p>They can show shape, stitching, print placement, hardware and measurements on the photographed item.</p><strong>They cannot guarantee another unit or later batch.</strong></article>
            <article><p className="step-label">QC VIDEO</p><h3>Useful for movement</h3><p>Video can reveal fabric drape, zipper movement, sole flex and angles that a still image may hide.</p><strong>It cannot establish durability or internal electronic condition.</strong></article>
            <article><p className="step-label">IMAGE RECOGNITION</p><h3>Useful for finding candidates</h3><p>A similar image can help locate related listings when the original link is missing or incomplete.</p><strong>It cannot replace the seller and item-ID match.</strong></article>
            <article><p className="step-label">LIVE PRODUCT PAGE</p><h3>Useful for current facts</h3><p>The destination page is where price, available options, seller details and stock must be checked again.</p><strong>It still does not promise that every received item will match an older sample.</strong></article>
          </div>
        </section>

        <section className="decision-checklist">
          <div>
            <p className="eyebrow">Five-line decision record</p>
            <h2>Write this down before you continue.</h2>
          </div>
          <ol>
            <li><span>01</span><p><strong>Match:</strong> exact, probable, or visual reference only.</p></li>
            <li><span>02</span><p><strong>Evidence:</strong> which photos, video, angles and measurements were available.</p></li>
            <li><span>03</span><p><strong>Unknowns:</strong> missing views, material claims, sizing or internal condition.</p></li>
            <li><span>04</span><p><strong>Live check:</strong> current ID, price, variants and availability on CNBuy Sheet.</p></li>
            <li><span>05</span><p><strong>Decision:</strong> keep, compare with another listing, or pause for more evidence.</p></li>
          </ol>
        </section>

        <div className="method-note">
          <p className="eyebrow inverse">Research boundary</p>
          <h2>Discovery expands options. QC reduces uncertainty. The live listing confirms current facts.</h2>
          <p>Official claims reviewed: UUFinds QC finder, QC browsing copy, product-detail disclaimer, account pages and public app information. No UUFinds outbound link is included on this site.</p>
          <Link href="/guides/uufinds-spreadsheet-shopping-guide-2026">Read the complete buying guide →</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
