import { useState } from 'react';

import { UnknownAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { commentsApi, useAddCommentMutation } from '@/api/comments.api';

const MIN_COMMENT_LENGTH = 10;

interface IUseCommentFormProps {
  comment: string;
  showSuccessMessage: boolean;
  isLoading: boolean;
  disabled: boolean;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * Custom React hook for managing comment form state and submissions in an article context.
 * It handles comment input changes, form submissions, loading state, and validation.
 *
 * @param {string} articleId - ID of the article to which the comment is being added.
 * @returns {IUseCommentFormProps} Object containing comment state, loading state, and handlers for input changes and form submission.
 */
export const useCommentForm = (articleId: string): IUseCommentFormProps => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [addComment, { isLoading }] = useAddCommentMutation();

  const isCommentValid = comment.trim().length >= MIN_COMMENT_LENGTH;
  const disabled = isLoading || !isCommentValid;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!isCommentValid) return;

    try {
      const newComment = await addComment({
        text: comment,
        article: articleId,
      }).unwrap();

      dispatch(
        commentsApi.util.updateQueryData(
          'fetchComments',
          { articleId },
          draft => {
            draft.data.unshift(newComment.data);
          },
        ) as unknown as UnknownAction,
      );
      setComment('');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void =>
    setComment(e.target.value);

  return {
    comment,
    showSuccessMessage,
    isLoading,
    disabled,
    handleChange,
    handleSubmit,
  };
};
