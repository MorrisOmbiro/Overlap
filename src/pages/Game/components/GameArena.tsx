import type React from "react";
import { Passage } from "../../../components";
import GameToast from "./GameToast";
import type { GameArenaProps } from "./types";

const GameArena: React.FC<GameArenaProps> = ({
  arenaRef,
  keepInBounds,
  passages,
  activeId,
  onSelect,
  message,
  messageVisible,
  children,
}) => (
  <section
    id="arena"
    data-bounded={keepInBounds}
    ref={arenaRef}
    aria-label="Moving typing passages"
  >
    <div className="arena-label">
      <span className="live-dot" />
      <span>{passages.length} passages · always in motion</span>
    </div>
    <div id="passages">
      {passages.map((p) => (
        <Passage
          key={p.id}
          passage={p}
          selected={p.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </div>
    {children}
    <GameToast message={message} visible={messageVisible} />
  </section>
);

export default GameArena;
