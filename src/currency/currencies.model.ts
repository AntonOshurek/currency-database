//DATA
import { CURRENCIES } from './currencies.js';

export type CurrencyCode = keyof typeof CURRENCIES;
export type Currency = (typeof CURRENCIES)[CurrencyCode];
export type CurrencyMark = 'sign' | 'symbol';

export type FormatOptions = {
  mark?: CurrencyMark;
  position?: 'left' | 'right';
  separator?: string;
};

export type FormatAmountParams = {
  amount: number;
  code: CurrencyCode;
  options?: FormatOptions;
};
