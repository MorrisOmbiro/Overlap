# Overlap — React + TypeScript

A React + TypeScript + Vite conversion of the Overlap typing game, preserving its moving paragraphs, free switching, difficulty-weighted scoring, local personal best, and 60-second rounds.

## Run locally

Use Node.js 24 (specified in .nvmrc); Node.js 22.12+ is supported.

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

For Vercel, complete the one-time login, project linking, and overlap.run domain setup in [DEPLOYMENT.md](DEPLOYMENT.md), then run `npm run deploy` to validate and publish production.

Run `npm run package:deploy` to validate the project and create `overlap-site.tar.gz`. Deploy the contents of `dist/` to a static host. See [DEPLOYMENT.md](DEPLOYMENT.md) for build settings and steps to connect overlap.run after purchasing the domain.

Google Fonts are optional: system fallback fonts work offline. Personal best is saved only in this browser's local storage. Screen widths under 760 pixels use 10 passages instead of 20. Only the active passage affects points. Wrong characters do not advance the cursor; characters overtaken by the pace marker deduct points. A score of exactly zero does not end the game.

Passages are generated from word banks in `src/data/texts.json`. Each passage combines three new sentences; sentence history is retained across replays until the game is reloaded. Drifting uses a smaller, simpler vocabulary, while Flowing and Racing mix familiar short and medium-length words. Racing increases pace rather than vocabulary complexity.

Use the header theme selector to choose Forest, Ocean, Twilight, City, Dark, Ruby, Moody, or Fall. The selection is saved locally. Each palette uses a soft Drifting color, a neutral Flowing color, and a vivid Racing color. Theme tokens live in `src/styles/variables.css`, with state managed by `src/context/ThemeProvider.tsx`.

City pairs slate surfaces with warm streetlight accents. Dark uses near-black surfaces and grayscale controls, retaining color only for the difficulty indicators.

Ruby pairs burgundy (`#801330`), blush (`#FFC6BF`), and deep teal (`#003744`), with soft blush, muted teal, and vivid ruby difficulty colors.

Moody uses charcoal, deep teal, and plum surfaces with berry accents. Its difficulty colors progress from soft sage to muted blue and vivid pink.

Fall combines warm brown surfaces and amber accents with cream, muted sage, and bright orange difficulty colors.

Light themes are available in a separate dropdown group: Linen uses warm ivory and earth tones; Daybreak uses cool whites and blue accents. Both retain distinct difficulty colors and save the selected preference.

Enable Extreme beside the difficulty legend between rounds to add a fourth tier: 8× scoring, a 108 WPM marker, and faster passage movement. It uses the same approachable vocabulary as Racing. The setting stays enabled for replays during the session; controls are locked during a round.

“Keep passages in bounds” makes cards bounce at the arena edges. It can be switched during a round without resetting your score or active passage, and stays enabled for replays in the session.
