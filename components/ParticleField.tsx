"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), {
  ssr: false,
});

/**
 * Hero background. Always paints a cheap CSS gradient first (zero JS cost,
 * no LCP impact). Three.js is loaded only when:
 *   - the device has >= 4 logical cores, and
 *   - prefers-reduced-motion is not set,
 * and only after the browser is idle post-LCP.
 */
export default function ParticleField() {
  const [mountCanvas, setMountCanvas] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 2;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (cores < 4 || reduced) return;

    let cancelled = false;
    const start = () => {
      if (!cancelled) setMountCanvas(true);
    };

    // Defer past LCP: wait for load, then idle.
    const schedule = () => {
      const ric = (window as Window & {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }).requestIdleCallback;
      if (ric) ric(start, { timeout: 2500 });
      else setTimeout(start, 1200);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* CSS fallback / base layer */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(0,229,255,0.10) 0%, rgba(0,229,255,0.03) 35%, transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(0,229,255,0.05) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 animate-pulse opacity-40 [animation-duration:6s]"
        style={{
          background:
            "radial-gradient(30% 30% at 20% 30%, rgba(0,229,255,0.06) 0%, transparent 60%)",
        }}
      />
      {mountCanvas && <ParticleCanvas />}
      {/* Reversed vignette — faint lift at center, deep falloff at the
          edges so the headline always reads cleanly over the field. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 45%, rgba(226,232,240,0.045) 0%, transparent 38%), radial-gradient(95% 90% at 50% 50%, transparent 30%, rgba(10,14,18,0.7) 78%, rgba(7,10,13,0.92) 100%)",
        }}
      />
    </div>
  );
}
