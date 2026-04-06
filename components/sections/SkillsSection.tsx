// components/sections/SkillsSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SkillsSectionProps {
  content: LocaleContent;
}

export function SkillsSection({ content }: SkillsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="skills" className="reveal pt-8">
      <div className="glass-card rounded-[2rem] p-7 sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="font-[var(--font-serif)] text-3xl font-semibold text-slate-950">
            {content.skills.badge}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{content.skills.title}</p>
          <div className="accent-line mx-auto mt-4 h-px w-32" />
        </div>

        <div className="space-y-4">
          {content.skills.groups.map((group) => (
            <article
              key={group.title}
              className="rounded-[1.5rem] bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.09)] md:grid md:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] md:gap-6"
            >
              <h3 className="text-lg font-semibold text-slate-950">{group.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)] [text-align:justify] md:mt-0">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
