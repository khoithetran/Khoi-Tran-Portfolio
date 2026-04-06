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
              className="rounded-[1.5rem] bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.09)] md:grid md:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] md:gap-6"
            >
              <div>
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  {entry.organization}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">{entry.title}</h3>
                <span className="mt-3 inline-block rounded-full border border-[var(--line)] bg-slate-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
                  {entry.period}
                </span>
              </div>
              <div className="mt-4 space-y-3 md:mt-0">
                <p className="text-sm leading-7 text-[var(--muted)] [text-align:justify]">
                  {entry.summary}
                </p>
                <ul className="space-y-3">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-[1.3rem] border border-[var(--line)] bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700 [text-align:justify]"
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
