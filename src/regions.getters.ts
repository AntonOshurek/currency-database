//DATA
import {
  M49_INTERMEDIATE_REGIONS,
  M49_REGIONS,
  M49_SUBREGIONS,
} from './regions.js';
//MODEL
import type {
  M49DatasetType,
  M49IntermediateRegion,
  M49IntermediateRegionCode,
  M49Item,
  M49Region,
  M49RegionCode,
  M49Subregion,
  M49SubregionCode,
} from './regions.model.js';

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
  if (code in M49_REGIONS) {
    return M49_REGIONS[code as M49RegionCode];
  }

  if (code in M49_SUBREGIONS) {
    return M49_SUBREGIONS[code as M49SubregionCode];
  }

  if (code in M49_INTERMEDIATE_REGIONS) {
    return M49_INTERMEDIATE_REGIONS[code as M49IntermediateRegionCode];
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
