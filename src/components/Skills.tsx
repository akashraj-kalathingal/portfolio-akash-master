"use client";

import { Section, Reveal } from "./Primitives";
import { skills } from "@/content/data";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <Section id="skills" label="04 / Toolbox" title="Production-grade tools, not buzzword bingo.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.category} delay={i * 0.04}>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-md transition-colors hover:border-[var(--color-accent)]/40"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(125,211,192,0.10), transparent 70%)",
                }}
              />
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                {g.category}
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="font-mono rounded-md border border-white/[0.04] bg-white/[0.02] px-2 py-1 text-xs text-[var(--color-fg-muted)]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
