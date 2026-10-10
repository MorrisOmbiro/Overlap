import type React from "react";
const DifficultyLegend: React.FC = () => (
  <section className="bottom">
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
    <p>Click any passage to make it yours.</p>
    <span className="free">↗ Switching is always free</span>
  </section>
);

export default DifficultyLegend;
