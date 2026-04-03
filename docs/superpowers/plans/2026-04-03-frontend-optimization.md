# Frontend Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Decompose Portfolio.tsx into focused section components, add a CV download button, scroll-triggered animations with active nav, mobile hamburger menu, and locale-aware chatbot.

**Architecture:** `Portfolio.tsx` becomes a thin orchestrator that imports seven section components (`components/sections/`) and two UI components (`components/ui/`). A custom `useScrollReveal` hook drives `IntersectionObserver`-based animations. `Chatbot` receives a `locale` prop and reads translated strings from `locales.ts`.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS, TypeScript — no new dependencies.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `components/ui/SectionTitle.tsx` | Shared badge + h2 heading |
| Create | `components/ui/NavHeader.tsx` | Sticky header: avatar, nav, CV button, locale switcher, scroll spy, hamburger |
| Create | `components/sections/HeroSection.tsx` | Hero text, metric cards, sidebar |
| Create | `components/sections/AboutSection.tsx` | About paragraphs |
| Create | `components/sections/ResearchSection.tsx` | Research overview, publication, metrics, note |
| Create | `components/sections/ExperienceSection.tsx` | Experience entries |
| Create | `components/sections/ProjectsSection.tsx` | Project cards |
| Create | `components/sections/SkillsSection.tsx` | Skills groups |
| Create | `components/sections/ContactSection.tsx` | Contact links |
| Create | `hooks/useScrollReveal.ts` | IntersectionObserver reveal hook |
| Modify | `components/Portfolio.tsx` | Thin orchestrator |
| Modify | `app/page.tsx` | Remove standalone `<Chatbot />` |
| Modify | `components/Chatbot.tsx` | Accept `locale` prop |
| Modify | `data/locales.ts` | Add `chatbot` type + `ChatbotContent` type |
| Modify | `data/portfolio-content.json` | Add `chatbot` key to `en` and `vi` |
| Modify | `app/globals.css` | Add `.reveal` transition classes |
| Add | `public/cv.pdf` | Placeholder (user provides real file) |

---

## Task 1: Extract SectionTitle component

**Files:**
- Create: `components/ui/SectionTitle.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ui/SectionTitle.tsx
interface SectionTitleProps {
  badge: string;
  title: string;
}

export function SectionTitle({ badge, title }: SectionTitleProps) {
  return (
    <div className="section-shell rounded-[2rem] p-7 sm:p-8">
      <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
        {badge}
      </p>
      <h2 className="mt-4 font-[var(--font-serif)] text-3xl leading-tight font-semibold text-slate-950">
        {title}
      </h2>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd D:/CV/Introduction
npx tsc --noEmit
```
Expected: no errors related to `SectionTitle.tsx`.

---

## Task 2: Create NavHeader component

**Files:**
- Create: `components/ui/NavHeader.tsx`

NavHeader owns: avatar, nav links with active-section highlight (scroll spy), CV download button, locale switcher. Hamburger menu is added in Task 9.

- [ ] **Step 1: Create the file**

```tsx
// components/ui/NavHeader.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import gradPhoto from "../../anh_the_tot_nghiep.jpg";
import { Locale, LocaleContent, locales } from "@/data/locales";

const localeOrder: Locale[] = ["en", "vi"];

interface NavHeaderProps {
  locale: Locale;
  content: LocaleContent;
  onLocaleChange: (locale: Locale) => void;
}

export function NavHeader({ locale, content, onLocaleChange }: NavHeaderProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="glass-card fade-up sticky top-4 z-30 rounded-full px-4 py-3 sm:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Identity */}
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[var(--line)] bg-white/85">
            <Image
              src={gradPhoto}
              alt="Tran The Khoi graduation portrait"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Tran The Khoi</p>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              AI Product Developer
            </p>
          </div>
        </div>

        {/* Nav + controls */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <nav className="flex flex-wrap gap-2 text-sm text-slate-700">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 transition ${
                  activeSection === item.href.slice(1)
                    ? "bg-white text-slate-950 shadow-sm"
                    : "hover:bg-white hover:text-slate-950"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* CV Download */}
            <a
              href="/cv.pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-950 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-900"
            >
              ↓ CV
            </a>

            {/* Language switcher */}
            <div
              className="inline-flex rounded-full border border-[var(--line)] bg-white/90 p-1"
              aria-label="Language switcher"
            >
              {localeOrder.map((item) => {
                const isActive = item === locale;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={locales[item].switchLabel}
                    onClick={() => onLocaleChange(item)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-slate-950 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    {locales[item].languageLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Add CV placeholder to public/**

Create an empty file at `public/cv.pdf` so the link doesn't 404. Replace with the real PDF later.

```bash
echo "" > "D:/CV/Introduction/public/cv.pdf"
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors.

