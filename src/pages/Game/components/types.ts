import type { ReactNode, RefObject, SyntheticEvent } from "react";
import type { GameStatus, PassageState } from "../../../types";

export interface GameHeaderProps {
  onShowHelp: () => void;
}
export interface GameToolbarProps {
  score: number;
  best: number;
  remaining: number;
}
export interface RoundOverlayProps {
  status: GameStatus;
  reason: string;
  score: number;
  summary: { wpm: number; accuracy: number; characters: number };
  buttonRef: RefObject<HTMLButtonElement | null>;
  onStart: () => void;
}
export interface GameArenaProps {
  keepInBounds: boolean;
  arenaRef: RefObject<HTMLElement | null>;
  passages: PassageState[];
  activeId: number | null;
  onSelect: (id: number) => void;
  message: string;
  messageVisible: boolean;
  children: ReactNode;
}
export interface GameToastProps {
  message: string;
  visible: boolean;
}
export interface ActivePassageBarProps {
  active: PassageState | null;
  status: GameStatus;
}
export interface TypingInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onSubmit: (event: SyntheticEvent<HTMLInputElement>) => void;
}
export interface HelpDialogProps {
  helpRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}
export interface GameContentProps {
  children: ReactNode;
}

export interface DifficultyLegendProps {
  keepInBounds: boolean;
  onBoundsChange: (enabled: boolean) => void;
  extreme: boolean;
  disabled: boolean;
  onExtremeChange: (enabled: boolean) => void;
}
