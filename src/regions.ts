// Source: UN M49 overview table
// https://unstats.un.org/unsd/methodology/m49/overview
// Snapshot date: 2026-02-22

export const M49_REGIONS = {
  '002': { code: '002', name: 'Africa' },
  '009': { code: '009', name: 'Oceania' },
  '019': { code: '019', name: 'Americas' },
  '142': { code: '142', name: 'Asia' },
  '150': { code: '150', name: 'Europe' },
} as const;

export const M49_SUBREGIONS = {
  '015': { code: '015', name: 'Northern Africa', regionCode: '002' },
  '021': { code: '021', name: 'Northern America', regionCode: '019' },
  '030': { code: '030', name: 'Eastern Asia', regionCode: '142' },
  '034': { code: '034', name: 'Southern Asia', regionCode: '142' },
  '035': { code: '035', name: 'South-eastern Asia', regionCode: '142' },
  '039': { code: '039', name: 'Southern Europe', regionCode: '150' },
  '053': { code: '053', name: 'Australia and New Zealand', regionCode: '009' },
  '054': { code: '054', name: 'Melanesia', regionCode: '009' },
  '057': { code: '057', name: 'Micronesia', regionCode: '009' },
  '061': { code: '061', name: 'Polynesia', regionCode: '009' },
  '143': { code: '143', name: 'Central Asia', regionCode: '142' },
  '145': { code: '145', name: 'Western Asia', regionCode: '142' },
  '151': { code: '151', name: 'Eastern Europe', regionCode: '150' },
  '154': { code: '154', name: 'Northern Europe', regionCode: '150' },
  '155': { code: '155', name: 'Western Europe', regionCode: '150' },
  '202': { code: '202', name: 'Sub-Saharan Africa', regionCode: '002' },
  '419': {
    code: '419',
    name: 'Latin America and the Caribbean',
    regionCode: '019',
  },
} as const;

export const M49_INTERMEDIATE_REGIONS = {
  '005': {
    code: '005',
    name: 'South America',
    subregionCode: '419',
    regionCode: '019',
  },
  '011': {
    code: '011',
    name: 'Western Africa',
    subregionCode: '202',
    regionCode: '002',
  },
  '013': {
    code: '013',
    name: 'Central America',
    subregionCode: '419',
    regionCode: '019',
  },
  '014': {
    code: '014',
    name: 'Eastern Africa',
    subregionCode: '202',
    regionCode: '002',
  },
  '017': {
    code: '017',
    name: 'Middle Africa',
    subregionCode: '202',
    regionCode: '002',
  },
  '018': {
    code: '018',
    name: 'Southern Africa',
    subregionCode: '202',
    regionCode: '002',
  },
  '029': {
    code: '029',
    name: 'Caribbean',
    subregionCode: '419',
    regionCode: '019',
  },
} as const;

export const BUSINESS_REGIONS = ['emea', 'apac', 'amer', 'latam'] as const;
