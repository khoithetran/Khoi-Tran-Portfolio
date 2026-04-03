// components/sections/AboutSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface AboutSectionProps {
  content: LocaleContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="about" className="reveal grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionTitle badge={content.about.badge} title={content.about.title} />
      <div className="glass-card rounded-[2rem] p-7 sm:p-8">
        <div className="space-y-5 text-base leading-8 text-[var(--muted)] [text-align:justify]">
          {content.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
