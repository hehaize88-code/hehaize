import { searchCopy, type Locale } from "../i18n";

export default function ProductSearch({
  compact = false,
  locale = "en",
}: {
  compact?: boolean;
  locale?: Locale;
}) {
  const copy = searchCopy[locale];

  return (
    <form
      className={compact ? "product-search product-search-compact" : "product-search"}
      action="https://www.cnbuycha.com/search.html"
      method="get"
      target="_blank"
      role="search"
    >
      <label className="sr-only" htmlFor={compact ? "product-search-compact" : "product-search"}>
        {copy.label}
      </label>
      <input
        id={compact ? "product-search-compact" : "product-search"}
        name="keywords"
        type="search"
        placeholder={copy.placeholder}
        autoComplete="off"
        required
      />
      <input name="channelid" type="hidden" value="2" />
      <input name="method" type="hidden" value="1" />
      <button type="submit" aria-label={copy.submit}>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.25 4.25" />
        </svg>
      </button>
    </form>
  );
}
