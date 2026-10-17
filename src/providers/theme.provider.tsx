"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  applyTheme,
  prefersDarkMode,
  readStoredTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
} from "@/lib/theme";
import type { TResolvedTheme, TTheme } from "@/types";

interface IThemeContext {
  /** The user's preference: "light", "dark" or "system". */
  theme: TTheme;
  /** The theme currently applied to the document. */
  resolvedTheme: TResolvedTheme;
  setTheme: (theme: TTheme) => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);

// useLayoutEffect warns during SSR; fall back to useEffect on the server where
// it never runs. The inline <head> script already sets the initial theme, so
// this only has to keep the DOM in sync with React state.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lazy initializers read exactly what THEME_INIT_SCRIPT read, so the first
  // client render agrees with the DOM the script already corrected.
  const [theme, setThemeState] = useState<TTheme>(readStoredTheme);
  const [prefersDark, setPrefersDark] = useState(prefersDarkMode);

  const resolvedTheme = resolveTheme(theme, prefersDark);

  useIsomorphicLayoutEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Keep following the OS while the preference is "system".
  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) =>
      setPrefersDark(event.matches);

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const setTheme = useCallback((next: TTheme) => {
    setThemeState(next);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the in-memory state still
      // applies for the current session.
    }
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }

  return context;
}
