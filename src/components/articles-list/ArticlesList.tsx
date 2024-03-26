'use client';

import { type FC } from 'react';

import { ArticleCard } from '@/components';
import useArticles from '@/hooks/useArticles';
import { type IArticlesListProps } from '@/types/article.types';

/**
 * Displays a list of articles and a button to load more.
 *
 * @param {Object} props The component props.
 * @param {IArticle[]} props.initialArticles Initial list of articles to display.
 * @param {number} [props.total] Optional total number of articles available.
 */

const ArticlesList: FC<IArticlesListProps> = ({ initialArticles, total }) => {
  const { articles, isLoading, isLimitReached, handleReadMore } = useArticles({
    initialArticles,
    total,
  });

  return (
    <>
      <div className='flex flex-col' role='list'>
        {articles.map(({ id, attributes }) => (
          <ArticleCard key={id} id={id} article={attributes} role='listitem' />
        ))}
      </div>
      {!isLimitReached && (
        <button
          disabled={isLoading}
          aria-disabled={isLoading}
          className='mx-auto block bg-gray-300 text-black font-semibold py-2 px-4 mt-2 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300'
          onClick={handleReadMore}
        >
          Read more
        </button>
      )}
    </>
  );
};

export default ArticlesList;
