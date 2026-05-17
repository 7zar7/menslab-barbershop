"use client";

import { Reveal } from "@/components/ScrollReveal";

const qa = [
  {
    q: "Are you a real agency or just one person?",
    a: "We're a studio with a defined process, a creative director, and a production system. What matters: your deliverable is reviewed by multiple eyes before it reaches you.",
  },
  {
    q: "Can I get this cheaper on Upwork?",
    a: "Yes. You'll get a site. You won't get an ICP definition, a messaging hierarchy, or someone who's read your competitor's 10-K. That's the difference.",
  },
  {
    q: "How do I know the strategy advice is solid?",
    a: "We've analyzed $40M+ in cross-border M&A deals and built a company through to exit. We've been where you are.",
  },
  {
    q: "What if I need changes after delivery?",
    a: "30 days of revisions included. After that — maintenance retainer from €200/mo, or we hand you a doc and you edit it yourself.",
  },
];

export default function Objections() {
  return (
    <section className="relative px-6 py-32">
      <Reveal className="mx-auto max-w-3xl">
        <Reveal.Item as="p" className="section-label">
          Common Questions
        </Reveal.Item>

        <div className="mt-12">
          {qa.map((item, i) => (
            <Reveal.Item key={item.q}>
              <div
                className={`py-8 ${
                  i !== 0 ? "border-t border-border" : ""
                }`}
              >
                <p className="text-[15px] text-text-secondary">{item.q}</p>
                <p className="mt-3 text-lg leading-relaxed text-text-primary">
                  {item.a}
                </p>
              </div>
            </Reveal.Item>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
