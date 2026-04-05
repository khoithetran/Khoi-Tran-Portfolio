// components/sections/EducationSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface EducationSectionProps {
  content: LocaleContent;
}

export function EducationSection({ content }: EducationSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const edu = content.education;

  return (
    <section ref={ref} id="education" className="reveal grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionTitle badge={edu.badge} title={edu.title} />

      <div className="space-y-4">
        {/* School & certificates card */}
        <article className="glass-card rounded-[2rem] p-7 sm:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                {edu.school.degree}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                {edu.school.name}
              </h3>
            </div>
            <span className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-600 shrink-0">
              {edu.school.period}
            </span>
          </div>
          <ul className="mt-5 grid gap-3">
            {edu.school.highlights.map((item) => (
              <li
                key={item}
                className="rounded-[1.3rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm leading-7 text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>

        {/* Research paper card */}
        <article className="glass-card rounded-[2rem] p-7 sm:p-8">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            {edu.research.badge}
          </p>
          <h3 className="mt-4 text-xl font-semibold leading-snug text-slate-950">
            {edu.research.title}
          </h3>
          <p className="mt-4 rounded-[1.2rem] border border-[var(--line)] bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-slate-800">
            {edu.research.status}
          </p>
          <ul className="mt-5 grid gap-3">
            {edu.research.highlights.map((item) => (
              <li
                key={item}
                className="rounded-[1.3rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm leading-7 text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
