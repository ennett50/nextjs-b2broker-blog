import { render, screen } from '@testing-library/react';

import CommentsList from './CommentsList';

jest.mock('@/api/comments.api', () => ({
  useFetchCommentsQuery: jest.fn().mockReturnValue({
    data: { data: [{ id: '1', attributes: { text: 'Test Comment' } }] },
    isLoading: false,
    isError: false,
  }),
}));

describe('CommentsList', () => {
  it('renders comments when data is available', () => {
    render(<CommentsList articleId='123' />);
    expect(screen.getByText('Test Comment')).toBeInTheDocument();
  });
});
