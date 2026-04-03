import portfolioContent from "./portfolio-content.json";

export type Locale = "en" | "vi";

export type NavItem = {
  label: string;
  href: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type Publication = {
  badge: string;
  title: string;
  status: string;
  summary: string;
  highlights: string[];
};

export type TimelineEntry = {
  title: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ProjectCard = {
  title: string;
  period: string;
  description: string;
  stack: string[];
  outcome: string;
  href?: string;
};

export type LinkItem = {
  label: string;
  value: string;
  href: string;
};

export type ChatbotContent = {
  greeting: string;
  suggestions: string[];
};

export type LocaleContent = {
  languageLabel: string;
  switchLabel: string;
  nav: NavItem[];
  sidebar: {
    snapshotBadge: string;
    snapshotTitle: string;
    snapshotItems: string[];
    focusBadge: string;
    focusItems: string[];
    projectLinkLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: Metric[];
  };
  about: {
    badge: string;
    title: string;
    paragraphs: string[];
  };
  research: {
    badge: string;
    title: string;
    overview: string;
    focusAreas: string[];
    metrics: Metric[];
    publication: Publication;
    note: string;
  };
  experience: {
    badge: string;
    title: string;
    entries: TimelineEntry[];
  };
  projects: {
    badge: string;
    title: string;
    cards: ProjectCard[];
  };
  skills: {
    badge: string;
    title: string;
    groups: SkillGroup[];
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    links: LinkItem[];
  };
  footer: string;
  chatbot: ChatbotContent;
};

export const locales = portfolioContent as Record<Locale, LocaleContent>;
