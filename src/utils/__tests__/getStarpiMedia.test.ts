import { getStrapiMedia } from '../getStrapiMedia'; // Обновите путь в соответствии с расположением вашего файла

describe('getStrapiMedia', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns null for null input', () => {
    expect(getStrapiMedia(null)).toBeNull();
  });

  it('returns the original URL for fully qualified URLs', () => {
    const fullUrl = 'https://external.com/image.jpg';
    expect(getStrapiMedia(fullUrl)).toBe(fullUrl);

    const protocolRelativeUrl = '//external.com/image.jpg';
    expect(getStrapiMedia(protocolRelativeUrl)).toBe(protocolRelativeUrl);
  });

  it('returns the full URL for a relative path', () => {
    const baseUrl = 'https://api.example.com';
    process.env.NEXT_PUBLIC_STRAPI_API_URL = baseUrl;
    const relativePath = '/media/image.jpg';
    const expectedFullUrl = `${baseUrl}${relativePath}`;

    expect(getStrapiMedia(relativePath)).toBe(expectedFullUrl);
  });
});
