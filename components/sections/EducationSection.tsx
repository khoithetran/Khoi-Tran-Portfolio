// components/sections/EducationSection.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import ssrcPhoto from "@/data/image/2nd-SSRC.png";
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
          <article className="rounded-[1.5rem] bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.09)] flex flex-col gap-4 sm:flex-row sm:gap-5">
            {/* Timeline column */}
            <div className="hidden sm:flex w-36 shrink-0 flex-col items-center">
              <span className="font-[var(--font-mono)] text-base font-semibold text-slate-950 whitespace-nowrap">{edu.school.period}</span>
              <div className="mt-2 min-h-[2rem] w-0.5 flex-1 bg-slate-200" />
            </div>

            {/* Content column */}
            <div className="min-w-0 flex-1">
              {/* School */}
              <p className="sm:hidden font-[var(--font-mono)] text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 mb-1">
                {edu.school.period}
              </p>
              <h3 className="text-lg font-semibold text-slate-950">{edu.school.name}</h3>
              <p className="mt-1 font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                {edu.school.degree}
              </p>
              <ul className="mt-4 space-y-3 text-base leading-8 text-[var(--muted)]">
                {edu.school.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {/* Research — merged */}
              <div className="mt-5 border-t border-[var(--line)] pt-5 space-y-3">
                <h3 className="text-lg font-semibold text-slate-950">{edu.research.badge}</h3>
                <a
                  href={edu.research.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-base font-medium italic leading-snug text-slate-700 underline-offset-2 hover:underline hover:text-[var(--accent)] transition-colors"
                >
                  {edu.research.title}
                </a>
                <p className="rounded-[1.2rem] border border-[var(--line)] bg-[var(--accent-soft)] px-4 py-3 text-base leading-8 text-slate-800">
                  {edu.research.status}
                </p>
                <p className="text-base leading-8 text-[var(--muted)] [text-align:justify]">
                  {edu.research.abstract}
                </p>

                {/* Award image */}
                <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <div className="relative w-32 shrink-0 overflow-hidden rounded-xl border border-[var(--line)] shadow-sm">
                    <Image
                      src={ssrcPhoto}
                      alt={edu.research.awardCaption}
                      width={128}
                      height={160}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <p className="text-base leading-8 text-slate-600 italic">
                    {edu.research.awardCaption}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
