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
