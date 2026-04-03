// components/ui/NavHeader.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Locale, LocaleContent, locales } from "@/data/locales";

const localeOrder: Locale[] = ["en", "vi"];
const profileImageSrc =
  "https://drive.google.com/thumbnail?id=1MS8sK96mDsjUN7UclPxhHfNrAqQtSt-C&sz=w1000";

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
        ? "bg-slate-950 !text-white shadow-sm"
        : "hover:bg-white hover:text-slate-950"
    }`;

  return (
    <div ref={menuRef} className="glass-card fade-up relative rounded-full px-4 py-3 sm:px-6">
      <header className="flex items-center justify-between gap-4">
        {/* Identity */}
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[var(--line)] bg-white/85">
            <Image
              src={profileImageSrc}
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
            download="Tran_The_Khoi_CV.pdf"
            className="rounded-full bg-slate-950 px-4 py-2 text-xs font-medium !text-white transition hover:bg-slate-700"
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
                      : "text-slate-600 hover:bg-slate-700 hover:!text-white"
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
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-white/90 transition hover:bg-slate-700 hover:!text-white hover:border-slate-700"
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
                    ? "bg-slate-950 !text-white font-medium shadow-sm"
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
