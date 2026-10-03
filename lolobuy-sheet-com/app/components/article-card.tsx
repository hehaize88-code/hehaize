import Image from "next/image";
import Link from "next/link";
import { getArticleMedia } from "../article-media";
import { localizedPath, type Locale } from "../i18n";
import { articleUiCopy } from "../page-copy";
import type { Article } from "../site-data";

export type ArticleSummary = Pick<Article, "slug" | "shortTitle" | "description" | "eyebrow" | "updated" | "readingTime">;

export default function ArticleCard({
  article,
  locale = "en",
  compact = false,
}: {
  article: ArticleSummary;
  locale?: Locale;
  compact?: boolean;
}) {
  const href = localizedPath(`/articles/${article.slug}`, locale);
  const copy = articleUiCopy[locale];
  const media = getArticleMedia(article.slug);

  return (
    <article className={`article-card${compact ? " article-card-compact" : ""}`}>
      <Link
        className="article-card-media"
        href={href}
        aria-label={article.shortTitle}
      >
        <Image
          src={media.src}
          alt=""
          width={media.width}
          height={media.height}
          sizes={compact ? "(max-width: 780px) 46vw, 24vw" : "(max-width: 620px) 92vw, (max-width: 1100px) 46vw, 24vw"}
          unoptimized
        />
      </Link>
      <div className="article-card-content">
        {!compact && <p>{article.eyebrow}</p>}
        <h2>
          <Link href={href}>{article.shortTitle}</Link>
        </h2>
        <span>{article.description}</span>
        {!compact && <div>
          <time dateTime={article.updated}>{copy.factChecked} {article.updated}</time>
          <b>{article.readingTime}</b>
        </div>}
        <Link className="text-link" href={href}>
          {copy.readGuide} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
