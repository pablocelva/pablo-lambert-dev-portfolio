import { z } from 'zod';

export const ProfileSchema = z.object({
  fullName: z.string().default('Pablo Lambert'),
  headline: z.string().default('Full Stack Developer & AI Solutions Engineer'),
  subheadline: z.string().default('Especialista en desarrollo web escalable con experiencia transversal en UX, Data Science e Integraciones de Inteligencia Artificial.'),
  location: z.string().default('Santiago, Chile (Disponible Remote Global)'),
  availability: z.string().default('Abierto a oportunidades Full-Time / Consultoría'),
  experienceYears: z.number().default(5),
  email: z.string().email().default('pablo.lambert.dev@gmail.com'),
  github: z.string().url().default('https://github.com/pablolambert-dev'),
  linkedin: z.string().url().default('https://linkedin.com/in/pablolambert-dev'),
  cvUrl: z.string().default('/cv-pablo-lambert.pdf'),
  recruiterSummary: z.object({
    topSkills: z.array(z.string()),
    primaryStack: z.array(z.string()),
    languages: z.array(z.string()),
    idealRoles: z.array(z.string()),
    timezone: z.string()
  }),
  metrics: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      description: z.string()
    })
  )
});

export type Profile = z.infer<typeof ProfileSchema>;
