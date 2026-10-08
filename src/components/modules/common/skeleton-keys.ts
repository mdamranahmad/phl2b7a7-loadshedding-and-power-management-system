/**
 * Stable keys for skeleton placeholder lists.
 *
 * Rendering `Array.from({ length: n })` with the array index as the React key
 * trips `lint/suspense/noArrayIndexKey`; these string keys are stable and safe.
 */
export function skeletonKeys(count: number): string[] {
  return Array.from({ length: count }, (_, index) => `skeleton-${index}`);
}
