# ISO 4217 Domain

This domain has ISO 4217 currency data.

Each item includes:
- `code` (currency code)
- `number` (numeric code)
- `digits` (decimal digits)
- `currency` (currency name)
- `countries` (country/territory list)

## Exports In This Domain

Data:
- `ISO_4217_CURRENCIES`

Functions:
- `getIso4217ByCode`
- `getIso4217ByNumber`
- `getIso4217ByCountry`
- `getIso4217Numbers`

Main types:
- `Iso4217Code`
- `Iso4217Entry`
- `Iso4217CountryName`

## Main Types

```ts
type Iso4217Entry = {
  code: string;
  number: number;
  digits: number;
  currency: string;
  countries: string[];
};
```

## `ISO_4217_CURRENCIES`

Object with ISO 4217 records by code.

- Key: ISO 4217 code (`EUR`, `USD`, `JPY`, ...)
- Value: ISO item

Item shape:

```ts
{
  code: string; // example: 'EUR'
  number: number; // example: 978
  digits: number; // example: 2
  currency: string; // example: 'Euro'
  countries: string[]; // lowercase names
}
```

Example:

```ts
import { ISO_4217_CURRENCIES } from 'currency-database';

const eur = ISO_4217_CURRENCIES.EUR;
// {
//   code: 'EUR',
//   number: 978,
//   digits: 2,
//   currency: 'Euro',
//   countries: ['åland islands', 'andorra', ...]
// }
```

## `getIso4217ByCode(code)`

Find ISO record by code.

Signature:

```ts
getIso4217ByCode(code: string): Iso4217Entry | undefined
```

Parameters:
- `code`: any string

Behavior:
- function normalizes input (`trim` + upper case)

Returns:
- ISO item when found
- `undefined` when not found

Examples:

```ts
import { getIso4217ByCode } from 'currency-database';

getIso4217ByCode('EUR');
// { code: 'EUR', number: 978, digits: 2, currency: 'Euro', countries: [...] }
```

```ts
import { getIso4217ByCode } from 'currency-database';

getIso4217ByCode('eur');
// same result as 'EUR'
```

```ts
import { getIso4217ByCode } from 'currency-database';

getIso4217ByCode('AAA');
// undefined
```

## `getIso4217ByNumber(number)`

Find ISO record by numeric code.

Signature:

```ts
getIso4217ByNumber(number: number | string): Iso4217Entry | undefined
```

Parameters:
- `number`: numeric value or numeric string
- examples: `967`, `'967'`, `'048'`

Behavior:
- parses number input
- supports leading zero in string form (`'048'`)

Returns:
- ISO item when found
- `undefined` when value is invalid or not found

Examples:

```ts
import { getIso4217ByNumber } from 'currency-database';

getIso4217ByNumber(967);
// { code: 'ZMW', number: 967, digits: 2, currency: 'Zambian Kwacha', countries: ['zambia'] }
```

```ts
import { getIso4217ByNumber } from 'currency-database';

getIso4217ByNumber('048');
// { code: 'BHD', number: 48, digits: 3, currency: 'Bahraini Dinar', countries: ['bahrain'] }
```

```ts
import { getIso4217ByNumber } from 'currency-database';

getIso4217ByNumber('abc');
// undefined
```

## `getIso4217ByCountry(country)`

Get ISO records used in one country or territory.

Signature:

```ts
getIso4217ByCountry(country: string): Iso4217Entry[]
```

Parameters:
- `country`: country/territory name as string

Behavior:
- function normalizes input (`trim` + lower case)
- can return more than one item

Returns:
- array of ISO items
- empty array when not found
- new array on every call

Examples:

```ts
import { getIso4217ByCountry } from 'currency-database';

const colombia = getIso4217ByCountry('colombia');
// [{ code: 'COP', number: 170, digits: 2, currency: 'Colombian Peso', countries: ['colombia'] }]
```

```ts
import { getIso4217ByCountry } from 'currency-database';

const uruguay = getIso4217ByCountry('uruguay');
// [
//   { code: 'UYU', ... },
//   { code: 'UYW', ... }
// ]
```

```ts
import { getIso4217ByCountry } from 'currency-database';

getIso4217ByCountry('unknown-country');
// []
```

## `getIso4217Numbers()`

Get all ISO numeric codes as strings.

Signature:

```ts
getIso4217Numbers(): string[]
```

Returns:
- array of 3-char strings
- keeps leading zero (`'048'`, `'008'`, ...)
- new array on every call

Example:

```ts
import { getIso4217Numbers } from 'currency-database';

const numbers = getIso4217Numbers();
// ['784', '971', '008', ...]
```
