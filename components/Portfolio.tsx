"use client";

import Image from "next/image";
import { useState } from "react";
import gradPhoto from "../anh_the_tot_nghiep.jpg";
import { Locale, locales } from "@/data/locales";

const localeOrder: Locale[] = ["en", "vi"];

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>("en");
  const content = locales[locale];

  return (
    <main className="relative overflow-hidden">
      <div className="fine-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-[-10%] top-16 h-72 w-72 rounded-full bg-[var(--accent-soft)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-5%] top-[20rem] h-80 w-80 rounded-full bg-[rgba(0,130,246,0.08)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-12 pt-5 sm:px-8 lg:px-10">
        <header className="glass-card fade-up sticky top-4 z-30 rounded-full px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <nav className="flex flex-wrap gap-2 text-sm text-slate-700">
                {content.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-3 py-2 transition hover:bg-white hover:text-slate-950"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

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
                      onClick={() => setLocale(item)}
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
        </header>

        <section className="grid flex-1 items-start gap-8 pt-10 lg:grid-cols-[1.3fr_0.9fr] lg:pt-16">
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

        <footer className="px-2 pb-3 pt-10 text-center text-sm font-bold text-[var(--muted)]">
          {content.footer}
        </footer>
      </div>
    </main>
  );
}

function SectionTitle({ badge, title }: { badge: string; title: string }) {
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
