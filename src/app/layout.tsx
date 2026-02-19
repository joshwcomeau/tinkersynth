import type { Metadata } from 'next';
import { SITE_METADATA } from './site-metadata';

export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  openGraph: {
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
