//NODE
import assert from 'node:assert/strict';

//API
import * as api from '../dist/index.js';

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

const EXPECTED_PUBLIC_EXPORTS = [
  'BUSINESS_REGIONS',
  'CURRENCIES',
  'ISO_4217_CURRENCIES',
  'M49_INTERMEDIATE_REGIONS',
  'M49_REGIONS',
  'M49_SUBREGIONS',
  'formatAmount',
  'formatAmountStrict',
  'getBusinessRegions',
  'getCurrencies',
  'getCurrenciesByBusinessRegion',
  'getCurrenciesByM49Code',
  'getCurrency',
  'getCurrencyCodes',
  'getCurrencyStrict',
  'getIso4217ByCode',
  'getIso4217ByCountry',
  'getIso4217ByNumber',
  'getIso4217Numbers',
  'getM49ByCode',
  'getM49IntermediateRegionByCode',
  'getM49List',
  'getM49RegionByCode',
  'getM49SubregionByCode',
  'isCurrencyCode',
  'isM49Code',
  'isM49IntermediateRegionCode',
  'isM49RegionCode',
  'isM49SubregionCode',
].sort();

test('root public API export list matches exact contract', () => {
  const actual = Object.keys(api).sort();
  assert.deepEqual(actual, EXPECTED_PUBLIC_EXPORTS);
});

test('internal ISO helper/index functions are not exported from root API', () => {
  const forbidden = [
    'ISO_4217_NUMBERS',
    'getIso4217ByNumberIndex',
    'getIso4217ByCountryIndex',
    'normalizeIso4217Code',
    'normalizeIso4217Country',
    'parseIso4217Number',
  ];

  for (const name of forbidden) {
    assert.equal(name in api, false, `Unexpected public export: ${name}`);
  }
});

if (failed > 0) {
  process.exitCode = 1;
}
