# Frontend Optimization — Design Spec
**Date:** 2026-04-03
**Project:** Tran The Khoi — AI Portfolio (Next.js, Tailwind CSS)

---

## Goals

Improve UX, performance, maintainability, and completeness of the portfolio frontend without changing its minimalist glass aesthetic. Targeting AI Product Developer internship applications in HCMC.

---

## 1. Component Architecture

### Problem
`components/Portfolio.tsx` is 379 lines with all sections inlined. Hard to maintain and extend.

### Solution
Split into focused section components. No new dependencies.

```
components/
  Portfolio.tsx                  ← thin orchestrator, imports all sections
  sections/
    HeroSection.tsx              ← hero block + metric cards
    AboutSection.tsx             ← about paragraphs
    ResearchSection.tsx          ← research overview + publication + metrics + note
    ExperienceSection.tsx        ← experience entries
    ProjectsSection.tsx          ← project cards
    SkillsSection.tsx            ← skills groups
    ContactSection.tsx           ← contact links
  ui/
    SectionTitle.tsx             ← extracted shared component (badge + h2)
    NavHeader.tsx                ← sticky header: avatar, nav, CV button, language switcher
```

- Each section receives its `content` slice as a typed prop from the orchestrator.
- `data/locales.ts` is untouched — no changes to data shape.
- `SectionTitle` is already defined inline in `Portfolio.tsx`; it is extracted, not rewritten.

---

## 2. CV Download Button

### Placement
Inside `NavHeader.tsx`, between the nav links and the language switcher pill.

### Behavior
- Renders as a dark filled rounded-full pill: `↓ CV`
- `href="/cv.pdf"` with `download` attribute and `target="_blank"`
- File served from `/public/cv.pdf` (placeholder — user drops PDF there to activate)
- Visible on all screen sizes; on mobile it stays in the single compact row

### Styling
Matches existing dark button style: `bg-slate-950 text-white px-4 py-2 text-xs rounded-full hover:bg-slate-900 transition`

---

## 3. Scroll-triggered Animations

### Problem
All `fade-up` / `float-in` CSS animations fire at page load. Sections below the fold animate into nothing.

### Solution
New `hooks/useScrollReveal.ts`:

```ts
// Adds data-visible="true" to the ref'd element when it enters the viewport
useScrollReveal(ref, { threshold: 0.15 })
```

- Uses `IntersectionObserver` with `threshold: 0.15` (triggers when 15% of element is visible)
- Adds `data-visible="true"` on enter; does NOT remove on exit (animate-once behavior)
- CSS transitions keyed off `[data-visible="true"]` replace page-load keyframes:

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

- Section components attach `useScrollReveal` to their root wrapper
- Existing `fade-up` / `float-in` classes removed from section wrappers (kept on header only, which should animate at load)

---

## 4. Active Nav State (Scroll Spy)

### Behavior
As the user scrolls, the nav link matching the current visible section gets a highlighted style: `bg-white text-slate-950 rounded-full` (same pill used for active language button).

### Implementation
Inside `NavHeader.tsx`:

- One `IntersectionObserver` watches all `section[id]` elements (threshold: 0.4)
- Tracks `activeSection` state (string)
- Nav `<a href="#id">` receives `isActive` flag — applies highlight class when true
- On mobile hamburger menu: same active state applies to the dropdown links

---

## 5. Mobile Hamburger Menu

### Breakpoint
Hidden nav links on `< md` (below 768px). Hamburger icon appears in header row.

### Behavior
- Tap hamburger → dropdown panel slides/fades in below the header pill
- Dropdown: `glass-card` style, `rounded-[1.5rem]`, full-width, nav links stacked vertically
- Tap a nav link → closes menu + scrolls to section
- Tap outside dropdown → closes menu
- ESC key → closes menu

### Layout on mobile
```
[ Avatar + Name ] [ ↓ CV ] [ EN/VI ] [ ☰ ]
```
The CV button and language switcher remain visible at all times on mobile.

---

## 6. Chatbot Locale Awareness

### Problem
Chatbot suggestions and greeting are hardcoded English strings, ignoring the active locale.

### Solution

**`data/locales.ts`** — add `chatbot` key to both locales:

```ts
chatbot: {
  greeting: string,       // opening message
  suggestions: string[]   // 4 suggestion chips
}
```

English suggestions (existing): `"What projects has Khoi built?"`, etc.

Vietnamese suggestions (new): `"Khoi đã xây dựng những dự án gì?"`, `"Kỹ năng AI của anh ấy là gì?"`, `"Hãy kể về luận văn nghiên cứu."`, `"Làm thế nào để liên hệ Khoi?"`

**`components/Portfolio.tsx`** — passes `locale` prop to `<Chatbot locale={locale} />`

**`components/Chatbot.tsx`** — accepts `locale` prop, reads `locales[locale].chatbot` for greeting + suggestions. Greeting resets when locale changes (clear messages on locale switch if only greeting is shown).

---

## Out of Scope

- New sections (timeline, testimonials)
- Dark mode
- Backend/API changes
- Animation library (Framer Motion, etc.)
- Any change to `data/portfolio-content.json` or `app/api/chat/route.ts`

---

## File Changelist

| File | Action |
|------|--------|
| `components/Portfolio.tsx` | Refactor to orchestrator |
| `components/ui/NavHeader.tsx` | New |
| `components/ui/SectionTitle.tsx` | New (extracted) |
| `components/sections/HeroSection.tsx` | New |
| `components/sections/AboutSection.tsx` | New |
| `components/sections/ResearchSection.tsx` | New |
| `components/sections/ExperienceSection.tsx` | New |
| `components/sections/ProjectsSection.tsx` | New |
| `components/sections/SkillsSection.tsx` | New |
| `components/sections/ContactSection.tsx` | New |
| `components/Chatbot.tsx` | Add `locale` prop |
| `hooks/useScrollReveal.ts` | New |
| `data/locales.ts` | Add `chatbot` key |
| `app/globals.css` | Add `.reveal` transition classes |
| `public/cv.pdf` | Placeholder (user provides) |
