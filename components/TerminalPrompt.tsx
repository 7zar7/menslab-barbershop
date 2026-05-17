"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Blinking terminal prompt that types itself in on mount (40ms/char).
 * Replaces the static hero eyebrow. Reduced-motion → show full text,
 * steady cursor.
 */
export default function TerminalPrompt({
  text = "> isomorph.studio — initialized",
}: {
  text?: string;
}) {
  const [shown, setShown] = useState(0);
  const done = shown >= text.length;
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setShown(text.length);
      return;
    }
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= text.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 40);
    return () => clearInterval(id);
  }, [text]);

  return (
    <p
      className="font-mono text-[11px] tracking-[0.08em]"
      style={{ color: "#00E5FF", opacity: 0.7 }}
      aria-label={text}
    >
      <span aria-hidden>{text.slice(0, shown)}</span>
      <span
        aria-hidden
        className={done ? "cursor-blink" : ""}
        style={{
          display: "inline-block",
          width: "0.55em",
          marginLeft: "1px",
          transform: "translateY(1px)",
          borderBottom: "1px solid #00E5FF",
        }}
      />
    </p>
  );
}
