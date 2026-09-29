import { getSupabaseClient, isSupabaseConfigured } from '../supabase/client';
import { getSupabaseServerClient, isSupabaseServerConfigured } from '../supabase/server';
import { initialProjects, initialExperiences, initialCertifications, initialServices, initialProfile } from '../../data/initialData';
import { ProjectSchema, type Project } from '../schemas/project.schema';
import { ExperienceSchema, type Experience } from '../schemas/experience.schema';
import { CertificationSchema, type Certification } from '../schemas/certification.schema';
import { ServiceSchema, type Service } from '../schemas/service.schema';
import { ProfileSchema, type Profile } from '../schemas/profile.schema';

// In-memory store for fallback/local mode
let memoryProjects: Project[] = [...initialProjects];
let memoryExperiences: Experience[] = [...initialExperiences];
let memoryCertifications: Certification[] = [...initialCertifications];
let memoryServices: Service[] = [...initialServices];
let memoryProfile: Profile = { ...initialProfile };

export class PortfolioService {
  /**
   * Get all published projects, sorted by order
   */
  static async getProjects(includeUnpublished = false): Promise<Project[]> {
    const supabase = getSupabaseServerClient() || getSupabaseClient();

    if (supabase) {
      try {
        let query = supabase.from('projects').select('*').order('order_index', { ascending: true });
        if (!includeUnpublished) {
          query = query.eq('published', true);
        }

        const { data, error } = await query;
        if (error) {
          console.warn('[PortfolioService] Supabase error fetching projects, falling back to memory:', error.message);
        } else if (data && data.length > 0) {
          return data.map((item) =>
            ProjectSchema.parse({
              id: item.id,
              slug: item.slug,
              title: item.title,
              tagline: item.tagline,
              description: item.description,
              category: item.category,
              tags: item.tags,
              featured: item.featured,
              metrics: item.metrics || [],
              techStack: item.tech_stack || [],
              architectureNotes: item.architecture_notes || '',
              githubUrl: item.github_url || '',
              demoUrl: item.demo_url || '',
              caseStudyUrl: item.case_study_url || '',
              image: item.image,
              order: item.order_index,
              published: item.published
            })
          );
        }
      } catch (err) {
        console.warn('[PortfolioService] Exception connecting to Supabase projects:', err);
      }
    }

    const filtered = includeUnpublished ? memoryProjects : memoryProjects.filter((p) => p.published);
    return [...filtered].sort((a, b) => a.order - b.order);
  }

  /**
   * Get a single project by slug
   */
  static async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getProjects(true);
    return projects.find((p) => p.slug === slug) || null;
  }

  /**
   * Save or update a project
   */
  static async saveProject(project: Project): Promise<Project> {
    const validated = ProjectSchema.parse(project);
    const supabase = getSupabaseServerClient();

    if (supabase) {
      try {
        const { error } = await supabase.from('projects').upsert({
          id: validated.id,
          slug: validated.slug,
          title: validated.title,
          tagline: validated.tagline,
          description: validated.description,
          category: validated.category,
          tags: validated.tags,
          featured: validated.featured,
          metrics: validated.metrics,
          tech_stack: validated.techStack,
          architecture_notes: validated.architectureNotes,
          github_url: validated.githubUrl || null,
          demo_url: validated.demoUrl || null,
          case_study_url: validated.caseStudyUrl || null,
          image: validated.image,
          order_index: validated.order,
          published: validated.published,
          updated_at: new Date().toISOString()
        });

        if (error) {
          console.error('[PortfolioService] Error saving project to Supabase:', error.message);
        }
      } catch (err) {
        console.error('[PortfolioService] Exception saving to Supabase:', err);
      }
    }

    const index = memoryProjects.findIndex((p) => p.id === validated.id);
    if (index >= 0) {
      memoryProjects[index] = validated;
    } else {
      memoryProjects.push(validated);
    }

    return validated;
  }

  /**
   * Delete a project
   */
  static async deleteProject(id: string): Promise<boolean> {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.error('[PortfolioService] Error deleting from Supabase:', err);
      }
    }

    memoryProjects = memoryProjects.filter((p) => p.id !== id);
    return true;
  }

  /**
   * Get experience timeline items
   */
  static async getExperiences(): Promise<Experience[]> {
    const supabase = getSupabaseServerClient() || getSupabaseClient();

    if (supabase) {
      try {
        const { data, error } = await supabase.from('experiences').select('*').order('order_index', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((item: any) =>
            ExperienceSchema.parse({
              id: item.id,
              role: item.role,
              company: item.company,
              companyUrl: item.company_url || '',
              location: item.location,
              period: item.period,
              type: item.type,
              current: item.current,
              description: item.description,
              achievements: item.achievements || [],
              tech: item.tech || [],
              order: item.order_index
            })
          );
        }
      } catch (err) {
        console.warn('[PortfolioService] Falling back to memory experiences:', err);
      }
    }

    return [...memoryExperiences].sort((a, b) => a.order - b.order);
  }

  /**
   * Get certifications
   */
  static async getCertifications(): Promise<Certification[]> {
    const supabase = getSupabaseServerClient() || getSupabaseClient();

    if (supabase) {
      try {
        const { data, error } = await supabase.from('certifications').select('*').order('order_index', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((item: any) =>
            CertificationSchema.parse({
              id: item.id,
              title: item.title,
              issuer: item.issuer,
              issueDate: item.issue_date,
              credentialUrl: item.credential_url || '',
              badgeUrl: item.badge_url || '',
              category: item.category,
              skills: item.skills || [],
              order: item.order_index
            })
          );
        }
      } catch (err) {
        console.warn('[PortfolioService] Falling back to memory certifications:', err);
      }
    }

    return [...memoryCertifications].sort((a, b) => a.order - b.order);
  }

  /**
   * Get services / impact areas
   */
  static async getServices(): Promise<Service[]> {
    return [...memoryServices].sort((a, b) => a.order - b.order);
  }

  /**
   * Get profile & recruiter pitch data
   */
  static async getProfile(): Promise<Profile> {
    return memoryProfile;
  }

  /**
   * Reset to initial seed data (useful for testing or resetting demo)
   */
  static resetToDefaults(): void {
    memoryProjects = [...initialProjects];
    memoryExperiences = [...initialExperiences];
    memoryCertifications = [...initialCertifications];
    memoryServices = [...initialServices];
    memoryProfile = { ...initialProfile };
  }
}
