"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function StatCell({
  label,
  value,
  prefix,
  suffix,
  numericTo,
}: {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  /** If provided, render an animated number ramp instead of the static value. */
  numericTo?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!numericTo || !inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(numericTo * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numericTo]);

  return (
    <div ref={ref} className="bg-[var(--color-bg-deep)] p-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">
        {numericTo ? (
          <>
            {prefix ?? ""}
            {n}
            {suffix ?? ""}
          </>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
