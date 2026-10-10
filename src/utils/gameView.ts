import type { GameStatus, PassageState } from "../types";

function formatTime(seconds: number) {
  const remaining = Math.ceil(seconds);
  return `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
}

function getActiveMessage(status: GameStatus, active: PassageState | null) {
  if (status === "ready")
    return "Start a round, then click any moving passage and type.";
  if (status === "finished")
    return "Take a breath. There is always another run.";
  return active
    ? "Type the underlined character. Click another passage to switch."
    : "Click any moving text to join its flow.";
}

function formatPace(passage: PassageState) {
  return `${Math.max(0, (passage.position - passage.marker) / passage.level.cps).toFixed(1)}s ahead`;
}

export { formatTime, getActiveMessage, formatPace };
