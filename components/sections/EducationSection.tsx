// components/sections/EducationSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface EducationSectionProps {
  content: LocaleContent;
}

export function EducationSection({ content }: EducationSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const edu = content.education;

  return (
    <section ref={ref} id="education" className="reveal pt-8">
      <div className="glass-card rounded-[2rem] p-7 sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="font-[var(--font-serif)] text-3xl font-semibold text-slate-950">
            {edu.badge}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{edu.title}</p>
          <div className="accent-line mx-auto mt-4 h-px w-32" />
        </div>

        <div className="space-y-4">
          {/* School card */}
          <article className="rounded-[1.5rem] bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.09)] md:grid md:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] md:gap-6">
            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                {edu.school.degree}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">{edu.school.name}</h3>
              <span className="mt-3 inline-block rounded-full border border-[var(--line)] bg-slate-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
                {edu.school.period}
              </span>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)] md:mt-0">
              {edu.school.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          {/* Research paper card */}
          <article className="rounded-[1.5rem] bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.09)] md:grid md:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] md:gap-6">
            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                {edu.research.badge}
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-950">
                {edu.research.title}
              </h3>
            </div>
            <div className="mt-4 space-y-3 md:mt-0">
              <p className="rounded-[1.2rem] border border-[var(--line)] bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-slate-800">
                {edu.research.status}
              </p>
              <ul className="space-y-3 text-sm leading-7 text-[var(--muted)]">
                {edu.research.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
