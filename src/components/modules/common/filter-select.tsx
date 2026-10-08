"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface IFilterOption {
  value: string;
  label: string;
}

interface IFilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: IFilterOption[];
  placeholder?: string;
  /** Label for the reset/"all" option. Defaults to no all-option. */
  allLabel?: string;
  className?: string;
}

/** Dropdown filter whose value is kept in the URL by the parent. */
const FilterSelect = ({
  value,
  onValueChange,
  options,
  placeholder = "Filter",
  allLabel,
  className,
}: IFilterSelectProps) => {
  return (
    <Select value={value} onValueChange={(next) => onValueChange(String(next))}>
      <SelectTrigger className={className ?? "w-44"} aria-label={placeholder}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allLabel && <SelectItem value="ALL">{allLabel}</SelectItem>}
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
