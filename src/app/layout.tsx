import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Footer, Header } from '@/components';
import { BLOG_NAME, CURRENT_YEAR } from '@/constants';

import { StoreProvider } from './StoreProvider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: BLOG_NAME,
  description: 'Nextjs, strapi.io',
  manifest: '/manifest.json',
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StoreProvider>
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
          />
          <meta name='keywords' content='Keywords' />
          <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
          <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
          <meta name='theme-color' content='#317EFB' />
        </head>
        <body className={`${inter.className} antialiased`}>
          <div className='flex flex-col min-h-screen' role='main'>
            <Header title={BLOG_NAME} />
            <main className='container' aria-label='main content'>
              {children}
            </main>
            <Footer year={CURRENT_YEAR} />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
