//DATA
export { BUSINESS_REGIONS } from './regions.js';
//MODEL
export type {
  BusinessRegion,
  M49Code,
  M49IntermediateRegionCode,
  M49RegionCode,
  M49SubregionCode,
} from './regions.model.js';
//GUARDS
export {
  isM49Code,
  isM49IntermediateRegionCode,
  isM49RegionCode,
  isM49SubregionCode,
} from './regions.guards.js';
