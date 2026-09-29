import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as serverModule from '../../src/lib/supabase/server';
import { PortfolioService } from '../../src/lib/services/portfolio.service';
import { ContactService } from '../../src/lib/services/contact.service';

describe('Supabase Remote Integrated Branch Tests (Mocked)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('handles remote Supabase project fetching when configured', async () => {
    const mockSupabase: any = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: [
                {
                  id: 'remote-1',
                  slug: 'remote-proj',
                  title: 'Remote Project Title',
                  tagline: 'Remote Tagline Description',
                  description: 'This is a long valid description of the remote project for test purposes.',
                  category: 'fullstack',
                  tags: ['TypeScript'],
                  featured: true,
                  metrics: [{ label: 'Speed', value: '50ms' }],
                  tech_stack: ['TypeScript', 'Astro'],
                  architecture_notes: 'Serverless architecture',
                  github_url: 'https://github.com/test',
                  demo_url: 'https://demo.test',
                  case_study_url: '',
                  image: 'https://images.unsplash.com/photo-1',
                  order_index: 1,
                  published: true
                }
              ],
              error: null
            })
          })
        })
      })
    };

    vi.spyOn(serverModule, 'getSupabaseServerClient').mockReturnValue(mockSupabase);

    const projects = await PortfolioService.getProjects(false);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].id).toBe('remote-1');
  });

  it('handles remote Supabase experience fetching when configured', async () => {
    const mockSupabase: any = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'exp-remote-1',
                role: 'Staff Engineer',
                company: 'Remote Corp',
                company_url: 'https://company.test',
                location: 'Remote',
                period: '2023 - Present',
                type: 'lead',
                current: true,
                description: 'Full stack development and leadership in enterprise systems.',
                achievements: ['Increased performance by 40%'],
                tech: ['TypeScript', 'Python'],
                order_index: 1
              }
            ],
            error: null
          })
        })
      })
    };

    vi.spyOn(serverModule, 'getSupabaseServerClient').mockReturnValue(mockSupabase);

    const experiences = await PortfolioService.getExperiences();
    expect(experiences.length).toBe(1);
    expect(experiences[0].role).toBe('Staff Engineer');
  });

  it('handles remote Supabase certification fetching when configured', async () => {
    const mockSupabase: any = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'cert-remote-1',
                title: 'AWS Certified Solutions Architect',
                issuer: 'Amazon Web Services',
                issue_date: '2024',
                credential_url: 'https://aws.amazon.com',
                badge_url: '',
                category: 'cloud-devops',
                skills: ['AWS', 'Cloud'],
                order_index: 1
              }
            ],
            error: null
          })
        })
      })
    };

    vi.spyOn(serverModule, 'getSupabaseServerClient').mockReturnValue(mockSupabase);

    const certs = await PortfolioService.getCertifications();
    expect(certs.length).toBe(1);
    expect(certs[0].issuer).toBe('Amazon Web Services');
  });

  it('handles remote Supabase message submission when configured', async () => {
    const mockSupabase: any = {
      from: vi.fn().mockReturnValue({
        insert: vi.fn().mockResolvedValue({ error: null })
      })
    };

    vi.spyOn(serverModule, 'getSupabaseServerClient').mockReturnValue(mockSupabase);

    const res = await ContactService.submitMessage({
      name: 'Remote Recruiter',
      email: 'recruiter@remote.com',
      roleType: 'recruiter_fulltime',
      subject: 'Interview request',
      message: 'Hello Pablo, we want to talk about Staff Engineer position.'
    });

    expect(res.success).toBe(true);
  });
});
