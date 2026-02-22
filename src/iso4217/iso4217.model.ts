//DATA
import { ISO_4217_CURRENCIES } from './iso4217.js';

export type Iso4217Code = keyof typeof ISO_4217_CURRENCIES;
export type Iso4217Entry = (typeof ISO_4217_CURRENCIES)[Iso4217Code];
export type Iso4217CountryName = Iso4217Entry['countries'][number];
