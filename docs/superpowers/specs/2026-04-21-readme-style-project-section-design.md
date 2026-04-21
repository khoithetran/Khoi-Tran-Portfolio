# README-Style Project Section Design

**Date:** 2026-04-21
**Scope:** Main project card only (Safety Helmet Detection System) — both EN and VI locales.

## Problem

The main project's description is a single dense paragraph. It does not communicate the problem context, solution approach, or key features in a scannable way.

## Goal

Restructure the main project card to display like a README file: clearly sectioned with mini-headers, bullet lists, and a narrative flow from problem → solution → features → architecture → results.

## Data Structure

Replace `description` (string) on the main project card with a `sections` array. The two smaller project cards keep their existing `description` field unchanged.

Each section object has:
- `heading` (string) — displayed as a mini-header
- `body` (string, optional) — rendered as a paragraph
- `items` (string[], optional) — rendered as a bullet list

The five sections for the main project:

| # | Heading (VI) | Heading (EN) | Type |
|---|---|---|---|
| 1 | Đặt vấn đề | Problem Statement | body |
| 2 | Giải pháp | Solution | body |
| 3 | Tính năng nổi bật | Key Features | items |
| 4 | Kiến trúc hệ thống | System Architecture | items |
| 5 | Kết quả & Thành tựu | Results & Achievements | items |

### TypeScript type addition

```ts
interface ProjectSection {
  heading: string;
  body?: string;
  items?: string[];
}

// In ProjectCard interface:
sections?: ProjectSection[];
// description remains optional for backward compatibility with smaller cards
```

## Component Changes (`ProjectsSection.tsx`)

Replace the `card.description` render block with:

```
if card.sections:
  for each section:
    render heading (font-mono, uppercase, small, accent color)
    if section.body: render as <p>
    if section.items: render as <ul> with bullet items
else:
  render card.description as <p> (existing behavior)
```

The `stack` badges, `outcome` block, and `demoCaption` images remain unchanged in position and structure.

## Constraints

- No new dependencies.
- The two smaller project cards must render identically to today.
- EN and VI sections are independent strings — both locales get full README content.
