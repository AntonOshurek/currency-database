# Regions Domain

This domain has UN M49 region data and business region values.

## Exports In This Domain

Data:
- `M49_REGIONS`
- `M49_SUBREGIONS`
- `M49_INTERMEDIATE_REGIONS`
- `BUSINESS_REGIONS`

Functions:
- `getBusinessRegions`
- `getM49ByCode`
- `getM49List`
- `getM49RegionByCode`
- `getM49SubregionByCode`
- `getM49IntermediateRegionByCode`
- `isM49Code`
- `isM49RegionCode`
- `isM49SubregionCode`
- `isM49IntermediateRegionCode`

Main types:
- `BusinessRegion`
- `M49RegionCode`
- `M49SubregionCode`
- `M49IntermediateRegionCode`
- `M49DatasetType`
- `M49Code`
- `M49Item`
- `M49RegionRef`

## Main Types

```ts
type BusinessRegion = 'emea' | 'apac' | 'amer' | 'latam';

type M49DatasetType = 'regions' | 'subregions' | 'intermediateRegions';

type M49Code = M49RegionCode | M49SubregionCode | M49IntermediateRegionCode;

type M49RegionRef = {
  regionCode: M49RegionCode | null;
  subregionCode: M49SubregionCode | null;
  intermediateRegionCode?: M49IntermediateRegionCode | null;
  businessRegion: BusinessRegion;
};
```

## Data Objects

### `M49_REGIONS`

Top-level M49 regions object.

- Keys are region codes (`'002'`, `'019'`, `'142'`, ...)
- Values have shape `{ code, name }`

```ts
import { M49_REGIONS } from 'currency-database';

const asia = M49_REGIONS['142'];
// { code: '142', name: 'Asia' }
```

### `M49_SUBREGIONS`

M49 subregions object.

- Keys are subregion codes
- Values have shape `{ code, name, regionCode }`

```ts
import { M49_SUBREGIONS } from 'currency-database';

const westernAsia = M49_SUBREGIONS['145'];
// { code: '145', name: 'Western Asia', regionCode: '142' }
```

### `M49_INTERMEDIATE_REGIONS`

M49 intermediate regions object.

- Keys are intermediate region codes
- Values have shape `{ code, name, subregionCode, regionCode }`

```ts
import { M49_INTERMEDIATE_REGIONS } from 'currency-database';

const caribbean = M49_INTERMEDIATE_REGIONS['029'];
// { code: '029', name: 'Caribbean', subregionCode: '419', regionCode: '019' }
```

### `BUSINESS_REGIONS`

Business regions constant array.

```ts
import { BUSINESS_REGIONS } from 'currency-database';

const list = BUSINESS_REGIONS;
// ['emea', 'apac', 'amer', 'latam']
```

## `getBusinessRegions()`

Get business regions as a new array.

Signature:

```ts
getBusinessRegions(): BusinessRegion[]
```

Returns:
- New array copy of `BUSINESS_REGIONS`

Example:

```ts
import { getBusinessRegions } from 'currency-database';

const list = getBusinessRegions();
// ['emea', 'apac', 'amer', 'latam']
```

## `getM49ByCode(code)`

Find any M49 item by code.

Signature:

```ts
getM49ByCode(code: string): M49Item | undefined
```

Parameters:
- `code`: any string

Returns:
- Region object, subregion object, or intermediate region object
- `undefined` when code is not found

Examples:

```ts
import { getM49ByCode } from 'currency-database';

getM49ByCode('019');
// { code: '019', name: 'Americas' }
```

```ts
import { getM49ByCode } from 'currency-database';

getM49ByCode('021');
// { code: '021', name: 'Northern America', regionCode: '019' }
```

```ts
import { getM49ByCode } from 'currency-database';

getM49ByCode('029');
// { code: '029', name: 'Caribbean', subregionCode: '419', regionCode: '019' }
```

## `getM49List(type)`

Get one M49 dataset as array.

Overloads:

```ts
getM49List(type: 'regions'): M49Region[]
getM49List(type: 'subregions'): M49Subregion[]
getM49List(type: 'intermediateRegions'): M49IntermediateRegion[]
```

Parameters:
- `type`: which list to return

Returns:
- Array in object key order
- New array on every call

Example:

```ts
import { getM49List } from 'currency-database';

const regions = getM49List('regions');
// [{ code: '002', name: 'Africa' }, ...]

const subregions = getM49List('subregions');
// [{ code: '015', name: 'Northern Africa', regionCode: '002' }, ...]
```

## `getM49RegionByCode(code)`

Typed getter for top-level region.

Signature:

```ts
getM49RegionByCode(code: M49RegionCode): M49Region
```

Example:

```ts
import { getM49RegionByCode } from 'currency-database';

const americas = getM49RegionByCode('019');
// { code: '019', name: 'Americas' }
```

## `getM49SubregionByCode(code)`

Typed getter for subregion.

Signature:

```ts
getM49SubregionByCode(code: M49SubregionCode): M49Subregion
```

Example:

```ts
import { getM49SubregionByCode } from 'currency-database';

const northAmerica = getM49SubregionByCode('021');
// { code: '021', name: 'Northern America', regionCode: '019' }
```

## `getM49IntermediateRegionByCode(code)`

Typed getter for intermediate region.

Signature:

```ts
getM49IntermediateRegionByCode(code: M49IntermediateRegionCode): M49IntermediateRegion
```

Example:

```ts
import { getM49IntermediateRegionByCode } from 'currency-database';

const caribbean = getM49IntermediateRegionByCode('029');
// { code: '029', name: 'Caribbean', subregionCode: '419', regionCode: '019' }
```

## Guards

Guards help TypeScript understand the code type after check.

### `isM49Code(code)`

Signature:

```ts
isM49Code(code: string): code is M49Code
```

```ts
import { isM49Code } from 'currency-database';

isM49Code('019'); // true
isM49Code('999'); // false
```

### `isM49RegionCode(code)`

Signature:

```ts
isM49RegionCode(code: string): code is M49RegionCode
```

```ts
import { isM49RegionCode } from 'currency-database';

isM49RegionCode('142'); // true
isM49RegionCode('145'); // false
```

### `isM49SubregionCode(code)`

Signature:

```ts
isM49SubregionCode(code: string): code is M49SubregionCode
```

```ts
import { isM49SubregionCode } from 'currency-database';

isM49SubregionCode('145'); // true
isM49SubregionCode('142'); // false
```

### `isM49IntermediateRegionCode(code)`

Signature:

```ts
isM49IntermediateRegionCode(code: string): code is M49IntermediateRegionCode
```

```ts
import { isM49IntermediateRegionCode } from 'currency-database';

isM49IntermediateRegionCode('029'); // true
isM49IntermediateRegionCode('019'); // false
```

## Useful Type (for currency `region` field)

```ts
import type { M49RegionRef } from 'currency-database';

type RegionData = M49RegionRef;
```
