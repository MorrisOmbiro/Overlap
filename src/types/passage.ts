import type { CSSProperties } from "react";
import type { PassageState } from "./game";

export interface PassageProps {
  passage: PassageState;
  selected: boolean;
  onSelect: (id: number) => void;
}

export type PassageStyle = CSSProperties & { "--tone": string };
