import type { ReactNode } from "react";

export type ThemeName = "forest" | "ocean" | "twilight";
export interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}
export interface ThemeProviderProps {
  children: ReactNode;
}
