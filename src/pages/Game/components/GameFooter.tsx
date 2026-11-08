import type React from "react";
const GameFooter: React.FC = () => (
  <>
    <section className="game-intro" aria-labelledby="game-description-title">
      <h1 id="game-description-title">
        Overlap: A Fast-Paced Online Typing Game
      </h1>
      <p>
        Overlap is a browser-based typing game built around speed, timing, and
        decision-making. In each 60-second round, players switch between moving
        passages while trying to stay ahead of the markers. Build your score,
        challenge your reaction speed, and beat your personal best.
      </p>
    </section>
    {/* <footer>
      <span>Stay ahead. Change course. Keep typing.</span>
    </footer> */}
  </>
);

export default GameFooter;
