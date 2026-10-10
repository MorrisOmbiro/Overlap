import type { GameEngine } from "./engine";

function registerGameTools(game: GameEngine, render: () => void) {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const tools = [
    {
      name: "read_game_state",
      description:
        "Read score, remaining time, active passage and round status.",
      annotations: { readOnlyHint: true },
      execute: () => ({
        running: game.status === "running",
        score: game.score,
        best: game.best,
        remaining: game.remaining,
        activePassage: game.active
          ? {
              id: game.active.id,
              text: game.active.text,
              position: game.active.position,
            }
          : null,
      }),
    },
    {
      name: "start_typing_round",
      description:
        "Start a 60-second round. Fails if a round is already running.",
      annotations: { readOnlyHint: false },
      execute: (input: Record<string, unknown>) => {
        if (input && Object.keys(input).length)
          throw Error("No arguments expected");
        if (!game.start()) throw Error("Round already running");
        render();
        return { running: true, score: game.score };
      },
    },
  ];
  for (const tool of tools) {
    try {
      Promise.resolve(
        context.registerTool(
          {
            ...tool,
            inputSchema: {
              type: "object",
              properties: {},
              additionalProperties: false,
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {
      /* Unsupported experimental API. */
    }
  }
  return () => lifecycle.abort();
}

export { registerGameTools };
