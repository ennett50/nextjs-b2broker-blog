import { render, screen } from '@testing-library/react';

import AdaptiveImage from './AdaptiveImage';

describe('AdaptiveImage Component', () => {
  const imageData = {
    url: '/path/to/image.jpg',
    width: 100,
    height: 100,
    alternativeText: 'Test Image',
  };

  it('renders the image with correct attributes', () => {
    render(<AdaptiveImage imageData={imageData} />);

    const imageElement = screen.getByAltText(imageData.alternativeText);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('width', imageData.width.toString());
    expect(imageElement).toHaveAttribute('height', imageData.height.toString());
  });

  it('displays a loading overlay while the image is loading', () => {
    render(<AdaptiveImage imageData={imageData} />);

    const loadingOverlay = screen.getByTestId('loading-overlay');
    expect(loadingOverlay).toBeInTheDocument();
  });
});
