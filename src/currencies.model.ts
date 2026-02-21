import { CURRENCIES } from './currencies.js';

export type CurrencyCode = keyof typeof CURRENCIES;
export type Currency = (typeof CURRENCIES)[CurrencyCode];
