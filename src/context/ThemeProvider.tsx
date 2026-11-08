import type React from "react";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import type { ThemeName, ThemeProviderProps } from "../types/theme";
import { readTheme, saveTheme } from "../utils/theme";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>("linen");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  useLayoutEffect(() => {
    const previousTheme = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = theme;

    return () => {
      if (previousTheme) document.documentElement.dataset.theme = previousTheme;
      else delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (next: ThemeName) => {
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
