//GUARD
import { isCurrencyCode } from './guards.js';
//MODEL
import type { FormatAmountParams } from './currencies.model.js';
//UTILS
import { pickMark } from './utils.js';

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
