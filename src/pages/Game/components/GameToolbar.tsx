import type React from "react";
import { formatTime } from "../../../utils";
import type { GameToolbarProps } from "./types";

const GameToolbar: React.FC<GameToolbarProps> = ({
  score,
  best,
  remaining,
}) => (
  <section className="toolbar">
    <div>
      <div className="eyebrow">THE PLAYING FIELD</div>
      <h1>Find your flow.</h1>
    </div>
    <div className="stats">
      <div>
        <label>SCORE</label>
        <strong className={score < 0 ? "danger" : ""}>{score}</strong>
      </div>
      <div>
        <label>PERSONAL BEST</label>
        <strong>{best}</strong>
      </div>
      <div className="time">
        <label>TIME LEFT</label>
        <strong className={remaining <= 10 ? "danger" : ""}>
          {formatTime(remaining)}
        </strong>
      </div>
    </div>
  </section>
);

export default GameToolbar;
