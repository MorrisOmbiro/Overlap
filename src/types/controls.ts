import type { GameEngine } from "../utils/engine";

export interface GameControls {
  game: GameEngine;
  start: () => void;
  select: (id: number) => void;
  type: (text: string) => void;
}
