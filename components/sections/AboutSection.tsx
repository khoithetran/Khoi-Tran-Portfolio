// components/sections/AboutSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface AboutSectionProps {
  content: LocaleContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="about" className="reveal pt-8">
      <div className="glass-card rounded-[2rem] p-7 sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="font-[var(--font-serif)] text-3xl leading-tight font-semibold text-slate-950">
            {content.about.title}
          </h2>
          <div className="accent-line mx-auto mt-5 h-px w-32" />
        </div>
        <div className="rounded-[1.5rem] bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.09)]">
          <div className="space-y-5 text-base leading-8 text-[var(--muted)] [text-align:justify]">
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
