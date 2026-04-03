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
