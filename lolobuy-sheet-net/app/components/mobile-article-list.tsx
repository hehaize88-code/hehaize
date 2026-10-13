"use client";

import { Children, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "../translations";
import { mobileCopy } from "./mobile-reading";

export default function MobileArticleList({ children, locale }: { children: ReactNode; locale: Locale }) {
  const cards = Children.toArray(children);
  const [mobile, setMobile] = useState(false);
  const [shown, setShown] = useState(6);
  const [printing, setPrinting] = useState(false);
  useEffect(() => {
    const media = matchMedia("(max-width: 680px)");
    const sync = () => setMobile(media.matches);
    const before = () => setPrinting(true), after = () => setPrinting(false);
    sync(); media.addEventListener("change", sync);
    window.addEventListener("beforeprint", before); window.addEventListener("afterprint", after);
    return () => { media.removeEventListener("change", sync); window.removeEventListener("beforeprint", before); window.removeEventListener("afterprint", after); };
  }, []);
  const limit = mobile && !printing ? shown : cards.length;
  return <div className="mobile-list-region">
    <section className="section-shell article-index" id="article-list">
      {cards.map((card, i) => <div className="mobile-list-item" key={i} hidden={i >= limit}>{card}</div>)}
    </section>
    {cards.length > 6 && <div className="mobile-list-controls">
      <span role="status">{Math.min(limit, cards.length)} / {cards.length}</span>
      {shown < cards.length && <button type="button" aria-controls="article-list" onClick={() => setShown(n => Math.min(n + 6, cards.length))}>{mobileCopy[locale][2]}</button>}
      {shown > 6 && <button type="button" aria-controls="article-list" onClick={() => { setShown(6); document.getElementById("article-list")?.scrollIntoView({ block: "start" }); }}>{mobileCopy[locale][3]}</button>}
    </div>}
  </div>;
}
