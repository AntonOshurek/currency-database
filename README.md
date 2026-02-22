# currency-database

Small currency library for JavaScript and TypeScript.

It has 3 domains:
- `currencies`
- `regions`
- `iso4217`

## Why use this library

- No runtime dependencies
- All data is local inside the library
- Works offline
- Simple API
- TypeScript types included

## Install

```bash
npm install currency-database
```

## Import Paths (Bundle Size)

You can import the full library or only one domain.

- `currency-database` -> root API (all domains in one import path)
- `currency-database/currency` -> full currency domain
- `currency-database/currency/core` -> currency data + basic getters + formatter (no region currency getters)
- `currency-database/currency/regions` -> only currency region getters
- `currency-database/regions` -> full regions domain (M49 data + getters + guards)
- `currency-database/regions/currency` -> small regions subset for currency integration (`BUSINESS_REGIONS` + M49 guards)
- `currency-database/iso4217` -> full ISO 4217 domain

Use subpath imports when you do not need the full library.
All quick examples below use domain/subpath imports (recommended).

```ts
import { formatAmount } from 'currency-database/currency/core';
import { getCurrenciesByM49Code } from 'currency-database/currency/regions';
import { getM49ByCode } from 'currency-database/regions';
import { getIso4217ByNumber } from 'currency-database/iso4217';
```

```ts
// Root import is still available (all domains)
import { formatAmount, getM49ByCode, getIso4217ByCode } from 'currency-database';
```

## Data Summary

- `CURRENCIES`: 143 currency records
- `ISO_4217_CURRENCIES`: 157 ISO 4217 records (with country lists)
- M49 data: 5 regions, 17 subregions, 7 intermediate regions
- `BUSINESS_REGIONS`: `emea`, `apac`, `amer`, `latam`

## Domain: Currencies

