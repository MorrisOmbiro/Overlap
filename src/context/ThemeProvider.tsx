import type React from "react";
import { useLayoutEffect, useMemo, useState } from "react";
import type { ThemeName, ThemeProviderProps } from "../types/theme";
import { readTheme, saveTheme } from "../utils/theme";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>("linen");

  useLayoutEffect(() => {
    // Match the palette applied by the head script before hydration paints.
    const theme = readTheme();
    document.documentElement.dataset.theme = theme;
    setTheme(theme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (next: ThemeName) => {
        document.documentElement.dataset.theme = next;
        saveTheme(next);
        setTheme(next);
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
