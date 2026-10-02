import SitePage from "./site-shell";
import { buildMetadata } from "./site-route";

export const metadata = buildMetadata("en", "home");

export default function Home() {
  return <SitePage locale="en" route="home" />;
}
