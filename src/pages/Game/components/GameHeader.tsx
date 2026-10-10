import { ThemeSelector } from "../../../components";
import type React from "react";
import type { GameHeaderProps } from "./types";

const GameHeader: React.FC<GameHeaderProps> = ({ onShowHelp }) => (
  <header>
    <a className="brand" href="./">
      <span className="brandmark">◧</span> overlap
      <span className="edition">A GAME OF PACE</span>
    </a>
    <div className="header-actions">
      <ThemeSelector />
      <button className="quiet" onClick={onShowHelp}>
        How to play <span>?</span>
      </button>
    </div>
  </header>
);

export default GameHeader;
