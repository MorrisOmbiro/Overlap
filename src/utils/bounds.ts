import type { PassageState } from "../types";

const containPassage = (
  passage: PassageState,
  arenaWidth: number,
  arenaHeight: number,
) => {
  const maxX = Math.max(0, arenaWidth - passage.width);
  const maxY = Math.max(0, arenaHeight - passage.height);

  if (passage.x <= 0) passage.vx = Math.abs(passage.vx);
  else if (passage.x >= maxX) passage.vx = -Math.abs(passage.vx);
  if (passage.y <= 0) passage.vy = Math.abs(passage.vy);
  else if (passage.y >= maxY) passage.vy = -Math.abs(passage.vy);

  passage.x = Math.max(0, Math.min(passage.x, maxX));
  passage.y = Math.max(0, Math.min(passage.y, maxY));
};

export { containPassage };
