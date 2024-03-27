import { renderHook, act } from '@testing-library/react-hooks';

import { fetchArticles } from '@/api/articles.api';
import { IArticle } from '@/types/article.types';
import { IStrapiAttributes } from '@/types/common.types';
import { MOCK_ARTICLE } from '@/utils/test-mock-data';

import useArticles from './useArticles';

jest.mock('@/api/articles.api', () => ({
  fetchArticles: jest.fn(),
}));

const initialArticles: IStrapiAttributes<IArticle>[] = [
  { id: '1', attributes: { ...MOCK_ARTICLE.attributes, title: 'Article 1' } },
  { id: '2', attributes: { ...MOCK_ARTICLE.attributes, title: 'Article 2' } },
];

const mockArticleData = {
  data: [
    {
      id: '3',
      attributes: { ...MOCK_ARTICLE.attributes, title: 'Article 3' },
    },
    {
      id: '4',
      attributes: { ...MOCK_ARTICLE.attributes, title: 'Article 1' },
    },
  ],
};

describe('useArticles', () => {
  beforeEach(() => {
    (fetchArticles as jest.Mock).mockResolvedValue(mockArticleData);
  });

  const total = 10;

  it('should fetch articles and update state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useArticles({ initialArticles, total }),
    );

    expect(result.current.articles).toEqual(initialArticles);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLimitReached).toBe(false);

    act(() => {
      result.current.handleReadMore();
    });

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.articles).toEqual([
      ...initialArticles,
      ...mockArticleData.data,
    ]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLimitReached).toBe(false);
  });
});
