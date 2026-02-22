//DATA
import { CURRENCIES } from './currencies.js';
//GUARD
import { isCurrencyCode } from './guards.js';
//MODEL
import type {
  CurrencyCode,
  CurrencyMark,
  FormatAmountParams,
} from './currencies.model.js';

function pickMark(code: CurrencyCode, mark: CurrencyMark) {
  const c = CURRENCIES[code];
  if (mark === 'symbol') return c.symbol;
  if (mark === 'sign' && c.sign) return c.sign;
  return c.symbol;
}

export function formatAmount(params: FormatAmountParams) {
  const { amount, code, options = {} } = params;
  const { mark = 'sign', position = 'right', separator = ' ' } = options;

  const value = pickMark(code, mark);

  return position === 'left'
    ? `${value}${separator}${amount}`
    : `${amount}${separator}${value}`;
}

export function formatAmountStrict(params: FormatAmountParams) {
  if (!isCurrencyCode(params.code)) {
    throw new Error(`Unknown currency code: ${params.code}`);
  }

  return formatAmount(params);
}
