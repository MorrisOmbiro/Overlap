export interface DifficultyLevel {
  name: string;
  color: string;
  mult: number;
  cps: number;
  speed: number;
}

export type GameStatus = "ready" | "running" | "finished";

export interface PassageState {
  id: number;
  level: DifficultyLevel;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  marker: number;
  position: number;
  typed: Set<number>;
  missed: Set<number>;
  errorTime: number;
  width: number;
  height: number;
}

export interface GameOptions {
  extreme?: boolean;
  width?: number;
  height?: number;
  compact?: boolean;
  best?: number;
  random?: () => number;
}
