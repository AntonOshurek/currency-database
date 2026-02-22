//NODE
import assert from 'node:assert/strict';

//API
import {
  BUSINESS_REGIONS,
  CURRENCIES,
  M49_INTERMEDIATE_REGIONS,
  M49_REGIONS,
  M49_SUBREGIONS,
  getCurrenciesByBusinessRegion,
  getCurrenciesByM49Code,
  getCurrencies,
  getCurrency,
  getCurrencyCodes,
  getCurrencyStrict,
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

function assertArrayOfSameRefs(actual, expected) {
  assert.equal(actual.length, expected.length);
  for (let i = 0; i < actual.length; i += 1) {
    assert.strictEqual(actual[i], expected[i]);
  }
}

const EXPECTED_CODES = Object.keys(CURRENCIES);
const EXPECTED_ITEMS = Object.values(CURRENCIES);
const SAMPLE_CODES = ['USD', 'EUR', 'JPY', 'AED'];

test('getCurrency returns exact object reference by code', () => {
  for (const code of SAMPLE_CODES) {
    assert.strictEqual(getCurrency(code), CURRENCIES[code]);
  }
});

test('getCurrencyStrict returns exact object reference for valid string code', () => {
  for (const code of SAMPLE_CODES) {
    assert.strictEqual(getCurrencyStrict(code), CURRENCIES[code]);
  }
});

test('getCurrencyStrict throws for unknown code', () => {
  assert.throws(
    () => getCurrencyStrict('AAA'),
    error =>
      error instanceof Error && error.message === 'Unknown currency code: AAA'
  );
});

test('all codes from getCurrencyCodes resolve in both getters', () => {
  const codes = getCurrencyCodes();

  for (const code of codes) {
    assert.strictEqual(getCurrency(code), CURRENCIES[code]);
    assert.strictEqual(getCurrencyStrict(code), CURRENCIES[code]);
  }
});

test('getCurrencyCodes returns exact ordered code list', () => {
  const actual = getCurrencyCodes();
  assert.deepEqual(actual, EXPECTED_CODES);
});

test('getCurrencyCodes returns new array instance on each call', () => {
  const first = getCurrencyCodes();
  const second = getCurrencyCodes();

  assert.notStrictEqual(first, second);
});

test('getCurrencyCodes local mutation does not affect future calls', () => {
  const first = getCurrencyCodes();
  first.push('USD');

  const second = getCurrencyCodes();
  assert.deepEqual(second, EXPECTED_CODES);
});

test('getCurrencies returns exact ordered list of currency objects', () => {
  const actual = getCurrencies();
  assertArrayOfSameRefs(actual, EXPECTED_ITEMS);
});

test('getCurrencies returns new array instance on each call', () => {
  const first = getCurrencies();
  const second = getCurrencies();

  assert.notStrictEqual(first, second);
});

test('getCurrencies local mutation does not affect future calls', () => {
  const first = getCurrencies();
  first.push(CURRENCIES.USD);

  const second = getCurrencies();
  assertArrayOfSameRefs(second, EXPECTED_ITEMS);
});

test('every currency contains region object with required keys', () => {
  for (const currency of Object.values(CURRENCIES)) {
    assert.equal(typeof currency.region, 'object');
    assert.ok(currency.region !== null);
    assert.ok('regionCode' in currency.region);
    assert.ok('subregionCode' in currency.region);
    assert.ok('intermediateRegionCode' in currency.region);
    assert.ok('businessRegion' in currency.region);
  }
});

test('every currency contains ISO 4217 numeric code and minor units', () => {
  for (const currency of Object.values(CURRENCIES)) {
    assert.equal(typeof currency.num, 'string');
    assert.match(currency.num, /^\d{3}$/);

    assert.equal(typeof currency.d, 'number');
    assert.equal(Number.isInteger(currency.d), true);
    assert.equal(currency.d >= 0, true);
    assert.equal(currency.d <= 9, true);
  }
});

test('currency ISO 4217 num/d contract samples are exact', () => {
  assert.equal(CURRENCIES.USD.num, '840');
  assert.equal(CURRENCIES.USD.d, 2);

  assert.equal(CURRENCIES.EUR.num, '978');
  assert.equal(CURRENCIES.EUR.d, 2);

  assert.equal(CURRENCIES.JPY.num, '392');
  assert.equal(CURRENCIES.JPY.d, 0);

  assert.equal(CURRENCIES.BHD.num, '048');
  assert.equal(CURRENCIES.BHD.d, 3);
});

test('currency region links are valid against M49 datasets', () => {
  const businessRegions = new Set(BUSINESS_REGIONS);

  for (const currency of Object.values(CURRENCIES)) {
    const { region } = currency;

    if (region.regionCode !== null) {
      assert.ok(region.regionCode in M49_REGIONS);
    }

    if (region.subregionCode !== null) {
      assert.ok(region.subregionCode in M49_SUBREGIONS);
    }

    if (region.intermediateRegionCode !== null) {
      assert.ok(region.intermediateRegionCode in M49_INTERMEDIATE_REGIONS);
    }

    if (region.subregionCode !== null) {
      const subregion = M49_SUBREGIONS[region.subregionCode];
      if (region.regionCode !== null) {
        assert.equal(subregion.regionCode, region.regionCode);
      }
    }

    if (region.intermediateRegionCode !== null) {
      const intermediate =
        M49_INTERMEDIATE_REGIONS[region.intermediateRegionCode];
      if (region.subregionCode !== null) {
        assert.equal(intermediate.subregionCode, region.subregionCode);
      }
      if (region.regionCode !== null) {
        assert.equal(intermediate.regionCode, region.regionCode);
      }
    }

    assert.equal(businessRegions.has(region.businessRegion), true);
  }
});

test('currency region contract samples are exact', () => {
  assert.deepEqual(CURRENCIES.USD.region, {
    regionCode: '019',
    subregionCode: '021',
    intermediateRegionCode: null,
    businessRegion: 'amer',
  });

  assert.deepEqual(CURRENCIES.EUR.region, {
    regionCode: '150',
    subregionCode: null,
    intermediateRegionCode: null,
    businessRegion: 'emea',
  });

  assert.deepEqual(CURRENCIES.TWD.region, {
    regionCode: '142',
    subregionCode: '030',
    intermediateRegionCode: null,
    businessRegion: 'apac',
  });
});

test('getCurrenciesByBusinessRegion returns exact filtered list for each business region', () => {
  for (const businessRegion of BUSINESS_REGIONS) {
    const expected = EXPECTED_ITEMS.filter(
      currency => currency.region.businessRegion === businessRegion
    );
    const actual = getCurrenciesByBusinessRegion(businessRegion);

    assertArrayOfSameRefs(actual, expected);
  }
});

test('getCurrenciesByBusinessRegion returns new array instance on each call', () => {
  const first = getCurrenciesByBusinessRegion('emea');
  const second = getCurrenciesByBusinessRegion('emea');

  assert.notStrictEqual(first, second);
});

test('getCurrenciesByBusinessRegion local mutation does not affect future calls', () => {
  const first = getCurrenciesByBusinessRegion('amer');
  first.push(CURRENCIES.USD);

  const second = getCurrenciesByBusinessRegion('amer');
  const expected = EXPECTED_ITEMS.filter(
    currency => currency.region.businessRegion === 'amer'
  );

  assertArrayOfSameRefs(second, expected);
});

test('getCurrenciesByM49Code returns exact filtered list for all M49 region codes', () => {
  for (const code of Object.keys(M49_REGIONS)) {
    const expected = EXPECTED_ITEMS.filter(
      currency => currency.region.regionCode === code
    );
    const actual = getCurrenciesByM49Code(code);

    assertArrayOfSameRefs(actual, expected);
  }
});

test('getCurrenciesByM49Code returns exact filtered list for all M49 subregion codes', () => {
  for (const code of Object.keys(M49_SUBREGIONS)) {
    const expected = EXPECTED_ITEMS.filter(
      currency => currency.region.subregionCode === code
    );
    const actual = getCurrenciesByM49Code(code);

    assertArrayOfSameRefs(actual, expected);
  }
});

test('getCurrenciesByM49Code returns exact filtered list for all M49 intermediate region codes', () => {
  for (const code of Object.keys(M49_INTERMEDIATE_REGIONS)) {
    const expected = EXPECTED_ITEMS.filter(
      currency => currency.region.intermediateRegionCode === code
    );
    const actual = getCurrenciesByM49Code(code);

    assertArrayOfSameRefs(actual, expected);
  }
});

test('getCurrenciesByM49Code returns new array instance on each call', () => {
  const first = getCurrenciesByM49Code('019');
  const second = getCurrenciesByM49Code('019');

  assert.notStrictEqual(first, second);
});

test('getCurrenciesByM49Code local mutation does not affect future calls', () => {
  const first = getCurrenciesByM49Code('021');
  first.push(CURRENCIES.USD);

  const second = getCurrenciesByM49Code('021');
  const expected = EXPECTED_ITEMS.filter(
    currency => currency.region.subregionCode === '021'
  );

  assertArrayOfSameRefs(second, expected);
});

if (failed > 0) {
  process.exitCode = 1;
}
