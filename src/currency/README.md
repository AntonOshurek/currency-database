# Currency Domain

This domain has app-ready currency data and currency helper functions.

## Exports In This Domain

Data:
- `CURRENCIES`

Functions:
- `getCurrency`
- `getCurrencyStrict`
- `getCurrencies`
- `getCurrencyCodes`
- `getCurrenciesByBusinessRegion`
- `getCurrenciesByM49Code`
- `isCurrencyCode`
- `formatAmount`
- `formatAmountStrict`

Main types:
- `Currency`
- `CurrencyCode`
- `CurrencyMark`
- `FormatOptions`
- `FormatAmountParams`

## Main Types

```ts
type CurrencyMark = 'sign' | 'symbol';

type FormatOptions = {
  mark?: CurrencyMark;
  position?: 'left' | 'right';
  separator?: string;
};

type FormatAmountParams = {
  amount: number;
  code: CurrencyCode;
  options?: FormatOptions;
};
```

## `CURRENCIES`

Object with currencies by code.

- Key: currency code (`USD`, `EUR`, `JPY`, ...)
- Value: currency item

Currency item shape:

```ts
{
  country: string;
  symbol: string; // code, example: 'USD'
  flag: string; // emoji flag
  sign?: string; // local sign, example: '$'
  num: string; // ISO 4217 number, 3 chars, example: '840'
  d: number; // decimal digits, example: 2
  region: {
    regionCode: string | null;
    subregionCode: string | null;
    intermediateRegionCode: string | null;
    businessRegion: 'emea' | 'apac' | 'amer' | 'latam';
  };
}
```

Example:

```ts
import { CURRENCIES } from 'currency-database';

const usd = CURRENCIES.USD;
// {
//   country: 'United States',
//   symbol: 'USD',
//   flag: '🇺🇸',
//   sign: '$',
//   num: '840',
//   d: 2,
//   region: {
//     regionCode: '019',
//     subregionCode: '021',
//     intermediateRegionCode: null,
//     businessRegion: 'amer'
//   }
// }
```

## `getCurrency(code)`

Get one currency by typed code.

Signature:

```ts
getCurrency(code: CurrencyCode): Currency
```

Parameters:
- `code`: valid currency code (typed)

Returns:
- One currency object from `CURRENCIES`

Example:

```ts
import { getCurrency } from 'currency-database';

const eur = getCurrency('EUR');
// {
//   country: 'European Union',
//   symbol: 'EUR',
//   flag: '🇪🇺',
//   sign: '€',
//   num: '978',
//   d: 2,
//   region: {
//     regionCode: '150',
//     subregionCode: null,
//     intermediateRegionCode: null,
//     businessRegion: 'emea'
//   }
// }
```

## `getCurrencyStrict(code)`

Get one currency by `string`.

Signature:

```ts
getCurrencyStrict(code: string): Currency
```

Parameters:
- `code`: any string

Returns:
- Currency object when code exists

Throws:
- `Error` when code is not found

Example:

```ts
import { getCurrencyStrict } from 'currency-database';

const jpy = getCurrencyStrict('JPY');
// { country: 'Japan', symbol: 'JPY', ... }
```

Error handling example:

```ts
import { getCurrencyStrict } from 'currency-database';

let currency = null;
try {
  currency = getCurrencyStrict('AAA');
} catch (e) {
  currency = null; // or any fallback value
}
```

## `getCurrencies()`

Get all currency items.

Signature:

```ts
getCurrencies(): Currency[]
```

Returns:
- Array of all currency objects
- New array on every call

Example:

```ts
import { getCurrencies } from 'currency-database';

const list = getCurrencies();
// [{ country: 'United Arab Emirates', symbol: 'AED', ... }, ...]
```

## `getCurrencyCodes()`

Get all currency codes.

Signature:

```ts
getCurrencyCodes(): CurrencyCode[]
```

Returns:
- Array of currency codes
- New array on every call

Example:

