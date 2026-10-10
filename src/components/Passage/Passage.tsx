import type React from "react";
import { usePassageSize } from "../../hooks";
import type { PassageProps } from "../../types";
import { getCharacterClassName, getPassageStyle } from "../../utils";
import "./Passage.css";

const Passage: React.FC<PassageProps> = ({
  passage: p,
  selected,
  onSelect,
}) => {
  const ref = usePassageSize(p, selected);
  return (
    <button
      ref={ref}
      className={`passage${selected ? " selected" : ""}${p.errorTime > 0 ? " error" : ""}`}
      style={getPassageStyle(p)}
      aria-label={`${p.level.name}, ${p.level.mult} times points. ${p.text}`}
      onClick={() => onSelect(p.id)}
    >
      <span className="meta">
        <span>{p.level.name}</span>
        <span>
          {p.level.mult}× · {Math.round(p.level.cps * 12)} WPM
        </span>
      </span>
      <span className="words">
        {Array.from(p.text, (character, index) => (
          <span
            key={index}
            className={getCharacterClassName(p, index, selected)}
          >
            {character}
          </span>
        ))}
      </span>
    </button>
  );
};

export default Passage;
