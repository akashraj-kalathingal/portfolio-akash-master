"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownToLine, Mail, Github, Linkedin } from "lucide-react";
import { profile, rotatingTitles, expertise } from "@/content/data";

// SSR-disable the 3D canvas. WebGL doesn't exist on the server.
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[var(--color-bg-deep)]" />,
});

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % rotatingTitles.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      {/* 3D scene fills the section */}
      <div className="absolute inset-0">
        <Scene3D />
      </div>

      {/* Vignette + radial glow over the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, transparent 0%, rgba(2,2,3,0.45) 60%, rgba(2,2,3,0.9) 100%)",
        }}
      />

      {/* Bottom fade so we transition cleanly into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--color-bg-deep)]"
      />

      {/* Foreground content */}
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-auto inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1 text-xs text-[var(--color-fg-muted)] backdrop-blur-md"
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)]/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </span>
          Open to senior / staff engineering roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mt-6 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          {profile.name.split(" ")[0]}
          <br />
          <span className="aurora-text">{profile.name.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 flex flex-wrap items-baseline gap-x-3 text-xl font-medium tracking-tight text-[var(--color-fg-muted)] sm:text-2xl"
        >
          <span>{profile.title} —</span>
          <span className="relative inline-block min-h-[1.4em] min-w-[14ch] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="inline-block text-[var(--color-accent)]"
              >
                {rotatingTitles[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-fg-muted)]"
        >
          {profile.tagline}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="pointer-events-auto mt-7 flex flex-wrap gap-2"
        >
          {expertise.slice(0, 6).map((e) => (
            <li
              key={e}
              className="font-mono rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-[var(--color-fg-muted)] backdrop-blur-md"
            >
              {e}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
          >
            <Mail className="h-4 w-4" />
            Get in touch
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-[var(--color-accent)]/60"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Download Resume
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[var(--color-fg-muted)] backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[var(--color-fg-muted)] backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="font-mono flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px bg-gradient-to-b from-[var(--color-fg-subtle)] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
