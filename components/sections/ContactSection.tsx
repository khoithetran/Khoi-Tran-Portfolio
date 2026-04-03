// components/sections/ContactSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ContactSectionProps {
  content: LocaleContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="contact" className="reveal grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionTitle badge={content.contact.badge} title={content.contact.title} />
      <article className="glass-card rounded-[2rem] p-7 sm:p-8">
        <p className="max-w-2xl text-base leading-8 text-[var(--muted)] [text-align:justify]">
          {content.contact.description}
        </p>
        <div className="mt-6 grid max-w-xl gap-4 grid-cols-1">
          {content.contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-[1.6rem] border border-[var(--line)] bg-white/85 p-5 transition hover:-translate-y-0.5 hover:bg-white"
            >
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                {link.label}
              </p>
              <p className="mt-3 text-base font-medium text-slate-900">{link.value}</p>
            </a>
          ))}
        </div>
      </article>
    </section>
  );
}
