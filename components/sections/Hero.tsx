"use client";

import { useEffect, useRef, useState } from "react";
import BookCall from "@/components/BookCall";
import Button from "@/components/Button";
import HeroGrid from "@/components/HeroGrid";
import Marquee from "@/components/Marquee";
import TerminalPrompt from "@/components/TerminalPrompt";
import WordReveal from "@/components/WordReveal";

const PROOF = [
  "243 leads",
  "90 days",
  "LTV:CAC 5.2×",
  "$40M+ M&A deals",
  "Sites live in 2–5 days",
  "C-suite approved deliverables",
];

export default function Hero() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [exiting, setExiting] = useState(false);
  const [zEnabled, setZEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!desktop || reduced) return;
    setZEnabled(true);

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Sentinel sits high in the hero (~22%). At the spec's literal
    // "80% depth" the centred hero text has already scrolled off the
    // top, so the fly-away animates off-screen and is only seen when
    // scrolling back UP. Triggering while the text is still on-screen
    // makes the downward "fly into the content" motion actually visible.
    // IntersectionObserver fires in BOTH scroll directions.
    const io = new IntersectionObserver(
      ([entry]) => {
        setExiting(
          !entry.isIntersecting && entry.boundingClientRect.top < 0
        );
      },
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  const flyAway = zEnabled && exiting;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-24"
    >
      <HeroGrid />

      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute left-0 right-0"
        style={{ top: "22%", height: 1 }}
      />

      <div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
        style={{
          transform: flyAway ? "scale(1.08)" : "scale(1)",
          opacity: flyAway ? 0 : 1,
          filter: flyAway ? "blur(4px)" : "blur(0px)",
          transition:
            "transform 500ms ease-in, opacity 500ms ease-in, filter 500ms ease-in",
          willChange: "transform, opacity, filter",
        }}
      >
        <TerminalPrompt />

        <h1 className="heading-xl mt-7 text-balance text-text-primary">
          <WordReveal
            text="Your site is losing you investors."
            trigger="mount"
            y={8}
            duration={0.4}
            stagger={0.06}
            delay={0.3}
          />
        </h1>

        <p
          className="rise-in mt-7 max-w-[480px] text-[18px] leading-relaxed text-text-secondary"
          style={{ ["--ri-delay" as string]: "0.9s" }}
        >
          We combine M&amp;A-level strategic thinking with 2–5 day execution.
          For founders who can&apos;t afford to look like they&apos;re still
          figuring it out.
        </p>

        <div
          className="rise-in mt-10 flex flex-col items-center gap-3 sm:flex-row"
          style={{ ["--ri-delay" as string]: "1.05s" }}
        >
          <Button variant="primary" href="#work">
            See our work
          </Button>
          <BookCall variant="ghost" />
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-8 z-10"
        style={{
          opacity: flyAway ? 0 : 1,
          transition: "opacity 500ms ease-in",
        }}
      >
        <Marquee items={PROOF} />
      </div>
    </section>
  );
}
