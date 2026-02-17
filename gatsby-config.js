module.exports = {
  siteMetadata: {
    title: `Tinkersynth`,
    description:
      'Tinkersynth is an experimental art project. Create unique designs by manipulating whimsical machines and making serendipitous discoveries.',
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
        name: `Tinkersynth`,
        short_name: `Tinkersynth`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#F218BC`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['UA-139212705-1'],
        gtagConfig: {
          anonymize_ip: true,
          respect_dnt: true,
        },
        pluginConfig: {
          head: false,
        },
      },
    },
  ],
};
