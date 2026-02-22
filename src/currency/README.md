# Currency Domain

This domain has app-ready currency data and currency helper functions.

## Import Options (Bundle Size)

Use the smallest import path for your case.
All method examples below use domain/subpath imports (recommended).
Root import is shown only in the optional example in this section.

### 1) Full currency domain (recommended for most cases)

Imports all currency data, formatters, getters, and currency guard.

```ts
import { getCurrency, formatAmount, getCurrenciesByM49Code } from 'currency-database/currency';
```

### 2) Currency core only (smaller import)

Use this when you need currency data, basic getters, and formatters, but you do not need region-based currency getters.

Exports in this path:
- `CURRENCIES`
- `getCurrency`
- `getCurrencyStrict`
- `getCurrencies`
- `getCurrencyCodes`
- `isCurrencyCode`
- `formatAmount`
- `formatAmountStrict`

```ts
import { CURRENCIES, formatAmount, getCurrencyCodes } from 'currency-database/currency/core';
```

### 3) Currency region getters only (small focused import)

Use this when you only need currency filtering by regions.

Exports in this path:
- `BUSINESS_REGIONS`
- `getCurrenciesByBusinessRegion`
- `getCurrenciesByM49Code`

Type-only imports also work:
- `Currency`
- `BusinessRegion`
- `M49Code`

```ts
import {
  BUSINESS_REGIONS,
  getCurrenciesByBusinessRegion,
  getCurrenciesByM49Code,
} from 'currency-database/currency/regions';
```

```ts
import type { BusinessRegion, M49Code } from 'currency-database/currency/regions';
```

### 4) Root import (full library)

This works, but it is bigger than domain import paths.

```ts
import { getCurrency, formatAmount } from 'currency-database';
```

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

## Feature: Currency Core (`currency-database/currency/core`)

Use this feature for currency data, basic getters, guard, and formatters.

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
import { CURRENCIES } from 'currency-database/currency/core';

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
import { getCurrency } from 'currency-database/currency/core';

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
import { getCurrencyStrict } from 'currency-database/currency/core';

const jpy = getCurrencyStrict('JPY');
// { country: 'Japan', symbol: 'JPY', ... }
```

Error handling example:

```ts
import { getCurrencyStrict } from 'currency-database/currency/core';

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
import { getCurrencies } from 'currency-database/currency/core';

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
import { getCurrencyCodes } from 'currency-database/currency/core';

const codes = getCurrencyCodes();
// ['AED', 'AFN', 'ALL', ...]
```

## Feature: Currency Region Filters (`currency-database/currency/regions`)

Use this feature for currency filtering by business region or M49 code.

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
import { getCurrenciesByBusinessRegion } from 'currency-database/currency/regions';

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
import { getCurrenciesByM49Code } from 'currency-database/currency/regions';

const americas = getCurrenciesByM49Code('019');
const northAmerica = getCurrenciesByM49Code('021');
const caribbean = getCurrenciesByM49Code('029');
```

## Feature: Currency Core (`currency-database/currency/core`)

This feature also includes the currency guard and amount formatters.

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
import { isCurrencyCode } from 'currency-database/currency/core';

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
import { formatAmount } from 'currency-database/currency/core';

formatAmount({ amount: 29.99, code: 'AED' });
// '29.99 د.إ'
```

```ts
import { formatAmount } from 'currency-database/currency/core';

formatAmount({
  amount: 29.99,
  code: 'AED',
  options: { mark: 'symbol' },
});
// '29.99 AED'
```

```ts
import { formatAmount } from 'currency-database/currency/core';

formatAmount({
  amount: 29.99,
  code: 'USD',
  options: { position: 'left', mark: 'sign', separator: '' },
});
// '$29.99'
```

```ts
import { formatAmount } from 'currency-database/currency/core';

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
import { formatAmountStrict } from 'currency-database/currency/core';

formatAmountStrict({ amount: 10, code: 'EUR' });
// '10 €'
```

Error handling example:

```ts
import { formatAmountStrict } from 'currency-database/currency/core';

let formatted = '';
try {
  formatted = formatAmountStrict({ amount: 29.99, code: 'AED' });
} catch (e) {
  formatted = '—'; // or any fallback value
}
```
