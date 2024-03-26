import { FC, memo } from 'react';

interface FooterProps {
  /** The year to be displayed in the footer */
  year: number;
}

/**
 * Footer component displays the copyright notice with the current year.
 * Can be enhanced further with additional footer elements if necessary.
 *
 * Example of usage:
 * ```tsx
 * <Footer year={2024} />
 * ```
 *
 * @component
 * @param props - Props containing the year for the copyright notice.
 */
const Footer: FC<FooterProps> = memo(({ year }) => {
  return (
    <footer className='bg-gray-800 mt-auto'>
      <div className='container'>
        <p className='text-white text-sm md:text-base'>© {year}</p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
