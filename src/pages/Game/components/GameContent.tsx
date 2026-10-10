import type React from "react";
import type { GameContentProps } from "./types";

const GameContent: React.FC<GameContentProps> = ({ children }) => (
  <main>{children}</main>
);

export default GameContent;
