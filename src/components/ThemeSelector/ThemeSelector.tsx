import type React from "react";
import { useTheme } from "../../hooks/useTheme";
import { isThemeName } from "../../utils/theme";
import "./ThemeSelector.css";

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <label className="theme-selector">
      Theme
      <select
        value={theme}
        onChange={(event) => {
          if (isThemeName(event.target.value)) setTheme(event.target.value);
        }}
      >
        <option value="forest">Forest</option>
        <option value="ocean">Ocean</option>
        <option value="twilight">Twilight</option>
      </select>
    </label>
  );
};

export default ThemeSelector;
