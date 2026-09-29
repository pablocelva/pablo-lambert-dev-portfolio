import { z } from 'zod';

export const ExperienceTypeSchema = z.enum([
  'full-time',
  'lead',
  'contract',
  'consulting'
]);

export const ExperienceSchema = z.object({
  id: z.string().min(1, 'ID es obligatorio'),
  role: z.string().min(2, 'El rol debe tener al menos 2 caracteres'),
  company: z.string().min(2, 'El nombre de empresa es obligatorio'),
  companyUrl: z.string().url().optional().or(z.literal('')),
  location: z.string().min(2, 'La ubicación es requerida'),
  period: z.string().min(2, 'El periodo es requerido'),
  type: ExperienceTypeSchema.default('full-time'),
  current: z.boolean().default(false),
  description: z.string().min(10, 'La descripción es obligatoria'),
  achievements: z.array(z.string()).min(1, 'Agrega al menos un logro cuantificable'),
  tech: z.array(z.string()).min(1, 'Agrega tecnologías utilizadas'),
  order: z.number().int().default(0)
});

export type Experience = z.infer<typeof ExperienceSchema>;
export type ExperienceType = z.infer<typeof ExperienceTypeSchema>;
