"use client";

/**
 * Infinite left-scrolling proof ticker. Content is duplicated so the
 * -50% keyframe loop is seamless. prefers-reduced-motion freezes it
 * (handled globally in globals.css).
 */
export default function Marquee({ items }: { items: string[] }) {
  const line = items.join("  ·  ");
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee will-change-transform">
        <span className="whitespace-nowrap font-mono text-[11px] tracking-wide text-text-muted">
          {line}&nbsp;&nbsp;·&nbsp;&nbsp;
        </span>
        <span
          aria-hidden
          className="whitespace-nowrap font-mono text-[11px] tracking-wide text-text-muted"
        >
          {line}&nbsp;&nbsp;·&nbsp;&nbsp;
        </span>
      </div>
    </div>
  );
}
