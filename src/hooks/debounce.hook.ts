"use client";

import { useEffect, useState } from "react";

/** Returns `value` after it has stopped changing for `delay` ms. */
export default function useDebounce<T>(value: T, delay = 600): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
