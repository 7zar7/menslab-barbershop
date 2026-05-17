/**
 * Site-wide signature texture: a near-invisible, slowly drifting dot
 * grid that sits behind every section. Pure CSS, fixed, non-interactive.
 */
export default function GridBackground() {
  return (
    <div
      aria-hidden
      className="dot-grid pointer-events-none fixed inset-0"
      style={{ zIndex: -1 }}
    />
  );
}
