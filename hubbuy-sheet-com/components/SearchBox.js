import { SearchIcon, ArrowIcon } from "@/components/Icons";

export default function SearchBox({ compact = false }) {
  return (
    <form className={`search-box ${compact ? "search-box-compact" : ""}`} action="https://www.cnbuycha.com/AllProducts/" method="get" target="_blank">
      <SearchIcon />
      <label className="sr-only" htmlFor={compact ? "catalog-search-small" : "catalog-search"}>Search live product catalog</label>
      <input id={compact ? "catalog-search-small" : "catalog-search"} name="q" type="search" placeholder="Search shoes, hoodie, headphones..." required />
      <button type="submit"><span>Search live catalog</span><ArrowIcon /></button>
    </form>
  );
}
