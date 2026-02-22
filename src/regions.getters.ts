//DATA
import {
  BUSINESS_REGIONS,
  M49_INTERMEDIATE_REGIONS,
  M49_REGIONS,
  M49_SUBREGIONS,
} from './regions.js';
//GUARDS
import {
  isM49IntermediateRegionCode,
  isM49RegionCode,
  isM49SubregionCode,
} from './regions.guards.js';
//MODEL
import type {
  BusinessRegion,
  M49DatasetType,
  M49IntermediateRegion,
  M49Item,
  M49Region,
  M49Subregion,
  M49IntermediateRegionCode,
  M49RegionCode,
  M49SubregionCode,
} from './regions.model.js';

export function getBusinessRegions(): BusinessRegion[] {
  return [...BUSINESS_REGIONS];
}

export function getM49RegionByCode(code: M49RegionCode): M49Region {
  return M49_REGIONS[code];
}

export function getM49SubregionByCode(code: M49SubregionCode): M49Subregion {
  return M49_SUBREGIONS[code];
}

export function getM49IntermediateRegionByCode(
  code: M49IntermediateRegionCode
): M49IntermediateRegion {
  return M49_INTERMEDIATE_REGIONS[code];
}

export function getM49ByCode(code: string): M49Item | undefined {
  if (isM49RegionCode(code)) {
    return M49_REGIONS[code];
  }

  if (isM49SubregionCode(code)) {
    return M49_SUBREGIONS[code];
  }

  if (isM49IntermediateRegionCode(code)) {
    return M49_INTERMEDIATE_REGIONS[code];
  }

  return undefined;
}

export function getM49List(type: 'regions'): M49Region[];
export function getM49List(type: 'subregions'): M49Subregion[];
export function getM49List(
  type: 'intermediateRegions'
): M49IntermediateRegion[];
export function getM49List(type: M49DatasetType) {
  if (type === 'regions') {
    return Object.values(M49_REGIONS);
  }

  if (type === 'subregions') {
    return Object.values(M49_SUBREGIONS);
  }

  return Object.values(M49_INTERMEDIATE_REGIONS);
}
