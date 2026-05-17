"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { hasCalendly, siteConfig } from "@/lib/siteConfig";
import Button from "./Button";

/**
 * Booking trigger + overlay. Renders the Calendly embed (dark theme)
 * once a real URL is set in siteConfig; until then shows a clean
 * fallback so the funnel never dead-ends.
 */
export default function BookCall({
  label = "Book 30 min",
  variant = "ghost",
  large = false,
}: {
  label?: string;
  variant?: "primary" | "ghost";
  large?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ready = hasCalendly();

  const embedUrl = ready
    ? `${siteConfig.calendlyUrl}?hide_event_type_details=0&background_color=0A0E12&text_color=E2E8F0&primary_color=00E5FF`
    : "";

  return (
    <>
      <Button variant={variant} large={large} onClick={() => setOpen(true)}>
        {label} →
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-void/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="glass relative z-10 w-full max-w-3xl overflow-hidden rounded-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                  Book a 30-min call
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-text-secondary transition-colors hover:text-accent"
                  data-cursor="hover"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {ready ? (
                <iframe
                  src={embedUrl}
                  title="Schedule a call"
                  className="h-[640px] w-full bg-void"
                  loading="lazy"
                />
              ) : (
                <div className="px-8 py-14 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                    Scheduling
                  </p>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-text-primary">
                    Direct booking opens shortly.
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-text-secondary">
                    The live calendar is being connected. In the meantime,
                    send one line about where you are — we reply within 4
                    hours.
                  </p>
                  <div className="mt-7">
                    <Button
                      variant="primary"
                      href={`mailto:${siteConfig.email}?subject=Project%20inquiry`}
                    >
                      Email us
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
