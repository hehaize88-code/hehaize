import LocalizedRoutePage, {
  getLocalizedMetadata,
  getLocalizedStaticParams,
} from "@/components/LocalizedRoutePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalizedStaticParams("pt-br");
}

export function generateMetadata({ params }) {
  return getLocalizedMetadata(params, "pt-br");
}

export default function PortugueseLocalizedPage({ params }) {
  return <LocalizedRoutePage params={params} locale="pt-br" />;
}
