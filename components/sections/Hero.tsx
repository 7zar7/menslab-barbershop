"use client";

import { motion } from "framer-motion";
import BookCall from "@/components/BookCall";
import Button from "@/components/Button";
import Marquee from "@/components/Marquee";
import ParticleField from "@/components/ParticleField";
import TextScramble from "@/components/TextScramble";
import { siteConfig } from "@/lib/siteConfig";

const PROOF = [
  "243 leads",
  "90 days",
  "LTV:CAC 5.2×",
  "$40M+ M&A deals",
  "Sites live in 2–5 days",
  "C-suite approved deliverables",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-24"
    >
      <ParticleField />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          Strategy + Execution · Est. {siteConfig.established}
        </motion.p>

        <h1 className="heading-xl mt-7 text-balance text-text-primary">
          <TextScramble text="Your site is losing you investors." />
        </h1>

        <motion.p
          className="mt-7 max-w-[480px] text-[18px] leading-relaxed text-text-secondary"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
        >
          We combine M&amp;A-level strategic thinking with 2–5 day execution.
          For founders who can&apos;t afford to look like they&apos;re still
          figuring it out.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.05 }}
        >
          <Button variant="primary" href="#work">
            See our work
          </Button>
          <BookCall variant="ghost" />
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <Marquee items={PROOF} />
      </motion.div>
    </section>
  );
}
