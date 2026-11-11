import { CURRENCIES } from '../commerce/experience.mjs';

export default function CurrencySwitcher() {
  return <label className="currency-switcher"><span className="sr-only">Currency</span><select aria-label="Currency" data-currency-select defaultValue="USD">{CURRENCIES.map(code => <option key={code} value={code}>{code}</option>)}</select></label>;
}