Full docs (all methods, types, params, behavior):
- [`src/currency/README.md`](https://github.com/AntonOshurek/currency-database/blob/main/src/currency/README.md)

Recommended imports:
- `currency-database/currency` (full currency domain)
- `currency-database/currency/core` (smaller import for format/basic getters)
- `currency-database/currency/regions` (only region-based currency getters)

### Methods (quick examples)

#### `getCurrency(code)`

```ts
import { getCurrency } from 'currency-database/currency/core';

const usd = getCurrency('USD');
// { country: 'United States', symbol: 'USD', flag: '🇺🇸', sign: '$', num: '840', d: 2, region: {...} }
```

#### `getCurrencyStrict(code)`

```ts
import { getCurrencyStrict } from 'currency-database/currency/core';

const eur = getCurrencyStrict('EUR');
// { country: 'European Union', symbol: 'EUR', ... }
```

#### `getCurrencies()`

```ts
import { getCurrencies } from 'currency-database/currency/core';

const list = getCurrencies();
// [{ symbol: 'AED', ... }, { symbol: 'AFN', ... }, ...]
```

#### `getCurrencyCodes()`

```ts
import { getCurrencyCodes } from 'currency-database/currency/core';

const codes = getCurrencyCodes();
// ['AED', 'AFN', 'ALL', ...]
```

#### `getCurrenciesByBusinessRegion(region)`

```ts
import { getCurrenciesByBusinessRegion } from 'currency-database/currency/regions';

const emea = getCurrenciesByBusinessRegion('emea');
// [{ symbol: 'AED', ... }, { symbol: 'ALL', ... }, ...]
```

#### `getCurrenciesByM49Code(code)`

```ts
import { getCurrenciesByM49Code } from 'currency-database/currency/regions';

const northAmerica = getCurrenciesByM49Code('021');
// [{ symbol: 'BMD', ... }, { symbol: 'CAD', ... }, { symbol: 'USD', ... }]
```

#### `isCurrencyCode(code)`

```ts
import { isCurrencyCode } from 'currency-database/currency/core';

isCurrencyCode('USD'); // true
isCurrencyCode('usd'); // false
isCurrencyCode('AAA'); // false
```

#### `formatAmount(params)`

```ts
import { formatAmount } from 'currency-database/currency/core';

formatAmount({ amount: 29.99, code: 'AED' });
// '29.99 د.إ'
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

#### `formatAmountStrict(params)`

```ts
import { formatAmountStrict } from 'currency-database/currency/core';

formatAmountStrict({ amount: 10, code: 'EUR' });
// '10 €'
```

## Domain: Regions

Full docs (all methods, types, params, behavior):
- [`src/regions/README.md`](https://github.com/AntonOshurek/currency-database/blob/main/src/regions/README.md)

Recommended imports:
- `currency-database/regions` (full regions domain)
- `currency-database/regions/currency` (small subset for currency-related checks)

### Methods (quick examples)

#### `getBusinessRegions()`

```ts
import { getBusinessRegions } from 'currency-database/regions';

const list = getBusinessRegions();
// ['emea', 'apac', 'amer', 'latam']
```

#### `getM49ByCode(code)`

```ts
import { getM49ByCode } from 'currency-database/regions';

getM49ByCode('019');
// { code: '019', name: 'Americas' }

getM49ByCode('021');
// { code: '021', name: 'Northern America', regionCode: '019' }

getM49ByCode('029');
// { code: '029', name: 'Caribbean', subregionCode: '419', regionCode: '019' }
```

#### `getM49List(type)`

```ts
import { getM49List } from 'currency-database/regions';

getM49List('regions');
// [{ code: '002', name: 'Africa' }, ...]

getM49List('subregions');
// [{ code: '015', name: 'Northern Africa', regionCode: '002' }, ...]
```

#### `getM49RegionByCode(code)`

```ts
import { getM49RegionByCode } from 'currency-database/regions';

getM49RegionByCode('142');
// { code: '142', name: 'Asia' }
```

#### `getM49SubregionByCode(code)`

```ts
import { getM49SubregionByCode } from 'currency-database/regions';

getM49SubregionByCode('145');
// { code: '145', name: 'Western Asia', regionCode: '142' }
```

#### `getM49IntermediateRegionByCode(code)`

```ts
import { getM49IntermediateRegionByCode } from 'currency-database/regions';

getM49IntermediateRegionByCode('029');
// { code: '029', name: 'Caribbean', subregionCode: '419', regionCode: '019' }
```

#### `isM49Code(code)`

```ts
import { isM49Code } from 'currency-database/regions/currency';

isM49Code('019'); // true
isM49Code('999'); // false
```

#### `isM49RegionCode(code)`

```ts
import { isM49RegionCode } from 'currency-database/regions/currency';

isM49RegionCode('142'); // true
isM49RegionCode('145'); // false
```

#### `isM49SubregionCode(code)`

```ts
import { isM49SubregionCode } from 'currency-database/regions/currency';

isM49SubregionCode('145'); // true
isM49SubregionCode('142'); // false
```

#### `isM49IntermediateRegionCode(code)`

```ts
import { isM49IntermediateRegionCode } from 'currency-database/regions/currency';

isM49IntermediateRegionCode('029'); // true
isM49IntermediateRegionCode('019'); // false
```

## Domain: ISO 4217

Full docs (all methods, types, params, behavior):
- [`src/iso4217/README.md`](https://github.com/AntonOshurek/currency-database/blob/main/src/iso4217/README.md)

Recommended import:
- `currency-database/iso4217`

### Methods (quick examples)

#### `getIso4217ByCode(code)`

```ts
import { getIso4217ByCode } from 'currency-database/iso4217';

getIso4217ByCode('EUR');
// { code: 'EUR', number: 978, digits: 2, currency: 'Euro', countries: ['åland islands', 'andorra', ...] }
```

#### `getIso4217ByNumber(number)`

```ts
import { getIso4217ByNumber } from 'currency-database/iso4217';

getIso4217ByNumber(967);
// { code: 'ZMW', number: 967, digits: 2, currency: 'Zambian Kwacha', countries: ['zambia'] }

getIso4217ByNumber('048');
// { code: 'BHD', number: 48, digits: 3, currency: 'Bahraini Dinar', countries: ['bahrain'] }
```

#### `getIso4217ByCountry(country)`

```ts
import { getIso4217ByCountry } from 'currency-database/iso4217';

getIso4217ByCountry('colombia');
// [{ code: 'COP', number: 170, digits: 2, currency: 'Colombian Peso', countries: ['colombia'] }]

getIso4217ByCountry('uruguay');
// [{ code: 'UYU', ... }, { code: 'UYW', ... }]
```

#### `getIso4217Numbers()`

```ts
import { getIso4217Numbers } from 'currency-database/iso4217';

const numbers = getIso4217Numbers();
// ['784', '971', '008', ...]
```

## License

MIT
