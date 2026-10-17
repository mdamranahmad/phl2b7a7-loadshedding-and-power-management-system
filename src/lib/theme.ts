import type { IThemeOption, TResolvedTheme, TTheme } from "@/types";

/** localStorage key holding the user's theme preference. */
export const THEME_STORAGE_KEY = "theme";

/** Used on the server and for first-time visitors with no stored preference. */
export const DEFAULT_THEME: TTheme = "system";

export const THEME_OPTIONS: IThemeOption[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export const isTheme = (value: unknown): value is TTheme =>
  value === "light" || value === "dark" || value === "system";

export const prefersDarkMode = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const resolveTheme = (
  theme: TTheme,
  prefersDark: boolean,
): TResolvedTheme => {
  if (theme === "system") {
    return prefersDark ? "dark" : "light";
  }

  return theme;
};

/** Reads the persisted preference; falls back to `DEFAULT_THEME`. */
export const readStoredTheme = (): TTheme => {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    // localStorage can throw in private mode / when storage is disabled.
    return DEFAULT_THEME;
  }
};

/** Applies the resolved theme to <html>. Browser only. */
export const applyTheme = (resolved: TResolvedTheme): void => {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
};

/**
 * Runs synchronously in <head> before the first paint so the document already
 * has the right theme (and `color-scheme`) when the browser renders it.
 * Kept dependency-free and defensive: it must never throw.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var d=s==="dark"||((!s||s==="system")&&m);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})();`;
