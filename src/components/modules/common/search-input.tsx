"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce.hook";

interface ISearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

/** Search box that debounces into URL-backed state. */
const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
  debounceMs = 600,
}: ISearchInputProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, debounceMs);

  // Keep the input in sync when the URL changes from elsewhere (back/forward).
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== value) onChange(debouncedValue);
  }, [debouncedValue, value, onChange]);

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        value={localValue}
        onChange={(event) => setLocalValue(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`pl-9 ${className ?? ""}`}
      />
    </div>
  );
};

export default SearchInput;
