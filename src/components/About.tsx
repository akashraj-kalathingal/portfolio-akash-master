"use client";

import { Section, Reveal, GlassCard } from "./Primitives";
import { StatCell } from "./StatCell";
import { summary } from "@/content/data";
import { motion } from "framer-motion";

const arc = [
  { year: "2018", co: "CGI", note: "Software Engineer · ERP & events platform" },
  { year: "2019", co: "Target", note: "Joined orchestration platform team" },
  { year: "2022", co: "Target", note: "Promoted to Senior Software Engineer", highlight: true },
  { year: "2023", co: "Conestoga", note: "PG Cert — High Distinction · Dean's List" },
  { year: "2024", co: "Scotiabank", note: "ISO 20022 wire payment modernization lead", highlight: true },
  { year: "2025", co: "BMO", note: "Building AI-powered banking advisory", highlight: true },
];

export default function About() {
  return (
    <Section id="about" label="01 / About" title="A senior engineer who ships systems, not slides.">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 text-pretty text-lg leading-relaxed text-[var(--color-fg-muted)]">
          {summary.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}

          {/* Animated snapshot strip */}
          <Reveal delay={0.25}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-4">
              <StatCell label="Years building" value="6+" numericTo={6} suffix="+" />
              <StatCell label="Tier-1 banks" value="2" numericTo={2} />
              <StatCell label="Cloud platforms" value="AWS · Azure · GCP" />
              <StatCell label="Production scale" value="Billions $/day" />
            </div>
          </Reveal>
        </div>

        {/* Career arc */}
        <Reveal delay={0.15}>
          <GlassCard>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
              Career arc
            </div>
            <ol className="mt-5 space-y-5">
              {arc.map((a, i) => (
                <motion.li
                  key={a.year + a.co}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="grid grid-cols-[64px_1fr] gap-3"
                >
                  <div className="font-mono text-xs text-[var(--color-fg-subtle)]">{a.year}</div>
                  <div className="relative pl-5">
                    <span
                      className={`absolute left-0 top-1.5 inline-block h-2 w-2 rounded-full ${
                        a.highlight ? "bg-[var(--color-accent)]" : "bg-white/15"
                      }`}
                    />
                    {a.highlight && (
                      <span className="absolute left-[-2px] top-[2px] inline-block h-3 w-3 animate-ping rounded-full bg-[var(--color-accent)]/40" />
                    )}
                    <div className="text-sm font-medium text-white">{a.co}</div>
                    <div className="text-xs text-[var(--color-fg-muted)]">{a.note}</div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
