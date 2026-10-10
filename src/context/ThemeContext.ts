import { createContext } from "react";
import type { ThemeContextValue } from "../types/theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export { ThemeContext };
