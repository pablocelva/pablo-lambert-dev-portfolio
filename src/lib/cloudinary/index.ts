export interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'scale' | 'fit' | 'thumb' | 'limit';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpg';
  gravity?: 'auto' | 'face' | 'center';
}

const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME || import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'pablolambert';

/**
 * Builds an optimized Cloudinary URL or returns the original URL if external
 */
export function buildCloudinaryUrl(
  pathOrUrl: string,
  options: CloudinaryOptions = {}
): string {
  if (!pathOrUrl) return '';

  // If it's already an external image (e.g. Unsplash or absolute HTTP) and not Cloudinary, return as is
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    if (!pathOrUrl.includes('res.cloudinary.com')) {
      return pathOrUrl;
    }
  }

  // If it's a relative local path (e.g. /images/...) return as is
  if (pathOrUrl.startsWith('/')) {
    return pathOrUrl;
  }

  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity
  } = options;

  const transformations: string[] = [`f_${format}`, `q_${quality}`];

  if (crop) transformations.push(`c_${crop}`);
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (gravity) transformations.push(`g_${gravity}`);

  const transformString = transformations.join(',');
  const cleanPath = pathOrUrl.replace(/^\//, '');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${cleanPath}`;
}

/**
 * Generates an accessible responsive srcset for high-res screens
 */
export function generateResponsiveSrcSet(
  pathOrUrl: string,
  widths: number[] = [400, 800, 1200]
): string {
  if (!pathOrUrl || pathOrUrl.startsWith('/') || (pathOrUrl.startsWith('http') && !pathOrUrl.includes('cloudinary'))) {
    return '';
  }

  return widths
    .map((w) => `${buildCloudinaryUrl(pathOrUrl, { width: w })} ${w}w`)
    .join(', ');
}
