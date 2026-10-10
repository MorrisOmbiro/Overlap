import type { GameOptions, GameStatus, PassageState } from "../types";
import { createPassage, preparePassageSelection } from "./passage";

export const ROUND_SECONDS = 60;

const COMPACT_PASSAGE_COUNT = 10;
const DEFAULT_PASSAGE_COUNT = 20;
const MESSAGE_DURATION_SECONDS = 1.8;
const TYPING_ERROR_DURATION_SECONDS = 0.16;
const MAX_MOVEMENT_STEP_SECONDS = 0.1;
const PASSAGE_EXIT_MARGIN = 20;
const CHARACTERS_PER_WORD = 5;
const SECONDS_PER_MINUTE = 60;

export class GameEngine {
  width: number;
  height: number;
  compact: boolean;
  best: number;
  random: () => number;
  status: GameStatus;
  score: number;
  correct: number;
  attempts: number;
  elapsed: number;
  activeId: number | null;
  message: string;
  messageTime: number;
  reason: string;
  passages: PassageState[] = [];
  private usedSentences = new Set<string>();

  constructor({
    width = 1400,
    height = 600,
    compact = false,
    best = 0,
    random = Math.random,
  }: GameOptions = {}) {
    this.width = width;
    this.height = height;
    this.compact = compact;
    this.best = best;
    this.random = random;
    this.status = "ready";
    this.score = 0;
    this.correct = 0;
    this.attempts = 0;
    this.elapsed = 0;
    this.activeId = null;
    this.message = "";
    this.messageTime = 0;
    this.reason = "";
    this.seed();
  }

  get active() {
    return (
      this.passages.find((passage) => passage.id === this.activeId) ?? null
    );
  }
  get remaining() {
    return Math.max(0, ROUND_SECONDS - this.elapsed);
  }

  createPassage(passageId: number, entering = false): PassageState {
    return createPassage(passageId, this, entering, this.usedSentences);
  }

  seed() {
    this.activeId = null;
    const passageCount = this.compact
      ? COMPACT_PASSAGE_COUNT
      : DEFAULT_PASSAGE_COUNT;
    this.passages = Array.from({ length: passageCount }, (_, passageId) =>
      this.createPassage(passageId),
    );
  }

  start() {
    if (this.status === "running") {
      return false;
    }
    this.seed();
    this.status = "running";
    this.score = 0;
    this.correct = 0;
    this.attempts = 0;
    this.elapsed = 0;
    this.message = "";
    this.reason = "";
    return true;
  }

  select(passageId: number) {
    const passage = this.passages.find((passage) => passage.id === passageId);
    if (this.status !== "running" || !passage || this.activeId === passageId) {
      return false;
    }
    this.activeId = passageId;
    preparePassageSelection(passage);
    return true;
  }

  notify(message: string) {
    this.message = message;
    this.messageTime = MESSAGE_DURATION_SECONDS;
  }

  type(characters: string) {
    if (this.status !== "running") {
      return;
    }
    for (const character of characters) {
      const passage = this.active;
      if (!passage) {
        break;
      }
      this.attempts++;
      if (character !== passage.text[passage.position]) {
        passage.errorTime = TYPING_ERROR_DURATION_SECONDS;
        break;
      }
      if (!passage.typed.has(passage.position)) {
        passage.typed.add(passage.position);
        this.score += passage.level.mult;
        this.correct++;
      }
      passage.position++;
      passage.errorTime = 0;
      if (passage.position >= passage.text.length) {
        this.activeId = null;
        this.notify("Passage complete. Find your next flow.");
      }
    }
  }

  finish(reason: string) {
    this.status = "finished";
    this.reason = reason;
    this.best = Math.max(this.best, this.score);
  }

  tick(secondsSinceLastFrame: number) {
    if (this.status === "finished") {
      return;
    }
    const elapsedSeconds = Math.max(0, secondsSinceLastFrame);
    const movementStepSeconds = Math.min(
      elapsedSeconds,
      MAX_MOVEMENT_STEP_SECONDS,
    );
    this.messageTime = Math.max(0, this.messageTime - elapsedSeconds);
    if (this.status === "running") {
      this.elapsed = Math.min(ROUND_SECONDS, this.elapsed + elapsedSeconds);
      if (this.remaining === 0) {
        this.finish("TIME’S UP");
        return;
      }
    }
    for (
      let passageIndex = 0;
      passageIndex < this.passages.length;
      passageIndex++
    ) {
      const passage = this.passages[passageIndex];
      passage.x += passage.vx * movementStepSeconds;
      passage.y += passage.vy * movementStepSeconds;
      passage.errorTime = Math.max(0, passage.errorTime - elapsedSeconds);
      if (this.status === "running") {
        const previousMarkerIndex = Math.floor(passage.marker);
        passage.marker += passage.level.cps * elapsedSeconds;
        if (passage.id === this.activeId) {
          const markerEndIndex = Math.min(
            Math.floor(passage.marker),
            passage.text.length,
          );
          for (
            let characterIndex = previousMarkerIndex;
            characterIndex < markerEndIndex;
            characterIndex++
          ) {
            if (
              characterIndex >= passage.position &&
              !passage.typed.has(characterIndex) &&
              !passage.missed.has(characterIndex)
            ) {
              passage.missed.add(characterIndex);
              this.score -= passage.level.mult;
              passage.position = characterIndex + 1;
              this.notify(
                `Overtaken −${passage.level.mult} · switch or catch up`,
              );
              if (this.score < 0) {
                this.finish("OVERTAKEN");
                return;
              }
            }
          }
        } else if (passage.marker >= passage.text.length) {
          passage.marker = 0;
          passage.position = 0;
          passage.typed.clear();
          passage.missed.clear();
        }
      }
      const hasLeftArena =
        passage.x > this.width + PASSAGE_EXIT_MARGIN ||
        passage.x < -passage.width - PASSAGE_EXIT_MARGIN ||
        passage.y > this.height + PASSAGE_EXIT_MARGIN ||
        passage.y < -passage.height - PASSAGE_EXIT_MARGIN;

      if (hasLeftArena) {
        if (passage.id === this.activeId) {
          this.activeId = null;
          this.notify("Your passage drifted away. Choose another.");
        }
        this.passages[passageIndex] = this.createPassage(passage.id, true);
      }
    }
  }

  summary() {
    const elapsedMinutes = Math.max(1, this.elapsed) / SECONDS_PER_MINUTE;
    const completedWords = this.correct / CHARACTERS_PER_WORD;

    return {
      wpm: Math.round(completedWords / elapsedMinutes),
      accuracy: this.attempts
        ? Math.round((this.correct / this.attempts) * 100)
        : 0,
      characters: this.correct,
    };
  }
}
