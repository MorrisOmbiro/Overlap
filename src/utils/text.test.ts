import test from "node:test";
import assert from "node:assert/strict";
import { GameEngine } from "./engine";
import { generatePassageText } from "./text";

test("sentences stay unique across difficulties even with constant randomness", () => {
  const usedSentences = new Set<string>();
  const sentences = Array.from({ length: 100 }, (_, index) =>
    generatePassageText(index % 3, () => 0.5, usedSentences),
  ).flatMap((passage) =>
    passage.match(/[^.]+\./g)!.map((sentence) => sentence.trim()),
  );
  assert.equal(new Set(sentences).size, 300);
});

test("random input changes passages and the same input is reproducible", () => {
  assert.equal(
    generatePassageText(2, () => 0.1),
    generatePassageText(2, () => 0.1),
  );
  assert.notEqual(
    generatePassageText(2, () => 0.1),
    generatePassageText(2, () => 0.9),
  );
});

test("replays and replacement passages do not reuse earlier sentences", () => {
  const game = new GameEngine({ random: () => 0.5 });
  const initialTexts = game.passages.map((passage) => passage.text);
  game.start();
  const roundTexts = game.passages.map((passage) => passage.text);
  game.passages[0].x = game.width + 30;
  game.tick(0);
  const allSentences = [
    ...initialTexts,
    ...roundTexts,
    game.passages[0].text,
  ].flatMap((text) =>
    text.match(/[^.]+\./g)!.map((sentence) => sentence.trim()),
  );
  assert.equal(new Set(allSentences).size, allSentences.length);
});

test("Racing combines short and medium everyday words", () => {
  const text = Array.from({ length: 20 }, (_, index) =>
    generatePassageText(2, () => index / 20),
  ).join(" ");
  const words = text.toLowerCase().match(/[a-z]+/g)!;
  assert.ok(words.some((word) => word.length <= 4));
  assert.ok(words.some((word) => word.length >= 7));
  assert.ok(words.every((word) => word.length <= 9));
});
