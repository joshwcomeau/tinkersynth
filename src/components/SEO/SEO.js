import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import sampleImage from '../../images/sample.png';

const SEO = ({ description, lang, meta, keywords, title, ogTitle, url }) => (
  <StaticQuery
    query={detailsQuery}
    render={data => {
      const metaDescription = description || data.site.siteMetadata.description;

      const backupOgUrl =
        typeof window === 'undefined'
          ? 'https://tinkersynth.com/slopes/'
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
              name: `description`,
              content: metaDescription,
            },
            {
              property: `og:title`,
              content: ogTitle || title,
            },
            {
              property: `og:description`,
              content: metaDescription,
            },
            {
              property: `og:url`,
              content: url || backupOgUrl,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              property: `og:image`,
              content: sampleImage,
            },
            {
              property: `og:image:type`,
              content: 'image/png',
            },
            {
              property: `og:image:width`,
              content: '1200',
            },
            {
              property: `og:image:height`,
              content: '1600',
            },
            {
              name: `twitter:card`,
              content: `summary`,
            },
            {
              name: `twitter:image`,
              content: sampleImage,
            },
            {
              name: `twitter:creator`,
              content: data.site.siteMetadata.author,
            },
            {
              name: `twitter:title`,
              content: ogTitle || title,
            },
            {
              name: `twitter:description`,
              content: metaDescription,
            },
          ]
            .concat(
              keywords.length > 0
                ? {
                    name: `keywords`,
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
