# currency-database

Small currency metadata library for JavaScript and TypeScript.

## Why use this library

- No runtime dependencies.
- All currency data is local inside the library.
- It works offline.
- Small and simple API.
- TypeScript types are included.

## Install

```bash
npm install currency-database
```

## Data

- 151 currency records
- Key is currency code (`USD`, `EUR`, `JPY`, ...)

Each currency item has this shape:

```ts
{
  country: string;
  symbol: string; // 3-letter code, for example "USD"
  flag: string; // emoji flag
  sign?: string; // local sign, for example "$", "€", "¥"
}
```

Real example (`USD`):

```ts
{
  country: 'United States',
  symbol: 'USD',
  flag: '🇺🇸',
  sign: '$',
}
```

## API

### `CURRENCIES`

Object with all currencies by code.

```ts
import { CURRENCIES } from 'currency-database';

const usd = CURRENCIES.USD;
// { country: 'United States', symbol: 'USD', flag: '🇺🇸', sign: '$' }
```

### `getCurrency(code)`

Gets one currency by typed code.

- Input type: `CurrencyCode`
- Return type: `Currency`

```ts
import { getCurrency } from 'currency-database';

const eur = getCurrency('EUR');
// { country: 'European Union', symbol: 'EUR', flag: '🇪🇺', sign: '€' }
```

### `getCurrencyStrict(code)`

Gets one currency by `string`.

- Input type: `string`
- Return type: `Currency`
- Throws error when code is not found

```ts
import { getCurrencyStrict } from 'currency-database';

const jpy = getCurrencyStrict('JPY');
// { country: 'Japan', symbol: 'JPY', flag: '🇯🇵', sign: '¥' }
```

Error handling:

```ts
import { getCurrencyStrict } from 'currency-database';

let currency = null;
try {
  currency = getCurrencyStrict('AAA');
} catch (e) {
  currency = null; // or any fallback value
}
```

### `getCurrencyCodes()`

Returns all currency codes.

- Return type: `CurrencyCode[]`

```ts
import { getCurrencyCodes } from 'currency-database';

const codes = getCurrencyCodes();
// ['AED', 'AFN', 'ALL', ...]
```

### `getCurrencies()`

Returns all currency objects.

- Return type: `Currency[]`

```ts
import { getCurrencies } from 'currency-database';

const list = getCurrencies();
// [{ country: 'United States', symbol: 'USD', ... }, ...]
```

### `isCurrencyCode(code)`

Checks if string is a valid code.

- Input type: `string`
- Return type: `boolean` (type guard)

```ts
import { isCurrencyCode } from 'currency-database';

isCurrencyCode('USD'); // true
isCurrencyCode('AAA'); // false
```

### `formatAmount(params)`

Formats amount with currency mark.

Signature:

```ts
formatAmount(params: FormatAmountParams): string;
```

Types:

```ts
type CurrencyMark = 'sign' | 'symbol';

type FormatOptions = {
  mark?: CurrencyMark; // default: 'sign'
  position?: 'left' | 'right'; // default: 'right'
  separator?: string; // default: ' '
};

type FormatAmountParams = {
  amount: number;
  code: CurrencyCode;
  options?: FormatOptions;
};
```

Possible values:

- `mark: 'sign'` - use local sign if it exists (`$`, `€`, `د.إ`)
- `mark: 'symbol'` - use 3-letter code (`USD`, `EUR`, `AED`)
- `position: 'right'` - result like `29.99 AED`
- `position: 'left'` - result like `AED 29.99`
- `separator: string` - any string between amount and mark (`' '`, `''`, `' | '`)

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

### `formatAmountStrict(params)`

Same as `formatAmount`, but checks code first.

- Input type: `FormatAmountParams`
- Return type: `string`
- Throws error when code is not found

```ts
import { formatAmountStrict } from 'currency-database';

formatAmountStrict({ amount: 10, code: 'EUR' });
// '10 €'
```

Error handling:

```ts
import { formatAmountStrict } from 'currency-database';

let formatted = '';
try {
  formatted = formatAmountStrict({ amount: 29.99, code: 'AED' });
} catch (e) {
  formatted = '—'; // or any fallback value
}
```

## Exported types

```ts
import { CURRENCIES } from 'currency-database';

type CurrencyCode = keyof typeof CURRENCIES;
type Currency = (typeof CURRENCIES)[CurrencyCode];
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

## License

MIT
