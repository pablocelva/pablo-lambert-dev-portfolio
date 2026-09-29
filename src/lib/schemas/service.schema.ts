import { z } from 'zod';

export const ServiceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3),
  tagline: z.string().min(5),
  description: z.string().min(15),
  deliverables: z.array(z.string()).min(1),
  icon: z.string().default('Code'),
  badge: z.string().optional().default(''),
  targetAudience: z.string().default('Empresas Tech, Startups y Scaleups'),
  order: z.number().int().default(0)
});

export type Service = z.infer<typeof ServiceSchema>;
