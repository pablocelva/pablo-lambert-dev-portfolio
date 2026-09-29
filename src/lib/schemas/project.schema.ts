import { z } from 'zod';

export const ProjectCategorySchema = z.enum([
  'fullstack',
  'ai-ml',
  'data-science',
  'ux-ui'
]);

export const MetricItemSchema = z.object({
  label: z.string().min(1, 'El label de la métrica es obligatorio'),
  value: z.string().min(1, 'El valor de la métrica es obligatorio')
});

export const TechStackGroupSchema = z.object({
  category: z.string().min(1, 'La categoría es obligatoria'),
  items: z.array(z.string()).min(1, 'Debe contener al menos un elemento')
});

export const ProjectSchema = z.object({
  id: z.string().min(1, 'ID es obligatorio'),
  slug: z.string().min(1, 'Slug es obligatorio'),
  title: z.string().min(2, 'El título debe tener al menos 2 caracteres'),
  tagline: z.string().min(5, 'El tagline debe ser descriptivo'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  category: ProjectCategorySchema,
  tags: z.array(z.string()).min(1, 'Al menos una etiqueta es requerida'),
  featured: z.boolean().default(false),
  metrics: z.array(MetricItemSchema).default([]),
  techStack: z.array(z.string()).min(1, 'Indica las tecnologías utilizadas'),
  architectureNotes: z.string().optional().default(''),
  githubUrl: z.string().url('URL de GitHub inválida').optional().or(z.literal('')),
  demoUrl: z.string().url('URL de Demo inválida').optional().or(z.literal('')),
  caseStudyUrl: z.string().optional().or(z.literal('')),
  image: z.string().min(1, 'URL o path de imagen es obligatoria'),
  order: z.number().int().default(0),
  published: z.boolean().default(true)
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;
export type MetricItem = z.infer<typeof MetricItemSchema>;
