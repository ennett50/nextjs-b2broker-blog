'use client';

import { useState, type FC } from 'react';

import Image from 'next/image';

import { IImageData } from '@/types/media.types';
import { getStrapiMedia } from '@/utils/getStrapiMedia';

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNkY2RjZGMiLz48L3N2Zz4=';

type AdaptiveImageProps = {
  imageData: IImageData;
  className?: string;
};

const AdaptiveImage: FC<AdaptiveImageProps> = ({
  imageData,
  className = '',
}) => {
  const [isLoading, setLoading] = useState(true);
  const { url, width, height, alternativeText } = imageData;
  const imageUrl = getStrapiMedia(url) as string;

  return (
    <div className={`relative ${className}`} aria-busy={isLoading}>
      {isLoading && (
        <div
          className='absolute top-0 left-0 w-full h-full flex justify-center items-center'
          data-testid='loading-overlay'
        >
          <div className='w-full h-full bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 animate-shiftGradient animate-gradient'></div>
        </div>
      )}
      <Image
        src={imageUrl}
        alt={alternativeText ?? 'Image description'}
        width={width}
        height={height}
        className={className}
        placeholder='blur'
        blurDataURL={BLUR_DATA_URL}
        sizes='(max-width: 500px) 500px, (max-width: 750px) 750px, (max-width: 1000px) 1000px, 1024px'
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default AdaptiveImage;
