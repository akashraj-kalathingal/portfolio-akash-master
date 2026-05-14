"use client";

import { Section, Reveal, GlassCard } from "./Primitives";
import { caseStudies } from "@/content/data";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const cs = caseStudies[active]!;

  return (
    <Section
      id="case-studies"
      label="03 / Case Studies"
      title="Three projects, written like engineering."
    >
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Tab rail */}
        <ol className="flex gap-2 overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2 backdrop-blur-md lg:flex-col lg:overflow-visible">
          {caseStudies.map((c, i) => {
            const isActive = i === active;
            return (
              <li key={c.slug} className="shrink-0 lg:shrink">
                <button
                  onClick={() => setActive(i)}
                  className={`relative w-full rounded-xl px-4 py-3 text-left transition-colors ${
                    isActive ? "text-white" : "text-[var(--color-fg-muted)] hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="cs-pill"
                      className="absolute inset-0 -z-10 rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
                    Project {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-0.5 text-sm font-medium">{c.title}</div>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Active study */}
        <Reveal key={active}>
          <GlassCard className="p-8">
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              {cs.subtitle}
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{cs.title}</h3>
            <p className="mt-4 text-pretty text-[var(--color-fg-muted)]">{cs.summary}</p>

            <div className="mt-7 rounded-xl border-l-2 border-[var(--color-accent)]/50 bg-black/30 px-5 py-4">
              <Label>The problem</Label>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">{cs.problem}</p>
            </div>

            <div className="mt-7">
              <Label>Approach</Label>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-fg-muted)]">
                {cs.approach.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono mt-0.5 inline-block text-xs text-[var(--color-accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <Label>Impact</Label>
              <ul className="mt-3 space-y-2 text-sm text-white">
                {cs.impact.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span className="leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 border-t border-white/[0.06] pt-5">
              <Label>Stack</Label>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cs.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-xs text-[var(--color-fg-muted)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
      {children}
    </div>
  );
}
