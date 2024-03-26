import { render, screen } from '@testing-library/react';

import ArticleCard from './ArticleCard';

describe('ArticleCard Component', () => {
  const articleMock = {
    id: 1,
    article: {
      title: 'Test Article Title',
      intro: 'This is an introduction to the test article.',
      content: '',
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
      seo: { metaTitle: '', metaDescription: '' },
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
    },
  };

  it('renders the article title, intro, and has a link to the article', () => {
    render(<ArticleCard id={articleMock.id} article={articleMock.article} />);

    expect(screen.getByText(articleMock.article.title)).toBeInTheDocument();
    expect(screen.getByText(articleMock.article.intro)).toBeInTheDocument();
    expect(
      screen.getByAltText(
        articleMock.article.cover.data.attributes.alternativeText,
      ),
    ).toBeInTheDocument();

    const readMoreLinks = screen.getAllByLabelText(
      `Read more about ${articleMock.article.title}`,
    );
    expect(readMoreLinks.length).toBeGreaterThan(0);
    readMoreLinks.forEach(link => {
      expect(link).toBeInTheDocument();
    });

    const moreInfoLink = screen.getByLabelText(
      `More information about ${articleMock.article.title}`,
    );
    expect(moreInfoLink).toBeInTheDocument();

    const coverImage = screen.getByAltText('Test Image');
    expect(coverImage).toBeInTheDocument();
  });
});
