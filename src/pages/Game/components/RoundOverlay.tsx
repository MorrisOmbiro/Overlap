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
      <div className="overlay results-overlay">
        <section className="results-card" aria-label="Game results">
          <div className="results-heading">
            <div className="results-badges">
              <span className="results-reason">
                <span aria-hidden="true" />
                {reason === "OVERTAKEN" ? "Overtaken" : "Time’s up"}
              </span>
              {summary.isNewBest && (
                <span className="results-record">
                  <span aria-hidden="true">★</span> New Personal Best
                </span>
              )}
            </div>
            <div className="results-score">
              <span>Final score</span>
              <strong>{score.toLocaleString("en-US")}</strong>
            </div>
          </div>
          <dl className="results-metrics">
            <div>
              <dt>Typing speed</dt>
              <dd>
                {summary.wpm}
                <span>WPM</span>
              </dd>
            </div>
            <div>
              <dt>Accuracy</dt>
              <dd>
                {summary.accuracy}
                <span>%</span>
              </dd>
            </div>
            <div>
              <dt>Characters</dt>
              <dd>{summary.characters}</dd>
            </div>
            <div>
              <dt>Passages cleared</dt>
              <dd>
                {summary.passagesCleared}
                <span>cards</span>
              </dd>
              <span className="results-detail">
                {summary.expiredDrops} expired drops
              </span>
            </div>
            <div>
              <dt>Peak multiplier</dt>
              <dd>
                {summary.peakMultiplier}
                <span>×</span>
              </dd>
              {summary.extremeEnabled && (
                <span className="results-detail">
                  {summary.extremeSeconds}s in Extreme
                </span>
              )}
            </div>
          </dl>
          <div className="results-actions">
            <button ref={buttonRef} className="primary" onClick={onStart}>
              Play again <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>
      </div>
    )}
  </>
);

export default RoundOverlay;
