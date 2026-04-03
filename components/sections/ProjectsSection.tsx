// components/sections/ProjectsSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ProjectsSectionProps {
  content: LocaleContent;
}

export function ProjectsSection({ content }: ProjectsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="projects" className="reveal grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionTitle badge={content.projects.badge} title={content.projects.title} />
      <div className="grid gap-4">
        {content.projects.cards.map((card) => (
          <article key={card.title} className="glass-card rounded-[2rem] p-7 sm:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  {card.period}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">{card.title}</h3>
              </div>
              {card.href ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit shrink-0 whitespace-nowrap rounded-full border border-slate-950 bg-slate-950 px-4 py-2 text-xs uppercase tracking-[0.24em] !text-white transition hover:bg-slate-900"
                >
                  {content.sidebar.projectLinkLabel}
                </a>
              ) : null}
            </div>
            <p className="mt-5 text-base leading-8 text-[var(--muted)] [text-align:justify]">
              {card.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {card.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-5 rounded-[1.3rem] border border-[var(--line)] bg-white/75 px-4 py-4 text-sm leading-7 text-slate-700 [text-align:justify]">
              {card.outcome}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
