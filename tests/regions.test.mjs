import assert from 'node:assert/strict';

import {
  getM49ByCode,
  getM49IntermediateRegionByCode,
  getM49List,
  getM49RegionByCode,
  getM49SubregionByCode,
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

test('M49 region dataset has expected top-level sizes', () => {
  assert.equal(Object.keys(M49_REGIONS).length, 5);
  assert.equal(Object.keys(M49_SUBREGIONS).length, 17);
  assert.equal(Object.keys(M49_INTERMEDIATE_REGIONS).length, 7);
});

test('M49 has expected region and subregion samples', () => {
  assert.equal(M49_REGIONS['019'].name, 'Americas');
  assert.equal(M49_SUBREGIONS['021'].name, 'Northern America');
  assert.equal(M49_INTERMEDIATE_REGIONS['029'].name, 'Caribbean');
});

test('getM49ByCode finds item in any dataset', () => {
  assert.deepEqual(getM49ByCode('019'), M49_REGIONS['019']);
  assert.deepEqual(getM49ByCode('021'), M49_SUBREGIONS['021']);
  assert.deepEqual(getM49ByCode('029'), M49_INTERMEDIATE_REGIONS['029']);
});

test('typed getters return item by typed code', () => {
  assert.deepEqual(getM49RegionByCode('019'), M49_REGIONS['019']);
  assert.deepEqual(getM49SubregionByCode('021'), M49_SUBREGIONS['021']);
  assert.deepEqual(
    getM49IntermediateRegionByCode('029'),
    M49_INTERMEDIATE_REGIONS['029']
  );
});

test('getM49ByCode returns undefined for unknown code', () => {
  assert.equal(getM49ByCode('999'), undefined);
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
