import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const ogSampleImageSrc =
  'https://storage.googleapis.com/tinkersynth-email-assets/og-sample-image.png';
const ogSampleImageTwitterSrc =
  'https://storage.googleapis.com/tinkersynth-email-assets/og-sample-image-twitter.png';

const SEO = ({
  description,
  lang,
  meta,
  keywords = ['generative art', 'art', 'online store'],
  title,
  ogTitle,
  url,
}) => (
  <StaticQuery
    query={detailsQuery}
    render={data => {
      const metaDescription = description || data.site.siteMetadata.description;

      const backupOgUrl =
        typeof window === 'undefined'
          ? 'https://tinkersynth.com/'
          : window.location.href;

      return (
        <Helmet
          htmlAttributes={{
            lang,
          }}
          title={title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
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
              content: url || backupOgUrl,
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
              content: data.site.siteMetadata.author,
            },
            {
              name: 'twitter:title',
              content: ogTitle || title,
            },
            {
              name: 'twitter:description',
              content: metaDescription,
            },
          ]
            .concat(
              keywords.length > 0
                ? {
                    name: 'keywords',
                    content: keywords.join(`, `),
                  }
                : []
            )
            .concat(meta)}
        />
      );
    }}
  />
);

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
