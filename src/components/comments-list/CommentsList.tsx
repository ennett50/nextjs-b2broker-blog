'use client';
import { memo, type FC } from 'react';

import { useFetchCommentsQuery } from '@/api/comments.api';

interface CommentsListProps {
  articleId: string;
}

/**
 * Displays a list of comments for a given article.
 * Utilizes `useFetchCommentsQuery` hook to fetch comment data.
 *
 * @param {string} props.articleId - ID of the article to load comments for.

 */
const CommentsList: FC<CommentsListProps> = memo(({ articleId }) => {
  const { data, isLoading, isError } = useFetchCommentsQuery({ articleId });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <section className='space-y-4 mb-4' aria-labelledby='comments'>
      <h2>Комментарии</h2>
      {data?.data?.map(({ id, attributes: { text } }) => (
        <p key={id} className='text-sm text-gray-700'>
          {text}
        </p>
      ))}
    </section>
  );
});

CommentsList.displayName = 'CommentsList';

export default CommentsList;
