import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'currency/index': 'src/currency/index.ts',
    'currency/core': 'src/currency/core.index.ts',
    'currency/regions': 'src/currency/regions.index.ts',
    'regions/index': 'src/regions/index.ts',
    'regions/currency': 'src/regions/currency.index.ts',
    'iso4217/index': 'src/iso4217/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
});
