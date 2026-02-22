import assert from 'node:assert/strict';

import {
  CURRENCIES,
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

if (failed > 0) {
  process.exitCode = 1;
}
