"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = (reduced: boolean): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
});

/**
 * Section-level reveal: children fade + rise on viewport enter.
 * Uses framer-motion `whileInView` (IntersectionObserver-backed, no
 * scroll listeners). Wrap each child you want staggered in <Reveal.Item>.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "ul";
  amount?: number;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ delayChildren: delay }}
    >
      {children}
    </MotionTag>
  );
}

function Item({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span" | "p" | "h2" | "h3";
}) {
  const reduced = useReducedMotion() ?? false;
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={item(reduced)}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </MotionTag>
  );
}

Reveal.Item = Item;