---

## Task 3: Create HeroSection

**Files:**
- Create: `components/sections/HeroSection.tsx`

This section renders the hero text + CTA buttons, metric cards, and the snapshot/focus sidebar. It has no `id` attribute (no scroll spy needed for hero).

- [ ] **Step 1: Create the file**

```tsx
// components/sections/HeroSection.tsx
import { LocaleContent } from "@/data/locales";

interface HeroSectionProps {
  content: LocaleContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="grid flex-1 items-start gap-8 pt-10 lg:grid-cols-[1.3fr_0.9fr] lg:pt-16">
      {/* Left column */}
      <div className="space-y-8">
        <div className="float-in section-shell rounded-[2rem] p-7 sm:p-10">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.32em] text-[var(--muted)]">
            {content.hero.eyebrow}
          </p>
          <div className="accent-line mt-4 h-px w-32" />
          <h1 className="mt-6 max-w-4xl font-[var(--font-serif)] text-4xl leading-tight font-semibold text-slate-950 sm:text-5xl lg:text-6xl">
            {content.hero.title}
          </h1>
          <p className="mt-5 text-lg font-medium text-slate-800">
            {content.hero.subtitle}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] [text-align:justify] sm:text-lg">
            {content.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium !text-white transition hover:-translate-y-0.5 hover:bg-slate-900"
            >
              {content.hero.primaryCta}
            </a>
            <a
              href="#research"
              className="rounded-full border border-[var(--line)] bg-white/80 px-5 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-300 hover:bg-white"
            >
              {content.hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {content.hero.metrics.map((metric, index) => (
            <article
              key={metric.label}
              className="glass-card fade-up rounded-[1.6rem] p-5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="font-[var(--font-serif)] text-3xl font-semibold text-slate-950">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{metric.label}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="glass-card float-in rounded-[2rem] p-6 sm:p-8">
        <div className="rounded-[1.5rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(15,23,42,0.04),rgba(255,255,255,0.86))] p-6">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.32em] text-[var(--muted)]">
            {content.sidebar.snapshotBadge}
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-950">
            {content.sidebar.snapshotTitle}
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--muted)]">
            {content.sidebar.snapshotItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-[var(--line)] bg-white/85 p-6">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.32em] text-[var(--muted)]">
            {content.sidebar.focusBadge}
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {content.sidebar.focusItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors.

---

## Task 4: Create AboutSection and ResearchSection

**Files:**
- Create: `components/sections/AboutSection.tsx`
- Create: `components/sections/ResearchSection.tsx`

- [ ] **Step 1: Create AboutSection**

```tsx
// components/sections/AboutSection.tsx
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface AboutSectionProps {
  content: LocaleContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
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
```

- [ ] **Step 2: Create ResearchSection**

```tsx
// components/sections/ResearchSection.tsx
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface ResearchSectionProps {
  content: LocaleContent;
}

export function ResearchSection({ content }: ResearchSectionProps) {
  return (
    <section id="research" className="grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionTitle badge={content.research.badge} title={content.research.title} />
      <div className="space-y-4">
        <article className="glass-card rounded-[2rem] p-7 sm:p-8">
          <p className="text-base leading-8 text-[var(--muted)] [text-align:justify]">
            {content.research.overview}
          </p>
          <div className="mt-6 space-y-4">
            {content.research.focusAreas.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-4 text-sm leading-7 text-slate-700 [text-align:justify]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="glass-card rounded-[2rem] p-7 sm:p-8">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            {content.research.publication.badge}
          </p>
          <h3 className="mt-4 text-2xl font-semibold text-slate-950">
            {content.research.publication.title}
          </h3>
          <p className="mt-4 rounded-[1.2rem] border border-[var(--line)] bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-slate-800 [text-align:justify]">
            {content.research.publication.status}
          </p>
          <p className="mt-5 text-base leading-8 text-[var(--muted)] [text-align:justify]">
            {content.research.publication.summary}
          </p>
          <ul className="mt-5 grid gap-3">
            {content.research.publication.highlights.map((item) => (
              <li
                key={item}
                className="rounded-[1.3rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm leading-7 text-slate-700 [text-align:justify]"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>

        <div className="grid gap-4 md:grid-cols-3">
          {content.research.metrics.map((metric) => (
            <article key={metric.label} className="glass-card rounded-[1.6rem] p-5">
              <p className="font-[var(--font-serif)] text-3xl font-semibold text-slate-950">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{metric.label}</p>
            </article>
          ))}
        </div>

        <article className="section-shell rounded-[2rem] p-6 text-sm leading-7 text-slate-700 [text-align:justify]">
          {content.research.note}
        </article>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors.

---

## Task 5: Create ExperienceSection and ProjectsSection

**Files:**
- Create: `components/sections/ExperienceSection.tsx`
- Create: `components/sections/ProjectsSection.tsx`

- [ ] **Step 1: Create ExperienceSection**

```tsx
// components/sections/ExperienceSection.tsx
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface ExperienceSectionProps {
  content: LocaleContent;
}

export function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <section id="experience" className="grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
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
```

- [ ] **Step 2: Create ProjectsSection**

```tsx
// components/sections/ProjectsSection.tsx
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface ProjectsSectionProps {
  content: LocaleContent;
}

export function ProjectsSection({ content }: ProjectsSectionProps) {
  return (
    <section id="projects" className="grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
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
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors.

---

## Task 6: Create SkillsSection and ContactSection

**Files:**
- Create: `components/sections/SkillsSection.tsx`
- Create: `components/sections/ContactSection.tsx`

- [ ] **Step 1: Create SkillsSection**

```tsx
// components/sections/SkillsSection.tsx
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface SkillsSectionProps {
  content: LocaleContent;
}

export function SkillsSection({ content }: SkillsSectionProps) {
  return (
    <section id="skills" className="grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
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
```

- [ ] **Step 2: Create ContactSection**

```tsx
// components/sections/ContactSection.tsx
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface ContactSectionProps {
  content: LocaleContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section id="contact" className="grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
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
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors.

---

## Task 7: Refactor Portfolio.tsx + update page.tsx

**Files:**
- Modify: `components/Portfolio.tsx`
- Modify: `app/page.tsx`

This wires all new components together. After this task the app should build and look identical to before.

- [ ] **Step 1: Rewrite Portfolio.tsx as orchestrator**

Replace the entire contents of `components/Portfolio.tsx` with:

```tsx
// components/Portfolio.tsx
"use client";

import { useState } from "react";
import { Locale, locales } from "@/data/locales";
import { NavHeader } from "@/components/ui/NavHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Chatbot } from "@/components/Chatbot";

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>("en");
  const content = locales[locale];

  return (
    <main className="relative overflow-hidden">
      <div className="fine-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-[-10%] top-16 h-72 w-72 rounded-full bg-[var(--accent-soft)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-5%] top-[20rem] h-80 w-80 rounded-full bg-[rgba(0,130,246,0.08)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-12 pt-5 sm:px-8 lg:px-10">
        <NavHeader locale={locale} content={content} onLocaleChange={setLocale} />
        <HeroSection content={content} />
        <AboutSection content={content} />
        <ResearchSection content={content} />
        <ExperienceSection content={content} />
        <ProjectsSection content={content} />
        <SkillsSection content={content} />
        <ContactSection content={content} />
        <footer className="px-2 pb-3 pt-10 text-center text-sm font-bold text-[var(--muted)]">
          {content.footer}
        </footer>
      </div>

      <Chatbot locale={locale} />
    </main>
  );
}
```

- [ ] **Step 2: Update app/page.tsx — remove standalone Chatbot**

`Chatbot` is now rendered inside `Portfolio`. Update `page.tsx`:

```tsx
// app/page.tsx
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
  return <Portfolio />;
}
```

- [ ] **Step 3: Update Chatbot to accept locale prop (minimal — full update in Task 10)**

`Chatbot.tsx` currently takes no props. Add the `locale` prop signature so it compiles. Full locale logic is wired in Task 10 — for now just accept and ignore the prop.

In `components/Chatbot.tsx`, change line 14:
```tsx
// Before:
export function Chatbot() {
// After:
export function Chatbot({ locale }: { locale: string }) {
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: build completes with no errors. The app should look identical to before.

- [ ] **Step 5: Commit**

```bash
git add components/Portfolio.tsx components/ui/ components/sections/ components/Chatbot.tsx app/page.tsx public/cv.pdf
git commit -m "refactor: decompose Portfolio into section + ui components"
```

---

## Task 8: Scroll-triggered animations + active nav highlight

**Files:**
- Create: `hooks/useScrollReveal.ts`
- Modify: `app/globals.css`
- Modify: `components/sections/AboutSection.tsx`
- Modify: `components/sections/ResearchSection.tsx`
- Modify: `components/sections/ExperienceSection.tsx`
- Modify: `components/sections/ProjectsSection.tsx`
- Modify: `components/sections/SkillsSection.tsx`
- Modify: `components/sections/ContactSection.tsx`

The active nav scroll spy was already added to `NavHeader` in Task 2. This task adds viewport-triggered reveal animations to section containers.

- [ ] **Step 1: Create hooks/useScrollReveal.ts**

```ts
// hooks/useScrollReveal.ts
import { useEffect, RefObject } from "react";

export function useScrollReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
```

- [ ] **Step 2: Add .reveal CSS to globals.css**

Append to the end of `app/globals.css`:

```css
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal[data-visible="true"] {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 3: Apply reveal to AboutSection**

Replace `components/sections/AboutSection.tsx` with:

```tsx
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
```

- [ ] **Step 4: Apply reveal to ResearchSection**

Replace `components/sections/ResearchSection.tsx` — add `"use client"`, `useRef`, `useScrollReveal`, and `ref={ref}` + `"reveal"` class on the outer `<section>`:

```tsx
// components/sections/ResearchSection.tsx
"use client";

import { useRef } from "react";
import { LocaleContent } from "@/data/locales";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ResearchSectionProps {
  content: LocaleContent;
}

export function ResearchSection({ content }: ResearchSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="research" className="reveal grid gap-4 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionTitle badge={content.research.badge} title={content.research.title} />
      <div className="space-y-4">
        <article className="glass-card rounded-[2rem] p-7 sm:p-8">
          <p className="text-base leading-8 text-[var(--muted)] [text-align:justify]">
            {content.research.overview}
          </p>
          <div className="mt-6 space-y-4">
            {content.research.focusAreas.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-[var(--line)] bg-white/80 p-4 text-sm leading-7 text-slate-700 [text-align:justify]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="glass-card rounded-[2rem] p-7 sm:p-8">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            {content.research.publication.badge}
          </p>
          <h3 className="mt-4 text-2xl font-semibold text-slate-950">
            {content.research.publication.title}
          </h3>
          <p className="mt-4 rounded-[1.2rem] border border-[var(--line)] bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-slate-800 [text-align:justify]">
            {content.research.publication.status}
          </p>
          <p className="mt-5 text-base leading-8 text-[var(--muted)] [text-align:justify]">
            {content.research.publication.summary}
          </p>
          <ul className="mt-5 grid gap-3">
            {content.research.publication.highlights.map((item) => (
              <li
                key={item}
                className="rounded-[1.3rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm leading-7 text-slate-700 [text-align:justify]"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>

        <div className="grid gap-4 md:grid-cols-3">
          {content.research.metrics.map((metric) => (
            <article key={metric.label} className="glass-card rounded-[1.6rem] p-5">
              <p className="font-[var(--font-serif)] text-3xl font-semibold text-slate-950">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{metric.label}</p>
            </article>
          ))}
        </div>

        <article className="section-shell rounded-[2rem] p-6 text-sm leading-7 text-slate-700 [text-align:justify]">
          {content.research.note}
        </article>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Apply reveal to ExperienceSection**

Replace `components/sections/ExperienceSection.tsx`:

```tsx
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
```

- [ ] **Step 6: Apply reveal to ProjectsSection**

Replace `components/sections/ProjectsSection.tsx`:

```tsx
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
```

- [ ] **Step 7: Apply reveal to SkillsSection**

Replace `components/sections/SkillsSection.tsx`:

```tsx
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
```

- [ ] **Step 8: Apply reveal to ContactSection**

Replace `components/sections/ContactSection.tsx`:

```tsx
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
```

- [ ] **Step 9: Verify build**

```bash
npm run build
```
Expected: build completes. Manually verify in `npm run dev` that scrolling triggers section animations and nav links highlight as you scroll.

- [ ] **Step 10: Commit**

```bash
git add hooks/ components/sections/ app/globals.css
git commit -m "feat: add scroll-triggered animations and active nav scroll spy"
```

---

## Task 9: Mobile hamburger menu

**Files:**
- Modify: `components/ui/NavHeader.tsx`

- [ ] **Step 1: Replace NavHeader.tsx with hamburger-enabled version**

```tsx
// components/ui/NavHeader.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gradPhoto from "../../anh_the_tot_nghiep.jpg";
import { Locale, LocaleContent, locales } from "@/data/locales";

const localeOrder: Locale[] = ["en", "vi"];

interface NavHeaderProps {
  locale: Locale;
  content: LocaleContent;
  onLocaleChange: (locale: Locale) => void;
}

export function NavHeader({ locale, content, onLocaleChange }: NavHeaderProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Close menu on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const navLinkClass = (href: string) =>
    `rounded-full px-3 py-2 transition ${
      activeSection === href.slice(1)
        ? "bg-white text-slate-950 shadow-sm"
        : "hover:bg-white hover:text-slate-950"
    }`;

  return (
    <div ref={menuRef} className="glass-card fade-up sticky top-4 z-30 relative rounded-full px-4 py-3 sm:px-6">
      <header>
        <div className="flex items-center justify-between gap-4">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[var(--line)] bg-white/85">
              <Image
                src={gradPhoto}
                alt="Tran The Khoi graduation portrait"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Tran The Khoi</p>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                AI Product Developer
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-wrap gap-2 text-sm text-slate-700">
            {content.nav.map((item) => (
              <a key={item.href} href={item.href} className={navLinkClass(item.href)}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <a
              href="/cv.pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-950 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-900"
            >
              ↓ CV
            </a>

            <div
              className="inline-flex rounded-full border border-[var(--line)] bg-white/90 p-1"
              aria-label="Language switcher"
            >
              {localeOrder.map((item) => {
                const isActive = item === locale;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={locales[item].switchLabel}
                    onClick={() => onLocaleChange(item)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-slate-950 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    {locales[item].languageLabel}
                  </button>
                );
              })}
            </div>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-white/90 transition hover:bg-white"
            >
              {menuOpen ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="15" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 md:hidden glass-card rounded-[1.5rem] px-4 py-3">
          <nav className="flex flex-col gap-1 text-sm text-slate-700">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-[1rem] px-4 py-3 transition ${
                  activeSection === item.href.slice(1)
                    ? "bg-white text-slate-950 font-medium shadow-sm"
                    : "hover:bg-white hover:text-slate-950"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: build passes. Manually resize browser to < 768px and confirm hamburger appears; tapping it opens the dropdown; tapping a link closes it.

- [ ] **Step 3: Commit**

```bash
git add components/ui/NavHeader.tsx
git commit -m "feat: add mobile hamburger menu to NavHeader"
```

---

## Task 10: Chatbot locale awareness

**Files:**
- Modify: `data/locales.ts`
- Modify: `data/portfolio-content.json`
- Modify: `components/Chatbot.tsx`

- [ ] **Step 1: Add ChatbotContent type and update LocaleContent in locales.ts**

In `data/locales.ts`, add after the `LinkItem` type and update `LocaleContent`:

```ts
export type ChatbotContent = {
  greeting: string;
  suggestions: string[];
};
```

Then add `chatbot: ChatbotContent;` to the `LocaleContent` type definition:

```ts
export type LocaleContent = {
  // ... existing fields ...
  footer: string;
  chatbot: ChatbotContent;   // ← add this line
};
```

- [ ] **Step 2: Add chatbot strings to portfolio-content.json**

Inside the `"en"` object (after `"footer"`), add:

```json
"chatbot": {
  "greeting": "Hi! I'm Khoi's AI assistant. Ask me anything about his background, projects, skills, or how to reach him.",
  "suggestions": [
    "What projects has Khoi built?",
    "What are his AI skills?",
    "Tell me about his research paper.",
    "How can I contact Khoi?"
  ]
}
```

Inside the `"vi"` object (after `"footer"`), add:

```json
"chatbot": {
  "greeting": "Xin chào! Tôi là trợ lý AI của Khoi. Hãy hỏi tôi về dự án, kỹ năng hoặc cách liên hệ anh ấy.",
  "suggestions": [
    "Khoi đã xây dựng những dự án gì?",
    "Kỹ năng AI của anh ấy là gì?",
    "Hãy kể về luận văn nghiên cứu.",
    "Làm thế nào để liên hệ Khoi?"
  ]
}
```

- [ ] **Step 3: Rewrite Chatbot.tsx with locale support**

Replace the entire contents of `components/Chatbot.tsx`:

```tsx
// components/Chatbot.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Locale, locales } from "@/data/locales";

type Message = { role: "user" | "assistant"; content: string };

interface ChatbotProps {
  locale: Locale;
}

export function Chatbot({ locale }: ChatbotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatbot = locales[locale].chatbot;

  // Reset greeting when locale changes (only if just the greeting is shown)
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [{ role: "assistant", content: chatbot.greeting }];
      }
      return prev;
    });
  }, [locale, chatbot.greeting]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      if (messages.length === 0) {
        setMessages([{ role: "assistant", content: chatbot.greeting }]);
      }
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text ?? "Sorry, I couldn't get a response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showSuggestions = messages.length <= 1 && !loading;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="flex flex-col overflow-hidden rounded-[1.8rem] border border-[rgba(15,23,42,0.1)] bg-white/95 shadow-2xl backdrop-blur-xl"
          style={{ width: "min(380px, calc(100vw - 3rem))", height: "min(520px, calc(100vh - 7rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(15,23,42,0.08)] bg-slate-950 px-5 py-4 rounded-t-[1.8rem]">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Ask about Khoi</p>
                <p className="text-xs text-white/55">AI-powered portfolio assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] rounded-[1.2rem] px-4 py-3 text-sm leading-6 ${
                    msg.role === "user"
                      ? "bg-slate-950 text-white rounded-br-md"
                      : "border border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.04)] text-slate-800 rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-[1.2rem] rounded-bl-md border border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.04)] px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-slate-400"
                      style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {showSuggestions && (
              <div className="pt-1 flex flex-col gap-2">
                {chatbot.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-[1rem] border border-[rgba(15,23,42,0.09)] bg-white px-3 py-2 text-left text-xs text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[rgba(15,23,42,0.08)] bg-white/80 px-4 py-3">
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something…"
                disabled={loading}
                className="flex-1 rounded-full border border-[rgba(15,23,42,0.1)] bg-[rgba(15,23,42,0.03)] px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-slate-300 focus:bg-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-slate-800 disabled:opacity-30"
                aria-label="Send"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-800 active:scale-95"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: build passes. Manually verify: switch to VI — chatbot greeting and suggestions appear in Vietnamese.

- [ ] **Step 5: Commit**

```bash
git add data/locales.ts data/portfolio-content.json components/Chatbot.tsx
git commit -m "feat: chatbot locale awareness — suggestions and greeting follow active language"
```

---

## Done

All 10 tasks complete. The app now has:
- Decomposed component architecture (9 new files, Portfolio.tsx ~30 lines)
- CV download button in the sticky header
- Scroll-triggered animations on all sections below the hero
- Active nav highlighting as you scroll
- Mobile hamburger dropdown menu
- Bilingual chatbot greeting and suggestions
