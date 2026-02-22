import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

import {
  CURRENCIES,
  ISO_4217_CURRENCIES,
  getIso4217ByCode,
  getIso4217ByCountry,
  getIso4217ByNumber,
  getIso4217Numbers,
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

const ISO_CODES = Object.keys(ISO_4217_CURRENCIES);
const ISO_ITEMS = Object.values(ISO_4217_CURRENCIES);
const EXPECTED_ISO_NUMBERS = ISO_ITEMS.map(item =>
  String(item.number).padStart(3, '0')
);

test('ISO 4217 dataset has exact entry count', () => {
  assert.equal(ISO_CODES.length, 157);
});

test('every ISO 4217 entry has strict shape and normalized countries array', () => {
  for (const [code, item] of Object.entries(ISO_4217_CURRENCIES)) {
    assert.deepEqual(Object.keys(item), [
      'code',
      'number',
      'digits',
      'currency',
      'countries',
    ]);

    assert.equal(item.code, code);
    assert.match(item.code, /^[A-Z]{3}$/);

    assert.equal(typeof item.number, 'number');
    assert.equal(Number.isInteger(item.number), true);
    assert.equal(item.number >= 0, true);
    assert.equal(item.number <= 999, true);

    assert.equal(typeof item.digits, 'number');
    assert.equal(Number.isInteger(item.digits), true);
    assert.equal(item.digits >= 0, true);
    assert.equal(item.digits <= 9, true);

    assert.equal(typeof item.currency, 'string');
    assert.equal(item.currency.length > 0, true);

    assert.equal(Array.isArray(item.countries), true);
    assert.equal(item.countries.length > 0, true);

    const sorted = [...item.countries].sort((a, b) => a.localeCompare(b));
    assert.deepEqual(item.countries, sorted);
    assert.equal(new Set(item.countries).size, item.countries.length);

    for (const country of item.countries) {
      assert.equal(typeof country, 'string');
      assert.equal(country.length > 0, true);
      assert.equal(country, country.toLowerCase());
    }
  }
});

test('library currencies are a subset of ISO 4217 dataset and num/d values match', () => {
  for (const [code, currency] of Object.entries(CURRENCIES)) {
    assert.equal(code in ISO_4217_CURRENCIES, true);

    const iso = ISO_4217_CURRENCIES[code];
    assert.equal(currency.symbol, iso.code);
    assert.equal(Number(currency.num), iso.number);
    assert.equal(currency.d, iso.digits);
  }
});

test('ISO 4217 sample entries match exact contract', () => {
  assert.deepEqual(ISO_4217_CURRENCIES.BHD, {
    code: 'BHD',
    number: 48,
    digits: 3,
    currency: 'Bahraini Dinar',
    countries: ['bahrain'],
  });

  assert.deepEqual(ISO_4217_CURRENCIES.JPY, {
    code: 'JPY',
    number: 392,
    digits: 0,
    currency: 'Yen',
    countries: ['japan'],
  });

  assert.equal(ISO_4217_CURRENCIES.EUR.code, 'EUR');
  assert.equal(ISO_4217_CURRENCIES.EUR.number, 978);
  assert.equal(ISO_4217_CURRENCIES.EUR.digits, 2);
  assert.equal(ISO_4217_CURRENCIES.EUR.currency, 'Euro');
  assert.equal(ISO_4217_CURRENCIES.EUR.countries.length, 37);
  assert.deepEqual(ISO_4217_CURRENCIES.EUR.countries.slice(0, 5), [
    'åland islands',
    'andorra',
    'austria',
    'belgium',
    'bulgaria',
  ]);
  assert.deepEqual(ISO_4217_CURRENCIES.EUR.countries.slice(-5), [
    'saint pierre and miquelon',
    'san marino',
    'slovakia',
    'slovenia',
    'spain',
  ]);

  assert.equal(ISO_4217_CURRENCIES.USD.code, 'USD');
  assert.equal(ISO_4217_CURRENCIES.USD.number, 840);
  assert.equal(ISO_4217_CURRENCIES.USD.digits, 2);
  assert.equal(ISO_4217_CURRENCIES.USD.currency, 'US Dollar');
  assert.equal(ISO_4217_CURRENCIES.USD.countries.length, 19);
  assert.equal(
    ISO_4217_CURRENCIES.USD.countries.includes(
      'united states of america (the)'
    ),
    true
  );
  assert.equal(ISO_4217_CURRENCIES.USD.countries.includes('ecuador'), true);
  assert.equal(ISO_4217_CURRENCIES.USD.countries.includes('panama'), true);
});

test('ISO 4217 dataset hash matches exact contract', () => {
  const hash = createHash('sha256')
    .update(JSON.stringify(ISO_4217_CURRENCIES))
    .digest('hex');

  assert.equal(
    hash,
    'a0ba3357b6ecef1da6d8e44025f7dcf6b3dc8ca7f96fb18aea26ae50834de280'
  );
});

test('getIso4217ByCode returns exact object reference and normalizes case', () => {
  assert.strictEqual(getIso4217ByCode('EUR'), ISO_4217_CURRENCIES.EUR);
  assert.strictEqual(getIso4217ByCode('eur'), ISO_4217_CURRENCIES.EUR);
  assert.strictEqual(getIso4217ByCode(' eur '), ISO_4217_CURRENCIES.EUR);
});

test('getIso4217ByCode returns undefined for unknown code', () => {
  assert.equal(getIso4217ByCode('AAA'), undefined);
  assert.equal(getIso4217ByCode(''), undefined);
});

test('getIso4217ByNumber returns exact object reference for number and string', () => {
  assert.strictEqual(getIso4217ByNumber(967), ISO_4217_CURRENCIES.ZMW);
  assert.strictEqual(getIso4217ByNumber('967'), ISO_4217_CURRENCIES.ZMW);
  assert.strictEqual(getIso4217ByNumber('048'), ISO_4217_CURRENCIES.BHD);
});

test('getIso4217ByNumber returns undefined for invalid or unknown values', () => {
  assert.equal(getIso4217ByNumber(''), undefined);
  assert.equal(getIso4217ByNumber('abc'), undefined);
  assert.equal(getIso4217ByNumber('1000'), undefined);
  assert.equal(getIso4217ByNumber(1000), undefined);
  assert.equal(getIso4217ByNumber(12.5), undefined);
});

test('getIso4217ByCountry returns exact matching entries and normalizes input', () => {
  assert.deepEqual(getIso4217ByCountry('colombia'), [ISO_4217_CURRENCIES.COP]);
  assert.deepEqual(getIso4217ByCountry(' Colombia '), [
    ISO_4217_CURRENCIES.COP,
  ]);

  assert.deepEqual(getIso4217ByCountry('uruguay'), [
    ISO_4217_CURRENCIES.UYU,
    ISO_4217_CURRENCIES.UYW,
  ]);
});

test('getIso4217ByCountry returns empty array for unknown country', () => {
  assert.deepEqual(getIso4217ByCountry('unknown-country'), []);
});

test('getIso4217ByCountry returns new array instance on each call', () => {
  const first = getIso4217ByCountry('colombia');
  const second = getIso4217ByCountry('colombia');

  assert.notStrictEqual(first, second);
});

test('getIso4217ByCountry local mutation does not affect future calls', () => {
  const first = getIso4217ByCountry('colombia');
  first.push(ISO_4217_CURRENCIES.USD);

  const second = getIso4217ByCountry('colombia');
  assert.deepEqual(second, [ISO_4217_CURRENCIES.COP]);
});

test('getIso4217Numbers returns exact padded number list in object key order', () => {
  assert.deepEqual(getIso4217Numbers(), EXPECTED_ISO_NUMBERS);
});

test('getIso4217Numbers returns new array instance on each call', () => {
  const first = getIso4217Numbers();
  const second = getIso4217Numbers();

  assert.notStrictEqual(first, second);
});

test('getIso4217Numbers local mutation does not affect future calls', () => {
  const first = getIso4217Numbers();
  first.push('999');

  const second = getIso4217Numbers();
  assert.deepEqual(second, EXPECTED_ISO_NUMBERS);
});

if (failed > 0) {
  process.exitCode = 1;
}
