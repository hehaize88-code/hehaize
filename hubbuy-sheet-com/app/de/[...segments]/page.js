import LocalizedRoutePage, {
  getLocalizedMetadata,
  getLocalizedStaticParams,
} from "@/components/LocalizedRoutePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalizedStaticParams("de");
}

export function generateMetadata({ params }) {
  return getLocalizedMetadata(params, "de");
}

export default function GermanLocalizedPage({ params }) {
  return <LocalizedRoutePage params={params} locale="de" />;
}
