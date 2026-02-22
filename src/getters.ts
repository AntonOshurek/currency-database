//DATA
import { CURRENCIES } from './currencies.js';
//GUARD
import { isCurrencyCode } from './guards.js';
import {
  isM49IntermediateRegionCode,
  isM49RegionCode,
  isM49SubregionCode,
} from './regions.guards.js';
//MODEL
import type { Currency, CurrencyCode } from './currencies.model.js';
import type { BusinessRegion, M49Code } from './regions.model.js';

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

export function getCurrenciesByBusinessRegion(
  businessRegion: BusinessRegion
): Currency[] {
  return Object.values(CURRENCIES).filter(
    currency => currency.region.businessRegion === businessRegion
  );
}

export function getCurrenciesByM49Code(code: M49Code): Currency[] {
  if (isM49RegionCode(code)) {
    return Object.values(CURRENCIES).filter(
      currency => currency.region.regionCode === code
    );
  }

  if (isM49SubregionCode(code)) {
    return Object.values(CURRENCIES).filter(
      currency => currency.region.subregionCode === code
    );
  }

  if (isM49IntermediateRegionCode(code)) {
    return Object.values(CURRENCIES).filter(
      currency => currency.region.intermediateRegionCode === code
    );
  }

  return [];
}
