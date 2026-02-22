//NODE
import assert from 'node:assert/strict';

//API
import * as currencyApi from '../dist/currency/index.js';
import * as currencyCoreApi from '../dist/currency/core.js';
import * as currencyRegionsApi from '../dist/currency/regions.js';
import * as iso4217Api from '../dist/iso4217/index.js';
import * as regionsCurrencyApi from '../dist/regions/currency.js';
import * as regionsApi from '../dist/regions/index.js';

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

test('currency subpath exports match exact contract', () => {
  assert.deepEqual(Object.keys(currencyApi).sort(), [
    'CURRENCIES',
    'formatAmount',
    'formatAmountStrict',
    'getCurrencies',
    'getCurrenciesByBusinessRegion',
    'getCurrenciesByM49Code',
    'getCurrency',
    'getCurrencyCodes',
    'getCurrencyStrict',
    'isCurrencyCode',
  ]);
});

test('currency/core subpath exports match exact contract', () => {
  assert.deepEqual(Object.keys(currencyCoreApi).sort(), [
    'CURRENCIES',
    'formatAmount',
    'formatAmountStrict',
    'getCurrencies',
    'getCurrency',
    'getCurrencyCodes',
    'getCurrencyStrict',
    'isCurrencyCode',
  ]);
});

test('currency/regions subpath exports match exact contract', () => {
  assert.deepEqual(Object.keys(currencyRegionsApi).sort(), [
    'BUSINESS_REGIONS',
    'getCurrenciesByBusinessRegion',
    'getCurrenciesByM49Code',
  ]);
});

test('regions subpath exports match exact contract', () => {
  assert.deepEqual(Object.keys(regionsApi).sort(), [
    'BUSINESS_REGIONS',
    'M49_INTERMEDIATE_REGIONS',
    'M49_REGIONS',
    'M49_SUBREGIONS',
    'getBusinessRegions',
    'getM49ByCode',
    'getM49IntermediateRegionByCode',
    'getM49List',
    'getM49RegionByCode',
    'getM49SubregionByCode',
    'isM49Code',
    'isM49IntermediateRegionCode',
    'isM49RegionCode',
    'isM49SubregionCode',
  ]);
});

test('regions/currency subpath exports match exact contract', () => {
  assert.deepEqual(Object.keys(regionsCurrencyApi).sort(), [
    'BUSINESS_REGIONS',
    'isM49Code',
    'isM49IntermediateRegionCode',
    'isM49RegionCode',
    'isM49SubregionCode',
  ]);
});

test('iso4217 subpath exports match exact contract', () => {
  assert.deepEqual(Object.keys(iso4217Api).sort(), [
    'ISO_4217_CURRENCIES',
    'getIso4217ByCode',
    'getIso4217ByCountry',
    'getIso4217ByNumber',
    'getIso4217Numbers',
  ]);
});

test('subpath exports do not expose internal iso4217 helpers', () => {
  for (const name of [
    'ISO_4217_NUMBERS',
    'getIso4217ByNumberIndex',
    'getIso4217ByCountryIndex',
    'normalizeIso4217Code',
    'normalizeIso4217Country',
    'parseIso4217Number',
  ]) {
    assert.equal(name in iso4217Api, false, name);
  }
});

test('currency/core and regions/currency subpaths do not expose unrelated data', () => {
  for (const name of [
    'ISO_4217_CURRENCIES',
    'M49_REGIONS',
    'M49_SUBREGIONS',
    'M49_INTERMEDIATE_REGIONS',
    'getM49ByCode',
  ]) {
    assert.equal(name in currencyCoreApi, false, `currency/core leaked: ${name}`);
  }

  for (const name of ['M49_REGIONS', 'M49_SUBREGIONS', 'M49_INTERMEDIATE_REGIONS']) {
    assert.equal(
      name in regionsCurrencyApi,
      false,
      `regions/currency leaked: ${name}`
    );
  }
});

if (failed > 0) {
  process.exitCode = 1;
}
