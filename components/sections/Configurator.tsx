"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/ScrollReveal";
import { hasCalendly, siteConfig } from "@/lib/siteConfig";

const STAGES = ["Pre-seed", "Seed Round", "Series A+", "Local Business"] as const;
const INDUSTRIES = [
  "LegalTech",
  "FinTech",
  "B2B SaaS",
  "Consumer App",
  "Local / Service",
] as const;

type Stage = (typeof STAGES)[number];
type Industry = (typeof INDUSTRIES)[number];

type Rec = {
  tier: string;
  invest: string;
  timeline: string;
  first: string;
};

function recommend(stage: Stage, industry: Industry, priority: number): Rec {
  const local = stage === "Local Business" || industry === "Local / Service";
  if (local) {
    return {
      tier: "Launch Site",
      invest: "€500–900",
      timeline: "3–7 days",
      first: "Live, deployed site",
    };
  }
  const strategic =
    stage === "Seed Round" || stage === "Series A+" || priority >= 70;
  if (strategic) {
    return {
      tier: "Strategy + Build",
      invest: "$5,000–8,000",
      timeline: "10–14 days",
      first: "GTM Audit + Positioning",
    };
  }
  return {
    tier: "Launch Package",
    invest: "$2,500–4,500",
    timeline: "5–10 days",
    first: "Positioning Doc",
  };
}

function useTypewriter(text: string, speed = 14, run = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!run) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, run]);
  return out;
}

const STEPS_LOG = [
  "Reading stage...",
  "Mapping ICP...",
  "Calculating scope...",
  "Brief ready.",
];

export default function Configurator() {
  const [stage, setStage] = useState<Stage>("Pre-seed");
  const [industry, setIndustry] = useState<Industry>("B2B SaaS");
  const [priority, setPriority] = useState(50);

  const rec = useMemo(
    () => recommend(stage, industry, priority),
    [stage, industry, priority]
  );

  const outputKey = `${rec.tier}|${rec.invest}|${rec.timeline}|${rec.first}`;
  const typedTier = useTypewriter(rec.tier, 18);
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [logLine, setLogLine] = useState(0);

  const brief = useMemo(() => {
    const leaning =
      priority >= 70
        ? "investor-grade quality"
        : priority <= 30
          ? "speed to market"
          : "a balance of speed and rigor";
    return `You're a ${stage.toLowerCase()} ${industry} team optimizing for ${leaning}. Based on that, ${rec.tier} (${rec.invest}, ${rec.timeline}) is the right scope. We'd open with the ${rec.first.toLowerCase()} so the strategy is locked before a single pixel ships. Bring this to a 30-minute call and we'll pressure-test it against your raise or launch timeline.`;
  }, [stage, industry, priority, rec]);

  const runGenerate = () => {
    if (phase === "running") return;
    setPhase("running");
    setLogLine(0);
    if (reduced.current) {
      setPhase("done");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setLogLine(i);
      if (i >= STEPS_LOG.length) {
        clearInterval(id);
        setTimeout(() => setPhase("done"), 250);
      }
    }, 380);
  };

  // Reset result if inputs change after generating.
  useEffect(() => {
    setPhase("idle");
  }, [outputKey]);

  const typedBrief = useTypewriter(brief, 12, phase === "done");

  const calendlyReady = hasCalendly();
  const embedUrl = calendlyReady
    ? `${siteConfig.calendlyUrl}?background_color=0A0E12&text_color=E2E8F0&primary_color=00E5FF`
    : "";

  return (
    <section id="configurator" className="relative px-6 py-32">
      <Reveal className="mx-auto max-w-3xl">
        <Reveal.Item as="p" className="section-label">
          Project Configurator
        </Reveal.Item>
        <Reveal.Item
          as="p"
          className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-text-secondary"
        >
          Not a contact form. A diagnostic tool. Tell us where you are — we&apos;ll
          tell you what you actually need.
        </Reveal.Item>

        <Reveal.Item>
          <div className="glass mt-12 overflow-hidden rounded-none">
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[11px] tracking-[0.2em] text-text-secondary">
                CONFIGURATOR.EXE
              </span>
              <span className="w-12" />
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              {/* Step 1 */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                  Current Stage
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {STAGES.map((s) => (
                    <button
                      key={s}
                      data-cursor="hover"
                      onClick={() => setStage(s)}
                      className={`rounded-md border px-3 py-2 font-mono text-xs transition-colors ${
                        stage === s
                          ? "border-accent bg-accent-dim text-accent"
                          : "border-border text-text-secondary hover:border-border-active"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                  Product Type
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {INDUSTRIES.map((s) => (
                    <button
                      key={s}
                      data-cursor="hover"
                      onClick={() => setIndustry(s)}
                      className={`rounded-md border px-3 py-2 font-mono text-xs transition-colors ${
                        industry === s
                          ? "border-accent bg-accent-dim text-accent"
                          : "border-border text-text-secondary hover:border-border-active"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                  Your Primary Need
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="font-mono text-[11px] text-text-secondary">
                    Speed to market
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    aria-label="Priority: speed versus investor-grade quality"
                    className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-accent"
                    style={{ accentColor: "#00E5FF" }}
                  />
                  <span className="font-mono text-[11px] text-text-secondary">
                    Investor-grade quality
                  </span>
                </div>
              </div>

              {/* Live output */}
              <div className="rounded-lg border border-border bg-void/60 p-5 font-mono text-sm">
                <Row k="RECOMMENDED" v={typedTier} accent />
                <Row k="ESTIMATED INVESTMENT" v={rec.invest} />
                <Row k="TIMELINE" v={rec.timeline} />
                <Row k="FIRST DELIVERABLE" v={rec.first} />
              </div>

              {/* CTA / generate */}
              {phase === "idle" && (
                <button
                  data-cursor="hover"
                  onClick={runGenerate}
                  className="w-full rounded-md border border-accent bg-accent-dim px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-[#00E5FF2e]"
                >
                  Generate my project brief →
                </button>
              )}

              {phase === "running" && (
                <div className="rounded-md border border-border bg-void/60 p-5">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                    <motion.div
                      className="h-full bg-accent"
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${(logLine / STEPS_LOG.length) * 100}%`,
                      }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>
                  <p className="mt-3 font-mono text-xs text-text-secondary">
                    {STEPS_LOG[Math.min(logLine, STEPS_LOG.length - 1)]}
                  </p>
                </div>
              )}

              <AnimatePresence>
                {phase === "done" && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="rounded-lg border border-border bg-void/60 p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                        Your brief
                      </p>
                      <p className="mt-3 text-[15px] leading-relaxed text-text-primary">
                        {typedBrief}
                        <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-accent align-middle" />
                      </p>
                    </div>

                    <div className="rounded-lg border border-border bg-void/60 p-5">
                      <p className="text-sm text-text-secondary">
                        Brief is ready. Book 30 min to review it with our
                        strategist.
                      </p>
                      {calendlyReady ? (
                        <iframe
                          src={embedUrl}
                          title="Schedule a call"
                          loading="lazy"
                          className="mt-4 h-[560px] w-full rounded-md bg-void"
                        />
                      ) : (
                        <a
                          href={`mailto:${siteConfig.email}?subject=Project%20brief%20review`}
                          data-cursor="hover"
                          className="mt-4 inline-flex rounded-md border border-accent bg-accent-dim px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-[#00E5FF2e]"
                        >
                          Send my brief →
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal.Item>
      </Reveal>
    </section>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-1">
      <span className="text-text-secondary">{k}</span>
      <span className={accent ? "text-accent" : "text-text-primary"}>{v}</span>
    </div>
  );
}
