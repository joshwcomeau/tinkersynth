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

    `gatsby-plugin-flow`,

    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },
  ],
};
