import type { DifficultyLevel } from "../types";

export const levels: DifficultyLevel[] = [
  { name: "DRIFTING", color: "var(--drifting)", mult: 1, cps: 1.7, speed: 9 },
  { name: "FLOWING", color: "var(--flowing)", mult: 2, cps: 3.5, speed: 18 },
  { name: "RACING", color: "var(--racing)", mult: 4, cps: 5.8, speed: 30 },
  { name: "EXTREME", color: "var(--extreme)", mult: 8, cps: 9, speed: 48 },
];
