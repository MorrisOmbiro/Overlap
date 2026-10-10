import { useEffect, useRef, type SyntheticEvent } from "react";
import type { GameControls } from "../types";

const useGameInput = ({ game, start, select, type }: GameControls) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const helpRef = useRef<HTMLDialogElement>(null);
  const againRef = useRef<HTMLButtonElement>(null);
  const focusInput = () => inputRef.current?.focus({ preventScroll: true });
  const startRound = () => {
    start();
    focusInput();
  };
  const selectPassage = (id: number) => {
    select(id);
    focusInput();
  };
  const submitInput = (event: SyntheticEvent<HTMLInputElement>) => {
    if ("isComposing" in event.nativeEvent && event.nativeEvent.isComposing)
      return;
    if (!helpRef.current?.open) type(event.currentTarget.value);
    event.currentTarget.value = "";
  };

  useEffect(() => {
    if (game.status === "finished") againRef.current?.focus();
  }, [game.status]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (
        game.status !== "running" ||
        helpRef.current?.open ||
        event.target === inputRef.current ||
        (event.target instanceof Element && event.target.closest("select")) ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.isComposing
      )
        return;
      if (event.key.length === 1) {
        event.preventDefault();
        game.type(event.key);
        focusInput();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [game]);

  return {
    inputRef,
    helpRef,
    againRef,
    focusInput,
    startRound,
    selectPassage,
    submitInput,
  };
};

export { useGameInput };
