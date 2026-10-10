import type React from "react";
import { useLayoutEffect, useMemo, useState } from "react";
import type { ThemeName, ThemeProviderProps } from "../types/theme";
import { readTheme, saveTheme } from "../utils/theme";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>(readTheme);

  useLayoutEffect(() => {
    const previousTheme = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
    return () => {
      if (previousTheme) document.documentElement.dataset.theme = previousTheme;
      else delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
