// components/sections/ExperienceSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ExperienceSectionProps {
  content: LocaleContent;
}

export function ExperienceSection({ content }: ExperienceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="experience" className="reveal grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionTitle badge={content.experience.badge} title={content.experience.title} />
      <div className="space-y-4">
        {content.experience.entries.map((entry) => (
          <article key={entry.title} className="glass-card rounded-[2rem] p-7 sm:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  {entry.organization}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                  {entry.title}
                </h3>
              </div>
              <span className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-600">
                {entry.period}
              </span>
            </div>
            <p className="mt-5 text-base leading-8 text-[var(--muted)] [text-align:justify]">
              {entry.summary}
            </p>
            <ul className="mt-5 grid gap-3">
              {entry.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-[1.3rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm leading-7 text-slate-700 [text-align:justify]"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
