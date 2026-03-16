export function normalizeQueryString(value: unknown, fallback: string): string {
  const single = Array.isArray(value) ? value[0] : value;

  if (single == null) return fallback;

  return String(single);
}

export function normalizeQueryNumber(
  value: unknown,
  fallback: number,
  options?: { min?: number; max?: number },
): number {
  const single = Array.isArray(value) ? value[0] : value;

  if (single == null) return fallback;

  const parsed = Number(single);

  const min = options?.min ?? Number.NEGATIVE_INFINITY;
  const max = options?.max ?? Number.POSITIVE_INFINITY;

  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    return fallback;
  }

  return parsed;
}

export function normalizeQueryEnum<T extends string>(
  value: unknown,
  validValues: readonly T[],
  fallback: T,
): T {
  const single = Array.isArray(value) ? value[0] : value;

  if (typeof single !== 'string') return fallback;

  return (validValues as unknown as string[]).includes(single) ? (single as T) : fallback;
}
