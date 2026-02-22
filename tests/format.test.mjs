import assert from 'node:assert/strict';

import { formatAmount, formatAmountStrict } from '../dist/index.js';

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

const CONTRACT_CASES = [
  { params: { amount: 29.99, code: 'AED' }, expected: '29.99 د.إ' },
  {
    params: { amount: 29.99, code: 'AED', options: { mark: 'symbol' } },
    expected: '29.99 AED',
  },
  {
    params: {
      amount: 29.99,
      code: 'USD',
      options: { position: 'left', mark: 'sign', separator: '' },
    },
    expected: '$29.99',
  },
  {
    params: {
      amount: 29.99,
      code: 'USD',
      options: { position: 'right', mark: 'symbol', separator: ' | ' },
    },
    expected: '29.99 | USD',
  },
  {
    params: { amount: 100, code: 'EUR', options: { position: 'left' } },
    expected: '€ 100',
  },
  { params: { amount: 0, code: 'EUR' }, expected: '0 €' },
  { params: { amount: -100, code: 'USD' }, expected: '-100 $' },
];

test('formatAmount matches strict output contract for all cases', () => {
  for (const { params, expected } of CONTRACT_CASES) {
    assert.equal(formatAmount(params), expected);
  }
});

test('formatAmountStrict matches formatAmount for valid codes', () => {
  for (const { params } of CONTRACT_CASES) {
    assert.equal(formatAmountStrict(params), formatAmount(params));
  }
});

test('formatAmount does not mutate input params object', () => {
  const params = {
    amount: 77.5,
    code: 'USD',
    options: { position: 'left', mark: 'symbol', separator: ':' },
  };
  const expectedAfter = JSON.parse(JSON.stringify(params));

  formatAmount(params);

  assert.deepEqual(params, expectedAfter);
});

test('formatAmountStrict does not mutate input params object', () => {
  const params = {
    amount: 12.3,
    code: 'EUR',
    options: { position: 'right', mark: 'sign', separator: ' ' },
  };
  const expectedAfter = JSON.parse(JSON.stringify(params));

  formatAmountStrict(params);

  assert.deepEqual(params, expectedAfter);
});

test('formatAmountStrict throws exact error for unknown code', () => {
  assert.throws(
    () => formatAmountStrict({ amount: 10, code: 'AAA' }),
    error =>
      error instanceof Error && error.message === 'Unknown currency code: AAA'
  );
});

test('formatAmount throws runtime TypeError for unknown code', () => {
  assert.throws(() => formatAmount({ amount: 10, code: 'AAA' }), TypeError);
});

if (failed > 0) {
  process.exitCode = 1;
}
