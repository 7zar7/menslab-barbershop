"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

/**
 * Glassmorphism click physics: presses to 0.98 with a spring back,
 * flashes the border to --accent for ~150ms, and fires a micro-haptic
 * on supporting devices.
 */
export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  type = "button",
  large = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  large?: boolean;
}) {
  const base =
    "group relative inline-flex items-center justify-center rounded-md font-medium tracking-tight transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";
  const size = large ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";
  const styles =
    variant === "primary"
      ? "bg-accent-dim text-accent border border-accent hover:bg-[#00E5FF2e]"
      : "bg-transparent text-text-primary border border-border hover:border-border-active hover:text-accent";

  const handleClick = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate?.([10]);
      } catch {
        /* unsupported */
      }
    }
    onClick?.();
  };

  const content = (
    <motion.span
      className={`${base} ${size} ${styles} ${className}`}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 600, damping: 18 }}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md border border-transparent transition-colors duration-150 group-active:border-accent"
      />
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className="inline-flex"
        data-cursor="hover"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className="inline-flex"
      data-cursor="hover"
    >
      {content}
    </button>
  );
}
