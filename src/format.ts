//DATA
import { CURRENCIES } from './currencies.js';
//GUARD
import { isCurrencyCode } from './guards.js';
//MODEL
import type { CurrencyCode, FormatOptions } from './currencies.model.js';
//UTILS
import { pickMark } from './utils.js';

export function formatAmount(
  amount: number,
  code: CurrencyCode,
  options: FormatOptions = {}
) {
  const { mark = 'sign', position = 'right', separator = ' ' } = options;

  const value = pickMark(code, mark);

  return position === 'left'
    ? `${value}${separator}${amount}`
    : `${amount}${separator}${value}`;
}

export function formatAmountStrict(
  amount: number,
  code: string,
  options: FormatOptions = {}
) {
  if (!isCurrencyCode(code)) {
    throw new Error(`Unknown currency code: ${code}`);
  }

  return formatAmount(amount, code, options);
}
