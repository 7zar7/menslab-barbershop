"use client";

import GlassCard from "@/components/GlassCard";
import { Reveal } from "@/components/ScrollReveal";

type Tier = {
  name: string;
  price: string;
  timeline: string;
  forWhom: string;
  deliverables: string[];
  payment?: string;
  cta: string;
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Launch Site",
    price: "€500–900",
    timeline: "3–7 days",
    forWhom:
      "Local businesses and early-stage products that need to exist online, cleanly.",
    deliverables: [
      "1–5 page site, Vercel deployed",
      "Mobile + SEO basics",
      "30 days of minor revisions",
    ],
    cta: "Start here →",
  },
  {
    name: "Launch Package",
    price: "$2,500–4,500",
    timeline: "5–10 days",
    forWhom:
      "Pre-seed founders preparing a raise, launch, or first enterprise sales call.",
    deliverables: [
      "Landing page (up to 6 sections, animations, mobile)",
      "Positioning doc — ICP, messaging hierarchy, value prop",
      "Hero copy + 3 email subject lines + LinkedIn post",
      "30-min strategy call included",
      "Handoff doc — edit it yourself without breaking it",
    ],
    payment: "50% upfront · 50% on delivery",
    cta: "This is what I need →",
    highlighted: true,
  },
  {
    name: "Strategy + Build",
    price: "$5,000–8,000",
    timeline: "10–14 days",
    forWhom:
      "Seed-stage teams entering new markets or preparing Series A materials.",
    deliverables: [
      "Everything in Launch Package",
      "Full GTM audit + competitive landscape",
      "Multi-page site or product landing",
      "Pipeline setup (email sequences, LinkedIn)",
    ],
    payment: "Milestone payments",
    cta: "Let's talk scope →",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-32">
      <Reveal className="mx-auto max-w-6xl">
        <Reveal.Item as="p" className="section-label">
          Engagements
        </Reveal.Item>
        <Reveal.Item
          as="p"
          className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-text-secondary"
        >
          Three ways to work with us. One of them is right for where you are
          today.
        </Reveal.Item>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <Reveal.Item key={t.name}>
              <GlassCard
                className={`flex h-full flex-col p-7 ${
                  t.highlighted
                    ? "border-accent lg:scale-[1.02] lg:shadow-[0_0_40px_-12px_rgba(0,229,255,0.35)]"
                    : ""
                }`}
              >
                {t.highlighted && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-void px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Most Requested
                  </span>
                )}
                <h3 className="text-xl font-bold tracking-tight text-text-primary">
                  {t.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-semibold text-text-primary">
                    {t.price}
                  </span>
                  <span className="font-mono text-xs text-text-secondary">
                    {t.timeline}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {t.forWhom}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {t.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 text-[15px] leading-snug text-text-primary"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
                {t.payment && (
                  <p className="mt-6 font-mono text-[11px] text-text-secondary">
                    {t.payment}
                  </p>
                )}
                <a
                  href="#configurator"
                  data-cursor="hover"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-md border px-5 py-3 text-sm font-medium transition-colors ${
                    t.highlighted
                      ? "border-accent bg-accent-dim text-accent hover:bg-[#00E5FF2e]"
                      : "border-border text-text-primary hover:border-border-active hover:text-accent"
                  }`}
                >
                  {t.cta}
                </a>
              </GlassCard>
            </Reveal.Item>
          ))}
        </div>

        <Reveal.Item
          as="p"
          className="mt-10 font-mono text-[11px] text-text-muted"
        >
          Most clients stay on after delivery — advisory retainer from $500/mo.
          Ask us how.
        </Reveal.Item>
      </Reveal>
    </section>
  );
}
