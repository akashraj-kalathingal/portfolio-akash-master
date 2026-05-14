"use client";

import { Section, Reveal, GlassCard } from "./Primitives";
import { education, awards, profile } from "@/content/data";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
      <Section id="education" label="07 / Education & Recognition" title="The credentials behind the work.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Education
              </div>
              <ul className="mt-5 space-y-5">
                {education.map((e) => (
                  <li key={e.school}>
                    <div className="text-sm font-semibold text-white">{e.school}</div>
                    <div className="mt-0.5 text-sm text-[var(--color-fg-muted)]">{e.degree}</div>
                    <div className="font-mono mt-1 text-xs text-[var(--color-fg-subtle)]">
                      {e.when}
                      {e.note ? ` · ${e.note}` : ""}
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.05}>
            <GlassCard>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Awards & Recognition
              </div>
              <ul className="mt-5 space-y-3">
                {awards.map((a) => (
                  <li key={a} className="flex gap-3 text-sm text-[var(--color-fg-muted)]">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section id="contact" label="08 / Contact" title="Let's talk.">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <GlassCard className="p-8">
              <p className="text-pretty text-lg leading-relaxed text-[var(--color-fg-muted)]">
                I'm open to senior and staff engineering conversations at companies building
                serious distributed systems, AI platforms, or fintech infrastructure. Toronto
                or remote. The fastest way to reach me is email.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <ContactRow icon={<Mail className="h-4 w-4" />} href={`mailto:${profile.email}`} label={profile.email} />
                <ContactRow icon={<MapPin className="h-4 w-4" />} label={profile.location} />
                <ContactRow icon={<Github className="h-4 w-4" />} href={profile.github} label="GitHub" external />
                <ContactRow icon={<Linkedin className="h-4 w-4" />} href={profile.linkedin} label="LinkedIn" external />
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.05}>
            <GlassCard className="p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
                Currently
              </div>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--color-fg-muted)]">
                Senior Software Engineer at BMO, building AI-powered banking. Available for new
                conversations starting Q3 2026.
              </p>
              <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
                Strongest signals for
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-fg-muted)]">
                <li>· Backend & platform engineering</li>
                <li>· Distributed systems & infra</li>
                <li>· Fintech / payments infrastructure</li>
                <li>· AI / LLM platform teams</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>

        <div className="mt-20 border-t border-white/[0.06] pt-8">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--color-fg-subtle)]">
            <div>
              © {new Date().getFullYear()} {profile.name}. Built with Next.js, Three.js, Framer
              Motion.
            </div>
            <a href="#top" className="transition-colors hover:text-white">
              Back to top ↑
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-white">
      <span className="text-[var(--color-accent)]">{icon}</span>
      <span>{label}</span>
    </div>
  );
  if (!href) return inner;
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      {inner}
    </a>
  );
}
