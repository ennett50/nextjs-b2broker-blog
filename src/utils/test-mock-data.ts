import { IArticle } from '@/types/article.types';
import { IStrapiAttributes } from '@/types/common.types';

export const MOCK_ARTICLE: IStrapiAttributes<IArticle> = {
  id: '1',
  attributes: {
    title: 'Article 1',
    intro: 'Intro 1',
    cover: {
      data: {
        attributes: {
          url: '/test-image.jpg',
          alternativeText: 'Test Image',
          width: 150,
          height: 150,
        },
      },
    },
    content: '',
    createdAt: '',
    seo: { metaTitle: 'Meta Title', metaDescription: 'Meta Description' },
  },
};
