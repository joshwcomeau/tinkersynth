'use client';

import React from 'react';
import Helmet from 'react-helmet';
import { SITE_METADATA } from '../../app/site-metadata';

const ogSampleImageSrc =
  'https://storage.googleapis.com/tinkersynth-email-assets/og-sample-image.png';
const ogSampleImageTwitterSrc =
  'https://storage.googleapis.com/tinkersynth-email-assets/og-sample-image-twitter.png';

type SEOProps = {
  description?: string;
  lang?: string;
  meta?: Array<{ name?: string; property?: string; content: string }>;
  keywords?: string[];
  title: string;
  ogTitle?: string;
  url?: string;
};

const SEO = ({
  description,
  lang = 'en',
  meta = [],
  keywords = ['generative art', 'art', 'online store'],
  title,
  ogTitle,
  url,
}: SEOProps) => {
  const metaDescription = description || SITE_METADATA.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${SITE_METADATA.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: ogTitle || title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:url',
          content: url || (typeof window !== 'undefined' ? window.location.href : 'https://tinkersynth.com/'),
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: ogSampleImageSrc,
        },
        {
          property: 'og:image:type',
          content: 'image/png',
        },
        {
          property: 'og:image:width',
          content: '630',
        },
        {
          property: 'og:image:height',
          content: '1200',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:image',
          content: ogSampleImageTwitterSrc,
        },
        {
          name: 'twitter:creator',
          content: SITE_METADATA.author,
        },
        {
          name: 'twitter:title',
          content: ogTitle || title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        ...(keywords.length > 0
          ? [{ name: 'keywords' as const, content: keywords.join(', ') }]
          : []),
        ...meta,
      ]}
    />
  );
};

export default SEO;
