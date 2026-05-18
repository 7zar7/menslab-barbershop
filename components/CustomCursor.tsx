"use client";

import { useEffect, useRef } from "react";

/**
 * Global custom cursor — single rAF loop for the whole page.
 *   default: 10px ring, 1px solid accent, transparent fill, opacity 0.8
 *   hover:   36px ring, faint accent fill, 150ms ease
 *   click:   quick spring to 0.7 and back
 * Visible from the first frame (native pointer is suppressed via
 * `body.has-custom-cursor`, so we must never leave the user with no
 * cursor). Disabled only on touch / coarse pointers.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const lerp = reduced ? 1 : 0.12;

    document.body.classList.add("has-custom-cursor");

    const el = dotRef.current!;
    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let hovering = false;
    let pressed = false;
    let scaleCur = 1;

    el.style.opacity = "0.8";

    const isInteractive = (n: EventTarget | null) =>
      n instanceof Element &&
      !!n.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      );

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = "0.8";
      hovering = isInteractive(e.target);
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    // Only hide when the pointer truly leaves the window.
    const onWindowOut = (e: PointerEvent) => {
      if (!e.relatedTarget && !(e as PointerEvent & { toElement?: unknown }).toElement) {
        el.style.opacity = "0";
      }
    };
    const onWindowOver = () => {
      el.style.opacity = "0.8";
    };

    const tick = () => {
      current.x += (target.x - current.x) * lerp;
      current.y += (target.y - current.y) * lerp;

      const scaleTarget = pressed ? 0.7 : 1;
      scaleCur += (scaleTarget - scaleCur) * (reduced ? 1 : 0.35);

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
    window.addEventListener("pointerout", onWindowOut);
    window.addEventListener("pointerover", onWindowOver);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerout", onWindowOut);
      window.removeEventListener("pointerover", onWindowOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border"
      style={{
        width: 10,
        height: 10,
        opacity: 0,
        borderColor: "#00E5FF",
        transition:
          "width 150ms cubic-bezier(0.16,1,0.3,1), height 150ms cubic-bezier(0.16,1,0.3,1), background-color 150ms cubic-bezier(0.16,1,0.3,1), opacity 200ms linear",
        willChange: "transform",
      }}
    />
  );
}
