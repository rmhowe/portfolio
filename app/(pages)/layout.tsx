import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { generateMetadata, siteConfig } from '../utils/metadata';
import '../styles/globals.css';

export const metadata = generateMetadata(
  siteConfig.name,
  siteConfig.description
);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
