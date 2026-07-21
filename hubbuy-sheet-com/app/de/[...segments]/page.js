import LocalizedRoutePage, {
  getLocalizedMetadata,
  localizedStaticParams,
} from "@/components/LocalizedRoutePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return localizedStaticParams;
}

export function generateMetadata({ params }) {
  return getLocalizedMetadata(params, "de");
}

export default function GermanLocalizedPage({ params }) {
  return <LocalizedRoutePage params={params} />;
}
