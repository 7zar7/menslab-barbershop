"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

type Cmd = { label: string; hint: string; target: string };

const COMMANDS: Cmd[] = [
  { label: "Top", hint: "Section", target: "#top" },
  { label: "The Difference", hint: "Section", target: "#difference" },
  { label: "Engagements & Pricing", hint: "Services", target: "#services" },
  { label: "Selected Work", hint: "Case studies", target: "#work" },
  { label: "Project Configurator", hint: "Diagnostic", target: "#configurator" },
  { label: "Book a 30-min call", hint: "Booking", target: "#configurator" },
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (c) =>
        c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [query]);

  const go = useCallback((target: string) => {
    setOpen(false);
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].target);
    }
  };

  return (
    <>
      {/* Mobile floating trigger */}
      <button
        aria-label="Open command menu"
        onClick={() => setOpen(true)}
        data-cursor="hover"
        className="fixed bottom-5 right-5 z-[150] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/80 font-mono text-sm text-accent backdrop-blur-md transition-colors hover:border-accent md:hidden"
      >
        ⌘
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-start justify-center p-4 pt-[14vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-void/70 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="glass relative z-10 w-full max-w-xl overflow-hidden rounded-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onKeyDown={onListKey}
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section, case study, booking…"
                className="w-full border-b border-border bg-transparent px-5 py-4 font-mono text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
              <ul className="max-h-[50vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <li className="px-3 py-6 text-center font-mono text-xs text-text-muted">
                    No matches.
                  </li>
                )}
                {results.map((c, i) => (
                  <li key={c.label}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(c.target)}
                      data-cursor="hover"
                      className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm transition-colors ${
                        i === active
                          ? "bg-accent-dim text-accent"
                          : "text-text-primary hover:bg-elevated"
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                        {c.hint}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-border px-5 py-3 font-mono text-[10px] text-text-muted">
                <span>↑ ↓ navigate · ↵ select · esc close</span>
                <span>{siteConfig.name}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
