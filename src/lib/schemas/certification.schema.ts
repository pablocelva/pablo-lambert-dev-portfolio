import { z } from 'zod';

export const CertificationCategorySchema = z.enum([
  'fullstack',
  'ai-ml',
  'data-science',
  'cloud-devops',
  'ux-design'
]);

export const CertificationSchema = z.object({
  id: z.string().min(1, 'ID es obligatorio'),
  title: z.string().min(2, 'El título es obligatorio'),
  issuer: z.string().min(2, 'La entidad emisora es obligatoria'),
  issueDate: z.string().min(4, 'La fecha o año es obligatoria'),
  credentialUrl: z.string().url('URL de credencial válida requerida').optional().or(z.literal('')),
  badgeUrl: z.string().optional().or(z.literal('')),
  category: CertificationCategorySchema,
  skills: z.array(z.string()).default([]),
  order: z.number().int().default(0)
});

export type Certification = z.infer<typeof CertificationSchema>;
export type CertificationCategory = z.infer<typeof CertificationCategorySchema>;
