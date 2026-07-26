import Link from "next/link";
import { localizedPath, type Locale } from "../i18n";
import { articleUiCopy } from "../page-copy";
import type { Article } from "../site-data";

export default function ArticleCard({
  article,
  locale = "en",
}: {
  article: Article;
  locale?: Locale;
}) {
  const href = localizedPath(`/articles/${article.slug}`, locale);
  const copy = articleUiCopy[locale];

  return (
    <article className="article-card">
      <p>{article.eyebrow}</p>
      <h2>
        <Link href={href}>{article.shortTitle}</Link>
      </h2>
      <span>{article.description}</span>
      <div>
        <time dateTime={article.updated}>{copy.factChecked} {article.updated}</time>
        <b>{article.readingTime}</b>
      </div>
      <Link className="text-link" href={href}>
        {copy.readGuide} <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
