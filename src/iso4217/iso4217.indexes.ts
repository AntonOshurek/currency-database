import { ISO_4217_CURRENCIES } from './iso4217.js';
import { normalizeIso4217Country } from './iso4217.normalize.js';
import type { Iso4217Entry } from './iso4217.model.js';

const ISO_4217_LIST = Object.values(ISO_4217_CURRENCIES) as Iso4217Entry[];

export const ISO_4217_NUMBERS = ISO_4217_LIST.map(item =>
  String(item.number).padStart(3, '0')
);

let iso4217ByNumberIndex: Map<number, Iso4217Entry> | null = null;
let iso4217ByCountryIndex: Map<string, Iso4217Entry[]> | null = null;

export function getIso4217ByNumberIndex(): Map<number, Iso4217Entry> {
  if (iso4217ByNumberIndex) {
    return iso4217ByNumberIndex;
  }

  const index = new Map<number, Iso4217Entry>();

  for (const item of ISO_4217_LIST) {
    index.set(item.number, item);
  }

  iso4217ByNumberIndex = index;

  return index;
}

export function getIso4217ByCountryIndex(): Map<string, Iso4217Entry[]> {
  if (iso4217ByCountryIndex) {
    return iso4217ByCountryIndex;
  }

  const index = new Map<string, Iso4217Entry[]>();

  for (const item of ISO_4217_LIST) {
    for (const country of item.countries) {
      const key = normalizeIso4217Country(country);
      const list = index.get(key);

      if (list) {
        list.push(item);
        continue;
      }

      index.set(key, [item]);
    }
  }

  iso4217ByCountryIndex = index;

  return index;
}
