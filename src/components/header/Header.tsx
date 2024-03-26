import { FC, memo } from 'react';

import Link from 'next/link';

interface HeaderProps {
  /**
   * Title to be displayed within the component.
   */
  title: string;
}

/**
 * The Header component displays a page title within an `<h1>` element.
 *
 * Usage example:
 * ```tsx
 * <Header title="Page Title"/>
 * ```
 *
 * @component
 * @param props - The component properties as defined in the `HeaderProps` interface.
 */
const Header: FC<HeaderProps> = memo(({ title }) => (
  <header className='bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md'>
    <div className='container'>
      <h1 className='text-white font-bold text-xl md:text-3xl'>
        <Link href='/'>{title}</Link>
      </h1>
    </div>
  </header>
));

Header.displayName = 'Header';

export default Header;
