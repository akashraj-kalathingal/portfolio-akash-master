"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-20 bg-[var(--color-bg-deep)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader label={label} title={title} />
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[var(--color-accent)]/40" />
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {label}
        </span>
      </div>
      <h2 className="text-pretty text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-md ${className}`}
    >
      {/* subtle inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 0% 0%, rgba(125,211,192,0.06), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
