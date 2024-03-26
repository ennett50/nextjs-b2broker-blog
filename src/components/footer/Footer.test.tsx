import { render, screen } from '@testing-library/react';

import Footer from './Footer';

describe('Footer Component', () => {
  it('correctly displays the year passed via props', () => {
    const testYear = 2024;
    render(<Footer year={testYear} />);

    expect(screen.getByText(`© ${testYear}`)).toBeInTheDocument();
  });
});
