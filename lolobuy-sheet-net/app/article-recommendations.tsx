import Link from "next/link";
import { articles } from "./article-data";
import { articleText, getLocalizedArticle } from "./article-locales";
import { localizedPath } from "./i18n";
import type { Locale } from "./translations";

const groups = {
  featured: ["lolobuy-shipping-usa-guide", "lolobuy-shipping-uk-guide", "lolobuy-shoe-qc-checklist", "lolobuy-shoe-box-removal-guide"],
  shipping: ["lolobuy-shipping-usa-guide", "lolobuy-shipping-uk-guide", "lolobuy-shoe-box-removal-guide", "lolobuy-shipping-calculator-guide"],
  qc: ["lolobuy-shoe-qc-checklist", "lolobuy-size-conversion-guide", "lolobuy-qc-photos-guide", "lolobuy-shoe-box-removal-guide"],
};
const headings: Record<Locale, string> = {
  en: "Choose a guide for your next step",
  de: "Wähle einen Ratgeber für deinen nächsten Schritt",
  es: "Elige una guía para tu próximo paso",
  fr: "Choisissez un guide pour la prochaine étape",
  it: "Scegli una guida per il prossimo passo",
};

export function ArticleRecommendations({ locale, group = "featured", heading = false }: {
  locale: Locale;
  group?: keyof typeof groups;
  heading?: boolean;
}) {
  return (
    <div className={heading ? "section-shell focused-guides" : "focused-guides"} data-i18n-ignore>
      {heading && <h2>{headings[locale]}</h2>}
      <div className="learn-grid article-recommendations">
        {groups[group].map((slug) => {
          const article = articles.find((item) => item.slug === slug)!;
          const copy = getLocalizedArticle(article, locale);
          return <article key={slug}>
            <span className="article-type">{copy.eyebrow}</span>
            <h3><Link href={localizedPath(locale, `/articles/${slug}`)}>{copy.title}</Link></h3>
            <p>{copy.description}</p>
            <Link href={localizedPath(locale, `/articles/${slug}`)}>{articleText(locale, "Read guide")} <span aria-hidden="true">→</span></Link>
          </article>;
        })}
      </div>
    </div>
  );
}
