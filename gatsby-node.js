exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
  getConfig,
}) => {
  const config = getConfig();

  config.module.rules = [
    ...config.module.rules.filter(
      rule => String(rule.test) !== String(/\.jsx?$/)
    ),
    {
      oneOf: [
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' },
        },
        rules.js(),
      ],
    },
  ];

  config.output.globalObject = 'this';

  actions.replaceWebpackConfig(config);
};

exports.createPages = ({ actions, graphql }) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: `/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/slopes`,
  });
};
