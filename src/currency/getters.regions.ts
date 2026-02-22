//DATA
import { CURRENCIES } from './currencies.js';
//REGIONS (currency subset)
import {
  isM49IntermediateRegionCode,
  isM49RegionCode,
  isM49SubregionCode,
} from '../regions/currency.index.js';
//MODEL
import type { Currency } from './currencies.model.js';
import type { BusinessRegion, M49Code } from '../regions/currency.index.js';

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
