import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme requires a ThemeProvider.");
  return context;
};

export { useTheme };
