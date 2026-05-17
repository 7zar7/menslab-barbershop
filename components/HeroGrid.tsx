"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: a strict Cartesian engineering grid.
 *   - 1px lines, #0F1520, every 48px
 *   - every 4th line brighter, #131C2B (192px coarse grid)
 *   - no autonomous animation
 *   - on mousemove the plane tilts up to 3° on X/Y (perspective 1200px),
 *     lerped at 0.04 so the depth is felt, not seen
 * Single rAF loop. Tilt disabled under reduced-motion / coarse pointer.
 */
export default function HeroGrid() {
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plane = planeRef.current;
    if (!plane) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let raf = 0;
    const targetRot = { x: 0, y: 0 };
    const curRot = { x: 0, y: 0 };
    const MAX = 3;

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRot.y = nx * MAX;
      targetRot.x = -ny * MAX;
    };

    const tick = () => {
      curRot.x += (targetRot.x - curRot.x) * 0.04;
      curRot.y += (targetRot.y - curRot.y) * 0.04;
      plane.style.transform = `perspective(1200px) rotateX(${curRot.x}deg) rotateY(${curRot.y}deg) scale(1.08)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={planeRef}
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundColor: "#0A0E12",
          backgroundImage:
            "linear-gradient(#0F1520 1px, transparent 1px)," +
            "linear-gradient(90deg, #0F1520 1px, transparent 1px)," +
            "linear-gradient(#131C2B 1px, transparent 1px)," +
            "linear-gradient(90deg, #131C2B 1px, transparent 1px)",
          backgroundSize:
            "48px 48px, 48px 48px, 192px 192px, 192px 192px",
          transform: "perspective(1200px) scale(1.08)",
          willChange: "transform",
        }}
      />
      {/* Seat content above the grid without hiding it. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 45%, rgba(10,14,18,0) 0%, rgba(10,14,18,0.35) 55%, rgba(10,14,18,0.82) 100%)",
        }}
      />
    </div>
  );
}
