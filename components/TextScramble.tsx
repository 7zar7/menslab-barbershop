"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Resolves text left-to-right out of cycling random glyphs.
 * Runs once per browser session (sessionStorage flag) and is skipped
 * entirely under prefers-reduced-motion.
 */
export default function TextScramble({
  text,
  className,
  sessionKey = "hero-scramble",
  charMs = 40,
}: {
  text: string;
  className?: string;
  sessionKey?: string;
  charMs?: number;
}) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyRan =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem(sessionKey) === "1";

    if (reduced || alreadyRan) {
      setDisplay(text);
      return;
    }

    try {
      sessionStorage.setItem(sessionKey, "1");
    } catch {
      /* private mode — run anyway */
    }

    const chars = text.split("");
    let resolved = 0;
    let raf = 0;
    let last = performance.now();

    setDisplay("");

    const step = (now: number) => {
      if (now - last >= charMs) {
        resolved = Math.min(resolved + 1, chars.length);
        last = now;
      }
      frame.current++;
      const out = chars
        .map((c, i) => {
          if (c === " ") return " ";
          if (i < resolved) return c;
          return GLYPHS[(frame.current + i * 7) % GLYPHS.length];
        })
        .join("");
      setDisplay(out);
      if (resolved < chars.length) {
        raf = requestAnimationFrame(step);
      } else {
        setDisplay(text);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, sessionKey, charMs]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
