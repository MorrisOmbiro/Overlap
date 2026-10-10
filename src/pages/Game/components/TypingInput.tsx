import type React from "react";
import type { TypingInputProps } from "./types";

const TypingInput: React.FC<TypingInputProps> = ({ inputRef, onSubmit }) => (
  <input
    ref={inputRef}
    id="typing"
    type="text"
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
    spellCheck={false}
    aria-label="Type the highlighted passage"
    inputMode="text"
    onInput={onSubmit}
    onCompositionEnd={onSubmit}
    onPaste={(event) => event.preventDefault()}
  />
);

export default TypingInput;
