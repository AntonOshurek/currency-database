//DATA
import { CURRENCIES } from './currencies.js';
//MODEL
import type { CurrencyCode } from './currencies.model.js';

export function isCurrencyCode(code: string): code is CurrencyCode {
  return code in CURRENCIES;
}
