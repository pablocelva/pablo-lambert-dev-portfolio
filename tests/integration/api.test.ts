import { describe, it, expect } from 'vitest';
import { POST as ContactAPI } from '../../src/pages/api/contact';
import { POST as ProjectSaveAPI, DELETE as ProjectDeleteAPI } from '../../src/pages/api/admin/projects';
import { GET as RobotsAPI } from '../../src/pages/robots.txt';
import { GET as SitemapAPI } from '../../src/pages/sitemap.xml';
import { initialProjects } from '../../src/data/initialData';

describe('API Routes Integration Suite', () => {
  it('handles valid contact form POST submission', async () => {
    const mockRequest = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ana Lead',
        email: 'ana@lead.com',
        roleType: 'recruiter_fulltime',
        subject: 'Staff Engineer Opportunity',
        message: 'Hola Pablo, queremos conversar sobre una posición Staff Engineer.',
        website_hp: ''
      })
    });

    const response = await ContactAPI({ request: mockRequest } as any);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.id).toBeDefined();
  });

  it('returns 400 with details when contact form fails validation', async () => {
    const mockRequest = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'A',
        email: 'invalid-email',
        message: 'short'
      })
    });

    const response = await ContactAPI({ request: mockRequest } as any);
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.success).toBe(false);
    expect(json.details.length).toBeGreaterThan(0);
  });

  it('handles admin project save POST and delete API', async () => {
    const testProj = { ...initialProjects[0], id: 'proj-api-test', slug: 'api-test-proj' };

    const saveRequest = new Request('http://localhost/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testProj)
    });

    const saveRes = await ProjectSaveAPI({ request: saveRequest } as any);
    expect(saveRes.status).toBe(200);

    const deleteUrl = new URL('http://localhost/api/admin/projects?id=proj-api-test');
    const deleteRes = await ProjectDeleteAPI({ url: deleteUrl } as any);
    expect(deleteRes.status).toBe(200);
  });

  it('returns 400 on invalid project payload', async () => {
    const saveRequest = new Request('http://localhost/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: '123' })
    });

    const saveRes = await ProjectSaveAPI({ request: saveRequest } as any);
    expect(saveRes.status).toBe(400);
  });

  it('serves robots.txt with disallow admin rules', async () => {
    const res = await RobotsAPI({} as any);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('Disallow: /admin');
    expect(text).toContain('Sitemap:');
  });

  it('serves sitemap.xml with xml content header', async () => {
    const res = await SitemapAPI({} as any);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/xml');
    const xml = await res.text();
    expect(xml).toContain('<urlset');
  });
});
