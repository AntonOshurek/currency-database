import assert from 'node:assert/strict';

import {
  BUSINESS_REGIONS,
  getBusinessRegions,
  getM49ByCode,
  getM49IntermediateRegionByCode,
  getM49List,
  getM49RegionByCode,
  getM49SubregionByCode,
  isM49Code,
  isM49IntermediateRegionCode,
  isM49RegionCode,
  isM49SubregionCode,
  M49_INTERMEDIATE_REGIONS,
  M49_REGIONS,
  M49_SUBREGIONS,
} from '../dist/index.js';

let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`✗ ${name}`);
    console.error(error);
  }
}

const EXPECTED_BUSINESS_REGIONS = ['emea', 'apac', 'amer', 'latam'];

test('M49 region dataset has expected top-level sizes', () => {
  assert.equal(Object.keys(M49_REGIONS).length, 5);
  assert.equal(Object.keys(M49_SUBREGIONS).length, 17);
  assert.equal(Object.keys(M49_INTERMEDIATE_REGIONS).length, 7);
  assert.deepEqual(BUSINESS_REGIONS, EXPECTED_BUSINESS_REGIONS);
});

test('M49 regions, subregions and intermediate regions match exact contract', () => {
  assert.deepEqual(M49_REGIONS, {
    '002': { code: '002', name: 'Africa' },
    '009': { code: '009', name: 'Oceania' },
    '019': { code: '019', name: 'Americas' },
    142: { code: '142', name: 'Asia' },
    150: { code: '150', name: 'Europe' },
  });

  assert.deepEqual(M49_SUBREGIONS, {
    '015': { code: '015', name: 'Northern Africa', regionCode: '002' },
    '021': { code: '021', name: 'Northern America', regionCode: '019' },
    '030': { code: '030', name: 'Eastern Asia', regionCode: '142' },
    '034': { code: '034', name: 'Southern Asia', regionCode: '142' },
    '035': { code: '035', name: 'South-eastern Asia', regionCode: '142' },
    '039': { code: '039', name: 'Southern Europe', regionCode: '150' },
    '053': {
      code: '053',
      name: 'Australia and New Zealand',
      regionCode: '009',
    },
    '054': { code: '054', name: 'Melanesia', regionCode: '009' },
    '057': { code: '057', name: 'Micronesia', regionCode: '009' },
    '061': { code: '061', name: 'Polynesia', regionCode: '009' },
    143: { code: '143', name: 'Central Asia', regionCode: '142' },
    145: { code: '145', name: 'Western Asia', regionCode: '142' },
    151: { code: '151', name: 'Eastern Europe', regionCode: '150' },
    154: { code: '154', name: 'Northern Europe', regionCode: '150' },
    155: { code: '155', name: 'Western Europe', regionCode: '150' },
    202: { code: '202', name: 'Sub-Saharan Africa', regionCode: '002' },
    419: {
      code: '419',
      name: 'Latin America and the Caribbean',
      regionCode: '019',
    },
  });

  assert.deepEqual(M49_INTERMEDIATE_REGIONS, {
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
  });
});

test('getM49ByCode finds item in any dataset', () => {
  assert.strictEqual(getM49ByCode('019'), M49_REGIONS['019']);
  assert.strictEqual(getM49ByCode('021'), M49_SUBREGIONS['021']);
  assert.strictEqual(getM49ByCode('029'), M49_INTERMEDIATE_REGIONS['029']);
});

test('typed getters return item by typed code', () => {
  assert.strictEqual(getM49RegionByCode('019'), M49_REGIONS['019']);
  assert.strictEqual(getM49SubregionByCode('021'), M49_SUBREGIONS['021']);
  assert.strictEqual(
    getM49IntermediateRegionByCode('029'),
    M49_INTERMEDIATE_REGIONS['029']
  );
});

test('typed region getters return linked structure data', () => {
  const region = getM49RegionByCode('142');
  const subregion = getM49SubregionByCode('145');
  const intermediate = getM49IntermediateRegionByCode('013');

  assert.equal(region.code, '142');
  assert.equal(region.name, 'Asia');

  assert.equal(subregion.code, '145');
  assert.equal(subregion.regionCode, '142');

  assert.equal(intermediate.code, '013');
  assert.equal(intermediate.subregionCode, '419');
  assert.equal(intermediate.regionCode, '019');
});

test('getM49ByCode returns undefined for unknown code', () => {
  assert.equal(getM49ByCode('999'), undefined);
  assert.equal(getM49ByCode(''), undefined);
  assert.equal(getM49ByCode('abc'), undefined);
});

test('getM49List returns array by requested dataset type', () => {
  const regions = getM49List('regions');
  const subregions = getM49List('subregions');
  const intermediate = getM49List('intermediateRegions');

  assert.ok(Array.isArray(regions));
  assert.ok(Array.isArray(subregions));
  assert.ok(Array.isArray(intermediate));

  assert.equal(regions.length, Object.keys(M49_REGIONS).length);
  assert.equal(subregions.length, Object.keys(M49_SUBREGIONS).length);
  assert.equal(
    intermediate.length,
    Object.keys(M49_INTERMEDIATE_REGIONS).length
  );
});

