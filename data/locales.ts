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

export type ProjectSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type ProjectCard = {
  title: string;
  period: string;
  description?: string;
  sections?: ProjectSection[];
  stack: string[];
  outcome: string;
  href?: string;
  hrefHuggingFace?: string;
  demoCaption?: string;
};

export type ChatbotContent = {
  greeting: string;
  suggestions: string[];
};

export type EducationContent = {
  badge: string;
  title: string;
  school: {
    name: string;
    degree: string;
    period: string;
    highlights: string[];
  };
  research: {
    badge: string;
    title: string;
    href: string;
    status: string;
    abstract: string;
    awardCaption: string;
  };
};

export type ContactDropdownItem = {
  icon: "phone" | "email" | "linkedin";
  label: string;
  value: string;
  href: string;
};

export type LocaleContent = {
  languageLabel: string;
  switchLabel: string;
  nav: NavItem[];
  contactDropdown: {
    buttonLabel: string;
    items: ContactDropdownItem[];
  };
  about: {
    badge: string;
    title: string;
    paragraphs: string[];
  };
  experience: {
    badge: string;
    title: string;
    entries: TimelineEntry[];
  };
  projects: {
    badge: string;
    title: string;
    projectLinkLabel: string;
    cards: ProjectCard[];
  };
  skills: {
    badge: string;
    title: string;
    groups: SkillGroup[];
  };
  education: EducationContent;
  footer: string;
  chatbot: ChatbotContent;
};

export const locales = portfolioContent as Record<Locale, LocaleContent>;
