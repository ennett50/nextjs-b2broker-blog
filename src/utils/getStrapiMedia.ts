import { Nullable } from '@/types/common.types';

/**
 * Retrieves the full URL of a media file from Strapi.
 * This function checks if the provided URL is already a fully qualified URL (starting with `http` or `//`).
 *
 * @param {Nullable<string>} url - The URL or relative path of the media file. This can be null, a full URL, or a relative path.
 * @returns {Nullable<string>} The full URL to the media file if a relative path is provided, the original URL if it's already a full URL, or null if the input is null.
 *
 * @example
 * // If NEXT_PUBLIC_STRAPI_API_URL is 'https://api.example.com'
 *
 * // Returns 'https://api.example.com/media/image.jpg'
 * getStrapiMedia('/media/image.jpg');
 *
 * // Returns 'https://external.com/image.jpg'
 * getStrapiMedia('https://external.com/image.jpg');
 *
 */
export function getStrapiMedia(url: Nullable<string>): Nullable<string> {
  if (url == null) {
    return null;
  }

  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
}
