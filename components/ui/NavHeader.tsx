// components/ui/NavHeader.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gradPhoto from "@/data/image/anh_the_tot_nghiep.jpg";
import { Locale, LocaleContent, locales } from "@/data/locales";

const localeOrder: Locale[] = ["vi", "en"];

const identity: Record<Locale, { name: string; role: string }> = {
  vi: { name: "Trần Thế Khôi", role: "Kỹ sư Trí tuệ Nhân tạo/Máy học" },
  en: { name: "Tran The Khoi", role: "AI/ML Engineer" },
};

const flagMap: Record<Locale, { src: string; alt: string }> = {
  en: { src: "https://flagcdn.com/gb.svg", alt: "English" },
  vi: { src: "https://flagcdn.com/vn.svg", alt: "Tiếng Việt" },
};

interface NavHeaderProps {
  locale: Locale;
  content: LocaleContent;
  onLocaleChange: (locale: Locale) => void;
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const iconMap = {
  phone: PhoneIcon,
  email: MailIcon,
  linkedin: LinkedInIcon,
};

export function NavHeader({ locale, content, onLocaleChange }: NavHeaderProps) {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  function handleCopy(key: string, value: string) {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  }

  const getSectionKey = (href: string) => href.slice(1);

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

  // Close contact dropdown on outside click
  useEffect(() => {
    if (!contactOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (!contactRef.current?.contains(e.target as Node)) setContactOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [contactOpen]);

  // Close both on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setContactOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const navLinkClass = (href: string) =>
    `rounded-full px-6 py-2 font-semibold transition ${
      activeSection === getSectionKey(href)
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
              src={gradPhoto}
              alt="Tran The Khoi graduation portrait"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">{identity[locale].name}</p>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              {identity[locale].role}
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 flex-wrap justify-center gap-[10px] text-sm text-slate-700">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveSection(getSectionKey(item.href))}
              className={navLinkClass(item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Contact dropdown button */}
          <div ref={contactRef} className="relative">
            <button
              type="button"
              onClick={() => setContactOpen((v) => !v)}
              className="contact-btn rounded-full bg-slate-950 px-3 py-2 text-sm font-medium !text-white transition duration-200"
            >
              {content.contactDropdown.buttonLabel}
            </button>

            {contactOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 rounded-[1.5rem] border border-[var(--line)] bg-white p-3 min-w-[220px] shadow-xl">
                <div className="flex flex-col gap-1">
                  {content.contactDropdown.items.map((item) => {
                    const Icon = iconMap[item.icon];
                    const isCopyable = item.icon === "phone" || item.icon === "email";
                    const isCopied = copiedKey === item.icon;
                    return (
                      <a
                        key={item.icon}
                        href={isCopyable ? undefined : item.href}
                        target={item.icon === "linkedin" ? "_blank" : undefined}
                        rel={item.icon === "linkedin" ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                          if (isCopyable) {
                            e.preventDefault();
                            handleCopy(item.icon, item.value);
                          } else {
                            setContactOpen(false);
                          }
                        }}
                        className="group flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm transition hover:bg-black/50 cursor-pointer select-none"
                      >
                        <span className="text-[var(--muted)] transition group-hover:text-white/70"><Icon /></span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-[var(--muted)] transition group-hover:text-white/70">{item.label}</p>
                          <p className="truncate font-medium text-slate-900 transition group-hover:text-white">{item.value}</p>
                        </div>
                        {isCopyable && (
                          <span className={`ml-auto text-xs font-medium transition-all duration-300 ${isCopied ? "opacity-100 text-emerald-500 group-hover:text-emerald-400" : "opacity-0"}`}>
                            Copied!
                          </span>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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
                  className={`rounded-full px-2 py-1.5 transition ${
                    isActive
                      ? "shadow-sm"
                      : "hover:bg-slate-100"
                  }`}
                  style={isActive ? { backgroundColor: "#e3e3e1" } : {}}
                >
                  <img
                    src={flagMap[item].src}
                    alt={flagMap[item].alt}
                    width={28}
                    height={19}
                    className="rounded-sm object-cover"
                  />
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
                onClick={() => {
                  setActiveSection(getSectionKey(item.href));
                  setMenuOpen(false);
                }}
                className={`rounded-[1rem] px-4 py-3 font-semibold transition ${
                  activeSection === getSectionKey(item.href)
                    ? "bg-slate-950 !text-white shadow-sm"
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
