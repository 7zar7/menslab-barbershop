"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Resolves text one word at a time — each word rises and fades in, like a
 * compiler emitting tokens. No bounce. Used by the hero (trigger: mount)
 * and Pain Mirror (trigger: inView).
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
  const reduced = useReducedMotion() ?? false;
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : duration, ease: EASE },
    },
  };

  const animateProps =
    trigger === "mount"
      ? { animate: "show" as const }
      : {
          whileInView: "show" as const,
          viewport: { once: true, amount },
        };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      {...animateProps}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden>
          <motion.span
            variants={word}
            style={{
              display: "inline-block",
              willChange: "transform, opacity",
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
