"use client";

import { motion } from "framer-motion";
import BookCall from "@/components/BookCall";
import { siteConfig } from "@/lib/siteConfig";

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-[90svh] flex-col items-center justify-center px-6 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
          Availability
        </p>
        <h2 className="mt-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-6xl">
          We take 2–3 projects per month.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-balance text-lg leading-relaxed text-text-secondary">
          Not to manufacture scarcity — to protect quality. If you&apos;re
          considering it, the right time is now.
        </p>

        <div className="mt-10 flex justify-center">
          <BookCall label="Start a project" variant="primary" large />
        </div>

        <p className="mt-7 font-mono text-[11px] text-text-muted">
          Avg. response time: 4 hours · First call: 30 min · No obligation
        </p>
      </motion.div>

      <footer className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-6 pb-7">
        <div className="border-t border-border pt-6">
          <div className="flex flex-col items-start justify-between gap-2 font-mono text-[12px] text-text-muted sm:flex-row sm:items-center">
            <span>{siteConfig.name}</span>
            <span>
              <a
                href={siteConfig.linkedinUrl || "#"}
                data-cursor="hover"
                className="transition-colors hover:text-text-secondary"
              >
                LinkedIn
              </a>{" "}
              /{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                data-cursor="hover"
                className="transition-colors hover:text-text-secondary"
              >
                {siteConfig.email}
              </a>
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
