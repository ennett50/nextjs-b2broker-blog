import { render, screen } from '@testing-library/react';

import { IArticle } from '@/types/article.types';
import { IStrapiAttributes } from '@/types/common.types';
import { MOCK_ARTICLE } from '@/utils/test-mock-data';

import ArticlesList from './ArticlesList';

const mockArticles: IStrapiAttributes<IArticle>[] = [
  { id: '1', attributes: { ...MOCK_ARTICLE.attributes, title: 'Article 1' } },
  { id: '2', attributes: { ...MOCK_ARTICLE.attributes, title: 'Article 2' } },
  { id: '3', attributes: { ...MOCK_ARTICLE.attributes, title: 'Article 3' } },
];

describe('ArticlesList', () => {
  it('renders the list of articles', () => {
    render(<ArticlesList initialArticles={mockArticles} total={3} />);

    expect(screen.getByText('Article 1')).toBeInTheDocument();
    expect(screen.getByText('Article 2')).toBeInTheDocument();
    expect(screen.getByText('Article 3')).toBeInTheDocument();
  });

  it('renders the load more button when total articles is greater than initial articles', () => {
    render(<ArticlesList initialArticles={mockArticles} total={5} />);

    expect(screen.getByText('Read more')).toBeInTheDocument();
  });

  it('does not render the load more button when total articles is equal to initial articles', () => {
    render(<ArticlesList initialArticles={mockArticles} total={3} />);

    expect(screen.queryByText('Read more')).toBeNull();
  });
});
