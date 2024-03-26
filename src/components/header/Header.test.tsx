import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header Component', () => {
  it('displays the title passed via props', () => {
    const testTitle = 'Test Page Title';
    render(<Header title={testTitle} />);

    const headingElement = screen.getByRole('heading', { name: testTitle });
    expect(headingElement).toBeInTheDocument();
  });
});
