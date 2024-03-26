// hooks/useArticles.js
import { useCallback, useState } from 'react';

import { fetchArticles } from '@/api/articles.api';
import { ARTICLES_LIMIT } from '@/constants';
import { IArticlesListProps, type IArticle } from '@/types/article.types';
import { IStrapiAttributes } from '@/types/common.types';

interface IUseArticles {
  articles: IStrapiAttributes<IArticle>[];
  isLoading: boolean;
  isLimitReached: boolean;
  handleReadMore: () => Promise<void>;
}

/**
 * Custom hook for managing articles' data, including initial display, dynamic fetching, and pagination.
 *
 * @param {IArticlesListProps} params - Parameters object containing `initialArticles` and optionally `total`.
 * @param {IStrapiAttributes<IArticle>[]} params.initialArticles - The initial set of articles to display.
 * @param {number} [params.total] - Optional. The total number of articles available, used to determine if further fetching is possible.
 * @returns {IUseArticles} - An object containing:
 *   - `articles`: Array of articles currently available for display.
 *   - `isLoading`: Boolean indicating if a fetch operation is in progress.
 *   - `isLimitReached`: Boolean indicating if all available articles have been fetched.
 *   - `handleReadMore`: Function to invoke additional articles fetching.
 */

const useArticles = ({
  initialArticles,
  total,
}: IArticlesListProps): IUseArticles => {
  const [articles, setArticles] =
    useState<IStrapiAttributes<IArticle>[]>(initialArticles);
  const [start, setStart] = useState<number>(ARTICLES_LIMIT);
  const [isLoading, setLoading] = useState<boolean>(false);

  const isLimitReached = articles.length === total;

  const handleReadMore = useCallback(async (): Promise<void> => {
    setLoading(true);
    const { data } = await fetchArticles({
      fields: ['intro', 'title'],
      limit: ARTICLES_LIMIT,
      start,
    });
    setArticles(prevArticles => [...prevArticles, ...data]);
    setStart(prevStart => prevStart + ARTICLES_LIMIT);
    setLoading(false);
  }, [start]);

  return { articles, isLoading, isLimitReached, handleReadMore };
};

export default useArticles;
