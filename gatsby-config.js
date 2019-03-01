const faviconPath = `./src/images/favicon.${process.env.NODE_ENV}.png`;

module.exports = {
  siteMetadata: {
    title: `Tinkersynth`,
    description:
      'Tinkersynth is an experimental art store. Create unique prints by manipulating whimsical machines and making serendipitous discoveries.',
    author: `@joshwcomeau`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    `gatsby-plugin-flow`,

    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: faviconPath,
        dir: 'auto',
        lang: 'en-US',
        background: '#fff',
        theme_color: '#F218BC',
      },
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        // your Fathom server URL
        trackingUrl: 'tinkersynth.usesfathom.com',
        // unique site id (optional, required for Fathom v1.1.0+)
        siteId: 'WZOTQZMZ',
      },
    },
  ],
};
