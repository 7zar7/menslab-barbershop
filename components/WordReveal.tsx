"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Resolves text one word at a time — each word rises and fades in, like a
 * compiler emitting tokens. No bounce.
 *
 * Pure CSS keyframe (see globals.css `.wr-run .wr-word`). The reveal runs
 * as soon as the container gets `wr-run`:
 *   - trigger="mount"  → armed on first client render
 *   - trigger="inView" → armed by IntersectionObserver (once)
 * Reduced-motion is handled globally (duration → 0, words snap visible).
 */
export default function WordReveal({
  text,
  className,
  trigger = "mount",
  y = 8,
  duration = 0.4,
  stagger = 0.06,
  amount = 0.3,
  delay = 0,
}: {
  text: string;
  className?: string;
  trigger?: "mount" | "inView";
  y?: number;
  duration?: number;
  stagger?: number;
  amount?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(trigger === "mount");

  useEffect(() => {
    if (trigger === "mount") {
      setRun(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: amount }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, amount]);

  const words = text.split(" ");

  return (
    <span
      ref={ref}
      className={`${run ? "wr-run " : ""}${className ?? ""}`}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden>
          <span
            className="wr-word"
            style={
              {
                "--wr-delay": `${delay + i * stagger}s`,
                "--wr-dur": `${duration}s`,
                "--wr-y": `${y}px`,
              } as CSSProperties
            }
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
