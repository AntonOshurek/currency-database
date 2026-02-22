import assert from 'node:assert/strict';

import {
  normalizeCurrency,
  normalizeCurrencyLite,
  normalizeCurrencyStrict,
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

test('normalizeCurrency normalizes valid currency code (case-insensitive)', () => {
  assert.equal(normalizeCurrency('usd'), 'USD');
  assert.equal(normalizeCurrency('USD'), 'USD');
  assert.equal(normalizeCurrency('  eur  '), 'EUR');
});

test('normalizeCurrency normalizes unique currency sign', () => {
  assert.equal(normalizeCurrency('€'), 'EUR');
  assert.equal(normalizeCurrency('د.إ'), 'AED');
});

test('normalizeCurrency returns undefined for unknown value', () => {
  assert.equal(normalizeCurrency('AAA'), undefined);
  assert.equal(normalizeCurrency('not-currency'), undefined);
  assert.equal(normalizeCurrency(''), undefined);
  assert.equal(normalizeCurrency('   '), undefined);
});

test('normalizeCurrency returns undefined for ambiguous sign', () => {
  assert.equal(normalizeCurrency('$'), undefined);
});

test('normalizeCurrencyStrict normalizes valid code and sign', () => {
  assert.equal(normalizeCurrencyStrict('usd'), 'USD');
  assert.equal(normalizeCurrencyStrict('€'), 'EUR');
});

test('normalizeCurrencyStrict throws exact error for empty value', () => {
  assert.throws(
    () => normalizeCurrencyStrict('   '),
    error =>
      error instanceof Error && error.message === 'Currency value is empty'
  );
});

test('normalizeCurrencyStrict throws exact error for ambiguous sign', () => {
  assert.throws(
    () => normalizeCurrencyStrict('$'),
    error =>
      error instanceof Error && error.message === 'Ambiguous currency sign: $'
  );
});

test('normalizeCurrencyStrict throws exact error for unknown value', () => {
  assert.throws(
    () => normalizeCurrencyStrict('AAA'),
    error =>
      error instanceof Error && error.message === 'Unknown currency value: AAA'
  );
});

test('normalizeCurrencyLite normalizes valid code and unique sign', () => {
  assert.equal(normalizeCurrencyLite('usd'), 'USD');
  assert.equal(normalizeCurrencyLite('€'), 'EUR');
});

test('normalizeCurrencyLite returns array for ambiguous sign', () => {
  const result = normalizeCurrencyLite('$');

  assert.ok(Array.isArray(result));
  assert.ok(result.includes('USD'));
  assert.ok(result.includes('CAD'));
  assert.ok(result.includes('AUD'));
  assert.ok(result.includes('HKD'));
  assert.ok(result.length > 1);
});

test('normalizeCurrencyLite never returns undefined for unknown/empty value', () => {
  assert.deepEqual(normalizeCurrencyLite('AAA'), []);
  assert.deepEqual(normalizeCurrencyLite('not-currency'), []);
  assert.deepEqual(normalizeCurrencyLite(''), []);
  assert.deepEqual(normalizeCurrencyLite('   '), []);
});

if (failed > 0) {
  process.exitCode = 1;
}
