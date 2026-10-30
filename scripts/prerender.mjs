import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

// Keep the temporary bundle inside the project so Node can resolve React.
const outDir = await mkdtemp(resolve("node_modules/.prerender-"));
try {
  await build({
    build: {
      ssr: "src/entry-server.tsx",
      outDir,
      emptyOutDir: true,
    },
  });
  const { render } = await import(
    pathToFileURL(resolve(outDir, "entry-server.js")).href
  );
  const template = await readFile("dist/index.html", "utf8");
  const placeholder = '<div id="root"></div>';
  if (!template.includes(placeholder)) {
    throw new Error("Missing pre-render root placeholder in dist/index.html");
  }
  const markup = render();
  if (!markup) throw new Error("Pre-render produced empty HTML");
  await writeFile(
    "dist/index.html",
    template.replace(placeholder, () => `<div id="root">${markup}</div>`),
  );
  console.log("Pre-rendered / → dist/index.html");
} finally {
  await rm(outDir, { recursive: true, force: true });
}
