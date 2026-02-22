//DATA
import { CURRENCIES } from './currencies.js';
//GUARDS
import { isCurrencyCode } from './guards.js';
//MODEL
import type { CurrencyCode } from './currencies.model.js';

const SIGN_TO_CODES = new Map<string, CurrencyCode[]>();
const UNIQUE_SIGN_TO_CODE = new Map<string, CurrencyCode>();
const AMBIGUOUS_SIGNS = new Set<string>();

for (const code of Object.keys(CURRENCIES) as CurrencyCode[]) {
  const sign = CURRENCIES[code].sign;
  if (!sign) continue;

  const codes = SIGN_TO_CODES.get(sign);
  if (codes) {
    codes.push(code);
  } else {
    SIGN_TO_CODES.set(sign, [code]);
  }
}

for (const [sign, codes] of SIGN_TO_CODES) {
  if (codes.length === 1) {
    const onlyCode = codes[0];
    if (onlyCode !== undefined) {
      UNIQUE_SIGN_TO_CODE.set(sign, onlyCode);
    }
  } else {
    AMBIGUOUS_SIGNS.add(sign);
  }
}

export function normalizeCurrency(input: string): CurrencyCode | undefined {
  const value = input.trim();
  if (!value) return undefined;

  const code = value.toUpperCase();
  if (isCurrencyCode(code)) return code;

  return UNIQUE_SIGN_TO_CODE.get(value);
}

export function normalizeCurrencyStrict(input: string): CurrencyCode {
  const value = input.trim();
  if (!value) {
    throw new Error('Currency value is empty');
  }

  const code = value.toUpperCase();
  if (isCurrencyCode(code)) return code;

  if (AMBIGUOUS_SIGNS.has(value)) {
    throw new Error(`Ambiguous currency sign: ${value}`);
  }

  const normalized = UNIQUE_SIGN_TO_CODE.get(value);
  if (normalized) return normalized;

  throw new Error(`Unknown currency value: ${input}`);
}

export function normalizeCurrencyLite(
  input: string
): CurrencyCode | CurrencyCode[] {
  const value = input.trim();
  if (!value) return [];

  const code = value.toUpperCase();
  if (isCurrencyCode(code)) return code;

  const codes = SIGN_TO_CODES.get(value);
  if (!codes) return [];

  if (codes.length === 1) {
    const onlyCode = codes[0];
    if (onlyCode !== undefined) {
      return onlyCode;
    }
    return [];
  }

  return [...codes];
}
