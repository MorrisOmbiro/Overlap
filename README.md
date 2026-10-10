# Overlap — React + TypeScript

A React + TypeScript + Vite conversion of the Overlap typing game, preserving its moving paragraphs, free switching, difficulty-weighted scoring, local personal best, and 60-second rounds.

## Run locally

Requires Node.js 22.12+ (or Node 20.19+).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create and serve the production build:

```sh
npm run build
npm run preview
```

Run gameplay regression tests with `npm test` and strict type checking with `npm run typecheck`. The production build also runs type checking.

## Source layout

- `src/App.tsx`: App composition.
- `src/pages/Game/`: Game screen and its styles.
- `src/components/Passage/`: Passage component and its styles.
- `src/hooks/`: Game lifecycle, keyboard input, and passage measurement hooks.
- `src/types/`: Shared game, component, and browser integration types.
- `src/utils/`: Game engine, passage creation, display helpers, storage, and browser tools.
- `src/data/`: JSON word dictionary and difficulty configuration.
- `src/styles/`: Global styles and reusable CSS custom properties.

Each module directory exposes its public API through `index.ts`. Components use a default export at the bottom of the file. Shared colors and fonts live in `styles/variables.css`; component-specific styles are colocated with their component. Passage colors use the local `--tone` variable, assigned from the global difficulty colors.

The game engine lives in a React ref; React renders the interface at up to 30 frames per second. Animation and observation callbacks are cleaned up on unmount, including React Strict Mode remounts. No manual DOM creation or legacy script injection is used.

## Deploy

Run `npm run build` and deploy the contents of `dist/` to any static host. The existing hosted vanilla-JavaScript version has not been changed by this source conversion.

Google Fonts are optional: system fallback fonts work offline. Personal best is saved only in this browser's local storage. Screen widths under 760 pixels use 10 passages instead of 20. Only the active passage affects points. Wrong characters do not advance the cursor; characters overtaken by the pace marker deduct points. A score of exactly zero does not end the game.

Passages are generated from word banks in `src/data/texts.json`. Each passage combines three new sentences; sentence history is retained across replays until the game is reloaded. Drifting uses a smaller, simpler vocabulary, while Flowing and Racing mix familiar short and medium-length words. Racing increases pace rather than vocabulary complexity.
