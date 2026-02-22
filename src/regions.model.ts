import {
  BUSINESS_REGIONS,
  M49_INTERMEDIATE_REGIONS,
  M49_REGIONS,
  M49_SUBREGIONS,
} from './regions.js';

export type M49RegionCode = keyof typeof M49_REGIONS;
export type M49Region = (typeof M49_REGIONS)[M49RegionCode];

export type M49SubregionCode = keyof typeof M49_SUBREGIONS;
export type M49Subregion = (typeof M49_SUBREGIONS)[M49SubregionCode];

export type M49IntermediateRegionCode = keyof typeof M49_INTERMEDIATE_REGIONS;
export type M49IntermediateRegion =
  (typeof M49_INTERMEDIATE_REGIONS)[M49IntermediateRegionCode];

export type M49DatasetType = 'regions' | 'subregions' | 'intermediateRegions';
export type M49Code =
  | M49RegionCode
  | M49SubregionCode
  | M49IntermediateRegionCode;
export type M49Item = M49Region | M49Subregion | M49IntermediateRegion;
export type BusinessRegion = (typeof BUSINESS_REGIONS)[number];

export type M49RegionRef = {
  regionCode: M49RegionCode;
  subregionCode: M49SubregionCode;
  intermediateRegionCode?: M49IntermediateRegionCode | null;
  businessRegion: BusinessRegion;
};
