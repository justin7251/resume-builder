import type { ComponentType } from 'svelte';
import ProfessionalTemplate from './templates/professional.svelte';
import ExecutiveTemplate from './templates/executive.svelte';
import CreativeTemplate from './templates/creative.svelte';
import StandardTemplate from './templates/standard.svelte';
import AnalystTemplate from './templates/analyst.svelte';
import AcademicTemplate from './templates/academic.svelte';
import MarketerTemplate from './templates/marketer.svelte';
import FreshTemplate from './templates/fresh.svelte';

export type TemplateMeta = {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  bestFor: string;
  tile: string;
  layout: 'one-column' | 'two-column' | 'sidebar';
  atsNote: string;
  component: ComponentType;
};

export const TEMPLATE_DATA: TemplateMeta[] = [
  {
    id: 'professional',
    name: 'Modern Professional',
    badge: 'ATS Friendly',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    bestFor: 'Tech Roles',
    tile: 'bg-blue-100',
    layout: 'one-column',
    atsNote: 'Clean single-column layout optimized for ATS parsing.',
    component: ProfessionalTemplate
  },
  {
    id: 'executive',
    name: 'The Executive',
    badge: 'ATS Friendly',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    bestFor: 'Leadership',
    tile: 'bg-amber-100',
    layout: 'two-column',
    atsNote: 'Structured two-column layout; verify ATS reading order.',
    component: ExecutiveTemplate
  },
  {
    id: 'creative',
    name: 'Creative Pulse',
    badge: 'Designer Choice',
    badgeColor: 'bg-amber-100 text-amber-700',
    bestFor: 'Creative Fields',
    tile: 'bg-orange-100',
    layout: 'sidebar',
    atsNote: 'Visual sidebar layout; best for portfolios, test with ATS.',
    component: CreativeTemplate
  },
  {
    id: 'standard',
    name: 'Standard Ivory',
    badge: 'ATS Friendly',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    bestFor: 'General Roles',
    tile: 'bg-yellow-100',
    layout: 'one-column',
    atsNote: 'Simple structure suitable for most ATS systems.',
    component: StandardTemplate
  },
  {
    id: 'analyst',
    name: 'Business Analyst',
    badge: 'ATS Friendly',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    bestFor: 'Analyst Roles',
    tile: 'bg-slate-200',
    layout: 'two-column',
    atsNote: 'Two-column layout; ensure ATS parser reads left-to-right.',
    component: AnalystTemplate
  },
  {
    id: 'academic',
    name: 'CV Academic',
    badge: '2+ Pages',
    badgeColor: 'bg-blue-100 text-blue-700',
    bestFor: 'Education',
    tile: 'bg-amber-100',
    layout: 'two-column',
    atsNote: 'Detailed academic structure; test parsing for long content.',
    component: AcademicTemplate
  },
  {
    id: 'marketer',
    name: 'The Marketer',
    badge: 'ATS Friendly',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    bestFor: 'Marketing',
    tile: 'bg-emerald-100',
    layout: 'two-column',
    atsNote: 'Balanced layout with emphasis sections; verify ATS order.',
    component: MarketerTemplate
  },
  {
    id: 'fresh',
    name: 'Fresh Graduate',
    badge: 'ATS Friendly',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    bestFor: 'Entry Level',
    tile: 'bg-yellow-100',
    layout: 'one-column',
    atsNote: 'Entry-level friendly structure with clear headings.',
    component: FreshTemplate
  }
];

export function getTemplateById(id: string) {
  return TEMPLATE_DATA.find((item) => item.id === id) || TEMPLATE_DATA[0];
}
