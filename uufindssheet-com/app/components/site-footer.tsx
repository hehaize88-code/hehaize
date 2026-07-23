import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <Image className="footer-logo" src="/uufinds-logo.png" alt="UUFinds" width={1144} height={284} unoptimized />
      </div>
      <p>Independent educational guide. Not affiliated with, endorsed by, or operated by UUFinds. All outbound shopping links lead only to CNBuy Sheet.</p>
      <Link href="/products">Browse product finds →</Link>
    </footer>
  );
}
