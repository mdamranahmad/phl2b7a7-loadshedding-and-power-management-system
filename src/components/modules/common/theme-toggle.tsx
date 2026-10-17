"use client";

import { cn } from "cn";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEME_OPTIONS } from "@/lib/theme";
import { useTheme } from "@/providers/theme.provider";
import type { TTheme } from "@/types";

const THEME_ICONS: Record<TTheme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

interface IThemeToggleProps {
  /**
   * `icon` renders a compact dropdown button (headers).
   * `segmented` renders three inline buttons (mobile menus, settings panels).
   */
  variant?: "icon" | "segmented";
  className?: string;
}

const ThemeToggle = ({ variant = "icon", className }: IThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (variant === "segmented") {
    return (
      <fieldset
        aria-label="Theme"
        className={cn(
          "flex items-center gap-1 rounded-4xl border p-1",
          className,
        )}
      >
        {THEME_OPTIONS.map(({ value, label }) => {
          const Icon = THEME_ICONS[value];
          // Only mark the active option after hydration: the server cannot
          // know the persisted preference.
          const isActive = mounted && theme === value;

          return (
            <Button
              key={value}
              type="button"
              size="sm"
              variant={isActive ? "secondary" : "ghost"}
              aria-pressed={isActive}
              onClick={() => setTheme(value)}
              className="flex-1 gap-1.5"
            >
              <Icon className="size-4" />
              {label}
            </Button>
          );
        })}
      </fieldset>
    );
  }

  return (
    <DropdownMenu>
      <Button
        variant="outline"
        size="icon"
        aria-label="Change theme"
        className={cn("relative", className)}
        render={<DropdownMenuTrigger />}
      >
        <Sun className="size-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:rotate-90" />
        <Moon className="absolute size-4 scale-0 -rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
      </Button>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as TTheme)}
        >
          {THEME_OPTIONS.map(({ value, label }) => {
            const Icon = THEME_ICONS[value];

            return (
              <DropdownMenuRadioItem key={value} value={value}>
                <Icon className="size-4" />
                {label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
