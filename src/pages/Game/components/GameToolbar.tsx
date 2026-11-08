import type React from "react";
import { formatTime } from "../../../utils";
import type { GameToolbarProps } from "./types";

const GameToolbar: React.FC<GameToolbarProps> = ({
  score,
  best,
  remaining,
}) => (
  <section className="toolbar">
    <div className="stats">
      <div>
        <label>SCORE</label>
        <strong className={score < 0 ? "danger" : ""}>{score}</strong>
      </div>
      <div>
        <label>BEST</label>
        <strong>{best}</strong>
      </div>
      <div className="time">
        <label>TIME</label>
        <strong className={remaining <= 10 ? "danger" : ""}>
          {formatTime(remaining)}
        </strong>
        <svg className="timer-ring" viewBox="0 0 36 36" aria-hidden="true">
          <circle className="timer-track" cx="18" cy="18" r="14" />
          <circle
            cx="18"
            cy="18"
            r="14"
            pathLength="60"
            strokeDasharray="60"
            strokeDashoffset={60 - Math.max(0, Math.min(60, remaining))}
          />
        </svg>
      </div>
    </div>
  </section>
);

export default GameToolbar;
