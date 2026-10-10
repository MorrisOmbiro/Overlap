import type React from "react";
import type { RoundOverlayProps } from "./types";

const RoundOverlay: React.FC<RoundOverlayProps> = ({
  status,
  reason,
  score,
  summary,
  buttonRef,
  onStart,
}) => (
  <>
    {status === "ready" && (
      <div className="overlay">
        <div className="start-card">
          <span className="eyebrow">KEEP YOUR FINGERS AHEAD.</span>
          <h2>
            Words move.
            <br />
            You move faster.
          </h2>
          <p>
            Pick a passage. Beat its marker.
            <br />
            Switch whenever you like.
          </p>
          <button className="primary" onClick={onStart}>
            Enter the flow <span>↗</span>
          </button>
          <div className="round-note">60 seconds. One high score to chase.</div>
        </div>
      </div>
    )}
    {status === "finished" && (
      <div className="overlay">
        <div className="start-card">
          <span className="eyebrow">{reason}</span>
          <h2>That’s your run.</h2>
          <div className="final-score">{score}</div>
          <p>
            {summary.wpm} WPM · {summary.accuracy}% accuracy ·{" "}
            {summary.characters} characters
          </p>
          <button ref={buttonRef} className="primary" onClick={onStart}>
            Find your flow again ↗
          </button>
        </div>
      </div>
    )}
  </>
);

export default RoundOverlay;
