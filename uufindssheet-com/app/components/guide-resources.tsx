import Link from "next/link";
import type { Guide } from "../guides/article-data";
import { releaseUi, type ReleaseLocale } from "../guides/november-release";

export function GuideResources({ guide, locale = "en" }: { guide: Guide; locale?: ReleaseLocale }) {
 const ui = releaseUi[locale];
 return <>
  {guide.relatedLinks && <section className="related-reading" aria-labelledby="related-reading-heading">
   <h2 id="related-reading-heading">{ui.next}</h2>
   <div className="related-reading-grid">{guide.relatedLinks.map(item => <Link href={item.href} key={item.href} data-track-event="guide_click" data-cta-position="related_reading"><strong>{item.label} →</strong><span>{item.description}</span></Link>)}</div>
  </section>}
  {guide.sources && <section className="guide-sources" aria-labelledby="guide-sources-heading">
   <h2 id="guide-sources-heading">{ui.sources}</h2>
   <ul>{guide.sources.map(source => <li key={source.href}><a href={source.href} rel="noreferrer" target="_blank">{source.label} ↗</a></li>)}</ul>
  </section>}
 </>;
}
