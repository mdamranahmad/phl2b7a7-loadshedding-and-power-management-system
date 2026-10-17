/** Theme preference chosen by the user ("system" follows the OS setting). */
export type TTheme = "light" | "dark" | "system";

/** Theme actually applied to the document once "system" is resolved. */
export type TResolvedTheme = "light" | "dark";

export interface IThemeOption {
  value: TTheme;
  label: string;
}
