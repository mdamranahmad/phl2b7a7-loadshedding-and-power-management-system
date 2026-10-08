/**
 * Helpers for building request query params. The backend accepts plain
 * strings/numbers only — `undefined`/`null`/`""` entries are dropped so they
 * never reach the API, and booleans are intentionally unsupported (the backend
 * forwards them raw into Prisma and rejects them with a 400).
 */
export function compactParams<T extends object>(
  params: T,
): Record<string, string | number> {
  const result: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (typeof value === "string" || typeof value === "number") {
      result[key] = value;
    }
  }
  return result;
}
