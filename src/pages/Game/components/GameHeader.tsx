import { ThemeSelector, SupportButton } from "../../../components";
import type React from "react";
import type { GameHeaderProps } from "./types";

const GameHeader: React.FC<GameHeaderProps> = ({ onShowHelp, children }) => (
  <header>
    <a className="brand" href="./">
      <span className="brandmark">◧</span> overlap
    </a>
    {children}
    <div className="header-actions">
      <ThemeSelector />
      <SupportButton />
      <button className="quiet" onClick={onShowHelp}>
        How to play <span>?</span>
      </button>
    </div>
  </header>
);

export default GameHeader;
