# Responsive Layout — Design Spec
Date: 2026-04-23

## Goal
Ensure no layout breakage on any screen size (mobile 320px → desktop). No full redesign — targeted fixes only.

## Breakpoint reference
- `sm` = 640px (Tailwind default)
- Mobile = < 640px

---

## Fix 1 — Timeline cards (ProjectsSection, ExperienceSection, EducationSection)

**Problem:** Cards use `flex flex-row` with a fixed `w-36` (144px) timeline column. On mobile (~375px), this squeezes content to ~180px, causing text overflow.

**Solution:**
- Card container: default `flex-col`, add `sm:flex-row`
- Timeline column (`w-36`): add `hidden sm:flex` to hide on mobile
- Add a mobile-only period `<span>` (class `sm:hidden`) above the title, showing the same period text
- **ProjectsSection specifically**: `flex-row-reverse` alternation only applies from `sm:` — both card types default to `flex-col` on mobile

**Files:** `ProjectsSection.tsx`, `ExperienceSection.tsx`, `EducationSection.tsx`

---

## Fix 2 — Demo images (ProjectsSection)

**Problem:** `grid grid-cols-2` with hardcoded `style={{ height: "271.94px" }}`. On mobile this creates two narrow, fixed-height image boxes.

**Solution:**
- Change to `grid-cols-1 sm:grid-cols-2`
- Remove inline height style, replace with Tailwind `aspect-[4/3]` class

**File:** `ProjectsSection.tsx`

---

## Fix 3 — NavHeader role text

**Problem:** On very small screens (~320px), the header row contains avatar + name + role + contact button + language switcher + hamburger. The role text adds extra width and can cause overflow.

**Solution:**
- Add `hidden sm:block` to the role `<p>` element
- Name remains visible at all sizes

**File:** `NavHeader.tsx`

---

## Out of scope
- Typography scaling (text-3xl kept as-is — adequate on mobile)
- Chatbot sizing (already uses `min()` CSS)
- SkillsSection (already uses `md:grid`)
- Section padding (already uses `sm:px-8 lg:px-10`)
