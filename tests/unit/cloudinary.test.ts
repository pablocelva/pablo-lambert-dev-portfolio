import { describe, it, expect } from 'vitest';
import { buildCloudinaryUrl, generateResponsiveSrcSet } from '../../src/lib/cloudinary/index';

describe('Cloudinary Utility Tests', () => {
  it('returns empty string if no path is provided', () => {
    expect(buildCloudinaryUrl('')).toBe('');
  });

  it('returns original URL if external (e.g. Unsplash) and not cloudinary', () => {
    const unsplashUrl = 'https://images.unsplash.com/photo-12345';
    expect(buildCloudinaryUrl(unsplashUrl)).toBe(unsplashUrl);
  });

  it('transforms cloudinary full url correctly if res.cloudinary.com is present', () => {
    const cloudUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
    expect(buildCloudinaryUrl(cloudUrl, { width: 500 })).toContain('w_500');
  });

  it('returns local relative path unchanged', () => {
    expect(buildCloudinaryUrl('/images/avatar.png')).toBe('/images/avatar.png');
  });

  it('builds optimized Cloudinary URL for public ID with all options', () => {
    const result = buildCloudinaryUrl('portfolio/hero-preview.png', {
      width: 800,
      height: 600,
      crop: 'thumb',
      format: 'webp',
      quality: 'auto',
      gravity: 'face'
    });

    expect(result).toContain('res.cloudinary.com');
    expect(result).toContain('w_800');
    expect(result).toContain('h_600');
    expect(result).toContain('c_thumb');
    expect(result).toContain('f_webp');
    expect(result).toContain('q_auto');
    expect(result).toContain('g_face');
  });

  it('generates responsive srcset for valid Cloudinary public ID', () => {
    const srcset = generateResponsiveSrcSet('portfolio/project-cover', [400, 800, 1200]);
    expect(srcset).toContain('400w');
    expect(srcset).toContain('800w');
    expect(srcset).toContain('1200w');
  });

  it('returns empty srcset for non-cloudinary external URL or empty input', () => {
    expect(generateResponsiveSrcSet('https://unsplash.com/test.jpg')).toBe('');
    expect(generateResponsiveSrcSet('')).toBe('');
    expect(generateResponsiveSrcSet('/local/path.jpg')).toBe('');
  });
});
