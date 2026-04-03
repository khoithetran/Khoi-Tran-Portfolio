// components/sections/ResearchSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ResearchSectionProps {
  content: LocaleContent;
}

export function ResearchSection({ content }: ResearchSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="research" className="reveal grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionTitle badge={content.research.badge} title={content.research.title} />
      <div className="space-y-4">
        <article className="glass-card rounded-[2rem] p-7 sm:p-8">
          <p className="text-base leading-8 text-[var(--muted)] [text-align:justify]">
            {content.research.overview}
          </p>
          <div className="mt-6 space-y-4">
            {content.research.focusAreas.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-4 text-sm leading-7 text-slate-700 [text-align:justify]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="glass-card rounded-[2rem] p-7 sm:p-8">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            {content.research.publication.badge}
          </p>
          <h3 className="mt-4 text-2xl font-semibold text-slate-950">
            {content.research.publication.title}
          </h3>
          <p className="mt-4 rounded-[1.2rem] border border-[var(--line)] bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-slate-800 [text-align:justify]">
            {content.research.publication.status}
          </p>
          <p className="mt-5 text-base leading-8 text-[var(--muted)] [text-align:justify]">
            {content.research.publication.summary}
          </p>
          <ul className="mt-5 grid gap-3">
            {content.research.publication.highlights.map((item) => (
              <li
                key={item}
                className="rounded-[1.3rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm leading-7 text-slate-700 [text-align:justify]"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>

        <div className="grid gap-4 md:grid-cols-3">
          {content.research.metrics.map((metric) => (
            <article key={metric.label} className="glass-card rounded-[1.6rem] p-5">
              <p className="font-[var(--font-serif)] text-3xl font-semibold text-slate-950">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{metric.label}</p>
            </article>
          ))}
        </div>

        <article className="section-shell rounded-[2rem] p-6 text-sm leading-7 text-slate-700 [text-align:justify]">
          {content.research.note}
        </article>
      </div>
    </section>
  );
}
