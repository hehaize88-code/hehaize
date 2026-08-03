import { buildMetadata, renderSiteRoute, slugToRoute } from "../site-route";

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata("en", slugToRoute(slug));
}

export default async function EnglishRoute({ params }: Props) {
  const { slug } = await params;
  return renderSiteRoute("en", slug);
}
