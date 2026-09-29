import { siteConfig } from '../../data/siteConfig';
import { initialProfile } from '../../data/initialData';

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: initialProfile.fullName,
    jobTitle: initialProfile.headline,
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: [
      initialProfile.github,
      initialProfile.linkedin
    ],
    knowsAbout: [
      'Full Stack Web Development',
      'Artificial Intelligence',
      'Generative AI & LLMs',
      'Retrieval-Augmented Generation (RAG)',
      'Data Science & Analytics',
      'User Experience & UX Engineering',
      'TypeScript',
      'React',
      'Astro',
      'Python',
      'Node.js',
      'PostgreSQL',
      'Supabase',
      'Cloud Architecture'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Vanguard Tech Labs'
    },
    alumniOf: 'Universidad Técnica',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressCountry: 'CL'
    }
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteConfig.name} - Dev Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    author: {
      '@type': 'Person',
      name: siteConfig.author
    }
  };
}
