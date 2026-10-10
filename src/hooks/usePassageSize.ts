import { useLayoutEffect, useRef } from "react";
import type { PassageState } from "../types";

const usePassageSize = (passage: PassageState, selected: boolean) => {
  const ref = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    passage.width = ref.current.offsetWidth;
    passage.height = ref.current.offsetHeight;
  }, [passage, selected]);
  return ref;
};

export { usePassageSize };
