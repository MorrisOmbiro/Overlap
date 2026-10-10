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
        <optgroup label="Dark themes">
          <option value="forest">Forest</option>
          <option value="ocean">Ocean</option>
          <option value="twilight">Twilight</option>
          <option value="city">City</option>
          <option value="dark">Dark</option>
          <option value="ruby">Ruby</option>
          <option value="moody">Moody</option>
          <option value="fall">Fall</option>
        </optgroup>
        <hr />
        <optgroup label="Light themes">
          <option value="linen">Linen</option>
          <option value="daybreak">Daybreak</option>
        </optgroup>
      </select>
    </label>
  );
};

export default ThemeSelector;
