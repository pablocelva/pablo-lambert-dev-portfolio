import { describe, it, expect } from 'vitest';
import { generatePersonSchema, generateWebSiteSchema } from '../../src/lib/utils/seo';

describe('SEO Schema.org Generators', () => {
  it('generates valid Person JSON-LD Schema', () => {
    const schema = generatePersonSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe('Pablo Lambert');
    expect(schema.knowsAbout).toContain('Full Stack Web Development');
    expect(schema.knowsAbout).toContain('Retrieval-Augmented Generation (RAG)');
    expect(schema.sameAs.length).toBeGreaterThan(0);
  });

  it('generates valid WebSite JSON-LD Schema', () => {
    const schema = generateWebSiteSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toContain('Pablo Lambert');
    expect(schema.url).toContain('pablolambert-dev');
  });
});
