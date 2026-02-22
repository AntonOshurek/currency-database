//DATA
import {
  M49_INTERMEDIATE_REGIONS,
  M49_REGIONS,
  M49_SUBREGIONS,
} from './regions.js';
//MODEL
import type {
  M49Code,
  M49IntermediateRegionCode,
  M49RegionCode,
  M49SubregionCode,
} from './regions.model.js';

export function isM49RegionCode(code: string): code is M49RegionCode {
  return code in M49_REGIONS;
}

export function isM49SubregionCode(code: string): code is M49SubregionCode {
  return code in M49_SUBREGIONS;
}

export function isM49IntermediateRegionCode(
  code: string
): code is M49IntermediateRegionCode {
  return code in M49_INTERMEDIATE_REGIONS;
}

export function isM49Code(code: string): code is M49Code {
  return (
    isM49RegionCode(code) ||
    isM49SubregionCode(code) ||
    isM49IntermediateRegionCode(code)
  );
}
