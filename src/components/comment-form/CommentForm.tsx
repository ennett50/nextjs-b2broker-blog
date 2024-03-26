'use client';

import { memo, type FC } from 'react';

import { useCommentForm } from '@/hooks/useCommentForm';

interface CommentsFormProps {
  articleId: string;
}

/**
 * A form component for submitting comments to an article.
 * Utilizes RTK Query for data mutation and optimistic updates.
 *
 * @component
 * @param {CommentsFormProps} props - The component props.
 * @param {string} props.articleId - The ID of the article.
 */
const CommentForm: FC<CommentsFormProps> = memo(({ articleId }) => {
  const {
    comment,
    showSuccessMessage,
    isLoading,
    disabled,
    handleSubmit,
    handleChange,
  } = useCommentForm(articleId);

  return (
    <>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <label
          htmlFor='comment'
          className='block text-sm font-medium text-gray-700'
        >
          Ваш комментарий
        </label>
        <textarea
          id='comment'
          className='form-textarea mt-1 block w-full rounded-md border p-2'
          rows={3}
          placeholder='Ваш комментарий...'
          value={comment}
          onChange={handleChange}
          disabled={isLoading}
        />
        <div className='flex'>
          {showSuccessMessage && (
            <div
              className='text-green-500 mt-2'
              role='status'
              aria-live='polite'
            >
              Комментарий успешно добавлен!
            </div>
          )}
          <button
            aria-disabled={disabled}
            disabled={disabled}
            type='submit'
            className='ml-auto py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Отправка...' : 'Отправить'}
          </button>
        </div>
      </form>
    </>
  );
});

CommentForm.displayName = 'CommentForm';

export default CommentForm;
