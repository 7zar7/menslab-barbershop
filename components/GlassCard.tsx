"use client";

import { useRef, type ReactNode } from "react";

/**
 * Glass-processor card with dynamic lighting: a radial highlight tracks
 * the cursor inside the card in real time, fades out 200ms on leave.
 */
export default function GlassCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    glow.style.transition = "none";
    glow.style.opacity = "1";
    glow.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(0,229,255,0.10), transparent 60%)`;
  };

  const onLeave = () => {
    const glow = glowRef.current;
    if (!glow) return;
    glow.style.transition = "opacity 200ms ease-out";
    glow.style.opacity = "0";
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`glass group relative overflow-hidden rounded-none ${className}`}
      style={{ contain: "paint" }}
    >
      {/* Accent edge — appears on hover only. */}
      <span
        aria-hidden
        className="absolute left-0 top-0 z-20 h-full w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-y-100"
      />
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0"
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
