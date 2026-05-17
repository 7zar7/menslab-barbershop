"use client";

import { useEffect, useRef } from "react";

/**
 * Global custom cursor — single rAF loop for the whole page.
 *   default: 10px ring, 1px solid accent, transparent fill, opacity 0.8
 *   hover:   36px ring, faint accent fill, 150ms ease
 *   click:   quick spring to 0.7 and back
 * Native pointer is suppressed via `body.has-custom-cursor` (globals.css).
 * Disabled on touch / coarse pointers and under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    document.body.classList.add("has-custom-cursor");

    const el = dotRef.current!;
    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let hovering = false;
    let visible = false;
    let pressed = false;
    let scaleCur = 1;

    const isInteractive = (n: EventTarget | null) =>
      n instanceof Element &&
      !!n.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      );

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "0.8";
      }
      hovering = isInteractive(e.target);
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      const scaleTarget = pressed ? 0.7 : 1;
      scaleCur += (scaleTarget - scaleCur) * 0.35;

      const size = hovering ? 36 : 10;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.backgroundColor = hovering
        ? "rgba(0,229,255,0.06)"
        : "transparent";
      el.style.transform = `translate3d(${current.x - size / 2}px, ${
        current.y - size / 2
      }px, 0) scale(${scaleCur})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border opacity-0 transition-[width,height,background-color] duration-150"
      style={{
        width: 10,
        height: 10,
        borderColor: "#00E5FF",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
    />
  );
}
