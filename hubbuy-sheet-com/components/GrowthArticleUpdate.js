import Link from 'next/link';
import { growthUpdates } from '@/data/growth-updates';
import { getLocalizedPath } from '@/data/i18n';
export default function GrowthArticleUpdate({ slug, locale }) {
 const copy = growthUpdates[slug]?.[locale];
 if (!copy) return null;
 return <section id="practical-answer"><h2>{copy[0]}</h2><p>{copy[1]}</p><p><Link href={getLocalizedPath(copy[3], locale)}>{copy[2]}</Link></p></section>;
}
