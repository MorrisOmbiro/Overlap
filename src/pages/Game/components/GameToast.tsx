import type React from "react";
import type { GameToastProps } from "./types";

const GameToast: React.FC<GameToastProps> = ({ message, visible }) => (
  <div id="toast" role="status" className={visible ? "is-visible" : undefined}>
    {visible ? message : ""}
  </div>
);

export default GameToast;
