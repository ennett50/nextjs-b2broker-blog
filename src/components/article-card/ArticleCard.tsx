import { memo, type FC } from 'react';

import Link from 'next/link';

import { IArticle } from '@/types/article.types';

import AdaptiveImage from '../adaptive-image/AdaptiveImage';

interface ArticleCardProps {
  id: string;
  article: IArticle;
  role?: string;
}

/**
 * Displays an article card with a title, introduction, and cover image.
 *
 * @param id - The unique identifier for the article.
 * @param article - The article data containing title, intro, and cover information.
 * @param role - Optional ARIA role for the component to support accessibility.
 */
const ArticleCard: FC<ArticleCardProps> = memo(
  ({ id, article: { title, intro, cover }, role }) => {
    return (
      <div
        className='flex flex-col md:flex-row bg-white rounded overflow-hidden shadow-lg mb-4'
        role={role}
      >
        <Link
          href={`/articles/${id}`}
          className='md:flex-shrink-0 block'
          aria-label={`Read more about ${title}`}
        >
          <AdaptiveImage
            className='object-cover w-full h-64 md:w-48 md:h-full rounded-l'
            imageData={cover.data.attributes}
          />
        </Link>
        <div className='p-4'>
          <Link
            href={`/articles/${id}`}
            className='font-bold text-xl mb-2'
            aria-label={`Read more about ${title}`}
          >
            {title}
          </Link>
          <p className='text-gray-700 text-base mb-4'>{intro}</p>
          <Link
            href={`/articles/${id}`}
            aria-label={`More information about ${title}`}
            className='inline-block bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            More information
          </Link>
        </div>
      </div>
    );
  },
);

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
