import { IArticle } from '@/types/article.types';
import {
  IStrapiAttributes,
  IStrapiResponse,
  Nullable,
} from '@/types/common.types';
import { strapiRequest } from '@/utils/request';

const ARTICLE_API = 'api/articles';

type FetchArticlesProps = {
  fields?: Nullable<Array<keyof IArticle>>;
  limit?: number;
  start?: number;
};

export async function fetchArticles({
  fields,
  limit,
  start,
}: FetchArticlesProps = {}): Promise<IStrapiResponse<IArticle>> {
  try {
    const params = {
      populate: 'cover',
      fields,
      pagination: {
        limit,
        start,
      },
      sort: 'createdAt:desc',
    };

    const { data } = await strapiRequest.get(ARTICLE_API, { params });
    return data;
  } catch (error) {
    console.error('Ошибка при получении статей:', error);
    // kind of error handler
    return { data: [], meta: null };
  }
}

export async function fetchArticle(
  id: string,
): Promise<Nullable<IStrapiAttributes<IArticle>>> {
  try {
    const { data } = await strapiRequest.get(`${ARTICLE_API}/${id}`, {
      params: { populate: 'cover, seo' },
    });

    return data.data;
  } catch (error) {
    console.error('Ошибка при получении статьи:', error);
    return null;
  }
}
