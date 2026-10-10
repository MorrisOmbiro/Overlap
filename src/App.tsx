import { ThemeProvider } from "./context";
import type React from "react";
import { Game } from "./pages";

const App: React.FC = () => (
  <ThemeProvider>
    <Game />
  </ThemeProvider>
);

export default App;
