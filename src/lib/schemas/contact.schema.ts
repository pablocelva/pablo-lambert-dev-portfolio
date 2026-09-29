import { z } from 'zod';

export const ContactRoleTypeSchema = z.enum([
  'recruiter_fulltime',
  'contract_freelance',
  'ai_consulting',
  'architecture_advisory',
  'other'
]);

export const ContactMessageSchema = z.object({
  name: z.string().min(2, 'Por favor ingresa tu nombre (mínimo 2 caracteres)').max(80),
  email: z.string().email('Por favor ingresa un correo electrónico válido').max(100),
  company: z.string().max(100).optional().or(z.literal('')),
  roleType: ContactRoleTypeSchema.default('recruiter_fulltime'),
  subject: z.string().min(4, 'El asunto debe tener al menos 4 caracteres').max(150),
  message: z.string().min(15, 'El mensaje debe tener al menos 15 caracteres').max(2500),
  // honeypot field for anti-spam bots
  website_hp: z.string().optional().default('')
});

export type ContactMessage = z.infer<typeof ContactMessageSchema>;
export type ContactRoleType = z.infer<typeof ContactRoleTypeSchema>;
