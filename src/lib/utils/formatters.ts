import type { ProjectCategory } from '../schemas/project.schema';
import type { CertificationCategory } from '../schemas/certification.schema';
import type { ContactRoleType } from '../schemas/contact.schema';

export function formatCategoryLabel(category: ProjectCategory): string {
  const map: Record<ProjectCategory, string> = {
    fullstack: 'Full Stack Web',
    'ai-ml': 'IA & Machine Learning',
    'data-science': 'Data Science & Analytics',
    'ux-ui': 'UX / UI Engineering'
  };
  return map[category] || category;
}

export function formatCertificationCategory(category: CertificationCategory): string {
  const map: Record<CertificationCategory, string> = {
    fullstack: 'Full Stack & Arquitectura',
    'ai-ml': 'Inteligencia Artificial & LLMs',
    'data-science': 'Data Engineering & Analytics',
    'cloud-devops': 'Cloud & Infraestructura',
    'ux-design': 'Diseño UX & Interacción'
  };
  return map[category] || category;
}

export function formatRoleTypeLabel(roleType: ContactRoleType): string {
  const map: Record<ContactRoleType, string> = {
    recruiter_fulltime: 'Propuesta Laboral (Full-Time / Reclutador)',
    contract_freelance: 'Proyecto Contract / Freelance',
    ai_consulting: 'Consultoría en IA & Sistemas RAG',
    architecture_advisory: 'Asesoría en Arquitectura Web / UX',
    other: 'Otra consulta profesional'
  };
  return map[roleType] || roleType;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
