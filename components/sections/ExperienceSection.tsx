// components/sections/ExperienceSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ExperienceSectionProps {
  content: LocaleContent;
}

export function ExperienceSection({ content }: ExperienceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const exp = content.experience;

  return (
    <section ref={ref} id="experience" className="reveal pt-8">
      <div className="glass-card rounded-[2rem] p-7 sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="font-[var(--font-serif)] text-3xl font-semibold text-slate-950">
            {exp.badge}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{exp.title}</p>
          <div className="accent-line mx-auto mt-4 h-px w-32" />
        </div>

        <div className="space-y-4">
          {exp.entries.map((entry) => (
            <article
              key={entry.title}
              className="rounded-[1.5rem] bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.09)] flex gap-5"
            >
              {/* Timeline column */}
              <div className="flex w-36 shrink-0 flex-col items-center">
                <span className="font-[var(--font-mono)] text-base font-semibold text-slate-950 whitespace-nowrap">{entry.period}</span>
                <div className="mt-2 min-h-[2rem] w-0.5 flex-1 bg-slate-200" />
              </div>
              {/* Content column */}
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-slate-950">{entry.organization}</h3>
                <p className="mt-1 font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  {entry.title}
                </p>
                <p className="mt-3 text-base leading-8 text-[var(--muted)] [text-align:justify]">
                  {entry.summary}
                </p>
                <ul className="mt-3 space-y-3">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-[1.3rem] border border-[var(--line)] bg-slate-50 px-4 py-3 text-base leading-8 text-slate-700 [text-align:justify]"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
