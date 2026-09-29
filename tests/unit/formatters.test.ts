import { describe, it, expect } from 'vitest';
import {
  formatCategoryLabel,
  formatCertificationCategory,
  formatRoleTypeLabel,
  slugify,
  truncateText
} from '../../src/lib/utils/formatters';

describe('Formatters Utility Suite', () => {
  it('formats project categories correctly including fallback', () => {
    expect(formatCategoryLabel('fullstack')).toBe('Full Stack Web');
    expect(formatCategoryLabel('ai-ml')).toBe('IA & Machine Learning');
    expect(formatCategoryLabel('data-science')).toBe('Data Science & Analytics');
    expect(formatCategoryLabel('ux-ui')).toBe('UX / UI Engineering');
    expect(formatCategoryLabel('custom' as any)).toBe('custom');
  });

  it('formats certification categories correctly including fallback', () => {
    expect(formatCertificationCategory('fullstack')).toBe('Full Stack & Arquitectura');
    expect(formatCertificationCategory('ai-ml')).toBe('Inteligencia Artificial & LLMs');
    expect(formatCertificationCategory('data-science')).toBe('Data Engineering & Analytics');
    expect(formatCertificationCategory('cloud-devops')).toBe('Cloud & Infraestructura');
    expect(formatCertificationCategory('ux-design')).toBe('Diseño UX & Interacción');
    expect(formatCertificationCategory('custom-cert' as any)).toBe('custom-cert');
  });

  it('formats contact role type labels correctly including fallback', () => {
    expect(formatRoleTypeLabel('recruiter_fulltime')).toContain('Propuesta Laboral');
    expect(formatRoleTypeLabel('contract_freelance')).toContain('Contract / Freelance');
    expect(formatRoleTypeLabel('ai_consulting')).toContain('Consultoría en IA');
    expect(formatRoleTypeLabel('architecture_advisory')).toContain('Asesoría en Arquitectura');
    expect(formatRoleTypeLabel('other')).toBe('Otra consulta profesional');
    expect(formatRoleTypeLabel('custom-role' as any)).toBe('custom-role');
  });

  it('slugifies string accurately with accents and special characters', () => {
    expect(slugify('Arquitectura & Inteligencia Artificial 2026!')).toBe('arquitectura-inteligencia-artificial-2026');
    expect(slugify('  Pablo Lambert -- Dev  ')).toBe('pablo-lambert-dev');
  });

  it('truncates text with ellipsis when exceeding length', () => {
    expect(truncateText('Hello World', 5)).toBe('Hello...');
    expect(truncateText('Short', 10)).toBe('Short');
  });
});
