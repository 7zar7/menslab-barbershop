/**
 * Page-wide film grain. A tiled fractal-noise SVG at 0.025 opacity sits
 * above everything (non-interactive) — adds tactile depth that reads as
 * premium rather than flat. Static (no repaint cost after first paint).
 */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>` +
      `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/>` +
      `<feColorMatrix type='saturate' values='0'/></filter>` +
      `<rect width='100%' height='100%' filter='url(#n)'/></svg>`
  );

export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        pointerEvents: "none",
        backgroundImage: `url("${NOISE}")`,
        backgroundRepeat: "repeat",
        opacity: 0.025,
      }}
    />
  );
}
