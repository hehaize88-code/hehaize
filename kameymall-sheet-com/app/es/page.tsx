import SitePage from "../site-page";
import { buildMetadata } from "../site-route";
export const metadata = buildMetadata("es", "home");
export default function Page() { return <SitePage locale="es" route="home" />; }
