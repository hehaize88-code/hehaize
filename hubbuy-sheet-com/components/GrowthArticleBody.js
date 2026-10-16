import Link from 'next/link';
import { getLocalizedPath } from '@/data/i18n';

export default function GrowthArticleBody({ article, locale }) {
 const copy = article.growthContent;
 return <>
  <p className="article-deck">{copy.deck}</p>
  {copy.sections.map(([heading, ...paragraphs], index) => <section key={heading} id={`step-${index + 1}`}>
   <h2>{heading}</h2>
   {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
  </section>)}
  <nav className="article-next-links" aria-label={locale === 'pt-br' ? 'Próximos passos' : locale === 'de' ? 'Nächste Schritte' : 'Next steps'}>
   {copy.links.map(([label, path]) => <Link key={path} href={getLocalizedPath(path, locale)}>{label}</Link>)}
  </nav>
 </>;
}
