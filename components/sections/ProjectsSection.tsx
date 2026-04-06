// components/sections/ProjectsSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ProjectsSectionProps {
  content: LocaleContent;
}


export function ProjectsSection({ content }: ProjectsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="projects" className="reveal pt-8">
      <div className="glass-card rounded-[2rem] p-7 sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="font-[var(--font-serif)] text-3xl font-semibold text-slate-950">
            {content.projects.badge}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{content.projects.title}</p>
          <div className="accent-line mx-auto mt-4 h-px w-32" />
        </div>

        <div className="space-y-4">
          {content.projects.cards.map((card, index) => {
            const isDateRight = index % 2 === 1;

            return (
              <article
                key={card.title}
                className={`rounded-[1.5rem] bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.09)] flex gap-5 ${isDateRight ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Timeline column */}
                <div className="flex w-36 shrink-0 flex-col items-center">
                  <span className="font-[var(--font-mono)] text-sm font-semibold text-slate-950 whitespace-nowrap">{card.period}</span>
                  <div className="mt-2 min-h-[2rem] w-px flex-1 bg-slate-200" />
                </div>

                {/* Content column */}
                <div className="min-w-0 flex-1">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-950">{card.title}</h3>
                    {card.href && (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noreferrer"
                        className="proj-link-btn inline-flex shrink-0 rounded-full border border-slate-950 bg-slate-950 px-4 py-2 text-xs uppercase tracking-[0.22em] !text-white"
                      >
                        GitHub
                      </a>
                    )}
                    {card.hrefHuggingFace && (
                      <a
                        href={card.hrefHuggingFace}
                        target="_blank"
                        rel="noreferrer"
                        className="proj-link-btn inline-flex shrink-0 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-xs uppercase tracking-[0.22em] !text-white"
                      >
                        HuggingFace
                      </a>
                    )}
                  </div>
                  <p className="text-sm leading-7 text-[var(--muted)] [text-align:justify]">
                    {card.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 rounded-[1.3rem] border border-[var(--line)] bg-white/75 px-4 py-4 text-sm leading-7 text-slate-700 [text-align:justify]">
                    {card.outcome}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
