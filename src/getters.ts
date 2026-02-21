//DATA
import { CURRENCIES } from './currencies.js';
//GUARD
import { isCurrencyCode } from './guards.js';
//MODEL
import type { CurrencyCode } from './currencies.model.js';

export function getCurrency(code: CurrencyCode) {
  return CURRENCIES[code];
}
export function getCurrencyStrict(code: string) {
  if (!isCurrencyCode(code)) {
    throw new Error(`Unknown currency code: ${code}`);
  }

  return CURRENCIES[code];
}

export function getCurrencies() {
  return Object.values(CURRENCIES);
}

export function getCurrencyCodes(): CurrencyCode[] {
  return Object.keys(CURRENCIES) as CurrencyCode[];
}
