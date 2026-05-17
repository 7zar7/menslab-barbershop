"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic cursor: a 12px accent dot that lerp-follows the pointer and
 * expands to a 40px border-only ring over interactive elements.
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

    const isInteractive = (n: EventTarget | null) =>
      n instanceof Element &&
      !!n.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]');

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "0.9";
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
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      const size = hovering ? 40 : 12;
      const scale = pressed ? 0.85 : 1;
      el.style.transform = `translate3d(${current.x - size / 2}px, ${
        current.y - size / 2
      }px, 0) scale(${scale})`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.backgroundColor = hovering ? "transparent" : "var(--accent)";
      el.style.borderColor = hovering ? "var(--accent)" : "transparent";
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
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border opacity-0 mix-blend-difference transition-[width,height,background-color] duration-200 ease-out"
      style={{ width: 12, height: 12, willChange: "transform" }}
    />
  );
}
