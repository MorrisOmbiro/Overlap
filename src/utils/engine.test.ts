import test from "node:test";
import assert from "node:assert/strict";
import { GameEngine } from "./engine";

const newGame = () => {
  const game = new GameEngine({ random: () => 0.5 });
  game.start();
  return game;
};

test("difficulty multipliers and free switching preserve accumulated score", () => {
  const game = newGame();
  game.select(0);
  game.type(
    game.active!.text.slice(game.active!.position, game.active!.position + 10),
  );
  assert.equal(game.score, 10);
  game.select(2);
  assert.equal(game.score, 10);
  game.type(
    game.active!.text.slice(game.active!.position, game.active!.position + 3),
  );
  assert.equal(game.score, 22);
  assert.equal(game.correct, 13);
});

test("wrong keys do not advance the typing position", () => {
  const game = newGame();
  game.select(0);
  const position = game.active!.position;
  game.type("Ω");
  assert.equal(game.active!.position, position);
  assert.equal(game.score, 0);
  assert.equal(game.attempts, 1);
});

test("background markers advance without deducting points", () => {
  const game = newGame();
  game.tick(5);
  assert.ok(game.passages[0].marker > 0);
  assert.equal(game.score, 0);
  assert.equal(game.status, "running");
});

test("overtaking deducts once per character and zero is not a loss", () => {
  const game = newGame();
  game.select(0);
  game.score = 1;
  game.active!.position = 0;
  game.tick(1 / game.active!.level.cps + 0.001);
  assert.equal(game.score, 0);
  assert.equal(game.status, "running");
  game.tick(0.001);
  assert.equal(game.score, 0);
  game.tick(1 / game.active!.level.cps);
  assert.equal(game.score, -1);
  assert.equal(game.status, "finished");
  assert.equal(game.reason, "OVERTAKEN");
});

test("round ends at 60 seconds and replay resets counters", () => {
  const game = newGame();
  game.score = 25;
  game.tick(59);
  assert.equal(game.status, "running");
  game.tick(1);
  assert.equal(game.status, "finished");
  assert.equal(game.reason, "TIME’S UP");
  assert.equal(game.best, 25);
  assert.equal(game.start(), true);
  assert.equal(game.score, 0);
  assert.equal(game.remaining, 60);
  assert.equal(game.best, 25);
  assert.equal(game.start(), false);
});

test("passages leaving the screen deselect without penalty", () => {
  const game = newGame();
  game.select(0);
  game.active!.x = game.width + 30;
  game.tick(0);
  assert.equal(game.active, null);
  assert.equal(game.score, 0);
  assert.equal(game.passages.length, 20);
});

test("compact layout scales to ten paragraphs", () => {
  assert.equal(new GameEngine({ compact: true }).passages.length, 10);
});
