import type React from "react";
import type { DifficultyLegendProps } from "./types";

const DifficultyLegend: React.FC<DifficultyLegendProps> = ({
  keepInBounds,
  onBoundsChange,
  extreme,
  disabled,
  onExtremeChange,
}) => (
  <section className="bottom">
    <div className="difficulty-controls">
      <div className="legend">
        <span>
          <i className="easy" /> Drifting <b>1×</b>
        </span>
        <span>
          <i className="medium" /> Flowing <b>2×</b>
        </span>
        <span>
          <i className="hard" /> Racing <b>4×</b>
        </span>
      </div>
      <label
        className="extreme-toggle"
        title={
          disabled
            ? "Change difficulty between rounds"
            : "Add faster passages worth 8 points per character"
        }
      >
        <input
          type="checkbox"
          role="switch"
          checked={extreme}
          disabled={disabled}
          onChange={(event) => onExtremeChange(event.target.checked)}
          aria-describedby="extreme-description"
        />
        <span className="toggle-track" aria-hidden="true" />
        <span>
          Extreme <b>8×</b>
        </span>
      </label>
      <span id="extreme-description" className="extreme-description">
        {disabled ? "Change between rounds" : "Add a fourth difficulty"}
      </span>
      <label
        className="extreme-toggle bounds-toggle"
        title="Bounce passages off the arena edges"
      >
        <input
          type="checkbox"
          role="switch"
          checked={keepInBounds}
          onChange={(event) => onBoundsChange(event.target.checked)}
        />
        <span className="toggle-track" aria-hidden="true" />
        <span>Keep passages in bounds</span>
      </label>
    </div>
    <p>Click any passage to make it yours.</p>
  </section>
);

export default DifficultyLegend;
