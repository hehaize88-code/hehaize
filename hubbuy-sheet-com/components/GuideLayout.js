import SearchBox from "@/components/SearchBox";
import { CheckIcon } from "@/components/Icons";

export function GuideShell({ children, toc, noTranslate = false }) {
  return (
    <div className="wrap guide-layout" data-no-translate={noTranslate ? "" : undefined}>
      <aside className="guide-aside">
        <div className="guide-aside-card">
          <strong>On this page</strong>
          {toc.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
        </div>
        <div className="guide-aside-note">
          <CheckIcon />
          <p>Product prices, platform fees and shipping options can change. Confirm the current live page before paying.</p>
        </div>
      </aside>
      <article className="guide-article">{children}<div className="article-search"><h2>Ready to check a live product?</h2><SearchBox compact /></div></article>
    </div>
  );
}

export function GuideSection({ id, kicker, title, children }) {
  return <section id={id} className="guide-section"><span>{kicker}</span><h2>{title}</h2>{children}</section>;
}
