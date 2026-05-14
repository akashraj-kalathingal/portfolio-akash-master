"use client";

import { Section, Reveal } from "./Primitives";
import { experience } from "@/content/data";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";

export default function Experience() {
  return (
    <Section id="experience" label="02 / Experience" title="Where I've shipped — and what shipped.">
      <ol className="relative space-y-8 border-l border-white/[0.08] pl-8 sm:pl-12">
        {experience.map((role, i) => (
          <Reveal key={role.company} delay={i * 0.06}>
            <RoleTiltCard role={role} index={i} defaultOpen={i === 0} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function RoleTiltCard({
  role,
  index,
  defaultOpen,
}: {
  role: (typeof experience)[number];
  index: number;
  defaultOpen?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(!!defaultOpen);

  // Tilt via motion values for smooth, GPU-friendly transforms
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rxSpring = useSpring(rx, { stiffness: 180, damping: 18 });
  const rySpring = useSpring(ry, { stiffness: 180, damping: 18 });
  const transform = useTransform(
    [rxSpring, rySpring],
    ([x, y]) => `perspective(1100px) rotateX(${x}deg) rotateY(${y}deg)`,
  );

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Subtle: max ~4 degrees
    ry.set(px * 4);
    rx.set(-py * 4);
  }
  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <li className="relative">
      {/* Glowing connector dot */}
      <span className="absolute -left-[37px] top-3 h-3 w-3 rounded-full border-2 border-[var(--color-bg-deep)] bg-[var(--color-accent)] sm:-left-[49px]" />
      <span className="absolute -left-[40px] top-2 h-5 w-5 rounded-full bg-[var(--color-accent)]/30 blur-sm sm:-left-[52px]" />

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transform, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-md transition-colors hover:border-[var(--color-accent)]/30"
      >
        {/* gradient sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 0% 0%, rgba(125,211,192,0.07), transparent 60%)",
          }}
        />

        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-lg font-semibold text-white">{role.company}</div>
            <div className="text-sm text-[var(--color-fg-muted)]">{role.role}</div>
          </div>
          <div className="font-mono text-xs text-[var(--color-fg-subtle)]">
            {role.start} → {role.end} · {role.location}
          </div>
        </div>

        <p className="mt-3 text-pretty text-[var(--color-fg-muted)]">{role.blurb}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {role.scale.map((s) => (
            <div
              key={s.label}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
                {s.label}:
              </span>{" "}
              <span className="text-xs font-medium text-white">{s.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-white"
          aria-expanded={open}
        >
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          {open ? "Hide details" : "Show details"}
        </button>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="overflow-hidden"
        >
          <ul className="mt-5 space-y-2 text-sm text-[var(--color-fg-muted)]">
            {role.highlights.map((h, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {role.stack.map((s) => (
              <span
                key={s}
                className="font-mono rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] text-[var(--color-fg-muted)]"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </li>
  );
}
