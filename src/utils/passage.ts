import { generatePassageText } from "./text";
import { levels } from "../data";
import type { GameOptions, PassageState } from "../types";

function createPassage(
  id: number,
  {
    width = 1400,
    height = 600,
    compact = false,
    extreme = false,
    random = Math.random,
  }: GameOptions,
  entering = false,
  usedSentences = new Set<string>(),
): PassageState {
  const difficultyIndex = id % (extreme ? levels.length : levels.length - 1);
  const level = levels[difficultyIndex];
  const text = generatePassageText(
    Math.min(difficultyIndex, 2),
    random,
    usedSentences,
  );
  const columns = compact ? 2 : 5;
  const rows = Math.ceil((compact ? 10 : 20) / columns);
  const angle = [0, Math.PI, Math.PI / 2, -Math.PI / 2, 0.6, 2.5, -0.6, -2.5][
    id % 8
  ];
  const passage: PassageState = {
    id,
    level,
    text,
    x: ((id % columns) * width) / columns - 20,
    y: 42 + (Math.floor(id / columns) * (height - 90)) / rows,
    vx: Math.cos(angle) * level.speed,
    vy: Math.sin(angle) * level.speed,
    marker: 0,
    position: 0,
    typed: new Set(),
    missed: new Set(),
    errorTime: 0,
    width: compact ? 220 : 260,
    height: 200,
  };
  if (entering) {
    passage.x = passage.vx >= 0 ? -passage.width : width;
    passage.y = 40 + random() * Math.max(1, height - 150);
    if (Math.abs(passage.vy) > Math.abs(passage.vx)) {
      passage.y = passage.vy >= 0 ? -passage.height : height;
      passage.x = random() * Math.max(1, width - passage.width);
    }
  }
  return passage;
}

function preparePassageSelection(passage: PassageState) {
  passage.position = Math.floor(
    Math.max(passage.position, passage.marker + passage.level.cps * 2),
  );
  while (
    passage.position < passage.text.length &&
    passage.position > 0 &&
    passage.text[passage.position - 1] !== " "
  )
    passage.position++;
  if (passage.position >= passage.text.length) {
    passage.position = passage.marker = 0;
    passage.typed.clear();
    passage.missed.clear();
  }
}

export { createPassage, preparePassageSelection };
