// components/sections/SkillsSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SkillsSectionProps {
  content: LocaleContent;
}

export function SkillsSection({ content }: SkillsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="skills" className="reveal grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionTitle badge={content.skills.badge} title={content.skills.title} />
      <div className="grid gap-4">
        {content.skills.groups.map((group) => (
          <article
            key={group.title}
            className="glass-card rounded-[2rem] p-6 md:grid md:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] md:gap-6"
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
    </section>
  );
}