```ts
import { getCurrencyCodes } from 'currency-database';

const codes = getCurrencyCodes();
// ['AED', 'AFN', 'ALL', ...]
```

## `getCurrenciesByBusinessRegion(region)`

Get currencies by business region.

Signature:

```ts
getCurrenciesByBusinessRegion(region: BusinessRegion): Currency[]
```

Parameters:
- `region`: one of `emea | apac | amer | latam`

Returns:
- Currency array for that business region
- New array on every call

Example:

```ts
import { getCurrenciesByBusinessRegion } from 'currency-database';

const amer = getCurrenciesByBusinessRegion('amer');
// [{ symbol: 'BMD', ... }, { symbol: 'CAD', ... }, ...]
```

## `getCurrenciesByM49Code(code)`

Get currencies by one M49 code.

Signature:

```ts
getCurrenciesByM49Code(code: M49Code): Currency[]
```

Parameters:
- `code`: one M49 code from this library
- You can pass:
  - region code (`'019'`)
  - subregion code (`'021'`)
  - intermediate region code (`'029'`)

Returns:
- Currency array for that M49 code
- New array on every call

Examples:

```ts
import { getCurrenciesByM49Code } from 'currency-database';

const americas = getCurrenciesByM49Code('019');
const northAmerica = getCurrenciesByM49Code('021');
const caribbean = getCurrenciesByM49Code('029');
```

## `isCurrencyCode(code)`

Check if a string is a valid currency code.

Signature:

```ts
isCurrencyCode(code: string): code is CurrencyCode
```

Parameters:
- `code`: any string

Returns:
- `true` for valid code
- `false` for unknown value

Examples:

```ts
import { isCurrencyCode } from 'currency-database';

isCurrencyCode('USD'); // true
isCurrencyCode('usd'); // false
isCurrencyCode('AAA'); // false
```

## `formatAmount(params)`

Format amount with currency sign or currency code.

Signature:

```ts
formatAmount(params: FormatAmountParams): string
```

Parameters (`FormatAmountParams`):
- `amount: number`
- `code: CurrencyCode`
- `options?: FormatOptions`

Options (`FormatOptions`):
- `mark?: 'sign' | 'symbol'`
  - default: `'sign'`
- `position?: 'left' | 'right'`
  - default: `'right'`
- `separator?: string`
  - default: `' '` (space)

Behavior:
- `mark: 'sign'` -> use local sign when it exists (`$`, `€`, `د.إ`)
- `mark: 'symbol'` -> use code (`USD`, `EUR`, `AED`)
- If sign is missing, function uses code (`symbol`)

Examples:

```ts
import { formatAmount } from 'currency-database';

formatAmount({ amount: 29.99, code: 'AED' });
// '29.99 د.إ'
```

```ts
import { formatAmount } from 'currency-database';

formatAmount({
  amount: 29.99,
  code: 'AED',
  options: { mark: 'symbol' },
});
// '29.99 AED'
```

```ts
import { formatAmount } from 'currency-database';

formatAmount({
  amount: 29.99,
  code: 'USD',
  options: { position: 'left', mark: 'sign', separator: '' },
});
// '$29.99'
```

```ts
import { formatAmount } from 'currency-database';

formatAmount({
  amount: 29.99,
  code: 'USD',
  options: { position: 'right', mark: 'symbol', separator: ' | ' },
});
// '29.99 | USD'
```

## `formatAmountStrict(params)`

Same as `formatAmount`, but checks code first.

Signature:

```ts
formatAmountStrict(params: FormatAmountParams): string
```

Parameters:
- Same as `formatAmount`

Returns:
- Formatted string

Throws:
- `Error` when code is not found

Example:

```ts
import { formatAmountStrict } from 'currency-database';

formatAmountStrict({ amount: 10, code: 'EUR' });
// '10 €'
```

Error handling example:

```ts
import { formatAmountStrict } from 'currency-database';

let formatted = '';
try {
  formatted = formatAmountStrict({ amount: 29.99, code: 'AED' });
} catch (e) {
  formatted = '—'; // or any fallback value
}
```
