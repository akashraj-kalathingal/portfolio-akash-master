"use client";

import { Section, Reveal, GlassCard } from "./Primitives";
import { motion } from "framer-motion";
import { useState } from "react";

type View = "ai" | "payments" | "orchestration";

const views: { id: View; label: string; subtitle: string }[] = [
  { id: "ai", label: "AI Banking Chatbot", subtitle: "BMO · LLM agent with MCP tools" },
  { id: "payments", label: "ISO 20022 Wire Payments", subtitle: "Scotiabank · Cross-border SWIFT" },
  { id: "orchestration", label: "Patroller Job Recovery", subtitle: "Target · Self-healing workflows" },
];

export default function SystemDesign() {
  const [view, setView] = useState<View>("ai");

  return (
    <Section
      id="system-design"
      label="05 / System Design"
      title="Architecture, drawn from production."
    >
      <p className="mb-10 max-w-2xl text-pretty text-[var(--color-fg-muted)]">
        Three architectures I've shipped — abstracted enough to share, specific enough to talk
        about. Hover the diagram to read it. Click between systems to switch.
      </p>

      <div className="flex flex-wrap gap-2 pb-6">
        {views.map((v) => {
          const active = v.id === view;
          return (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                active ? "text-white" : "text-[var(--color-fg-muted)] hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="sd-pill"
                  className="absolute inset-0 -z-10 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.08]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {v.label}
            </button>
          );
        })}
      </div>

      <Reveal>
        <GlassCard className="p-6 sm:p-10">
          <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
            {views.find((v) => v.id === view)?.subtitle}
          </div>

          <div className="mt-6 overflow-x-auto">
            {view === "ai" && <AiDiagram />}
            {view === "payments" && <PaymentsDiagram />}
            {view === "orchestration" && <OrchestrationDiagram />}
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Diagrams                                                                   */
/* -------------------------------------------------------------------------- */

const stroke = "#7dd3c0";
const dim = "rgba(125,211,192,0.25)";
const labelFill = "#ededf0";
const subFill = "#8a8a96";

/** Animated dashed line that "flows" — used for data movement. */
function FlowLine({
  d,
  delay = 0,
  reverse = false,
}: {
  d: string;
  delay?: number;
  reverse?: boolean;
}) {
  return (
    <>
      {/* base */}
      <path d={d} stroke={dim} strokeWidth={1} fill="none" />
      {/* flow */}
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth={1.2}
        fill="none"
        strokeDasharray="6 12"
        animate={{ strokeDashoffset: reverse ? [0, 18] : [0, -18] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay }}
      />
    </>
  );
}

function Box({
  x,
  y,
  w = 140,
  h = 56,
  title,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={accent ? "rgba(125,211,192,0.10)" : "rgba(255,255,255,0.025)"}
        stroke={accent ? "rgba(125,211,192,0.55)" : "rgba(255,255,255,0.10)"}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={labelFill}
        fontFamily="Inter, sans-serif"
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontSize={10}
          fill={subFill}
          fontFamily="JetBrains Mono, monospace"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function AiDiagram() {
  return (
    <svg viewBox="0 0 900 360" className="w-full" role="img" aria-label="AI banking chatbot architecture">
      <defs>
        <linearGradient id="bgGradAi" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(125,211,192,0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="900" height="360" fill="url(#bgGradAi)" />

      {/* User */}
      <Box x={20} y={150} title="Retail Investor" sub="Customer" />
      {/* AI Chatbot */}
      <Box x={210} y={150} title="LLM Agent" sub="Claude / GPT" accent />
      {/* MCP Server */}
      <Box x={400} y={150} title="MCP Server" sub="Java + Spring Boot" accent />
      {/* Vault */}
      <Box x={590} y={40} title="HashiCorp Vault" sub="per-user creds" />
      {/* Banking APIs */}
      <Box x={590} y={150} title="Banking APIs" sub="accounts / positions" />
      {/* Vector store */}
      <Box x={590} y={260} title="Vector Store" sub="Kedro + Doc Intel" />
      {/* Audit */}
      <Box x={780} y={150} w={100} title="Audit" sub="compliance" />

      {/* Flows */}
      <FlowLine d="M 160 178 L 210 178" />
      <FlowLine d="M 350 178 L 400 178" delay={0.2} />
      <FlowLine d="M 540 178 L 590 178" delay={0.4} />
      {/* Vault auth */}
      <FlowLine d="M 470 150 C 470 80, 540 60, 590 68" delay={0.5} reverse />
      {/* RAG */}
      <FlowLine d="M 470 206 C 470 270, 540 285, 590 288" delay={0.6} />
      {/* Audit */}
      <FlowLine d="M 730 178 L 780 178" delay={0.7} />

      {/* Annotations */}
      <text x="280" y="140" fontSize="10" fill={subFill} fontFamily="JetBrains Mono, monospace">
        tools/call
      </text>
      <text x="510" y="80" fontSize="10" fill={subFill} fontFamily="JetBrains Mono, monospace">
        token exchange
      </text>
      <text x="510" y="270" fontSize="10" fill={subFill} fontFamily="JetBrains Mono, monospace">
        RAG retrieve
      </text>
    </svg>
  );
}

function PaymentsDiagram() {
  return (
    <svg viewBox="0 0 900 360" className="w-full" role="img" aria-label="ISO 20022 wire payments architecture">
      <defs>
        <linearGradient id="bgGradPay" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(125,211,192,0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="900" height="360" fill="url(#bgGradPay)" />

      <Box x={20} y={150} title="Originating Bank" sub="Operator UI" />
      <Box x={210} y={60} title="Fraud Engine" sub="real-time score" />
      <Box x={210} y={150} title="Payment Hub" sub="IBM FTM" accent />
      <Box x={210} y={240} title="FX Engine" sub="conversion" />
      <Box x={400} y={150} title="ISO 20022 Builder" sub="MX / pacs.008" accent />
      <Box x={590} y={150} title="SWIFT Gateway" sub="FINplus" accent />
      <Box x={780} y={60} w={100} title="Sanctions" sub="screening" />
      <Box x={780} y={150} w={100} title="Beneficiary" sub="Receiver bank" />
      <Box x={780} y={240} w={100} title="Charges" sub="posting" />

      {/* hub fan-in */}
      <FlowLine d="M 160 178 L 210 178" />
      <FlowLine d="M 280 150 C 280 110, 280 90, 280 88" delay={0.2} reverse />
      <FlowLine d="M 280 206 C 280 230, 280 248, 280 250" delay={0.3} />

      {/* hub to builder */}
      <FlowLine d="M 350 178 L 400 178" delay={0.4} />
      <FlowLine d="M 540 178 L 590 178" delay={0.5} />

      {/* swift to outputs */}
      <FlowLine d="M 660 150 C 660 110, 740 80, 780 80" delay={0.6} />
      <FlowLine d="M 730 178 L 780 178" delay={0.7} />
      <FlowLine d="M 660 206 C 660 240, 740 260, 780 260" delay={0.8} />

      <text x="460" y="140" fontSize="10" fill={subFill} fontFamily="JetBrains Mono, monospace">
        MX serialize
      </text>
      <text x="610" y="140" fontSize="10" fill={subFill} fontFamily="JetBrains Mono, monospace">
        send
      </text>
    </svg>
  );
}

function OrchestrationDiagram() {
  return (
    <svg viewBox="0 0 900 360" className="w-full" role="img" aria-label="Patroller orchestration architecture">
      <defs>
        <linearGradient id="bgGradOrc" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(125,211,192,0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="900" height="360" fill="url(#bgGradOrc)" />

      <Box x={20} y={150} title="Scheduler" sub="cron / triggers" />
      <Box x={210} y={60} title="Worker Pool A" sub="Spark / Hive" />
      <Box x={210} y={150} title="Worker Pool B" sub="ETL adapters" />
      <Box x={210} y={240} title="Worker Pool C" sub="custom jobs" />
      <Box x={400} y={150} title="Patroller" sub="self-healing" accent />
      <Box x={590} y={60} title="Retry Queue" sub="backoff" />
      <Box x={590} y={150} title="Druid" sub="metrics store" accent />
      <Box x={590} y={240} title="Dead Letter" sub="manual triage" />
      <Box x={780} y={150} w={100} title="Grafana" sub="dashboards" />

      <FlowLine d="M 160 178 C 180 130, 200 100, 210 88" />
      <FlowLine d="M 160 178 L 210 178" delay={0.1} />
      <FlowLine d="M 160 178 C 180 220, 200 250, 210 260" delay={0.2} />

      <FlowLine d="M 350 88 C 370 100, 390 140, 400 168" delay={0.3} />
      <FlowLine d="M 350 178 L 400 178" delay={0.35} />
      <FlowLine d="M 350 260 C 370 240, 390 210, 400 188" delay={0.4} />

      <FlowLine d="M 470 150 C 480 110, 540 80, 590 88" delay={0.5} reverse />
      <FlowLine d="M 470 178 L 590 178" delay={0.55} />
      <FlowLine d="M 470 206 C 480 240, 540 260, 590 260" delay={0.6} />

      <FlowLine d="M 730 178 L 780 178" delay={0.7} />
    </svg>
  );
}
