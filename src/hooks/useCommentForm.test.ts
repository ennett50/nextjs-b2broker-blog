import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';

import { useCommentForm } from './useCommentForm';
import { useAddCommentMutation } from '@/api/comments.api';

const articleId = 'test-article';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

(useDispatch as unknown as jest.Mock).mockImplementation(() => jest.fn());
(useAddCommentMutation as jest.Mock).mockImplementation(() => [
  async () => ({
    data: {
      data: {
        id: '1',
        attributes: { text: 'New comment', article: articleId },
      },
    },
  }),
  { isLoading: false },
]);

jest.mock('@/api/comments.api', () => ({
  useAddCommentMutation: jest
    .fn()
    .mockReturnValue([jest.fn(), { isLoading: false }]),
}));

describe('CommentForm', () => {
  it('initially returns the correct state', () => {
    const { result } = renderHook(() => useCommentForm(articleId));

    expect(result.current.comment).toBe('');
    expect(result.current.showSuccessMessage).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.disabled).toBe(true); // Disabled из-за невалидности комментария
  });

  it('handles comment input changes', () => {
    const { result } = renderHook(() => useCommentForm(articleId));

    act(() => {
      result.current.handleChange({
        target: { value: 'New comment' },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.comment).toBe('New comment');
  });
});
