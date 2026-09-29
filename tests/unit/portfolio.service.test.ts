import { describe, it, expect, beforeEach } from 'vitest';
import { PortfolioService } from '../../src/lib/services/portfolio.service';
import type { Project } from '../../src/lib/schemas/project.schema';

describe('PortfolioService Repository', () => {
  beforeEach(() => {
    PortfolioService.resetToDefaults();
  });

  it('retrieves published projects sorted by order', async () => {
    const projects = await PortfolioService.getProjects();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].order).toBeLessThanOrEqual(projects[1].order);
  });

  it('retrieves unpublished projects when flag is passed', async () => {
    const projects = await PortfolioService.getProjects(true);
    expect(projects.length).toBeGreaterThanOrEqual((await PortfolioService.getProjects(false)).length);
  });

  it('finds project by slug', async () => {
    const project = await PortfolioService.getProjectBySlug('nexus-ai-orchestrator');
    expect(project).not.toBeNull();
    expect(project?.title).toContain('NexusAI');
  });

  it('returns null if slug does not exist', async () => {
    const project = await PortfolioService.getProjectBySlug('non-existing-slug');
    expect(project).toBeNull();
  });

  it('saves new project and retrieves it', async () => {
    const newProj: Project = {
      id: 'proj-new-test',
      slug: 'test-agentic-platform',
      title: 'Agentic Test Platform',
      tagline: 'High speed autonomous agent test',
      description: 'Extensive test description for unit test validation with more than twenty characters.',
      category: 'ai-ml',
      tags: ['AI', 'Testing'],
      featured: true,
      metrics: [{ label: 'Speed', value: '10ms' }],
      techStack: ['TypeScript', 'Vitest'],
      architectureNotes: 'Microservices architecture',
      githubUrl: 'https://github.com/test/repo',
      demoUrl: 'https://demo.example.com',
      caseStudyUrl: '',
      image: 'https://images.unsplash.com/photo-12345',
      order: 10,
      published: true
    };

    const saved = await PortfolioService.saveProject(newProj);
    expect(saved.id).toBe('proj-new-test');

    const found = await PortfolioService.getProjectBySlug('test-agentic-platform');
    expect(found).not.toBeNull();
    expect(found?.title).toBe('Agentic Test Platform');
  });

  it('updates existing project', async () => {
    const existing = (await PortfolioService.getProjects())[0];
    const updated = { ...existing, title: 'Updated Title' };
    await PortfolioService.saveProject(updated);

    const retrieved = await PortfolioService.getProjectBySlug(existing.slug);
    expect(retrieved?.title).toBe('Updated Title');
  });

  it('deletes project by ID', async () => {
    const projectsBefore = await PortfolioService.getProjects();
    const idToDelete = projectsBefore[0].id;

    await PortfolioService.deleteProject(idToDelete);
    const projectsAfter = await PortfolioService.getProjects();

    expect(projectsAfter.find((p) => p.id === idToDelete)).toBeUndefined();
  });

  it('retrieves experiences, certifications, services and profile', async () => {
    const experiences = await PortfolioService.getExperiences();
    const certs = await PortfolioService.getCertifications();
    const services = await PortfolioService.getServices();
    const profile = await PortfolioService.getProfile();

    expect(experiences.length).toBeGreaterThan(0);
    expect(certs.length).toBeGreaterThan(0);
    expect(services.length).toBeGreaterThan(0);
    expect(profile.fullName).toBe('Pablo Lambert');
  });
});
