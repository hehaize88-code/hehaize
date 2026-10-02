import SitePage from "./site-page";
import { copies, type Locale, type RouteKey, articleRoute, articleRoutes, isStaticRouteKey } from "./site-content";
import { additionalArticles, type AdditionalArticleRoute } from "./site-articles";

export default function SiteShell({ locale, route }: { locale: Locale; route: RouteKey }) {
  const copy = copies[locale];
  const article = isStaticRouteKey(route) && articleRoutes.includes(route)
    ? route === articleRoute ? copy.articlePage : additionalArticles[locale][route as AdditionalArticleRoute]
    : undefined;
  return <SitePage locale={locale} route={route} copy={copy} article={article} />;
}