test('getM49List item references are identical to source objects', () => {
  const regions = getM49List('regions');
  const subregions = getM49List('subregions');
  const intermediate = getM49List('intermediateRegions');

  for (const item of regions) {
    assert.strictEqual(item, M49_REGIONS[item.code]);
  }
  for (const item of subregions) {
    assert.strictEqual(item, M49_SUBREGIONS[item.code]);
  }
  for (const item of intermediate) {
    assert.strictEqual(item, M49_INTERMEDIATE_REGIONS[item.code]);
  }
});

test('getM49List returns all records in object key order', () => {
  const regionCodesFromList = getM49List('regions').map(item => item.code);
  const subregionCodesFromList = getM49List('subregions').map(
    item => item.code
  );
  const intermediateCodesFromList = getM49List('intermediateRegions').map(
    item => item.code
  );

  assert.deepEqual(regionCodesFromList, Object.keys(M49_REGIONS));
  assert.deepEqual(subregionCodesFromList, Object.keys(M49_SUBREGIONS));
  assert.deepEqual(
    intermediateCodesFromList,
    Object.keys(M49_INTERMEDIATE_REGIONS)
  );
});

test('getM49List returns new array instance for each call', () => {
  const regionsA = getM49List('regions');
  const regionsB = getM49List('regions');
  const subregionsA = getM49List('subregions');
  const subregionsB = getM49List('subregions');
  const intermediateA = getM49List('intermediateRegions');
  const intermediateB = getM49List('intermediateRegions');

  assert.notEqual(regionsA, regionsB);
  assert.notEqual(subregionsA, subregionsB);
  assert.notEqual(intermediateA, intermediateB);
});

test('getBusinessRegions returns business region list', () => {
  const list = getBusinessRegions();

  assert.deepEqual(list, EXPECTED_BUSINESS_REGIONS);
});

test('getBusinessRegions returns new array instance', () => {
  const first = getBusinessRegions();
  const second = getBusinessRegions();

  assert.notEqual(first, second);
});

test('getBusinessRegions is safe against local array mutation', () => {
  const first = getBusinessRegions();
  first.push('emea');

  const second = getBusinessRegions();
  assert.deepEqual(second, EXPECTED_BUSINESS_REGIONS);
});

test('M49 code spaces are disjoint (no ambiguous code across datasets)', () => {
  const regionCodes = new Set(Object.keys(M49_REGIONS));
  const subregionCodes = new Set(Object.keys(M49_SUBREGIONS));
  const intermediateCodes = new Set(Object.keys(M49_INTERMEDIATE_REGIONS));

  for (const code of regionCodes) {
    assert.equal(subregionCodes.has(code), false);
    assert.equal(intermediateCodes.has(code), false);
  }

  for (const code of subregionCodes) {
    assert.equal(intermediateCodes.has(code), false);
  }
});

test('getM49ByCode resolves every known M49 code', () => {
  for (const code of Object.keys(M49_REGIONS)) {
    assert.strictEqual(getM49ByCode(code), M49_REGIONS[code]);
  }
  for (const code of Object.keys(M49_SUBREGIONS)) {
    assert.strictEqual(getM49ByCode(code), M49_SUBREGIONS[code]);
  }
  for (const code of Object.keys(M49_INTERMEDIATE_REGIONS)) {
    assert.strictEqual(getM49ByCode(code), M49_INTERMEDIATE_REGIONS[code]);
  }
});

test('M49 guards return true for known codes in their own dataset only', () => {
  for (const code of Object.keys(M49_REGIONS)) {
    assert.equal(isM49RegionCode(code), true);
    assert.equal(isM49SubregionCode(code), false);
    assert.equal(isM49IntermediateRegionCode(code), false);
    assert.equal(isM49Code(code), true);
  }

  for (const code of Object.keys(M49_SUBREGIONS)) {
    assert.equal(isM49RegionCode(code), false);
    assert.equal(isM49SubregionCode(code), true);
    assert.equal(isM49IntermediateRegionCode(code), false);
    assert.equal(isM49Code(code), true);
  }

  for (const code of Object.keys(M49_INTERMEDIATE_REGIONS)) {
    assert.equal(isM49RegionCode(code), false);
    assert.equal(isM49SubregionCode(code), false);
    assert.equal(isM49IntermediateRegionCode(code), true);
    assert.equal(isM49Code(code), true);
  }
});

test('M49 guards return false for unknown codes', () => {
  const unknownCodes = ['', 'abc', '999', '000', 'EMEA'];

  for (const code of unknownCodes) {
    assert.equal(isM49RegionCode(code), false);
    assert.equal(isM49SubregionCode(code), false);
    assert.equal(isM49IntermediateRegionCode(code), false);
    assert.equal(isM49Code(code), false);
  }
});

test('Every subregion points to existing region', () => {
  for (const subregion of Object.values(M49_SUBREGIONS)) {
    assert.ok(subregion.regionCode in M49_REGIONS);
  }
});

test('Every intermediate region points to existing subregion and region', () => {
  for (const intermediateRegion of Object.values(M49_INTERMEDIATE_REGIONS)) {
    assert.ok(intermediateRegion.subregionCode in M49_SUBREGIONS);
    assert.ok(intermediateRegion.regionCode in M49_REGIONS);
  }
});

if (failed > 0) {
  process.exitCode = 1;
}
