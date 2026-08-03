import SitePage from "./site-page";
import { buildMetadata } from "./site-route";

export const metadata = buildMetadata("en", "home");

export default function Home() {
  return <SitePage locale="en" route="home" />;
}
