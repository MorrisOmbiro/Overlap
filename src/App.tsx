import { Analytics } from "@vercel/analytics/react";
import type React from "react";
import { ThemeProvider } from "./context";
import { Game } from "./pages";

const App: React.FC = () => (
  <ThemeProvider>
    <Game />
    <Analytics />
  </ThemeProvider>
);

export default App;
