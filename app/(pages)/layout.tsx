import { ReactNode } from 'react';
import { generateMetadata, siteConfig } from '../utils/metadata';
import '../styles/globals.css';

export const metadata = generateMetadata(
  siteConfig.name,
  siteConfig.description
);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900">{children}</body>
    </html>
  );
}
