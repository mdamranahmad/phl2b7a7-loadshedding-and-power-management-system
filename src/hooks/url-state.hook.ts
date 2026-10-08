"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type TUrlStateValue = string | number | undefined;

export interface IUrlStateDefaults {
  [key: string]: TUrlStateValue;
}

/**
 * Two-way filter/search/sort/pagination state synced with the URL query string
 * (e.g. `?page=2&searchTerm=area01&status=ONGOING`) so every view can be
 * bookmarked or shared. Values equal to their default are removed from the URL.
 *
 * Components using this hook render inside `<Suspense>` (provided by each
 * page's `loading.tsx` + explicit Suspense wrappers) as required for
 * `useSearchParams`.
 */
export function useUrlState<T extends IUrlStateDefaults>(defaults: T) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const values = useMemo(() => {
    const resolved: Record<string, TUrlStateValue> = { ...defaults };
    for (const key of Object.keys(defaults)) {
      const raw = searchParams.get(key);
      if (raw === null) continue;
      const fallback = defaults[key];
      resolved[key] =
        typeof fallback === "number" ? Number(raw) || fallback : raw;
    }
    return resolved as { [K in keyof T]: T[K] };
  }, [defaults, searchParams]);

  const setValues = useCallback(
    (patch: Partial<T>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        const fallback = defaults[key];
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          String(value) === String(fallback)
        ) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      }
      const queryString = next.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [defaults, pathname, router, searchParams],
  );

  /** Resets page to 1 alongside any filter/search/sort changes. */
  const setFilters = useCallback(
    (patch: Partial<T>) => {
      setValues({ ...patch, page: 1 } as Partial<T>);
    },
    [setValues],
  );

  return { values, setValues, setFilters, searchParams };
}
