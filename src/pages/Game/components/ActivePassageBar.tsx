import type React from "react";
import { getActiveMessage, formatPace } from "../../../utils";
import type { ActivePassageBarProps } from "./types";

const ActivePassageBar: React.FC<ActivePassageBarProps> = ({
  active,
  status,
}) => (
  <div className="active-bar">
    <span>
      {active && status === "running"
        ? `${active.level.name} / ${active.level.mult}×`
        : "YOUR NEXT MOVE"}
    </span>
    <p>{getActiveMessage(status, active)}</p>
    <span id="pace">
      {active && status === "running" ? formatPace(active) : ""}
    </span>
  </div>
);

export default ActivePassageBar;
