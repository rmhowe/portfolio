import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';

export const metadata = {
  title: 'Robbie Howe',
  description: `Technical/VFX Artist`,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="/static/favicons/site.webmanifest" rel="manifest" />
        <link
          color="#4a9885"
          href="/static/favicons/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta
          content="/static/favicons/browserconfig.xml"
          name="msapplication-config"
        />
        <meta content="14d2e73487fa6c71" name="yandex-verification" />
        <meta
          content="eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw"
          name="google-site-verification"
        />
        <meta
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          name="robots"
        />
        <meta property="og:url" content={`https://robbiehowe.xyz`} />
        <link rel="canonical" href={`https://robbiehowe.xyz`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Robbie Howe" />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@finchinspace" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
      </head>
      <body className="bg-gray-900">
        <ThemeProvider attribute="class">
          <main className="flex flex-col justify-center max-w-4xl mx-auto px-8 my-10 text-white">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
