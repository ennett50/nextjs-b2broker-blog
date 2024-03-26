import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import CommentForm from './CommentForm';
import { useCommentForm } from '@/hooks/useCommentForm';

jest.mock('@/hooks/useCommentForm', () => ({
  useCommentForm: jest.fn(),
}));

const mockHandleSubmit = jest.fn(e => e.preventDefault());
const mockHandleChange = jest.fn();

const mockUseCommentProps = {
  comment: '',
  showSuccessMessage: false,
  isLoading: false,
  disabled: false,
  handleChange: mockHandleChange,
  handleSubmit: mockHandleSubmit,
};

describe('CommentForm', () => {
  beforeEach(() => {
    (useCommentForm as jest.Mock).mockImplementation(() => mockUseCommentProps);
  });

  it('renders correctly', () => {
    render(<CommentForm articleId='123' />);

    expect(
      screen.getByPlaceholderText('Ваш комментарий...'),
    ).toBeInTheDocument();
  });

  it('enables the submit button when a valid comment is entered', () => {
    (useCommentForm as jest.Mock).mockImplementation(() => ({
      ...mockUseCommentProps,
      disabled: false,
    }));

    render(<CommentForm articleId='123' />);
    const textarea = screen.getByPlaceholderText('Ваш комментарий...');
    fireEvent.change(textarea, { target: { value: 'Valid comment' } });

    expect(
      screen.getByRole('button', { name: 'Отправить' }),
    ).not.toBeDisabled();
  });

  it('shows success message after submitting a valid comment', async () => {
    (useCommentForm as jest.Mock).mockImplementation(() => ({
      ...mockUseCommentProps,
      showSuccessMessage: true,
      disabled: true,
    }));

    render(<CommentForm articleId='123' />);
    const submitButton = screen.getByRole('button', { name: 'Отправить' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Комментарий успешно добавлен!'),
      ).toBeInTheDocument();
    });
  });
});
