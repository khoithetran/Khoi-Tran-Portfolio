// components/Portfolio.tsx
"use client";

import { useState } from "react";
import { Locale, locales } from "@/data/locales";
import { NavHeader } from "@/components/ui/NavHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Chatbot } from "@/components/Chatbot";

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>("vi");
  const content = locales[locale];

  return (
    <main className="relative overflow-hidden">
      <div className="fine-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-[-10%] top-16 h-72 w-72 rounded-full bg-[var(--accent-soft)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-5%] top-[20rem] h-80 w-80 rounded-full bg-[rgba(0,130,246,0.08)] blur-3xl" />

      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-30 px-5 pt-4 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <NavHeader locale={locale} content={content} onLocaleChange={setLocale} />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-12 pt-24 sm:px-8 lg:px-10">
        <AboutSection content={content} />
        <SkillsSection content={content} />
        <ProjectsSection content={content} />
        <EducationSection content={content} />
        <ExperienceSection content={content} />
        <footer className="px-2 pb-3 pt-10 text-center text-sm font-bold text-[var(--muted)]">
          {content.footer}
        </footer>
      </div>

      <Chatbot locale={locale} />
    </main>
  );
}
