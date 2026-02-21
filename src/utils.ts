//DATA
import { CURRENCIES } from './currencies.js';
//MODEL
import type { CurrencyCode, CurrencyMark } from './currencies.model.js';

export function pickMark(code: CurrencyCode, mark: CurrencyMark) {
  const c = CURRENCIES[code];
  if (mark === 'symbol') return c.symbol;
  if (mark === 'sign' && c.sign) return c.sign;
  return c.symbol;
}
