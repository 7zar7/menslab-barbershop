"use client";

import GlassCard from "@/components/GlassCard";
import { Reveal } from "@/components/ScrollReveal";

type Case = {
  tags: [string, string];
  title: string;
  outcome: string;
  body: string;
  footer: string;
  href?: string;
};

const cases: Case[] = [
  {
    tags: ["DATING TECH", "COMPETITIVE INTEL"],
    title: "Match Group — Strategic Analysis",
    outcome: "$12.85M expansion opportunity identified",
    body: "Full 10-K analysis across 9-brand portfolio. 4 actionable growth vectors delivered to stakeholders.",
    footer: "Presented to internal stakeholders · Scope anonymized per NDA",
  },
  {
    tags: ["LGBTQ+ TECH", "AD MONETIZATION"],
    title: "SPARK — Revenue Architecture",
    outcome: "$3.48M annual revenue model",
    body: "Zero to full ad infrastructure strategy. CPM modelling, 3-phase rollout, GDPR compliance framework.",
    footer: "Approved by C-suite panel · Company name anonymized",
  },
  {
    tags: ["CONSUMER FASHION", "MARKET RESEARCH"],
    title: "US Personal Styling — $1.46B Analysis",
    outcome: "CEO + 2 directors approved",
    body: "Bottom-up market sizing from verified revenues. Diagnosed 14–35× conversion gap vs. benchmark.",
    footer:
      "Strategic hiring deliverable · Role redirected post-approval (unrelated to quality)",
  },
  {
    tags: ["LOCAL BUSINESS", "BARCELONA"],
    title: "MensLab Barbershop — Full Site",
    outcome: "Live in 3 days · Booking integrated",
    body: "End-to-end: design, copy, booking system, SEO setup. Owner's first digital presence.",
    footer: "Named client · Available for reference",
    href: "https://menslab-barbershop-wedq.vercel.app/",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="relative px-6 py-32">
      <Reveal className="mx-auto max-w-6xl">
        <Reveal.Item as="p" className="section-label">
          Selected Work
        </Reveal.Item>
        <Reveal.Item
          as="p"
          className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-text-secondary"
        >
          Strategic deliverables and live products. Numbers first — aesthetics
          second.
        </Reveal.Item>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {cases.map((c) => {
            const inner = (
              <GlassCard className="h-full p-7 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgba(0,229,255,0.3)]">
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-border px-2 py-0.5 font-mono text-[10px] tracking-wide text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-text-primary">
                  {c.title}
                </h3>
                <p className="mt-3 font-mono text-sm text-accent">
                  {c.outcome}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
                  {c.body}
                </p>
                <p className="mt-6 font-mono text-[11px] text-text-muted">
                  {c.footer}
                </p>
              </GlassCard>
            );
            return (
              <Reveal.Item key={c.title}>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="block h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal.Item>
            );
          })}
        </div>

        <Reveal.Item
          as="p"
          className="mt-10 font-mono text-[11px] text-text-muted"
        >
          + ClearSign (LegalTech SaaS) — positioning + landing page built as
          methodology demonstration
        </Reveal.Item>
      </Reveal>
    </section>
  );
}
