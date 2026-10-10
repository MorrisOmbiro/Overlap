import type { ThemeName } from "../types/theme";

const THEME_STORAGE_KEY = "overlap-theme";

const isThemeName = (value: unknown): value is ThemeName =>
  value === "forest" || value === "ocean" || value === "twilight";

const readTheme = (): ThemeName => {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeName(storedTheme) ? storedTheme : "forest";
  } catch {
    return "forest";
  }
};

const saveTheme = (theme: ThemeName) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme selection still works when storage is unavailable.
  }
};

export { isThemeName, readTheme, saveTheme };
