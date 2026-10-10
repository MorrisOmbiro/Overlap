import type { PassageState, PassageStyle } from "../types";

function getPassageStyle(passage: PassageState): PassageStyle {
  return {
    "--tone": passage.level.color,
    zIndex: (passage.id % 8) + 1,
    transform: `translate(${passage.x}px, ${passage.y}px)`,
  };
}

function getCharacterClassName(
  passage: PassageState,
  index: number,
  selected: boolean,
) {
  return [
    passage.typed.has(index) && "typed",
    passage.missed.has(index) && "skipped",
    selected && index === passage.position && "cursor",
    selected && index === Math.floor(passage.marker) && "marker",
  ]
    .filter(Boolean)
    .join(" ");
}

export { getPassageStyle, getCharacterClassName };
