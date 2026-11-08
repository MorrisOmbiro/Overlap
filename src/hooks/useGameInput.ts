import { useEffect, useRef, type SyntheticEvent } from "react";
import type { GameControls } from "../types";

const useGameInput = ({
  game,
  start,
  select,
  deselect,
  type,
}: GameControls) => {
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
    if (game.status === "finished") inputRef.current?.blur();
  }, [game.status]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (
        game.status !== "running" ||
        helpRef.current?.open ||
        (event.target instanceof Element &&
          event.target.closest("select, input[type=checkbox], dialog")) ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.isComposing
      )
        return;
      const inPlayingField =
        event.target === inputRef.current ||
        event.target === document.body ||
        (event.target instanceof Element && !!event.target.closest("#arena"));
      if (inPlayingField && event.key === "Tab") {
        if (!game.passages.length) return;
        event.preventDefault();
        const current = game.passages.findIndex((p) => p.id === game.activeId);
        const next =
          current < 0
            ? event.shiftKey
              ? game.passages.length - 1
              : 0
            : (current + (event.shiftKey ? -1 : 1) + game.passages.length) %
              game.passages.length;
        select(game.passages[next].id);
        focusInput();
        return;
      }
      if (inPlayingField && event.key === "Escape") {
        event.preventDefault();
        deselect();
        inputRef.current?.blur();
        document.getElementById("arena")?.focus({ preventScroll: true });
        return;
      }
      if (event.target === inputRef.current) return;
      if (event.key.length === 1) {
        event.preventDefault();
        game.type(event.key);
        focusInput();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [game, select, deselect]);

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
