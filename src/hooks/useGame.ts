import { useEffect, useReducer, useRef, type RefObject } from "react";
import {
  GameEngine,
  readBestScore,
  saveBestScore,
  registerGameTools,
} from "../utils";

const useGame = (arenaRef: RefObject<HTMLElement | null>) => {
  const engineRef = useRef<GameEngine | null>(null);
  if (!engineRef.current) {
    // Keep the build render and the first browser render identical.
    let seed = 42;
    engineRef.current = new GameEngine({
      random: () => {
        seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
        return seed / 4294967296;
      },
    });
  }
  const [, render] = useReducer((n) => n + 1, 0);
  const game = engineRef.current;

  useEffect(() => {
    game.best = readBestScore();
    game.random = Math.random;
    const arena = arenaRef.current;
    if (!arena) return;
    const resize = () => {
      game.width = arena.clientWidth;
      game.height = arena.clientHeight;
      game.compact = window.innerWidth < 760;
      // Preserve the current run when the viewport changes.
      if (game.status === "ready") game.seed();
      render();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(arena);
    let previous = performance.now();
    let frameId: number;
    let lastPaint = previous;
    const frame = (now: number) => {
      game.tick((now - previous) / 1000);
      previous = now;
      if (now - lastPaint >= 1000 / 30) {
        render();
        lastPaint = now;
      }
      frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [game, arenaRef]);

  useEffect(() => {
    saveBestScore(game.best);
  }, [game.best]);

  useEffect(() => {
    return registerGameTools(game, render);
  }, [game]);

  return {
    game,
    setKeepInBounds: (enabled: boolean) => {
      game.setKeepInBounds(enabled);
      render();
    },
    setExtreme: (enabled: boolean) => {
      game.setExtreme(enabled);
      render();
    },
    start: () => {
      game.start();
      render();
    },
    select: (id: number) => {
      game.select(id);
      render();
    },
    deselect: () => {
      game.deselect();
      render();
    },
    type: (text: string) => {
      game.type(text);
      render();
    },
  };
};

export { useGame };
