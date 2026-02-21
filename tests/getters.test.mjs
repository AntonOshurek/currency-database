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

test('getCurrency returns item by code', () => {
  const usd = getCurrency('USD');
  assert.deepEqual(usd, CURRENCIES.USD);
});

test('getCurrencyStrict returns item for valid string code', () => {
  const eur = getCurrencyStrict('EUR');
  assert.deepEqual(eur, CURRENCIES.EUR);
});

test('getCurrencyStrict throws for unknown code', () => {
  assert.throws(() => getCurrencyStrict('AAA'), {
    message: 'Unknown currency code: AAA',
  });
});

test('getCurrencies returns full currency list', () => {
  const list = getCurrencies();
  const count = Object.keys(CURRENCIES).length;

  assert.ok(Array.isArray(list));
  assert.equal(list.length, count);
  assert.ok(list.some(currency => currency.symbol === 'USD'));
});

test('getCurrencyCodes returns all currency codes', () => {
  const codes = getCurrencyCodes();
  const count = Object.keys(CURRENCIES).length;

  assert.ok(Array.isArray(codes));
  assert.equal(codes.length, count);
  assert.ok(codes.includes('USD'));
  assert.ok(codes.every(code => code in CURRENCIES));
});

if (failed > 0) {
  process.exitCode = 1;
}
