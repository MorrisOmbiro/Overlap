import type React from "react";
import { useRef } from "react";
import { useGame, useGameInput } from "../../hooks";
import {
  ActivePassageBar,
  DifficultyLegend,
  GameArena,
  GameContent,
  GameFooter,
  GameHeader,
  GameToolbar,
  HelpDialog,
  RoundOverlay,
  TypingInput,
} from "./components";
import "./Game.css";

const Game: React.FC = () => {
  const arenaRef = useRef<HTMLElement>(null);
  const controls = useGame(arenaRef);
  const { game } = controls;
  const {
    inputRef,
    helpRef,
    againRef,
    focusInput,
    startRound,
    selectPassage,
    submitInput,
  } = useGameInput(controls);

  return (
    <>
      <GameHeader onShowHelp={() => helpRef.current?.showModal()} />
      <GameContent>
        <GameToolbar
          score={game.score}
          best={game.best}
          remaining={Math.ceil(game.remaining)}
        />
        <GameArena
          arenaRef={arenaRef}
          passages={game.passages}
          activeId={game.activeId}
          onSelect={selectPassage}
          message={game.message}
          messageVisible={game.messageTime > 0}
        >
          <RoundOverlay
            status={game.status}
            reason={game.reason}
            score={game.score}
            summary={game.summary()}
            buttonRef={againRef}
            onStart={startRound}
          />
        </GameArena>
        <DifficultyLegend />
        <ActivePassageBar active={game.active} status={game.status} />
        <TypingInput inputRef={inputRef} onSubmit={submitInput} />
        <GameFooter />
      </GameContent>
      <HelpDialog
        helpRef={helpRef}
        onClose={() => {
          if (game.status === "running") focusInput();
        }}
      />
    </>
  );
};

export default Game;
