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

test('formatAmount uses default options', () => {
  const result = formatAmount({ amount: 29.99, code: 'AED' });
  assert.equal(result, '29.99 د.إ');
});

test('formatAmount can use symbol mark', () => {
  const result = formatAmount({
    amount: 29.99,
    code: 'AED',
    options: { mark: 'symbol' },
  });
  assert.equal(result, '29.99 AED');
});

test('formatAmount can use left position and empty separator', () => {
  const result = formatAmount({
    amount: 29.99,
    code: 'USD',
    options: { position: 'left', mark: 'sign', separator: '' },
  });
  assert.equal(result, '$29.99');
});

test('formatAmount can use custom separator', () => {
  const result = formatAmount({
    amount: 29.99,
    code: 'USD',
    options: { position: 'right', mark: 'symbol', separator: ' | ' },
  });
  assert.equal(result, '29.99 | USD');
});

test('formatAmountStrict formats valid code', () => {
  const result = formatAmountStrict({ amount: 10, code: 'EUR' });
  assert.equal(result, '10 €');
});

test('formatAmountStrict throws for unknown code', () => {
  assert.throws(() => formatAmountStrict({ amount: 10, code: 'AAA' }), {
    message: 'Unknown currency code: AAA',
  });
});

if (failed > 0) {
  process.exitCode = 1;
}
