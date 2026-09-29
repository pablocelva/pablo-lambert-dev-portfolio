import { describe, it, expect } from 'vitest';
import { ProjectSchema, ProjectCategorySchema } from '../../src/lib/schemas/project.schema';
import { ExperienceSchema, ExperienceTypeSchema } from '../../src/lib/schemas/experience.schema';
import { CertificationSchema, CertificationCategorySchema } from '../../src/lib/schemas/certification.schema';
import { ServiceSchema } from '../../src/lib/schemas/service.schema';
import { ContactMessageSchema } from '../../src/lib/schemas/contact.schema';
import { ProfileSchema } from '../../src/lib/schemas/profile.schema';
import { initialProjects, initialExperiences, initialCertifications, initialServices, initialProfile } from '../../src/data/initialData';

describe('Zod Schemas Validation Suite', () => {
  describe('ProjectSchema', () => {
    it('validates a valid project correctly', () => {
      const validProject = initialProjects[0];
      const parsed = ProjectSchema.safeParse(validProject);
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.id).toBe(validProject.id);
        expect(parsed.data.published).toBe(true);
      }
    });

    it('rejects invalid project with missing title or invalid URL', () => {
      const invalid = {
        id: '123',
        slug: 'invalid',
        title: 'a', // too short
        tagline: 'abc', // too short
        description: 'short', // too short
        category: 'unknown_cat',
        tags: [],
        techStack: [],
        githubUrl: 'not-a-url',
        image: ''
      };
      const parsed = ProjectSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
    });

    it('validates all categories in ProjectCategorySchema', () => {
      const categories = ['fullstack', 'ai-ml', 'data-science', 'ux-ui'];
      categories.forEach((cat) => {
        expect(ProjectCategorySchema.safeParse(cat).success).toBe(true);
      });
      expect(ProjectCategorySchema.safeParse('invalid-cat').success).toBe(false);
    });
  });

  describe('ExperienceSchema', () => {
    it('validates valid experiences', () => {
      initialExperiences.forEach((exp) => {
        const parsed = ExperienceSchema.safeParse(exp);
        expect(parsed.success).toBe(true);
      });
    });

    it('rejects experience without achievements or invalid type', () => {
      const invalid = {
        id: 'exp-invalid',
        role: 'Dev',
        company: 'Corp',
        location: 'Remote',
        period: '2024',
        type: 'invalid-type',
        description: 'short',
        achievements: [],
        tech: []
      };
      expect(ExperienceSchema.safeParse(invalid).success).toBe(false);
    });

    it('validates ExperienceTypeSchema types', () => {
      ['full-time', 'lead', 'contract', 'consulting'].forEach((t) => {
        expect(ExperienceTypeSchema.safeParse(t).success).toBe(true);
      });
    });
  });

  describe('CertificationSchema', () => {
    it('validates all initial certifications', () => {
      initialCertifications.forEach((cert) => {
        expect(CertificationSchema.safeParse(cert).success).toBe(true);
      });
    });

    it('validates CertificationCategorySchema types', () => {
      ['fullstack', 'ai-ml', 'data-science', 'cloud-devops', 'ux-design'].forEach((c) => {
        expect(CertificationCategorySchema.safeParse(c).success).toBe(true);
      });
    });
  });

  describe('ServiceSchema', () => {
    it('validates all initial services', () => {
      initialServices.forEach((serv) => {
        expect(ServiceSchema.safeParse(serv).success).toBe(true);
      });
    });
  });

  describe('ContactMessageSchema', () => {
    it('validates a complete and correct contact message', () => {
      const validMsg = {
        name: 'Maria Recruiter',
        email: 'maria@techcompany.com',
        company: 'TechCorp',
        roleType: 'recruiter_fulltime',
        subject: 'Senior Full Stack & AI Role',
        message: 'Hola Pablo, nos encantaría coordinar una entrevista técnica contigo.',
        website_hp: ''
      };
      const parsed = ContactMessageSchema.safeParse(validMsg);
      expect(parsed.success).toBe(true);
    });

    it('fails when email is invalid or message is too short', () => {
      const invalidMsg = {
        name: 'M',
        email: 'invalid-email',
        subject: 'Hi',
        message: 'Short'
      };
      const parsed = ContactMessageSchema.safeParse(invalidMsg);
      expect(parsed.success).toBe(false);
    });
  });

  describe('ProfileSchema', () => {
    it('validates initial profile correctly', () => {
      const parsed = ProfileSchema.safeParse(initialProfile);
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.fullName).toBe('Pablo Lambert');
        expect(parsed.data.metrics.length).toBeGreaterThan(0);
      }
    });
  });
});
