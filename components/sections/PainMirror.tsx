"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const lines = [
  { text: "Your product is ready. Your site isn’t.", tone: "text-text-primary" },
  {
    text: "The agency quoted six weeks. You needed it yesterday.",
    tone: "text-text-primary",
  },
  {
    text: "The freelancer built what you asked. Not what you needed.",
    tone: "text-text-secondary",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function PainMirror() {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.section
      className="relative px-6 py-40 sm:py-56"
      initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ willChange: "transform, opacity" }}
    >
      <motion.div
        className="mx-auto max-w-4xl"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="space-y-10">
          {lines.map((l) => (
            <motion.p
              key={l.text}
              variants={line}
              className={`text-balance font-semibold leading-[1.15] ${l.tone}`}
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                willChange: "transform, opacity",
              }}
            >
              {l.text}
            </motion.p>
          ))}
        </div>

        <motion.div variants={line} className="mt-20">
          <div className="h-px w-full bg-border" />
          <p className="mt-6 font-mono text-[11px] tracking-wide text-text-muted">
            If you read that and nodded — keep scrolling.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
