"use client";

import { useEffect, useRef } from "react";

export type MousePos = { x: number; y: number };

/**
 * Tracks the pointer in a ref (no re-render per move).
 * Read `.current` inside an rAF loop for lerp-smoothed consumers.
 */
export function useMousePosition() {
  const pos = useRef<MousePos>({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pos;
}
