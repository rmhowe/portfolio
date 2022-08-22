import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

export const Shell = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const meta = {
    title: 'Robbie Howe',
    description: `Front-end developer, 3D enthusiast, Game creator.`,
    type: 'website',
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://robbiehowe.xyz${router.asPath}`}
        />
        <link rel="canonical" href={`https://robbiehowe.xyz${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Robbie Howe" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@finchinspace" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>
      <Header />
      <main className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
      <Footer />
    </div>
  );
};
