import type React from "react";
import type { HelpDialogProps } from "./types";

const HelpDialog: React.FC<HelpDialogProps> = ({ helpRef, onClose }) => (
  <dialog ref={helpRef} onClose={onClose} aria-labelledby="help-title">
    <button
      className="close"
      aria-label="Close instructions"
      onClick={() => helpRef.current?.close()}
    >
      ×
    </button>
    <span className="eyebrow">HOW TO FIND YOUR FLOW</span>
    <h2 id="help-title">
      A moving target.
      <br />A steady rhythm.
    </h2>
    <ol>
      <li>
        <b>Pick your passage.</b> Click any text to bring it forward. Start at
        the underlined character.
      </li>
      <li>
        <b>Beat the coral marker.</b> It advances through the passage. Each
        untyped character it passes costs points.
      </li>
      <li>
        <b>Change course freely.</b> Click another passage anytime. Only your
        active passage affects your score.
      </li>
      <li>
        <b>Choose your risk.</b> Earn 1, 2, or 4 points per correct character.
        Missed characters cost the same amount.
      </li>
    </ol>
    <p>
      You start at 0 with a short head start on every selection. The round ends
      after 60 seconds or when your score drops below 0. Passages leaving the
      screen carry no extra penalty. The timer keeps running while these
      instructions are open.
    </p>
  </dialog>
);

export default HelpDialog;
