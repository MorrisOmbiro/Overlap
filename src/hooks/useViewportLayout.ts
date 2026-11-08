import { useEffect, useRef } from "react";

// Measure the actual viewport and surrounding UI, including wrapped controls.
const useViewportLayout = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = ref.current;
    if (!shell) return;
    let frame = 0;
    const viewport = window.visualViewport;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = viewport?.height ?? window.innerHeight;
        const width = viewport?.width ?? window.innerWidth;
        shell.style.setProperty("--viewport-height", `${height}px`);
        shell.style.setProperty("--viewport-width", `${width}px`);
        shell.dataset.compact = String(height < 800 || width < 600);
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(shell);
    shell.querySelectorAll("header, main > *").forEach((node) => {
      observer.observe(node);
    });
    window.addEventListener("resize", measure);
    viewport?.addEventListener("resize", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      viewport?.removeEventListener("resize", measure);
    };
  }, []);

  return ref;
};

export { useViewportLayout };
