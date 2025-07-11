import { Metadata } from 'next';

export interface ProjectMetadata {
  title: string;
  description: string;
  image?: string;
  slug: string;
  publishDate?: string;
  tags?: string[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: {
    name: string;
    url: string;
    twitter: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Robbie Howe',
  description: 'Technical/VFX Artist specializing in front-end development, graphics programming, and visual effects.',
  url: 'https://robbiehowe.xyz',
  ogImage: '/static/images/og-image.png',
  author: {
    name: 'Robbie Howe',
    url: 'https://robbiehowe.xyz',
    twitter: '@finchinspace',
  },
};

export function generateMetadata(
  title: string,
  description: string,
  image?: string,
  slug?: string
): Metadata {
  const url = slug ? `${siteConfig.url}/${slug}` : siteConfig.url;
  const ogImage = image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title: title === siteConfig.name ? title : `${title} | ${siteConfig.name}`,
    description,
    manifest: '/static/favicons/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png', type: 'image/png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/static/favicons/safari-pinned-tab.svg',
          color: '#4a9885',
        },
      ],
    },
    openGraph: {
      title: title === siteConfig.name ? title : `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title === siteConfig.name ? title : `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
      creator: siteConfig.author.twitter,
      site: siteConfig.author.twitter,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'theme-color': '#ffffff',
      'msapplication-TileColor': '#ffffff',
      'msapplication-config': '/static/favicons/browserconfig.xml',
      'yandex-verification': '14d2e73487fa6c71',
      'google-site-verification': 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    },
  };
}

export function generateProjectMetadata(project: ProjectMetadata): Metadata {
  return generateMetadata(
    project.title,
    project.description,
    project.image,
    `projects/${project.slug}`
  );
}