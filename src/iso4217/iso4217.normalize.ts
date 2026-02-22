export function normalizeIso4217Code(code: string): string {
  return code.trim().toUpperCase();
}

export function normalizeIso4217Country(country: string): string {
  return country.trim().toLowerCase();
}

export function parseIso4217Number(input: number | string): number | null {
  if (typeof input === 'number') {
    if (!Number.isInteger(input)) {
      return null;
    }

    return input;
  }

  const normalized = input.trim();

  if (!/^\d{1,3}$/.test(normalized)) {
    return null;
  }

  return Number(normalized);
}
