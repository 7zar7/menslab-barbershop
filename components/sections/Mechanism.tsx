"use client";

import GlassCard from "@/components/GlassCard";
import { Reveal } from "@/components/ScrollReveal";

const cards = [
  {
    metric: "2–5 days",
    label: "From brief to live site",
    body: "While agencies are scheduling kickoffs, your site is already indexed.",
  },
  {
    metric: "$40M+",
    label: "In M&A deals analyzed",
    body: "We understand cap tables, term sheets, and what investors actually look for on a site.",
  },
  {
    metric: "5.2×",
    label: "LTV:CAC ratio achieved",
    body: "243 leads in 90 days. Not a case study — a system we run, and teach our clients.",
  },
];

export default function Mechanism() {
  return (
    <section id="difference" className="relative px-6 py-32">
      <Reveal className="mx-auto max-w-5xl">
        <Reveal.Item as="p" className="section-label">
          The Difference
        </Reveal.Item>
        <Reveal.Item
          as="p"
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-text-secondary"
        >
          Most studios choose one: fast or strategic. Freelancers execute
          without thinking. Agencies think without shipping. We built a system
          that does both — because we&apos;ve been on your side of the table.
        </Reveal.Item>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <Reveal.Item key={c.metric}>
              <GlassCard className="h-full p-7">
                <p className="font-mono text-3xl font-semibold text-text-primary">
                  {c.metric}
                </p>
                <p className="mt-2 text-sm font-medium text-accent">
                  {c.label}
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-text-secondary">
                  {c.body}
                </p>
              </GlassCard>
            </Reveal.Item>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
