"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";

const copy = {
  en: { previous: "Previous", next: "Next", page: "Page", of: "of", articles: "articles", nav: "Article pages" },
  "en-gb": { previous: "Previous", next: "Next", page: "Page", of: "of", articles: "articles", nav: "Article pages" },
  de: { previous: "Zurück", next: "Weiter", page: "Seite", of: "von", articles: "Artikel", nav: "Artikelseiten" },
  pl: { previous: "Poprzednia", next: "Następna", page: "Strona", of: "z", articles: "artykułów", nav: "Strony artykułów" },
  "pt-br": { previous: "Anterior", next: "Próxima", page: "Página", of: "de", articles: "artigos", nav: "Páginas de artigos" },
};

/** Keep all links in server HTML; enhance only the mobile presentation. */
export function MobileArticleArchive({ children, locale = "en" }: { children: ReactNode; locale?: string }) {
  const cards = Children.toArray(children);
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);
  const labels = copy[locale as keyof typeof copy] ?? copy.en;
  const pages = Math.ceil(cards.length / 10);
  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!navigating.current) return;
    navigating.current = false;
    const first = list.current?.querySelector<HTMLElement>(`[data-article-page="${page}"]`);
    first?.focus({ preventScroll: true });
    list.current?.scrollIntoView({ block: "start" });
  }, [page]);

  function goTo(next: number) {
    navigating.current = true;
    setPage(next);
  }

  return <div className="mobile-article-archive" data-ready={ready}>
    <div ref={list} className="article-grid article-hub-grid" id="article-list">
      {cards.map((card, index) => isValidElement<Record<string, unknown>>(card) ? cloneElement(card, {
        "data-article-page": Math.floor(index / 10),
        "data-current-page": Math.floor(index / 10) === page,
      }) : card)}
    </div>
    {pages > 1 && <nav className="article-pagination" aria-label={labels.nav}>
      <p role="status">{labels.page} {page + 1} {labels.of} {pages} · {cards.length} {labels.articles}</p>
      <div>
        <button type="button" aria-controls="article-list" disabled={page === 0} onClick={() => goTo(page - 1)}>← {labels.previous}</button>
        <button type="button" aria-controls="article-list" disabled={page === pages - 1} onClick={() => goTo(page + 1)}>{labels.next} →</button>
      </div>
    </nav>}
  </div>;
}
