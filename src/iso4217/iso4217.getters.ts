//DATA
import { ISO_4217_CURRENCIES } from './iso4217.js';
//INDEXES
import {
  ISO_4217_NUMBERS,
  getIso4217ByCountryIndex,
  getIso4217ByNumberIndex,
} from './iso4217.indexes.js';
//NORMALIZE
import {
  normalizeIso4217Code,
  normalizeIso4217Country,
  parseIso4217Number,
} from './iso4217.normalize.js';
//MODEL
import type { Iso4217Code, Iso4217Entry } from './iso4217.model.js';

export function getIso4217ByCode(code: string): Iso4217Entry | undefined {
  const normalized = normalizeIso4217Code(code) as Iso4217Code;

  return ISO_4217_CURRENCIES[normalized];
}

export function getIso4217ByNumber(
  number: number | string
): Iso4217Entry | undefined {
  const parsed = parseIso4217Number(number);

  if (parsed === null) {
    return undefined;
  }

  return getIso4217ByNumberIndex().get(parsed);
}

export function getIso4217ByCountry(country: string): Iso4217Entry[] {
  const normalized = normalizeIso4217Country(country);
  const list = getIso4217ByCountryIndex().get(normalized);

  if (!list) {
    return [];
  }

  return [...list];
}

export function getIso4217Numbers(): string[] {
  return [...ISO_4217_NUMBERS];
}
